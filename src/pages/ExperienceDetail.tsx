import { useParams, Link, Navigate } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { data } from '@/content/data';
import { SEO } from '@/components/layout/SEO';
import { ArrowLeft, Building2, MapPin, Calendar, Terminal } from 'lucide-react';

const ExperienceDetail = () => {
    const { slug } = useParams();
    const experience = data.experience.find(e => e.slug === slug);

    if (!experience) {
        return <Navigate to="/experience" replace />;
    }

    return (
        <div className="min-h-screen pt-20 pb-20">
            <SEO
                title={`${experience.role} at ${experience.company}`}
                description={`Details about my role as ${experience.role} at ${experience.company}.`}
            />

            <Section>
                <div className="container mx-auto px-6 max-w-4xl">

                    <Link to="/experience" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Timeline
                    </Link>

                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{experience.role}</h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 mb-6">
                            <div className="flex items-center gap-2 text-xl font-medium text-primary">
                                <Building2 className="w-5 h-5" />
                                {experience.company}
                            </div>
                            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {experience.location}
                            </div>
                            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {experience.period}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8">
                        {/* Narrative Description */}
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Role</h3>
                            {experience.description?.map((paragraph, i) => (
                                <p key={i} className="mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Key Highlights */}
                        <GlassCard className="bg-blue-50/50 border-blue-100 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-primary" /> Key Contributions
                            </h3>
                            <div className="space-y-4">
                                {experience.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        <p className="text-gray-700">{highlight}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                </div>
            </Section>
        </div>
    );
};

export default ExperienceDetail;
