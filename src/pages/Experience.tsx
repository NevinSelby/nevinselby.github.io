import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { data } from '@/content/data';
import { Calendar, MapPin, Building2 } from 'lucide-react';

import { SEO } from '@/components/layout/SEO';

const Experience = () => {
    const { experience } = data;

    return (
        <div className="min-h-screen pt-20">
            <SEO title="Experience" description="Professional experience timeline in AI and Data Science." />
            <Section>
                <div className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-12">Professional Experience</h1>

                    <div className="relative space-y-12">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-8 top-4 bottom-4 w-px bg-gradient-to-b from-primary/20 to-transparent md:block hidden" />

                        {experience.map((role, index) => (
                            <div key={index} className="relative pl-0 md:pl-20">
                                {/* Timeline Dot */}
                                <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm md:block hidden transform -translate-x-1/2" />

                                <Link to={`/experience/${role.slug}`} className="block">
                                    <GlassCard className="p-8 relative group hover:border-primary/30 transition-colors cursor-pointer">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">{role.role}</h3>
                                                <div className="flex items-center gap-2 text-gray-500 mt-1">
                                                    <Building2 className="w-4 h-4" />
                                                    <span className="font-medium">{role.company}</span>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-start md:items-end gap-1">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-sm font-mono text-primary">
                                                    <Calendar className="w-3 h-3" /> {role.period}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                                    <MapPin className="w-3 h-3" /> {role.location}
                                                </div>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-6">
                                            {role.highlights.slice(0, 3).map((highlight, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-600">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                                                    <span className="leading-relaxed">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="text-primary font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                            Read Full Role Details &rarr;
                                        </div>
                                    </GlassCard>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Experience;
