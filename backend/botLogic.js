const whatsappService = require('./whatsappService');
const flow = require('./flow.json');
const { saveLead } = require('./supabaseClient');
const { handleFallback } = require('./aiService');
const Redis = require('ioredis');

// Initialize Redis Client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

async function handleMessage(message) {
  const from = message.from; // Sender's phone number
  const lockKey = `lock:${from}`;
  const sessionKey = `session:${from}`;

  // Attempt to acquire a lock to prevent concurrent webhook processing for the same user
  const acquired = await redis.set(lockKey, '1', 'NX', 'PX', 5000);
  if (!acquired) {
    console.log(`Duplicate message or race condition prevented for ${from}`);
    return;
  }

  try {
    // 1. Load state from Redis
    let stateData = await redis.get(sessionKey);
    let userState = stateData ? JSON.parse(stateData) : { step: 'start', data: {} };

    const currentState = userState.step;
    const stateConfig = flow[currentState];
    
    // 2. Process incoming message and save data if needed
    if (currentState === 'start' && message.type === 'text') {
      // The user sent their Name and City
      userState.data.name = message.text.body;
    } else if (message.type === 'interactive') {
      // They clicked a button or list option
      const interactionId = message.interactive.type === 'button_reply' 
        ? message.interactive.button_reply.id 
        : message.interactive.list_reply.id;
      
      userState.data[currentState] = interactionId;
    } else if (message.type === 'text') {
      // Check if the text loosely matches any of the expected buttons or lists (supports multi-select!)
      const options = stateConfig.options || [];
      const matchedOptions = options.filter(opt => 
         message.text.body.toLowerCase().includes(opt.title.toLowerCase()) ||
         opt.title.toLowerCase().includes(message.text.body.toLowerCase().trim())
      );

      if (matchedOptions.length > 0) {
         // They typed the name(s) of the button(s) instead of clicking it
         userState.data[currentState] = matchedOptions.map(o => o.id).join(', ');
      } else {
         // FALLBACK: The user asked a random question
         console.log(`Fallback triggered for ${from}: ${message.text.body}`);
         const aiResponse = await handleFallback(message.text.body, stateConfig.message);
         await whatsappService.sendTextMessage(from, aiResponse);
         // Stop here, wait for them to answer properly next time. Do not update state.
         return; 
      }
    }

    // 3. Determine next step
    const nextStepId = stateConfig.nextStep;
    
    if (nextStepId) {
      const nextConfig = flow[nextStepId];
      
      // Replace placeholders like {{name}}
      let textToSend = nextConfig.message;
      if (textToSend.includes('{{name}}') && userState.data.name) {
         // Simple extraction (e.g., getting first word of their input)
         const firstName = userState.data.name.split(',')[0].split(' ')[0];
         textToSend = textToSend.replace('{{name}}', firstName);
      }

      // Send the appropriate message type
      if (nextConfig.type === 'text') {
        await whatsappService.sendTextMessage(from, textToSend);
      } else if (nextConfig.type === 'buttons') {
        await whatsappService.sendButtonsMessage(from, textToSend, nextConfig.options);
      } else if (nextConfig.type === 'list') {
        await whatsappService.sendListMessage(from, textToSend, nextConfig.buttonText, nextConfig.options);
      }

      // Update user state to the next step
      userState.step = nextStepId;
      
      // If we reached the end, process data and clear state
      if (nextStepId === 'finish') {
         console.log(`Finished flow for ${from}. Collected Data:`, userState.data);
         try {
           await saveLead(from, userState.data);
         } catch (e) {
           console.error("Error saving to Supabase:", e);
         }
         // Clear state from Redis so they can restart later
         await redis.del(sessionKey);
      } else {
         // Save updated state back to Redis with a 24-hour TTL
         await redis.set(sessionKey, JSON.stringify(userState), 'EX', 86400);
      }
    } else {
      console.log("No next step defined, or reached the end.");
    }
  } finally {
    // Release the lock exactly when processing is completely finished (or failed)
    await redis.del(lockKey);
  }
}

// Helper to trigger the start message (e.g. if they just say "Hi")
async function triggerStart(from) {
  const sessionKey = `session:${from}`;
  await redis.set(sessionKey, JSON.stringify({ step: 'start', data: {} }), 'EX', 86400);
  await whatsappService.sendTextMessage(from, flow['start'].message);
}

module.exports = { handleMessage, triggerStart };

