/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconPlus, IconSearch, IconVideo, 
  IconPlayerPlayFilled, IconTrash, IconEdit,
  IconX, IconDeviceFloppy, IconBrandYoutube,
  IconCalendar, IconSettings
} from "@tabler/icons-react";
import Link from "next/link";

const videoData = [
  {
    id: "1",
    title: "STATIC DREAMS - OFFICIAL MUSIC VIDEO",
    youtubeId: "dQw4w9WgXcQ",
    category: "Music Video",
    releaseDate: "2024-03-15",
    description: "The official visual journey for Static Dreams album.",
    status: "Public"
  },
  {
    id: "2",
    title: "BEHIND THE SCENES: FREQUENCY STUDIO",
    youtubeId: "9bZkp7q19f0", 
    category: "Documentary",
    releaseDate: "2024-02-10",
    description: "A deep dive into our production process.",
    status: "Public"
  }
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [editingVideo, setEditingVideo] = useState<any>(null);

  const inputClasses = `
    w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 
    text-slate-700 font-medium text-sm transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC]
  `;

  return (
    <div className="max-w-[1300px] mx-auto pb-20 px-4 sm:px-8 bg-[#FBFBFE] selection:bg-[#4177BC]/10">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-12 pb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight inter-bold">
            Video <span className="text-slate-400 font-medium">Library</span>
          </h1>
          <p className="text-[14px] text-slate-500 font-medium inter-medium">
            Manage your visual content, media assets, and video visibility.
          </p>
        </div>

        <Link href="/adminDashboard/addVideo">
          <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#4177BC] text-white px-6 py-3.5 rounded-xl font-bold text-[12px] uppercase tracking-widest transition-all shadow-lg active:scale-95">
            <IconPlus size={18} stroke={3} />
            Add New Video
          </button>
        </Link>
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="flex flex-col lg:row gap-6 items-center justify-between mb-12 py-3 border-b border-slate-100">
        <div className="relative w-full lg:max-w-xs group">
          <IconSearch size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4177BC] transition-colors" />
          <input
            type="text" 
            placeholder="Search videos..."
            className="w-full pl-7 pr-4 py-2 bg-transparent border-none outline-none focus:ring-0 text-sm font-bold text-slate-700 placeholder:text-slate-300 uppercase"
          />
        </div>
      </div>

      {/* --- VIDEO GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {videoData.map((video) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
          >
            {/* Thumbnail Area */}
            <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(video)}>
              <img 
                src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                alt={video.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-[#4177BC] transition-all duration-300">
                  <IconPlayerPlayFilled size={20} className="md:size-24" />
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                  {video.category}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 md:p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900 leading-tight uppercase line-clamp-1 group-hover:text-[#4177BC] transition-colors">
                  {video.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter flex items-center gap-2">
                  <IconCalendar size={12} /> {video.releaseDate}
                </p>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 font-medium">
                {video.description}
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => setEditingVideo(video)}
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

      {/* --- VIDEO PLAYER MODAL --- */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
              >
                <IconX size={20} stroke={3} />
              </button>

              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- EDIT MODAL --- */}
      <AnimatePresence>
        {editingVideo && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditingVideo(null)}
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
                    <IconVideo size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 inter-bold">Edit Video Details</h2>
                </div>
                <button onClick={() => setEditingVideo(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <IconX size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Video Title</label>
                    <input type="text" defaultValue={editingVideo.title} className={inputClasses} />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">YouTube ID</label>
                    <div className="relative">
                      <IconBrandYoutube className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input type="text" defaultValue={editingVideo.youtubeId} className={`${inputClasses} pl-11 font-mono`} />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Category</label>
                    <select defaultValue={editingVideo.category} className={inputClasses}>
                      <option>Music Video</option>
                      <option>Documentary</option>
                      <option>Behind the Scenes</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Description</label>
                    <textarea rows={3} defaultValue={editingVideo.description} className={`${inputClasses} resize-none`} />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 pt-4 border-t border-slate-50 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setEditingVideo(null)}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-slate-500 hover:bg-slate-100 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button className="flex items-center gap-2 bg-slate-900 hover:bg-[#4177BC] text-white px-8 py-3.5 rounded-xl font-bold text-xs transition-all shadow-xl active:scale-95 uppercase tracking-widest">
                  <IconDeviceFloppy size={18} />
                  Update Video
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}