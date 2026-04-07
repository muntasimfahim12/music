/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { 
  X, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ChevronRight 
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
    <div className="w-full bg-[#FFFFFF] min-h-screen font-sans -mt-18 relative text-slate-900">
      
      <div className="max-w-4xl mx-auto py-12 md:py-24 px-6 md:px-8 space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Notification Settings</h1>
            <p className="text-[14px] text-slate-500 font-medium">Choose what you want to get notified about.</p>
          </div>
          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg text-[13px] font-bold hover:bg-black transition-all active:scale-95 shadow-sm"
          >
            <ShieldCheck size={16} />
            Security Settings
          </button>
        </div>

        {/* --- Marketing Emails Section --- */}
        <section className="space-y-8">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-[18px] font-bold">Marketing emails</h2>
              <p className="text-[13px] text-slate-400">Manage your subscription and promotional updates.</p>
            </div>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-[12px] font-bold hover:bg-blue-700 transition-colors">
              Subscribe Now
            </button>
          </div>

          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 inline-block text-[13px] font-medium text-slate-500">
             You aren&apos;t subscribed to marketing emails
          </div>

          <div className="space-y-10 pt-4">
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
          </div>
        </section>

        {/* --- Business Transactional Section --- */}
        <section className="space-y-8 pt-8 border-t border-slate-100">
          <div className="space-y-1">
            <h2 className="text-[18px] font-bold">Business transactional emails</h2>
            <p className="text-[13px] text-slate-400">Automated updates regarding your business activity.</p>
          </div>

          <div className="space-y-10">
            <SettingGroup title="Stores">
              <ToggleRow 
                label="Customer makes a purchase" 
                isEnabled={settings.customerPurchase} 
                onToggle={() => toggleSetting('customerPurchase')} 
              />
              <ToggleRow 
                label="Abandoned Cart" 
                isEnabled={settings.abandonedCart} 
                onToggle={() => toggleSetting('abandonedCart')} 
              />
            </SettingGroup>

            <SettingGroup title="Payments">
              <ToggleRow 
                label="Payment notifications" 
                isEnabled={settings.paymentNotifications} 
                onToggle={() => toggleSetting('paymentNotifications')} 
              />
            </SettingGroup>

            <SettingGroup title="Documentation">
              <ToggleRow 
                label="Invoice issued" 
                isEnabled={settings.invoiceIssued} 
                onToggle={() => toggleSetting('invoiceIssued')} 
              />
              <ToggleRow 
                label="Price quote is accepted" 
                isEnabled={settings.priceQuoteAccepted} 
                onToggle={() => toggleSetting('priceQuoteAccepted')} 
              />
            </SettingGroup>
          </div>
        </section>

      </div>

      {/* --- Change Password Modal (Glassy Effect) --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[420px] rounded-2xl border border-slate-200 shadow-2xl p-8 md:p-10 space-y-8 animate-in zoom-in-95 duration-300">
            
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Change password</h3>
                <p className="text-[13px] text-slate-500 font-medium">This will be your new login password.</p>
              </div>
              <button 
                onClick={() => setIsPasswordModalOpen(false)} 
                className="p-1 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-500">Your password *</label>
                <div className="relative">
                  <input 
                    type={showPass.current ? "text" : "password"} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-900 transition-all text-[14px] font-medium" 
                  />
                  <button onClick={() => setShowPass({...showPass, current: !showPass.current})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPass.current ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
                <button className="text-[12px] font-bold text-slate-900 underline underline-offset-4 ml-1">Reset or create password</button>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-500">New password *</label>
                <div className="relative">
                  <input 
                    type={showPass.new ? "text" : "password"} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-900 transition-all text-[14px] font-medium" 
                  />
                  <button onClick={() => setShowPass({...showPass, new: !showPass.new})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPass.new ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full py-3.5 text-[14px] font-bold text-white bg-slate-900 rounded-xl hover:bg-black transition-all">
                Update Password
              </button>
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="w-full py-2 text-[13px] font-semibold text-slate-400 hover:text-slate-900 transition-all"
              >
                Cancel Request
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
    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{title}</h3>
    <div className="divide-y divide-slate-50 border-t border-slate-50">{children}</div>
  </div>
);

const ToggleRow = ({ label, isEnabled, onToggle }: { label: string, isEnabled: boolean, onToggle: () => void }) => (
  <div className="flex items-center justify-between py-5 group transition-all">
    <span className="text-[14px] font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
      {label}
    </span>
    <button 
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 ease-in-out ${isEnabled ? 'bg-slate-900' : 'bg-slate-200'}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default SettingsPage;