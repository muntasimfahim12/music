"use client";

import React from 'react';
import { motion } from "framer-motion";

const Join = () => {
  return (
    <section className="w-full bg-[#050505] py-24 px-6 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF2E2E]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl md:text-6xl judson-bold font-[1000] uppercase tracking-tighter mb-6"
        >
          JOIN THE MOVEMENT
        </motion.h2>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
        >
          Get exclusive access to new releases, behind-the-scenes content, and 
          special offers. Be part of the global Caribbean music revolution.
        </motion.p>

        {/* Newsletter Form */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full sm:flex-1 bg-zinc-900/50 border border-zinc-800 text-white px-6 py-4 rounded-sm focus:outline-none focus:border-[#FF2E2E] transition-all placeholder:text-zinc-600 font-medium"
            required
          />
          <button 
            type="submit"
            className="w-full sm:w-auto bg-[#FF2E2E] text-white px-10 py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
          >
            SUBSCRIBE
          </button>
        </motion.form>

        {/* Tiny Trust Text */}
        <p className="mt-6 text-[10px] text-zinc-600 uppercase tracking-widest">
          No spam. Just pure movement.
        </p>
      </div>
    </section>
  );
};

export default Join;