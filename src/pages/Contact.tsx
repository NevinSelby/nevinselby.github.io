
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { data } from '@/content/data';
import { Mail, Linkedin, Send, Calendar } from 'lucide-react';

import { SEO } from '@/components/layout/SEO';

const Contact = () => {
    const { profile } = data;

    return (
        <div className="min-h-screen pt-20">
            <SEO title="Contact" description="Get in touch with Nevin John Selby." />
            <Section>
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 max-w-6xl">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">Let's Connect</h1>
                                <p className="text-gray-600">
                                    Whether you have a question about my work, a potential collaboration, or just want to discuss the latest in AI infra, I'd love to hear from you.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {profile.social.calendly && (
                                    <a href={profile.social.calendly} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Book a Chat</p>
                                            <p className="text-gray-900 font-medium">Schedule 30min</p>
                                        </div>
                                    </a>
                                )}

                                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Me</p>
                                        <p className="text-gray-900 font-medium">{profile.email}</p>
                                    </div>
                                </a>

                                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <Linkedin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Connect on LinkedIn</p>
                                        <p className="text-gray-900 font-medium">Coming from Portfolio?</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <GlassCard className="p-8">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
                                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                                    <input type="email" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Message</label>
                                    <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Hello Nevin..." />
                                </div>
                                <Button className="w-full" onClick={() => window.location.href = `mailto:${profile.email}`}>
                                    Send Message <Send className="w-4 h-4 ml-2" />
                                </Button>
                            </form>
                        </GlassCard>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Contact;
