
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testModels() {
    const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash-latest"];

    for (const modelName of modelsToTry) {
        try {
            console.log(`Testing model: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: "v1" });
            const result = await model.generateContent("Say hello");
            console.log(`Success with ${modelName}:`, result.response.text());
            return;
        } catch (e) {
            console.error(`Failed ${modelName}:`, e.message);
        }
    }
}

testModels();
