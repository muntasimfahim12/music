/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Play, ExternalLink } from 'lucide-react';

const musicData = [
  {
    id: 1,
    title: "Fire Pon Babylon",
    type: "Single",
    year: "2024",
    price: "$1.99",
    image: "/music/music1.png", 
  },
  {
    id: 2,
    title: "Roots & Culture",
    type: "Album",
    year: "2023",
    price: "$9.99",
    image: "/music/music2.avif",
  },
  {
    id: 3,
    title: "Island Vibes EP",
    type: "EP",
    year: "2024",
    price: "$4.99",
    image: "/music/music3.avif",
  }
];

const MusicCatalog = () => {
  return (
    <section className="w-full bg-[#050505] py-24 px-6 md:px-12 lg:px-20 selection:bg-[#FF2E2E]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <span className="h-[2px] w-12 bg-[#FF2E2E]"></span>
          </motion.div>
          <h2 className="text-white judson-bold text-4xl md:text-5xl font-[1000] uppercase tracking-tighter mb-4">
            MUSIC <span className="text-zinc-700">CATALOG</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest font-medium">
            Explore the complete collection of singles, albums, and exclusive releases
          </p>
        </div>

        {/* Music Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {musicData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 p-5 rounded-sm group hover:border-[#FF2E2E]/30 transition-all duration-500 shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden rounded-sm mb-6">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-[#FF2E2E] rounded-full flex items-center justify-center cursor-pointer shadow-xl"
                  >
                    <Play className="text-white fill-current ml-1" size={24} />
                  </motion.div>
                </div>
              </div>

              {/* Info Area */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white text-lg font-black uppercase tracking-tight group-hover:text-[#FF2E2E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">
                      {item.type} • {item.year}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-white font-black text-lg tracking-tighter">
                    {item.price}
                  </span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#FF2E2E] text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-sm shadow-lg shadow-[#FF2E2E]/10"
                  >
                    BUY NOW
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex flex-col items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.05, borderColor: "#FF2E2E" }}
            className="px-12 py-4 border border-zinc-800 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300"
          >
            VIEW ALL MUSIC
          </motion.button>
          <span className="h-[2px] w-12 bg-zinc-800"></span>
        </div>

      </div>
    </section>
  );
};

export default MusicCatalog;