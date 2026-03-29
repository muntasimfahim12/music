/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  DollarSign, 
  Package, 
  Tag, 
  Layers, 
  ArrowLeft,
  Save,
  Info
} from 'lucide-react';
import Link from 'next/link';

const AddProductPage = () => {
  const [images, setImages] = useState<string[]>([]);

  // ডামি ইমেজ প্রিভিউ হ্যান্ডলার
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages([...images, event.target.result as string]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- Top Action Bar --- */}
      <div className="flex justify-between items-center">
        <Link 
          href="/adminDashboard/products" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-[13px] font-bold inter-bold group"
        >
          <div className="p-2 bg-white rounded-xl border border-slate-100 group-hover:bg-slate-50 transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to Inventory
        </Link>

        <button className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[13px] font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200 inter-bold cursor-pointer">
          <Save size={18} />
          Publish Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Info & Details --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* General Information */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
              <Info size={18} className="text-slate-400" />
              <h2 className="text-lg font-bold text-slate-900 inter-bold uppercase tracking-tight">General Info</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest pl-1">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Void Oversized Hoodie" 
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-[14px] outline-none focus:ring-2 focus:ring-slate-900/5 transition-all inter-medium"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest pl-1">Description</label>
                <textarea 
                  rows={5}
                  placeholder="Describe the aesthetic, material, and fit of this piece..." 
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-[14px] outline-none focus:ring-2 focus:ring-slate-900/5 transition-all inter-medium resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
              <DollarSign size={18} className="text-slate-400" />
              <h2 className="text-lg font-bold text-slate-900 inter-bold uppercase tracking-tight">Pricing & Inventory</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest pl-1">Price (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="number" placeholder="0.00" className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-[14px] outline-none focus:ring-2 focus:ring-slate-900/5 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest pl-1">Stock Quantity</label>
                <div className="relative">
                  <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="number" placeholder="e.g. 50" className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-[14px] outline-none focus:ring-2 focus:ring-slate-900/5 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Column: Media & Org --- */}
        <div className="space-y-8">
          
          {/* Image Upload Area */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
              <Upload size={18} className="text-slate-400" />
              <h2 className="text-lg font-bold text-slate-900 inter-bold uppercase tracking-tight">Media</h2>
            </div>
            
            <div className="space-y-4">
              <label className="group relative w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer overflow-hidden">
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-slate-100 rounded-full text-slate-400 group-hover:scale-110 transition-transform">
                    <Upload size={20} />
                  </div>
                  <span className="text-[12px] font-bold text-slate-500 inter-bold">Click to Upload Image</span>
                </div>
              </label>

              {/* Preview Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group">
                    <img src={img} className="w-full h-full object-cover" alt="Preview" />
                    <button 
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-md rounded-lg text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
              <Layers size={18} className="text-slate-400" />
              <h2 className="text-lg font-bold text-slate-900 inter-bold uppercase tracking-tight">Category</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest pl-1">Primary Category</label>
                <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-[14px] outline-none focus:ring-2 focus:ring-slate-900/5 transition-all appearance-none inter-medium cursor-pointer">
                  <option>Apparel</option>
                  <option>Accessories</option>
                  <option>Digital Assets</option>
                  <option>Collectibles</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest pl-1">Tags (Comma separated)</label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="streetwear, dark, limited" className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-[14px] outline-none focus:ring-2 focus:ring-slate-900/5 transition-all" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddProductPage;