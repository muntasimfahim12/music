/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconPlus, IconPhotoPlus, IconCurrencyDollar,
    IconPackage, IconCategory, IconChevronLeft, IconDeviceFloppy,
    IconRulerMeasure, IconX, IconBolt, IconUpload, IconCheck
} from "@tabler/icons-react";
import Link from "next/link";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";

export default function AddProductPage() {
    // --- Data States ---
    const [name, setName] = useState("");
    const [subtext, setSubtext] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [category, setCategory] = useState("TEES");
    const [tag, setTag] = useState("NEW ARRIVAL");
    const [inventory, setInventory] = useState({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
    const [lowStockWarning, setLowStockWarning] = useState(5);
    const [highlights, setHighlights] = useState([{ title: "", desc: "" }]);

    // --- Image States ---
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [hoverImage, setHoverImage] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);

    // Previews
    const [mainPreview, setMainPreview] = useState<string | null>(null);
    const [hoverPreview, setHoverPreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const galleryInputRef = useRef<HTMLInputElement>(null);

    // --- Modern Custom Toast ---
    const showSuccessToast = () => {
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-[24px] pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden border border-slate-50`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 pt-0.5">
                            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <IconCheck size={24} stroke={3} />
                            </div>
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-[13px] font-black text-slate-900 uppercase tracking-widest inter-bold">Release Published</p>
                            <p className="mt-1 text-sm text-slate-500 inter-medium">The product is now live in the vault.</p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-slate-100">
                    <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-xs font-black text-slate-400 hover:text-slate-600 tracking-widest uppercase">Close</button>
                </div>
            </div>
        ), { duration: 4000 });
    };

    // --- Image Handlers ---
    const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMainImage(file);
            setMainPreview(URL.createObjectURL(file));
        }
    };

    const handleHoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setHoverImage(file);
            setHoverPreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length + gallery.length > 10) return toast.error("Max 10 images for gallery");
        setGallery([...gallery, ...files]);
        setGalleryPreviews([...galleryPreviews, ...files.map(f => URL.createObjectURL(f))]);
    };

    const removeGalleryImage = (index: number) => {
        setGallery(gallery.filter((_, i) => i !== index));
        setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
    };

    // --- Backend Submission Logic (Fixed to ensure all data is sent) ---
    const handleCompleteListing = async () => {
        if (!name || !price || !mainImage) {
            return toast.error("Required: Name, Price, and Main Image");
        }

        const loadingToast = toast.loading("Syncing with Vault...");

        try {
            const formData = new FormData();

            // 1. Basic Fields
            formData.append("name", name);
            formData.append("subtext", subtext);
            formData.append("slug", slug || name.toLowerCase().split(' ').join('-'));
            formData.append("description", description);
            formData.append("category", category);
            formData.append("tag", tag);
            formData.append("lowStockWarning", lowStockWarning.toString());

            // 2. Critical Number & JSON Fields (Matching Controller Parsing)
            formData.append("price", price); // Controller converts to Number
            if (salePrice) formData.append("salePrice", salePrice);

            formData.append("inventory", JSON.stringify(inventory));
            formData.append("highlights", JSON.stringify(highlights));

            // 3. Image Files (Matching upload.fields names)
            if (mainImage) formData.append("mainImage", mainImage);
            if (hoverImage) formData.append("hoverImage", hoverImage);

            // Gallery append (multi-file)
            gallery.forEach(file => {
                formData.append("gallery", file);
            });

            const response = await api.post('/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                toast.dismiss(loadingToast);
                showSuccessToast();
                // Clear Form after success
                setTimeout(() => window.location.reload(), 2000);
            }
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.response?.data?.message || "Upload Failed", { id: loadingToast });
        }
    };

    const inputClasses = `w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC] placeholder:text-slate-300`;
    const labelClasses = "text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 flex items-center gap-2";
    const cardClasses = "bg-white p-6 md:p-8 rounded-none md:rounded-[32px] border-b md:border border-slate-100 shadow-none md:shadow-sm";

    return (
        <div className="max-w-[1400px] mx-auto pb-32 md:pb-20 px-0 md:px-6 font-sans selection:bg-[#4177BC]/10 bg-[#FBFCFD] min-h-screen inter-medium">

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
                <div className="hidden md:block">
                    <button
                        onClick={handleCompleteListing}
                        className="px-4 py-2 rounded-md border border-black bg-black text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md cursor-pointer"
                    >
                        Publish
                    </button>
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
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g. Nocturnal Vibe Tee" className={inputClasses} />
                                </div>
                                <div><label className={labelClasses}>Subtext / Fit Info</label><input value={subtext} onChange={(e) => setSubtext(e.target.value)} type="text" placeholder="Boxy Fit" className={inputClasses} /></div>
                                <div><label className={labelClasses}>Slug (URL)</label><input value={slug} onChange={(e) => setSlug(e.target.value)} type="text" placeholder="nocturnal-vibe-tee" className={inputClasses} /></div>
                            </div>
                            <div><label className={labelClasses}>Main Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`${inputClasses} resize-none`} /></div>
                        </div>
                    </motion.div>

                    {/* Size & Inventory */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconRulerMeasure size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Size & Inventory</h2>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <div key={size} className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 text-center block uppercase tracking-tighter">{size} Qty</label>
                                    <input type="number" className="w-full text-center py-3.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:border-[#4177BC] outline-none" onChange={(e) => setInventory({ ...inventory, [size as keyof typeof inventory]: Number(e.target.value) })} />
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Low Stock Warning</span>
                            <input type="number" value={lowStockWarning} onChange={(e) => setLowStockWarning(Number(e.target.value))} className="w-16 px-2 py-2 rounded-lg border border-slate-200 bg-white text-center font-bold text-[#4177BC] outline-none" />
                        </div>
                    </motion.div>

                    {/* Highlights */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconBolt size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Key Highlights</h2>
                        </div>
                        <div className="space-y-4">
                            {highlights.map((highlight, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                    <div className="md:col-span-4"><label className={labelClasses}>Title</label><input value={highlight.title} onChange={(e) => { const n = [...highlights]; n[index].title = e.target.value; setHighlights(n); }} type="text" className={inputClasses} /></div>
                                    <div className="md:col-span-7"><label className={labelClasses}>Description</label><input value={highlight.desc} onChange={(e) => { const n = [...highlights]; n[index].desc = e.target.value; setHighlights(n); }} type="text" className={inputClasses} /></div>
                                    <button onClick={() => setHighlights(highlights.filter((_, i) => i !== index))} className="md:col-span-1 p-3.5 text-rose-400 hover:bg-rose-50 rounded-xl transition-all flex justify-center"><IconX size={20} /></button>
                                </div>
                            ))}
                            <button onClick={() => setHighlights([...highlights, { title: "", desc: "" }])} className="mt-2 text-[10px] font-black text-[#4177BC] uppercase tracking-widest flex items-center gap-1 hover:underline px-1 inter-bold">
                                <IconPlus size={14} stroke={3} /> Add More
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="lg:col-span-4 space-y-0 md:space-y-8">
                    {/* Media Assets */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6"><IconPhotoPlus size={20} className="text-[#4177BC]" /><h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Media Assets</h2></div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className={labelClasses}>Main Display</label>
                                <div onClick={() => document.getElementById('mainImageInput')?.click()} className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer group hover:border-[#4177BC]/30">
                                    <input type="file" id="mainImageInput" hidden onChange={handleMainImage} />
                                    {mainPreview ? <img src={mainPreview} className="w-full h-full object-cover" alt="Main" /> : <IconUpload className="text-slate-300 group-hover:text-[#4177BC] transition-colors" />}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className={labelClasses}>Hover Display</label>
                                <div onClick={() => document.getElementById('hoverImageInput')?.click()} className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer group hover:border-[#4177BC]/30">
                                    <input type="file" id="hoverImageInput" hidden onChange={handleHoverImage} />
                                    {hoverPreview ? <img src={hoverPreview} className="w-full h-full object-cover" alt="Hover" /> : <IconUpload className="text-slate-300 group-hover:text-[#4177BC] transition-colors" />}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className={labelClasses}>Gallery ({galleryPreviews.length}/10)</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {galleryPreviews.map((src, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                                            <img src={src} className="w-full h-full object-cover" alt="gal" />
                                            <button onClick={() => removeGalleryImage(idx)} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><IconX size={14} /></button>
                                        </div>
                                    ))}
                                    <button onClick={() => galleryInputRef.current?.click()} className="aspect-square bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:text-[#4177BC] transition-all">
                                        <input type="file" multiple hidden ref={galleryInputRef} onChange={handleGalleryImages} />
                                        <IconPlus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pricing & Taxonomy */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6"><IconCurrencyDollar size={20} className="text-emerald-500" /><h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Pricing</h2></div>
                        <div className="space-y-5">
                            <div><label className={labelClasses}>Regular Price</label><input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="0.00" className={inputClasses} /></div>
                            <div><label className={labelClasses}>Sale Price</label><input value={salePrice} onChange={(e) => setSalePrice(e.target.value)} type="number" placeholder="0.00" className={inputClasses} /></div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6"><IconCategory size={20} className="text-orange-500" /><h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Taxonomy</h2></div>
                        <div className="space-y-5">
                            <div>
                                <label className={labelClasses}>Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClasses}>
                                    <option value="TEES">TEES</option>
                                    <option value="HOODIES">HOODIES</option>
                                    <option value="ACCESSORIES">ACCESSORIES</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Product Tag</label>
                                <select value={tag} onChange={(e) => setTag(e.target.value)} className={inputClasses}>
                                    <option value="NEW ARRIVAL">NEW ARRIVAL</option>
                                    <option value="LIMITED EDITION">LIMITED EDITION</option>
                                    <option value="RESTOCKED">RESTOCKED</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Mobile Fixed/Centered Button */}
            <div className="flex justify-center mt-6 md:hidden">
                <button
                    onClick={handleCompleteListing}
                    className="px-4 py-2 rounded-md border border-black bg-black text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md cursor-pointer"
                >
                    Publish
                </button>
            </div>



        </div>
    );
}