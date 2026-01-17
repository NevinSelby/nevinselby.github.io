
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
- Nevin's core background is in AI, MLOps, and Cloud Engineering.
- Prioritize professional experience and projects, but use newsletter content if it's the most relevant to the query (e.g., for finance or specific technical topics).
- Identify the specific source ([Project], [Experience], or [Newsletter]) and use its Title to justify your answer. This allows the UI to link to the correct place.

Context:
${context}

User Question: "${query}"

Guidelines:
1. Be concise (max 3 sentences).
2. Professional and helpful tone.
3. If the answer is in the context, answer directly and name the source.
4. If the context doesn't have the answer, suggest visiting the Projects or Newsletter page based on the user's intent.
5. Do not hallucinate.

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
