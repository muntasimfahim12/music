"use client";

import React, { useState } from "react";
import Sidebar, { sidebarLinks } from "../../components/layout/sidebar"; 
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, User } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-[#E11D48]/30">
      
      <Sidebar />

      <div className="flex-1 flex flex-col relative">
        <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 sticky top-0 z-[50]">
          <div className="flex items-center gap-4">
             <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
               <Menu size={24} />
             </button>
             <h1 className="text-[11px] font-black tracking-[0.3em] uppercase text-zinc-500 hidden sm:block">
               System / <span className="text-white">{sidebarLinks.find(l => l.href === pathname)?.name || "Overview"}</span>
             </h1>
          </div>
          
          {/* Header Right Side (Notification & Profile) */}
          <div className="flex items-center gap-5">
             <div className="relative group cursor-pointer p-2 hover:bg-white/5 rounded-full transition-colors">
                <Bell size={20} className="text-zinc-400 group-hover:text-white" />
                <span className="absolute top-2 right-2 bg-[#E11D48] w-2 h-2 rounded-full ring-4 ring-black"></span>
             </div>

             <Link href="/dashboard/profile">
               <div className="flex items-center gap-3 pl-4 border-l border-white/10 group cursor-pointer">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-white uppercase tracking-tight">Shahin Afridi</p>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Premium Member</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E11D48] to-[#881337] border border-white/10 p-[2px]">
                    <div className="w-full h-full rounded-[10px] bg-[#080808] flex items-center justify-center overflow-hidden">
                       <User size={20} className="text-white/50" />
                    </div>
                  </div>
               </div>
             </Link>
          </div>
        </header>

        <main className="p-6 md:p-10 lg:p-12 w-full max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* MOBILE MENU (আগের মতোই থাকল) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-[#080808] border-r border-white/5 z-[110] p-8 lg:hidden flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black italic text-[#E11D48]">DEEBZLENÜZ</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-500"><X size={24} /></button>
              </div>
              <nav className="flex-1 space-y-2">
                {sidebarLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest ${pathname === link.href ? "bg-[#E11D48] text-white" : "text-zinc-500"}`}>
                      <link.icon size={20} />
                      {link.name}
                    </div>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}