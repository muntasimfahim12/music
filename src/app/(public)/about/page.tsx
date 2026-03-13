/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { motion } from "framer-motion";
import { IconMusic, IconMicrophone, IconHeadphones, IconCircleCheck } from "@tabler/icons-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-20 px-6 overflow-hidden">
      
      {/* Hero Section with Image */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="space-y-2">
            <h4 className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-xs">Biography</h4>
            <h1 className="text-white text-5xl md:text-8xl font-[1000] uppercase tracking-tighter leading-none">
              DEEBZ<span className="text-[#FF2E2E]">LENÜZ</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm flex gap-4">
              <span>Dancehall Artist</span> • <span>Song Writer</span> • <span>Producer</span>
            </p>
          </div>

          <div className="space-y-6 text-zinc-300 leading-relaxed text-lg font-medium">
            <p>
              Dominic Deebzlenuz Lee Deebzlenuz, also known as <span className="text-white">Dominic O. Lee</span>, is an ambitious up and coming artist with a voice that transcends genres. 
              Influenced by legends like Bob Marley, Gregory Isaac, and Dennis Brown, his music represents the beat of his heart and the race of his pulse.
            </p>
            <p className="text-zinc-400 text-base">
              Born on the Caribbean island of <span className="text-white">Montserrat</span>, Deebzlenuz was inspired by West African, Calypso, Soca, and Reggae sounds. 
              Now a long-time resident of Bridgeport, Connecticut, he has written and recorded over <span className="text-[#FF2E2E] font-bold">400 songs</span>.
            </p>
          </div>

          <div className="flex gap-6 pt-4">
            <div className="flex flex-col">
              <span className="text-white text-3xl font-black">2007</span>
              <span className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">Reggae Artist of the Year</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-white text-3xl font-black">5+</span>
              <span className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">Successful Albums</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Image with glow effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 relative group"
        >
          <div className="absolute -inset-4 bg-[#FF2E2E]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative border border-white/10 p-2 rounded-2xl bg-zinc-900/20 backdrop-blur-sm">
            <img 
              src="/hero/about.jpg" 
              alt="Deebzlenuz Performance" 
              className="w-full aspect-[4/5] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>
      </section>

      {/* Objective & Mission Section */}
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 bg-[#0A0A0A] border border-white/5 rounded-3xl space-y-6"
          >
            <div className="w-14 h-14 bg-[#FF2E2E]/10 rounded-2xl flex items-center justify-center text-[#FF2E2E]">
              <IconMusic size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white">The Objective</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Deebzlenuz is embarking on the <span className="text-white">Outta Mi Soul 2</span> European promo tour to share visions of love, unity, and equality. 
              His mission is to connect people across numerous cultural and socioeconomic backgrounds through the soul of his music.
            </p>
          </motion.div>

          {/* Charity Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 bg-[#0A0A0A] border border-white/5 rounded-3xl space-y-6"
          >
            <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37]">
              <IconCircleCheck size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Giving Back</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              A portion of proceeds will be donated to <span className="text-white">We Will Thru Sports</span>, 
              aiming to provide high-quality sports programs for underserved youth, promoting unity and empowerment.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Album List / Discography Minimal */}
      <section className="max-w-7xl mx-auto mt-32 text-center space-y-12">
        <h2 className="text-zinc-700 text-xs font-black uppercase tracking-[0.5em]">Selected Discography</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-50 grayscale">
            {["Outta Mi Soul", "My Feelings", "Ride Out", "Outta Mi Soul 2"].map((album) => (
              <span key={album} className="text-white font-black text-xl md:text-3xl tracking-tighter uppercase">{album}</span>
            ))}
        </div>
      </section>

    </main>
  );
};

export default AboutPage;