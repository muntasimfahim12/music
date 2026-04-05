"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconMusic, IconPlus, IconDisc, IconMicrophone,
    IconListNumbers, IconHistory, IconCurrencyDollar,
    IconPhotoPlus, IconDeviceFloppy, IconChevronLeft,
    IconTrash, IconSettings
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
        w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 
        text-slate-700 font-medium text-sm transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC]
        placeholder:text-slate-400
    `;

    const labelClasses = "text-[12px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2";

    return (
        <div className="max-w-6xl mx-auto pb-24 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="space-y-1">
                    <Link href="/adminDashboard/music" className="flex items-center gap-2 text-slate-400 hover:text-[#4177BC] transition-all text-sm font-bold mb-4 group">
                        <IconChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Store
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-slate-900 inter-bold tracking-tight">
                            Release new  <span className="text-slate-400 font-medium">music</span>
                        </h1>
                        <p className="text-[14px] text-slate-500 font-medium inter-medium">
                            Manage your vault stock, pricing, and product visibility.
                        </p>
                    </div>

                </div>

                <button className="flex items-center justify-center gap-2 bg-[#4177BC] hover:bg-[#34629d] text-white px-10 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-100 active:scale-95 group">
                    <IconDeviceFloppy size={20} className="group-hover:rotate-12 transition-transform" />
                    Save Album
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: General Info & Tracklist (8 Columns) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Basic Info */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-50 text-[#4177BC] rounded-2xl"><IconMusic size={24} /></div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Album Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelClasses}><IconDisc size={16} /> Album Title</label>
                                <input type="text" placeholder="e.g. Static Dreams" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}><IconMicrophone size={16} /> Artist Name</label>
                                <input type="text" placeholder="Frequency" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}><IconSettings size={16} /> Genre</label>
                                <select className={inputClasses}>
                                    <option>Industrial</option>
                                    <option>Techno</option>
                                    <option>Electronic</option>
                                    <option>Ambient</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}><IconHistory size={16} /> Release Year</label>
                                <input type="number" placeholder="2021" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Album Duration</label>
                                <input type="text" placeholder="40:30" className={inputClasses} />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Description</label>
                                <textarea rows={4} placeholder="Heavy distorted rhythms..." className={`${inputClasses} resize-none`} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Tracklist Management */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><IconListNumbers size={24} /></div>
                                <h2 className="text-xl font-black text-slate-800 tracking-tight">Tracklist</h2>
                            </div>
                            <button onClick={addTrack} className="text-[#4177BC] bg-blue-50 px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2 hover:bg-blue-100 transition-all">
                                <IconPlus size={16} stroke={3} /> Add Track
                            </button>
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence>
                                {tracks.map((track, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                                        className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-transparent hover:border-slate-200 transition-all group"
                                    >
                                        <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-xs font-black text-slate-400">
                                            {index + 1}
                                        </span>
                                        <input type="text" placeholder="Track Title" className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 placeholder:text-slate-300" />
                                        <input type="text" placeholder="4:50" className="w-20 bg-transparent border-none focus:ring-0 text-sm text-center font-medium text-slate-400" />
                                        <button onClick={() => removeTrack(index)} className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                            <IconTrash size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Artwork & Pricing (4 Columns) */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Artwork Upload */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm">
                        <label className={labelClasses}><IconPhotoPlus size={16} /> Cover Image</label>
                        <div className="relative aspect-square rounded-[28px] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center group hover:border-[#4177BC] transition-all cursor-pointer overflow-hidden">
                            <div className="text-center p-6">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-[#4177BC] mx-auto mb-4 transition-all">
                                    <IconPlus size={28} />
                                </div>
                                <p className="text-sm font-black text-slate-600">Upload Artwork</p>
                                <p className="text-[10px] text-slate-400 mt-2 uppercase font-black">AVIF, JPG, PNG (1:1)</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Formats & Pricing */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><IconCurrencyDollar size={24} /></div>
                            <h2 className="text-lg font-black text-slate-800 tracking-tight">Format Pricing</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Digital Download</p>
                                <input type="number" placeholder="8.99" className={inputClasses} />
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Premium CD</p>
                                <input type="number" placeholder="18.99" className={inputClasses} />
                            </div>
                        </div>

                        {/* Bundle Deal */}
                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <label className="flex items-center gap-2 mb-4">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#4177BC] focus:ring-[#4177BC]" />
                                <span className="text-sm font-black text-slate-700">Enable Bundle Deal</span>
                            </label>
                            <div className="space-y-4 opacity-50">
                                <input type="text" placeholder="Bundle Title (e.g. Industrial Pack)" className={inputClasses} disabled />
                                <input type="number" placeholder="Bundle Price" className={inputClasses} disabled />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}