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
const createSearchIndex = () => {
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
            path: '/experience'
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

    // Skills
    data.skills.forEach(s => {
        index.push({
            type: 'Skill',
            title: s.category,
            content: s.skills.join(' '),
            path: '/about'
        });
    });

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

    const searchIndex = useMemo(() => createSearchIndex(), []);
    const vectorEngine = useMemo(() => new VectorEngine(knowledgeBase), []);

    const fuse = useMemo(() => new Fuse(searchIndex, {
        keys: ['title', 'content', 'type', 'tags'],
        threshold: 0.3, // Lower threshold = stricter, but 0.3 is good balance. 
        includeScore: true,
        ignoreLocation: true, // Search anywhere in text
        useExtendedSearch: true
    }), [searchIndex]);

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

    const generateResponse = async (input: string): Promise<{ text: string; action?: { label: string; path: string } }> => {
        const lower = input.toLowerCase();

        // Greeting
        if (['hi', 'hello', 'hey', 'greetings', 'yo'].some(greeting => lower.startsWith(greeting))) {
            return {
                text: "Hello! I'm Nevin's digital assistant. I can tell you about my projects, my experience in AI & Finance, or my latest newsletter articles. How can I help?",
            };
        }

        // Direct Intent Handling
        if (lower.includes('contact') || lower.includes('email') || lower.includes('reach out')) {
            return {
                text: "You can reach Nevin via email or LinkedIn. Check out the Contact page.",
                action: { label: "Go to Contact", path: "/contact" }
            };
        }

        if (lower.includes('youtube') || lower.includes('video') || lower.includes('instagram') || lower.includes('travel')) {
            return {
                text: "Nevin loves adventures! He has a YouTube channel and shares photos from his travels.",
                action: { label: "View Media", path: "/media" }
            };
        }

        if (lower.includes('newsletter') || lower.includes('blog')) {
            return {
                text: "He writes about the convergence of AI and Finance.",
                action: { label: "Read Newsletter", path: "/newsletter" }
            };
        }

        // Hybrid Search for Context
        // 1. Vector Search
        const vectorMatch = vectorEngine.search(input);

        // 2. Keyword Search (Fuse)
        const fuseResults = fuse.search(input).slice(0, 3); // Top 3

        // Construct Context
        let context = "";
        if (vectorMatch) {
            context += `Code Knowledge: ${vectorMatch.answer}\n`;
        }

        fuseResults.forEach(res => {
            const item = res.item;
            context += `Source [${item.type} - ${item.title}]: ${item.content.substring(0, 500)}...\n`;
        });

        // 3. LLM Generation
        if (context.length > 10) {
            // Import dynamically to avoid top-level await issues if any
            const { generateGeminiResponse } = await import('@/services/gemini');
            const llmAnswer = await generateGeminiResponse(input, context);

            if (llmAnswer) {
                // Determine best action link from top Fuse result
                const topMatch = fuseResults[0]?.item;
                const action = topMatch ? { label: `View ${topMatch.type}`, path: topMatch.path } : undefined;
                return { text: llmAnswer, action };
            }
        }

        // Fallback: Keyword Search Result (if LLM fails or no key)
        if (fuseResults.length > 0) {
            const top = fuseResults[0].item;
            return {
                text: `I found something relevant in **${top.type}**: "${top.title}".`,
                action: { label: `View ${top.type}`, path: top.path }
            };
        }

        // Fallback
        return {
            text: "I'm not sure about that. Try asking about his projects like 'AutoML-ify', his experience at 'Zion Cloud', or his skills in 'AI' and 'GCP'.",
            action: { label: "View Projects", path: "/projects" }
        };
    };



    const handleAction = (path: string) => {
        if (path.startsWith('http')) {
            window.open(path, '_blank');
        } else {
            navigate(path);
        }
        // Optional: Close chat on navigation on mobile?
    };

    return {
        messages,
        isOpen,
        setIsOpen,
        handleSend,
        handleAction
    };
};
