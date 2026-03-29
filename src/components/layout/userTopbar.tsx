"use client";

import React from "react";
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
  { name: "My Orders", href: "/userDashboard/orders", icon: ShoppingBag },
  { name: "Wallet", href: "/userDashboard/wallet", icon: Wallet },
  { name: "Profile", href: "/userDashboard/profile", icon: UserCircle },
  { name: "Addresses", href: "/userDashboard/addresses", icon: MapPin },
  { name: "Notifications", href: "/userDashboard/notifications", icon: Bell },
  { name: "Account", href: "/userDashboard/account", icon: User },
  { name: "Settings", href: "/userDashboard/settings", icon: Settings },
];

export default function UserTopbar() {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col bg-[#fcfcfc]">
      {/* 1. THE REFINED PREMIUM BANNER */}
      <div className="w-full h-[220px] md:h-[260px] bg-[#0c111d] relative flex flex-col justify-center items-center text-white overflow-visible px-4">
        
        {/* Subtle Noise Texture & Gradient Overlays */}
        <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c111d] via-transparent to-transparent"></div>
        
     

        {/* Minimalist Title Section */}
        <div className="relative z-10 text-center -mt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] uppercase flex items-center justify-center gap-2">
              DEEBZLENÜZ <span className="text-emerald-500 font-light opacity-90 tracking-tighter"></span>
            </h2>
            <p className="text-[9px] font-medium text-gray-500 tracking-[0.5em] uppercase mt-2 opacity-70">
              Enterprise Edition
            </p>
          </motion.div>
        </div>

        {/* 2. THE FLOATING AVATAR - Fully Circular & Refined Size */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-30">
          <div className="relative group">
             {/* Circular Avatar Box */}
             <motion.div 
               whileHover={{ y: -3 }}
               className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[6px] md:border-[8px] border-[#fcfcfc] bg-[#3a1a1a] shadow-[0_20px_40px_-8px_rgba(0,0,0,0.3)] flex items-center justify-center text-3xl md:text-4xl font-black text-white relative overflow-hidden cursor-pointer"
             >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                <span className="relative z-10 tracking-tighter">DV</span>
                
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </motion.div>
             
             {/* Verification Badge - Smaller for circular avatar */}
             <div className="absolute bottom-0 right-0 bg-[#fcfcfc] p-1.5 rounded-full z-40 shadow-sm">
                <div className="bg-emerald-500 p-1.5 rounded-full shadow-md shadow-emerald-500/20">
                   <ShieldCheck size={16} className="text-white" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 3. MOBILE-READY MODERN NAVIGATION */}
      <nav className="w-full border-b border-gray-100 pt-16 pb-1 bg-[#fcfcfc]">
        {/* Horizontal Scroll with No Scrollbar for Premium Feel */}
        <div className="max-w-[1400px] mx-auto flex items-center justify-start md:justify-center gap-1 md:gap-2 px-6 overflow-x-auto scrollbar-hide">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative px-4 py-4 group flex flex-col md:flex-row items-center gap-2 md:gap-3 transition-all duration-300 rounded-xl mb-1 shrink-0
                  ${isActive ? "bg-white shadow-[0_8px_15px_-3px_rgba(0,0,0,0.04)]" : "hover:bg-gray-100/50"}
                `}
              >
                {/* Icon is slightly larger on mobile for better touch target */}
                <Icon 
                  size={isActive ? 18 : 16} 
                  className={`transition-colors duration-300 ${
                    isActive ? "text-emerald-500" : "text-gray-400 group-hover:text-gray-600"
                  }`} 
                />
                
                {/* Label - Bold and readable */}
                <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                  isActive ? "text-slate-900" : "text-gray-400 group-hover:text-gray-700"
                }`}>
                  {link.name}
                </span>
                
                {/* Active Indicator - Sleek Center Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="activePill"
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Global CSS to hide scrollbar (Tailwind doesn't have it by default) */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}