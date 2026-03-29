"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  Lock, 
  Camera, 
  Info,
  Mail,
  KeyRound,
  X,
  Eye,
  EyeOff,
  ChevronRight
} from "lucide-react";

const AccountPage = () => {
  // Modal States
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="w-full bg-[#FFFFF] min-h-screen font-sans pb-16 relative">
      
      <div className="max-w-5xl mx-auto py-8 md:py-16 px-4 md:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Account <span className="text-slate-400 font-medium">Settings</span>
            </h1>
            <p className="text-[14px] text-slate-500 font-medium">
              Manage your profile identity and security preferences.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 text-[13px] font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 cursor-pointer">
              Discard
            </button>
            <button className="flex-1 md:flex-none px-6 py-2.5 text-[13px] font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 cursor-pointer">
              Update Info
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden">
          
          <div className="p-6 md:p-14 space-y-12 md:space-y-20">
            
            {/* --- Display Info Section --- */}
            <section className="space-y-8">
              <div className="space-y-1 border-b border-slate-100 pb-6">
                <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Display info</h2>
                <p className="text-[13px] text-slate-400">This information will be visible to all workspace members.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-10 lg:gap-24">
                <div className="flex-1 space-y-8 order-2 md:order-1">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-semibold text-slate-500 ml-1">Display name *</label>
                    <input 
                      type="text" 
                      defaultValue="Mayan Fayaz" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 focus:border-slate-900 focus:bg-white outline-none rounded-2xl text-[14px] font-bold text-slate-800 transition-all shadow-sm shadow-transparent focus:shadow-slate-100"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-semibold text-slate-500 ml-1">Title</label>
                    <input 
                      type="text" 
                      placeholder=""
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 focus:border-slate-900 focus:bg-white outline-none rounded-2xl text-[14px] font-bold text-slate-800 transition-all"
                    />
                  </div>
                </div>

                <div className="md:w-1/3 flex flex-col items-center md:items-start space-y-5 order-1 md:order-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-slate-500">Profile image</span>
                    <Info size={14} className="text-slate-300" />
                  </div>
                  <div className="relative group cursor-pointer">
                    {/* Shadow removed as requested for professional look */}
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-[36px] font-bold text-slate-300 italic overflow-hidden transition-all duration-300 group-hover:bg-slate-100">
                      M
                    </div>
                    <button className="absolute bottom-1 right-1 p-3 bg-slate-900 text-white rounded-full border-4 border-white shadow-md hover:scale-110 active:scale-90 transition-all cursor-pointer">
                      <Camera size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Personal Info Section --- */}
            <section className="space-y-8">
              <div className="space-y-1 border-b border-slate-100 pb-6">
                <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Personal info</h2>
                <p className="text-[13px] text-slate-400">Restricted data used only for internal verification.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {['First name', 'Last name', 'Phone'].map((label, idx) => (
                  <div key={idx} className={idx === 2 ? "md:col-span-1" : ""}>
                    <div className="space-y-2.5">
                      <label className="text-[13px] font-semibold text-slate-500 ml-1">{label}</label>
                      <div className="relative group">
                        <input 
                          type={idx === 2 ? "tel" : "text"} 
                          defaultValue={idx === 0 ? "Mayan" : idx === 1 ? "Fayaz" : ""} 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 focus:border-slate-900 focus:bg-white outline-none rounded-2xl text-[14px] font-bold text-slate-800 pr-14 transition-all" 
                        />
                        <Lock size={15} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                <button className="order-2 sm:order-1 px-6 py-3 text-[13px] font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer">
                  Discard changes
                </button>
                <button className="order-1 sm:order-2 px-8 py-3 text-[13px] font-bold text-slate-900 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer shadow-sm">
                  Save Personal Info
                </button>
              </div>
            </section>

            {/* --- Login Security Section --- */}
            <section className="space-y-8 pb-4">
              <div className="space-y-1 border-b border-slate-100 pb-6">
                <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Login security</h2>
                <p className="text-[13px] text-slate-400">Authentication details for your vault access.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                {/* Email Box */}
                <div onClick={() => setIsEmailModalOpen(true)} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <Mail size={22} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[12px] font-bold text-slate-400">Login email</p>
                      <p className="text-[15px] font-bold text-slate-800">mayanfayaz0@gmail.com</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Password Box */}
                <div onClick={() => setIsPasswordModalOpen(true)} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <KeyRound size={22} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[12px] font-bold text-slate-400">Password Protocol</p>
                      <p className="text-[15px] font-bold text-slate-800 tracking-widest">••••••••</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </section>

            {/* --- Visibility Section --- */}
            <section className="space-y-8">
              <div className="space-y-1 border-b border-slate-100 pb-6">
                <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Visibility & privacy</h2>
                <p className="text-[13px] text-slate-400">Control how your data is accessed across the platform.</p>
              </div>

              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {['Profile URL', 'Profile privacy', 'Blocked members'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-6 group cursor-pointer hover:px-2 transition-all">
                    <span className="text-[15px] font-bold text-slate-700 group-hover:text-slate-900">{item}</span>
                    <div className="flex items-center gap-4">
                       <span className="text-[12px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Configure</span>
                       <ChevronDown size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* --- CHANGE PASSWORD MODAL --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[440px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 md:p-12 space-y-10">
               <div className="flex justify-between items-start">
                 <div className="space-y-1">
                   <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Change password</h3>
                   <p className="text-[14px] text-slate-500 font-medium">Please enter your details below.</p>
                 </div>
                 <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"><X size={24}/></button>
               </div>
               
               <div className="space-y-6">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-semibold text-slate-500 ml-1">Current password</label>
                    <div className="relative">
                      <input type={showPass ? "text" : "password"} className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-slate-900 focus:bg-white outline-none rounded-2xl text-[14px] font-bold transition-all" />
                      <button onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 cursor-pointer">{showPass ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-semibold text-slate-500 ml-1">New password</label>
                    <input type={showPass ? "text" : "password"} className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-slate-900 focus:bg-white outline-none rounded-2xl text-[14px] font-bold transition-all" />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-semibold text-slate-500 ml-1">Confirm new password</label>
                    <input type={showPass ? "text" : "password"} className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-slate-900 focus:bg-white outline-none rounded-2xl text-[14px] font-bold transition-all" />
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                 <button className="w-full py-4.5 text-[14px] font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 cursor-pointer active:scale-95">Update Password</button>
                 <button onClick={() => setIsPasswordModalOpen(false)} className="w-full py-3 text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-all cursor-pointer">Go back</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CHANGE EMAIL MODAL --- */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[440px] rounded-[2.5rem] shadow-2xl p-8 md:p-12 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">New email</h3>
                <p className="text-[14px] text-slate-500 font-medium">Update your login credentials.</p>
              </div>
              <button onClick={() => setIsEmailModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"><X size={24}/></button>
            </div>
            <div className="space-y-6 mb-10">
              <div className="space-y-2.5">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">Current email address</label>
                <input type="email" disabled defaultValue="mayanfayaz0@gmail.com" className="w-full px-6 py-4 bg-slate-100 border border-transparent rounded-2xl text-[14px] font-bold text-slate-400 cursor-not-allowed" />
              </div>
              <div className="space-y-2.5">
                <label className="text-[13px] font-semibold text-slate-500 ml-1">New email address</label>
                <input type="email" placeholder="hello@example.com" className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-slate-900 focus:bg-white outline-none rounded-2xl text-[14px] font-bold transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="w-full py-4.5 text-[14px] font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all cursor-pointer shadow-xl shadow-slate-200">Verify & Update</button>
              <button onClick={() => setIsEmailModalOpen(false)} className="w-full py-3 text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-all cursor-pointer text-center">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AccountPage;