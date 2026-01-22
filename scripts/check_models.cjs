const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testModel(name, version) {
    console.log(`Testing ${name} on ${version}...`);
    try {
        const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: name }, { apiVersion: version });
        const result = await model.generateContent("hi");
        console.log(`✅ ${name} (${version}) works!`);
        return true;
    } catch (e) {
        console.log(`❌ ${name} (${version}) failed: ${e.message}`);
        return false;
    }
}

async function run() {
    const models = [
        "gemini-2.0-flash-lite",
        "gemini-2.0-flash-lite-preview",
        "gemini-2.0-flash-lite-preview-02-05",
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest"
    ];
    const versions = ["v1", "v1beta"];

    for (const model of models) {
        for (const version of versions) {
            await testModel(model, version);
        }
    }
}

run();
