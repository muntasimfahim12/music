/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { 
  Plus, 
  CreditCard, 
  ArrowUpRight, 
  History, 
  ShieldCheck, 
  Wallet,
  Download,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const WalletPage = () => {
  const transactions = [
    { id: "TXN-7721", date: "Mar 25, 2026", amount: "$65.00", method: "Visa •••• 4242", status: "Paid" },
    { id: "TXN-7718", date: "Mar 10, 2026", amount: "$1,200.00", method: "Bank Transfer", status: "Paid" },
    { id: "TXN-7690", date: "Feb 28, 2026", amount: "$450.00", method: "PayPal", status: "Paid" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans pb-20 px-4 -mt-16 md:px-6">
      <div className="max-w-6xl mx-auto pt-16 space-y-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              My <span className="text-gray-400 font-light ">Wallet</span>
            </h1>
            <p className="text-[11px] inter-bold uppercase tracking-[0.2em] text-gray-400 mt-2">
              Financial overview & payment security
            </p>
          </div>
          
          <button className="group flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg text-[12px] inter-bold uppercase tracking-wider hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10 cursor-pointer">
            <Plus size={16} />
            Add Method
          </button>
        </div>

        {/* --- Stats & Card Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Balance - Glassy Black Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-black rounded-2xl p-8 md:p-10 relative overflow-hidden text-white shadow-2xl shadow-black/5"
          >
            <div className="relative z-10 flex flex-col h-full justify-between gap-16">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10">
                  <Wallet size={22} />
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <ShieldCheck size={12} className="text-emerald-400" />
                    <span className="text-[10px] inter-bold uppercase tracking-widest text-emerald-400">Secure Protocol</span>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-white/40 text-[11px] inter-bold uppercase tracking-[0.2em] mb-2">Total Expenditure</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl md:text-6xl inter-bold tracking-tighter">$1,715.00</h2>
                  <span className="text-emerald-400 text-sm inter-medium">USD</span>
                </div>
              </div>
            </div>
            {/* Minimalist Pattern */}
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </motion.div>

          {/* Quick Info Card - Glassy White */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-[10px] inter-bold text-gray-400 uppercase tracking-widest">Primary Method</p>
                <CreditCard size={18} className="text-black" />
              </div>
              <div className="space-y-2 pt-4">
                <p className="text-[14px] inter-medium text-gray-400 tracking-[0.3em]">•••• •••• 4242</p>
                <p className="text-xl inter-bold text-black tracking-tight">Fahim Muntasim</p>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-gray-50 text-black border border-gray-100 rounded-lg text-[11px] inter-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer">
              Manage Methods
            </button>
          </motion.div>
        </div>

        {/* --- Transaction History --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-black rounded-lg text-white">
                <History size={18} />
              </div>
              <h3 className="text-xl inter-bold text-black tracking-tight">Recent History</h3>
            </div>
            <button className="group flex items-center gap-1 text-[11px] inter-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors cursor-pointer">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Table - Optimized for Desktop & Mobile */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-[10px] inter-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
                  <th className="px-8 py-4 text-[10px] inter-bold text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-[10px] inter-bold text-gray-400 uppercase tracking-widest">Method</th>
                  <th className="px-8 py-4 text-[10px] inter-bold text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-[10px] inter-bold text-gray-400 uppercase tracking-widest text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="group hover:bg-gray-50/50 transition-all">
                    <td className="px-8 py-5">
                      <span className="text-[13px] inter-bold text-black">#{txn.id}</span>
                    </td>
                    <td className="px-8 py-5 text-[13px] text-gray-500 inter-medium">{txn.date}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                        <span className="text-[13px] inter-medium text-gray-700">{txn.method}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[14px] inter-bold text-black">{txn.amount}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg border border-transparent hover:border-gray-100 shadow-sm transition-all cursor-pointer">
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WalletPage;