"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PencilLine, 
  Image as ImageIcon, 
  Type, 
  Video, 
  Film, 
  Smile,
  Save
} from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
  const [bio, setBio] = useState(""); 
  
  const profileData = {
    joinDate: "Mar 29, 2026",
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-12 bg-white min-h-screen text-slate-900">
      
      {/* --- HEADER SECTION --- */}
      <section className="space-y-4">
        <div className="flex justify-between items-start">
          <h1 className="inter-bold text-3xl tracking-tight text-black">
            Profile
          </h1>
          <Link 
            href="/userDashboard/account" 
            className="flex items-center gap-2 text-blue-600 hover:underline transition-all"
          >
            <PencilLine size={18} />
            <span className="inter-medium text-[15px]">Edit Profile</span>
          </Link>
        </div>
        
        <p className="inter-medium text-[15px] text-slate-800">
          Join date: {profileData.joinDate}
        </p>
        
        <div className="h-[1px] w-full bg-slate-200 mt-6"></div>
      </section>

      {/* --- ABOUT / NOTE SECTION --- */}
      <section className="space-y-8 pt-4">
        <div className="flex justify-between items-center">
          <h2 className="inter-bold text-2xl tracking-tight text-black">
            About
          </h2>
          {bio && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="inter-medium text-[11px] text-emerald-600 uppercase tracking-widest"
            >
              Drafting...
            </motion.span>
          )}
        </div>

        {/* Functional Textarea Container */}
        <div className="w-full border border-slate-300 rounded-sm p-6 min-h-[250px] flex flex-col justify-between group focus-within:border-slate-900 transition-all">
          
          {/* Editable Textarea */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Add a short bio or personal note..."
            className="inter-medium text-[15px] text-slate-800 placeholder:text-slate-400 outline-none resize-none flex-grow bg-transparent"
          />

          {/* Bottom Toolbar & Action */}
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-5 text-slate-400">
               <button className="hover:text-black transition-colors" title="Add Image">
                 <ImageIcon size={20} strokeWidth={1.5} />
               </button>
               <button className="hover:text-black transition-colors" title="Text Style">
                 <Type size={20} strokeWidth={1.5} />
               </button>
               <button className="hover:text-black transition-colors" title="Add Video">
                 <Video size={20} strokeWidth={1.5} />
               </button>
               <button className="hover:text-black transition-colors" title="Add Media">
                 <Film size={20} strokeWidth={1.5} />
               </button>
               <button className="hover:text-black transition-colors" title="Add Emoji">
                 <Smile size={20} strokeWidth={1.5} />
               </button>
            </div>

            {/* Save Button (Only shows when typing) */}
            {bio && (
              <button 
                onClick={() => alert("Note saved successfully!")}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-sm inter-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all"
              >
                <Save size={14} /> Save Note
              </button>
            )}
          </div>
        </div>
      </section>

      {/* --- BRAND FOOTER --- */}
      <div className="pt-20 text-center opacity-20">
         <p className="judson-regular italic text-xs uppercase tracking-[0.5em]">
           DEEBZLENÜZ VAULT SECURE ACCESS
         </p>
      </div>
    </div>
  );
};

export default ProfilePage;