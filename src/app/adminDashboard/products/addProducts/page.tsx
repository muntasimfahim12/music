"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    IconPlus, 
    IconPhotoPlus, 
    IconTag, 
    IconCurrencyDollar, 
    IconPackage, 
    IconCategory, 
    IconChevronLeft,
    IconDeviceFloppy
} from "@tabler/icons-react";
import Link from "next/link";

export default function AddProductPage() {
    const [images, setImages] = useState<File[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const inputClasses = `
        w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 
        text-slate-700 font-medium text-sm transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC]
        placeholder:text-slate-400
    `;

    const labelClasses = "text-[13px] font-black text-slate-500 uppercase tracking-wider mb-2 ml-1 flex items-center gap-2";

    return (
        <div className="max-w-6xl mx-auto pb-20 font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div className="space-y-1">
                    <Link href="/adminDashboard/products" className="flex items-center gap-2 text-slate-400 hover:text-[#4177BC] transition-all text-sm font-bold mb-4 group">
                        <IconChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                        Add New <span className="text-[#4177BC]">Product</span>
                    </h1>
                    <p className="text-slate-400 font-medium">Create a new entry in your global inventory</p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-[#4177BC] hover:bg-[#34629d] text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-200 active:scale-95 group">
                    <IconDeviceFloppy size={20} className="group-hover:rotate-12 transition-transform" />
                    Publish Product
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* General Information Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-50 text-[#4177BC] rounded-xl"><IconPackage size={24} /></div>
                            <h2 className="text-xl font-black text-slate-800">General Information</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}><IconTag size={16} /> Product Name</label>
                                <input type="text" placeholder="e.g. Premium Leather Headphones" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Description</label>
                                <textarea rows={6} placeholder="Describe the features and benefits..." className={`${inputClasses} resize-none`} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Pricing & Inventory Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><IconCurrencyDollar size={24} /></div>
                            <h2 className="text-xl font-black text-slate-800">Pricing & Stock</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Regular Price ($)</label>
                                <input type="number" placeholder="0.00" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Sale Price ($)</label>
                                <input type="number" placeholder="0.00" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>SKU Code</label>
                                <input type="text" placeholder="GH-990-LP" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Stock Quantity</label>
                                <input type="number" placeholder="100" className={inputClasses} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Media & Categories */}
                <div className="space-y-8">
                    {/* Media Upload Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><IconPhotoPlus size={24} /></div>
                            <h2 className="text-lg font-black text-slate-800">Media</h2>
                        </div>

                        <div className="border-2 border-dashed border-slate-200 rounded-[24px] p-8 text-center group hover:border-[#4177BC] transition-all cursor-pointer bg-slate-50/50">
                            <input type="file" multiple onChange={handleImageUpload} className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#4177BC] mb-4 transition-all">
                                    <IconPlus size={32} />
                                </div>
                                <p className="text-sm font-bold text-slate-600">Click to upload images</p>
                                <p className="text-[11px] text-slate-400 mt-2 uppercase tracking-widest font-black">PNG, JPG up to 10MB</p>
                            </label>
                        </div>

                        {/* Image Preview Grid */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {images.map((_, i) => (
                                    <div key={i} className="aspect-square bg-slate-100 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Taxonomy Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><IconCategory size={24} /></div>
                            <h2 className="text-lg font-black text-slate-800">Organization</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}>Category</label>
                                <select className={inputClasses}>
                                    <option>Electronics</option>
                                    <option>Fashion</option>
                                    <option>Software</option>
                                    <option>Music Assets</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Status</label>
                                <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-2xl">
                                    <button className="flex-1 py-2 bg-white text-[#4177BC] shadow-sm rounded-xl text-xs font-black uppercase tracking-wider">Draft</button>
                                    <button className="flex-1 py-2 text-slate-400 hover:text-slate-600 text-xs font-black uppercase tracking-wider transition-all">Live</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}