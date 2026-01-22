const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    try {
        const apiKey = process.env.VITE_GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const axios = require('axios');
        const response = await axios.get(url);
        console.log("Available Models:");
        response.data.models.forEach(m => {
            console.log(`- ${m.name} (Methods: ${m.supportedGenerationMethods.join(', ')})`);
        });
    } catch (e) {
        console.error("List Models Failed:", e.response ? e.response.data : e.message);
    }
}

listModels();
