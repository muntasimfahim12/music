/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const RelatedMusic = () => {
    const router = useRouter();
    const [relatedAlbums, setRelatedAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchRelatedMusic = async () => {
            try {
                const response = await axios.get('/data/music.json');
                setRelatedAlbums(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching related music:", error);
                setLoading(false);
            }
        };
        fetchRelatedMusic();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth 
                : scrollLeft + clientWidth;
            
            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center mx-auto" style={{ width: '1216px', height: '495px' }}>
            <div className="text-zinc-700 uppercase text-[10px] tracking-widest font-black">Loading...</div>
        </div>
    );

    return (
        <section 
            className="mx-auto mt-4 border-t border-white/5 pt-8 selection:bg-[#FF4D3D]/30 relative overflow-hidden"
            style={{ width: '1216px', height: '495px' }}
        >
            {/* --- Section Header --- */}
            <div className="flex justify-between items-end mb-8 px-2">
                <div className="space-y-1">
                    <p className="text-[#FF4D3D] text-[10px] font-black uppercase tracking-[0.3em]">Discover</p>
                    <h2 className="text-white text-4xl tracking-tight judson-bold">
                        You Might Also Like
                    </h2>
                </div>

                {/* --- Controls --- */}
                <div className="flex gap-3">
                    <button 
                        onClick={() => scroll('left')}
                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-[#FF4D3D] hover:border-[#FF4D3D] transition-all duration-300 group"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-[#FF4D3D] hover:border-[#FF4D3D] transition-all duration-300 group"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* --- Horizontal Scroll Container --- */}
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 px-2 no-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <AnimatePresence>
                    {relatedAlbums.map((related: any, index: number) => (
                        <motion.div 
                            key={related.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => router.push(`/music/${related.id}`)}
                            className="min-w-[280px] snap-start group cursor-pointer mb-4"
                        >
                            {/* --- Album Cover (Design Unchanged) --- */}
                            <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-500 relative mb-4 shadow-2xl">
                                <img 
                                    src={related.cover_image} 
                                    alt={related.title} 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                     <div className="w-10 h-10 bg-[#FF4D3D] rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                                        <ChevronRight size={18} className="text-white ml-1" />
                                     </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                            </div>

                            {/* --- Music Details --- */}
                            <div className="space-y-1.5 px-1">
                                <h4 className="text-white text-base font-bold truncate group-hover:text-[#FF4D3D] transition-colors duration-300 font-inter">
                                    {related.title}
                                </h4>
                                
                                <div className="flex justify-between items-center">
                                    <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] font-inter">
                                        {related.artist}
                                    </p>
                                    <p className="text-[#FF4D3D] text-xs font-bold bg-[#FF4D3D]/10 px-2 py-0.5 rounded">
                                        ${related.formats?.[0]?.price?.toFixed(2) || "9.99"}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Judson:wght@700&display=swap');
                .judson-bold { font-family: 'Judson', serif; font-weight: 700; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -webkit-overflow-scrolling: touch; }
            `}</style>
        </section>
    );
};

export default RelatedMusic;