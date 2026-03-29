/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Plus, 
  Home, 
  Briefcase, 
  MoreVertical, 
  Trash2, 
  Check 
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
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-12 bg-white min-h-screen">
      
      {/* --- HEADER SECTION --- */}
      <section className="flex justify-between items-end border-b border-slate-100 pb-8">
        <div className="space-y-2">
          <h1 className="inter-bold text-3xl tracking-tight text-black">
            Addresses
          </h1>
          <p className="inter-medium text-[13px] text-slate-400 uppercase tracking-[0.2em]">
            Manage your shipping and billing locations
          </p>
        </div>

        {/* Add New Address Button */}
        <button 
          onClick={() => alert("Opening Address Form...")}
          className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-sm inter-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg shadow-slate-900/10"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
          Add New Address
        </button>
      </section>

      {/* --- ADDRESS LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {addresses.map((addr) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative border border-slate-200 rounded-sm p-8 hover:border-slate-900 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-full text-slate-900">
                      {addr.type === "Home" ? <Home size={16} /> : <Briefcase size={16} />}
                    </div>
                    <span className="inter-bold text-[11px] uppercase tracking-widest text-slate-900">
                      {addr.type}
                    </span>
                  </div>
                  
                  {addr.isDefault && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                      <Check size={10} strokeWidth={3} />
                      <span className="inter-bold text-[8px] uppercase tracking-tighter">Default</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1 pt-2">
                  <p className="judson-bold text-xl text-slate-900 leading-tight">
                    {addr.address}
                  </p>
                  <p className="inter-medium text-sm text-slate-400 uppercase tracking-wide">
                    {addr.city}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 pt-6 mt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="inter-bold text-[9px] uppercase tracking-[0.2em] text-slate-900 hover:text-blue-600 transition-colors">
                  Edit
                </button>
                <button className="inter-bold text-[9px] uppercase tracking-[0.2em] text-slate-900 hover:text-red-600 transition-colors">
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- EMPTY STATE NOTE --- */}
      {addresses.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-sm">
          <MapPin size={40} className="mx-auto text-slate-200 mb-4" />
          <p className="inter-medium text-slate-400 text-sm">No addresses found in the vault.</p>
        </div>
      )}

      {/* --- BRAND FOOTER --- */}
      <div className="pt-20 text-center opacity-20">
         <p className="judson-regular italic text-xs uppercase tracking-[0.5em]">
           DEEBZLENÜZ VAULT • SECURE DATA STORAGE
         </p>
      </div>
    </div>
  );
};

export default AddressesPage;