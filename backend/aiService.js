const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function handleFallback(userMessage, currentQuestionText) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    You are an AI assistant for a study-abroad agency called Vectra Staffing.
    We are currently guiding the user through a structured WhatsApp form.
    The current question we are trying to ask them is: "${currentQuestionText}"
    
    Instead of answering the question, the user sent this random message: "${userMessage}"
    
    Your task:
    1. Answer their question briefly and politely in 1-2 short sentences. 
    2. Immediately after answering, gently nudge them back to the form by asking the current question again.
    
    Do NOT use markdown or bold text (asterisks). Keep it simple for WhatsApp.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error with Gemini AI:', error);
    return "I'm sorry, I didn't quite catch that. " + currentQuestionText;
  }
}

module.exports = { handleFallback };
