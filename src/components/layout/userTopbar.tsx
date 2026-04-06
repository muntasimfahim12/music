"use client";

import React, { useRef, useEffect } from "react";
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
  User 
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

  // অটো-স্ক্রোল ফাংশন: যখন কোনো পেজে যাবে, মোবাইল মেনু ওই বাটনে স্ক্রোল হয়ে থাকবে
  useEffect(() => {
    if (scrollRef.current) {
      const activeItem = scrollRef.current.querySelector('.active-link');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [pathname]);

  return (
    <div className="w-full flex flex-col bg-[#fcfcfc] sticky top-0 z-50 shadow-sm md:shadow-none">
      
      {/* 1. PREMIUM BANNER SECTION */}
      <div className="w-full h-[180px] md:h-[240px] bg-[#0c111d] relative flex flex-col justify-center items-center text-white overflow-hidden px-4">
        
        {/* Pattern & Gradients */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c111d] via-transparent to-[#0c111d]/50"></div>
        
        {/* Brand Identity */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-5xl judson-bold tracking-[-0.02em] uppercase flex items-center justify-center gap-2">
              DEEBZLENÜZ <span className="text-[#FF2E2E] font-light"></span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-[1px] w-8 bg-[#FF2E2E]/50 md:block hidden" />
                <p className="text-[8px] md:text-[10px] inter-bold text-gray-400 tracking-[0.4em] uppercase opacity-80">
                  Private Client Dashboard
                </p>
                <div className="h-[1px] w-8 bg-[#FF2E2E]/50 md:block hidden" />
            </div>
          </motion.div>
        </div>

        {/* 2. FLOATING AVATAR */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30">
          <div className="relative">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="w-20 h-20 md:w-28 md:h-28 rounded-full border-[4px] md:border-[8px] border-[#fcfcfc] bg-[#1a1a1a] shadow-xl flex items-center justify-center text-2xl md:text-4xl judson-bold text-white overflow-hidden cursor-pointer"
             >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2E2E]/20 to-transparent opacity-40"></div>
                <span className="relative z-10 tracking-tighter">DV</span>
             </motion.div>
             
             {/* Small Verification Badge */}
             <div className="absolute bottom-1 right-1 bg-[#fcfcfc] p-1 rounded-full z-40">
                <div className="bg-emerald-500 p-1 md:p-1.5 rounded-full">
                   <ShieldCheck size={12} className="text-white md:w-4 md:h-4" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 3. MOBILE-OPTIMIZED SLIDER NAVIGATION */}
      <nav className="w-full border-b border-gray-100 pt-14 pb-2 bg-[#fcfcfc]">
        <div 
          ref={scrollRef}
          className="max-w-[1400px] mx-auto flex items-center gap-1 px-4 overflow-x-auto no-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative px-5 py-3 flex items-center gap-2.5 transition-all duration-500 rounded-full shrink-0
                  ${isActive ? "bg-black text-white active-link shadow-lg shadow-black/10" : "text-gray-500 hover:bg-gray-100"}
                `}
              >
                <Icon 
                  size={isActive ? 15 : 14} 
                  className={`${isActive ? "text-[#FF2E2E]" : "text-gray-400 group-hover:text-gray-600"}`} 
                />
                
                <span className={`text-[9px] md:text-[10px] inter-bold uppercase tracking-widest`}>
                  {link.name}
                </span>

                {/* Subtle Glow for Active Link */}
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-[#FF2E2E]/5 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}