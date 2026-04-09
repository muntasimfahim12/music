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
    hoverImage?: string; // এটি অপশনাল করা হয়েছে যাতে এরর না দেয়
    tag?: string | null;
    category?: string;
}

const ProductCard = ({ name, subtext, price, mainImage, hoverImage, tag, category }: ProductProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col w-full bg-transparent cursor-pointer"
        >
            {/* --- Image Container (Luxury Square/Rectangular Look) --- */}
            <div className="relative aspect-[4/5] bg-[#0A0A0A] overflow-hidden border border-white/[0.03] transition-colors duration-700 group-hover:border-white/10">
                
                {/* Status Tag (Top-Left) */}
                {tag && (
                    <div className="absolute top-0 left-0 z-30">
                        <div className={`px-5 py-2 text-[9px] inter-bold uppercase tracking-[0.3em] backdrop-blur-md ${
                            tag.toUpperCase() === 'SOLD OUT' 
                            ? 'bg-zinc-900/90 text-zinc-500' 
                            : 'bg-[#FF2E2E] text-white shadow-[0_5px_15px_rgba(255,46,46,0.3)]'
                        }`}>
                            {tag}
                        </div>
                    </div>
                )}

                {/* Slow-Motion Image Transition */}
                <div className="absolute inset-0 z-10">
                    {/* Main Image */}
                    <img
                        src={mainImage}
                        alt={name}
                        className={`w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHovered && hoverImage ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
                        }`}
                        loading="lazy"
                    />
                    
                    {/* Hover Image (If exists) */}
                    {hoverImage && (
                        <img
                            src={hoverImage}
                            alt={`${name} alternative view`}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                isHovered ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                            }`}
                            loading="lazy"
                        />
                    )}
                </div>

                {/* Premium Dark Overlay on Hover */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Red Accent Animated Border (Bottom) */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF2E2E] z-30 group-hover:w-full transition-all duration-1000 ease-in-out shadow-[0_0_10px_#FF2E2E]" />
            </div>

            {/* --- Info Section --- */}
            <div className="mt-6 flex flex-col gap-2.5 px-0.5">
                <div className="flex justify-between items-start gap-4">
                    {/* Product Name - Judson Bold */}
                    <h3 className="text-zinc-100 text-[15px] md:text-[17px] judson-bold uppercase tracking-[0.03em] group-hover:text-white transition-colors duration-300 leading-tight flex-1">
                        {name}
                    </h3>
                    
                    {/* Price - Inter Semibold */}
                    <span className="text-white text-[15px] md:text-[17px] inter-semibold tracking-tighter shrink-0">
                        ${price}
                    </span>
                </div>
                
                <div className="flex items-center justify-between min-h-[20px]">
                    {/* Subtext & Category info */}
                    <div className="flex flex-col">
                        <p className="text-zinc-500 text-[9px] inter-medium uppercase tracking-[0.25em]">
                            {subtext}
                        </p>
                    </div>
                    
                    {/* View Collection - Slides up on Hover */}
                    <div className="overflow-hidden">
                        <motion.span 
                            initial={{ y: 25 }}
                            animate={{ y: isHovered ? 0 : 25 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[#FF2E2E] text-[9px] inter-bold uppercase tracking-[0.2em] flex items-center gap-1.5"
                        >
                            Explore <span className="text-[12px] translate-y-[0.5px]">→</span>
                        </motion.span>
                    </div>
                </div>
            </div>

            {/* Subtle Category Label (Optional, for SEO/UX) */}
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[8px] inter-bold text-zinc-700 tracking-[0.4em] uppercase">
                    Vault // {category || "Collection"}
                </span>
            </div>
        </motion.div>
    );
};

export default ProductCard;