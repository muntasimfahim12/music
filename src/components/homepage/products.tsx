"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from 'lucide-react';


interface Product {
    id: number;
    name: string;
    color: string;
    price: string;
    mainImage: string;
    hoverImage: string;
    tag: string | null;
}

const productData: Product[] = [
    {
        id: 1,
        name: 'NOCTURNAL VIBE TEE',
        color: 'Stone Washed Black',
        price: '$48.00',
        mainImage: '/hero/image.png',
        hoverImage: '/hero/img1.png',
        tag: 'NEW ARRIVAL'
    },
    {
        id: 2,
        name: 'OFFICIAL LOGO HOODIE',
        color: 'Crimson Red / Oversized',
        price: '$89.00',
        mainImage: '/hero/img.jpg',
        hoverImage: '/hero/imgt.jpg',
        tag: 'LIMITED'
    },
    {
        id: 3,
        name: 'URBAN SIGNATURE CAP',
        color: 'Matte Black Edition',
        price: '$32.00',
        mainImage: '/hero/img.jpg',
        hoverImage: '/hero/image.png',
        tag: 'SOLD OUT'
    },
    {
        id: 4,
        name: 'SONIC REVOLUTION VINYL',
        color: '12" Translucent Red',
        price: '$45.00',
        mainImage: '/hero/imgt.jpg',
        hoverImage: '/hero/image.png',
        tag: null
    }
];

const ModernAnimatedButton = ({ children, disabled }: { children: React.ReactNode, disabled?: boolean }) => {
    return (
        <div className={`relative group/btn p-[1px] overflow-hidden rounded-sm bg-zinc-800 ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
            <motion.div
                animate={{
                    background: [
                        "radial-gradient(circle at 0% 0%, #FF2E2E 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 0%, #FF2E2E 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, #FF2E2E 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 100%, #FF2E2E 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, #FF2E2E 0%, transparent 50%)",
                    ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
            />
            
            <div className="relative z-10 bg-black py-3 px-6 rounded-[inherit] flex items-center justify-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                {children}
            </div>
        </div>
    );
};

const ProductCard = ({ product }: { product: Product }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col w-full"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-[#0F0F0F] overflow-hidden rounded-sm border border-white/5">
                {product.tag && (
                    <div className={`absolute top-4 left-4 z-30 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] shadow-xl ${
                        product.tag === 'SOLD OUT' ? 'bg-zinc-800 text-zinc-400' : 'bg-[#FF2E2E] text-white'
                    }`}>
                        {product.tag}
                    </div>
                )}

                <div className="relative w-full h-full overflow-hidden">
                    <motion.img
                        src={product.mainImage}
                        alt={product.name}
                        animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.08 : 1 }}
                        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <motion.img
                        src={product.hoverImage}
                        alt={product.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.1 }}
                        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* Animated Quick Buy Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <div className="w-[85%]">
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                >
                                    <ModernAnimatedButton disabled={product.tag === 'SOLD OUT'}>
                                        <Plus size={14} strokeWidth={3} />
                                        <span>Quick Buy</span>
                                    </ModernAnimatedButton>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-6 flex flex-col gap-2 px-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-zinc-100 text-[13px] md:text-[15px] font-bold uppercase tracking-tight group-hover:text-[#FF2E2E] transition-colors duration-300">
                        {product.name}
                    </h3>
                    <span className="text-white text-[14px] md:text-[16px] font-black tracking-tighter">
                        {product.price}
                    </span>
                </div>
                <p className="text-zinc-500 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em]">
                    {product.color}
                </p>
            </div>
        </motion.div>
    );
};

const Products = () => {
    return (
        <section className="w-full bg-[#050505] py-24 md:py-32 px-6 md:px-12 lg:px-20">
            <div className="max-w-[1600px] mx-auto">
                {/* Modern Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/5 pb-8 gap-6">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-3"
                        >
                            <span className="w-6 h-[1px] bg-[#FF2E2E]"></span>
                            <span className="text-[#FF2E2E] text-[9px] md:text-[10px] font-bold tracking-[0.5em] uppercase">
                                Season 01 Collection
                            </span>
                        </motion.div>
                        <h2 className="text-white text-4xl md:text-5xl font-[1000] uppercase tracking-tighter leading-[1]">
                            HUMAN <span className="text-zinc-600">ARCHIVE</span> <br />
                            <span className="text-[14px] md:text-[16px] font-medium tracking-[0.1em] text-zinc-500 uppercase">
                                Designed for the modern movement
                            </span>
                        </h2>
                    </div>
                    
                    <motion.button 
                        whileHover={{ x: 5 }}
                        className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-all duration-300 py-1"
                    >
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] border-b border-zinc-800 group-hover:border-[#FF2E2E] pb-1">
                            Browse All
                        </span>
                        <ArrowRight size={14} className="group-hover:text-[#FF2E2E] transition-colors" />
                    </motion.button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {productData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* View All Collection Button for Mobile */}
                <div className="mt-20 md:hidden flex justify-center px-4">
                    <div className="w-full">
                        <ModernAnimatedButton>
                            View All Collection
                        </ModernAnimatedButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;