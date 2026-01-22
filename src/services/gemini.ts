
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
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" }, { apiVersion: "v1" });

        const prompt = `
You are Nevin's professional AI portfolio assistant and router.
Your goal is to answer the user's question accurately using the provided context and select the MOST relevant "Action Link" (deep-link) for the user to follow.

Context contains sources labeled as [PROJECT], [EXPERIENCE], [EDUCATION], [CERTIFICATION], or [NEWSLETTER]. 
Each entry includes a Title, Content/Summary, and a unique Path (which could be a local route or external URL).

INTENT RULES:
1. **Specific Query**: If the user asks about a specific topic (e.g., "AI in Finance", "Zion Cloud", "AutoML", "Masters degree"), you MUST find the single most relevant item in the [DYNAMIC KNOWLEDGE BASE] and use its specific Path.
2. **Broad/General Query**: If the user asks for a category (e.g., "what have you written?", "show me your work", "where did you study?"), summarize the top results and provide the most relevant high-level path from the [NAVIGATION MAP].
3. **Multi-Topic Query**: If multiple specific items are relevant, pick the most recent or impressive one and mention the others in your text.

ACTION SELECTION GUIDELINES (CRITICAL):
- **Newsletter**: If a specific article answers the question, link DIRECTLY to that article (e.g., https://iterai.beehiiv.com/p/...). Do NOT use the general /newsletter path if a specific one exists.
- **Projects/Experience**: Always prefer specific slugs (e.g., /projects/automl-ify) over general /projects.
- **Education/Skills**: Link to /about unless a specific certification link is available.

Format:
[RESPONSE] Your helpful answer here (max 3 sentences)...
[ACTION] Action Button Label | Specific Path

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
