/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconMusic, IconPlus, IconDeviceFloppy, IconChevronLeft,
    IconTrash, IconClock, IconBolt, IconStar, IconPhotoPlus,
    IconListNumbers
} from "@tabler/icons-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import api from "@/src/lib/axios";

export default function AddMusicPage() {
    // --- STATE MANAGEMENT ---
    const [albumData, setAlbumData] = useState({
        title: "",
        artist: "",
        main_genre: "Experimental",
        release_year: new Date().getFullYear().toString(),
        duration: "",
        description: "",
        tag: "New Release",
        rating: 5,
        status: "draft",
    });

    const [bundleDeal, setBundleDeal] = useState({
        title: "",
        price: 0,
        old_price: 0,
    });

    const [tracks, setTracks] = useState([{ position: 1, title: "", duration: "" }]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- HANDLERS ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAlbumData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addTrack = () => {
        setTracks([...tracks, { position: tracks.length + 1, title: "", duration: "" }]);
    };

    const removeTrack = (index: number) => {
        if (tracks.length > 1) {
            setTracks(tracks.filter((_, i) => i !== index));
        }
    };

    const updateTrack = (index: number, field: string, value: string) => {
        const updatedTracks: any = [...tracks];
        updatedTracks[index][field] = value;
        setTracks(updatedTracks);
    };

    // --- FINAL SUBMIT (FIXED & TESTED) ---
    const handleSubmit = async () => {
        if (!albumData.title || !albumData.artist) {
            return toast.error("Title and Artist are required!");
        }
        if (!selectedFile) {
            return toast.error("Please upload an album cover!");
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading("Releasing to the Vault...");

        try {
            const formData = new FormData();

            formData.append("cover_image", selectedFile);

            const payload = {
                ...albumData,
                bundle_deal: bundleDeal,
                tracklist: tracks,
                total_tracks: tracks.length.toString(),
                review_count: 0
            };

            formData.append("data", JSON.stringify(payload));

            const response = await api.post("/album", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Album successfully released!", { id: loadingToast });

                setAlbumData({
                    title: "",
                    artist: "",
                    main_genre: "Experimental",
                    release_year: new Date().getFullYear().toString(),
                    duration: "",
                    description: "",
                    tag: "New Release",
                    rating: 5,
                    status: "draft",
                });
                setBundleDeal({
                    title: "",
                    price: 0,
                    old_price: 0,
                });
                setTracks([{ position: 1, title: "", duration: "" }]);
                setPreviewUrl(null);
                setSelectedFile(null);

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.error(response.data.message || "Failed to release", { id: loadingToast });
            }
        } catch (error: any) {
            console.error("Final Upload Error:", error);
            const errorMsg = error.response?.data?.message || "Check your backend route spelling!";
            toast.error(errorMsg, { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = `w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm transition-all focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC] placeholder:text-slate-300`;
    const labelClasses = "text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 flex items-center gap-2";
    const cardClasses = "bg-white p-6 md:p-8 rounded-none md:rounded-[32px] border-b md:border border-slate-100 shadow-none md:shadow-sm";

    return (
        <div className="max-w-[1400px] mx-auto pb-32 md:pb-20 px-0 md:px-6 font-sans bg-[#FBFCFD] min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 pb-10 px-6 md:px-0">
                <div className="space-y-1">
                    <Link href="/adminDashboard/music" className="flex items-center gap-2 text-slate-400 hover:text-[#4177BC] transition-all text-[11px] font-black uppercase tracking-widest mb-4 group">
                        <IconChevronLeft size={16} stroke={3} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Vault
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 inter-bold">
                        Release <span className="text-slate-400 font-medium">New Audio</span>
                    </h1>
                </div>
                <div className="hidden md:block">
                    <button
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-800 bg-[#0f172a] px-8 font-bold text-slate-200 transition-all hover:bg-slate-800 active:scale-[0.98] uppercase tracking-[0.25em] text-[11px] disabled:opacity-50"
                    >
                        <IconDeviceFloppy size={18} className="mr-3 opacity-70" stroke={2} />
                        {isSubmitting ? "PROCESSING..." : "CONFIRM RELEASE"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8">

                {/* LEFT COLUMN */}
                <div className="lg:col-span-8 space-y-0 md:space-y-8">

                    {/* Metadata Card */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                            <IconMusic size={22} className="text-[#4177BC]" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Metadata</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Album / Release Title</label>
                                <input name="title" value={albumData.title} onChange={handleInputChange} type="text" placeholder="e.g. Digital Silence" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Lead Artist</label>
                                <input name="artist" value={albumData.artist} onChange={handleInputChange} type="text" placeholder="Null Pointer" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Main Genre</label>
                                <select name="main_genre" value={albumData.main_genre} onChange={handleInputChange} className={inputClasses}>
                                    <option value="Experimental">Experimental</option>
                                    <option value="Industrial">Industrial</option>
                                    <option value="Ambient">Ambient</option>
                                    <option value="Techno">Techno</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Release Year</label>
                                <input name="release_year" value={albumData.release_year} onChange={handleInputChange} type="text" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Total Duration</label>
                                <input name="duration" value={albumData.duration} onChange={handleInputChange} type="text" placeholder="55:00" className={inputClasses} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className={labelClasses}>Description</label>
                            <textarea name="description" value={albumData.description} onChange={handleInputChange} rows={3} placeholder="Tell the story of this release..." className={`${inputClasses} resize-none`} />
                        </div>
                    </motion.div>

                    {/* Tracklist Card */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-5">
                            <div className="flex items-center gap-3">
                                <IconListNumbers size={22} className="text-purple-500" />
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Tracklist</h2>
                            </div>
                            <button onClick={addTrack} className="text-[10px] font-black text-[#4177BC] uppercase tracking-widest flex items-center gap-1 hover:underline">
                                <IconPlus size={14} stroke={3} /> Add Track
                            </button>
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence>
                                {tracks.map((track, index) => (
                                    <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-slate-200 transition-all group">
                                        <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-[10px] font-black text-slate-400">
                                            {index + 1}
                                        </span>
                                        <input value={track.title} onChange={(e) => updateTrack(index, "title", e.target.value)} type="text" placeholder="Track Title" className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 outline-none" />
                                        <div className="flex items-center gap-2">
                                            <IconClock size={14} className="text-slate-300" />
                                            <input value={track.duration} onChange={(e) => updateTrack(index, "duration", e.target.value)} type="text" placeholder="4:50" className="w-16 bg-transparent border-none focus:ring-0 text-sm text-center font-medium text-slate-400 outline-none" />
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

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-4 space-y-0 md:space-y-8">

                    {/* Artwork & Status */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className={cardClasses}>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <IconPhotoPlus size={20} className="text-[#4177BC]" />
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Artwork</h2>
                            </div>
                            <select name="status" value={albumData.status} onChange={handleInputChange} className="text-[9px] font-black uppercase border-none bg-slate-100 rounded-lg px-2 py-1 outline-none">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative aspect-square border-2 border-dashed border-slate-100 rounded-[24px] flex flex-col items-center justify-center group hover:border-[#4177BC] hover:bg-slate-50 transition-all cursor-pointer overflow-hidden"
                        >
                            {previewUrl ? (
                                <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                            ) : (
                                <>
                                    <IconPlus size={24} stroke={3} className="text-slate-300 group-hover:text-[#4177BC] mb-2" />
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Upload Cover</p>
                                </>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </motion.div>

                    {/* Tag Card */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6">
                            <IconStar size={20} className="text-yellow-500" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Label & Tag</h2>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className={labelClasses}>Rating (1-5)</label>
                                <input name="rating" value={albumData.rating} onChange={handleInputChange} type="number" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Display Tag</label>
                                <input name="tag" value={albumData.tag} onChange={handleInputChange} type="text" placeholder="LIMITED EDITION" className={inputClasses} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Bundle Offer Card */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6">
                            <IconBolt size={20} className="text-orange-500" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Bundle Offer</h2>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className={labelClasses}>Bundle Title</label>
                                <input value={bundleDeal.title} onChange={(e) => setBundleDeal({ ...bundleDeal, title: e.target.value })} type="text" placeholder="Collector's Pack" className={inputClasses} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>Price ($)</label>
                                    <input value={bundleDeal.price} onChange={(e) => setBundleDeal({ ...bundleDeal, price: Number(e.target.value) })} type="number" className={inputClasses} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Old Price</label>
                                    <input value={bundleDeal.old_price} onChange={(e) => setBundleDeal({ ...bundleDeal, old_price: Number(e.target.value) })} type="number" className={inputClasses} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 md:hidden z-50 flex justify-center">
                <button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] disabled:opacity-50"
                >
                    {isSubmitting ? "Processing..." : "Confirm Release"}
                </button>
            </div>
        </div>
    );
}