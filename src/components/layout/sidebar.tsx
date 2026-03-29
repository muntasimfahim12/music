"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Wallet, 
  User, 
  Settings, 
  Bell, 
  MapPin, 
  LogOut, 
  ShieldCheck 
} from "lucide-react";

export const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Account", href: "/dashboard/account", icon: ShieldCheck },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
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
  );
}