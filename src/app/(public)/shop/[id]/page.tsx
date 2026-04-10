/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Truck, Heart, Plus, Minus,
  Loader2, AlertCircle, Maximize2, ShoppingBag,
  X, Check
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
  const [selectedColor, setSelectedColor] = useState(0); // Index of color array
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('DESCRIPTION');
  const [mainDisplayImg, setMainDisplayImg] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  const IMAGE_ROOT = BASE_URL.replace('/api/v1', '');

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        const foundProduct = response.data?.data || response.data;

        if (foundProduct) {
          setProduct(foundProduct);

          // Initial main image setup
          const initialImg = foundProduct.mainImage?.startsWith('http')
            ? foundProduct.mainImage
            : `${IMAGE_ROOT}${foundProduct.mainImage}`;
          setMainDisplayImg(initialImg);

          if (foundProduct.sizes?.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
        }
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, BASE_URL, IMAGE_ROOT]);

  // --- logic: 100% All Images Retrieval ---
  const productGallery = useMemo(() => {
    if (!product) return [];
    const allImages: string[] = [];
    if (product.mainImage) allImages.push(product.mainImage);
    if (product.hoverImage) allImages.push(product.hoverImage);
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach((img: string) => {
        if (img && !allImages.includes(img)) allImages.push(img);
      });
    }
    return allImages.map(img => img.startsWith('http') ? img : `${IMAGE_ROOT}${img}`);
  }, [product, IMAGE_ROOT]);

  const handleAddToCart = () => {
    if (!product) return;
    const currentPrice = product.price?.sale_price || product.price?.amount || 0;

    const itemToCart: CartItem = {
      id: `${product._id}-${selectedSize || 'default'}-${product.colors?.[selectedColor]?.name || 'default'}`,
      name: product.name,
      price: Number(currentPrice),
      image: mainDisplayImg,
      quantity: quantity,
      size: selectedSize,
      color: product.colors?.[selectedColor]?.name,
      type: product.category === 'HOODIES' ? 'physical' : 'digital'
    };

    addToCart(itemToCart);
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

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-12 md:pt-24 pb-20 selection:bg-[#E63946] overflow-x-hidden">
      <div className="max-w-[1250px] mx-auto px-5 md:px-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[8px] md:text-[9px] inter-medium text-white/30 uppercase tracking-[0.2em] mb-8 md:mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button onClick={() => router.push('/shop')} className="group flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 group-hover:text-[#E63946] transition-colors">Go Back</span>
          </button>
          <span className="text-zinc-700">/</span>
          <span className="hover:text-white transition cursor-pointer">{product.category}</span>
          <span className="text-zinc-700">/</span>
          <span className="text-white/60">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">

          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-6 space-y-6 md:sticky md:top-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group overflow-hidden rounded-[4px] bg-[#0A0A0A] border border-white/[0.05] max-w-[550px] mx-auto shadow-2xl"
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
                className="absolute bottom-6 right-6 p-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-white hover:text-black shadow-2xl z-10 cursor-pointer hidden md:flex"
              >
                <Maximize2 size={18} strokeWidth={1.5} />
              </button>
            </motion.div>

            {/* Thumbnail List */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 justify-start lg:justify-start max-w-[550px] mx-auto">
              {productGallery.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setMainDisplayImg(img)}
                  className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 transition-all duration-500 overflow-hidden rounded-sm cursor-pointer ${mainDisplayImg === img
                    ? 'ring-1 ring-[#E63946] ring-offset-4 ring-offset-black opacity-100'
                    : 'opacity-30 hover:opacity-100 grayscale hover:grayscale-0'
                    }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`view-${i}`} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:col-span-6 flex flex-col w-full">
            <div className="mb-6">
              <h1 className="text-[clamp(1.75rem,5vw,3rem)] md:text-4xl lg:text-5xl judson-bold tracking-tighter leading-[0.95] mb-4">
                {product.name}
              </h1>

              <div className="flex items-center justify-between border-y border-white/5 py-5 md:py-4">
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-black tracking-tighter text-white">
                    ${Number(product.price?.sale_price || product.price?.amount || 0).toFixed(2)}
                  </p>
                  {product.price?.sale_price && (
                    <p className="text-sm text-white/30 line-through tracking-tighter">
                      ${Number(product.price?.amount).toFixed(2)}
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
              <span className="text-[9px] inter-medium text-white/20 uppercase tracking-widest">
                Authenticated Reviews ({product.social_proof?.review_count || 0})
              </span>
            </div>

            <p className="text-white/40 text-[13px] inter-medium leading-relaxed mb-8 max-w-md">
              {product.description}
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {/* Fully Backend-Driven Color Selection */}
              {product.colors?.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Tone:</p>
                    <span className="text-[9px] text-white/60 font-black uppercase tracking-widest">{product.colors[selectedColor]?.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color: any, i: number) => (
                      <button
                        key={i}
                        title={color.name}
                        onClick={() => setSelectedColor(i)}
                        className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center ${selectedColor === i ? 'border-[#E63946]' : 'border-white/10'}`}
                      >
                        <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: color.hex }}>
                          {selectedColor === i && <Check size={12} className={color.hex?.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">Measurement:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-11 h-9 flex items-center justify-center rounded text-[10px] font-black border transition-all cursor-pointer ${selectedSize === size ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white/40 hover:border-white/30'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-900 border border-white/5 rounded-lg h-14 px-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 transition-all bg-transparent border-none text-white cursor-pointer"><Minus size={14} /></button>
                  <span className="w-10 text-center font-black text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 transition-all bg-transparent border-none text-white cursor-pointer"><Plus size={14} /></button>
                </div>
                <button className="h-14 w-14 bg-zinc-900 border border-white/5 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all group cursor-pointer">
                  <Heart size={18} className="group-hover:fill-current" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#E63946] text-white px-8 h-14 rounded-md font-bold text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#E63946]/20 active:scale-[0.98] flex items-center justify-center gap-4 group cursor-pointer border-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={2.5}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />

                <div className="flex items-center gap-3">
                  <span className="relative z-10">Add To Cart</span>
                  <span className="w-[1px] h-4 bg-white/20"></span>
                  <span className="text-[12px] font-black tracking-normal">
                    ${(Number(product.price?.sale_price || product.price?.amount || 0) * quantity).toFixed(2)}
                  </span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <Truck size={16} className="text-[#E63946]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/60">
                {product.tabs?.logistics?.shipping || "Standard Shipping Available"}
              </span>
            </div>
          </div>
        </div>

        {/* --- BOTTOM: Detail Tabs --- */}
        <div className="mt-20 mb-4 md:mt-32 max-w-[1216px] mx-auto">
          <div className="flex gap-8 md:gap-12 border-b border-white/[0.03] mb-12 overflow-x-auto no-scrollbar relative">
            {['DESCRIPTION', 'SPECIFICATIONS', 'LOGISTICS'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-5 text-[10px] font-black tracking-[0.3em] whitespace-nowrap transition-all duration-500 relative group bg-transparent border-none cursor-pointer ${activeTab === tab ? 'text-white' : 'text-white/20 hover:text-white/50'}`}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h3 className="text-2xl md:text-3xl judson-bold text-white mb-8 tracking-tight">Manifesto</h3>
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16">
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

            {/* Protocol Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 w-full">
              <div className="relative p-6 md:p-8 rounded-[2px] bg-[#0A0A0A] border border-white/[0.05] overflow-hidden">
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

      {/* --- FULLSCREEN LIGHTBOX --- */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsFullscreen(false)}
          >
            <button className="absolute top-5 right-5 md:top-10 md:right-10 text-white/40 hover:text-white transition-all group bg-transparent border-none cursor-pointer">
              <X size={40} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-500 w-8 h-8 md:w-10 md:h-10" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={mainDisplayImg}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              alt="Full view"
            />
            <div className="absolute bottom-10 text-white/20 text-[8px] md:text-[10px] font-black tracking-[0.5em] uppercase text-center px-4">
              {product.name} — Perspective {(productGallery.indexOf(mainDisplayImg) + 1).toString().padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProductDetails;