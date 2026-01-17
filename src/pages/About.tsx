
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { data } from '@/content/data';
import { Cpu, Globe, Camera } from 'lucide-react'; // Kept generic icons for values section

import { SEO } from '@/components/layout/SEO';

const About = () => {
    const { profile } = data;

    return (
        <div className="min-h-screen pt-20">
            <SEO title="About Me" description={profile.oneLiner} />
            <Section>
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-12">


                        {/* Unified Bio & Journey */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Me</h1>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Resume
                            </a>
                        </div>
                        <div className="prose prose-lg text-gray-600 leading-relaxed">
                            {profile.bio.map((paragraph, i) => (
                                <p key={`bio-${i}`} className="mb-4">{paragraph}</p>
                            ))}
                            {/* Divider or smooth transition */}
                            <div className="w-20 h-1 bg-primary/20 rounded-full my-8"></div>
                            {profile.personalJourney && profile.personalJourney.map((paragraph, i) => (
                                <p key={`journey-${i}`} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>


                    {/* Skills Grid */}

                    {/* Experience Section */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp) => (
                                <GlassCard key={exp.slug} className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                                            <p className="text-primary font-medium">{exp.company}</p>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1 md:mt-0">
                                            <p>{exp.period}</p>
                                            <p>{exp.location}</p>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-600">
                                        {exp.description.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    {/* Education & Certs Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Education */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">Education</h2>
                            <div className="space-y-4">
                                {data.education?.map((edu, i) => (
                                    <GlassCard key={i} className="p-6">
                                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                        <p className="text-primary text-sm font-medium">{edu.school}</p>
                                        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                            <span>{edu.period}</span>
                                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">Certifications</h2>
                            <div className="space-y-4">
                                {data.certifications?.map((cert, i) => (
                                    <GlassCard key={i} className="p-6">
                                        <h3 className="font-bold text-gray-900">{cert.name}</h3>
                                        {cert.issuer && <p className="text-gray-500 text-sm">{cert.issuer}</p>}
                                        {cert.date && <p className="text-gray-400 text-xs mt-1">{cert.date}</p>}
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Values / Interests */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <GlassCard className="text-center p-6 space-y-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto text-primary">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-gray-900 font-bold">Systems Thinking</h3>
                            <p className="text-sm text-gray-500">Optimizing from the kernel to the cloud. I love making things run fast and efficient.</p>
                        </GlassCard>
                        <GlassCard className="text-center p-6 space-y-4">
                            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto text-success">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-gray-900 font-bold">Global Perspective</h3>
                            <p className="text-sm text-gray-500">Adventurer by heart. I bring diverse experiences from travel into my problem solving.</p>
                        </GlassCard>
                        <GlassCard className="text-center p-6 space-y-4">
                            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mx-auto text-warning">
                                <Camera className="w-6 h-6" />
                            </div>
                            <h3 className="text-gray-900 font-bold">Storytelling</h3>
                            <p className="text-sm text-gray-500">Whether through code, video, or photos, communication is key to impact.</p>
                        </GlassCard>
                    </div>

                </div>
        </div>
            </Section >
        </div >
    );
};

export default About;
