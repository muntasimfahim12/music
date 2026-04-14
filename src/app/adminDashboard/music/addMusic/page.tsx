/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    IconPlus, IconDeviceFloppy, IconChevronLeft,
    IconTrash, IconStar, IconPhotoPlus,
    IconListNumbers, IconBrandApple, IconLink, IconLoader2
} from "@tabler/icons-react";
import Link from "next/link";
import toast from "react-hot-toast";
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
        status: "active",
        apple_music_link: "", 
    });

    const [tracks, setTracks] = useState([{ position: 1, title: "", duration: "" }]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetchingApple, setIsFetchingApple] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- APPLE MUSIC AUTO-FETCH LOGIC ---
    const fetchAppleMusicMetadata = async () => {
        const link = albumData.apple_music_link;
        if (!link || !link.includes("music.apple.com")) {
            return toast.error("Please enter a valid Apple Music URL first!");
        }

        setIsFetchingApple(true);
        const loadingToast = toast.loading("Syncing with Apple Music...");

        try {
            // এই এন্ডপয়েন্টটি আপনার ব্যাকএন্ডে থাকতে হবে যা অ্যাপল মিউজিক স্ক্র্যাপ করে ডেটা দেবে
            const response = await api.post("/album/fetch-apple-data", { url: link });

            if (response.data.success) {
                const { title, artist, year, duration, tracklist, cover_url } = response.data.data;
                
                setAlbumData(prev => ({
                    ...prev,
                    title: title || prev.title,
                    artist: artist || prev.artist,
                    release_year: year || prev.release_year,
                    duration: duration || prev.duration,
                }));
                
                if (tracklist && tracklist.length > 0) setTracks(tracklist);
                if (cover_url) setPreviewUrl(cover_url);
                
                toast.success("Apple Music Data Synced!", { id: loadingToast });
            }
        } catch (error: any) {
            console.error("Fetch Error:", error);
            toast.error("Failed to fetch data. Check the link or backend.", { id: loadingToast });
        } finally {
            setIsFetchingApple(false);
        }
    };

    // --- HANDLERS ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAlbumData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Blob URL for instant preview
        }
    };

    const updateTrack = (index: number, field: string, value: string) => {
        const updatedTracks = [...tracks];
        (updatedTracks[index] as any)[field] = value;
        setTracks(updatedTracks);
    };

    const handleSubmit = async () => {
        // Validation
        if (!albumData.title || !albumData.artist || !albumData.apple_music_link) {
            return toast.error("Title, Artist, and Apple Music Link are mandatory!");
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading("Uploading to Cloud...");

        try {
            const formData = new FormData();
            
            // ১. যদি ইউজার ম্যানুয়ালি ফাইল সিলেক্ট করে থাকে
            if (selectedFile) {
                formData.append("cover_image", selectedFile);
            } 
            // ২. যদি কোনো ফাইল না থাকে কিন্তু অ্যাপল মিউজিক থেকে ইমেজ URL থাকে (previewUrl)
            else if (previewUrl && previewUrl.startsWith('http')) {
                formData.append("external_cover_url", previewUrl);
            }

            const payload = {
                ...albumData,
                tracklist: tracks,
                total_tracks: tracks.length,
                updatedAt: new Date().toISOString()
            };

            formData.append("data", JSON.stringify(payload));

            const response = await api.post("/album", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                toast.success("Album Released Successfully!", { id: loadingToast });
                // Reset form or redirect
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to save album", { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- REUSABLE TAILWIND CLASSES ---
    const inputClasses = `w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm transition-all focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC] placeholder:text-slate-300`;
    const labelClasses = "text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 flex items-center gap-2";
    const cardClasses = "bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm";

    return (
        <div className="max-w-[1400px] mx-auto pb-32 pt-8 px-6 font-sans bg-[#FBFCFD] min-h-screen">
            
            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-1">
                    <Link href="/adminDashboard/music" className="flex items-center gap-2 text-slate-400 hover:text-[#4177BC] transition-all text-[11px] font-black uppercase tracking-widest mb-4 group">
                        <IconChevronLeft size={16} stroke={3} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Vault
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Upload <span className="text-slate-400 font-medium text-2xl">New Release</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="h-14 inline-flex items-center justify-center rounded-2xl bg-[#0f172a] px-10 font-bold text-slate-200 transition-all hover:bg-slate-800 uppercase tracking-[0.25em] text-[11px] disabled:opacity-50 shadow-xl shadow-slate-200"
                    >
                        {isSubmitting ? <IconLoader2 className="animate-spin mr-2" size={18} /> : <IconDeviceFloppy size={18} className="mr-3 opacity-70" />}
                        {isSubmitting ? "UPLOADING..." : "PUBLISH ALBUM"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN: MAIN DATA */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* APPLE MUSIC SYNC BOX */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${cardClasses} border-t-4 border-rose-500`}>
                        <div className={labelClasses}><IconBrandApple size={16} className="text-rose-500" /> Apple Music URL</div>
                        <div className="flex flex-col md:flex-row gap-4 mt-2">
                            <div className="flex-1 relative">
                                <IconLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    name="apple_music_link" 
                                    value={albumData.apple_music_link}
                                    onChange={handleInputChange}
                                    type="text" 
                                    placeholder="https://music.apple.com/..." 
                                    className={`${inputClasses} pl-12 bg-slate-50 border-slate-100`} 
                                />
                            </div>
                            <button 
                                onClick={fetchAppleMusicMetadata}
                                disabled={isFetchingApple}
                                className="h-14 px-8 bg-rose-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 disabled:bg-rose-300"
                            >
                                {isFetchingApple ? "SYNCING..." : "AUTO-FILL DATA"}
                            </button>
                        </div>
                    </motion.div>

                    {/* METADATA FORM */}
                    <motion.div className={cardClasses}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Album Title</label>
                                <input name="title" value={albumData.title} onChange={handleInputChange} type="text" placeholder="Enter title" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Primary Artist</label>
                                <input name="artist" value={albumData.artist} onChange={handleInputChange} type="text" placeholder="Artist name" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Main Genre</label>
                                <select name="main_genre" value={albumData.main_genre} onChange={handleInputChange} className={inputClasses}>
                                    <option value="Experimental">Experimental</option>
                                    <option value="Industrial">Industrial</option>
                                    <option value="Ambient">Ambient</option>
                                    <option value="Electronic">Electronic</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* TRACKLIST SECTION */}
                    <motion.div className={cardClasses}>
                        <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-5">
                            <div className="flex items-center gap-3">
                                <IconListNumbers size={22} className="text-purple-500" />
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Tracklist</h2>
                            </div>
                            <button 
                                onClick={() => setTracks([...tracks, { position: tracks.length + 1, title: "", duration: "" }])} 
                                className="text-[10px] font-black text-[#4177BC] uppercase tracking-widest flex items-center gap-1 hover:underline"
                            >
                                <IconPlus size={14} stroke={3} /> Add Track
                            </button>
                        </div>
                        <div className="space-y-3">
                            {tracks.map((track, index) => (
                                <div key={index} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group transition-all hover:bg-white hover:shadow-md">
                                    <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-[10px] font-black text-slate-400 group-hover:text-[#4177BC]">{index + 1}</span>
                                    <input value={track.title} onChange={(e) => updateTrack(index, "title", e.target.value)} type="text" placeholder="Track Name" className="flex-1 bg-transparent border-none text-sm font-bold text-slate-700 outline-none" />
                                    <input value={track.duration} onChange={(e) => updateTrack(index, "duration", e.target.value)} type="text" placeholder="MM:SS" className="w-20 bg-transparent border-none text-sm text-center text-slate-400 font-mono outline-none" />
                                    <button onClick={() => setTracks(tracks.filter((_, i) => i !== index))} className="p-2 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"><IconTrash size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: MEDIA & SETTINGS */}
                <div className="lg:col-span-4 space-y-8">
                    {/* ARTWORK PREVIEW */}
                    <motion.div className={cardClasses}>
                        <div className={labelClasses}>Album Artwork</div>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative aspect-square border-2 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center group hover:border-[#4177BC] hover:bg-slate-50 transition-all cursor-pointer overflow-hidden shadow-inner"
                        >
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            ) : (
                                <div className="text-center p-10">
                                    <IconPhotoPlus size={40} stroke={1.5} className="text-slate-300 mx-auto mb-4" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Click to upload or<br />Auto-sync from Link</p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-[#4177BC]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white text-[#4177BC] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-xl">Change Artwork</span>
                            </div>
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </motion.div>

                    {/* SYSTEM SETTINGS */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-3 mb-6">
                            <IconStar size={20} className="text-yellow-500" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Global Status</h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}>Display Tag</label>
                                <input name="tag" value={albumData.tag} onChange={handleInputChange} type="text" placeholder="e.g. EXCLUSIVE" className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button 
                                            key={s} 
                                            onClick={() => setAlbumData(p => ({ ...p, rating: s }))}
                                            className={`flex-1 h-10 rounded-lg transition-all font-bold text-xs ${albumData.rating >= s ? 'bg-yellow-400 text-white' : 'bg-slate-50 text-slate-300'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
}