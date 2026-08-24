const axios = require('axios');
require('dotenv').config();

const { WHATSAPP_TOKEN, PHONE_NUMBER_ID } = process.env;
const API_URL = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

const headers = {
  'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
  'Content-Type': 'application/json'
};

async function sendTextMessage(to, text) {
  try {
    const data = {
      messaging_product: 'whatsapp',
      to,
      text: { body: text }
    };
    await axios.post(API_URL, data, { headers });
  } catch (error) {
    console.error('Error sending text message:', error.response?.data || error.message);
  }
}

async function sendButtonsMessage(to, text, options) {
  try {
    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text },
        action: {
          buttons: options.map(opt => ({
            type: 'reply',
            reply: { id: opt.id, title: opt.title.substring(0, 20) } // Max 20 chars
          }))
        }
      }
    };
    await axios.post(API_URL, data, { headers });
  } catch (error) {
    console.error('Error sending buttons message:', error.response?.data || error.message);
  }
}

async function sendListMessage(to, text, buttonText, options) {
  try {
    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'list',
        body: { text },
        action: {
          button: buttonText.substring(0, 20),
          sections: [
            {
              title: "Options",
              rows: options.map(opt => ({
                id: opt.id,
                title: opt.title.substring(0, 24)
              }))
            }
          ]
        }
      }
    };
    await axios.post(API_URL, data, { headers });
  } catch (error) {
    console.error('Error sending list message:', error.response?.data || error.message);
  }
}

module.exports = { sendTextMessage, sendButtonsMessage, sendListMessage };
