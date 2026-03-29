/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { 
  X, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ShieldCheck, 
  Bell, 
  Mail, 
  CheckCircle2 
} from "lucide-react";

const SettingsPage = () => {
  // States for Toggles
  const [settings, setSettings] = useState({
    customNotification: false,
    newMessages: false,
    postsLiked: false,
    commentsOnPosts: false,
    abandonedCart: false,
    customerPurchase: true,
    paymentNotifications: true,
    wixAlert: true,
    contactAssigned: true,
    invoiceIssued: true,
    priceQuoteAccepted: true,
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#FFFFF] pb-20">
     
      <div className="max-w-4xl mx-auto -mt-10 px-4 relative z-10">
        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-8 md:p-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-slate-100 pb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight inter-bold">
                Notification <span className="text-slate-400 font-medium inter-medium">Settings</span>
              </h1>
              <p className="text-[14px] text-slate-500 font-medium inter-medium">
                Choose what you want to get notified about.
              </p>
            </div>
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[13px] font-bold hover:bg-slate-800 transition-all active:scale-95 inter-bold shadow-lg shadow-slate-200"
            >
              <ShieldCheck size={16} />
              Security Settings
            </button>
          </div>

          {/* --- Marketing Emails Section --- */}
          <section className="mb-14">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[18px] font-bold text-slate-900 inter-bold">Marketing emails</h2>
              <button className="px-5 py-2 bg-[#0057ff] text-white rounded-lg text-[12px] font-bold hover:bg-blue-600 transition-colors inter-bold">
                Subscribe Now
              </button>
            </div>
            <p className="text-[14px] text-slate-500 mb-8 inter-medium bg-slate-50 p-4 rounded-xl border border-slate-100 inline-block">
              You arent subscribed to marketing emails
            </p>

            <div className="space-y-8">
              <SettingGroup title="General">
                <ToggleRow 
                  label="Custom notification" 
                  isEnabled={settings.customNotification} 
                  onToggle={() => toggleSetting('customNotification')} 
                />
              </SettingGroup>

              <SettingGroup title="Inbox">
                <ToggleRow 
                  label="New messages" 
                  isEnabled={settings.newMessages} 
                  onToggle={() => toggleSetting('newMessages')} 
                />
              </SettingGroup>

              <SettingGroup title="Blog">
                <ToggleRow 
                  label="Posts or comments are liked" 
                  isEnabled={settings.postsLiked} 
                  onToggle={() => toggleSetting('postsLiked')} 
                />
                <ToggleRow 
                  label="Comments on posts" 
                  isEnabled={settings.commentsOnPosts} 
                  onToggle={() => toggleSetting('commentsOnPosts')} 
                />
              </SettingGroup>

              <SettingGroup title="Stores">
                <ToggleRow 
                  label="Abandoned Cart" 
                  isEnabled={settings.abandonedCart} 
                  onToggle={() => toggleSetting('abandonedCart')} 
                />
              </SettingGroup>
            </div>
          </section>

          {/* --- Business Transactional Section --- */}
          <section>
            <h2 className="text-[18px] font-bold text-slate-900 mb-8 inter-bold border-t border-slate-100 pt-10">
              Business transactional emails
            </h2>

            <div className="space-y-8">
              <SettingGroup title="Stores">
                <ToggleRow 
                  label="Customer makes a purchase" 
                  isEnabled={settings.customerPurchase} 
                  onToggle={() => toggleSetting('customerPurchase')} 
                />
              </SettingGroup>

              <SettingGroup title="Payments">
                <ToggleRow 
                  label="Payment notifications" 
                  isEnabled={settings.paymentNotifications} 
                  onToggle={() => toggleSetting('paymentNotifications')} 
                />
              </SettingGroup>

              <SettingGroup title="General">
                <ToggleRow 
                  label="An alert by Wix is triggered" 
                  isEnabled={settings.wixAlert} 
                  onToggle={() => toggleSetting('wixAlert')} 
                />
                <ToggleRow 
                  label="Contact is assigned to you" 
                  isEnabled={settings.contactAssigned} 
                  onToggle={() => toggleSetting('contactAssigned')} 
                />
              </SettingGroup>

              <SettingGroup title="Invoices">
                <ToggleRow 
                  label="Invoice issued" 
                  isEnabled={settings.invoiceIssued} 
                  onToggle={() => toggleSetting('invoiceIssued')} 
                />
              </SettingGroup>

              <SettingGroup title="Price Quotes">
                <ToggleRow 
                  label="Price quote is accepted" 
                  isEnabled={settings.priceQuoteAccepted} 
                  onToggle={() => toggleSetting('priceQuoteAccepted')} 
                />
              </SettingGroup>
            </div>
          </section>
        </div>
      </div>

      {/* --- Change Password Modal --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[480px] rounded-[2.5rem] shadow-2xl p-8 md:p-12 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900 inter-bold tracking-tight">Change password</h3>
                <p className="text-[14px] text-slate-500 inter-medium font-medium">This will be your new login password.</p>
              </div>
              <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
            </div>

            <div className="space-y-6 mb-10">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 ml-1 inter-semibold">Your password *</label>
                <div className="relative">
                  <input 
                    type={showPass.current ? "text" : "password"} 
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-slate-900 outline-none rounded-2xl text-[14px] font-bold transition-all inter-bold" 
                  />
                  <button onClick={() => setShowPass({...showPass, current: !showPass.current})} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors">
                    {showPass.current ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                <button className="text-[13px] font-bold text-slate-900 underline underline-offset-4 ml-1 inter-bold">Reset or create password</button>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 ml-1 inter-semibold">New password *</label>
                <div className="relative">
                  <input 
                    type={showPass.new ? "text" : "password"} 
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-slate-900 outline-none rounded-2xl text-[14px] font-bold transition-all inter-bold" 
                  />
                  <button onClick={() => setShowPass({...showPass, new: !showPass.new})} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors">
                    {showPass.new ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 font-medium ml-1 inter-medium">Minimum 5 characters</p>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 ml-1 inter-semibold">Confirm new password *</label>
                <div className="relative">
                  <input 
                    type={showPass.confirm ? "text" : "password"} 
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-slate-900 outline-none rounded-2xl text-[14px] font-bold transition-all inter-bold" 
                  />
                  <button onClick={() => setShowPass({...showPass, confirm: !showPass.confirm})} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors">
                    {showPass.confirm ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setIsPasswordModalOpen(false)} className="flex-1 py-4 text-[14px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all inter-bold">
                Cancel
              </button>
              <button className="flex-1 py-4 text-[14px] font-bold text-white bg-slate-900 hover:bg-black rounded-2xl transition-all inter-bold shadow-lg shadow-slate-200">
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub Components ---

const SettingGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest inter-bold ml-1">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const ToggleRow = ({ label, isEnabled, onToggle }: { label: string, isEnabled: boolean, onToggle: () => void }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-50 group hover:border-slate-200 transition-all">
    <span className="text-[15px] font-bold text-slate-700 group-hover:text-slate-900 inter-bold transition-colors">
      {label}
    </span>
    <button 
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${isEnabled ? 'bg-[#0057ff]' : 'bg-slate-200'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default SettingsPage;