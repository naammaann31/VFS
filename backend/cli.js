const readline = require('readline');
const { handleMessage, triggerStart } = require('./botLogic');
const whatsappService = require('./whatsappService');
require('dotenv').config();

// MOCK the WhatsApp API so it prints to the terminal instead of sending to Meta
whatsappService.sendTextMessage = async (to, text) => {
  console.log(`\n🤖 BOT:\n${text}\n`);
};
whatsappService.sendButtonsMessage = async (to, text, options) => {
  console.log(`\n🤖 BOT:\n${text}`);
  console.log(`[Buttons]: ${options.map(o => o.title).join(' | ')}\n`);
};
whatsappService.sendListMessage = async (to, text, buttonText, options) => {
  console.log(`\n🤖 BOT:\n${text}`);
  console.log(`[List - ${buttonText}]:\n` + options.map(o => `  - ${o.title} (Type: ${o.id})`).join('\n') + `\n`);
};

// Setup terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const TEST_PHONE = 'TEST_USER_123';

console.log("=====================================================");
console.log(" 🧪 WhatsApp Bot CLI Tester (No Meta API Needed) 🧪 ");
console.log("=====================================================");
console.log("Type 'start' to begin.");
console.log("When prompted with a List or Button, type the ID (e.g. 'country_ca') to simulate clicking it.");
console.log("Press Ctrl+C to exit.\n");

function ask() {
  rl.question('You: ', async (input) => {
    const text = input.trim();
    if (!text) return ask();

    if (text.toLowerCase() === 'start' || text.toLowerCase() === 'hi') {
      await triggerStart(TEST_PHONE);
    } else {
      // Create a mock WhatsApp message object
      let message;
      // If the user types one of our internal IDs, simulate a button click
      if (text.includes('_') && text.length > 5) {
         message = {
            from: TEST_PHONE,
            type: 'interactive',
            interactive: {
               type: 'button_reply', // Our botLogic treats button/list IDs the same way
               button_reply: { id: text }
            }
         };
      } else {
         // Simulate normal text message
         message = {
            from: TEST_PHONE,
            type: 'text',
            text: { body: text }
         };
      }
      await handleMessage(message);
    }
    
    // Slight delay so the bot prints before asking again
    setTimeout(ask, 500);
  });
}

ask();
