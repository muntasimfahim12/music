/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  ChevronRight,
  Search,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const OrdersPage = () => {
  const orders = [
    {
      id: "DV-99201",
      date: "15 Mar 2026",
      status: "Processing",
      total: "$65.00",
      items: [
        {
          name: "Void Hoodie",
          color: "Midnight Black",
          size: "L",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=300&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "DV-98442",
      date: "28 Feb 2026",
      status: "Delivered",
      total: "$43.00",
      items: [
        {
          name: "Logo Dad Hat & Bundle",
          color: "Black",
          size: "OS",
          image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=300&auto=format&fit=crop"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFFF] pb-20 font-sans -mt-16 px-4 md:px-6">
      {/* --- Simple & Modern Header --- */}
      <div className="max-w-5xl mx-auto pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Order <span className="text-gray-400 font-light ">History</span>
            </h1>
            <p className="text-[11px] inter-bold uppercase tracking-[0.2em] text-gray-400 mt-2">
              Managing {orders.length} recent purchases
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Modern Glassmorphic Search Bar */}
            <div className="relative flex-1 md:w-72 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors duration-300"
                size={15}
              />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-11 pr-4 py-2.5 
             text-black inter-medium text-[13px]
             bg-white/40 backdrop-blur-md 
             border border-gray-200/50 
             rounded-lg outline-none 
             focus:bg-white focus:border-black/20 focus:ring-4 focus:ring-black/5
             transition-all duration-300 
             placeholder:text-gray-400 placeholder:text-[12px]"
              />
            </div>

            {/* Sharp Professional Filter Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 
                     bg-white/40 backdrop-blur-md 
                     border border-gray-200/50 
                     rounded-lg text-gray-600 
                     hover:bg-black hover:text-white hover:border-black
                     transition-all duration-300 
                     shadow-sm active:scale-95 cursor-pointer">
              <Filter size={16} />
              <span className="text-[12px] inter-bold uppercase tracking-wider hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- Orders List --- */}
      <div className="max-w-5xl mx-auto space-y-4">
        {orders.map((order, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={order.id}
            className="bg-white border border-gray-100 rounded-[24px] md:rounded-[32px] overflow-hidden hover:shadow-xl hover:shadow-black/[0.02] transition-all duration-500"
          >
            {/* Top Info Bar */}
            <div className="px-6 py-4 md:px-8 bg-gray-50/50 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-6 md:gap-10">
                <div className="hidden sm:block">
                  <p className="text-[9px] inter-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                  <p className="text-[13px] inter-bold text-black">#{order.id}</p>
                </div>
                <div>
                  <p className="text-[9px] inter-bold text-gray-400 uppercase tracking-widest">Date</p>
                  <p className="text-[13px] inter-medium text-black">{order.date}</p>
                </div>
                <div>
                  <p className="text-[9px] inter-bold text-gray-400 uppercase tracking-widest">Total</p>
                  <p className="text-[13px] inter-bold text-black">{order.total}</p>
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8">
              {order.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex flex-col md:flex-row gap-6 items-center">
                  {/* Thumbnail */}
                  <div className="w-full md:w-28 h-48 md:h-28 rounded-2xl overflow-hidden bg-gray-100 border border-gray-50 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-[18px] inter-bold text-black mb-1">{item.name}</h3>
                    <div className="flex justify-center md:justify-start items-center gap-3 text-[11px] inter-medium text-gray-400  tracking-tighter">
                      <span className="flex items-center gap-1.5">Color: <b className="text-black">{item.color}</b></span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full" />
                      <span>Size: <b className="text-black">{item.size}</b></span>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">

                    {/* Track Button - Premium Black Glassy Style */}
                    <button className="flex-1 md:w-40 py-2.5 
                     bg-black text-white 
                     rounded-lg text-[11px] inter-bold  tracking-wider 
                     hover:bg-gray-800 hover:shadow-lg hover:shadow-black/10 
                     transition-all duration-300 active:scale-95 
                     flex items-center justify-center gap-2 
                     cursor-pointer">
                      Track <ArrowUpRight size={14} />
                    </button>

                    {/* Details Button - Minimalist Glassy Style (Like Filter Button) */}
                    <button className="flex-1 md:w-40 py-2.5 
                     bg-white/40 backdrop-blur-md 
                     border border-gray-200/50 
                     text-black rounded-lg 
                     text-[11px] inter-bold  tracking-wider 
                     hover:bg-black hover:text-white hover:border-black 
                     transition-all duration-300 active:scale-95 
                     flex items-center justify-center gap-2 
                     cursor-pointer shadow-sm">
                      Details <ChevronRight size={14} />
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const isProcessing = status === "Processing";
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] inter-bold uppercase tracking-[0.15em] border ${isProcessing ? "bg-amber-50/50 text-amber-600 border-amber-100" : "bg-black text-white border-black"
      }`}>
      {isProcessing ? <Clock size={10} /> : <CheckCircle2 size={10} />}
      {status}
    </div>
  );
};

export default OrdersPage;