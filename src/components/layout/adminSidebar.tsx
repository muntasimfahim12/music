/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/static-components */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconLayoutDashboard,
    IconShoppingBag,
    IconMusic,
    IconVideo,
    IconClipboardList,
    IconSettings,
    IconLogout,
    IconChevronRight,
    IconMenu2,
    IconX,
    IconCircleFilled
} from "@tabler/icons-react";

const links = [
    { label: "Dashboard", href: "/adminDashboard", icon: IconLayoutDashboard },
    { 
        label: "Products", 
        href: "/adminDashboard/products", 
        icon: IconShoppingBag, 
        isDropdown: true,
        subItems: [
            { label: "Overview", href: "/adminDashboard/products" },
            { label: "New Product", href: "/adminDashboard/products/addProducts" },
        ]
    },
    { 
        label: "Music Store", 
        href: "/adminDashboard/music", 
        icon: IconMusic, 
        isDropdown: true,
        subItems: [
            { label: "Collections", href: "/adminDashboard/music" },
            { label: "Upload Track", href: "/adminDashboard/music/addMusic" },
        ]
    },
    { 
        label: "Videos", 
        href: "/adminDashboard/videos", 
        icon: IconVideo, 
        isDropdown: true,
        subItems: [
            { label: "All Clips", href: "/adminDashboard/videos" },
            { label: "New Upload", href: "/adminDashboard/videos/new" },
        ]
    },
    { label: "Orders", href: "/adminDashboard/orders", icon: IconClipboardList },
    { label: "Settings", href: "/adminDashboard/settings", icon: IconSettings },
];

export function AdminSidebar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    const toggleMenu = (label: string) => {
        setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const SidebarContent = ({ isMobile = false }) => (
        <div className="flex flex-col h-full bg-[#F8FAFC] select-none">
            {/* Logo Section */}
            <div className={`flex items-center px-10 ${isMobile ? "py-8" : "h-32"}`}>
                <Link href="/adminDashboard" className="relative transition-transform active:scale-95 duration-200">
                    <Image
                        src="/logo/logo.png"
                        alt="Vault Logo"
                        width={isMobile ? 110 : 140}
                        height={45}
                        className="object-contain"
                        priority
                    />
                </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-6 space-y-1 overflow-y-auto custom-scrollbar scroll-smooth">
                <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 opacity-70">
                    Main Menu
                </p>
                
                {links.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const isOpen = openMenus[item.label];

                    return (
                        <div key={item.label} className="relative">
                            {item.isDropdown ? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.label)}
                                        className={`w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-colors duration-200 relative
                                            ${isActive ? "text-black" : "text-slate-500 hover:text-black"}`}
                                    >
                                        <div className="flex items-center gap-3.5 z-10">
                                            <item.icon size={20} stroke={isActive ? 2.5 : 1.5} className={`${isActive ? "text-black" : "text-slate-400 group-hover:text-black"} transition-colors duration-200`} />
                                            <span className={`text-[14px] tracking-tight ${isActive ? "font-bold" : "font-semibold"}`}>{item.label}</span>
                                        </div>
                                        <IconChevronRight size={16} className={`z-10 transition-transform duration-300 ${isOpen ? "rotate-90 text-black" : "text-slate-300"}`} />
                                        
                                        {isActive && (
                                            <motion.div 
                                                layoutId="activeBackground"
                                                className="absolute inset-0 bg-white border border-slate-200/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-xl z-0"
                                                transition={{ type: "tween", duration: 0.2 }}
                                            />
                                        )}
                                    </button>
                                    
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                className="overflow-hidden ml-10 border-l border-slate-200 my-1"
                                            >
                                                {item.subItems?.map((sub) => {
                                                    const isSubActive = pathname === sub.href;
                                                    return (
                                                        <Link
                                                            key={sub.href}
                                                            href={sub.href}
                                                            className={`flex items-center gap-2.5 px-4 py-2 text-[13px] transition-all duration-200
                                                                ${isSubActive ? "text-black font-bold" : "text-slate-400 hover:text-black hover:translate-x-1"}`}
                                                        >
                                                            {isSubActive && <IconCircleFilled size={5} className="text-black" />}
                                                            {sub.label}
                                                        </Link>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-colors duration-200 relative
                                        ${isActive ? "text-black" : "text-slate-500 hover:text-black"}`}
                                >
                                    <div className="flex items-center gap-3.5 z-10">
                                        <item.icon size={20} stroke={isActive ? 2.5 : 1.5} className={`${isActive ? "text-black" : "text-slate-400 group-hover:text-black"} transition-colors duration-200`} />
                                        <span className={`text-[14px] tracking-tight ${isActive ? "font-bold" : "font-semibold"}`}>{item.label}</span>
                                    </div>

                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeBackground"
                                            className="absolute inset-0 bg-white border border-slate-200/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-xl z-0"
                                            transition={{ type: "tween", duration: 0.2 }}
                                        />
                                    )}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Bottom Profile */}
            <div className="p-6 mt-auto">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 flex items-center justify-between border border-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-black flex items-center justify-center text-white text-[11px] font-black tracking-tighter">
                            MF
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-black leading-tight">Mayan Fayaz</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Admin</span>
                        </div>
                    </div>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
                        <IconLogout size={18} stroke={2} />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden font-sans selection:bg-black selection:text-white antialiased">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-[280px] flex-shrink-0 z-50 border-r border-slate-100">
                <SidebarContent />
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 flex items-center justify-between z-40">
                <Image src="/logo/logo.png" alt="Logo" width={90} height={35} className="object-contain" />
                <button 
                    onClick={() => setIsMobileOpen(true)}
                    className="h-10 w-10 flex items-center justify-center bg-black text-white rounded-xl shadow-lg active:scale-95 transition-transform"
                >
                    <IconMenu2 size={20} />
                </button>
            </header>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
                        />
                        <motion.div 
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-[70] md:hidden shadow-2xl"
                        >
                            <SidebarContent isMobile />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 flex flex-col relative overflow-hidden bg-[#FDFDFD]">
                <div className="flex-1 overflow-y-auto p-4 md:p-10 mt-16 md:mt-0 custom-scrollbar scroll-smooth">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
                
                /* ল্যাগ কমানোর জন্য এনিমেশন অপ্টিমাইজেশন */
                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
            `}</style>
        </div>
    );
}