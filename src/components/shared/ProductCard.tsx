/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";

export interface ProductProps {
    id: number | string;
    name: string;
    subtext: string; 
    price: string;
    mainImage: string;
    hoverImage: string;
    tag?: string | null;
}

const ProductCard = (product: ProductProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col w-full bg-transparent"
        >
            {/* Image Container - No Rounded Corners for High-End Look */}
            <div className="relative aspect-[4/5] bg-[#080808] overflow-hidden border border-white/[0.05] transition-colors duration-700 group-hover:border-white/10">
                
                {/* Luxury Tag - Inter Bold */}
                {product.tag && (
                    <div className="absolute top-0 left-0 z-30">
                        <div className={`px-5 py-2 text-[9px] inter-bold uppercase tracking-[0.3em] backdrop-blur-md ${
                            product.tag === 'SOLD OUT' 
                            ? 'bg-zinc-900/90 text-zinc-500' 
                            : 'bg-[#FF2E2E] text-white shadow-2xl'
                        }`}>
                            {product.tag}
                        </div>
                    </div>
                )}

                {/* Slow-Motion Image Transition */}
                <div className="absolute inset-0 z-10">
                    <img
                        src={product.mainImage}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
                        }`}
                    />
                    <img
                        src={product.hoverImage}
                        alt={product.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHovered ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                        }`}
                    />
                </div>

                {/* Premium Dark Overlay on Hover */}
                <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Red Accent Line - Bottom Animated */}
                <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF2E2E] z-30 group-hover:w-full transition-all duration-1000 ease-in-out" />
            </div>

            {/* Info Section - Using Provided Custom Classes */}
            <div className="mt-6 flex flex-col gap-2 px-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-zinc-100 text-[14px] md:text-[16px] judson-bold uppercase tracking-[0.05em] group-hover:text-white transition-colors duration-300 leading-tight max-w-[70%]">
                        {product.name}
                    </h3>
                    
                    {/* Price with Dollar Sign - Inter Semibold */}
                    <span className="text-white text-[14px] md:text-[16px] inter-semibold tracking-tighter">
                        ${product.price}
                    </span>
                </div>
                
                <div className="flex items-center justify-between">
                    {/* Subtext - Inter Medium */}
                    <p className="text-zinc-500 text-[10px] inter-medium uppercase tracking-[0.25em]">
                        {product.subtext}
                    </p>
                    
                    {/* View Collection - Hidden by default, slides in on hover */}
                    <div className="overflow-hidden">
                        <motion.span 
                            animate={{ y: isHovered ? 0 : 25 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="text-[#FF2E2E] text-[9px] inter-bold uppercase tracking-[0.2em] flex items-center gap-1"
                        >
                            Explore →
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;