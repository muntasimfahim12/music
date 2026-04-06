/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Play, Youtube, Search, ArrowRight, Monitor, Smartphone, Layout } from 'lucide-react';

const VIDEO_DATA = [
    {
        id: 1,
        title: "Nocturnal Vibe: Behind The Scenes",
        category: "BTS",
        youtubeId: "dQw4w9WgXcQ", 
        date: "APRIL 2026"
    },
    {
        id: 2,
        title: "Summer Collection 2026 Promo",
        category: "CAMPAIGN",
        youtubeId: "y6120QOlsfU",
        date: "MARCH 2026"
    },
    {
        id: 3,
        title: "The Craftsmanship of Organic Cotton",
        category: "PROCESS",
        youtubeId: "aqz-KE-bpKQ",
        date: "FEBRUARY 2026"
    }
];

const VideosPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const categories = ['ALL', 'CAMPAIGN', 'BTS', 'PROCESS', 'FILMS'];

    return (
        <main className="bg-[#050505] min-h-screen selection:bg-[#FF2E2E] selection:text-white">
            
            {/* --- Hero Section: Large Featured Video --- */}
            <section className="relative pt-32 pb-20 px-5 max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center mb-12 text-center">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#FF2E2E] inter-bold text-[10px] uppercase tracking-[0.5em] mb-4"
                    >
                        Featured Release
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white text-4xl md:text-7xl judson-bold max-w-4xl leading-tight"
                    >
                        Check out my latest videos
                    </motion.h1>
                </div>

                {/* Main Hero Video Player */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900 group shadow-2xl shadow-[#FF2E2E]/5"
                >
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&modestbranding=1&rel=0&showinfo=0`}
                        title="Featured Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </section>

            {/* --- Filter & Search Section --- */}
            <section className="max-w-7xl mx-auto px-5 mb-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-y border-white/5 py-8">
                    <div className="flex gap-8 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto justify-center md:justify-start">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[11px] inter-bold uppercase tracking-widest transition-all duration-300 relative ${
                                    selectedCategory === cat ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                            >
                                {cat}
                                {selectedCategory === cat && (
                                    <motion.div layoutId="underline" className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#FF2E2E]" />
                                )}
                            </button>
                        ))}
                    </div>
                    
                    <div className="relative group w-full md:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                        <input 
                            type="text" 
                            placeholder="SEARCH GALLERY..."
                            className="bg-transparent border border-white/10 rounded-none py-3 pl-12 pr-6 text-[10px] inter-medium text-white focus:outline-none focus:border-[#FF2E2E] w-full md:w-64 transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* --- Video Grid --- */}
            <section className="max-w-7xl mx-auto px-5 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {VIDEO_DATA.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5 bg-zinc-900 mb-6 transition-transform duration-500 group-hover:border-[#FF2E2E]/30">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`}
                                    title={video.title}
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[#FF2E2E] inter-bold text-[9px] tracking-[0.2em]">
                                        {video.category}
                                    </span>
                                    <span className="text-zinc-600 inter-medium text-[9px]">
                                        {video.date}
                                    </span>
                                </div>
                                <h3 className="text-white text-lg judson-bold leading-snug group-hover:text-zinc-300 transition-colors">
                                    {video.title}
                                </h3>
                                <div className="pt-2 flex items-center gap-2 text-zinc-500 text-[10px] inter-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Expand Details <ArrowRight size={12} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- Bottom CTA Section (Sharp Design) --- */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-40 border border-white/10 bg-[#0A0A0A] p-10 md:p-20 relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-12 h-[1px] bg-[#FF2E2E] mb-8" />
                        <h2 className="text-white text-3xl md:text-5xl judson-bold mb-6 text-center">Join Our Community</h2>
                        <p className="text-zinc-500 inter-medium text-sm max-w-xl mx-auto mb-10 text-center leading-relaxed">
                            Get exclusive access to behind-the-scenes content, early collection previews, and our creative journey directly on YouTube.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
                            <button className="w-full sm:w-auto bg-white text-black inter-bold text-[11px] uppercase tracking-[0.2em] px-12 py-5 hover:bg-[#FF2E2E] hover:text-white transition-all duration-500">
                                Subscribe Now
                            </button>
                            <button className="w-full sm:w-auto border border-white/20 text-white inter-bold text-[11px] uppercase tracking-[0.2em] px-12 py-5 hover:bg-white hover:text-black transition-all duration-500">
                                Official Channel
                            </button>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Footer space */}
            <footer className="py-10 border-t border-white/5 text-center">
                <p className="text-zinc-700 inter-medium text-[9px] tracking-[0.3em] uppercase">
                    © 2026 DEEBZLENÜZ Studio. All Visual Rights Reserved.
                </p>
            </footer>
        </main>
    );
};

export default VideosPage;