/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const RelatedProduct = () => {
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await axios.get('/data/product.json');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching related products:", error);
                setLoading(false);
            }
        };
        fetchRelatedProducts();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth 
                : scrollLeft + clientWidth;
            
            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    if (loading) return null;

    return (
        <section 
            className="mx-auto mt-10 mb-10 pt-4 relative overflow-hidden"
            style={{ maxWidth: '1250px' }}
        >
            {/* --- Section Header (Centered Title) --- */}
            <div className="relative flex items-center justify-center mb-10 px-2">
                <h2 className="text-white text-center text-3xl md:text-4xl tracking-tight judson-bold">
                    You Might Also Like
                </h2>

                {/* --- Absolute Positioned Controls (Right Side) --- */}
                <div className="absolute right-2 flex gap-2">
                    <button 
                        onClick={() => scroll('left')}
                        className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* --- Horizontal Scroll Container --- */}
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 px-2 no-scrollbar snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <AnimatePresence>
                    {products.map((product: any, index: number) => (
                        <motion.div 
                            key={product.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            onClick={() => router.push(`/shop/${product.id}`)}
                            className="min-w-[280px] md:min-w-[300px] snap-start group cursor-pointer"
                        >
                            {/* --- Product Image --- */}
                            <div className="relative aspect-[1/1.2] overflow-hidden rounded-xl bg-[#0F0F0F] mb-4">
                                {product.tag && (
                                    <div className="absolute top-3 left-3 z-20">
                                        <div className="bg-[#FF2E2E] text-white px-2.5 py-1 text-[9px] inter-bold uppercase tracking-widest rounded-sm shadow-lg">
                                            {product.tag}
                                        </div>
                                    </div>
                                )}
                                
                                <img 
                                    src={product.mainImage} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* --- Product Info (Centered as well for better symmetry) --- */}
                            <div className="text-left px-1">
                                <h4 className="text-white text-[15px] judson-bold tracking-wide mb-1 group-hover:text-zinc-400 transition-colors">
                                    {product.name}
                                </h4>
                                <p className="text-zinc-500 text-sm inter-medium">
                                    ${typeof product.price === 'object' 
                                        ? (product.price.sale_price || product.price.amount).toFixed(2) 
                                        : Number(product.price).toFixed(2)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -webkit-overflow-scrolling: touch; }
            `}</style>
        </section>
    );
};

export default RelatedProduct;