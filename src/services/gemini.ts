
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
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }, { apiVersion: "v1" });

        const prompt = `
You are Nevin's professional AI portfolio assistant and router.
Your goal is to answer the user's question accurately using the provided context and select the MOST relevant "Action Link" for the user to follow.

Context contains sources labeled as [Project], [Experience], or [Newsletter]. Each has a title and a suggested path/link.

Guidelines:
1. **Response**: Be concise (max 3 sentences). Professional and helpful tone.
2. **Action Selection**: 
   - If the user's intent matches a specific [Project], [Experience], or [Newsletter] article, select its path.
   - If it's a general question about Nevin's career, suggest the "/experience" or "/projects" page.
   - If it's about his newsletter or a financial topic, suggest the specific article link or the "/newsletter" page.
3. **Format**: Your response MUST follow this exact structure:
   [RESPONSE] Your helpful answer here...
   [ACTION] Label|Path

Context:
${context}

User Question: "${query}"

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
