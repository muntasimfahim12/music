/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconMusic, IconPlus, IconDisc, IconMicrophone,
    IconListNumbers, IconHistory, IconCurrencyDollar,
    IconPhotoPlus, IconDeviceFloppy, IconChevronLeft,
    IconTrash, IconSettings, IconClock, IconTag, IconBolt
} from "@tabler/icons-react";
import Link from "next/link";

export default function AddMusicPage() {
    const [tracks, setTracks] = useState([{ position: 1, title: "", duration: "" }]);

    const addTrack = () => {
        setTracks([...tracks, { position: tracks.length + 1, title: "", duration: "" }]);
    };

    const removeTrack = (index: number) => {
        setTracks(tracks.filter((_, i) => i !== index));
    };

    const inputClasses = `
        w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 
        text-slate-700 font-medium text-sm transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC]
        placeholder:text-slate-300
    `;

    const labelClasses = "text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 flex items-center gap-2";
    const cardClasses = "bg-white p-6 md:p-8 rounded-none md:rounded-[32px] border-b md:border border-slate-100 shadow-none md:shadow-sm";

    // Reusable Shimmer Button
    const ShimmerButton = ({ className = "" }: { className?: string }) => (
        <button className={`
            inline-flex h-14 animate-shimmer items-center justify-center 
            rounded-2xl border border-slate-800 
            bg-[linear-gradient(110deg,#0f172a,45%,#334155,55%,#0f172a)] 
            bg-[length:200%_100%] px-8 font-bold text-slate-200 
            transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 
            focus:ring-offset-2 focus:ring-offset-slate-50 uppercase tracking-[0.25em] text-[11px]
            active:scale-[0.98] shadow-2xl ${className}
        `}>
            <IconDeviceFloppy size={18} className="mr-3 opacity-70" stroke={2} />
            CONFIRM RELEASE
        </button>
    );

    return (
        <div className="max-w-[1400px] mx-auto pb-32 md:pb-20 px-0 md:px-6 font-sans selection:bg-[#4177BC]/10 bg-[#FBFCFD] min-h-screen">
            
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 pb-10 px-6 md:px-0">
                <div className="space-y-1">
                    <Link href="/adminDashboard/music" className="flex items-center gap-2 text-slate-400 hover:text-[#4177BC] transition-all text-[11px] font-black uppercase tracking-widest mb-4 group">
                        <IconChevronLeft size={16} stroke={3} className="group-hover:-translate-x-1 transition-transform" /> 
                        Back to Vault
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight inter-bold">
                        Release <span className="text-slate-400 font-medium">New Audio</span>
                    </h1>
                </div>
                
                {/* Desktop Action */}
                <div className="hidden md:block">
                    <ShimmerButton />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8">
                
                {/* --- LEFT COLUMN --- */}
                <div className="lg:col-span-8 space-y-0 md:space-y-8">
                    
                    {/* Album Metadata */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconMusic size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Metadata</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className={labelClasses}>Album / Release Title</label>
                                    <input type="text" placeholder="e.g. Digital Silence" className={inputClasses} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Lead Artist</label>
                                    <input type="text" placeholder="Null Pointer" className={inputClasses} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Main Genre</label>
                                    <select className={inputClasses}>
                                        <option>Experimental</option>
                                        <option>Industrial</option>
                                        <option>Ambient</option>
                                        <option>Techno</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClasses}>Release Year</label>
                                    <input type="text" placeholder="2022" className={inputClasses} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Total Duration</label>
                                    <input type="text" placeholder="55:00" className={inputClasses} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Description</label>
                                <textarea rows={3} placeholder="Glitch-hop beats mixed with organic field recordings..." className={`${inputClasses} resize-none`} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Tracklist Section */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-5">
                            <div className="flex items-center gap-3">
                                <IconListNumbers size={22} className="text-purple-500" />
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Tracklist</h2>
                            </div>
                            <button onClick={addTrack} className="text-[10px] font-black text-[#4177BC] uppercase tracking-widest flex items-center gap-1 hover:underline px-1">
                                <IconPlus size={14} stroke={3} /> Add Track
                            </button>
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence>
                                {tracks.map((track, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                                        className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-slate-200 transition-all group"
                                    >
                                        <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-[10px] font-black text-slate-400">
                                            {index + 1}
                                        </span>
                                        <input type="text" placeholder="Track Title" className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none" />
                                        <div className="flex items-center gap-2">
                                            <IconClock size={14} className="text-slate-300" />
                                            <input type="text" placeholder="4:50" className="w-16 bg-transparent border-none focus:ring-0 text-sm text-center font-medium text-slate-400 outline-none" />
                                        </div>
                                        <button onClick={() => removeTrack(index)} className="p-2 text-slate-300 hover:text-rose-500 transition-all">
                                            <IconTrash size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="lg:col-span-4 space-y-0 md:space-y-8">
                    
                    {/* Artwork */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6">
                            <IconPhotoPlus size={20} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Artwork</h2>
                        </div>

                        <div className="relative aspect-square border-2 border-dashed border-slate-100 rounded-[24px] flex flex-col items-center justify-center group hover:border-[#4177BC] hover:bg-slate-50 transition-all cursor-pointer overflow-hidden">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-[#4177BC] mb-4 transition-all border border-slate-100">
                                <IconPlus size={24} stroke={3} />
                            </div>
                            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Upload Cover</p>
                            <p className="text-[9px] text-slate-400 mt-2 font-black uppercase">High-Res (1:1)</p>
                        </div>
                    </motion.div>

                    {/* Format Pricing */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6">
                            <IconCurrencyDollar size={20} className="text-emerald-500" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Format Pricing</h2>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className={labelClasses}>Lossless Audio (Digital)</label>
                                <input type="number" placeholder="14.99" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Limited Tape (Cassette)</label>
                                <input type="number" placeholder="18.00" className={inputClasses} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Bundle Deal */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6">
                            <IconBolt size={20} className="text-orange-500" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Bundle Offer</h2>
                        </div>
                        <div className="space-y-5">
                            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl mb-4">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-[#4177BC] focus:ring-[#4177BC]" />
                                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Enable Bundle</span>
                            </div>
                            <div>
                                <label className={labelClasses}>Bundle Price</label>
                                <input type="number" placeholder="25.99" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Items Included</label>
                                <input type="text" placeholder="Cassette + Digital + Sticker" className={inputClasses} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Fixed Action Center */}
            <div className=" bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 md:hidden z-50 flex justify-center">
                <ShimmerButton className="" />
            </div>
        </div>
    );
}