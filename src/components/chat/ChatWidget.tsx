import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageCircle, X, Send, Sparkles, ChevronRight, Mic } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimatePresence, motion } from 'framer-motion';

export const ChatWidget = () => {
    const { messages, isOpen, setIsOpen, isTyping, isListening, voiceTranscript, startListening, handleSend, handleAction } = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sync input with voice transcript when listening
    useEffect(() => {
        if (isListening && voiceTranscript) {
            setInput(voiceTranscript);
        }
    }, [voiceTranscript, isListening]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;
        handleSend(input);
        setInput('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-black/5"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Nevin's AI Assistant</h3>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 bg-white">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
                                        }`}>
                                        <p>{msg.text}</p>
                                        {msg.action && (
                                            <button
                                                onClick={() => handleAction(msg.action!.path)}
                                                className="mt-3 flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 text-primary border border-primary/20 px-3 py-2 rounded-lg transition-colors w-full justify-center shadow-sm"
                                            >
                                                {msg.action.label} <ChevronRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Thinking Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-none p-3.5 shadow-sm">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        delay: i * 0.2
                                                    }}
                                                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-gray-50/30">
                            <div className="relative flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={startListening}
                                    className={`p-2 rounded-full transition-all ${isListening
                                        ? 'bg-red-600 text-white animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }`}
                                    title={isListening ? "Click to send" : "Voice to text"}
                                >
                                    {isListening ? <Send className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={isListening ? "Listening... click icon to send" : "Ask anything..."}
                                    className="flex-1 bg-white border border-gray-200 rounded-full pl-5 pr-12 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isListening}
                                    className="absolute right-2 p-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-md active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                size="lg"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full w-14 h-14 p-0 shadow-xl shadow-primary/30 border border-white/20 hover:scale-105 transition-transform bg-primary text-white"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </Button>
        </div>
    );
};
