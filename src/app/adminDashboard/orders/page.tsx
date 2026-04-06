/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSearch, IconDownload, IconDotsVertical, IconX,
  IconPackage, IconTruckDelivery, IconCreditCard,
  IconCalendarEvent, IconMapPin, IconCheck,
  IconPrinter, IconMail, IconTrash, IconCircleDot
} from "@tabler/icons-react";
import { toast, Toaster } from "react-hot-toast";

const initialOrders = [
  {
    id: "#ORD-9901",
    customer: "Rakibul Hasan",
    email: "rakib@agency.com",
    date: "Apr 05, 2026",
    amount: 1540.00,
    status: "Processing",
    paymentStatus: "Paid",
    method: "Stripe",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    items: [
      { name: "Premium Wireless Headphone", qty: 1, price: 1200 },
      { name: "USB-C Fast Charger", qty: 2, price: 170 }
    ]
  },
  {
    id: "#ORD-9902",
    customer: "Sumaiya Akter",
    email: "sumaiya.design@gmail.com",
    date: "Apr 04, 2026",
    amount: 450.00,
    status: "Pending",
    paymentStatus: "Unpaid",
    method: "PayPal",
    address: "Banani, Block C, Dhaka",
    items: [{ name: "Mechanical Keyboard", qty: 1, price: 450 }]
  },
  {
    id: "#ORD-9903",
    customer: "Jubayer Ahmed",
    email: "jubayer@dev.io",
    date: "Apr 03, 2026",
    amount: 890.00,
    status: "Completed",
    paymentStatus: "Paid",
    method: "Mastercard",
    address: "Uttara Sector 4, Dhaka",
    items: [{ name: "Smart Watch Series 7", qty: 1, price: 890 }]
  }
];

export default function OrderManagementPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All Orders", "Pending", "Processing", "Shipped", "Completed"];

  // --- ANALYTICS CALCULATIONS ---
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === "Pending").length,
      processing: orders.filter(o => o.status === "Processing").length,
      completed: orders.filter(o => o.status === "Completed").length,
      revenue: orders.reduce((acc, curr) => acc + curr.amount, 0)
    };
  }, [orders]);

  // --- ORDER HANDLING LOGIC ---
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder) setSelectedOrder({ ...selectedOrder, status: newStatus });
    toast.success(`Moved to ${newStatus}`, {
      style: { borderRadius: '12px', background: '#0F172A', color: '#fff', fontSize: '12px' }
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === "All Orders" || order.status === activeTab;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Processing": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Shipped": return "bg-purple-50 text-purple-600 border-purple-100";
      case "Pending": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-20 px-4 md:px-10 bg-[#FDFDFD] min-h-screen">
      <Toaster position="top-center" />

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 pb-8 border-b border-slate-100">
        <div className="space-y-1">

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Orders <span className="text-slate-300 font-normal"></span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-slate-50 transition-all">
            <IconDownload size={16} /> Export
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-sm active:scale-95 transition-all">
            New Order
          </button>
        </div>
      </div>

      {/* ANALYTICS CARDS (Responsive Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8 mb-10">
        {[
          { label: "Total Orders", val: stats.total, icon: <IconPackage size={20} />, color: "text-blue-600 bg-blue-50" },
          { label: "Pending", val: stats.pending, icon: <IconCircleDot size={20} />, color: "text-amber-600 bg-amber-50" },
          { label: "In Process", val: stats.processing, icon: <IconTruckDelivery size={20} />, color: "text-purple-600 bg-purple-50" },
          { label: "Completed", val: stats.completed, icon: <IconCheck size={20} />, color: "text-emerald-600 bg-emerald-50" },
        ].map((item, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white p-4 md:p-5 rounded-2xl border border-slate-100 flex items-center gap-3 md:gap-4 shadow-sm">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
              {item.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{item.label}</p>
              <h3 className="text-base md:text-xl font-bold text-slate-900">{item.val}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FILTER & SEARCH (Sticky on Mobile if needed) */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto p-1 bg-slate-100/60 rounded-xl border border-slate-200/50">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap
                ${activeTab === tab ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-slate-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs group">
          <IconSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer, ID..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-slate-900 text-[11px] font-medium transition-all shadow-sm"
          />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="pl-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Order Details</th>
                <th className="px-4 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Customer Info</th>
                <th className="px-4 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Method</th>
                <th className="px-4 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Status</th>
                <th className="px-4 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Amount</th>
                <th className="pr-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/40 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="pl-6 py-5">
                    <span className="text-[12px] font-bold text-slate-900 block">{order.id}</span>
                    <span className="text-[9px] text-slate-400 font-medium uppercase">{order.date}</span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                        {order.customer.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-slate-800 block truncate">{order.customer}</span>
                        <span className="text-[9px] text-slate-400 lowercase truncate block">{order.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="text-[10px] font-bold text-slate-700 block">{order.method}</span>
                    <span className={`text-[8px] font-black uppercase ${order.paymentStatus === 'Paid' ? 'text-emerald-500' : 'text-rose-500'}`}>{order.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[8px] font-bold uppercase border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 font-bold text-slate-900 text-[12px]">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="pr-6 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                      <IconDotsVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="py-24 text-center">
            <IconPackage size={40} className="mx-auto text-slate-200 mb-3" />
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">No results for &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>

      {/* ORDER DETAILS DRAWER */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[120] flex items-center justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-[4px]" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-slate-900">{selectedOrder.id}</h2>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Order Processing Portal</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"><IconX size={20} /></button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-32">

                {/* Workflow Actions */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update Lifecycle</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => updateOrderStatus(selectedOrder.id, "Shipped")} className="flex items-center justify-center gap-2 p-3.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md">
                      <IconTruckDelivery size={16} /> Ship Now
                    </button>
                    <button onClick={() => updateOrderStatus(selectedOrder.id, "Completed")} className="flex items-center justify-center gap-2 p-3.5 bg-emerald-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md">
                      <IconCheck size={16} /> Mark Done
                    </button>
                  </div>
                </div>

                {/* Items Information */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cart Summary ({selectedOrder.items.length})</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl bg-slate-50/30">
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-slate-800 truncate">{item.name}</p>
                          <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-tighter">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                        </div>
                        <span className="text-[12px] font-black text-slate-900 shrink-0 ml-4">${(item.qty * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics Section */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/50 space-y-5">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-slate-400"><IconMapPin size={18} /></div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Shipping Address</p>
                      <p className="text-[11px] text-slate-700 font-semibold leading-relaxed mt-1">{selectedOrder.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-slate-400"><IconMail size={18} /></div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Contact Client</p>
                      <p className="text-[11px] text-slate-700 font-semibold mt-1">{selectedOrder.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Drawer Footer */}
              <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Valuation</span>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">${selectedOrder.amount.toFixed(2)}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${selectedOrder.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {selectedOrder.paymentStatus}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-[2] py-3.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all">Download Invoice</button>
                  <button className="flex-1 py-3.5 border border-slate-200 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all flex items-center justify-center"><IconTrash size={18} /></button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}