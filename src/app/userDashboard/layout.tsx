"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Wallet, 
  User, 
  Settings, 
  Bell, 
  MapPin, 
  LogOut, 
  ShieldCheck,
  Menu,
  X
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Account", href: "/dashboard/account", icon: ShieldCheck },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-[#E11D48]/30">
      
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="w-72 border-r border-white/5 bg-[#080808] hidden lg:flex flex-col sticky top-0 h-screen z-[60]">
        <div className="p-8">
          <Link href="/">
            <h2 className="text-xl font-black tracking-tighter italic text-[#E11D48] hover:scale-105 transition-transform cursor-pointer">
              DEEBZLENÜZ <span className="text-[10px] not-italic text-gray-500 ml-1 tracking-widest uppercase">Vault</span>
            </h2>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all group ${
                  isActive 
                    ? "bg-[#E11D48] text-white shadow-[0_10px_20px_rgba(225,29,72,0.2)]" 
                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                }`}>
                  <link.icon size={18} className={isActive ? "text-white" : "text-zinc-600 group-hover:text-[#E11D48]"} />
                  {link.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button className="w-full flex items-center gap-4 px-4 py-3.5 text-zinc-500 hover:text-[#E11D48] transition-all font-black text-[12px] uppercase tracking-widest rounded-2xl hover:bg-white/5">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative">
        
        {/* TOP HEADER */}
        <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 sticky top-0 z-[50]">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Toggle */}
             <button 
               className="lg:hidden text-zinc-400 hover:text-white"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={24} />
             </button>
             
             <h1 className="text-[11px] font-black tracking-[0.3em] uppercase text-zinc-500 hidden sm:block">
               System / <span className="text-white">{sidebarLinks.find(l => l.href === pathname)?.name || "Overview"}</span>
             </h1>
          </div>
          
          <div className="flex items-center gap-5">
             {/* Notification */}
             <div className="relative group cursor-pointer p-2 hover:bg-white/5 rounded-full transition-colors">
                <Bell size={20} className="text-zinc-400 group-hover:text-white" />
                <span className="absolute top-2 right-2 bg-[#E11D48] w-2 h-2 rounded-full ring-4 ring-black"></span>
             </div>

             {/* User Avatar - Based on image_e4e141 layout */}
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

        {/* PAGE CONTENT */}
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

      {/* 3. MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-[#080808] border-r border-white/5 z-[110] p-8 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black italic text-[#E11D48]">DEEBZLENÜZ</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-500"><X size={24} /></button>
              </div>
              
              <nav className="flex-1 space-y-2">
                {sidebarLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest ${
                      pathname === link.href ? "bg-[#E11D48] text-white" : "text-zinc-500"
                    }`}>
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