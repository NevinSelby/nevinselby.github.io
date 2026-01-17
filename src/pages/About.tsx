
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
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Me</h1>
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


                        {/* Values / Interests */}
                        <div className="grid md:grid-cols-3 gap-6 pt-12">
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
