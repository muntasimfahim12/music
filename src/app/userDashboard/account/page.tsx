/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { 
  Lock, 
  Mail, 
  KeyRound, 
  X, 
  Eye, 
  EyeOff, 
  ChevronRight,
  ChevronDown
} from "lucide-react";

const AccountPage = () => {
  // Modal States
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen font-sans -mt-18 pb-20 relative text-slate-900">
      
      <div className="max-w-4xl mx-auto py-12 md:py-24 px-6 md:px-8 space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Account</h1>
            <p className="text-[14px] text-slate-500">View and edit your personal info below.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 text-[13px] font-semibold text-slate-400 hover:text-slate-900 transition-all cursor-pointer">
              Discard
            </button>
            <button className="flex-1 md:flex-none px-8 py-2.5 text-[13px] font-bold text-white bg-slate-900 rounded-lg hover:bg-black transition-all active:scale-95 cursor-pointer">
              Update Info
            </button>
          </div>
        </div>

        {/* --- Display Info Section --- */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-[18px] font-bold">Display info</h2>
            <p className="text-[13px] text-slate-400">This information will be visible to all members of this site.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-500 ml-1">Display name *</label>
              <input 
                type="text" 
                defaultValue="Mayan Fayaz" 
                className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 focus:border-slate-900 focus:bg-white outline-none rounded-xl text-[14px] font-medium transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-500 ml-1">Title</label>
              <input 
                type="text" 
                className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 focus:border-slate-900 focus:bg-white outline-none rounded-xl text-[14px] font-medium transition-all"
              />
            </div>
          </div>
        </section>

        {/* --- Personal Info Section --- */}
        <section className="space-y-8 pt-4">
          <div className="space-y-1">
            <h2 className="text-[18px] font-bold">Personal info</h2>
            <p className="text-[13px] text-slate-400">Update your personal information.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-500 ml-1">First name</label>
              <input 
                type="text" 
                defaultValue="Mayan" 
                className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 focus:border-slate-900 focus:bg-white outline-none rounded-xl text-[14px] font-medium transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-500 ml-1">Last name</label>
              <input 
                type="text" 
                defaultValue="Fayaz" 
                className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 focus:border-slate-900 focus:bg-white outline-none rounded-xl text-[14px] font-medium transition-all" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[12px] font-bold text-slate-500 ml-1">Phone</label>
              <input 
                type="tel" 
                className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 focus:border-slate-900 focus:bg-white outline-none rounded-xl text-[14px] font-medium transition-all" 
              />
            </div>
          </div>

          <div className="flex justify-start gap-4 pt-4 border-t border-slate-100">
            <button className="px-6 py-2.5 text-[13px] font-bold text-white bg-slate-900 rounded-lg hover:bg-black transition-all cursor-pointer">Update Info</button>
            <button className="px-6 py-2.5 text-[13px] font-semibold text-slate-400 hover:text-slate-900 transition-all cursor-pointer">Discard</button>
          </div>
        </section>

        {/* --- Login Info Section --- */}
        <section className="space-y-8 pt-4">
          <div className="space-y-1">
            <h2 className="text-[18px] font-bold">Login info</h2>
            <p className="text-[13px] text-slate-400">View and update your login email and password.</p>
          </div>

          <div className="divide-y divide-slate-100 border-t border-slate-100">
            {/* Email Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4">
              <div className="space-y-1">
                <p className="text-[12px] font-bold text-slate-500">Login email:</p>
                <p className="text-[15px] font-semibold text-slate-800">mayanfayaz0@gmail.com</p>
              </div>
              <button 
                onClick={() => setIsEmailModalOpen(true)}
                className="px-5 py-2 text-[13px] font-bold border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer text-center"
              >
                Change Email
              </button>
            </div>

            {/* Password Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4">
              <div className="space-y-1">
                <p className="text-[12px] font-bold text-slate-500">Password:</p>
                <p className="text-[15px] font-semibold text-slate-800 tracking-widest">● ● ● ● ● ●</p>
              </div>
              <button 
                onClick={() => setIsPasswordModalOpen(true)}
                className="px-5 py-2 text-[13px] font-bold border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer text-center"
              >
                Change Password
              </button>
            </div>
          </div>
        </section>

        {/* --- Visibility and Privacy Section --- */}
        <section className="space-y-8 pt-4">
          <div className="space-y-1">
            <h2 className="text-[18px] font-bold">Visibility and privacy</h2>
            <p className="text-[13px] text-slate-400">Update your personal information.</p>
          </div>

          <div className="space-y-3">
            {['Profile URL', 'Profile privacy', 'Blocked members'].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-xl hover:border-slate-300 transition-all cursor-pointer group">
                <span className="text-[14px] font-semibold text-slate-700">{item}</span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-all" />
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* --- MODALS (Glassy Effect) --- */}
      {(isPasswordModalOpen || isEmailModalOpen) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[420px] rounded-2xl border border-slate-200 shadow-2xl p-8 md:p-10 space-y-8 animate-in zoom-in-95 duration-300">
            
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{isPasswordModalOpen ? 'Change Password' : 'Change Email'}</h3>
              <button 
                onClick={() => { setIsPasswordModalOpen(false); setIsEmailModalOpen(false); }} 
                className="p-1 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              {isPasswordModalOpen ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-slate-500">Current Password</label>
                    <input type="password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-900 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-slate-500">New Password</label>
                    <input type="password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-900 transition-all" />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-500">New Email Address</label>
                  <input type="email" placeholder="name@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-900 transition-all" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full py-3.5 text-[14px] font-bold text-white bg-slate-900 rounded-xl hover:bg-black transition-all">
                Confirm Changes
              </button>
              <button 
                onClick={() => { setIsPasswordModalOpen(false); setIsEmailModalOpen(false); }}
                className="w-full py-2 text-[13px] font-semibold text-slate-400 hover:text-slate-900 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}; 

export default AccountPage;