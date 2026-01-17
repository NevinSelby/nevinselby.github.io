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
    const [isTyping, setIsTyping] = useState(false);

    const coreIndex = useMemo(() => createCoreIndex(), []);
    const contentIndex = useMemo(() => createContentIndex(), []);
    const vectorEngine = useMemo(() => new VectorEngine(knowledgeBase), []);

    const fuseOptions = {
        keys: [
            { name: 'title', weight: 2 },
            { name: 'content', weight: 1 },
            { name: 'tags', weight: 1.5 }
        ],
        threshold: 0.4,
        includeScore: true,
        ignoreLocation: true,
        useExtendedSearch: true
    };

    const coreFuse = useMemo(() => new Fuse(coreIndex, fuseOptions), [coreIndex]);
    const contentFuse = useMemo(() => new Fuse(contentIndex, fuseOptions), [contentIndex]);

    const generateResponse = async (input: string): Promise<{ text: string; action?: { label: string; path: string } }> => {
        const lower = input.toLowerCase();

        // 1. Simple Greetings & Top-Level Navigation
        if (['hi', 'hello', 'hey', 'yo', 'greetings'].some(g => lower.startsWith(g))) {
            return {
                text: "Hello! I'm Nevin's digital assistant. I can tell you about my projects, my experience in AI & Finance, or my latest articles. How can I help?",
            };
        }

        // 2. Hybrid Search for Context (Collect more results for Gemini to "choose" from)
        const vectorMatch = vectorEngine.search(input);
        const coreRes = coreFuse.search(input).slice(0, 5);
        const contentRes = contentFuse.search(input).slice(0, 4);

        const combinedResults = [...coreRes, ...contentRes].sort((a, b) => (a.score || 1) - (b.score || 1));

        // 3. Construct Context for LLM
        let context = "";
        if (vectorMatch) {
            context += `[Internal Q&A]: ${vectorMatch.answer}\n`;
        }

        combinedResults.forEach(res => {
            const item = res.item;
            context += `[${item.type}] Title: ${item.title}. Summary: ${item.content.substring(0, 500)}. Path: ${item.path}\n`;
        });

        // 4. LLM Generation & Routing
        if (context.length > 5) {
            const { generateGeminiResponse } = await import('@/services/gemini');
            const rawResponse = await generateGeminiResponse(input, context);

            if (rawResponse) {
                // Parse Structured Output: [RESPONSE] ... [ACTION] Label|Path
                const responseMatch = rawResponse.match(/\[RESPONSE\]([\s\S]*?)(\[ACTION\]|$)/i);
                const actionMatch = rawResponse.match(/\[ACTION\]\s*(.*?)\s*$/i);

                const text = responseMatch ? responseMatch[1].trim() : rawResponse.replace(/\[ACTION\].*$/is, '').trim();
                let action;

                if (actionMatch) {
                    const [label, path] = actionMatch[1].split('|').map(s => s.trim());
                    if (label && path) {
                        action = { label, path };
                    }
                }

                return { text, action };
            }
        }

        // Fallback
        return {
            text: "I'm not exactly sure about that. Try asking about Nevin's work at Zion Cloud, his AutoML-ify project, or his thoughts on AI and Finance.",
            action: { label: "View Projects", path: "/projects" }
        };
    };



    const handleSend = async (text: string) => {
        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const response = await generateResponse(text);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', ...response }]);
        } catch (e) {
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: "Sorry, I'm having trouble thinking right now." }]);
        } finally {
            setIsTyping(false);
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
        isTyping,
        handleSend,
        handleAction
    };
};
