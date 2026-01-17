import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { data } from '@/content/data';
import { Cpu, Globe, Camera, Mail, MapPin, Link as LinkIcon, Instagram, Youtube, Calendar } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { motion } from 'framer-motion';

const About = () => {
    const { profile } = data;

    return (
        <div className="relative min-h-screen pt-20 overflow-hidden">
            <SEO title="About Me" description={profile.oneLiner} />

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            <Section>
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col lg:flex-row gap-12"
                        >
                            {/* Left Column: Profile Card */}
                            <div className="lg:w-1/3 space-y-6">
                                <GlassCard className="p-8 sticky top-32">
                                    <div className="space-y-6">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                                            <p className="text-primary font-medium">{profile.title}</p>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm">{profile.location}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-primary">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm">{profile.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-primary">
                                                    <LinkIcon className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm">{profile.website}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-6 border-t border-gray-100">
                                            <a href={profile.social.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                                                <Youtube className="w-5 h-5" />
                                            </a>
                                            <a href={profile.social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                                                <Instagram className="w-5 h-5" />
                                            </a>
                                            <a href={profile.social.calendly} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                                                <Calendar className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>

                            {/* Right Column: Bio & Story */}
                            <div className="lg:w-2/3 space-y-12">
                                <div className="space-y-6">
                                    <h2 className="text-4xl font-bold text-gray-900 tracking-tight">The Story Behind the Systems</h2>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                                        <div className="space-y-6">
                                            {profile.bio.map((paragraph, i) => (
                                                <p key={`bio-${i}`}>{paragraph}</p>
                                            ))}
                                        </div>

                                        <div className="relative py-12">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-100"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-4 text-sm text-gray-400 font-medium tracking-widest uppercase">My Journey</span>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {profile.personalJourney?.map((paragraph, i) => (
                                                <p key={`journey-${i}`} className="italic border-l-4 border-primary/20 pl-6">{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Value Cards */}
                                <div className="grid md:grid-cols-3 gap-6 pt-8">
                                    <GlassCard className="p-6 space-y-4 hover:border-primary/30 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary group-hover:rotate-6 transition-transform">
                                            <Cpu className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-gray-900 font-bold">Systems Thinking</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Optimizing from the kernel to the cloud. I love making things run fast and efficient.</p>
                                    </GlassCard>

                                    <GlassCard className="p-6 space-y-4 hover:border-success/30 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-success">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-gray-900 font-bold">Global Mindset</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Adventurer by heart. I bring diverse experiences from global travel into my problem solving.</p>
                                    </GlassCard>

                                    <GlassCard className="p-6 space-y-4 hover:border-warning/30 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-warning">
                                            <Camera className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-gray-900 font-bold">Storytelling</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Whether through code, video, or photos, I believe communication is key to impact.</p>
                                    </GlassCard>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default About;
