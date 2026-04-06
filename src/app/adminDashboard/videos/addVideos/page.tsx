/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    IconVideo, IconBrandYoutube, IconDeviceFloppy,
    IconChevronLeft, IconSettings, IconExternalLink,
    IconLayoutGrid, IconCode, IconCircleCheck, IconAlertCircle
} from "@tabler/icons-react";
import Link from "next/link";

export default function AddVideoPage() {
    const [inputValue, setInputValue] = useState("");
    const [previewId, setPreviewId] = useState("");

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        if (val.includes("<iframe")) {
            const match = val.match(/embed\/([\w\-]{11})/);
            if (match && match[1]) {
                setPreviewId(match[1]);
                return;
            }
        }

        const match = val.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{11})/);
        if (match && match[1]) {
            setPreviewId(match[1]);
        } else {
            setPreviewId("");
        }
    };

    const inputClasses = `
        w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 
        text-slate-700 font-medium text-sm transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC]
        placeholder:text-slate-300
    `;

    const labelClasses = "text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 flex items-center gap-2";
    const cardClasses = "bg-white p-6 md:p-8 rounded-none md:rounded-[32px] border-b md:border border-slate-100 shadow-none md:shadow-sm";

    // Reusable Premium Shimmer Button
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
                    <Link href="/adminDashboard/videos" className="flex items-center gap-2 text-slate-400 hover:text-[#4177BC] transition-all text-[11px] font-black uppercase tracking-widest mb-4 group">
                        <IconChevronLeft size={16} stroke={3} className="group-hover:-translate-x-1 transition-transform" /> 
                        Back to Library
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight inter-bold">
                        Add <span className="text-slate-400 font-medium">New Video</span>
                    </h1>
                </div>
                
                {/* Desktop Action */}
                <div className="hidden md:block">
                    <ShimmerButton />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8">
                
                {/* --- LEFT COLUMN: CONFIG --- */}
                <div className="lg:col-span-7 space-y-0 md:space-y-8">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconCode size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Source Configuration</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}>Video Title</label>
                                <input type="text" placeholder="e.g. Official Music Video 2026" className={inputClasses} />
                            </div>

                            <div>
                                <label className={labelClasses}>
                                    <IconBrandYoutube size={14} /> YouTube Source (Link or Iframe)
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Paste Link or <iframe> code here..."
                                    className={`${inputClasses} resize-none font-mono text-[12px] leading-relaxed tracking-tight bg-slate-50/30`}
                                    value={inputValue}
                                    onChange={handleInput}
                                />
                                <div className="flex items-center gap-2 mt-3 px-1">
                                    <IconAlertCircle size={12} className="text-slate-400 italic" />
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic">
                                        System auto-detects Video ID from URLs and embed tags
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div>
                                    <label className={labelClasses}><IconSettings size={14} /> Category</label>
                                    <select className={inputClasses}>
                                        <option>Music Video</option>
                                        <option>BTS / Documentary</option>
                                        <option>Live Performance</option>
                                        <option>Tutorial</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClasses}><IconLayoutGrid size={14} /> Visibility</label>
                                    <select className={inputClasses}>
                                        <option>Public Release</option>
                                        <option>Vault Only (Private)</option>
                                        <option>Unlisted</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT COLUMN: PREVIEW --- */}
                <div className="lg:col-span-5 pt-0 md:pt-0">
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className={`${cardClasses} sticky top-10`}>
                        <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-5">
                            <div className="flex items-center gap-3">
                                <IconExternalLink size={20} className="text-emerald-500" />
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Live Rendering</h2>
                            </div>
                            {previewId && (
                                <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                                    <IconCircleCheck size={14} stroke={3} />
                                    <span className="text-[9px] font-black uppercase tracking-tighter">Valid ID</span>
                                </div>
                            )}
                        </div>

                        <div className="relative aspect-video rounded-[24px] overflow-hidden bg-slate-900 shadow-2xl border border-slate-200 group">
                            {previewId ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${previewId}?rel=0&showinfo=0&modestbranding=1&vq=hd1080`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50">
                                    <IconBrandYoutube size={48} stroke={1} className="text-slate-200 mb-4" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center px-12 leading-loose">
                                        Waiting for Source Configuration Input
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Metadata Helper */}
                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Extracted ID</span>
                                <span className="text-[11px] font-mono font-bold text-[#4177BC] bg-white border border-blue-100 px-3 py-1 rounded-lg shadow-sm">
                                    {previewId || "NULL_STUB"}
                                </span>
                            </div>
                            
                            <div className="p-4 rounded-2xl bg-[#4177BC]/5 border border-[#4177BC]/10">
                                <p className="text-[10px] leading-relaxed text-[#4177BC] font-medium">
                                    <strong className="font-black uppercase mr-1">Pro Tip:</strong> 
                                    High-definition (1080p) rendering is enabled by default for all Vault previews.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Fixed Action Center */}
            <div className=" bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 md:hidden z-50 flex justify-center">
                <ShimmerButton className="w-full max-w-[400px]" />
            </div>
        </div>
    );
}