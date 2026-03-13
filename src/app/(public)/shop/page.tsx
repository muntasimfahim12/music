"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import UniversalHero from '@/src/components/shared/Hero';
import ProductCard from '@/src/components/shared/ProductCard';

interface ShopProduct {
    id: number | string;
    name: string;
    subtext: string; 
    price: string;
    mainImage: string;
    hoverImage: string;
    category: string;
    tag?: string | null;
    onClick?: () => void;
}

const shopProducts: ShopProduct[] = [
    {
        id: 1,
        name: 'NOCTURNAL VIBE TEE',
        subtext: 'Stone Washed Black',
        price: '$48.00',
        category: 'TEES',
        mainImage: '/hero/image.png',
        hoverImage: '/hero/img1.png',
        tag: 'NEW ARRIVAL',
        onClick: () => console.log("Added to cart!")
    },
    {
        id: 2,
        name: 'OFFICIAL LOGO HOODIE',
        subtext: 'Crimson Red / Oversized',
        price: '$89.00',
        category: 'HOODIES',
        mainImage: '/hero/img.jpg',
        hoverImage: '/hero/imgt.jpg',
        tag: 'LIMITED',
        onClick: () => console.log("Added to cart!")
    },
    {
        id: 3,
        name: 'URBAN SIGNATURE CAP',
        subtext: 'Matte Black Edition',
        price: '$32.00',
        category: 'ACCESSORIES',
        mainImage: '/hero/img.jpg',
        hoverImage: '/hero/image.png',
        tag: 'SOLD OUT',
        onClick: () => console.log("Sold out!")
    },
    {
        id: 4,
        name: 'SONIC REVOLUTION VINYL',
        subtext: '12" Translucent Red',
        price: '$45.00',
        category: 'BUNDLES',
        mainImage: '/hero/imgt.jpg',
        hoverImage: '/hero/image.png',
        tag: null,
        onClick: () => console.log("Added to cart!")
    },
    {
        id: 5,
        name: 'VOID OVERSIZED HOODIE',
        subtext: 'Carbon Gray',
        price: '$95.00',
        category: 'HOODIES',
        mainImage: '/hero/img.jpg',
        hoverImage: '/hero/image.png',
        tag: 'POPULAR',
        onClick: () => console.log("Added to cart!")
    },
     {
        id: 6,
        name: 'URBAN SIGNATURE CAP',
        subtext: 'Matte Black Edition',
        price: '$32.00',
        category: 'ACCESSORIES',
        mainImage: '/hero/img.jpg',
        hoverImage: '/hero/image.png',
        tag: 'SOLD OUT',
        onClick: () => console.log("Sold out!")
    },
    {
        id: 7,
        name: 'GRAPHIC LOGO TEE',
        subtext: 'Vintage White',
        price: '$42.00',
        category: 'TEES',
        mainImage: '/hero/image.png',
        hoverImage: '/hero/img1.png',
        tag: null,
        onClick: () => console.log("Added to cart!")
    }
    ,
      {
        id: 8,
        name: 'NOCTURNAL VIBE TEE',
        subtext: 'Stone Washed Black',
        price: '$48.00',
        category: 'TEES',
        mainImage: '/hero/image.png',
        hoverImage: '/hero/img1.png',
        tag: 'NEW ARRIVAL',
        onClick: () => console.log("Added to cart!")
    },
    
];

const categories = ["ALL", "TEES", "HOODIES", "ACCESSORIES", "BUNDLES"];

const ShopPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [currentTime, setCurrentTime] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const filteredProducts = selectedCategory === "ALL" 
        ? shopProducts 
        : shopProducts.filter(p => p.category === selectedCategory);

    return (
        <main className="bg-[#050505] min-h-screen pb-32 selection:bg-[#FF2E2E] selection:text-white">
            
            <UniversalHero
                tagline="Limited Drop"
                titleFirst='THE "VOID"'
                titleSecond="COLLECTION"
                bgText="SHOP"
                description="Premium heavyweight apparel engineered for the global island sound. Featuring high-density puff prints and oversized street-ready fits. Each piece is a part of the Deebzlenüz legacy."
                buttonText="View All Products"
                buttonLink="#products" 
                imageHero="/hero/herofff.jpg" 
                imageProduct="/hero/image.png" 
                targetDate="2026-11-20T00:00:00" 
            />

            {/* মডার্ন ক্যাটাগরি ফিল্টার বার */}
            <section className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-y border-white/5 py-5">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FF2E2E] animate-pulse"></div>
                        <span className="text-white font-inter font-black text-[11px] tracking-widest uppercase">
                            {currentTime} GMT
                        </span>
                    </div>

                    <nav className="flex items-center bg-zinc-900/50 p-1 rounded-full border border-white/5">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`px-6 py-2 rounded-full text-[10px] font-inter font-black uppercase tracking-widest transition-all duration-500 ${
                                    selectedCategory === cat 
                                    ? "bg-white text-black shadow-xl" 
                                    : "text-zinc-500 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-2">
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Sort by:</span>
                        <span className="text-white text-[10px] font-black uppercase tracking-widest cursor-pointer">Newest</span>
                    </div>
                </div>
            </section>

            <section id="products" className="py-20 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="py-40 text-center">
                        <p className="text-zinc-600 font-judson text-2xl italic">No artifacts found in this sector.</p>
                    </div>
                )}

                {/* মডার্ন পেজিনেশন বাটন */}
                <div className="mt-24 flex items-center justify-center gap-4">
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:border-[#FF2E2E] hover:text-[#FF2E2E] transition-all duration-300">
                        <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex gap-2">
                        {[1, 2].map((num) => (
                            <button 
                                key={num}
                                className={`w-12 h-12 rounded-full font-inter font-black text-xs transition-all duration-500 ${
                                    currentPage === num 
                                    ? "bg-[#FF2E2E] text-white shadow-[0_0_25px_rgba(255,46,46,0.4)]" 
                                    : "bg-zinc-900 text-zinc-500 border border-white/5 hover:border-white/20"
                                }`}
                                onClick={() => setCurrentPage(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>

                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:border-[#FF2E2E] hover:text-[#FF2E2E] transition-all duration-300">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </section>
        </main>
    );
};

export default ShopPage;