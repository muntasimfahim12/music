/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconPlus, IconSearch, IconTrash, IconEdit, IconX,
  IconDeviceFloppy, IconLoader2, IconPackage,
  IconPhotoEdit, IconLayoutGrid, IconArrowRight, IconPalette
} from "@tabler/icons-react";
import Link from "next/link";
import api from "../../../lib/axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:5000";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // --- Image & Color States ---
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [hoverImageFile, setHoverImageFile] = useState<File | null>(null);
  const [currentColor, setCurrentColor] = useState("#000000");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      if (response.data?.success) setProducts(response.data.data);
    } catch (error: any) {
      toast.error("Vault synchronization failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openEditModal = (product: any) => {
    // কালার এবং ইমেজ লজিক সেট করা
    setEditingProduct({
        ...product,
        colors: product.colors || [] // ব্যাকেন্ড থেকে কালার না থাকলে এম্পটি অ্যারে
    });
    
    const images = [
      `${BASE_URL}${product.mainImage}`,
      product.hoverImage ? `${BASE_URL}${product.hoverImage}` : null,
      ...(product.gallery || []).map((img: string) => `${BASE_URL}${img}`)
    ].filter(Boolean);

    setGalleryImages(images);
    setActiveImageIndex(0);
    setMainImageFile(null);
    setHoverImageFile(null);
  };

  // --- Color Handlers ---
  const addColor = () => {
    if (!editingProduct.colors.includes(currentColor)) {
      setEditingProduct({
        ...editingProduct,
        colors: [...editingProduct.colors, currentColor]
      });
    } else {
      toast.error("Color already exists");
    }
  };

  const removeColor = (colorToRemove: string) => {
    setEditingProduct({
      ...editingProduct,
      colors: editingProduct.colors.filter((c: string) => c !== colorToRemove)
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const toastId = toast.loading("Updating Archive...");

    try {
      const formData = new FormData();
      formData.append("name", editingProduct.name);
      const priceValue = typeof editingProduct.price === 'object' ? editingProduct.price.amount : editingProduct.price;
      formData.append("price", priceValue.toString());
      formData.append("category", editingProduct.category);
      formData.append("description", editingProduct.description);
      
      // ✅ কালারগুলো JSON স্ট্রিং হিসেবে পাঠানো হচ্ছে
      formData.append("colors", JSON.stringify(editingProduct.colors));

      if (mainImageFile) formData.append("mainImage", mainImageFile);
      if (hoverImageFile) formData.append("hoverImage", hoverImageFile);

      const response = await api.put(`/products/${editingProduct._id}`, formData);
      if (response.data.success) {
        toast.success("Vault updated", { id: toastId });
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      toast.error("Update failed", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Archive this item?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      toast.success("Item archived");
    } catch (error) {
      toast.error("Archive failed");
    }
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputClasses = `w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 font-sans font-medium text-[13px] transition-all focus:outline-none focus:ring-2 focus:ring-[#4177BC]/10 focus:border-[#4177BC] focus:bg-white`;

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-[#1a1a1a]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 pt-8 pb-24">

        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#4177BC]"></span>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#4177BC]">Inventory</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none text-slate-900 ">
              All <span className="text-[#556156]">Products</span>
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {products.length} Masterpieces Live
              </span>
            </div>
          </div>

          <Link href="/adminDashboard/products/addProducts">
            <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-md font-bold text-[11px] tracking-[0.25em] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 active:scale-95 cursor-pointer group">
              <IconPlus size={16} stroke={3} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Add New Product</span>
            </button>
          </Link>
        </header>

        {/* --- SEARCH BAR --- */}
        <div className="relative max-w-xl mb-12 group">
          <IconSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#4177BC] transition-colors" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-[#4177BC] transition-all text-[13px] font-medium"
          />
        </div>

        {/* --- PRODUCT GRID --- */}
        {loading ? (
          <div className="flex justify-center py-32">
            <IconLoader2 className="animate-spin text-[#4177BC]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div key={product._id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 border border-gray-50 shadow-sm">
                    <img
                      src={`${BASE_URL}${product.mainImage}`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* কালার ডট প্রিভিউ কার্ডের ওপরে */}
                    <div className="absolute top-4 left-4 flex gap-1.5 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.colors?.slice(0, 3).map((col: string, i: number) => (
                        <div key={i} className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: col }} />
                      ))}
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                      <button onClick={() => openEditModal(product)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-[#4177BC] hover:text-white transition-all">
                        <IconEdit size={18} />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-rose-500 transition-all">
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 px-1">
                    <p className="text-[9px] font-black text-[#4177BC] uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="text-[14px] font-bold text-gray-900 uppercase truncate mb-1">{product.name}</h3>
                    <p className="text-[16px] font-medium text-gray-500 tracking-tighter">
                      ${typeof product.price === 'object' ? product.price.amount : product.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- EDIT MODAL --- */}
        <AnimatePresence>
          {editingProduct && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingProduct(null)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-5xl bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh]"
              >
                {/* Modal Gallery */}
                <div className="md:w-[350px] bg-gray-50 p-6 border-r border-gray-100 flex flex-col">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-white mb-4">
                    <img src={galleryImages[activeImageIndex]} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  <div className="grid grid-cols-4 gap-2 overflow-y-auto max-h-[160px] mb-6">
                    {galleryImages.map((img, idx) => (
                      <button key={idx} onClick={() => setActiveImageIndex(idx)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-[#4177BC]' : 'border-transparent opacity-50'}`}>
                        <img src={img} className="w-full h-full object-cover" alt="thumb" />
                      </button>
                    ))}
                  </div>

                  {/* ✅ Modal-এর ভেতর কালার দেখার জায়গা */}
                  <div className="mt-auto pt-6 border-t border-gray-200">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Managed Colors</label>
                    <div className="flex flex-wrap gap-2">
                      {editingProduct.colors?.map((col: string, i: number) => (
                        <div key={i} className="group relative">
                          <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: col }} />
                          <button 
                            type="button"
                            onClick={() => removeColor(col)}
                            className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <IconX size={10} stroke={3} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Form */}
                <div className="flex-1 p-8 overflow-y-auto">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-tight">Update Release</h2>
                    <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-black transition-colors"><IconX size={20} /></button>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Product Name</label>
                            <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className={inputClasses} />
                        </div>
                        
                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Price ($)</label>
                            <input
                            type="number"
                            value={typeof editingProduct.price === 'object' ? editingProduct.price.amount : editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: { ...editingProduct.price, amount: e.target.value } })}
                            className={inputClasses}
                            />
                        </div>

                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Category</label>
                            <select value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className={inputClasses}>
                            <option value="TEES">TEES</option>
                            <option value="HOODIES">HOODIES</option>
                            <option value="ACCESSORIES">ACCESSORIES</option>
                            </select>
                        </div>
                    </div>

                    {/* ✅ এডিট মোডালে নতুন কালার অ্যাড করার অপশন */}
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Add More Colors</label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="color" 
                                value={currentColor} 
                                onChange={(e) => setCurrentColor(e.target.value)}
                                className="w-10 h-10 rounded-lg cursor-pointer border-2 border-white shadow-sm"
                            />
                            <span className="text-xs font-bold text-gray-500 uppercase">{currentColor}</span>
                            <button 
                                type="button"
                                onClick={addColor}
                                className="ml-auto flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
                            >
                                <IconPlus size={14} stroke={3} /> Add
                            </button>
                        </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Description</label>
                      <textarea rows={3} value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className={`${inputClasses} resize-none`} />
                    </div>

                    <button
                      disabled={isUpdating}
                      type="submit"
                      className="w-full bg-black hover:bg-[#4177BC] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      {isUpdating ? <IconLoader2 className="animate-spin" size={16} /> : <IconDeviceFloppy size={16} />}
                      Sync Changes to Vault
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}