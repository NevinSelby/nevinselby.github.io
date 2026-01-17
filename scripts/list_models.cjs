
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
    try {
        const models = await genAI.listModels();
        console.log("Available Models:");
        models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
    } catch (e) {
        console.error("Error listing models:", e.message);
    }
}

listModels();
