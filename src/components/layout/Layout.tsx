import React from 'react';
import { Navbar } from './Navbar';
import { ChatWidget } from '../chat/ChatWidget';
import { Github, Linkedin, Mail } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Footer = () => (
    <footer className="border-t border-gray-100 bg-gray-50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
            <div>
                <h3 className="font-bold text-gray-900 mb-4">Nevin John Selby</h3>
                <p className="text-gray-500 leading-relaxed">
                    Developing system-level software that scales. <br />
                    Optimizing runtime, infrastructure, and deployment.
                </p>
            </div>

            <div>
                <h3 className="font-bold text-gray-900 mb-4">Connect</h3>
                <div className="flex gap-4">
                    <a href="https://github.com/nevinselby" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/nevinselby" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:nevinselby2001@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>

            <div className="md:text-right">
                <p className="text-gray-500">© {new Date().getFullYear()} Nevin John Selby.</p>
                <p className="text-gray-400 mt-2">Built with React, Tailwind & Vite.</p>
            </div>
        </div>
    </footer>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col text-slate-200 selection:bg-accent/30 selection:text-white">

            {/* Background Graphic */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] transform translate-x-1/4 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[100px] transform -translate-x-1/4 translate-y-1/4" />
            </div>

            <Navbar />

            <main className="flex-grow pt-20 relative z-10">
                {children}
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
};
