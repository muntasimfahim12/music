/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { 
  Plus, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  ShieldCheck, 
  MoreHorizontal,
  Wallet,
  Download
} from "lucide-react";

const WalletPage = () => {
  const transactions = [
    { id: "TXN-7721", date: "Mar 25, 2026", amount: "$65.00", method: "Visa •••• 4242", status: "Paid" },
    { id: "TXN-7718", date: "Mar 10, 2026", amount: "$1,200.00", method: "Bank Transfer", status: "Paid" },
    { id: "TXN-7690", date: "Feb 28, 2026", amount: "$450.00", method: "PayPal", status: "Paid" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF] pb-20 font-sans">
      <div className="max-w-6xl mx-auto pt-16 px-6 space-y-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight inter-bold">
              My <span className="text-slate-400 font-medium inter-medium">Wallet</span>
            </h1>
            <p className="text-[14px] text-slate-500 font-medium inter-medium">
              Manage your payment methods and track total expenditure [cite: 2026-02-26].
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-[13px] font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200 inter-bold cursor-pointer">
            <Plus size={18} />
            Add Payment Method
          </button>
        </div>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Balance Card */}
          <div className="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden text-white shadow-2xl shadow-slate-200">
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
                  <Wallet size={24} />
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-[12px] font-bold uppercase tracking-widest inter-bold">Vault Security</p>
                  <div className="flex items-center gap-1.5 text-emerald-400 justify-end">
                    <ShieldCheck size={14} />
                    <span className="text-[12px] font-bold inter-bold">Active Protocol</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-[14px] font-medium inter-medium mb-1">Total Paid Amount [cite: 2026-02-26]</p>
                <h2 className="text-5xl font-bold tracking-tight inter-bold">$1,715.00</h2>
              </div>
            </div>
            {/* Background Decorative Element */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-white border border-slate-200/70 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                <CreditCard size={20} />
                <span className="text-[13px] font-bold uppercase tracking-widest inter-bold">Primary Card</span>
              </div>
              <div className="space-y-1">
                <p className="text-[14px] font-bold text-slate-400 inter-medium">•••• •••• •••• 4242</p>
                <p className="text-[18px] font-bold text-slate-900 inter-bold tracking-tight">Mayan Fayaz</p>
              </div>
            </div>
            <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl text-[12px] font-bold hover:bg-slate-100 transition-all inter-bold border border-slate-100">
              Manage Methods
            </button>
          </div>
        </div>

        {/* --- Transaction History --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-900">
                <History size={18} />
              </div>
              <h3 className="text-[18px] font-bold text-slate-900 inter-bold">Recent History [cite: 2026-02-26]</h3>
            </div>
            <button className="text-[13px] font-bold text-slate-400 hover:text-slate-900 transition-colors inter-bold">View All</button>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-[2.5rem] shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Transaction ID</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Date</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Method</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Amount</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6">
                      <span className="text-[14px] font-bold text-slate-900 inter-bold">{txn.id}</span>
                    </td>
                    <td className="px-8 py-6 text-[14px] text-slate-500 inter-medium">{txn.date}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <span className="text-[14px] font-bold text-slate-700 inter-semibold">{txn.method}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[15px] font-bold text-slate-900 inter-bold">{txn.amount}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl shadow-sm shadow-transparent hover:shadow-slate-200 transition-all cursor-pointer">
                        <Download size={18} />
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