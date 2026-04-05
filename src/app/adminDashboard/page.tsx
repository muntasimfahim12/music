import React from 'react';
import { 
  Users, 
  DollarSign, 
  Briefcase, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  ExternalLink
} from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', icon: <DollarSign size={18}/>, trend: '+20.1%', positive: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Active Projects', value: '12', icon: <Briefcase size={18}/>, trend: '+3', positive: true, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Pending Invoices', value: '05', icon: <Clock size={18}/>, trend: '-2', positive: false, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Total Clients', value: '24', icon: <Users size={18}/>, trend: '+12%', positive: true, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="w-full">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Hello Mayan, here’s a summary of your business today.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95">
                <Plus size={18} /> New Project
            </button>
        </div>
      </div>

      {/* Stats Cards - Premium Minimal Look */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 group cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${item.bg} ${item.color} rounded-2xl transition-transform group-hover:scale-110`}>
                {item.icon}
              </div>
              <div className={`flex items-center gap-1 text-[13px] font-bold px-2 py-1 rounded-lg ${item.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {item.trend}
                {item.positive ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
              </div>
            </div>
            <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{item.title}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Transactions Section */}
        <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-7 border-b border-slate-50 flex justify-between items-center bg-white">
            <div>
                <h2 className="text-lg font-black text-slate-900">Recent Invoices</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Latest 10 transactions of this month</p>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              View All <ExternalLink size={14}/>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-[11px] font-black uppercase tracking-[0.1em] border-b border-slate-50">
                  <th className="px-8 py-5 text-left font-black">Client Name</th>
                  <th className="px-8 py-5 text-left font-black">Status</th>
                  <th className="px-8 py-5 text-left font-black">Amount</th>
                  <th className="px-8 py-5 text-right font-black">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4].map((_, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black">RC</div>
                            <span className="text-sm font-bold text-slate-700">Rahat Chowdhury</span>
                        </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-emerald-100/60 text-emerald-700 text-[11px] font-black rounded-full uppercase tracking-tighter">Paid</span>
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900">$1,200.00</td>
                    <td className="px-8 py-5 text-right text-sm text-slate-500 font-medium">Oct 24, 2023</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Insights & Action Sidebar */}
        <div className="space-y-8">
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="text-xl font-black mb-2">Need Help?</h3>
                    <p className="text-slate-400 text-sm font-medium mb-6">Check our documentation for advanced dashboard settings.</p>
                    <button className="w-full py-3 bg-white text-black rounded-xl font-black text-sm hover:bg-slate-100 transition-all active:scale-95">
                        Go to Support
                    </button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-800 rounded-full blur-3xl opacity-50 group-hover:bg-blue-500/20 transition-colors"></div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
                <h3 className="text-lg font-black text-slate-900 mb-6">Upcoming Milestones</h3>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="mt-1 h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
                        <div>
                            <p className="text-sm font-bold text-slate-700 leading-none">UI Design Delivery</p>
                            <p className="text-xs text-slate-400 font-medium mt-1">Client: Tech Solutions Ltd</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                        <div>
                            <p className="text-sm font-bold text-slate-700 leading-none">Backend Deployment</p>
                            <p className="text-xs text-slate-400 font-medium mt-1">Project: E-commerce Site</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;