/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Play, Youtube, Apple, Music2 } from 'lucide-react';
import Button from '../ui/button';

const LatestRelease = () => {
    return (
        <section className="w-full bg-[#050505] py-16 md:py-24 px-4 sm:px-6 md:px-12 flex justify-center items-center overflow-hidden">
            <div className="max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-[#0A0A0A] p-6 sm:p-10 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative group">

                <div className="absolute top-0 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#FF2E2E]/5 blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left"
                >
                    <div className="space-y-2 md:space-y-3">
                        <h2 className="text-white text-3xl judson-bold sm:text-5xl md:text-6xl font-[1000] uppercase tracking-tighter leading-[0.9] md:leading-none">
                            LATEST <span className="text-zinc-700">RELEASE</span>
                        </h2>
                        <h3 className="text-[#FF2E2E] judson-bold text-lg sm:text-xl md:text-2xl font-black uppercase tracking-[0.2em]">
                            CARIBBEAN FIRE
                        </h3>
                    </div>

                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 font-medium opacity-80">
                        A powerful fusion of traditional dancehall rhythms with modern production.
                        12 tracks that showcase the evolution of Caribbean sound for the global stage.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                        {/* BUY ALBUM Button */}
                        <div className="w-full sm:w-auto">
                            <Button
                                title="BUY ALBUM - $12.99"
                                variant="primary"
                                className="w-full sm:w-auto px-6 md:px-8 h-[45px] md:h-[50px] flex items-center justify-center text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] leading-none transition-all"
                            />
                        </div>

                        {/* ADD TO CART Button */}
                        <div className="w-full sm:w-auto">
                            <Button
                                title="ADD TO CART"
                                variant="outline"
                                className="w-full sm:w-auto px-6 md:px-8 h-[45px] md:h-[50px] flex items-center justify-center text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] leading-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Streaming Icons */}
                    <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-white/5">
                        <Music2 className="text-zinc-500 hover:text-[#FF2E2E] cursor-pointer transition-all duration-300 hover:scale-110" size={22} />
                        <Apple className="text-zinc-500 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" size={22} />
                        <Youtube className="text-zinc-500 hover:text-red-600 cursor-pointer transition-all duration-300 hover:scale-110" size={22} />
                        <span className="text-zinc-500 hover:text-white font-black text-xl cursor-pointer transition-all duration-300 hover:scale-110 italic">a</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-video lg:aspect-square xl:aspect-video rounded-2xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] order-1 lg:order-2"
                >
                    <img
                        src="/hero/LatestRelease.png"
                        alt="Latest Release"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer">
                        <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-16 h-16 md:w-24 md:h-24 bg-[#FF2E2E] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,46,46,0.4)]"
                        >
                            <Play className="text-white fill-current ml-1" size={32} />
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default LatestRelease;