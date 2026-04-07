/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Check, 
  Clock, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Settings, 
  Trash2,
  MoreVertical,
  Circle,
  Archive
} from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment',
      title: 'Payment Successful',
      description: 'Your payment of $65.00 for Void Hoodie has been confirmed.',
      time: '2 mins ago',
      isRead: false,
      icon: <CreditCard className="text-emerald-500" size={18} />
    },
    {
      id: 2,
      type: 'invoice',
      title: 'Invoice Issued',
      description: 'A new professional PDF invoice for Milestone #2 is ready for download.',
      time: '1 hour ago',
      isRead: false,
      icon: <FileText className="text-blue-500" size={18} />
    },
    {
      id: 3,
      type: 'system',
      title: 'Vault Secured',
      description: 'Your premium dashboard has been updated with the latest security protocols.',
      time: '5 hours ago',
      isRead: true,
      icon: <Check className="text-black" size={18} />
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      description: 'Admin has sent a response regarding your project retrieval request.',
      time: '1 day ago',
      isRead: true,
      icon: <MessageSquare className="text-purple-500" size={18} />
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-20 px-4 font-sans -mt-18 md:px-6">
      <div className="max-w-4xl mx-auto pt-16 space-y-10">
        
        {/* --- HEADER SECTION --- */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 pb-10">
         
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900"> Activity <span className="text-gray-400 font-light">Center</span></h1>
            <p className="text-[14px] text-slate-500"> Stay updated with your vault events</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={markAllAsRead}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-xl text-[11px] inter-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Check size={14} strokeWidth={3} />
              Mark All Read
            </button>
            <button className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all cursor-pointer shadow-xl shadow-black/10 active:scale-95">
              <Settings size={18} />
            </button>
          </div>
        </section>

        {/* --- NOTIFICATIONS LIST --- */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {notifications.map((notification) => (
              <motion.div 
                key={notification.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group relative flex items-start gap-4 md:gap-6 p-5 md:p-6 rounded-2xl border transition-all duration-500 ${
                  notification.isRead 
                  ? 'bg-white border-gray-50' 
                  : 'bg-white border-black/[0.03] shadow-xl shadow-black/[0.02] ring-1 ring-black/[0.01]'
                }`}
              >
                {/* Status Indicator (Mobile) */}
                {!notification.isRead && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black rounded-r-full md:hidden" />
                )}

                {/* Icon Container */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                  notification.isRead ? 'bg-gray-50 text-gray-400' : 'bg-gray-50 text-black'
                }`}>
                  {notification.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-4 md:pr-10">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-[15px] md:text-[16px] inter-bold truncate ${
                      notification.isRead ? 'text-gray-500' : 'text-black'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className={`text-[13px] md:text-[14px] leading-relaxed inter-medium ${
                    notification.isRead ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {notification.description}
                  </p>

                  <div className="flex items-center gap-2 pt-3">
                    <Clock size={12} className="text-gray-300" />
                    <span className="text-[10px] inter-bold text-gray-300 uppercase tracking-widest">
                      {notification.time}
                    </span>
                  </div>
                </div>

                {/* Actions (Desktop: Hover, Mobile: More Menu) */}
                <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-300 hover:text-black transition-colors cursor-pointer">
                    <Archive size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- EMPTY STATE --- */}
        {notifications.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 text-center bg-gray-50/30 border border-dashed border-gray-100 rounded-3xl"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Bell size={24} className="text-gray-200" />
            </div>
            <h3 className="judson-bold text-xl text-black mb-1">Silence is golden</h3>
            <p className="inter-bold text-gray-400 text-[10px] uppercase tracking-[0.2em]">
              Your vault is fully up to date
            </p>
          </motion.div>
        )}

        {/* --- BRAND FOOTER --- */}
        <div className="pt-24 text-center">
           <p className="judson-regular text-[10px] text-gray-300 uppercase tracking-[0.6em]">
              DEEBZLENÜZ VAULT • GLOBAL ALERTS
           </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;