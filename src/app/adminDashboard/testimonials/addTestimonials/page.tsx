/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    IconChevronLeft, IconQuote, 
    IconStarFilled, IconPhotoPlus, 
    IconUpload, IconCircleCheck, IconUserCircle
} from "@tabler/icons-react";
import Link from "next/link";
import api from "../../../../lib/axios"; 
import { toast } from "react-hot-toast";

export default function AddTestimonialPage() {
    // --- Backend Schema অনুযায়ী States ---
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [status, setStatus] = useState("published");

    // --- Media States ---
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Success Toast (আপনার কাস্টম ডিজাইন) ---
    const showSuccessToast = () => {
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-[24px] pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden border border-slate-50`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 pt-0.5">
                            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <IconCircleCheck size={24} stroke={3} />
                            </div>
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-[13px] font-black text-slate-900 uppercase tracking-widest inter-bold">Manifesto Logged</p>
                            <p className="mt-1 text-sm text-slate-500 inter-medium">The review has been synced to the database.</p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-slate-100">
                    <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-xs font-black text-slate-400 hover:text-slate-600 tracking-widest uppercase">Close</button>
                </div>
            </div>
        ), { duration: 4000 });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // --- Backend Submission ---
    const handleCompleteListing = async () => {
        if (!name || !message || !avatarFile) {
            return toast.error("Name, Message, and Avatar are required");
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading("Saving to Vault...");

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("role", role);
            formData.append("company", company);
            formData.append("message", message);
            formData.append("rating", rating.toString());
            formData.append("status", status);
            formData.append("avatar", avatarFile); // Backend API-তে এটি Multer/Cloudinary হ্যান্ডেল করবে

            const response = await api.post('/testimonials', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                toast.dismiss(loadingToast);
                showSuccessToast();
                setTimeout(() => window.location.reload(), 2000);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Upload Failed", { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = `w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC] placeholder:text-slate-300`;
    const labelClasses = "text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 flex items-center gap-2";
    const cardClasses = "bg-white p-6 md:p-8 rounded-none md:rounded-[32px] border-b md:border border-slate-100 shadow-none md:shadow-sm";

    return (
        <div className="max-w-[1400px] mx-auto pb-32 md:pb-20 px-0 md:px-6 font-sans selection:bg-[#4177BC]/10 min-h-screen inter-medium">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 pb-10 px-6 md:px-0">
                <div className="space-y-1">
                    <Link href="/adminDashboard/testimonials" className="flex items-center gap-2 text-slate-400 hover:text-[#4177BC] transition-all text-[11px] font-black uppercase tracking-widest mb-4 group">
                        <IconChevronLeft size={16} stroke={3} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Reviews
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight inter-bold">
                        Add <span className="text-slate-400 font-medium">New Testimonial</span>
                    </h1>
                </div>
                <div className="hidden md:block">
                    <button
                        onClick={handleCompleteListing}
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-xl border border-black bg-black text-white text-xs font-black uppercase tracking-widest hover:-translate-y-1 transform transition duration-200 hover:shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Syncing..." : "Publish Review"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8">
                {/* --- LEFT COLUMN --- */}
                <div className="lg:col-span-8 space-y-0 md:space-y-8">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconQuote size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Client Feedback</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className={labelClasses}>Full Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g. Alexander Pierce" className={inputClasses} />
                                </div>
                                <div><label className={labelClasses}>Designation / Role</label><input value={role} onChange={(e) => setRole(e.target.value)} type="text" placeholder="CEO at Meta" className={inputClasses} /></div>
                                <div><label className={labelClasses}>Company (Optional)</label><input value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Company Name" className={inputClasses} /></div>
                            </div>
                            <div>
                                <label className={labelClasses}>The Message</label>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className={`${inputClasses} resize-none`} placeholder="Enter testimonial text..." />
                            </div>
                        </div>
                    </motion.div>

                    {/* Rating Selection */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconStarFilled size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Rating Score</h2>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl">
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        key={star} 
                                        onClick={() => setRating(star)}
                                        className={`transition-all ${rating >= star ? 'text-amber-400 scale-110' : 'text-slate-200'}`}
                                    >
                                        <IconStarFilled size={32} />
                                    </button>
                                ))}
                            </div>
                            <span className="ml-4 font-bold text-slate-600">{rating}.0 Stars</span>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="lg:col-span-4 space-y-0 md:space-y-8">
                    {/* Avatar Upload */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6"><IconPhotoPlus size={20} className="text-[#4177BC]" /><h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Client Identity</h2></div>
                        <div className="space-y-4 text-center">
                            <div 
                                onClick={() => document.getElementById('avatarInput')?.click()} 
                                className="aspect-square w-48 mx-auto bg-slate-50 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer group hover:border-[#4177BC]/30"
                            >
                                <input type="file" id="avatarInput" hidden onChange={handleImageChange} accept="image/*" />
                                {preview ? (
                                    <img src={preview} className="w-full h-full object-cover" alt="Avatar" />
                                ) : (
                                    <div className="flex flex-col items-center text-slate-300">
                                        <IconUserCircle size={48} />
                                        <p className="text-[10px] font-black mt-2">UPLOAD PHOTO</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-slate-400 inter-medium uppercase tracking-tighter">Click to upload client profile picture</p>
                        </div>
                    </motion.div>

                    {/* Taxonomy & Status */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="space-y-5">
                            <div>
                                <label className={labelClasses}>Status</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClasses}>
                                    <option value="published">PUBLISHED</option>
                                    <option value="draft">DRAFT</option>
                                </select>
                            </div>
                            <button
                                onClick={handleCompleteListing}
                                className="w-full py-4 rounded-xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#4177BC] transition-all duration-300"
                            >
                                Finalize Record
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}