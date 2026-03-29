"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Wallet, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  ArrowUpRight, 
  Download,
  History
} from "lucide-react";

const stats = [
  { name: "Total Paid", value: "$4,250", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Unpaid Milestones", value: "02", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "Wallet Balance", value: "$150.00", icon: Wallet, color: "text-rose-500", bg: "bg-rose-500/10" },
  { name: "Total Orders", value: "08", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-500/10" },
];

const recentInvoices = [
  { id: "INV-8821", date: "Mar 20, 2026", amount: "$1,200", status: "Paid", project: "Architectural Visuals" },
  { id: "INV-8819", date: "Mar 15, 2026", amount: "$850", status: "Pending", project: "Interior Concept" },
];

export default function DashboardHome() {
  return (
    <div className="space-y-10 pb-10">
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            Command <span className="text-[#FF2D2D]">Center</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">
            Managing your identity & financial milestones
          </p>
        </motion.div>

        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all">
          <History size={14} className="text-red-500" />
          View History
        </button>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#0A0A0A] border border-white/5 p-6 rounded-3xl hover:border-red-500/30 transition-all cursor-default"
          >
            <div className="flex items-center justify-between mb-5">
               <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={22} />
               </div>
               <ArrowUpRight size={18} className="text-gray-700 group-hover:text-red-500 transition-colors" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-1">{stat.value}</h3>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{stat.name}</p>
            
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/[0.02] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* 3. RECENT INVOICES & PROJECT STATUS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Invoice Table */}
        <div className="xl:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-black tracking-tight uppercase italic">Recent Invoices</h2>
            <button className="text-[10px] font-black text-red-500 hover:text-white transition-colors uppercase tracking-widest">
              Explore All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                  <th className="px-4 py-2">Invoice ID</th>
                  <th className="px-4 py-2">Project</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentInvoices.map((inv) => (
                  <tr key={inv.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-4 font-bold text-gray-400">{inv.id}</td>
                    <td className="px-4 py-4 font-black text-white">{inv.project}</td>
                    <td className="px-4 py-4 font-bold">{inv.amount}</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="p-2 hover:text-red-500 transition-colors" title="Download PDF">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support/Announcement Card */}
        <div className="bg-gradient-to-b from-[#1A1A1A] to-black border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between">
           <div>
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                 <ShieldCheck size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-3 italic uppercase">Secure Identity</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">
                Your DEEBZLENÜZ identity is protected. Access exclusive architectural vault files and music content securely.
              </p>
           </div>
           
           <button className="mt-8 w-full bg-white text-black hover:bg-red-500 hover:text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">
             Update Profile
           </button>
        </div>
      </div>
    </div>
  );
}

// Lucide icon helper
function ShieldCheck({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}