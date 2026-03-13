"use client";

import React from 'react';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const featureData = [
  {
    icon: <Truck className="w-5 h-5 text-[#FF2E2E]" />,
    title: "WORLDWIDE SHIPPING",
    description: "Fast & reliable shipping to over 150 countries. Free shipping on orders over $100."
  },
  {
    icon: <RotateCcw className="w-5 h-5 text-[#FF2E2E]" />,
    title: "EASY RETURNS",
    description: "30-day return policy for unworn items. Hassle-free exchanges for size issues."
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#FF2E2E]" />,
    title: "SECURE CHECKOUT",
    description: "100% secure payment processing with SSL encryption. We accept all major cards."
  }
];

const Features = () => {
  return (
    <section className="bg-[#050505] py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {featureData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              {/* আইকন কন্টেইনার - স্ক্রিনশটের মতো গোল এবং ডার্ক */}
              <div className="relative mb-8">
                <div className="w-12 h-12 rounded-full bg-zinc-900/80 border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-[#FF2E2E]/40 group-hover:shadow-[0_0_20px_rgba(255,46,46,0.1)]">
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    {item.icon}
                  </div>
                </div>
                {/* হোভার গ্লো ইফেক্ট */}
                <div className="absolute inset-0 bg-[#FF2E2E]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* টাইটেল - বোল্ড এবং হাই-ট্র্যাকিং */}
              <h3 className="text-white font-inter font-black text-[12px] tracking-[0.25em] uppercase mb-4 transition-colors duration-300 group-hover:text-white/90">
                {item.title}
              </h3>
              
              {/* ডেসক্রিপশন - লাইট এবং ক্লিন */}
              <p className="text-zinc-500 font-inter text-[11px] leading-[1.8] tracking-widest uppercase max-w-[280px] font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;