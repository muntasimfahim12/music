/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconPlus, IconSearch, IconPackage, 
  IconTrash, IconEdit, IconX, 
  IconDeviceFloppy, IconPhoto,
  IconChevronRight, IconArrowRight
} from "@tabler/icons-react";
import Link from "next/link";

const productData = [
  { id: "PROD-001", name: "Void Hoodie", category: "Apparel", price: "$65.00", stock: 24, status: "In Stock", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop", sku: "VH-001", description: "Premium heavyweight cotton hoodie with minimalist design." },
  { id: "PROD-002", name: "Logo Dad Hat", category: "Accessories", price: "$25.00", stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop", sku: "DH-992", description: "Classic 6-panel dad hat with embroidered logo." },
];

export default function ProductsPage() {
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const inputClasses = `
    w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 
    text-slate-700 font-medium text-sm transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-[#4177BC]/5 focus:border-[#4177BC]
  `;

  return (
    <div className="max-w-[1300px] mx-auto pb-20 px-4 sm:px-8 bg-[#FBFBFE] selection:bg-[#4177BC]/10">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-12 pb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight inter-bold">
            Products <span className="text-slate-400 font-medium text-2xl">Inventory</span>
          </h1>
          <p className="text-[14px] text-slate-500 font-medium inter-medium">
            Manage your high-end merchandise and stock levels.
          </p>
        </div>

        <Link href="/products/addProducts">
          <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#4177BC] text-white px-6 py-3.5 rounded-xl font-bold text-[12px] uppercase tracking-widest transition-all shadow-lg active:scale-95">
            <IconPlus size={18} stroke={3} />
            Add New Product
          </button>
        </Link>
      </div>

      {/* --- SEARCH BOX --- */}
      <div className="flex items-center mb-10 py-3 border-b border-slate-100">
        <div className="relative w-full lg:max-w-xs group">
          <IconSearch size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4177BC] transition-colors" />
          <input
            type="text" 
            placeholder="Search Products..."
            className="w-full pl-7 pr-4 py-2 bg-transparent border-none outline-none focus:ring-0 text-sm font-bold text-slate-700 placeholder:text-slate-300 uppercase tracking-wider"
          />
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productData.map((product) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
          >
            {/* Image Area */}
            <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className={`backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${product.status === "In Stock" ? "bg-emerald-500/80" : "bg-rose-500/80"}`}>
                  {product.status}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] text-[#4177BC] font-black uppercase tracking-[0.15em]">{product.category}</p>
                <h3 className="text-sm font-black text-slate-900 leading-tight uppercase line-clamp-1 group-hover:text-[#4177BC] transition-colors">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-lg font-black text-slate-900 tracking-tighter">{product.price}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Qty: {product.stock}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => setEditingProduct(product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 py-3.5 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest"
                >
                  <IconEdit size={14} stroke={2.5} /> Edit
                </button>
                <button className="w-12 flex items-center justify-center bg-slate-50 hover:bg-red-500 hover:text-white text-slate-400 py-3 rounded-xl transition-all">
                  <IconTrash size={14} stroke={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- EDIT MODAL --- */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-100"
            >
              <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                
                {/* Left: Image Preview */}
                <div className="w-full md:w-2/5 bg-slate-50 relative p-6 flex flex-col items-center justify-center border-r border-slate-100">
                   <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl">
                      <img src={editingProduct.image} className="w-full h-full object-cover" alt="Preview" />
                   </div>
                   <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4177BC] hover:text-slate-900 transition-colors">
                      <IconPhoto size={16} /> Change Image
                   </button>
                </div>

                {/* Right: Form */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h2 className="text-lg font-bold text-slate-800 inter-bold">Product Settings</h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Update SKU: {editingProduct.sku}</p>
                    </div>
                    <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
                      <IconX size={20} />
                    </button>
                  </div>

                  <div className="p-8 space-y-6 overflow-y-auto">
                    <div className="space-y-5">
                      <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Product Name</label>
                        <input type="text" defaultValue={editingProduct.name} className={inputClasses} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Price</label>
                          <input type="text" defaultValue={editingProduct.price} className={inputClasses} />
                        </div>
                        <div>
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Stock Qty</label>
                          <input type="number" defaultValue={editingProduct.stock} className={inputClasses} />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Description</label>
                        <textarea rows={3} defaultValue={editingProduct.description} className={`${inputClasses} resize-none`} />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-4 border-t border-slate-50 flex items-center justify-end gap-3 bg-slate-50/30">
                    <button 
                      onClick={() => setEditingProduct(null)}
                      className="px-6 py-3.5 rounded-xl font-bold text-xs text-slate-500 hover:bg-slate-100 transition-all uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <button className="flex items-center gap-2 bg-slate-900 hover:bg-[#4177BC] text-white px-8 py-3.5 rounded-xl font-bold text-xs transition-all shadow-xl active:scale-95 uppercase tracking-widest">
                      <IconDeviceFloppy size={18} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}