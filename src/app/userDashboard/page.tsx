"use client";

import React from "react";
import { motion } from "framer-motion";
import {  ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[45vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full"
      >
      

        {/* Main Heading - Using Judson for Authority */}
        <h1 className="text-4xl md:text-5xl tracking-[-0.03em] uppercase leading-none text-slate-900">
          <span className="judson-bold italic">System</span>{" "}
          <span className="judson-regular opacity-90">Initialized</span>
        </h1>

        {/* Status Badge - Using Inter for Metadata */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="h-[1px] w-8 bg-slate-100"></span>
          <p className="inter-medium text-[10px] text-slate-900 uppercase tracking-[0.5em] opacity-60">
             Access Level: Senior Admin
          </p>
          <span className="h-[1px] w-8 bg-slate-100"></span>
        </div>

        {/* Minimal Description - Using Inter Medium */}
        <p className="inter-medium text-[12px] text-slate-900 max-w-sm mx-auto mt-10 leading-relaxed uppercase tracking-[0.15em] opacity-50">
          Welcome to the DEEBZLENÜZ central node. 
          Your session is secured with end-to-end 256-bit encryption.
        </p>

        {/* Action Link - Using Inter Bold */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <button className="group flex items-center gap-3 mx-auto inter-bold text-[10px] uppercase tracking-[0.3em] text-slate-900 hover:opacity-70 transition-all">
            Explore Documentation 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;