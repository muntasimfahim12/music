"use client";

import React, { useState } from 'react';
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
  Circle
} from 'lucide-react';

const NotificationsPage = () => {
  // Mock Data: আপনার ইনভয়েস এবং পেমেন্ট সিস্টেমের লজিক অনুযায়ী [cite: 2026-02-26]
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment',
      title: 'Payment Successful',
      description: 'Your payment of $65.00 for Void Hoodie has been confirmed. [cite: 2026-02-26]',
      time: '2 mins ago',
      isRead: false,
      icon: <CreditCard className="text-emerald-500" size={20} />
    },
    {
      id: 2,
      type: 'invoice',
      title: 'Invoice Issued',
      description: 'A new professional PDF invoice for Milestone #2 is ready for download. [cite: 2026-02-26]',
      time: '1 hour ago',
      isRead: false,
      icon: <FileText className="text-blue-500" size={20} />
    },
    {
      id: 3,
      type: 'system',
      title: 'Vault Secured',
      description: 'Your premium dashboard has been updated with the latest security protocols.',
      time: '5 hours ago',
      isRead: true,
      icon: <Check className="text-slate-900" size={20} />
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      description: 'Admin has sent a response regarding your project retrieval request.',
      time: '1 day ago',
      isRead: true,
      icon: <MessageSquare className="text-purple-500" size={20} />
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-20">
      <div className="max-w-4xl mx-auto pt-16 px-6">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight inter-bold">
              Notifications <span className="text-slate-400 font-medium inter-medium">Center</span>
            </h1>
            <p className="text-[14px] text-slate-500 font-medium inter-medium">
              Stay updated with your project milestones and payment status [cite: 2026-02-26].
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={markAllAsRead}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-all inter-bold flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Check size={16} />
              Mark all as read
            </button>
            <button className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer shadow-lg shadow-slate-200">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* --- Notifications List --- */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`group relative flex items-start gap-6 p-6 rounded-[2rem] border transition-all duration-300 ${
                notification.isRead 
                ? 'bg-white border-slate-100 opacity-80' 
                : 'bg-white border-blue-100 shadow-md shadow-blue-50/50 scale-[1.01]'
              }`}
            >
              {/* Icon Container */}
              <div className={`p-4 rounded-2xl flex-shrink-0 ${
                notification.isRead ? 'bg-slate-50' : 'bg-blue-50'
              }`}>
                {notification.icon}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1 pr-8">
                <div className="flex items-center gap-2">
                  <h3 className={`text-[16px] font-bold inter-bold ${
                    notification.isRead ? 'text-slate-700' : 'text-slate-900'
                  }`}>
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <Circle size={8} className="fill-blue-500 text-blue-500" />
                  )}
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed inter-medium">
                  {notification.description}
                </p>
                <div className="flex items-center gap-1.5 pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">
                  <Clock size={12} />
                  {notification.time}
                </div>
              </div>

              {/* Actions */}
              <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                  <Trash2 size={16} />
                </button>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors cursor-pointer">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Empty State Placeholder --- */}
        {notifications.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Bell size={40} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 inter-bold">All caught up!</h3>
              <p className="text-slate-400 inter-medium">No new notifications at the moment.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NotificationsPage;