/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Wallet, 
  UserCircle, 
  Settings, 
  Bell, 
  MapPin, 
  ShieldCheck,
  User,
  Camera
} from "lucide-react";

export const sidebarLinks = [
  { name: "Dashboard", href: "/userDashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/userDashboard/orders", icon: ShoppingBag },
  { name: "Wallet", href: "/userDashboard/wallet", icon: Wallet },
  { name: "Profile", href: "/userDashboard/profile", icon: UserCircle },
  { name: "Addresses", href: "/userDashboard/addresses", icon: MapPin },
  { name: "Notifications", href: "/userDashboard/notifications", icon: Bell },
  { name: "Account", href: "/userDashboard/account", icon: User },
  { name: "Settings", href: "/userDashboard/settings", icon: Settings },
];

export default function UserTopbar() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // ইমেজ চেঞ্জ হ্যান্ডলার (আপনি এখানে আপনার ব্যাকএন্ড লজিক যোগ করতে পারেন)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`${type} image selected:`, file.name);
      // Logic to upload to server or preview locally
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const activeItem = scrollRef.current.querySelector('.active-link') as HTMLElement;
      if (activeItem) {
        scrollRef.current.scrollTo({
          left: activeItem.offsetLeft - (scrollRef.current.offsetWidth / 2) + (activeItem.offsetWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [pathname]);

  return (
    <div className="w-full flex flex-col bg-[#fcfcfc] sticky top-0 z-50 shadow-sm md:shadow-none">
      
      {/* 1. PREMIUM COVER PHOTO SECTION */}
      <div className="w-full h-[160px] md:h-[260px] bg-[#0c111d] relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>
        
        {/* Brand Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-5xl judson-bold tracking-[-0.02em] uppercase text-center"
          >
            DEEBZLENÜZ
          </motion.h2>
          <p className="text-[9px] md:text-[11px] inter-bold text-gray-400 tracking-[0.4em] uppercase mt-1 opacity-80">
            Private Client Portal
          </p>
        </div>

        {/* Change Cover Button & Hidden Input */}
        <input 
          type="file" 
          ref={coverInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={(e) => handleImageChange(e, 'cover')} 
        />
        <button 
          onClick={() => coverInputRef.current?.click()}
          className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-md text-white hover:bg-black/60 transition-all z-20 cursor-pointer flex items-center gap-2"
        >
          <Camera size={16} />
          <span className="text-[10px] font-bold uppercase hidden md:block">Edit Cover</span>
        </button>
      </div>

      {/* 2. PROFILE IMAGE & INFO AREA */}
      <div className="max-w-[1200px] mx-auto w-full px-4 relative flex flex-col md:flex-row items-center md:items-end -mt-12 md:-mt-20 z-30 mb-6 md:mb-8">
        
        {/* Profile Circle */}
        <div className="relative group cursor-pointer" onClick={() => profileInputRef.current?.click()}>
          <input 
            type="file" 
            ref={profileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={(e) => handleImageChange(e, 'profile')} 
          />
          
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-[5px] border-[#fcfcfc] bg-[#1a1a1a] shadow-xl overflow-hidden flex items-center justify-center text-3xl md:text-5xl judson-bold text-white relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2E2E]/20 to-transparent opacity-40"></div>
            <span className="relative z-10 select-none">DV</span>
            
            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Camera size={24} className="text-white mb-1" />
              <span className="text-[10px] text-white font-bold uppercase hidden md:block">Update</span>
            </div>
          </div>
          
          {/* Verification Badge */}
          <div className="absolute bottom-2 right-1 bg-emerald-500 p-1.5 rounded-full border-[3px] border-[#fcfcfc] shadow-md z-40">
            <ShieldCheck size={12} className="text-white md:w-4 md:h-4" />
          </div>
        </div>

        {/* User Text Info */}
        <div className="mt-3 md:mt-0 md:ml-5 text-center md:text-left md:pb-3 flex-1 pointer-events-none">
          <h1 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight inter-bold">Fahim Muntasim</h1>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-0.5">
            <span className="text-[11px] md:text-xs text-slate-500 font-semibold tracking-wide uppercase">ID: #880172</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Verified Client</span>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION (Buttons are 100% same as your design) */}
      <nav className="w-full border-b border-slate-100 bg-[#fcfcfc] z-40">
        <div 
          ref={scrollRef}
          className="max-w-[1200px] mx-auto flex items-center gap-1 px-4 py-2 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative px-4 py-2.5 flex items-center gap-2.5 transition-all duration-300 rounded-lg shrink-0 whitespace-nowrap cursor-pointer
                  ${isActive 
                    ? "bg-slate-900 text-white active-link shadow-lg shadow-slate-200" 
                    : "text-slate-500 hover:bg-slate-100"
                  }
                `}
              >
                <Icon 
                  size={15} 
                  className={`${isActive ? "text-[#FF2E2E]" : "text-slate-400"}`} 
                />
                <span className="text-[10.5px] inter-bold uppercase tracking-[0.05em] select-none">
                  {link.name}
                </span>

                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute inset-0 border-b-2 border-[#FF2E2E] pointer-events-none rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}