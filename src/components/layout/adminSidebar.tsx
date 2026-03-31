"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
    IconLayoutDashboard,
    IconShoppingBag,
    IconMusic,
    IconVideo,
    IconClipboardList,
    IconSettings,
    IconLogout,
    IconPlus,
    IconChevronDown,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function AdminSidebar({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const pathname = usePathname();

    const links = [
        {
            label: "Dashboard",
            href: "/adminDashboard",
            icon: <IconLayoutDashboard className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Products",
            href: "/adminDashboard/products",
            icon: <IconShoppingBag className="h-5 w-5 shrink-0" />,
            addHref: "/adminDashboard/products/addProducts",
        },
        {
            label: "Music Store",
            href: "/adminDashboard/music",
            icon: <IconMusic className="h-5 w-5 shrink-0" />,
            addHref: "/adminDashboard/music/new",
        },
        {
            label: "Videos",
            href: "/adminDashboard/videos",
            icon: <IconVideo className="h-5 w-5 shrink-0" />,
            addHref: "/adminDashboard/videos/new",
        },
        {
            label: "Orders",
            href: "/adminDashboard/orders",
            icon: <IconClipboardList className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Global Settings",
            href: "/adminDashboard/settings",
            icon: <IconSettings className="h-5 w-5 shrink-0" />,
        },
    ];

    return (
        <div className={cn(
            "flex flex-col md:flex-row bg-[#FFFFFF] w-full flex-1 mx-auto overflow-hidden",
            "h-screen"
        )}>
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10 bg-[#FFFFFF] border-r border-slate-100 shadow-[4px_0_24px_rgba(65,119,188,0.02)]">
                    <div className="flex flex-1 flex-col overflow-x-hidden">
                        {/* লোগো সেকশন - Premium Branding */}
                        <div className="px-2">
                            {open ? <Logo /> : <LogoIcon />}
                        </div>
                        
                        <div className="mt-8 flex flex-col gap-1 px-3">
                            {links.map((link, idx) => {
                                const hasSubMenu = !!link.addHref;
                                const isSubMenuOpen = activeSubMenu === link.label;
                                const isActive = pathname === link.href;

                                return (
                                    <div 
                                        key={idx} 
                                        className="relative flex flex-col"
                                        onMouseEnter={() => hasSubMenu && setActiveSubMenu(link.label)}
                                        onMouseLeave={() => hasSubMenu && setActiveSubMenu(null)}
                                    >
                                        <div className="group relative">
                                            {/* Active Pill Indicator */}
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="active-indicator"
                                                    className="absolute left-[-12px] w-1.5 h-8  rounded-r-full z-10"
                                                />
                                            )}
                                            
                                            <SidebarLink 
                                                link={link} 
                                                className={cn(
                                                    "flex-1 rounded-xl px-4 py-3 transition-all duration-200",
                                                    isActive 
                                                        ? "bg-[#4177BC]/10 text-[#4177BC] font-bold" 
                                                        : "text-slate-500 hover:text-[#4177BC] hover:bg-slate-50"
                                                )} 
                                            />
                                            
                                            {hasSubMenu && open && (
                                                <IconChevronDown 
                                                    size={14} 
                                                    className={cn(
                                                        "absolute right-4 top-4 text-slate-300 transition-transform duration-200",
                                                        isSubMenuOpen && "rotate-180 text-[#4177BC]"
                                                    )} 
                                                />
                                            )}
                                        </div>

                                        <AnimatePresence>
                                            {hasSubMenu && isSubMenuOpen && open && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2, ease: "circOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="ml-9 pl-4 mt-1 border-l-2 border-[#4177BC]/10 flex flex-col gap-1 pb-2">
                                                        <SidebarLink 
                                                            link={{
                                                                label: `Add New`,
                                                                href: link.addHref!,
                                                                icon: <IconPlus size={14} className="text-[#]" stroke={3} />
                                                            }} 
                                                            className="text-[12px] py-2 text-slate-500 hover:text-[#4177BC] transition-all font-medium"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ইউজার প্রোফাইল ও লগআউট */}
                    <div className="pt-4 border-t border-slate-50 px-3 pb-4">
                        <SidebarLink
                            link={{
                                label: "Mayan Fayaz",
                                href: "/adminDashboard/account",
                                icon: (
                                    <div className="h-9 w-9 rounded-full bg-[#4177BC] flex items-center justify-center text-[11px] text-white font-bold ring-2 ring-offset-2 ring-[#4177BC]/20">MF</div>
                                ),
                            }}
                            className="hover:bg-slate-50 rounded-xl px-2 py-2"
                        />
                        <button className="w-full flex items-center gap-3 px-4 py-3 mt-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group">
                           <IconLogout size={18} className="group-hover:rotate-12 transition-transform" />
                           {open && <span className="text-sm font-bold">Logout</span>}
                        </button>
                    </div>
                </SidebarBody>
            </Sidebar>

            {/* মেইন কন্টেন্ট এরিয়া */}
            <div className="flex flex-1 overflow-y-auto bg-[#FAFAFB]">
                <div className="w-full h-full p-6 md:p-10">
                    {children}
                </div>
            </div>
        </div>
    );
}

export const Logo = () => (
    <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center px-4 py-8"
    >
        <Image 
            src="/logo/logo.png" 
            alt="Vault Logo" 
            width={140} 
            height={50} 
            priority
            className="object-contain filter drop-shadow-sm"
        />
    </motion.div>
);

export const LogoIcon = () => (
    <div className="flex items-center justify-center py-10">
        <div className="relative">
            <Image 
                src="/logo/logo2.png" 
                alt="Vault Icon" 
                width={36} 
                height={36} 
                className="rounded-xl shadow-md"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EB9C2C] rounded-full border-2 border-white" />
        </div>
    </div>  
);