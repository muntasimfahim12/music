/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconSearch, IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";

/* NAV LINKS */
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Music", href: "/music" },
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] h-[80px] flex items-center bg-black/60 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="mx-auto max-w-[1600px] w-full flex items-center justify-between px-6 md:px-10">

          {/* LOGO AREA */}
          <Link href="/" className="flex items-center">
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

              {/* গ্লো ইফেক্ট */}
              <div className="absolute inset-0 bg-[#D4AF37]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          </Link>


          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[12px] font-bold uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FF2E2E] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-6 md:gap-8">

            {/* SEARCH */}
            <button className="text-zinc-300 hover:text-white transition-colors hidden sm:block">
              <IconSearch size={22} stroke={1.5} />
            </button>

            <Link href="/cart" className="relative cursor-pointer group">
              <IconShoppingBag
                size={22}
                stroke={1.5}
                className="text-zinc-300 group-hover:text-white transition-colors"
              />

              <span className="absolute -top-1 -right-2 bg-[#FF2E2E] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,46,46,0.5)]">
                2
              </span>
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setOpen(!open)}
            >
              {open ? <IconX size={28} /> : <IconMenu2 size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[120] w-[80%] max-w-[350px] bg-[#0A0A0A] border-l border-white/5 p-8 flex flex-col lg:hidden"
            >
              <div className="flex justify-between items-center mb-16">
                <img src="/logo/logo.png" alt="Logo" className="h-5" />

                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <IconX size={30} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {navLinks.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-2xl font-black uppercase tracking-tighter text-zinc-500 hover:text-[#FF2E2E] transition-all"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-6">
                <div className="flex justify-center gap-6 text-zinc-500">
                  <span className="text-[10px] tracking-[0.4em] uppercase">
                    DEEBZLENÜZ 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;