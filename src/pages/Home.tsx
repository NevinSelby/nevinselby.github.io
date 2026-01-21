import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { buttonVariants } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Download, Github, Linkedin, Terminal, MapPin } from 'lucide-react';
import { data } from '@/content/data';
import { SEO } from '@/components/layout/SEO';
import KnowledgeCanvas from '@/components/KnowledgeCanvas';

const Home = () => {
    const { profile, experience, projects } = data;
    const leadExperience = experience?.[0];
    const featuredProjects = projects?.slice(0, 2) || [];

    return (
        <div className="min-h-screen">
            <SEO
                title="AI & Cloud Engineer"
                description="Portfolio of Nevin John Selby, an AI & Cloud Engineer specializing in ML infrastructure, runtime optimization, and large-scale model deployment."
            />

            {/* Hero Section */}
            <Section className="pt-32 pb-20 md:pt-48 md:pb-32">
                <div className="container mx-auto px-6 max-w-5xl text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-sm font-medium mb-8 border border-blue-100 animate-pulse hover:animate-none transition-all">
                        <Terminal className="w-4 h-4" />
                        <span>System-Level AI Engineering</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 mb-6 font-sans">
                        {profile.name}
                    </h1>

                    <p className="text-2xl md:text-3xl text-gray-500 font-light mb-8">
                        {profile.title}
                    </p>

                    <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
                        {profile.oneLiner}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                        <Link to="/projects" className={buttonVariants({ size: 'lg' })}>
                            View Work
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>

                        <Link to="/contact" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
                            Contact Me
                        </Link>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonVariants({ variant: 'outline', size: 'lg' })}
                        >
                            Resume <Download className="w-4 h-4 ml-2" />
                        </a>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                            <Linkedin className="w-7 h-7" />
                        </a>
                        <a href="https://github.com/nevinselby" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                            <Github className="w-7 h-7" />
                        </a>
                        <div className="flex items-center gap-2 text-gray-500">
                            <MapPin className="w-5 h-5" /> {profile.location}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Tech Stack Marquee (Static Grid for cleanliness) */}
            <Section className="py-12 border-y border-gray-100 bg-white/50">
                <div className="container mx-auto px-6">
                    <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
                        Powering Intelligent Systems With
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Icons/Text for stack */}
                        {['Python', 'TensorFlow', 'PyTorch', 'Kubernetes', 'AWS', 'GCP', 'Docker', 'React'].map((tech) => (
                            <span key={tech} className="text-xl md:text-2xl font-bold text-gray-400 hover:text-primary cursor-default">{tech}</span>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Featured Experience */}
            <Section className="bg-gray-50 py-24">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Latest Experience</h2>
                        <Link to="/experience" className={buttonVariants({ variant: 'ghost' }) + " text-primary"}>
                            View Full Timeline <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <Link to={`/experience/${leadExperience.slug}`}>
                        <GlassCard hoverEffect className="group border-0 shadow-lg bg-white cursor-pointer">
                            <div className="grid md:grid-cols-[200px_1fr] gap-8 p-6">
                                <div className="text-gray-500 font-mono text-sm border-r border-gray-100 pr-8 pt-1">
                                    {leadExperience.period}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                                        {leadExperience.company}
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-4">{leadExperience.role}</p>

                                    <div className="space-y-3 mb-6">
                                        {leadExperience.highlights.slice(0, 3).map((highlight, i) => (
                                            <div key={i} className="flex items-start gap-3 text-gray-600">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-primary flex items-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                                        Read Role Details <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                                </div>
                            </div>
                        </GlassCard>
                    </Link>
                </div>
            </Section>

            {/* Featured Projects */}
            <Section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
                        <Link to="/projects" className={buttonVariants({ variant: 'ghost' }) + " text-primary"}>
                            View All Projects <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {featuredProjects.map((project) => (
                            <GlassCard key={project.slug} hoverEffect className="flex flex-col h-full bg-white border-gray-100 shadow-sm hover:shadow-xl">
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                                        {project.links?.github && (
                                            <a href={project.links.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black">
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-lg text-primary font-medium mb-3">{project.subtitle}</p>
                                    <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack.slice(0, 4).map(tech => (
                                            <Badge key={tech} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <Link to={`/projects/${project.slug}`} className={buttonVariants({ variant: 'secondary', className: "w-full" })}>
                                    View Case Study
                                </Link>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Knowledge Canvas */}
            <KnowledgeCanvas />

            {/* Latest Articles */}
            <Section className="py-24 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Writing</h2>
                        <p className="text-gray-600">Thoughts on the convergence of Finance and AI Engineering.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {(data.articles || []).slice(0, 3).map((article, i) => (
                            <a key={i} href={article.link} target="_blank" rel="noreferrer" className="block group">
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-full hover:border-primary/30">
                                    <div className="text-xs font-mono text-gray-400 mb-3">{article.date}</div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map(tag => (
                                            <span key={tag} className="inline-block bg-gray-50 text-gray-500 text-xs px-2 py-1 rounded-md">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/newsletter" className={buttonVariants({ variant: 'outline' })}>
                            Read All Articles <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Home;
