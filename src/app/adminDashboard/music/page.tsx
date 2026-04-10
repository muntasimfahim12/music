/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconPlus, IconSearch, IconTrash, IconEdit, IconX,
  IconDeviceFloppy, IconLoader2, IconDisc, IconStarFilled,
  IconCalendar, IconMusic, IconMicrophone
} from "@tabler/icons-react";
import Link from "next/link";
import api from "./../../../lib/axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:5000";

export default function MusicStorePage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAlbum, setEditingAlbum] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // এপিআই থেকে অ্যালবাম ফেচ করা
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await api.get("/album"); // আপনার এন্ডপয়েন্ট অনুযায়ী
      if (response.data?.success) setAlbums(response.data.data);
    } catch (error: any) {
      toast.error("Music Vault synchronization failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAlbums(); }, []);

  const openEditModal = (album: any) => {
    setEditingAlbum({ ...album });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const toastId = toast.loading("Updating Music Vault...");

    try {
      // এখানে সরাসরি অবজেক্ট পাঠানো হচ্ছে, যদি ফাইল না থাকে। 
      // ফাইল থাকলে FormData ব্যবহার করবেন।
      const response = await api.patch(`/album/${editingAlbum._id}`, editingAlbum);
      if (response.data.success) {
        toast.success("Album Updated", { id: toastId });
        setEditingAlbum(null);
        fetchAlbums();
      }
    } catch (error) {
      toast.error("Update failed", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this masterpiece from vault?")) return;
    try {
      await api.delete(`/album/${id}`);
      setAlbums(albums.filter(a => a._id !== id));
      toast.success("Album Removed");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filteredAlbums = albums.filter(a =>
    a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.artist?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputClasses = `w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 font-sans font-medium text-[13px] transition-all focus:outline-none focus:ring-2 focus:ring-[#4177BC]/10 focus:border-[#4177BC] focus:bg-white`;

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-[#1a1a1a]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 pt-8 pb-24">

        {/* --- HEADER (Exactly like Products Page) --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#4177BC]"></span>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#4177BC]">Archive</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none text-slate-900 uppercase">
              Music <span className="text-[#556156]">Vault</span>
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {albums.length} Releases Synchronized
              </span>
            </div>
          </div>

          <Link href="/adminDashboard/music/addMusic">
            <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-md font-bold text-[11px] tracking-[0.25em] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 active:scale-95 cursor-pointer group uppercase">
              <IconPlus size={16} stroke={3} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Publish New Album</span>
            </button>
          </Link>
        </header>

        {/* --- SEARCH BAR --- */}
        <div className="relative max-w-xl mb-12 group">
          <IconSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#4177BC] transition-colors" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Title or Artist..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-[#4177BC] transition-all text-[13px] font-medium"
          />
        </div>

        {/* --- ALBUM GRID (Product Card Style) --- */}
        {loading ? (
          <div className="flex justify-center py-32">
            <IconLoader2 className="animate-spin text-[#4177BC]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAlbums.map((album) => (
                <motion.div key={album._id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100 border border-gray-50 shadow-sm">
                    <img
                      src={`${BASE_URL}/${album.cover_image?.replace('\\', '/')}`}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-black text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                        {album.main_genre}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                      <button onClick={() => openEditModal(album)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-[#4177BC] hover:text-white transition-all shadow-lg">
                        <IconEdit size={18} />
                      </button>
                      <button onClick={() => handleDelete(album._id)} className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-rose-500 transition-all shadow-lg">
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 px-1">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-[9px] font-black text-[#4177BC] uppercase tracking-widest">{album.artist}</p>
                        <div className="flex items-center gap-1 text-[9px] font-bold text-amber-500">
                            <IconStarFilled size={10} /> {album.rating || "5.0"}
                        </div>
                    </div>
                    <h3 className="text-[14px] font-bold text-gray-900 uppercase truncate mb-1">{album.title}</h3>
                    <div className="flex items-center justify-between">
                        <p className="text-[14px] font-medium text-gray-500 tracking-tighter">
                            ${album.bundle_deal?.price || "0.00"}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                            <IconDisc size={12} /> {album.total_tracks} Tracks
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- EDIT MODAL (Side-by-Side Product Style) --- */}
        <AnimatePresence>
          {editingAlbum && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingAlbum(null)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-5xl bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh]"
              >
                {/* Modal Art Side */}
                <div className="md:w-[380px] bg-gray-50 p-8 border-r border-gray-100 flex flex-col">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white mb-6">
                    <img src={`${BASE_URL}/${editingAlbum.cover_image?.replace('\\', '/')}`} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Tracklist Preview</label>
                        <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar">
                            {editingAlbum.tracklist?.map((track: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between text-[11px] font-bold text-gray-700 bg-gray-50 p-2 rounded-lg">
                                    <span className="opacity-40">{track.position}.</span>
                                    <span className="flex-1 ml-2 truncate uppercase">{track.title}</span>
                                    <span className="text-gray-400">{track.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-[#4177BC]/5 rounded-xl border border-[#4177BC]/10">
                        <IconCalendar size={18} className="text-[#4177BC]" />
                        <div>
                            <p className="text-[8px] font-black text-[#4177BC] uppercase tracking-widest">Release Year</p>
                            <p className="text-xs font-bold text-gray-900">{editingAlbum.release_year}</p>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Modal Form Side */}
                <div className="flex-1 p-10 overflow-y-auto">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#4177BC]"></div>
                        <h2 className="text-xl font-black uppercase tracking-tight">Sync Release Info</h2>
                    </div>
                    <button onClick={() => setEditingAlbum(null)} className="text-gray-400 hover:text-black transition-colors"><IconX size={20} /></button>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Album Title</label>
                            <input type="text" value={editingAlbum.title} onChange={(e) => setEditingAlbum({ ...editingAlbum, title: e.target.value })} className={inputClasses} />
                        </div>
                        
                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Artist / Collective</label>
                            <input type="text" value={editingAlbum.artist} onChange={(e) => setEditingAlbum({ ...editingAlbum, artist: e.target.value })} className={inputClasses} />
                        </div>

                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Price ($)</label>
                            <input
                              type="number"
                              value={editingAlbum.bundle_deal?.price}
                              onChange={(e) => setEditingAlbum({ ...editingAlbum, bundle_deal: { ...editingAlbum.bundle_deal, price: e.target.value } })}
                              className={inputClasses}
                            />
                        </div>

                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Main Genre</label>
                            <select value={editingAlbum.main_genre} onChange={(e) => setEditingAlbum({ ...editingAlbum, main_genre: e.target.value })} className={inputClasses}>
                              <option value="Experimental">Experimental</option>
                              <option value="Industrial">Industrial</option>
                              <option value="Synthwave">Synthwave</option>
                              <option value="Ambient">Ambient</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Total Duration</label>
                            <input type="text" value={editingAlbum.duration} onChange={(e) => setEditingAlbum({ ...editingAlbum, duration: e.target.value })} className={inputClasses} />
                        </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Liner Notes / Description</label>
                      <textarea rows={4} value={editingAlbum.description} onChange={(e) => setEditingAlbum({ ...editingAlbum, description: e.target.value })} className={`${inputClasses} resize-none`} />
                    </div>

                    <button
                      disabled={isUpdating}
                      type="submit"
                      className="w-full bg-black hover:bg-[#4177BC] text-white py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-xl disabled:bg-gray-400"
                    >
                      {isUpdating ? <IconLoader2 className="animate-spin" size={18} /> : <IconDeviceFloppy size={18} />}
                      Update Masterpiece
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  ); 
}