
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
You are Nevin's intelligent portfolio assistant. 
Your goal is to answer the user's question mostly based on the provided context (which contains Nevin's articles, projects, and bio).

Context:
${context}

User Question: "${query}"

Guidelines:
1. Be concise (max 3-4 sentences).
2. Use professional but friendly tone.
3. If the answer is in the context, answer directly and cite the source if possible (e.g., "In his article about...").
4. If the context is empty or irrelevant, politely fallback to general knowledge BUT link it back to Nevin's expertise (Finance/AI) if relevant, or admit you don't know.
5. Do not hallucinate facts about Nevin.

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
