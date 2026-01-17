import type { QA } from '@/content/knowledge_base';

// Simple stop words list to filter out noise
const STOP_WORDS = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'and', 'or', 'but', 'if', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about',
    'me', 'my', 'i', 'you', 'he', 'she', 'it', 'they', 'what', 'who', 'where', 'when', 'how', 'does', 'do', 'did', 'can', 'could', 'would',
    'tell', 'know', 'say', 'hi', 'hello', 'hey'
]);

// Tokenizer: robustly splits text into words
const tokenize = (text: string): string[] => {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/)
        .filter(word => word.length > 2 && !STOP_WORDS.has(word));
};

// Compute Cosine Similarity between two vectors (represented as TF maps here for simplicity)
// In a full system we'd use IDF too, but for this size, TF-only or simple overlap works surprisingly well.
// We'll stick to a modified Jaccard/Cosine hybrid for robustness on small sentences.
const computeSimilarity = (queryTokens: string[], docTokens: string[]): number => {
    const querySet = new Set(queryTokens);
    const docSet = new Set(docTokens);

    if (querySet.size === 0 || docSet.size === 0) return 0;

    let intersection = 0;
    querySet.forEach(token => {
        if (docSet.has(token)) intersection++;
    });

    // Jaccard Index flavor: intersection / union
    // Giving more weight to matches in the query
    const union = new Set([...queryTokens, ...docTokens]).size;

    return intersection / union;
};

// Vector Search Class
export class VectorEngine {
    private corpus: { qa: QA; tokens: string[] }[];

    constructor(data: QA[]) {
        this.corpus = data.map(item => ({
            qa: item,
            tokens: tokenize(`${item.question} ${item.answer} ${item.topic}`) // Index both Q and A for better context matching
        }));
    }

    search(query: string, threshold = 0.1): QA | null {
        const queryTokens = tokenize(query);
        if (queryTokens.length === 0) return null;

        let bestMatch: QA | null = null;
        let maxScore = -1;

        for (const item of this.corpus) {
            const score = computeSimilarity(queryTokens, item.tokens);

            // Boost exact matches if meaningful keywords exist
            if (score > maxScore) {
                maxScore = score;
                bestMatch = item.qa;
            }
        }

        return maxScore >= threshold ? bestMatch : null;
    }
}
