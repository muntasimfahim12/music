/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Play, Pause, Share2,
    Heart, Plus, ChevronLeft,
    Disc3, ShoppingCart,
    Music2, Flame, Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Reviews from '@/src/components/shared/Reviews';

const MusicDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const [album, setAlbum] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState('');

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const response = await axios.get('/data/music.json');
                const selectedAlbum = response.data.find((item: any) => item.id.toString() === id);
                setAlbum(selectedAlbum);
                if (selectedAlbum?.formats?.length > 0) {
                    setSelectedFormat(selectedAlbum.formats[0].id);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching album details:", error);
                setLoading(false);
            }
        };
        fetchAlbumDetails();
    }, [id]);

    if (loading) return (
        <div className="bg-black min-h-screen flex items-center justify-center">
            <div className="relative">
                <div className="w-24 h-24 border border-white/5 rounded-full" />
                <div className="absolute inset-0 border-t border-[#FF4D3D] rounded-full animate-spin" />
                <Disc3 className="absolute inset-0 m-auto text-[#FF4D3D] animate-pulse" size={32} />
            </div>
        </div>
    );

    if (!album) return null;

    return (
        <main className="bg-[#000000] min-h-screen text-white selection:bg-[#FF4D3D]/30 pb-20 overflow-x-hidden font-inter">
            {/* Ambient Lighting - Subtler for Premium Feel */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#FF4D3D]/5 blur-[120px] rounded-full opacity-40" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full opacity-20" />
            </div>

            <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10">

                {/* --- Top Navigation & Back Link --- */}
                <div className="pt-8 flex flex-col gap-6 mb-10">
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.push('/music')}
                        className="flex items-center gap-2 text-zinc-500 hover:text-[#FF4D3D] transition-colors group w-fit"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">Back to Music</span>
                    </motion.button>

                    {/* --- Shadow-Based Minimalist Navigation --- */}
                    <nav className="relative">
                        <div className="flex items-center justify-between bg-black/40 backdrop-blur-xl rounded-2xl p-4 px-7 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
                            <div className="flex items-center gap-5">
                                {/* Simple Text Back Button with Cursor Pointer */}
                                <button
                                    onClick={() => router.push('/music')}
                                    className="group flex items-center gap-1 cursor-pointer"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 group-hover:text-[#FF4D3D] transition-colors duration-300">
                                        Go Back
                                    </span>
                                </button>

                                {/* Vertical Divider Line */}
                                <div className="h-3 w-[1px] bg-white/5 hidden sm:block" />

                                {/* Clean Text Breadcrumbs */}
                                <div className="hidden sm:flex items-center gap-4 text-[9px] uppercase tracking-[0.2em] font-black">
                                    <span className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer">
                                        {album.main_genre}
                                    </span>

                                    {/* Visual Dot instead of Icon */}
                                    <div className="w-1 h-1 bg-zinc-800 rounded-full" />

                                    <span className="text-[#FF4D3D] tracking-[0.25em] cursor-default">
                                        {album.title}
                                    </span>
                                </div>
                            </div>

                            {/* Right Side Info */}
                            <div className="hidden md:block">
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700 select-none">
                                    Release {album.release_year}
                                </span>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* --- Left Column --- */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Hero Section */}
                        <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-[320px] lg:w-[380px] shrink-0"
                            >
                                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl group">
                                    <Image
                                        src={album.cover_image}
                                        alt={album.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            <div className="flex-1 space-y-5">
                                <div className="inline-flex items-center gap-2 bg-[#FF4D3D]/10 text-[#FF4D3D] text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-[#FF4D3D]/20">
                                    <span className="w-1.5 h-1.5 bg-[#FF4D3D] rounded-full animate-pulse" />
                                    {album.tag || "New Release"}
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl judson-bold text-white leading-[1.1]">
                                    {album.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                                    <span className="text-zinc-200">{album.artist}</span>
                                    <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                    <span>{album.main_genre}</span>
                                    <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                    <span>{album.release_year}</span>
                                </div>

                                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                                    {album.description}
                                </p>

                                <div className="flex items-center gap-3 pt-2">
                                    <div className="flex flex-row items-center justify-center md:justify-start gap-2.5 flex-nowrap mt-2">
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="bg-white text-black px-5 md:px-7 py-2.5 md:py-3 rounded-full font-black text-[9px] md:text-[11px] uppercase tracking-[0.15em] flex items-center gap-2 hover:bg-zinc-200 transition-all active:scale-95 shadow-lg whitespace-nowrap"
                                        >
                                            {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" />}
                                            <span>Stream Now</span>
                                        </button>

                                        <button onClick={() => setIsLiked(!isLiked)} className="p-2.5 md:p-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white active:scale-95 shrink-0">
                                            <Heart size={16} className={`${isLiked ? "fill-[#FF4D3D] text-[#FF4D3D]" : ""}`} />
                                        </button>

                                        <button className="p-2.5 md:p-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white active:scale-95 shrink-0">
                                            <Share2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tracklist Section */}
                        <section className="space-y-6">
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                <div>
                                    <h3 className="judson-bold text-3xl tracking-tight uppercase">Tracklist</h3>
                                    <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Studio Master • {album.total_tracks} Songs</p>
                                </div>
                                <span className="text-zinc-500 text-[10px] font-mono">{album.duration} Total</span>
                            </div>

                            <div className="grid gap-1">
                                {album.tracklist?.map((track: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-all group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="w-4 text-[10px] font-black text-zinc-800 group-hover:text-[#FF4D3D]">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                            <div>
                                                <p className="font-bold text-sm text-white/90 group-hover:text-white transition-colors">{track.title}</p>
                                                <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mt-0.5">Hi-Res Audio</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <span className="text-[11px] text-zinc-600 font-mono">{track.duration}</span>
                                            <button className="opacity-0 group-hover:opacity-100 p-2 bg-white/5 rounded-full hover:bg-[#FF4D3D] transition-all">
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <div className="pt-10 border-t border-white/5">
                            <Reviews />
                        </div>
                    </div>

                    {/* --- Right Column (Sidebar) --- */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-10 space-y-6">
                            <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 shadow-2xl">
                                <h2 className="text-white text-xl judson-bold mb-6 uppercase tracking-widest">Select Format</h2>

                                <div className="space-y-3">
                                    {album.formats?.map((format: any) => (
                                        <div
                                            key={format.id}
                                            onClick={() => setSelectedFormat(format.id)}
                                            className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${selectedFormat === format.id ? 'border-[#FF4D3D] bg-[#FF4D3D]/5' : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedFormat === format.id ? 'border-[#FF4D3D]' : 'border-zinc-800'}`}>
                                                        {selectedFormat === format.id && <div className="w-2 h-2 bg-[#FF4D3D] rounded-full" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-bold">{format.label}</p>
                                                        <p className="text-[9px] text-zinc-500 tracking-wide">{format.sub}</p>
                                                    </div>
                                                </div>
                                                <span className={`font-black text-sm ${selectedFormat === format.id ? 'text-[#FF4D3D]' : 'text-zinc-400'}`}>${format.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full bg-[#FF4D3D] text-white py-4 rounded-2xl mt-8 font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg">
                                    <ShoppingCart size={16} /> Add To Cart
                                </button>
                            </div>

                            {/* Bundle Deal */}
                            {album.bundle_deal && (
                                <motion.div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[32px] p-6 relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[#FFB800] text-[8px] font-black uppercase tracking-[0.2em]">Collectors Edition</span>
                                            <span className="bg-[#FFB800] text-black text-[8px] font-black px-2 py-0.5 rounded">SAVE {album.bundle_deal.save}</span>
                                        </div>
                                        <h4 className="text-[13px] font-bold mb-1">{album.bundle_deal.title}</h4>
                                        <p className="text-[9px] text-zinc-500 mb-4">{album.bundle_deal.items}</p>
                                        <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex justify-between px-4 items-center">
                                            <span>Upgrade to Bundle</span>
                                            <span className="text-white">${album.bundle_deal.price}</span>
                                        </button>
                                    </div>
                                    <Sparkles size={40} className="absolute -top-2 -right-2 text-white/5 group-hover:text-[#FFB800]/10 transition-colors" />
                                </motion.div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>

            {/* --- Premium Floating Player --- */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-8 left-0 right-0 px-6 z-[100]"
                    >
                        <div className="max-w-[900px] mx-auto bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-full p-3 px-8 flex items-center justify-between shadow-2xl">
                            <div className="flex items-center gap-5 flex-1">
                                <div className="relative w-12 h-12 shrink-0">
                                    <Image src={album.cover_image} alt="Playing" fill className="object-cover rounded-full animate-spin-slow border border-[#FF4D3D]/50" />
                                </div>
                                <div className="hidden sm:block">
                                    <h5 className="font-bold text-[12px] uppercase tracking-wider">{album.title}</h5>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{album.artist}</p>
                                </div>

                                <div className="flex-1 px-10 hidden md:flex flex-col gap-1.5">
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} className="h-full bg-[#FF4D3D]" />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase">
                                        <span>01:42</span>
                                        <span>{album.tracklist?.[0]?.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-5">
                                <button className="text-zinc-500 hover:text-white transition-colors"><Music2 size={16} /></button>
                                <button
                                    onClick={() => setIsPlaying(false)}
                                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#FF4D3D] hover:text-white transition-all shadow-lg"
                                >
                                    <Pause size={18} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Judson:wght@700&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
                .judson-bold { font-family: 'Judson', serif; font-weight: 700; }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 12s linear infinite; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #000; }
                ::-webkit-scrollbar-thumb { background: #111; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #FF4D3D; }
            `}</style>
        </main>
    );
};

export default MusicDetails;