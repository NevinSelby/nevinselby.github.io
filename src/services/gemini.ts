
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
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-lite",
            generationConfig: { temperature: 0 }
        }, { apiVersion: "v1" });

        const prompt = `
You are Nevin's professional AI portfolio assistant and router.
Your goal is to answer the user's question accurately using the provided context and select the MOST relevant "Action Link" (deep-link) for the user to follow.

STRICT VERBATIM PATH POLICY (MANDATORY):
1. **Verbatim Links Only**: You MUST use the exact "Path" provided in the [DYNAMIC KNOWLEDGE BASE] or [NAVIGATION MAP]. 
2. **NO MODIFICATION**: NEVER shorten, simplify, clean up, or rewrite a URL. If the Path is "https://iterai.beehiiv.com/p/understanding-401-k-ira-roth-ira-regular-investing-and-hsa-in-plain-language", you MUST use that entire string. Do NOT change it to something "cleaner" like "/p/roth-ira-vs-401k".
3. **NO GUESSING**: If a user asks about something not explicitly in the context, suggest the general category (/newsletter, /projects) or say you don't know. NEVER invent a slug or external link.
4. **ZERO INFERENCE**: Do not invent highlights, skills, or experiences. Only state what is explicitly written in the Content/Summary fields.

INTENT-BASED ROUTING:
1. **Specific Query**: Link DIRECTLY to the item's specific Path.
2. **Broad/General Query**: Link to the high-level section from the [NAVIGATION MAP].
3. **Internal Check**: Before finalizing, ask yourself: "Is this Path an EXACT character-for-character match from the context?" If No, fix it.

Format:
[RESPONSE] Your helpful answer (max 3 sentences).
[ACTION] Precise Label | EXACT VERBATIM PATH

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
