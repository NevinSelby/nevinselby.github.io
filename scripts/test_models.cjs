const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
        const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // arbitrary
        // The listModels method is on the genAI instance in newer SDKs
        // const list = await genAI.listModels(); // This might not be in the current SDK version
        console.log("Testing gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const resultPro = await modelPro.generateContent("test");
        console.log("gemini-pro Works!");
    } catch (e) {
        console.error("Test Failed:", e.message);
    }
}
listModels();
