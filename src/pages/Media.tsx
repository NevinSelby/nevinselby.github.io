import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { data } from '@/content/data';
import { Youtube, Instagram, Play } from 'lucide-react';

import { SEO } from '@/components/layout/SEO';

const Media = () => {
    const { videos } = data;

    return (
        <div className="min-h-screen pt-20">
            <SEO title="Media & Adventures" description="Travel vlogs and photography." />
            <Section>
                <div className="container mx-auto px-6">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-12">Media & Gallery</h1>
                        <p className="text-slate-400">Beyond the terminal. Exploring the world through video and photography.</p>
                    </div>

                    <div className="space-y-16">

                        {/* YouTube Section - Dynamic */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-red-600 mb-2">
                                <Youtube className="w-6 h-6" />
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Latest Vlogs</h2>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8">
                                {videos && videos.length > 0 ? (
                                    videos.map((video, i) => (
                                        <div key={i} className="space-y-3 group">
                                            <a href={video.link} target="_blank" rel="noreferrer">
                                                <GlassCard className="overflow-hidden p-0 aspect-video relative group border-0 shadow-lg hover:shadow-xl transition-all">
                                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors cursor-pointer z-10">
                                                        <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-lg backdrop-blur-sm">
                                                            <Play className="w-6 h-6 fill-current ml-1" />
                                                        </div>
                                                    </div>
                                                    <img
                                                        src={video.thumbnail}
                                                        alt={video.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </GlassCard>
                                            </a>
                                            <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">{video.title}</h3>
                                            <p className="text-xs text-gray-500">{video.date}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        No videos loaded. Run `npm run sync` to fetch latest content.
                                    </div>
                                )}
                            </div>

                            <div className="text-center pt-8">
                                <a href="https://www.youtube.com/@nevinselby" target="_blank" rel="noreferrer">
                                    <Button variant="outline" className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                                        Visit YouTube Channel <Youtube className="w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </div>

                        {/* Photography Grid - Static/Manual for now */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-pink-500 mb-2">
                                <Instagram className="w-6 h-6" />
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Gallery</h2>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96">
                                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
                                    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Travel" />
                                </div>
                                <div className="rounded-2xl overflow-hidden relative group">
                                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Travel" />
                                </div>
                                <div className="rounded-2xl overflow-hidden relative group">
                                    <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Travel" />
                                </div>
                                <div className="col-span-2 rounded-2xl overflow-hidden relative group bg-gray-100 flex items-center justify-center">
                                    <p className="text-gray-400 text-sm">More on Instagram</p>
                                </div>
                            </div>

                            <div className="text-center pt-8">
                                <a href="https://www.instagram.com/nevinselby" target="_blank" rel="noreferrer">
                                    <Button variant="outline" className="gap-2 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200">
                                        Follow Adventures <Instagram className="w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Media;
