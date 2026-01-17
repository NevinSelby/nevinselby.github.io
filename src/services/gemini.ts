
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
Your goal is to answer the user's question accurately using the provided context and select the MOST relevant specific "Action Link" (deep-link) for the user to follow.

Context contains sources labeled as [Project], [Experience], or [Newsletter]. 
Each entry includes a Title, Summary, and a unique Path.

Guidelines:
1. **Answer**: Be concise (max 3 sentences). Professional and helpful tone. Focus on specific achievements mentioned in the context.
2. **Action Selection (CRITICAL)**: 
   - You MUST select the specific Path of the item that best answers the user's question.
   - For example, if you answer about his role at "Zion Cloud", the action button MUST use the specific path for Zion Cloud (e.g., /experience/zion-cloud-solutions), NOT the general /experience page.
   - If the user asks for "projects" in general, you should still attempt to highlight a specific featured project (like AutoML-ify) and link to it if it's in the context.
   - ONLY use general paths (/projects, /experience, /newsletter) if the user's question is broad AND no single specific item from the context is a clear fit.
3. **Format**: Your response MUST follow this exact structure:
   [RESPONSE] Your helpful answer here...
   [ACTION] Specific Button Label (e.g. "View Zion Cloud Solutions") | Specific Path (e.g. /experience/zion-cloud-solutions)

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
