/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconPlus, IconSearch, IconDisc, 
  IconClock, IconStarFilled, IconEdit, 
  IconTrash, IconX, IconDeviceFloppy, 
  IconPhotoPlus, IconMusic, IconCalendar
} from "@tabler/icons-react";
import Link from "next/link";

const musicData = [
  {
    id: 5,
    title: "STATIC DREAMS",
    artist: "Frequency Studio",
    cover_image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop",
    main_genre: "Industrial",
    total_tracks: "9 Tracks",
    duration: "40:30",
    releaseDate: "2024-03-15",
    price: 8.99,
    rating: 4.6,
    description: "The official visual journey for Static Dreams album with high fidelity audio."
  },
  {
    id: 6,
    title: "NEON HORIZON",
    artist: "SynthWave Pro",
    cover_image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    main_genre: "Synthwave",
    total_tracks: "12 Tracks",
    duration: "52:15",
    releaseDate: "2024-02-10",
    price: 9.99,
    rating: 4.9,
    description: "A deep dive into synth-heavy production and futuristic melodies."
  }
];

export default function MusicStorePage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [editingMusic, setEditingMusic] = useState<any>(null);

  const genres = ["All", "Industrial", "Synthwave", "Techno", "Ambient"];
  const inputClasses = `w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC]`;

  return (
    <div className="max-w-[1300px] mx-auto pb-20 px-4 sm:px-8 bg-[#FBFBFE] selection:bg-[#4177BC]/10">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-12 pb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight inter-bold">
            Music <span className="text-slate-400 font-medium">Store</span>
          </h1>
          <p className="text-[14px] text-slate-500 font-medium inter-medium">
            Professional music for your projects, royalty-free and ready to use.
          </p>
        </div>

        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#4177BC] text-white px-6 py-3.5 rounded-xl font-bold text-[12px] uppercase tracking-widest transition-all shadow-lg active:scale-95">
          <IconPlus size={18} stroke={3} />
          New Release
        </button>
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12 py-3 border-b border-slate-100">
        <div className="relative w-full lg:max-w-xs group">
          <IconSearch size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4177BC] transition-colors" />
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full pl-7 pr-4 py-2 bg-transparent border-none outline-none focus:ring-0 text-sm font-bold text-slate-700 placeholder:text-slate-300 uppercase"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${selectedGenre === genre ? "bg-[#4177BC] text-white shadow-lg shadow-blue-100" : "bg-transparent text-slate-400 hover:text-slate-900"}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* --- MUSIC GRID (Video Card Style 100% Same) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {musicData.map((music) => (
          <motion.div 
            key={music.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
          >
            {/* Thumbnail Area */}
            <div className="relative aspect-square bg-slate-900 overflow-hidden">
              <img 
                src={music.cover_image} 
                alt={music.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-[#4177BC] transition-all duration-300 shadow-xl">
                  <IconMusic size={20} />
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                  {music.main_genre}
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="bg-white/90 backdrop-blur-md text-[#4177BC] text-[10px] font-black px-3 py-1.5 rounded-lg shadow-sm">
                  ${music.price}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 md:p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900 leading-tight uppercase line-clamp-1 group-hover:text-[#4177BC] transition-colors">
                  {music.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter flex items-center gap-2">
                  <IconCalendar size={12} /> {music.releaseDate}
                </p>
              </div>

              {/* Status Info Bar */}
              <div className="flex items-center justify-between py-3 border-y border-slate-50">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                  <IconDisc size={12} className="text-slate-300" /> {music.total_tracks.split(' ')[0]} Tracks
                </div>
                <div className="flex items-center gap-1 text-[9px] font-bold text-amber-500 uppercase tracking-tighter">
                  <IconStarFilled size={10} /> {music.rating}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => setEditingMusic(music)}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 py-3 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest"
                >
                  <IconEdit size={14} stroke={2.5} /> Edit
                </button>
                <button className="w-12 flex items-center justify-center bg-slate-50 hover:bg-red-500 hover:text-white text-slate-400 py-3 rounded-xl transition-all">
                  <IconTrash size={14} stroke={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- EDIT MODAL (100% Same as Video Page) --- */}
      <AnimatePresence>
        {editingMusic && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditingMusic(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#4177BC] text-white rounded-xl shadow-lg shadow-blue-100">
                    <IconMusic size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 inter-bold">Edit Release Details</h2>
                </div>
                <button onClick={() => setEditingMusic(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <IconX size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Album Title</label>
                    <input type="text" defaultValue={editingMusic.title} className={inputClasses} />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Artist Name</label>
                    <input type="text" defaultValue={editingMusic.artist} className={inputClasses} />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Price ($)</label>
                    <input type="number" defaultValue={editingMusic.price} className={inputClasses} />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Main Genre</label>
                    <select defaultValue={editingMusic.main_genre} className={inputClasses}>
                      {genres.filter(g => g !== "All").map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Duration</label>
                    <input type="text" defaultValue={editingMusic.duration} className={inputClasses} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Description</label>
                    <textarea rows={3} defaultValue={editingMusic.description} className={`${inputClasses} resize-none`} />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 pt-4 border-t border-slate-50 flex items-center justify-end gap-3">
                <button onClick={() => setEditingMusic(null)} className="px-6 py-3 rounded-xl font-bold text-xs text-slate-500 hover:bg-slate-100 transition-all uppercase tracking-widest">
                  Cancel
                </button>
                <button className="flex items-center gap-2 bg-slate-900 hover:bg-[#4177BC] text-white px-8 py-3.5 rounded-xl font-bold text-xs transition-all shadow-xl active:scale-95 uppercase tracking-widest">
                  <IconDeviceFloppy size={18} />
                  Update Release
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}