/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Play } from 'lucide-react';
import Button from '../ui/button';

const Hero = () => {
  return (
    <section className="relative mt-18 w-full h-screen md:h-[800px] bg-[#050505] flex items-center justify-center overflow-hidden">
      
   
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero/hero.jpeg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%', 
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-[#050505] opacity-80"></div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]"></div> 
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 pt-16 md:pt-24">
        
        <div className="flex flex-col items-center text-center">
          
          {/* Main Title - DEEBZLENÜZ (Size Slightly Reduced as requested) */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl sm:text-6xl md:text-[100px] lg:text-[130px] font-black tracking-tighter leading-[0.85] uppercase select-none drop-shadow-2xl"
          >
            DEEBZLENÜZ
          </motion.h1>

          {/* Sub Title - OFFICIAL (Size Slightly Reduced) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h2 className="text-[#FF2E2E] text-5xl sm:text-8xl md:text-[110px] lg:text-[140px] font-black tracking-tighter leading-[0.85] uppercase select-none">
              OFFICIAL
            </h2>
            {/* Subtle Glow */}
            <div className="absolute inset-0 text-[#FF2E2E] blur-3xl opacity-10 pointer-events-none">
              OFFICIAL
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 text-zinc-400 text-xs sm:text-sm md:text-xl font-medium tracking-[0.2em] max-w-2xl px-6"
          >
            Music as Movement. Independent but Powerful.
          </motion.p>

          {/* Action Buttons - Fully Responsive Layout */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-row items-center justify-center gap-3 md:gap-6 w-full px-4"
          >
            <Button title="LISTEN NOW" variant="primary"></Button>

            {/* STREAM NOW */}
           <Button title="STREAM NOW" variant="outline" />
          </motion.div>

        </div>
      </div>

      {/* Explore Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[8px] text-zinc-600 tracking-[0.5em] uppercase">Explore</span>
        <div className="w-[1px] h-8 bg-zinc-800"></div>
      </div>

    </section>
  );
};

export default Hero;