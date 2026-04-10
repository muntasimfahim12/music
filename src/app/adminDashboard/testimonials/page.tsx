/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconPlus, IconSearch, IconEdit, IconTrash,
    IconStarFilled, IconLoader2, IconX, IconUpload
} from "@tabler/icons-react";
import api from "../../../lib/axios";
import { toast } from "react-hot-toast";

export default function TestimonialOverviewPage() {
    const BASE_URL = "http://localhost:5000"; 

    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [editLoading, setEditLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const fetchTestimonials = async () => {
        try {
            const response = await api.get('/testimonials');
            if (response.data.success) setTestimonials(response.data.data);
        } catch (error) {
            toast.error("Failed to access vault");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchTestimonials(); }, []);

    const getImageUrl = (path: string) => {
        if (!path) return "/placeholder-avatar.png";
        if (path.startsWith("http")) return path;
        return `${BASE_URL}/${path}`;
    };

    const handleStatusToggle = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        try {
            const response = await api.patch(`/testimonials/${id}/status`, { status: newStatus });
            if (response.data.success) {
                toast.success(`Entry set to ${newStatus.toUpperCase()}`);
                setTestimonials((prev: any) => prev.map((t: any) => t._id === id ? { ...t, status: newStatus } : t));
            }
        } catch (error) { toast.error("Status sync failed"); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This action is irreversible.")) return;
        try {
            const response = await api.delete(`/testimonials/${id}`);
            if (response.data.success) {
                toast.success("Manifesto archived");
                setTestimonials((prev) => prev.filter((t: any) => t._id !== id));
            }
        } catch (error) { toast.error("Purge failed"); }
    };

    const openEditModal = (item: any) => {
        setSelectedItem({ ...item });
        setPreview(getImageUrl(item.avatar));
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        if (!selectedItem.name || !selectedItem.message) return toast.error("Required fields missing");
        setEditLoading(true);
        const loadingToast = toast.loading("Updating Vault...");
        try {
            const formData = new FormData();
            formData.append("name", selectedItem.name);
            formData.append("role", selectedItem.role || "");
            formData.append("company", selectedItem.company || "");
            formData.append("message", selectedItem.message);
            formData.append("rating", selectedItem.rating.toString());
            if (avatarFile) formData.append("avatar", avatarFile);

            const response = await api.patch(`/testimonials/${selectedItem._id}`, formData);
            if (response.data.success) {
                toast.dismiss(loadingToast);
                toast.success("Entry Synchronized");
                fetchTestimonials();
                setIsEditModalOpen(false);
            }
        } catch (error) {
            toast.error("Update failed", { id: loadingToast });
        } finally {
            setEditLoading(false);
        }
    };

    const filteredData = testimonials.filter((t: any) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Modern and Clean Input Styles
    const inputClasses = `w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC] transition-all placeholder:text-slate-400`;
    const labelClasses = "text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1 block";

    return (
        <div className="max-w-[1400px] mx-auto pb-20 px-4 md:px-8 font-sans selection:bg-[#4177BC]/10 inter-medium">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight inter-bold">
                        Client <span className="text-slate-400 font-medium italic judson-regular">Manifestos</span>
                    </h1>
                    <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Management Hub</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text" placeholder="Search entries..."
                            className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-black focus:outline-none w-full md:w-[280px] shadow-sm focus:border-[#4177BC] transition-all"
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* --- GRID --- */}
            {isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center gap-4"><IconLoader2 className="animate-spin text-[#4177BC]" size={40} /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredData.map((item: any) => (
                            <motion.div
                                layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={item._id}
                                className="group bg-white rounded-[32px] border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    {/* ইমেজ এখন সবসময় কালারড থাকবে */}
                                    <img 
                                        src={getImageUrl(item.avatar)} 
                                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md ring-1 ring-slate-100" 
                                        alt={item.name} 
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-wider">{item.role} @ {item.company || "N/A"}</p>
                                        <div className="flex gap-0.5 mt-1">
                                            {[...Array(item.rating)].map((_, i) => <IconStarFilled key={i} size={10} className="text-amber-400" />)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 line-clamp-3 judson-regular-italic italic mb-6">&ldquo;{item.message}&rdquo;</p>
                                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                                    <button onClick={() => handleStatusToggle(item._id, item.status)} className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-colors ${item.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{item.status}</button>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditModal(item)} className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-black hover:text-white transition-all"><IconEdit size={16} /></button>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all"><IconTrash size={16} /></button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* --- EDIT MODAL --- */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100"
                        >
                            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-bold text-slate-900 inter-bold">Edit <span className="text-slate-400 italic">Manifesto</span></h2>
                                    <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><IconX size={20} /></button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 flex justify-center mb-6">
                                        <div onClick={() => document.getElementById('editAvatar')?.click()} className="relative w-28 h-28 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer group overflow-hidden shadow-inner bg-slate-50">
                                            <input type="file" id="editAvatar" hidden onChange={(e: any) => {
                                                const file = e.target.files[0];
                                                if (file) { setAvatarFile(file); setPreview(URL.createObjectURL(file)); }
                                            }} />
                                            {preview ? <img src={preview} className="w-full h-full object-cover" alt="" /> : <IconUpload size={24} className="text-slate-300" />}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><IconUpload size={24} className="text-white" /></div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Client Name</label>
                                        <input className={inputClasses} value={selectedItem?.name} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Rating (1-5)</label>
                                        <select className={inputClasses} value={selectedItem?.rating} onChange={(e) => setSelectedItem({ ...selectedItem, rating: Number(e.target.value) })}>
                                            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} Stars</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Role</label>
                                        <input className={inputClasses} value={selectedItem?.role} onChange={(e) => setSelectedItem({ ...selectedItem, role: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Company</label>
                                        <input className={inputClasses} value={selectedItem?.company} onChange={(e) => setSelectedItem({ ...selectedItem, company: e.target.value })} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClasses}>The Message</label>
                                        <textarea rows={5} className={`${inputClasses} resize-none leading-relaxed`} value={selectedItem?.message} onChange={(e) => setSelectedItem({ ...selectedItem, message: e.target.value })} />
                                    </div>
                                </div>

                                <div className="mt-10 flex gap-4">
                                    <button onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                                    <button
                                        onClick={handleUpdate} disabled={editLoading}
                                        className="flex-[2] py-4 rounded-2xl bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#4177BC] transition-all shadow-xl shadow-slate-200"
                                    >
                                        {editLoading ? "Syncing..." : "Update Archive"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}