const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
        // There isn't a direct listModels to call easily in the JS SDK without more boilerplate
        // But we can try a few common names.
        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                console.log(`Checking ${m}...`);
                const result = await model.generateContent("test");
                console.log(`  ${m} is working!`);
            } catch (e) {
                console.log(`  ${m} failed: ${e.message}`);
            }
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

listModels();
