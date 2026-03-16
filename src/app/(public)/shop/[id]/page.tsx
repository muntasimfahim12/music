/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Truck, Heart, Plus, Minus,
  Loader2, AlertCircle, Maximize2, ShoppingBag,
  X
} from 'lucide-react';
import { showCartToast } from '@/src/components/shared/ToastProvider';
import Reviews from '@/src/components/shared/Reviews';
import RelatedProduct from '@/src/components/shared/RelatedProduct';
import { CartItem, useCart } from '@/src/context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  // --- States ---
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('DESCRIPTION');
  const [mainDisplayImg, setMainDisplayImg] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false); // Fixed State

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
    if (!product) return;

    const itemToCart: CartItem = {
      id: `${product.id}-${selectedSize || 'default'}`,
      name: product.name || product.title,
      price: product.price?.sale_price || product.price?.amount || product.price || 0,
      image: product.mainImage || product.cover_image,
      quantity: quantity,
      size: selectedSize,
      color: product.colors ? product.colors[selectedColor]?.name : undefined,
      type: product.category === 'HOODIES' ? 'physical' : 'digital'
    };

    addToCart(itemToCart);
    showCartToast(product.name || product.title);
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

          {/* --- LEFT: Image Gallery --- */}
          <div className="lg:col-span-6 space-y-6 md:sticky md:top-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group overflow-hidden rounded-[4px] bg-[#0A0A0A] border border-white/[0.05] max-w-[500px] mx-auto shadow-2xl"
            >
              {product.tag && (
                <div className="absolute top-5 left-0 z-20 bg-[#E63946] text-white text-[9px] font-black px-4 py-1.5 uppercase tracking-[0.2em] shadow-xl">
                  {product.tag}
                </div>
              )}

              <div className="relative aspect-[4/5] overflow-hidden cursor-zoom-in" onClick={() => setIsFullscreen(true)}>
                <motion.img
                  key={mainDisplayImg}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5 }}
                  src={mainDisplayImg}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute bottom-6 right-6 p-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-white hover:text-black shadow-2xl z-10"
              >
                <Maximize2 size={18} strokeWidth={1.5} />
              </button>
            </motion.div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 justify-center lg:justify-start max-w-[500px] mx-auto">
              {productGallery.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setMainDisplayImg(img)}
                  className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 transition-all duration-500 overflow-hidden ${mainDisplayImg === img
                    ? 'ring-1 ring-[#E63946] ring-offset-4 ring-offset-black opacity-100'
                    : 'opacity-30 hover:opacity-70 grayscale hover:grayscale-0'
                    }`}
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

            {/* Actions */}
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
        <div className="mt-16 mb-4 md:mt-32 max-w-[1216px] mx-auto px-4 lg:px-0">
          <div className="flex gap-12 border-b border-white/[0.03] mb-12 overflow-x-auto no-scrollbar relative">
            {['DESCRIPTION', 'SPECIFICATIONS', 'LOGISTICS'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-5 text-[10px] font-black tracking-[0.3em] transition-all duration-500 relative group ${activeTab === tab ? 'text-white' : 'text-white/20 hover:text-white/50'
                  }`}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E63946] shadow-[0_0_15px_rgba(230,57,70,0.5)]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h3 className="text-3xl judson-bold text-white mb-8 tracking-tight">Manifesto</h3>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="min-h-[180px]"
                  >
                    {activeTab === 'DESCRIPTION' && (
                      <p className="text-zinc-400 font-inter text-[14px] leading-[1.8] max-w-2xl">
                        {product.tabs?.description || product.description}
                      </p>
                    )}
                    {activeTab === 'SPECIFICATIONS' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                        {product.tabs?.specifications?.map((spec: any, i: number) => (
                          <div key={i} className="flex justify-between items-center border-b border-white/[0.03] py-4">
                            <span className="text-[11px] text-zinc-500 uppercase font-bold tracking-widest">{spec.label}</span>
                            <span className="text-[12px] text-white font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === 'LOGISTICS' && (
                      <div className="space-y-6">
                        {[{ label: 'Delivery', value: product.tabs?.logistics?.delivery }, { label: 'Returns', value: product.tabs?.logistics?.returns }].map((item, idx) => (
                          <div key={idx} className="bg-white/[0.02] p-5 border border-white/[0.05] rounded-sm">
                            <h5 className="text-[#E63946] text-[9px] font-black uppercase mb-2">{item.label}</h5>
                            <p className="text-zinc-400 text-[13px]">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {product.highlights?.map((item: any, i: number) => (
                  <div key={i} className="relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] p-6 group hover:border-[#E63946]/30 transition-all duration-700">
                    <div className="absolute top-0 left-0 w-[1px] h-0 bg-[#E63946] group-hover:h-full transition-all duration-700" />
                    <p className="text-[9px] text-[#E63946] uppercase mb-3 font-black tracking-[0.2em]">{item.title}</p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="relative p-8 rounded-[2px] bg-[#0A0A0A] border border-white/[0.05] overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-[0.02] pointer-events-none italic judson-bold text-7xl select-none">Care</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-[1px] w-8 bg-[#E63946]" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Care Protocol</h4>
                  </div>
                  <ul className="space-y-5">
                    {['Reverse wash only', 'Cold water cycle (30°C)', 'Neutralize pH detergents', 'Air dry in shaded environment'].map((instruction, index) => (
                      <li key={index} className="flex items-start gap-4 group">
                        <span className="text-[#E63946] text-[12px]">0{index + 1}</span>
                        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider group-hover:text-white transition-colors">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- EXTRA SECTIONS --- */}
      <div className="w-full mt-20 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-20">
          <Reviews />
        </div>
      </div>

      <div className="w-full border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          <RelatedProduct />
        </div>
      </div>

      {/* --- FULLSCREEN LIGHTBOX PORTAL --- */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsFullscreen(false)}
          >
            <button className="absolute top-10 right-10 text-white/40 hover:text-white transition-all group">
              <X size={40} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={mainDisplayImg}
              className="max-w-full max-h-full object-contain shadow-2xl"
              alt="Full view"
            />
            <div className="absolute bottom-10 text-white/20 text-[10px] font-black tracking-[0.5em] uppercase">
              {product.name} — Perspective {(productGallery.indexOf(mainDisplayImg) + 1).toString().padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProductDetails;
