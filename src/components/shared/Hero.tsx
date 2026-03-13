/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowRight, IconBolt } from "@tabler/icons-react";
import Link from 'next/link';

interface HeroProps {
    tagline: string;
    titleFirst: string;
    titleSecond: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageHero: string;
    imageProduct: string;
    targetDate: string;
    bgText?: string;
}

const calculateTimeLeft = (targetDate: string) => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return { days: '00', hours: '00', mins: '00' };
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
        mins: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
    };
};

const TimerBlock = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-[#1a1a1a]/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.span
                    key={value}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-white text-lg md:text-2xl font-bold font-mono tracking-tighter"
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </div>
        <span className="text-zinc-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] mt-2 font-inter">
            {label}
        </span>
    </div>
);

const UniversalHero = ({
    tagline, titleFirst, titleSecond, description,
    buttonText, buttonLink, imageHero, imageProduct,
    targetDate, bgText
}: HeroProps) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <section className="relative w-full min-h-screen lg:min-h-[90vh] bg-black flex items-center justify-center py-12 md:py-20 px-4 md:px-12 overflow-hidden">

            {/* Background Hero Image with Dynamic Mask */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.45 }}
                    transition={{ duration: 1.5 }}
                    src={imageHero}
                    alt="background"
                    className="w-full h-full object-cover grayscale"
                />
                {/* Gradient Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black lg:bg-gradient-to-r lg:from-black lg:via-black/60 lg:to-transparent" />
            </div>

            <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">

                {/* LEFT SIDE: CONTENT */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1">
                    
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF2E2E]/10 rounded-full border border-[#FF2E2E]/20"
                    >
                        <IconBolt size={14} className="text-[#FF2E2E] fill-[#FF2E2E]" />
                        <span className="text-[#FF2E2E] font-inter font-black uppercase tracking-[0.25em] text-[9px] md:text-[10px]">
                            {tagline}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-white text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-judson leading-[1.05] tracking-tight"
                    >
                        {titleFirst} <br />
                        <span className="italic opacity-90">{titleSecond}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-zinc-400 font-inter text-sm md:text-base lg:text-lg max-w-md leading-relaxed font-light"
                    >
                        {description}
                    </motion.p>

                    {/* TIMER SECTION */}
                    <div className="flex gap-3 md:gap-5">
                        <TimerBlock value={timeLeft.days} label="DAYS" />
                        <TimerBlock value={timeLeft.hours} label="HOURS" />
                        <TimerBlock value={timeLeft.mins} label="MINS" />
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="pt-4"
                    >
                        <Link
                            href={buttonLink}
                            className="group relative inline-flex items-center gap-4 bg-white text-black px-8 md:px-12 py-4 md:py-5 rounded-full font-inter font-black uppercase text-[10px] md:text-[11px] tracking-[0.15em] hover:bg-[#FF2E2E] hover:text-white transition-all duration-500 shadow-2xl shadow-white/5"
                        >
                            {buttonText}
                            <IconArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-2" />
                        </Link>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: PRODUCT IMAGE */}
                <div className="relative flex justify-center items-center order-1 lg:order-2 mt-8 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full max-w-[320px] md:max-w-[450px] aspect-square group"
                    >
                        {/* Glass Container */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 shadow-[0_0_100px_rgba(255,46,46,0.1)] transition-transform duration-700 group-hover:scale-[1.02]" />
                        
                        <img
                            src={imageProduct}
                            alt="featured product"
                            className="relative z-10 w-full h-full object-contain p-8 md:p-12 drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3"
                        />
                        
                        {/* Background Floating Element */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF2E2E]/20 blur-[80px] rounded-full animate-pulse" />
                    </motion.div>
                </div>

            </div>

            {/* Background Text Overlay (Optional) */}
            {bgText && (
                <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none translate-y-1/2 opacity-[0.03]">
                    <h2 className="text-[15vw] font-judson font-bold uppercase whitespace-nowrap leading-none">
                        {bgText} {bgText} {bgText}
                    </h2>
                </div>
            )}
        </section>
    );
};

export default UniversalHero;