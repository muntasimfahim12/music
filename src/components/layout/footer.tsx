/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Music2, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">

      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF2E2E]/5 blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">

        {/* Top Section: Logo & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">

          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* LOGO AREA - Slim & Elegant */}
            <motion.div
              whileHover={{ scale: 1.05, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer relative group"
            >

              <img
                src="/logo/logo2.png"
                alt="DEEBZLENÜZ Logo"
                className="h-15 md:h-25 w-auto object-contain transition-all duration-300 filter brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(212,175,87,0.5)]"
              />
              <img
                src="/logo/logo.png"
                alt="DEEBZLENÜZ Logo"
                className="h-8 md:h-10 w-auto object-contain transition-all duration-300 filter brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(212,175,87,0.5)]"
              />

              <div className="absolute inset-0 bg-[#D4AF37]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>

            <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-sm font-medium">
              Shaping the future of Caribbean sound through high-fidelity audio
              experiences and global independent movement.
            </p>

            {/* Social Icons - Modern Style */}
            <div className="flex items-center gap-5">
              {[
                { icon: <Instagram size={18} />, label: "IG" },
                { icon: <Twitter size={18} />, label: "X" },
                { icon: <Youtube size={18} />, label: "YT" },
                { icon: <Music2 size={18} />, label: "TK" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: "#FF2E2E" }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:border-[#FF2E2E] transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Explore</h3>
              <ul className="space-y-4 text-zinc-500 text-sm font-semibold">
                <li className="hover:text-white cursor-pointer flex items-center gap-1 transition-all">Music <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100" /></li>
                <li className="hover:text-white cursor-pointer transition-all">Videos</li>
                <li className="hover:text-white cursor-pointer transition-all">The Vault</li>
                <li className="hover:text-white cursor-pointer transition-all">Tour</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Support</h3>
              <ul className="space-y-4 text-zinc-500 text-sm font-semibold">
                <li className="hover:text-white cursor-pointer transition-all">Contact</li>
                <li className="hover:text-white cursor-pointer transition-all">EPK</li>
                <li className="hover:text-white cursor-pointer transition-all">Shipping</li>
              </ul>
            </div>
          </div>

          {/* Newsletter / Action */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Stay Updated</h3>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-xl text-sm focus:outline-none focus:border-[#FF2E2E] transition-all placeholder:text-zinc-700"
              />
              <button className="absolute right-2 top-2 bg-white text-black font-black text-[10px] px-5 py-2.5 rounded-lg hover:bg-[#FF2E2E] hover:text-white transition-all uppercase tracking-widest">
                Join
              </button>
            </div>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
              Join the mailing list for exclusive drops.
            </p>
          </div>
        </div>

        {/* Bottom Section: Legal & Credits */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] text-center md:text-left">
            © {currentYear} DEEBZLENÜZ OFFICIAL. Crafted for the global stage.
          </p>

          <div className="flex gap-8 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            <span className="hover:text-white cursor-pointer transition-all">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-all">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;