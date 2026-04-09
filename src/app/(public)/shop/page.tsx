/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import UniversalHero from '@/src/components/shared/Hero';
import ProductCard from '@/src/components/shared/ProductCard';
import Features from '@/src/components/shared/Features';
import api from '../../../lib/axios';

const API_URL = (process.env.NEXT_PUBLIC_API_URL as string) || "http://localhost:5000/api/v1";
const BASE_URL = API_URL.replace('/api/v1', '');

interface ShopProduct {
    _id: string;
    name: string;
    slug: string;
    subtext: string;
    price: {
        amount?: number;
        currency?: string;
        sale_price?: number;
    };
    category: string;
    mainImage: string;
    hoverImage?: string;
    tag?: string;
    inventory?: any;
}

const CATEGORIES = ["ALL", "TEES", "HOODIES", "ACCESSORIES", "BUNDLES"];
const ITEMS_PER_PAGE = 8;

const ShopPage = () => {
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTime, setCurrentTime] = useState<string>("");

    // --- Real-time Clock ---
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
        };
        updateClock(); // Initial call
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    // --- Fetch Products from Backend ---
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get('/products');

                if (response.data?.success) {
                    setProducts(response.data.data);
                } else {
                    setProducts(Array.isArray(response.data) ? response.data : []);
                }
            } catch (err: any) {
                console.error("Fetch Error:", err);
                setError("FAILED TO SYNC WITH VAULT. CHECK CONNECTION.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // --- Filter Logic ---
    const filteredProducts = useMemo(() => {
        return selectedCategory === "ALL"
            ? products
            : products.filter(p => p.category?.toUpperCase() === selectedCategory.toUpperCase());
    }, [selectedCategory, products]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

    // --- Pagination Logic ---
    const currentData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage, filteredProducts]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            const productElement = document.getElementById('products');
            if (productElement) {
                productElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <main className="bg-[#050505] min-h-screen pb-32 selection:bg-[#FF2E2E] selection:text-white font-sans">
            <UniversalHero
                tagline="Limited Drop"
                titleFirst='THE "OFFICIAL"'
                titleSecond="COLLECTION"
                bgText="VAULT"
                description="Premium heavyweight apparel engineered for the luxury aesthetic. High-density materials curated for DEEBZLENÜZ."
                buttonText="Explore Collection"
                buttonLink="#products"
                imageHero="/hero/herofff.jpg"
                imageProduct="/hero/image.png"
                targetDate="2026-11-20T00:00:00"
            />

            {/* --- Filter Navigation Bar --- */}
            <section className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-y border-white/5 py-4">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Time & Status */}
                    <div className="flex items-center gap-3 order-2 md:order-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF2E2E] animate-pulse shadow-[0_0_10px_#FF2E2E]"></div>
                        <span className="text-white/60 font-mono text-[10px] tracking-[0.2em] uppercase inter-medium">
                            {currentTime || "00:00:00"} GMT+6
                        </span>
                    </div>

                    {/* Categories Nav */}
                    <nav className="flex items-center bg-zinc-900/40 p-1.5 rounded-full border border-white/5 overflow-x-auto no-scrollbar order-1 md:order-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 whitespace-nowrap inter-bold ${selectedCategory === cat
                                    ? "bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
                                    : "text-zinc-500 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </nav>

                    {/* Sector/Page Info */}
                    <div className="hidden lg:block order-3">
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] italic inter-medium">
                            Sector: 00{currentPage} / {totalPages.toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </section>

            {/* --- Product Grid Section --- */}
            <section id="products" className="py-20 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto min-h-[700px]">
                {loading ? (
                    <div className="h-[500px] flex flex-col items-center justify-center gap-6">
                        <Loader2 className="text-[#FF2E2E] animate-spin" size={48} strokeWidth={1} />
                        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">Syncing Inventory...</p>
                    </div>
                ) : error ? (
                    <div className="h-[500px] flex flex-col items-center justify-center gap-4 text-[#FF2E2E] border border-[#FF2E2E]/20 rounded-3xl bg-[#FF2E2E]/5">
                        <AlertCircle size={40} strokeWidth={1.5} />
                        <p className="font-mono text-xs uppercase tracking-widest">{error}</p>
                    </div>
                ) : currentData.length === 0 ? (
                    <div className="h-[400px] flex flex-col items-center justify-center text-zinc-600">
                        <p className="font-judson-bold text-2xl uppercase tracking-widest">No Items Found</p>
                        <p className="text-[10px] uppercase tracking-widest mt-2 inter-medium text-zinc-700">Check back later for new releases</p>
                    </div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-24"
                        >
                            <AnimatePresence mode='popLayout'>
                                {currentData.map((product) => {
                                    let displayPrice = "0";
                                    if (product.price && typeof product.price === 'object') {
                                        displayPrice = product.price.sale_price
                                            ? product.price.sale_price.toString()
                                            : (product.price.amount ? product.price.amount.toString() : "0");
                                    } else if (typeof product.price === 'number' || typeof product.price === 'string') {
                                        displayPrice = (product.price as any).toString();
                                    }

                                    const mainImg = product.mainImage
                                        ? (product.mainImage.startsWith('http') ? product.mainImage : `${BASE_URL}${product.mainImage}`)
                                        : "/placeholder.jpg";

                                    const hoverImg = product.hoverImage
                                        ? (product.hoverImage.startsWith('http') ? product.hoverImage : `${BASE_URL}${product.hoverImage}`)
                                        : mainImg;

                                    return (
                                        <motion.div
                                            key={product._id}
                                            layout
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <Link href={`/shop/${product.slug}`} className="group">
                                                <ProductCard
                                                    id={product._id}
                                                    name={product.name}
                                                    subtext={product.subtext}
                                                    price={displayPrice}
                                                    mainImage={mainImg}
                                                    hoverImage={hoverImg}
                                                    tag={product.tag}
                                                    category={product.category}
                                                />
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>

                        {/* --- Pagination --- */}
                        {totalPages > 1 && (
                            <div className="mt-32 flex items-center justify-center gap-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:border-[#FF2E2E] hover:text-[#FF2E2E] disabled:opacity-10 transition-all duration-500 cursor-pointer group"
                                >
                                    <ChevronLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                                </button>

                                <div className="flex gap-3">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                        <button
                                            key={num}
                                            className={`w-14 h-14 rounded-full font-mono text-[11px] font-black transition-all duration-700 cursor-pointer ${currentPage === num
                                                ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                                : "bg-zinc-900/30 text-zinc-600 border border-white/5 hover:border-white/20"
                                                }`}
                                            onClick={() => handlePageChange(num)}
                                        >
                                            {num.toString().padStart(2, '0')}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:border-[#FF2E2E] hover:text-[#FF2E2E] disabled:opacity-10 transition-all duration-500 cursor-pointer group"
                                >
                                    <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            <Features />
        </main >
    );
};

export default ShopPage;