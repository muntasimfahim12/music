"use client";

import UserTopbar from '@/src/components/layout/userTopbar';
import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
 
      <header className="w-full bg-white border-b border-gray-50">
        <UserTopbar />
      </header>

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>

      <footer className="py-10 border-t border-gray-100 bg-white">
         <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-[2px] bg-emerald-500/30 rounded-full mb-2"></div>
            <p className="text-[10px] text-slate-900 font-black uppercase tracking-[0.4em] italic">
               DEEBZLENÜZ <span className="text-emerald-500 not-italic"></span>
            </p>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">
               © 2026 Premium Asset Security
            </p>
         </div>
      </footer>
    </div>
  );
};

export default Layout;