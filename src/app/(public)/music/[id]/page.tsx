/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, Play, Pause, Share2, 
  Download, Disc, Music, ShoppingBag, 
  Heart, ListMusic, Volume2, Plus, Star
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const MusicDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const [album, setAlbum] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState('vinyl');

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const response = await axios.get('/data/music.json');
                const selectedAlbum = response.data.find((item: any) => item.id.toString() === id);
                setAlbum(selectedAlbum);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching album details:", error);
                setLoading(false);
            }
        };
        fetchAlbumDetails();
    }, [id]);

    if (loading) return (
        <div className="bg-[#050505] min-h-screen flex items-center justify-center">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-t-2 border-[#FF4D3D] rounded-full animate-spin" />
            </div>
        </div>
    );

    if (!album) return null;

    return (
        <main className="bg-[#050505] min-h-screen text-white selection:bg-[#FF4D3D] pb-32 overflow-x-hidden">
            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#FF4D3D]/10 to-transparent opacity-30" />
            </div>

            <div className="max-w-[1300px] mx-auto px-6 py-8 relative z-10">
                
                {/* --- Breadcrumb & Actions --- */}
                <nav className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-500 inter-medium">
                        <span className="hover:text-white cursor-pointer" onClick={() => router.push('/')}>Music</span>
                        <span>/</span>
                        <span className="hover:text-white cursor-pointer">Releases</span>
                        <span>/</span>
                        <span className="text-[#FF4D3D]">{album.title}</span>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setIsLiked(!isLiked)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
                            <Heart size={18} className={isLiked ? "fill-[#FF4D3D] text-[#FF4D3D]" : ""} />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
                            <Share2 size={18} />
                        </button>
                    </div>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* --- Left Content: Hero & Tracklist --- */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* Hero Section */}
                        <div className="flex flex-col md:flex-row gap-10 items-start">
                            <div className="w-full md:w-[380px] aspect-square relative rounded-xl overflow-hidden shadow-2xl">
                                <Image src={album.cover_image} alt={album.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1 pt-4">
                                <span className="bg-[#FF4D3D] text-[9px] inter-bold px-2 py-1 rounded-sm uppercase tracking-tighter mb-4 inline-block">New Release</span>
                                <h1 className="judson-bold text-7xl mb-2 leading-none">{album.title}</h1>
                                <div className="flex items-center gap-3 text-zinc-500 text-[11px] uppercase tracking-[0.2em] inter-bold">
                                    <span>{album.main_genre}</span>
                                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                    <span>{album.release_year}</span>
                                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                    <span>{album.tracklist?.length} Tracks</span>
                                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                    <span>48:20</span>
                                </div>
                                
                                <div className="flex items-center gap-4 mt-8">
                                    <button className="bg-white text-black px-8 py-3 rounded-full inter-bold text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#FF4D3D] hover:text-white transition-all">
                                        <Play size={14} fill="currentColor"/> Stream Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tracklist */}
                        <section>
                            <div className="flex justify-between items-end mb-6">
                                <h3 className="judson-bold text-3xl italic">Tracklist</h3>
                                <button className="text-[#FF4D3D] text-[10px] inter-bold uppercase tracking-widest hover:underline">Preview All</button>
                            </div>
                            <div className="bg-[#111]/40 border border-white/5 rounded-2xl overflow-hidden">
                                {album.tracklist?.map((track: any, idx: number) => (
                                    <div key={idx} className={`flex items-center justify-between p-5 transition-all group cursor-pointer ${idx === 0 ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'}`}>
                                        <div className="flex items-center gap-6">
                                            <span className={`text-xs inter-bold ${idx === 0 ? 'text-[#FF4D3D]' : 'text-zinc-600'}`}>
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                            {idx === 0 && <Play size={16} className="text-[#FF4D3D]" fill="currentColor" />}
                                            <div>
                                                <p className="inter-bold text-sm mb-0.5">{track.title}</p>
                                                <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">LUMINA • {album.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            {idx === 0 && <div className="flex gap-[2px] items-end h-3">
                                                {[1,2,3,4,5,4,3,2].map((h, i) => <div key={i} className="w-[3px] bg-[#FF4D3D]" style={{height: `${h*20}%`}} />)}
                                            </div>}
                                            <span className="text-[11px] text-zinc-500 font-mono">{track.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reviews */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="judson-bold text-3xl italic">Reviews</h3>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-[#FF4D3D]">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                    </div>
                                    <span className="text-[11px] text-zinc-400 inter-medium">(4.8/5 • 128 Reviews)</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: "Sarah Jenkins", text: "The production quality on this vinyl is absolutely insane. The bass response is tight and the synth layers are crystal clear.", date: "2 days ago" },
                                    { name: "Marcus Chen", text: "Digital download was instant and high quality FLAC. This album really captures that futuristic nostalgia perfectly.", date: "1 week ago" }
                                ].map((review, i) => (
                                    <div key={i} className="bg-[#111]/60 border border-white/5 p-6 rounded-2xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-zinc-800" />
                                                <div>
                                                    <p className="text-[12px] inter-bold">{review.name}</p>
                                                    <p className="text-[9px] text-[#FF4D3D] uppercase">Verified Purchase</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-zinc-600">{review.date}</span>
                                        </div>
                                        <p className="text-zinc-400 text-[13px] leading-relaxed italic">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-4 border border-white/5 rounded-xl text-[10px] inter-bold uppercase tracking-widest text-zinc-400 hover:bg-white/5 transition-all">Read All Reviews</button>
                        </section>
                    </div>

                    {/* --- Right Content: Sidebar (Format & Bundle) --- */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Format Selection Card */}
                        <div className="bg-[#111] border border-white/5 rounded-3xl p-8">
                            <h4 className="inter-bold text-[12px] uppercase tracking-widest mb-8">Select Format</h4>
                            <div className="space-y-4">
                                {[
                                    { id: 'digital', label: 'Digital Download', sub: 'MP3 (320kbps) + WAV / FLAC', price: '9.99' },
                                    { id: 'vinyl', label: 'Limited Edition Vinyl', sub: '180g Translucent Red Vinyl + Digital Download', price: '24.99', badge: 'SELLING FAST' },
                                    { id: 'cd', label: 'Compact Disc', sub: 'Digipak with 12-page booklet', price: '14.99' }
                                ].map((format) => (
                                    <div 
                                        key={format.id}
                                        onClick={() => setSelectedFormat(format.id)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedFormat === format.id ? 'border-[#FF4D3D] bg-[#FF4D3D]/5' : 'border-white/5 bg-white/[0.02]'}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedFormat === format.id ? 'border-[#FF4D3D]' : 'border-zinc-700'}`}>
                                                    {selectedFormat === format.id && <div className="w-2 h-2 bg-[#FF4D3D] rounded-full" />}
                                                </div>
                                                <p className="text-[13px] inter-bold">{format.label}</p>
                                            </div>
                                            <span className={`text-[13px] inter-bold ${selectedFormat === format.id ? 'text-[#FF4D3D]' : 'text-zinc-400'}`}>${format.price}</span>
                                        </div>
                                        <p className="text-[10px] text-zinc-500 pl-7">{format.sub}</p>
                                        {format.badge && (
                                            <p className="text-[9px] text-[#FF4D3D] inter-bold flex items-center gap-1 mt-2 pl-7">
                                                <span className="w-1.5 h-1.5 bg-[#FF4D3D] rounded-full animate-pulse" /> {format.badge}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button className="w-full bg-[#FF4D3D] text-white py-5 rounded-full mt-8 inter-bold text-[11px] uppercase tracking-widest hover:brightness-110 transition-all">
                                Add to Cart — ${selectedFormat === 'vinyl' ? '24.99' : selectedFormat === 'digital' ? '9.99' : '14.99'}
                            </button>
                            <p className="text-center text-[9px] text-zinc-600 mt-4 uppercase tracking-tighter">Ships within 2-3 business days. Worldwide shipping available.</p>
                        </div>

                        {/* Bundle Card */}
                        <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-6">
                            <div className="absolute top-4 right-4 bg-[#FFD700] text-black text-[9px] inter-bold px-2 py-1 rounded">Save 15%</div>
                            <p className="text-[10px] inter-bold text-zinc-500 uppercase tracking-widest mb-4">Complete the set</p>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex -space-x-3">
                                    <div className="w-12 h-12 rounded border border-white/20 overflow-hidden z-10">
                                        <Image src={album.cover_image} width={48} height={48} alt="t1" />
                                    </div>
                                    <div className="w-12 h-12 rounded border border-white/20 overflow-hidden">
                                        <Image src="/music/album-2.jpg" width={48} height={48} alt="t2" />
                                    </div>
                                </div>
                                <Plus size={14} className="text-zinc-600" />
                                <div>
                                    <p className="text-[12px] inter-bold">The Vinyl Collection Bundle</p>
                                    <p className="text-[10px] text-zinc-500">Echoes of Eternity (LP) + Static Dreams (LP)</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <button className="text-[10px] inter-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10">Add Bundle</button>
                                <div className="text-right">
                                    <span className="text-zinc-600 text-[11px] line-through mr-2">$49.98</span>
                                    <span className="text-[14px] inter-bold">$42.48</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* You Might Also Like Section */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="judson-bold text-4xl italic">You Might Also Like</h3>
                        <div className="flex gap-2">
                             <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><ChevronLeft size={16} /></button>
                             <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all rotate-180"><ChevronLeft size={16} /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Midnight Void", price: "9.99", img: "/music/album-3.jpg" },
                            { name: "Neon Horizon", price: "29.99", img: "/music/album-2.jpg" },
                            { name: "Digital Silence", price: "14.99", img: "/music/album-4.jpg" },
                            { name: "Static Dreams", price: "18.99", img: "/music/album-1.jpg" }
                        ].map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-square relative rounded-xl overflow-hidden mb-4 border border-white/5">
                                    <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h4 className="inter-bold text-[13px] mb-1">{item.name}</h4>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Lumina</span>
                                    <span className="text-[12px] inter-bold text-zinc-400">${item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Player Bar */}
            <AnimatePresence>
                <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-50">
                    <div className="bg-[#111]/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 px-6 flex items-center justify-between shadow-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 relative">
                                <Image src={album.cover_image} alt="Playing" fill className={`object-cover ${isPlaying ? 'animate-spin-slow' : ''}`} />
                            </div>
                            <div className="hidden sm:block">
                                <p className="inter-bold text-[11px] leading-tight">{album.title}</p>
                                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{album.artist}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all">
                                {isPlaying ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor" className="ml-1"/>}
                            </button>
                        </div>
                        <div className="hidden md:flex items-center gap-4 w-32">
                             <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                <div className={`h-full bg-[#FF4D3D] transition-all duration-1000 ${isPlaying ? 'w-2/3' : 'w-0'}`} />
                             </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                .judson-bold { font-family: 'Judson', serif; font-weight: 700; }
                .inter-bold { font-family: 'Inter', sans-serif; font-weight: 700; }
                .inter-medium { font-family: 'Inter', sans-serif; font-weight: 500; }
            `}</style>
        </main>
    );
};

export default MusicDetails;