
import { useParams, Link, Navigate } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { buttonVariants } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { data } from '@/content/data';
import { ArrowLeft, Github, ExternalLink, Activity, Cpu, Layers } from 'lucide-react';

import { SEO } from '@/components/layout/SEO';

const ProjectDetail = () => {
    const { slug } = useParams();
    const project = data.projects.find(p => p.slug === slug);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    return (
        <div className="min-h-screen pt-20">
            <SEO title={project.title} description={project.description} />
            <Section>
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link to="/projects" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                    </Link>

                    <div className="space-y-4 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{project.title}</h1>
                        <p className="text-xl text-primary font-light">{project.subtitle}</p>
                        <div className="flex flex-wrap gap-2 pt-4">
                            {project.techStack.map(tech => (
                                <Badge key={tech} variant="default" className="bg-gray-100 text-gray-700">{tech}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {project.links.live && (
                            <a href={project.links.live} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'primary', size: 'lg', className: "w-full" })}>
                                Live Demo <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        )}
                        <a href={project.links.github} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'secondary', size: 'lg', className: "w-full" })}>
                            View Code <Github className="w-4 h-4 ml-2" />
                        </a>
                    </div>

                    <div className="space-y-12">
                        <GlassCard className="p-8">
                            <div className="flex items-center gap-2 mb-4 text-primary">
                                <Activity className="w-6 h-6" />
                                <h2 className="text-2xl font-bold text-gray-900">The Problem</h2>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed">{project.problem}</p>
                        </GlassCard>

                        <GlassCard className="p-8">
                            <div className="flex items-center gap-2 mb-4 text-purple-500">
                                <Layers className="w-6 h-6" />
                                <h2 className="text-2xl font-bold text-gray-900">The Approach</h2>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed">{project.approach}</p>
                        </GlassCard>

                        <GlassCard className="p-8">
                            <div className="flex items-center gap-2 mb-4 text-success">
                                <Cpu className="w-6 h-6" />
                                <h2 className="text-2xl font-bold text-gray-900">Results & Impact</h2>
                            </div>
                            <ul className="space-y-4">
                                {project.results.map((result, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50 text-success font-bold text-sm mt-0.5">{i + 1}</span>
                                        <span className="text-lg text-gray-600">{result}</span>
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </div>

                </div>
            </Section>
        </div>
    );
};

export default ProjectDetail;
