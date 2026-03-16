/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// --- Single Product Card Component ---
const ProductCard = ({ product }: { product: any }) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const mainImg = product.mainImage;
    const hoverImg = product.hoverImage || product.mainImage;

    const displayPrice = typeof product.price === 'object'
        ? (product.price.sale_price || product.price.amount)
        : product.price;

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => router.push(`/shop/${product.id}`)}
            className="group relative flex flex-col w-full cursor-pointer"
        >
            {/* Image Box */}
            <div className="relative aspect-[4/5] bg-[#0F0F0F] overflow-hidden rounded-sm border border-white/5">
                {product.tag && (
                    <div className={`absolute top-3 left-3 z-30 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${
                        product.tag === 'SOLD OUT' ? 'bg-zinc-800 text-zinc-400' : 'bg-[#FF2E2E] text-white'
                    }`}>
                        {product.tag}
                    </div>
                )}

                <div className="relative w-full h-full">
                    <motion.img
                        src={mainImg}
                        alt={product.name}
                        animate={{ opacity: isHovered && product.hoverImage ? 0 : 1, scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {product.hoverImage && (
                        <motion.img
                            src={hoverImg}
                            alt={product.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.05 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-4 flex flex-col items-center text-center">
                <h3 className="text-zinc-100 text-[13px] md:text-[14px] font-semibold tracking-tight group-hover:text-[#FF2E2E] transition-colors duration-300">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider">
                        {product.color || "Original"}
                    </span>
                    <span className="text-white text-[13px] font-bold">
                        ${displayPrice}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

// --- Main Products Component ---
const Products = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/data/product.json');
                setProducts(response.data.slice(0, 4));
                setLoading(false);
            } catch (error) {
                console.error("Error loading products:", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return null;

    return (
        /* pt-0 ব্যবহার করা হয়েছে যাতে উপরের সেকশনের সাথে লেগে থাকে এবং গ্যাপ না থাকে */
        <section className="w-full bg-[#050505] pt-0 pb-16 px-6 lg:px-20">
            <div className="max-w-[1300px] mx-auto">

                {/* --- Compact Centered Header --- */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-6 h-[1px] bg-[#FF2E2E]"></span>
                        <span className="text-[#FF2E2E] text-[9px] font-bold tracking-[0.4em] uppercase">
                            New Arrival
                        </span>
                        <span className="w-6 h-[1px] bg-[#FF2E2E]"></span>
                    </div>

                    <h2 className="text-white text-3xl md:text-5xl font-bold judson-bold tracking-tighter leading-tight">
                        Human Archive
                    </h2>

                    <p className="text-zinc-500 text-[10px] md:text-xs font-medium tracking-widest uppercase mt-3">
                        Designed for the modern movement
                    </p>
                </div>

                {/* --- Grid Layout --- */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* --- Modern Premium Explore Button --- */}
                <div className="mt-12 flex justify-center">
                    <motion.button
                        onClick={() => router.push('/shop')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center justify-center px-10 py-4 cursor-pointer overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-zinc-900/50 group-hover:bg-white transition-colors duration-500 ease-in-out" />

                        <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-[#FF2E2E]"
                            initial={{ width: "20%" }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.4 }}
                        />

                        <div className="relative z-10 flex items-center gap-3">
                            <span className="text-white group-hover:text-black text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-500">
                                View Collection
                            </span>
                            <div className="relative flex items-center justify-center">
                                <ArrowRight
                                    size={14}
                                    className="text-[#FF2E2E] group-hover:text-black group-hover:translate-x-1 transition-all duration-500 ease-out"
                                />
                            </div>
                        </div>

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[#FF2E2E] blur-2xl transition-opacity duration-500" />
                    </motion.button>
                </div>

            </div>
        </section>
    );
};

export default Products;