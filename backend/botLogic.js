const whatsappService = require('./whatsappService');
const flow = require('./flow.json');
const { saveLead } = require('./supabaseClient');
const { handleFallback } = require('./aiService');

// Simple in-memory store for user states.
// In production, use a database (MongoDB, Redis, etc.)
const userStates = {};

async function handleMessage(message) {
  const from = message.from; // Sender's phone number
  
  // If user doesn't have a state, they are new. Start from 'start'
  if (!userStates[from]) {
    userStates[from] = {
      step: 'start',
      data: {}
    };
  }

  const currentState = userStates[from].step;
  const stateConfig = flow[currentState];
  
  // 1. Process incoming message and save data if needed
  if (currentState === 'start' && message.type === 'text') {
    // The user sent their Name and City
    userStates[from].data.name = message.text.body;
  } else if (message.type === 'interactive') {
    // They clicked a button or list option
    const interactionId = message.interactive.type === 'button_reply' 
      ? message.interactive.button_reply.id 
      : message.interactive.list_reply.id;
    
    userStates[from].data[currentState] = interactionId;
  } else if (message.type === 'text') {
    // Check if the text loosely matches any of the expected buttons or lists (supports multi-select!)
    const options = stateConfig.options || [];
    const matchedOptions = options.filter(opt => 
       message.text.body.toLowerCase().includes(opt.title.toLowerCase()) ||
       opt.title.toLowerCase().includes(message.text.body.toLowerCase().trim())
    );

    if (matchedOptions.length > 0) {
       // They typed the name(s) of the button(s) instead of clicking it
       userStates[from].data[currentState] = matchedOptions.map(o => o.id).join(', ');
    } else {
       // FALLBACK: The user asked a random question
       console.log(`Fallback triggered for ${from}: ${message.text.body}`);
       const aiResponse = await handleFallback(message.text.body, stateConfig.message);
       await whatsappService.sendTextMessage(from, aiResponse);
       return; // Stop here, wait for them to answer properly next time
    }
  }

  // 2. Determine next step
  const nextStepId = stateConfig.nextStep;
  
  if (nextStepId) {
    const nextConfig = flow[nextStepId];
    
    // Replace placeholders like {{name}}
    let textToSend = nextConfig.message;
    if (textToSend.includes('{{name}}') && userStates[from].data.name) {
       // Simple extraction (e.g., getting first word of their input)
       const firstName = userStates[from].data.name.split(',')[0].split(' ')[0];
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
    userStates[from].step = nextStepId;
    
    // If we reached the end, maybe clear state or send data somewhere
    if (nextStepId === 'finish') {
       console.log(`Finished flow for ${from}. Collected Data:`, userStates[from].data);
       // Save to Supabase
    try {
      await saveLead(from, userStates[from].data);
    } catch (e) {
      console.error("Error saving to Supabase:", e);
    }
    // Clear state so they can restart later
    delete userStates[from];
    }
  } else {
    // This happens if we are at 'finish' or an unknown state
    // For RAG/Hybrid, this is where we'd fallback to the LLM if they asked a random question.
    console.log("No next step defined, or reached the end.");
  }
}

// Helper to trigger the start message (e.g. if they just say "Hi")
async function triggerStart(from) {
  userStates[from] = { step: 'start', data: {} };
  await whatsappService.sendTextMessage(from, flow['start'].message);
}

module.exports = { handleMessage, triggerStart };
