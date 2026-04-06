/* eslint-disable react-hooks/static-components */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    IconPlus, IconPhotoPlus, IconCurrencyDollar,
    IconPackage, IconCategory, IconChevronLeft, IconDeviceFloppy,
    IconRulerMeasure, IconX, IconBolt
} from "@tabler/icons-react";
import Link from "next/link";

export default function AddProductPage() {
    const [images, setImages] = useState<File[]>([]);
    const [highlights, setHighlights] = useState([{ title: "", desc: "" }]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
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

    // Reusable Shimmer Button Component
    const ShimmerButton = ({ className = "" }: { className?: string }) => (
        <button className={`
            inline-flex h-14 animate-shimmer items-center justify-center 
            rounded-2xl border border-slate-800 
            bg-[linear-gradient(110deg,#0f172a,45%,#334155,55%,#0f172a)] 
            bg-[length:200%_100%] px-8 font-bold text-slate-200 
            transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 
            focus:ring-offset-2 focus:ring-offset-slate-50  tracking-[0.2em] text-[12px]
            active:scale-[0.98] shadow-2xl ${className}
        `}>
            <IconDeviceFloppy size={20} className="mr-2" stroke={2} />
           COMPLETE LISTING
        </button>
    );

    return (
        <div className="max-w-[1400px] mx-auto pb-32 md:pb-20 px-0 md:px-6 font-sans selection:bg-[#4177BC]/10 bg-[#FBFCFD] min-h-screen">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 pb-10 px-6 md:px-0">
                <div className="space-y-1">
                    <Link href="/adminDashboard/products" className="flex items-center gap-2 text-slate-400 hover:text-[#4177BC] transition-all text-[11px] font-black uppercase tracking-widest mb-4 group">
                        <IconChevronLeft size={16} stroke={3} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Inventory
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight inter-bold">
                        Create <span className="text-slate-400 font-medium">New Release</span>
                    </h1>
                </div>

                {/* Desktop Shimmer Button */}
                <div className="hidden md:block">
                    <ShimmerButton />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8">

                {/* --- LEFT COLUMN --- */}
                <div className="lg:col-span-8 space-y-0 md:space-y-8">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconPackage size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Product Details</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className={labelClasses}>Full Product Name</label>
                                    <input type="text" placeholder="e.g. Nocturnal Vibe Tee" className={inputClasses} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Subtext / Fit Info</label>
                                    <input type="text" placeholder="Stone Washed Black / Boxy Fit" className={inputClasses} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Slug (URL)</label>
                                    <input type="text" placeholder="nocturnal-vibe-tee" className={inputClasses} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Main Description</label>
                                <textarea rows={4} placeholder="Detailed product story..." className={`${inputClasses} resize-none`} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconRulerMeasure size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Size & Inventory</h2>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <div key={size} className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 text-center block">{size} Qty</label>
                                    <input type="number" placeholder="0" className="w-full text-center py-3.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:border-[#4177BC] outline-none" />
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Low Stock Warning</span>
                            <input type="number" defaultValue={5} className="w-16 px-2 py-2 rounded-lg border border-slate-200 bg-white text-center font-bold text-[#4177BC] outline-none" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconBolt size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Key Highlights</h2>
                        </div>
                        <div className="space-y-4">
                            {highlights.map((_, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50/50 p-4 rounded-2xl md:bg-transparent md:p-0 md:rounded-none">
                                    <div className="md:col-span-4">
                                        <label className={labelClasses}>Title</label>
                                        <input type="text" className={inputClasses} />
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className={labelClasses}>Description</label>
                                        <input type="text" className={inputClasses} />
                                    </div>
                                    <button className="md:col-span-1 p-3.5 text-rose-400 hover:bg-rose-50 rounded-xl transition-all flex justify-center">
                                        <IconX size={20} />
                                    </button>
                                </div>
                            ))}
                            <button onClick={() => setHighlights([...highlights, { title: "", desc: "" }])} className="mt-2 text-[10px] font-black text-[#4177BC] uppercase tracking-widest flex items-center gap-1 hover:underline px-1">
                                <IconPlus size={14} stroke={3} /> Add More
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="lg:col-span-4 space-y-0 md:space-y-8">
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6">
                            <IconPhotoPlus size={20} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Media Assets</h2>
                        </div>
                        <div className="border-2 border-dashed border-slate-100 rounded-[24px] p-10 text-center group hover:border-[#4177BC] hover:bg-slate-50 transition-all cursor-pointer">
                            <input type="file" multiple onChange={handleImageUpload} className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-[#4177BC] mb-4 transition-all border border-slate-100">
                                    <IconPlus size={24} stroke={3} />
                                </div>
                                <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Upload Media</p>
                            </label>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6">
                            <IconCurrencyDollar size={20} className="text-emerald-500" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Pricing</h2>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className={labelClasses}>Regular Price</label>
                                <input type="number" placeholder="48.00" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Sale Price</label>
                                <input type="number" placeholder="0.00" className={inputClasses} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6">
                            <IconCategory size={20} className="text-orange-500" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Taxonomy</h2>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className={labelClasses}>Category</label>
                                <select className={inputClasses}>
                                    <option>TEES</option>
                                    <option>HOODIES</option>
                                    <option>ACCESSORIES</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Product Tag</label>
                                <select className={inputClasses}>
                                    <option>NEW ARRIVAL</option>
                                    <option>LIMITED EDITION</option>
                                    <option>RESTOCKED</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Fixed Shimmer Button */}
            <div className=" bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 md:hidden z-50 flex justify-center">
                <ShimmerButton className="" />
            </div>
        </div>
    );
}