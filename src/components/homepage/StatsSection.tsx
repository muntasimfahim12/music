"use client";

import React from 'react';
import { motion } from "framer-motion";
import Button from '../ui/button';

const stats = [
  {
    label: "SONGS RELEASED", 
    value: "50+",
    color: "text-[#FF2E2E]",
  },
  {
    label: "ALBUMS",
    value: "8",
    color: "text-white",
  },
  {
    label: "YEARS ACTIVE",
    value: "10+",
    color: "text-white",
  },
];

const StatsSection = () => {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden border-t border-white/5">

      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '45px 45px'
        }}>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">

          {/* Left Content: Support Independent Music */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <h2 className="text-white text-3xl md:text-5xl font-[1000] uppercase tracking-tighter">
                SUPPORT INDEPENDENT MUSIC
              </h2>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
                Help keep Caribbean music alive and thriving. Your support directly funds
                new music production, music videos, and live performances.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button
                title="DONATE NOW"
                variant="premium"
               
              />
            </div>
          </motion.div>

          {/* Right Content: Stats Grid */}
          <div className="flex-1 w-full max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-1"
                >
                  <h3 className={`${stat.color} text-5xl md:text-6xl font-[1000] tracking-tighter uppercase leading-none`}>
                    {stat.value}
                  </h3>
                  <p className="text-zinc-500 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent"></div>
    </section>
  );
};

export default StatsSection;