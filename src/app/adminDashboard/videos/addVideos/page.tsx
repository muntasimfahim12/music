/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    IconVideo, IconBrandYoutube, IconDeviceFloppy,
    IconChevronLeft, IconSettings, IconExternalLink,
    IconLayoutGrid, IconCode
} from "@tabler/icons-react";
import Link from "next/link";

export default function AddVideoPage() {
    const [inputValue, setInputValue] = useState("");
    const [previewId, setPreviewId] = useState("");

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        // ১. যদি ইউজার সরাসরি Iframe পেস্ট করে, তবে সেখান থেকে ID বের করার লজিক
        if (val.includes("<iframe")) {
            const match = val.match(/embed\/([\w\-]{11})/);
            if (match && match[1]) {
                setPreviewId(match[1]);
                return;
            }
        }

        // ২. যদি ইউজার শুধু URL পেস্ট করে
        const match = val.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{11})/);
        if (match && match[1]) {
            setPreviewId(match[1]);
        } else {
            setPreviewId("");
        }
    };

    const inputClasses = `
        w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 
        text-slate-700 font-medium text-sm transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC]
        placeholder:text-slate-400
    `;

    const labelClasses = "text-[12px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2";

    return (
        <div className="max-w-6xl mx-auto pb-24 font-sans selection:bg-[#4177BC]/10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pt-10">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-slate-900 inter-bold tracking-tight">
                        Videos <span className="text-slate-400 font-medium">Add</span>
                    </h1>
                    <p className="text-[14px] text-slate-500 font-medium inter-medium">
                        Manage your vault stock, pricing, and product visibility.
                    </p>
                </div>


                <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#4177BC] text-white px-10 py-4 rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95 uppercase tracking-widest">
                    <IconDeviceFloppy size={20} /> Save Video
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-50 text-[#4177BC] rounded-2xl"><IconCode size={24} /></div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Source Config</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}>Video Title</label>
                                <input type="text" placeholder="Enter video name..." className={inputClasses} />
                            </div>

                            <div>
                                <label className={labelClasses}>
                                    <IconBrandYoutube size={16} /> URL or Iframe Code
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Paste YouTube Link or <iframe> code here..."
                                    className={`${inputClasses} resize-none font-mono text-[11px]`}
                                    value={inputValue}
                                    onChange={handleInput}
                                />
                                <p className="text-[10px] text-slate-400 mt-2 ml-1 font-bold uppercase italic">
                                    Our system automatically extracts the ID from links or embed tags
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}><IconSettings size={16} /> Category</label>
                                    <select className={inputClasses}>
                                        <option>Music Video</option>
                                        <option>Tutorial</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClasses}><IconLayoutGrid size={16} /> Visibility</label>
                                    <select className={inputClasses}>
                                        <option>Public</option>
                                        <option>Private</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: LIVE IFRAME PREVIEW */}
                <div className="lg:col-span-5">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm sticky top-10">
                        <label className={labelClasses}><IconExternalLink size={16} /> Rendering Preview</label>

                        <div className="relative aspect-video rounded-[28px] overflow-hidden bg-slate-900 shadow-2xl border border-slate-800 group">
                            {previewId ? (
                                <iframe
                                    className="w-full h-full shadow-2xl"
                                    src={`https://www.youtube.com/embed/${previewId}?rel=0&showinfo=0&modestbranding=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 m-2 rounded-[22px]">
                                    <IconBrandYoutube size={40} className="text-slate-200 mb-2" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-6">
                                        Paste Link or Iframe code to see the result
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Quick Stats/Info below preview */}
                        <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Video ID:</span>
                                <span className="text-[10px] font-mono font-bold text-[#4177BC] bg-blue-50 px-2 py-1 rounded">
                                    {previewId || "NONE"}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}