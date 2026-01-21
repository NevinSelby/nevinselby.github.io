import { useState, useMemo } from 'react';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { data } from '@/content/data';
import type { GithubRepo } from '@/content/types';
import { Search, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SEO } from '@/components/layout/SEO';

const Projects = () => {
    const projects = data.projects || [];
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    // Simplified categories for filter chips if needed, or just use tech stack
    const filters = ['All', 'Python', 'MLOps', 'Cloud', 'Optimization'];

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                project.description.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === 'All' ||
                project.techStack.some(t => t.toLowerCase().includes(filter.toLowerCase())) ||
                (filter === 'Cloud' && (project.techStack.includes('AWS') || project.techStack.includes('GCP'))) ||
                (filter === 'MLOps' && (project.techStack.includes('Docker') || project.techStack.includes('MLflow')));

            return matchesSearch && matchesFilter;
        });
    }, [projects, search, filter]);

    const [viewMode, setViewMode] = useState<'featured' | 'all'>('featured');
    const { githubRepos } = data;

    return (
        <div className="min-h-screen pt-20">
            <SEO title="Projects" description="Showcase of AI and Engineering projects." />
            <Section>
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {viewMode === 'featured' ? 'Featured Projects' : 'All GitHub Projects'}
                        </h1>
                        <p className="text-gray-500 mb-8">Exploring the intersection of AI, Infrastructure, and Reliability.</p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setViewMode('featured')}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${viewMode === 'featured'
                                    ? 'bg-gray-900 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Featured
                            </button>
                            <button
                                onClick={() => setViewMode('all')}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${viewMode === 'all'
                                    ? 'bg-gray-900 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                View All (GitHub)
                            </button>
                        </div>
                    </div>

                    {viewMode === 'featured' ? (
                        <>
                            {/* Search & Filter */}
                            <div className="max-w-4xl mx-auto mb-12 space-y-6">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2 justify-center">
                                    {filters.map(f => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === f
                                                ? 'bg-primary text-white shadow-md shadow-primary/30'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {filteredProjects.map((project) => (
                                    <GlassCard key={project.slug} hoverEffect className="flex flex-col h-full">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{project.title}</h3>
                                                    <p className="text-sm text-primary font-medium">{project.subtitle}</p>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.techStack.slice(0, 5).map(tech => (
                                                    <Badge key={tech} className="bg-blue-50 text-blue-700 border-blue-100">{tech}</Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-auto">
                                            <Link to={`/projects/${project.slug}`} className={buttonVariants({ className: "w-full group" })}>
                                                Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                            {project.links?.github && (
                                                <a href={project.links.github} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'secondary', className: "w-full" })}>
                                                    GitHub <Github className="w-4 h-4 ml-2" />
                                                </a>
                                            )}
                                        </div>

                                    </GlassCard>
                                ))}
                            </div>

                            {filteredProjects.length === 0 && (
                                <div className="text-center py-20 text-slate-500">
                                    No projects found matching your criteria.
                                </div>
                            )}
                        </>
                    ) : (
                        /* GitHub All Projects Grid */
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(githubRepos || []).filter((r: GithubRepo) => !r.description?.includes('portfolio')).map((repo: GithubRepo) => (
                                <GlassCard key={repo.html_url} hoverEffect className="flex flex-col h-full p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 truncate pr-2" title={repo.name}>{repo.name}</h3>
                                        <div className="flex items-center text-xs text-gray-400 whitespace-nowrap">
                                            <span>★ {repo.stargazers_count}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{repo.description || 'No description provided.'}</p>

                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                                            {repo.language || 'Code'}
                                        </span>
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm font-medium text-gray-900 hover:text-primary flex items-center gap-1"
                                        >
                                            View <Github className="w-3 h-3" />
                                        </a>
                                    </div>
                                </GlassCard>
                            ))}
                            {(!githubRepos || githubRepos.length === 0) && (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    Loading repositories or none found. Try running `npm run sync`.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
};

export default Projects;
