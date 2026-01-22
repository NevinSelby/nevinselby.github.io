import { useState, useMemo, useRef } from 'react';
import { data } from '@/content/data';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

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

    // Experience
    data.experience.forEach(e => {
        const descStr = Array.isArray(e.description) ? e.description.join(' ') : (e.description || "");
        const highlightStr = (e.highlights || []).join(' ');
        index.push({
            type: 'Experience',
            title: `${e.role} at ${e.company}`,
            content: `${e.company} - ${e.role} (${e.period}). ${descStr} ${highlightStr}`,
            path: `/experience/${e.slug}`
        });
    });

    // Projects
    data.projects.forEach(p => {
        const resultStr = (p.results || []).join(' ');
        const techStr = (p.techStack || []).join(' ');
        index.push({
            type: 'Project',
            title: p.title,
            content: `${p.title}: ${p.subtitle}. Problem: ${p.problem}. Approach: ${p.approach}. Results: ${resultStr}. Stack: ${techStr}`,
            path: `/projects/${p.slug}`,
            slug: p.slug
        });
    });

    // GitHub Repos (Dynamic)
    (data.githubRepos || []).forEach(repo => {
        index.push({
            type: 'GitHub Repository',
            title: repo.name,
            content: `${repo.description || ''} ${repo.language || ''}`,
            path: repo.html_url
        });
    });

    // YouTube Videos (Dynamic)
    (data.videos || []).forEach(video => {
        index.push({
            type: 'Video',
            title: video.title,
            content: `YouTube video about travel or tech. Published on ${video.date}`,
            path: video.link
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

    // Education
    data.education.forEach(e => {
        index.push({
            type: 'Education',
            title: `${e.degree} at ${e.school}`,
            content: `${e.school} ${e.degree} ${e.period} ${e.location} ${(e.highlights || []).join(' ')}`,
            path: '/about'
        });
    });

    // Certifications
    (data.certifications || []).forEach(c => {
        index.push({
            type: 'Certification',
            title: c.name,
            content: `${c.name} issued by ${c.issuer} on ${c.date}`,
            path: c.link || '/about'
        });
    });

    return index;
};

const createContentIndex = () => {
    const index: any[] = [];
    // Newsletter (Dynamic Data)
    if (data.articles) {
        data.articles.forEach(article => {
            index.push({
                type: 'Newsletter',
                title: article.title,
                content: `Title: ${article.title}. Summary: ${article.summary}. Tags: ${article.tags.join(', ')}. Date: ${article.date}.`,
                path: article.link
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

    const fuseOptions = {
        keys: [
            { name: 'title', weight: 3 },
            { name: 'type', weight: 2 },
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

        // 2. Hybrid Search for Context
        const coreRes = coreFuse.search(input).slice(0, 8); // Increased from 5
        const contentRes = contentFuse.search(input).slice(0, 8); // Increased from 5

        const combinedResults = [...coreRes, ...contentRes].sort((a, b) => (a.score || 1) - (b.score || 1));

        // 3. Construct Identity & Knowledge Context
        let context = `
[IDENTITY BLOCK]
Name: ${data.profile.name}
Title: ${data.profile.title}
One-Liner: ${data.profile.oneLiner}
Bio: ${data.profile.bio.join(' ')}
Story: ${data.profile.personalJourney?.join(' ') || ''}
[END IDENTITY BLOCK]

[NAVIGATION MAP]
- Home: /
- About: /about
- Experience: /experience
- Projects: /projects
- Research: /publications
- Newsletter: /newsletter
- Media/Vlogs: /media
- Contact: /contact
[END NAVIGATION MAP]

[DYNAMIC KNOWLEDGE BASE]
${combinedResults.map(res => {
            const item = res.item;
            return `[${item.type.toUpperCase()}]
Title: ${item.title}
Content: ${item.content}
Path: ${item.path}`;
        }).join('\n---\n')}
[END DYNAMIC KNOWLEDGE BASE]

INSTRUCTIONS:
1. You are Nevin's digital concierge. Use the context above to answer accurately.
2. If you find a relevant "Path" in the context, ALWAYS suggest it using [ACTION] Label|Path.
3. For general sections (About, Projects, etc.), use the NAVIGATION MAP to suggest the correct path.
4. Keep answers professional but conversational.
`;

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

    const [isListening, setIsListening] = useState(false);
    const [voiceTranscript, setVoiceTranscript] = useState('');
    const recognitionRef = useRef<any>(null);
    const shouldBeListeningRef = useRef(false);
    const silenceTimerRef = useRef<any>(null);

    const startListening = () => {
        if (isListening) {
            stopListening();
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support speech recognition. Try Chrome or Edge.");
            return;
        }

        shouldBeListeningRef.current = true;

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;
        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setIsListening(true);
            setVoiceTranscript('');
        };

        recognition.onend = () => {
            if (shouldBeListeningRef.current) {
                try {
                    recognition.start();
                } catch (e) {
                    console.error("Failed to restart recognition:", e);
                    setIsListening(false);
                }
            } else {
                setIsListening(false);
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'no-speech' && shouldBeListeningRef.current) {
                return;
            }
            if (event.error !== 'no-speech') {
                setIsListening(false);
                shouldBeListeningRef.current = false;
                if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            }
        };

        recognition.onresult = (event: any) => {
            // Reset silence timer
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(() => {
                stopListening();
            }, 2000); // 2 seconds of silence to auto-send

            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = 0; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            setVoiceTranscript(finalTranscript + interimTranscript);
        };

        recognition.start();
    };

    const stopListening = () => {
        shouldBeListeningRef.current = false;
        if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
        }

        if (recognitionRef.current) {
            recognitionRef.current.stop();
            // Get the latest transcript from the state
            setVoiceTranscript(prev => {
                if (prev.trim()) {
                    handleSend(prev);
                }
                return '';
            });
        }
        setIsListening(false);
    };

    return {
        messages,
        isOpen,
        setIsOpen,
        isTyping,
        isListening,
        voiceTranscript,
        startListening,
        stopListening,
        handleSend,
        handleAction
    };
};
