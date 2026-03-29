/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

const OrdersPage = () => {
  const orders = [
    {
      id: "#DV-99201",
      date: "March 15, 2026",
      status: "Processing",
      total: "$65.00",
      items: [
        {
          name: "Void Hoodie",
          color: "Midnight Black",
          size: "L",
          price: "$65.00",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=300&auto=format&fit=crop" 
        }
      ]
    },
    {
      id: "#DV-98442",
      date: "February 28, 2026",
      status: "Delivered",
      total: "$43.00",
      items: [
        {
          name: "Logo Dad Hat & Tote Bundle",
          color: "Black",
          size: "OS",
          price: "$43.00",
          image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=300&auto=format&fit=crop"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF] pb-20">
      {/* --- Page Header --- */}
      <div className="max-w-6xl mx-auto pt-16 pb-10 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight inter-bold">
              My <span className="text-slate-400 font-medium inter-medium">Orders</span>
            </h1>
            <p className="text-[14px] text-slate-500 font-medium inter-medium">
              Track, manage and review your recent purchases and vault history.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] outline-none focus:border-slate-900 transition-all inter-medium"
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-600 cursor-pointer">
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Orders List --- */}
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        {orders.map((order, idx) => (
          <div 
            key={idx} 
            className="group bg-white border border-slate-200/70 rounded-[2.5rem] shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-300"
          >
            {/* Order Header */}
            <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-8">
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Order Number</p>
                  <p className="text-[15px] font-bold text-slate-900 inter-bold">{order.id}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Date Placed</p>
                  <p className="text-[15px] font-bold text-slate-700 inter-medium">{order.date}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Total Amount</p>
                  <p className="text-[15px] font-bold text-slate-900 inter-bold">{order.total}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <StatusBadge status={order.status} />
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all cursor-pointer inter-bold">
                  View Details
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Order Content */}
            <div className="p-8">
              {order.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Product Image - Inspired by Void Hoodie Thumbnail */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-1 text-center md:text-left">
                    <h3 className="text-[18px] md:text-[20px] font-bold text-slate-900 inter-bold tracking-tight">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[13px] text-slate-500 font-medium inter-medium">
                      <span className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-200" />
                        Color: {item.color}
                      </span>
                      <span>Size: {item.size}</span>
                      <span>Qty: 1</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <button className="w-full md:w-48 py-3 bg-slate-900 text-white rounded-2xl text-[13px] font-bold hover:bg-slate-800 transition-all inter-bold active:scale-95 shadow-lg shadow-slate-100 cursor-pointer">
                      Track Shipment
                    </button>
                    <button className="w-full md:w-48 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[13px] font-bold hover:bg-slate-50 transition-all inter-bold cursor-pointer">
                      Buy it again
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer Info */}
            <div className="px-8 py-4 bg-slate-50/30 border-t border-slate-50 flex items-center gap-2 text-[12px] text-slate-400 font-medium inter-medium">
              <Clock size={14} />
              <span>Standard delivery estimates: Arriving by {order.status === "Processing" ? "March 22" : "Completed"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Status Badge Component ---
const StatusBadge = ({ status }: { status: string }) => {
  const isProcessing = status === "Processing";
  
  return (
    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider inter-bold ${
      isProcessing 
      ? "bg-amber-50 text-amber-600 border border-amber-100" 
      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
    }`}>
      {isProcessing ? <Clock size={12} /> : <CheckCircle2 size={12} />}
      {status}
    </div>
  );
};

export default OrdersPage;