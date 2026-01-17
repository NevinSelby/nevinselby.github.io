import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { data } from '@/content/data';
import { VectorEngine } from '@/utils/vectorSearch';
import { knowledgeBase } from '@/content/knowledge_base';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    action?: {
        label: string;
        path: string;
    };
}

// Flatten data for search indexing
const createCoreIndex = () => {
    const index: any[] = [];

    // Projects
    data.projects.forEach(p => {
        index.push({
            type: 'Project',
            title: p.title,
            content: `${p.description} ${p.problem} ${p.techStack.join(' ')}`,
            path: `/projects/${p.slug}`,
            slug: p.slug
        });
    });

    // Experience
    data.experience.forEach(e => {
        index.push({
            type: 'Experience',
            title: `${e.role} at ${e.company}`,
            content: e.highlights.join(' '),
            path: `/experience/${e.slug}`
        });
    });

    // Skills
    data.skills.forEach(s => {
        index.push({
            type: 'Skill',
            title: s.category,
            content: s.skills.join(' '),
            path: '/about'
        });
    });

    // Publications
    data.publications.forEach(p => {
        index.push({
            type: 'Publication',
            title: p.title,
            content: p.summary,
            path: '/publications'
        });
    });

    return index;
};

const createContentIndex = () => {
    const index: any[] = [];
    // Newsletter (Scraped Data)
    if (data.articles) {
        data.articles.forEach(article => {
            index.push({
                type: 'Newsletter',
                title: article.title,
                content: `${article.summary} ${article.content || ''} ${article.tags.join(' ')}`,
                path: article.link // Direct external link
            });
        });
    }
    return index;
};

export const useChat = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            sender: 'bot',
            text: "Hi! I'm Nevin's AI Assistant. Ask me about his projects, experience, or skills.",
        }
    ]);
    const [isOpen, setIsOpen] = useState(false);

    const coreIndex = useMemo(() => createCoreIndex(), []);
    const contentIndex = useMemo(() => createContentIndex(), []);
    const vectorEngine = useMemo(() => new VectorEngine(knowledgeBase), []);

    const fuseOptions = {
        keys: ['title', 'content', 'type', 'tags'],
        threshold: 0.35,
        includeScore: true,
        ignoreLocation: true,
        useExtendedSearch: true
    };

    const coreFuse = useMemo(() => new Fuse(coreIndex, fuseOptions), [coreIndex]);
    const contentFuse = useMemo(() => new Fuse(contentIndex, fuseOptions), [contentIndex]);

    const generateResponse = async (input: string): Promise<{ text: string; action?: { label: string; path: string } }> => {
        const lower = input.toLowerCase();

        // 1. Core Intents (bypass search for direct answers)
        if (['hi', 'hello', 'hey', 'yo', 'greetings'].some(g => lower.startsWith(g))) {
            return {
                text: "Hello! I'm Nevin's digital assistant. I can tell you about my projects, my experience in AI & Finance, or my latest articles. How can I help?",
            };
        }

        if (lower.includes('contact') || lower.includes('email') || lower.includes('reach out')) {
            return {
                text: "You can reach Nevin via email or LinkedIn. Both are linked on the Contact page.",
                action: { label: "Go to Contact", path: "/contact" }
            };
        }

        // 2. Intent Detection for Biasing
        const isProfessionalQuery = /work|project|experience|role|tech|skill|resume|job|position|build|engineer/i.test(lower);
        const isContentQuery = /article|newsletter|blog|write|finance|topic|read/i.test(lower);

        // 3. Search Aggregation
        const vectorMatch = vectorEngine.search(input);

        let fuseResults: any[] = [];

        if (isProfessionalQuery && !isContentQuery) {
            // Strictly Core
            fuseResults = coreFuse.search(input).slice(0, 3);
        } else if (isContentQuery && !isProfessionalQuery) {
            // Strictly Content
            fuseResults = contentFuse.search(input).slice(0, 3);
        } else {
            // Hybrid with Bias: Search both, but boost score for Core matches
            const coreRes = coreFuse.search(input).slice(0, 2);
            const contentRes = contentFuse.search(input).slice(0, 2);
            fuseResults = [...coreRes, ...contentRes].sort((a, b) => {
                // Penalize newsletter results slightly unless it's a very strong match
                const aBias = a.item.type === 'Newsletter' ? 0.2 : 0;
                const bBias = b.item.type === 'Newsletter' ? 0.2 : 0;
                return (a.score! + aBias) - (b.score! + bBias);
            });
        }

        // 4. Construct Context
        let context = "";
        if (vectorMatch) {
            context += `Direct Q&A Knowledge: ${vectorMatch.answer}\n`;
        }

        fuseResults.forEach(res => {
            const item = res.item;
            context += `Source [${item.type} - ${item.title}]: ${item.content.substring(0, 500)}...\n`;
        });

        // 5. LLM Response Generation
        if (context.length > 5) {
            const { generateGeminiResponse } = await import('@/services/gemini');
            const llmAnswer = await generateGeminiResponse(input, context);

            if (llmAnswer) {
                // Smarter Action selection: 
                // Prioritize matching the LLM's primary subject
                let action;
                const topResult = fuseResults[0]?.item;

                if (topResult) {
                    action = { label: `View ${topResult.type}`, path: topResult.path };
                }

                // Fallback action if intent is clear but search is vague
                if (!action && isProfessionalQuery) {
                    action = { label: "View Projects", path: "/projects" };
                }

                return { text: llmAnswer, action };
            }
        }

        // Fallback
        if (fuseResults.length > 0) {
            const top = fuseResults[0].item;
            return {
                text: `I found some information regarding Nevin's **${top.type}** work: "${top.title}".`,
                action: { label: `View ${top.type}`, path: top.path }
            };
        }

        return {
            text: "I'm not exactly sure about that, but Nevin is always open to discussing AI, MLOps, and Finance. Try asking about his work at Zion Cloud or his AutoML-ify project.",
            action: { label: "View Projects", path: "/projects" }
        };
    };



    const handleSend = async (text: string) => {
        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);

        // Show typing indicator or just wait
        try {
            const response = await generateResponse(text);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', ...response }]);
        } catch (e) {
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: "Sorry, I'm having trouble thinking right now." }]);
        }
    };

    const handleAction = (path: string) => {
        if (path.startsWith('http')) {
            window.open(path, '_blank');
        } else {
            navigate(path);
        }
    };

    return {
        messages,
        isOpen,
        setIsOpen,
        handleSend,
        handleAction
    };
};
