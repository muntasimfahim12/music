/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Plus, 
  Home, 
  Briefcase, 
  Trash2, 
  Check,
  Edit3,
  Globe
} from "lucide-react";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Business Bay, Suite 405",
      city: "New York, NY 10001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      address: "DEEBZLENÜZ HQ, 789 Tech Plaza",
      city: "San Francisco, CA 94103",
      isDefault: false,
    }
  ]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] -mt-16 font-sans pb-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto pt-16 space-y-12">
        
        {/* --- HEADER SECTION --- */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 pb-10">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Saved <span className="text-gray-400 font-light">Addresses</span>
            </h1>
            <p className="inter-bold text-[10px] text-gray-400 uppercase tracking-[0.3em]">
              Manage shipping & billing locations
            </p>
          </div>

          <button 
            onClick={() => alert("Opening Address Form...")}
            className="group flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg inter-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10 cursor-pointer"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
            Add New Location
          </button>
        </section>

        {/* --- ADDRESS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {addresses.map((addr, idx) => (
              <motion.div
                key={addr.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:border-black/10 hover:shadow-2xl hover:shadow-black/[0.03] transition-all duration-500 flex flex-col justify-between min-h-[240px]"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-black group-hover:bg-black group-hover:text-white transition-colors duration-500">
                        {addr.type === "Home" ? <Home size={18} /> : <Briefcase size={18} />}
                      </div>
                      <span className="inter-bold text-[11px] uppercase tracking-[0.2em] text-black">
                        {addr.type}
                      </span>
                    </div>
                    
                    {addr.isDefault && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-black text-white rounded-full shadow-lg shadow-black/10">
                        <Check size={10} strokeWidth={4} />
                        <span className="inter-bold text-[8px] uppercase tracking-widest">Primary</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-2xl text-black leading-tight tracking-tight">
                      {addr.address}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Globe size={12} />
                      <p className="inter-medium text-[13px] uppercase tracking-wide">
                        {addr.city}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Action Buttons (Visible on Hover) */}
                <div className="flex items-center gap-4 pt-8 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <button className="flex items-center gap-2 inter-bold text-[10px] uppercase tracking-widest text-black hover:bg-gray-50 px-3 py-2 rounded-lg transition-all cursor-pointer">
                    <Edit3 size={14} /> Edit
                  </button>
                  <button className="flex items-center gap-2 inter-bold text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-all cursor-pointer">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                {/* Mobile Always Visible Actions */}
                <div className="flex md:hidden items-center gap-4 pt-6 mt-4 border-t border-gray-50">
                   <button className="inter-bold text-[10px] uppercase tracking-widest text-black">Edit</button>
                   <button className="inter-bold text-[10px] uppercase tracking-widest text-red-500">Remove</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- EMPTY STATE --- */}
        {addresses.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center border border-dashed border-gray-100 rounded-2xl bg-gray-50/30"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <MapPin size={24} className="text-gray-300" />
            </div>
            <p className="inter-bold text-gray-400 text-[11px] uppercase tracking-[0.3em]">
              The vault is currently empty
            </p>
          </motion.div>
        )}

        {/* --- BRAND FOOTER --- */}
        <div className="pt-24 text-center">
           <p className="inter-regular text-[10px] text-gray-300 uppercase tracking-[0.6em]">
              DEEBZLENÜZ VAULT • SECURE DATA STORAGE
           </p>
        </div>
      </div>
    </div>
  );
};

export default AddressesPage;