/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from 'lucide-react';
import { showCartToast } from './ToastProvider'; // পাথটি ঠিকভাবে চেক করে নিও

export interface ProductProps {
    id: number | string;
    name: string;
    subtext: string; 
    price: string;
    mainImage: string;
    hoverImage: string;
    tag?: string | null;
}

const QuickBuyButton = ({ disabled, onClick }: { disabled?: boolean, onClick?: () => void }) => (
    <div 
        onClick={(e) => {
            e.stopPropagation();
            if(!disabled && onClick) onClick();
        }}
        className={`relative group/btn p-[1px] overflow-hidden rounded-sm bg-zinc-900 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
        <motion.div
            animate={{
                background: [
                    "radial-gradient(circle at 0% 0%, #FF2E2E 0%, transparent 55%)",
                    "radial-gradient(circle at 100% 0%, #FF2E2E 0%, transparent 55%)",
                    "radial-gradient(circle at 100% 100%, #FF2E2E 0%, transparent 55%)",
                    "radial-gradient(circle at 0% 100%, #FF2E2E 0%, transparent 55%)",
                ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-100%] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
        />
        <div className="relative z-10 bg-black py-3.5 px-6 rounded-[inherit] flex items-center justify-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.2em] font-inter">
            <Plus size={14} strokeWidth={3} />
            <span>Quick Buy</span>
        </div>
    </div>
);

const ProductCard = (product: ProductProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = () => {
        if (product.tag !== 'SOLD OUT') {
            showCartToast(product.name);
        }
    };

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col w-full"
        >
            {/* Image Container - Fixed Image Loading */}
            <div className="relative aspect-[4/5] bg-[#0A0A0A] overflow-hidden rounded-sm border border-white/5">
                {product.tag && (
                    <div className={`absolute top-4 left-4 z-30 px-3 py-1 text-[9px] font-inter font-black uppercase tracking-[0.2em] shadow-2xl ${
                        product.tag === 'SOLD OUT' ? 'bg-zinc-800 text-zinc-500' : 'bg-[#FF2E2E] text-white'
                    }`}>
                        {product.tag}
                    </div>
                )}

                {/* Main Images with Smooth Transition */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={product.mainImage}
                        alt={product.name}
                        style={{
                            opacity: isHovered ? 0 : 0.8,
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
                        }}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                    />
                    <img
                        src={product.hoverImage}
                        alt={product.name}
                        style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'scale(1)' : 'scale(1.05)',
                            transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* Quick Buy Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 px-4 z-20">
                    <div className="w-full">
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 15, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                >
                                    <QuickBuyButton 
                                        disabled={product.tag === 'SOLD OUT'} 
                                        onClick={handleAddToCart}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="mt-6 flex flex-col gap-1.5 px-1">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-zinc-100 text-[14px] md:text-[15px] font-judson font-bold uppercase tracking-tight group-hover:text-[#FF2E2E] transition-colors duration-300 leading-tight">
                        {product.name}
                    </h3>
                    <span className="text-white text-[14px] md:text-[15px] font-inter font-black tracking-tighter italic shrink-0">
                        {product.price}
                    </span>
                </div>
                <p className="text-zinc-500 text-[10px] md:text-[11px] font-inter font-bold uppercase tracking-[0.2em]">
                    {product.subtext}
                </p>
            </div>
        </motion.div>
    );
};

export default ProductCard;