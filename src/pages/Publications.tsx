
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { data } from '@/content/data';
import { BookOpen, FileText } from 'lucide-react';

import { SEO } from '@/components/layout/SEO';

const Publications = () => {
    const { publications } = data;

    return (
        <div className="min-h-screen pt-20">
            <SEO title="Publications" description="Research papers and publications." />
            <Section>
                <div className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-12">Publications & Research</h1>
                    <p className="text-slate-400 mb-12">Research contributed to the field of AI and Stock Markets.</p>

                    <div className="grid gap-8">
                        {publications.map((pub, i) => (
                            <GlassCard key={i} className="p-8 hover:border-white/20 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 hidden md:block">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">{pub.title}</h2>
                                        <p className="text-gray-600 leading-relaxed">{pub.summary}</p>

                                        <div className="flex gap-4 pt-2">
                                            <a href={pub.link} target="_blank" rel="noreferrer">
                                                <Button variant="outline" size="sm">
                                                    Read Paper <FileText className="w-4 h-4 ml-2" />
                                                </Button>
                                            </a>
                                            {/* DOI Link if available, otherwise hide or use same link */}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Publications;
