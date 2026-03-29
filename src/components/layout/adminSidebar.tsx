/* eslint-disable @typescript-eslint/no-unused-vars */
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

export function AdminSidebar({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const links = [
        {
            label: "Dashboard",
            href: "/adminDashboard",
            icon: <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        },
        {
            label: "Products",
            href: "/adminDashboard/products",
            icon: <IconShoppingBag className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
            addHref: "/adminDashboard/products/addProducts",
        },
        {
            label: "Music Store",
            href: "/adminDashboard/music",
            icon: <IconMusic className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
            addHref: "/adminDashboard/music/new",
        },
        {
            label: "Videos",
            href: "/adminDashboard/videos",
            icon: <IconVideo className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
            addHref: "/adminDashboard/videos/new",
        },
        {
            label: "Orders",
            href: "/adminDashboard/orders",
            icon: <IconClipboardList className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        },
        {
            label: "Global Settings",
            href: "/adminDashboard/settings",
            icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        },
        {
            label: "Logout",
            href: "#",
            icon: <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        },
    ];

    return (
        <div className={cn(
            "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
            "h-screen"
        )}>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-1">
                            {links.map((link, idx) => (
                                <div 
                                    key={idx}
                                    onMouseEnter={() => setHoveredLink(link.label)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    className="relative flex flex-col"
                                >
                                    <SidebarLink link={link} className="inter-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg px-2 transition-colors duration-200" />
                                    
                                    {/* Sub-menu (Add Button) Logic */}
                                    <AnimatePresence>
                                        {link.addHref && hoveredLink === link.label && open && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="ml-8 mt-1"
                                            >
                                                <SidebarLink 
                                                    link={{
                                                        label: `Add ${link.label.split(' ')[0]}`,
                                                        href: link.addHref,
                                                        icon: <IconPlus size={14} className="text-emerald-500" />
                                                    }} 
                                                    className="text-[12px] opacity-80 hover:opacity-100 hover:text-emerald-500 transition-all inter-medium"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Mayan Fayaz",
                                href: "#",
                                icon: (
                                    <div className="h-7 w-7 rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold border border-slate-700">MF</div>
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>

            <div className="flex flex-1 overflow-y-auto bg-white dark:bg-neutral-900 shadow-inner">
                {children}
            </div>
        </div>
    );
}

export const Logo = () => (
    <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white group">
        <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white group-hover:rotate-12 transition-transform" />
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black whitespace-pre tracking-widest inter-bold text-slate-900 dark:text-white">
            VAULT <span className="text-slate-400">ADMIN</span>
        </motion.span>
    </a>
);

export const LogoIcon = () => (
    <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white">
        <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
);