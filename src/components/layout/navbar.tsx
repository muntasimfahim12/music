/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Music", href: "#music" },
  { name: "Shop", href: "#shop" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[100] h-[70px] flex items-center bg-black/40 backdrop-blur-md border-b border-white/5 transition-all duration-300"
      >
        <div className="mx-auto max-w-[1400px] w-full flex items-center justify-between px-6 md:px-12">

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

          {/* DESKTOP MENU - White Hover Effect */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden text-white/80 p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <IconX size={26} /> : <IconMenu2 size={26} />}
          </button>
        </div>
      </header>

      {/* MOBILE SIDE DRAWER - Modern Side Entry */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm lg:hidden"
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
              className="fixed top-0 right-0 bottom-0 z-[120] w-[280px] bg-[#080808] border-l border-white/5 p-10 flex flex-col lg:hidden"
            >
              <div className="flex justify-end mb-12">
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
                  <IconX size={28} />
                </button>
              </div>

              <nav className="flex flex-col space-y-8">
                {navLinks.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    onClick={() => setOpen(false)}
                    className="text-lg font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-white/5">
                <p className="text-[9px] tracking-[0.3em] font-medium text-[#D4AF37]/60 uppercase">
                  © DEEBZLENÜZ 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;