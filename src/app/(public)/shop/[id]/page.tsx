/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Truck, Heart, Plus, Minus,
  Loader2, AlertCircle, Maximize2, ShoppingBag
} from 'lucide-react';
import { showCartToast } from '@/src/components/shared/ToastProvider';
import Reviews from '@/src/components/shared/Reviews';
import RelatedMusic from '@/src/components/shared/RelatedMusic';

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('DESCRIPTION');
  const [mainDisplayImg, setMainDisplayImg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const response = await axios.get(`${baseUrl}/data/product.json`);
        const foundProduct = response.data.find((p: any) => p.id.toString() === id);

        if (foundProduct) {
          setProduct(foundProduct);
          setMainDisplayImg(foundProduct.mainImage);
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    showCartToast(product.name);
  };

  if (loading) return (
    <div className="h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-[#E63946] animate-spin" size={30} />
      <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.3em]">Initialising Data...</p>
    </div>
  );

  if (!product) return (
    <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-[#E63946]">
      <AlertCircle size={40} />
      <p className="mt-4 judson-bold uppercase tracking-widest text-xs">Access Denied: Product Not Found</p>
    </div>
  );

  const productGallery = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.mainImage, product.hoverImage].filter(Boolean);

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-12 md:pt-24 pb-20 selection:bg-[#E63946] overflow-x-hidden">
      <div className="max-w-[1250px] mx-auto px-5 md:px-10">

        {/* --- Breadcrumb --- */}
        <nav className="flex items-center gap-2 text-[8px] md:text-[9px] inter-medium text-white/30 uppercase tracking-[0.2em] mb-8 md:mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button onClick={() => router.push('/shop')} className="group flex items-center gap-1 cursor-pointer">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 group-hover:text-[#E63946] transition-colors">Go Back</span>
          </button>
          <span className="text-zinc-700">/</span>
          <span className="hover:text-white transition cursor-pointer">{product.category}</span>
          <span className="text-zinc-700">/</span>
          <span className="text-white/60">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* --- LEFT: Slimmer Image Gallery --- */}
          <div className="lg:col-span-6 space-y-4 md:sticky md:top-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-white/5 max-w-[500px] mx-auto"
            >
              {product.tag && (
                <div className="absolute top-4 left-4 z-20 bg-[#E63946] text-white text-[8px] md:text-[9px] font-black px-2.5 py-1 uppercase tracking-tighter shadow-lg transform -skew-x-12">
                  {product.tag}
                </div>
              )}
              <img
                src={mainDisplayImg}
                className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                alt={product.name}
              />
              <button className="absolute bottom-4 right-4 p-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Maximize2 size={14} />
              </button>
            </motion.div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 justify-center lg:justify-start">
              {productGallery.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setMainDisplayImg(img)}
                  className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-lg border-2 overflow-hidden transition-all duration-300 ${mainDisplayImg === img ? 'border-[#E63946]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`view-${i}`} />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: Product Info --- */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-6">
              <h1 className="text-[clamp(1.75rem,5vw,3rem)] md:text-4xl lg:text-5xl judson-bold tracking-tighter leading-[0.95] mb-4">
                {product.name}
              </h1>

              <div className="flex items-center justify-between border-y border-white/5 py-5 md:py-4">
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-black tracking-tighter text-white">
                    ${Number(product.price.sale_price || product.price.amount).toFixed(2)}
                  </p>
                  {product.price.sale_price && (
                    <p className="text-sm text-white/30 line-through tracking-tighter">
                      ${Number(product.price.amount).toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-green-400 text-[8px] font-black uppercase tracking-[0.2em]">
                  <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></span>
                  {product.social_proof?.status || "In Stock"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-yellow-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill={i < Math.floor(product.social_proof?.rating || 5) ? "currentColor" : "none"} strokeWidth={1} />
                ))}
              </div>
              <span className="text-[9px] inter-medium text-white/20 uppercase tracking-widest whitespace-nowrap">
                Authenticated Reviews ({product.social_proof?.review_count || 0})
              </span>
            </div>

            <p className="text-white/40 text-[13px] inter-medium leading-relaxed mb-8 max-w-md">
              {product.description}
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">Tone:</p>
                <div className="flex gap-3">
                  {product.colors?.map((color: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-7 h-7 rounded-full border-2 p-0.5 transition-all ${selectedColor === i ? 'border-[#E63946]' : 'border-transparent'}`}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">Measurement:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-9 flex items-center justify-center rounded text-[10px] font-black border transition-all ${selectedSize === size ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white/40 hover:border-white/30'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* --- Action Buttons: Soft Red (#E63946) --- */}
            <div className="flex flex-col gap-3 mb-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-900 border border-white/5 rounded-lg h-14 px-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 transition-all active:scale-90"><Minus size={14} /></button>
                  <span className="w-10 text-center font-black text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 transition-all active:scale-90"><Plus size={14} /></button>
                </div>
                <button className="h-14 w-14 bg-zinc-900 border border-white/5 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-95 group">
                  <Heart size={18} className="group-hover:fill-current" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#E63946] text-white font-black uppercase tracking-[0.2em] text-[10px] h-14 rounded-lg hover:brightness-110 transition-all duration-500 flex items-center justify-center gap-4 group shadow-xl active:scale-[0.98]"
              >
                <ShoppingBag size={16} className="group-hover:rotate-12 transition-transform" />
                <span>Initialize Acquisition</span>
                <span className="opacity-20">|</span>
                <span className="text-[11px]">${((product.price.sale_price || product.price.amount) * quantity).toFixed(2)}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <Truck size={16} className="text-[#E63946]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/60 inter-medium">
                {product.tabs?.logistics?.shipping || "Standard Shipping Available"}
              </span>
            </div>
          </div>
        </div>

        {/* --- BOTTOM: Detail Tabs --- */}
        <div className="mt-20 md:mt-32">
          <div className="flex gap-8 md:gap-10 border-b border-white/5 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth">
            {['DESCRIPTION', 'SPECIFICATIONS', 'LOGISTICS'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[9px] font-black tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-[#E63946]' : 'text-white/20 hover:text-white'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E63946]" />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <h3 className="text-2xl judson-bold uppercase mb-6">Manifesto</h3>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[150px]"
                >
                  {activeTab === 'DESCRIPTION' && (
                    <p className="text-white/40 inter-medium text-[13px] leading-relaxed mb-8">
                      {product.tabs?.description || product.description}
                    </p>
                  )}

                  {activeTab === 'SPECIFICATIONS' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1 mb-8">
                      {product.tabs?.specifications?.map((spec: any, i: number) => (
                        <div key={i} className="flex justify-between border-b border-white/5 py-3">
                          <span className="text-[10px] text-white/30 uppercase font-black">{spec.label}</span>
                          <span className="text-[10px] text-white/80 font-bold inter-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'LOGISTICS' && (
                    <div className="space-y-4 text-white/40 text-[13px] mb-8 inter-medium">
                      <p>Delivery: {product.tabs?.logistics?.delivery}</p>
                      <p>Returns: {product.tabs?.logistics?.returns}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.highlights?.map((item: any, i: number) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-lg group hover:border-[#E63946]/20 transition-all">
                    <p className="text-[8px] text-[#E63946] uppercase mb-1 font-black tracking-tighter">{item.title}</p>
                    <p className="text-[10px] inter-medium text-white/60 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/[0.01] p-6 rounded-xl border border-white/5 h-fit">
              <h4 className="text-[9px] font-black uppercase tracking-widest mb-6 text-white/40 inter-medium">Care Protocol</h4>
              <ul className="text-[10px] space-y-3 font-black text-white/60 uppercase inter-bold">
                <li className="flex gap-2">• <span>Reverse wash only</span></li>
                <li className="flex gap-2">• <span>Cold water cycle (30°C)</span></li>
                <li className="flex gap-2">• <span>Neutralize pH detergents</span></li>
                <li className="flex gap-2">• <span>Air dry in shaded environment</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
         {/* Related Music Section - Full Width Background but Centered Content */}
            <div className="w-full -mb-12 border-t border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-20">
                    <Reviews />
                </div>
            </div>

            {/* Related Music Section - Full Width Background but Centered Content */}
            <div className="w-full m border-t border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-[1300px] mx-auto px-6 md:px-10 ">
                    <RelatedMusic />
                </div>
            </div>
    </main>
  );
};

export default ProductDetails;