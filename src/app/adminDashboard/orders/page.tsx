/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSearch, IconEye, IconDownload, IconDotsVertical, IconX,
  IconCheck, IconClock, IconCircleX, IconPackage, IconTruckDelivery,
  IconCreditCard, IconMapPin, IconCalendarEvent, IconChevronDown
} from "@tabler/icons-react";

// এন্টারপ্রাইজ লেভেল স্যাম্পল ডাটা
const ordersData = [
  {
    id: "#ORD-9901",
    customer: "Rakibul Hasan",
    email: "rakib@agency.com",
    date: "2024-04-05",
    time: "10:30 AM",
    amount: 15400.00,
    status: "Processing",
    paymentStatus: "Paid",
    method: "bKash",
    delivery: "Express Shipping",
    items: [
      { name: "Premium Wireless Headphone", qty: 1, price: 12000 },
      { name: "USB-C Fast Charger", qty: 2, price: 1700 }
    ]
  },
  {
    id: "#ORD-9902",
    customer: "Sumaiya Akter",
    email: "sumaiya.design@gmail.com",
    date: "2024-04-04",
    time: "02:15 PM",
    amount: 4500.00,
    status: "Pending",
    paymentStatus: "Unpaid",
    method: "Cash on Delivery",
    delivery: "Standard Delivery",
    items: [{ name: "Mechanical Keyboard", qty: 1, price: 4500 }]
  },
  {
    id: "#ORD-9903",
    customer: "Jubayer Ahmed",
    email: "jubayer@dev.io",
    date: "2024-04-03",
    time: "11:00 PM",
    amount: 8900.00,
    status: "Completed",
    paymentStatus: "Paid",
    method: "Mastercard",
    delivery: "Home Delivery",
    items: [{ name: "Smart Watch Series 7", qty: 1, price: 8900 }]
  }
];

export default function PremiumOrdersPage() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const tabs = ["All Orders", "Pending", "Processing", "Shipped", "Completed", "Cancelled"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Processing": return "bg-blue-50 text-[#4177BC] border-blue-100";
      case "Pending": return "bg-amber-50 text-amber-600 border-amber-100";
      case "Shipped": return "bg-purple-50 text-purple-600 border-purple-100";
      case "Cancelled": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-500";
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-20 px-4 sm:px-10 bg-[#FBFBFE] selection:bg-[#4177BC]/10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-14 pb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#4177BC] font-black text-[10px] uppercase tracking-[0.2em]">
            <span className="w-8 h-[2px] bg-[#4177BC]"></span>
            E-commerce Management
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Order <span className="text-slate-300 font-medium">Fulfillment</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-5 py-3 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">
            <IconDownload size={18} /> Export
          </button>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-[#4177BC] text-white px-7 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-slate-200">
            Bulk Actions <IconChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* --- ANALYTICS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Active Orders", val: "48", icon: <IconPackage />, color: "bg-blue-600" },
          { label: "On Delivery", val: "12", icon: <IconTruckDelivery />, color: "bg-purple-600" },
          { label: "Pending Payment", val: "৳45,200", icon: <IconCreditCard />, color: "bg-amber-500" },
          { label: "Today's Revenue", val: "৳1.2L", icon: <IconCalendarEvent />, color: "bg-emerald-600" },
        ].map((item, i) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={i} 
            className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm flex flex-col gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-lg shadow-inherit/20`}>
              {item.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{item.val}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- FILTER BAR --- */}
      <div className="flex flex-col xl:flex-row gap-6 items-center justify-between mb-8">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full xl:w-auto p-1 bg-slate-100/50 rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${activeTab === tab ? "bg-white text-[#4177BC] shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full xl:max-w-sm group">
          <IconSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4177BC] transition-colors" />
          <input
            type="text"
            placeholder="Search orders, customers, IDs..."
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[20px] outline-none focus:border-[#4177BC] shadow-sm text-sm font-bold text-slate-700 placeholder:text-slate-300 transition-all"
          />
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/40 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-50">
              <th className="pl-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="pr-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {ordersData.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                <td className="pl-10 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 tracking-tight">{order.id}</span>
                    <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{order.date} • {order.time}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                      {order.customer.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800">{order.customer}</span>
                      <span className="text-[10px] text-slate-400 lowercase">{order.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{order.method}</span>
                    <span className={`text-[9px] font-bold ${order.paymentStatus === 'Paid' ? 'text-emerald-500' : 'text-rose-500'}`}>{order.paymentStatus}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="text-sm font-black text-slate-900">৳{order.amount.toLocaleString()}</span>
                </td>
                <td className="px-6 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="pr-10 py-6 text-right">
                  <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <IconDotsVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- PREMIUM ORDER DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" />
            
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-3xl bg-white rounded-[48px] overflow-hidden shadow-2xl border border-slate-100"
            >
              <div className="flex h-full flex-col lg:flex-row">
                {/* Left Side: Order Summary */}
                <div className="lg:w-[40%] bg-slate-50 p-10 border-r border-slate-100">
                  <div className="p-4 bg-white rounded-3xl inline-block mb-6 shadow-sm">
                    <IconPackage size={32} className="text-[#4177BC]" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 leading-none mb-2">{selectedOrder.id}</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Order Metadata</p>

                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="text-[#4177BC]"><IconMapPin size={20} /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Delivery Method</p>
                        <p className="text-xs font-bold text-slate-700">{selectedOrder.delivery}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-[#4177BC]"><IconCreditCard size={20} /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Payment Info</p>
                        <p className="text-xs font-bold text-slate-700">{selectedOrder.method} - {selectedOrder.paymentStatus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-16 pt-8 border-t border-slate-200">
                    <p className="text-[10px] font-black text-slate-300 uppercase mb-4">Total Amount</p>
                    <h3 className="text-4xl font-black text-slate-900">৳{selectedOrder.amount.toLocaleString()}</h3>
                  </div>
                </div>

                {/* Right Side: Items & Progress */}
                <div className="flex-1 p-10 bg-white flex flex-col justify-between">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase">Items Ordered</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Details of products purchased</p>
                      </div>
                      <button onClick={() => setSelectedOrder(null)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100"><IconX size={20} /></button>
                   </div>

                   <div className="space-y-4 mb-10">
                      {selectedOrder.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
                          <div>
                            <p className="text-xs font-bold text-slate-800">{item.name}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">QTY: {item.qty} × ৳{item.price.toLocaleString()}</p>
                          </div>
                          <span className="text-xs font-black text-slate-900">৳{(item.qty * item.price).toLocaleString()}</span>
                        </div>
                      ))}
                   </div>

                   <div className="space-y-4">
                      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#4177BC] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                        <IconTruckDelivery size={18} /> Mark as Shipped
                      </button>
                      <button className="w-full py-4 bg-white border border-slate-100 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:text-rose-500 transition-all flex items-center justify-center gap-2">
                        <IconCircleX size={18} /> Cancel Order
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}