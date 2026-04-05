"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconUserPlus, IconUsers, IconShieldLock, IconSettings,
  IconTrash, IconX, IconSearch, IconLock, IconWorld, 
  IconBellRinging, IconChevronDown, IconFingerprint, IconActivity, IconKey
} from "@tabler/icons-react";

const initialUsers = [
  { id: 1, name: "Ariful Islam", email: "arif@agency.com", role: "Super Admin", status: "Active", lastSeen: "2 mins ago" },
  { id: 2, name: "Tanvir Ahmed", email: "tanvir@dev.io", role: "Admin", status: "Active", lastSeen: "1 hour ago" },
  { id: 3, name: "Sadiya Afrin", email: "sadiya@design.com", role: "Moderator", status: "Inactive", lastSeen: "2 days ago" },
];

export default function ProfessionalSettings() {
  const [activeTab, setActiveTab] = useState("User Management");
  const [users] = useState(initialUsers);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const tabs = [
    { id: "User Management", icon: <IconUsers size={18} /> },
    { id: "Security", icon: <IconShieldLock size={18} /> },
    { id: "System Config", icon: <IconSettings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-slate-900 selection:text-white">
      {/* Container - Reduced top padding to lift the content up */}
      <div className="max-w-[1280px] mx-auto pb-10 px-4 md:px-8">
        
        {/* --- COMPACT HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 md:pt-10 pb-8 border-b border-slate-100">
          <div className="space-y-0.5">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              Settings <span className="text-slate-400 font-normal">& Control</span>
            </h1>
            <p className="text-[12px] md:text-sm text-slate-500 font-medium">
              Manage your workspace members and security preferences.
            </p>
          </div>

          <button 
            onClick={() => setShowAddAdmin(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all active:scale-95 shadow-sm"
          >
            <IconUserPlus size={16} stroke={2.5} />
            Add New Admin
          </button>
        </header>

        {/* --- MAIN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 mt-6 md:mt-10">
          
          {/* --- SIDEBAR NAV (Highly Responsive) --- */}
          <div className="lg:col-span-3">
            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-bold transition-all whitespace-nowrap min-w-fit flex-1 lg:flex-none
                    ${activeTab === tab.id ? "bg-slate-900 text-white shadow-md shadow-slate-200" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  {tab.icon}
                  {tab.id}
                </button>
              ))}
            </nav>
          </div>

          {/* --- CONTENT AREA --- */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              
              {/* --- TAB: USER MANAGEMENT --- */}
              {activeTab === "User Management" && (
                <motion.div 
                  key="user-mgt"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="px-5 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/20">
                    <h3 className="font-bold text-slate-900 text-[11px] uppercase tracking-widest">Team Members</h3>
                    <div className="relative w-full sm:w-60">
                      <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search admins..." 
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-slate-400 transition-all" 
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white border-b border-slate-50">
                          <th className="px-5 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin</th>
                          <th className="px-5 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Role</th>
                          <th className="px-5 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                          <th className="px-5 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {users.map((user) => (
                          <tr key={user.id} className="group hover:bg-slate-50/40 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="hidden xs:flex w-9 h-9 rounded-lg bg-slate-100 text-slate-500 items-center justify-center font-bold text-xs border border-slate-200">{user.name.charAt(0)}</div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-[13px] font-bold text-slate-800 truncate">{user.name}</span>
                                  <span className="text-[10px] text-slate-400 truncate">{user.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4 hidden sm:table-cell">
                              <span className="text-[11px] font-medium text-slate-600">{user.role}</span>
                            </td>
                            <td className="px-5 py-4">
                                <span className={`inline-flex px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                  {user.status}
                                </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"><IconTrash size={16} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* --- TAB: SECURITY --- */}
              {activeTab === "Security" && (
                <motion.div 
                  key="security"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 md:p-8 border border-slate-200 rounded-2xl shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 bg-slate-100 text-slate-900 rounded-xl border border-slate-200"><IconLock size={18} /></div>
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight">Security Credentials</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all placeholder:text-slate-300" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 tracking-wider">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all placeholder:text-slate-300" />
                    </div>
                  </div>
                  <button className="mt-8 w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm">
                    <IconKey size={14} /> Update Credentials
                  </button>
                </motion.div>
              )}

              {/* --- TAB: SYSTEM CONFIG --- */}
              {activeTab === "System Config" && (
                <motion.div 
                  key="sys-config"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {[
                    { title: "Public Access", desc: "Enable frontend visibility", status: true, icon: <IconWorld size={18} /> },
                    { title: "Notifications", desc: "Real-time admin alerts", status: true, icon: <IconBellRinging size={18} /> },
                    { title: "Server Monitoring", desc: "Automated health checks", status: false, icon: <IconActivity size={18} /> },
                    { title: "Logs", desc: "Save system actions", status: true, icon: <IconFingerprint size={18} /> },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-5 border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div className="flex gap-3 items-center min-w-0">
                        <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">{item.icon}</div>
                        <div className="min-w-0">
                          <h4 className="text-[12px] font-bold text-slate-800 truncate">{item.title}</h4>
                          <p className="text-[10px] text-slate-400 truncate font-medium">{item.desc}</p>
                        </div>
                      </div>
                      <div className={`w-9 h-5 rounded-full relative cursor-pointer flex-shrink-0 transition-all ${item.status ? 'bg-slate-900' : 'bg-slate-200'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${item.status ? 'right-1' : 'left-1'}`}></div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* --- ADD ADMIN MODAL (FULLY RESPONSIVE) --- */}
      <AnimatePresence>
        {showAddAdmin && (
          <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Overlay */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddAdmin(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border-t sm:border border-slate-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-50 bg-slate-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center"><IconUserPlus size={20} /></div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">New Administrator</h2>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Workspace invitation</p>
                  </div>
                </div>
                <button onClick={() => setShowAddAdmin(false)} className="p-2 text-slate-400 hover:text-slate-600 transition-all"><IconX size={20} /></button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[13px] text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium" placeholder="Member Name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[13px] text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium" placeholder="email@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">Security Role</label>
                    <select className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[13px] text-slate-900 outline-none focus:border-slate-900 focus:bg-white appearance-none cursor-pointer font-medium">
                       <option>Full Administrator</option>
                       <option>Moderator</option>
                       <option>Support</option>
                    </select>
                    <IconChevronDown size={14} className="absolute right-4 top-10 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">Temp Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[13px] text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium" />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                   <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                     <span className="text-slate-900 font-bold">Security Note:</span> An invitation email will be sent automatically. The user must complete the verification within 24 hours.
                   </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 md:p-8 bg-slate-50/20 border-t border-slate-50 flex flex-col sm:flex-row gap-3 mt-4">
                 <button onClick={() => setShowAddAdmin(false)} className="order-2 sm:order-1 flex-1 py-3.5 text-slate-500 rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-slate-100">Cancel</button>
                 <button className="order-1 sm:order-2 flex-2 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-800 shadow-lg shadow-slate-200 px-10">Confirm Registration</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}