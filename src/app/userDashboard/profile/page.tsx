/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PencilLine, 
  Image as ImageIcon, 
  Type, 
  Video, 
  Film, 
  Smile,
  Save,
  Clock,
  Bold,
  Italic
} from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
  const [bio, setBio] = useState(""); 
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const profileData = {
    joinDate: "Mar 29, 2026",
  };

  // --- Functions for Text Styling ---
  const applyStyle = (prefix: string, suffix: string) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = bio.substring(start, end);
    
    const newText = 
      bio.substring(0, start) + 
      prefix + selectedText + suffix + 
      bio.substring(end);

    setBio(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans -mt-16 pb-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto pt-16 space-y-12">
        
        {/* --- HEADER SECTION --- */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                User <span className="text-gray-400 font-light ">Profile</span>
              </h1>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={12} />
                <p className="text-[10px] inter-bold uppercase tracking-widest text-gray-400">
                  Member since {profileData.joinDate}
                </p>
              </div>
            </div>
            
            <Link 
              href="/userDashboard/account" 
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow-sm hover:bg-gray-800 transition-all duration-300 group cursor-pointer"
            >
              <PencilLine size={14} className="group-hover:rotate-12 transition-transform" />
              <span className="inter-bold text-[11px] tracking-wider uppercase">Edit</span>
            </Link>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-gray-100 via-gray-200 to-transparent"></div>
        </section>

        {/* --- ABOUT / NOTE SECTION --- */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl inter-bold text-black tracking-tight">
              About / <span className="text-gray-400">Bio</span>
            </h2>
            <AnimatePresence>
              {bio && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="inter-bold text-[9px] text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-[0.2em]"
                >
                  Drafting mode
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Premium Textarea Container */}
          <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 md:p-6 min-h-[350px] flex flex-col shadow-sm focus-within:shadow-xl focus-within:shadow-black/[0.02] focus-within:border-black/10 transition-all duration-500">
            
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => alert("Image selected: " + e.target.files?.[0].name)} 
            />

            {/* Editable Textarea */}
            <textarea
              ref={textAreaRef}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full inter-medium text-[15px] text-gray-800 placeholder:text-gray-300 outline-none resize-none flex-grow bg-transparent leading-relaxed"
            />

            {/* Formatting & Media Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50">
              <div className="flex items-center flex-wrap gap-5 text-gray-400">
                
                 {/* Text Style Actions */}
                 <div className="flex items-center gap-3 pr-5 border-r border-gray-100">
                   <button 
                    onClick={() => applyStyle("**", "**")} 
                    className="hover:text-black transition-colors cursor-pointer p-1" 
                    title="Bold"
                   >
                     <Bold size={18} strokeWidth={2.5} />
                   </button>
                   <button 
                    onClick={() => applyStyle("_", "_")} 
                    className="hover:text-black transition-colors cursor-pointer p-1" 
                    title="Italic"
                   >
                     <Italic size={18} strokeWidth={2.5} />
                   </button>
                 </div>

                 {/* Media Actions */}
                 <button onClick={() => fileInputRef.current?.click()} className="hover:text-black transition-colors cursor-pointer" title="Add Image">
                   <ImageIcon size={18} strokeWidth={2} />
                 </button>
                 <button onClick={() => alert("Video feature coming soon")} className="hover:text-black transition-colors cursor-pointer" title="Add Video">
                   <Video size={18} strokeWidth={2} />
                 </button>
                 <button onClick={() => alert("Media gallery coming soon")} className="hover:text-black transition-colors cursor-pointer" title="Add Media">
                   <Film size={18} strokeWidth={2} />
                 </button>
                 <button onClick={() => alert("Emoji picker coming soon")} className="hover:text-black transition-colors cursor-pointer" title="Add Emoji">
                   <Smile size={18} strokeWidth={2} />
                 </button>
              </div>

              {/* Save Button */}
              <AnimatePresence>
                {bio && (
                  <motion.button 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={() => alert("Note saved successfully!")}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg inter-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10 cursor-pointer"
                  >
                    <Save size={14} /> Save Changes
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- BRAND FOOTER --- */}
        <div className="pt-24 text-center">
           <p className="judson-regular italic text-[10px] text-gray-300 uppercase tracking-[0.6em]">
              DEEBZLENÜZ VAULT • SECURE ACCESS
           </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;