
import { useState, useMemo } from 'react';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Mail, Calendar, Tag, ArrowRight, Search } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';


import { data } from '@/content/data';

const posts = data.articles || [];

const Newsletter = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set(['All']);
        posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }, []);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.summary.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === 'All' || post.tags.includes(filter);
            return matchesSearch && matchesFilter;
        });
    }, [search, filter]);

    return (
        <div className="min-h-screen pt-20">
            <SEO title="IterAI | Newsletter" description="A personal journal on learning, AI, and Finance." />
            <Section>
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-50 text-primary mb-6 animate-bounce">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">IterAI</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            A personal journal on all the things I keep on learning—mostly about AI and Finance.
                        </p>

                        <div className="flex justify-center mb-12">
                            <a
                                href="https://iterai.beehiiv.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/30 hover:scale-105 hover:shadow-primary/40 transition-all"
                            >
                                Read & Subscribe on Beehiiv <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Search & Filter */}
                    <div className="mb-12 space-y-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setFilter(tag)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === tag
                                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {filteredPosts.map((post, i) => (
                            <GlassCard key={i} className="p-8 hover:border-primary/40 transition-all hover:shadow-lg group bg-white border-gray-100">
                                <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-500 font-mono">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    {post.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1 text-primary bg-blue-50 px-2 py-0.5 rounded-full"><Tag className="w-3 h-3" /> {tag}</span>
                                    ))}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">{post.summary}</p>
                                <a href={post.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-primary hover:text-blue-700 transition-colors font-bold text-sm uppercase tracking-wide">
                                    Read Post <ArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </GlassCard>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No articles found matching your criteria.
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
};

export default Newsletter;
