
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini Client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generateGeminiResponse = async (
    query: string,
    context: string
): Promise<string | null> => {
    if (!genAI) {
        console.warn("Gemini API key missing. Falling back...");
        return null;
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
You are Nevin's professional AI portfolio assistant. 
Your goal is to answer the user's question accurately using the provided context.

IMPORTANT: 
- Nevin's core background is in AI, MLOps, and Cloud Engineering (Projects, Experience, Skills).
- Prioritize answering from his professional experience and direct projects.
- Use newsletter content ONLY if the user specifically asks about his writing, finance topics, or if it provides highly relevant technical insights.
- If asked about "projects", focus on "AutoML-ify" and "MLOps Weather Prediction" rather than newsletter articles.

Context (Sources are labeled as [Project], [Experience], or [Newsletter]):
${context}

User Question: "${query}"

Guidelines:
1. Be concise (max 3 sentences).
2. Professional and helpful tone.
3. If the answer is in the context, answer directly. Identify the specific project or company if applicable.
4. If you don't know, suggest visiting the Projects or Contact page.
5. Do not hallucinate or guess details.

Answer:
`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return null;
    }
};
