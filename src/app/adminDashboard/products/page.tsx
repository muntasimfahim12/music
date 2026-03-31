/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  Package, 
  ArrowUpRight,
  Archive
} from 'lucide-react';
import Link from 'next/link';

const ProductsPage = () => {
  // Mock Data: আপনার ভল্টের প্রোডাক্টের আদলে [cite: 2026-03-29]
  const [products] = useState([
    {
      id: "PROD-001",
      name: "Void Hoodie",
      category: "Apparel",
      price: "$65.00",
      stock: 24,
      status: "In Stock",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "PROD-002",
      name: "Logo Dad Hat",
      category: "Accessories",
      price: "$25.00",
      stock: 0,
      status: "Out of Stock",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "PROD-003",
      name: "Cyber Mesh Tote",
      category: "Accessories",
      price: "$18.00",
      stock: 12,
      status: "In Stock",
      image: "https://images.unsplash.com/photo-1544816153-12ad5d7133a2?q=80&w=200&auto=format&fit=crop"
    }
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 inter-bold tracking-tight">
            Products <span className="text-slate-400 font-medium">Inventory</span>
          </h1>
          <p className="text-[14px] text-slate-500 font-medium inter-medium">
            Manage your vault stock, pricing, and product visibility.
          </p>
        </div>
        
        <Link href="/addProducts">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-[13px] font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200 inter-bold cursor-pointer">
            <Plus size={18} />
            Add New Product
          </button>
        </Link>
      </div>

      {/* --- Filter & Search Bar --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search products by name or SKU..." 
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] outline-none focus:ring-2 focus:ring-slate-900/5 transition-all inter-medium"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all inter-bold">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all inter-bold">
            <Archive size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* --- Products Table --- */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Product</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Category</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Price</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Stock</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest inter-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-slate-50/30 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 inter-bold">{product.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium tracking-tight uppercase inter-medium">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[14px] text-slate-600 inter-medium">{product.category}</td>
                  <td className="px-8 py-5 text-[14px] font-bold text-slate-900 inter-bold">{product.price}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-slate-400" />
                      <span className="text-[14px] text-slate-600 inter-medium">{product.stock} units</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold inter-bold ${
                      product.status === "In Stock" 
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                      : "bg-red-50 text-red-600 border border-red-100"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all cursor-pointer shadow-sm shadow-transparent hover:shadow-slate-100">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all cursor-pointer shadow-sm shadow-transparent hover:shadow-slate-100">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-white rounded-lg transition-all cursor-pointer shadow-sm shadow-transparent hover:shadow-slate-100">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;