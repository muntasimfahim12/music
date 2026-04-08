"use client";

import React from 'react';
import { motion } from "framer-motion";
import Button from '../ui/button';

const Hero = () => {
  return (
    <section className="relative w-full max-w-[1920px] mx-auto mt-8 md:mt-0 h-[700px] md:h-[800px] bg-[#050505] flex flex-col md:flex-row items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND / IMAGE AREA --- */}
      <div className="relative md:absolute inset-0 w-full h-[45vh] md:h-full z-0">
        <div
          style={{
            backgroundImage: "url('/hero/hero.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: '65% 40%',
            backgroundRepeat: 'no-repeat',
          }}
          className="w-full h-full md:bg-[position:center_20%]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505] md:from-black/80 md:via-black/10 md:to-[#050505] opacity-95"></div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 pt-6 pb-4 md:py-0 md:pt-12">

        <div className="flex flex-col items-center text-center">

          {/* Main Title - DEEBZLENÜZ */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-[32px] sm:text-5xl md:text-[75px] lg:text-[95px] font-black tracking-tighter leading-[0.85] uppercase select-none"
          >
            DEEBZLENÜZ
          </motion.h1>

          {/* Sub Title - OFFICIAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h2 className="text-[#FF2E2E] text-[42px] sm:text-7xl md:text-[85px] lg:text-[105px] font-black tracking-tighter leading-[0.85] uppercase select-none">
              OFFICIAL
            </h2>
            <div className="absolute inset-0 text-[#FF2E2E] blur-2xl opacity-10 pointer-events-none">
              OFFICIAL
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 text-zinc-400 text-[9px] sm:text-xs md:text-lg font-medium tracking-[0.25em] max-w-2xl px-6 uppercase"
          >
            Music as Movement. Independent but Powerful.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 md:mt-8 flex flex-row items-center justify-center gap-3 md:gap-6 w-full px-4"
          >
            <Button title="LISTEN NOW" variant="primary" />
            <Button title="STREAM NOW" variant="outline" />
          </motion.div>

        </div>
      </div>

      {/* Explore Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
        <span className="text-[7px] text-zinc-600 tracking-[0.5em] uppercase">Explore</span>
        <div className="w-[1px] h-6 bg-zinc-800"></div>
      </div>

    </section>
  );
};

export default Hero;