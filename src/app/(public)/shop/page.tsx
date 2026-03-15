/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import UniversalHero from '@/src/components/shared/Hero';
import ProductCard from '@/src/components/shared/ProductCard';
import Features from '@/src/components/shared/Features';

// ১. টাইপ ডিফিনিশন (TypeScript Error Fix)
interface ShopProduct {
    id: number | string;
    name: string;
    subtext: string;
    price: string;
    category: string;
    mainImage: string;
    hoverImage: string;
    tag?: string | null;
}

const CATEGORIES = ["ALL", "TEES", "HOODIES", "ACCESSORIES", "BUNDLES"];
const ITEMS_PER_PAGE = 8;

const ShopPage = () => {
    // স্টেট ডিফাইন করার সময় টাইপ বলে দেওয়া হয়েছে
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTime, setCurrentTime] = useState("");

    // ২. রিয়েল-টাইম ক্লক
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // ৩. Axios Fetching with ENV (Professional Error Handling)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
                const response = await axios.get(`${baseUrl}/data/product.json`);

                setProducts(response.data);
            } catch (err: any) {
                console.error("Fetch Error:", err);
                setError(err.response?.status === 404 ? "Product data file not found (404)." : "Failed to load products.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // ৪. ফিল্টারিং লজিক
    const filteredProducts = useMemo(() => {
        return selectedCategory === "ALL"
            ? products
            : products.filter(p => p.category === selectedCategory);
    }, [selectedCategory, products]);

    // ৫. পেজিনেশন লজিক
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const currentData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage, filteredProducts]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            const section = document.getElementById('products');
            section?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="bg-[#050505] min-h-screen pb-32 selection:bg-[#FF2E2E] selection:text-white">
            <UniversalHero
                tagline="Limited Drop"
                titleFirst='THE "VOID"'
                titleSecond="COLLECTION"
                bgText="SHOP"
                description="Premium heavyweight apparel engineered for the global island sound. Featuring high-density puff prints."
                buttonText="Explore Collection"
                buttonLink="#products"
                imageHero="/hero/herofff.jpg"
                imageProduct="/hero/image.png"
                targetDate="2026-11-20T00:00:00"
            />

            {/* ফিল্টার বার */}
            <section className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md border-y border-white/5 py-4">
                <div className="max-w-[1600px] mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 order-2 md:order-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF2E2E] animate-pulse"></div>
                        <span className="text-white/60 font-mono text-[10px] tracking-widest uppercase">
                            {currentTime || "00:00:00"} GMT
                        </span>
                    </div>

                    <nav className="flex items-center bg-zinc-900/40 p-1 rounded-full border border-white/5 overflow-x-auto max-w-full no-scrollbar order-1 md:order-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${selectedCategory === cat
                                    ? "bg-white text-black shadow-lg"
                                    : "text-zinc-500 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </nav>

                    <div className="hidden lg:block order-3">
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest italic">
                            Sector: 00{currentPage} / {totalPages.toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </section>

            <section id="products" className="py-16 px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto min-h-[600px]">
                {loading ? (
                    <div className="h-96 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="text-[#FF2E2E] animate-spin" size={40} />
                        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Fetching Data...</p>
                    </div>
                ) : error ? (
                    <div className="h-96 flex flex-col items-center justify-center gap-4 text-[#FF2E2E]">
                        <AlertCircle size={40} />
                        <p className="font-mono text-sm uppercase">{error}</p>
                    </div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-20"
                        >
                            <AnimatePresence mode='popLayout'>
                                {currentData.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <ProductCard {...product} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-28 flex items-center justify-center gap-3">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-zinc-500 hover:border-[#FF2E2E] hover:text-[#FF2E2E] disabled:opacity-20 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                        <button
                                            key={num}
                                            className={`w-12 h-12 rounded-full font-inter font-black text-xs transition-all duration-500 ${currentPage === num
                                                ? "bg-[#FF2E2E] text-white shadow-[0_0_20px_rgba(255,46,46,0.3)]"
                                                : "bg-zinc-900/50 text-zinc-500 border border-white/5 hover:border-white/20"
                                                }`}
                                            onClick={() => handlePageChange(num)}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-zinc-500 hover:border-[#FF2E2E] hover:text-[#FF2E2E] disabled:opacity-20 transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
            <Features />
        </main>
    );
};

export default ShopPage;