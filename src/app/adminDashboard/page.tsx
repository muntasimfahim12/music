"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Briefcase, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  ExternalLink,
  Search,
  Bell,
  ChevronRight
} from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', icon: <DollarSign size={20}/>, trend: '+20.1%', positive: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Active Projects', value: '12', icon: <Briefcase size={20}/>, trend: '+3', positive: true, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Pending Invoices', value: '05', icon: <Clock size={20}/>, trend: '-2', positive: false, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Total Clients', value: '24', icon: <Users size={20}/>, trend: '+12%', positive: true, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 lg:p-10 bg-[#FAFAFB] min-h-screen">
      
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Welcome back, Fahim. Heres whats happening with your projects.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all w-64"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10 whitespace-nowrap">
            <Plus size={18} /> New Project
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {stats.map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 group cursor-default"
          >
            <div className="flex items-center justify-between mb-5">
              <div className={`p-3.5 ${item.bg} ${item.color} rounded-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                {item.icon}
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full ${item.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {item.trend}
                {item.positive ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">{item.title}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{item.value}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Content Area: Recent Invoices */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Invoices</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time Transaction Log</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300">
              View All History <ExternalLink size={14}/>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                  <th className="px-8 py-5 text-left">Client Entity</th>
                  <th className="px-8 py-5 text-left">Fulfillment</th>
                  <th className="px-8 py-5 text-left">Valuation</th>
                  <th className="px-8 py-5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "Rahat Chowdhury", email: "rahat@agency.com", amount: "$1,200.00", status: "Paid", date: "Oct 24, 2023", initial: "RC" },
                  { name: "Sarah Jenkins", email: "sarah@design.io", amount: "$850.00", status: "Pending", date: "Oct 23, 2023", initial: "SJ" },
                  { name: "Alen Walker", email: "walker@studio.com", amount: "$2,400.00", status: "Paid", date: "Oct 21, 2023", initial: "AW" },
                  { name: "Muntasir Fahim", email: "m.fahim@tech.bd", amount: "$500.00", status: "Processing", date: "Oct 20, 2023", initial: "MF" },
                ].map((invoice, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-all duration-300 cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[11px] font-black shadow-lg shadow-slate-900/10 group-hover:scale-110 transition-transform">
                          {invoice.initial}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-slate-800 truncate">{invoice.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium truncate">{invoice.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border ${
                        invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        invoice.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900">{invoice.amount}</td>
                    <td className="px-8 py-5 text-right text-[11px] text-slate-500 font-bold uppercase tracking-tighter">{invoice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Sidebar: Insights & Milestones */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          {/* Promo/Help Card */}
          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/20">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight">Business Intelligence</h3>
              <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">Your revenue increased by 20% this month. Ready to scale your agency further?</p>
              <button className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn">
                View Reports <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500 rounded-full blur-[80px] opacity-20"></div>
          </div>

          {/* Milestones Card */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Deadlines</h3>
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
            </div>
            <div className="space-y-7">
              {[
                { title: "UI Design Delivery", client: "Tech Solutions Ltd", color: "bg-orange-500", time: "In 2 days" },
                { title: "Backend Deployment", client: "E-commerce Site", color: "bg-blue-500", time: "Due Today" },
                { title: "Client Kickoff Meeting", client: "Metaverse Corp", color: "bg-purple-500", time: "Tomorrow" },
              ].map((milestone, i) => (
                <div key={i} className="flex gap-5 group cursor-pointer">
                  <div className={`mt-1 h-3 w-3 rounded-full ${milestone.color} shrink-0 shadow-lg group-hover:scale-125 transition-transform`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-slate-900 transition-colors">{milestone.title}</p>
                      <span className="text-[10px] font-black text-slate-400 uppercase">{milestone.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-2">{milestone.client}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
              Manage All Tasks
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOverview;