/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../../../components/ui/label"; 
import { Input } from "../../../components/ui/input"; 
import { cn } from "../../../lib/utils";
import {
  IconBrandGoogle,
  IconBrandFacebook,
  IconMail,
  IconLock,
  IconUser,
  IconArrowRight
} from "@tabler/icons-react";
import Link from "next/link";

export default function DEEBZLENÜZSignup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 py-20 selection:bg-[#FF2E2E]/20">
      
      {/* Background Glow Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF2E2E]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 shadow-input mx-auto w-full max-w-md rounded-none bg-white p-6 md:rounded-3xl md:p-10 dark:bg-black border border-white/5 backdrop-blur-sm"
      >
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10 text-center">
           <Link href="/">
             <img src="/logo/logo.png" alt="DEEBZLENÜZ Logo" className="h-10 mb-6 hover:scale-105 transition-transform" />
           </Link>
           <h2 className="text-3xl font-judson-bold uppercase tracking-tighter text-neutral-800 dark:text-neutral-200">
             Create Identity
           </h2>
           <p className="mt-3 max-w-sm text-xs text-neutral-600 dark:text-neutral-500 uppercase tracking-widest inter-medium leading-relaxed">
             Join the DEEBZLENÜZ Collective and access premium architectural services.
           </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Field Group */}
          <div className="flex flex-col md:flex-row gap-4">
            <LabelInputContainer>
              <Label htmlFor="firstname" className="dark:text-zinc-500 text-[10px] uppercase tracking-widest ml-1">First name</Label>
              <div className="relative group">
                <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#FF2E2E] transition-colors" size={16} />
                <Input 
                  id="firstname" 
                  placeholder="Tyler" 
                  type="text" 
                  className="pl-12 bg-white/[0.02] border-white/5 focus:border-[#FF2E2E]/30"
                  onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                />
              </div>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname" className="dark:text-zinc-500 text-[10px] uppercase tracking-widest ml-1">Last name</Label>
              <div className="relative group">
                <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#FF2E2E] transition-colors" size={16} />
                <Input 
                  id="lastname" 
                  placeholder="Durden" 
                  type="text" 
                  className="pl-12 bg-white/[0.02] border-white/5 focus:border-[#FF2E2E]/30"
                  onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                />
              </div>
            </LabelInputContainer>
          </div>

          {/* Email Field */}
          <LabelInputContainer>
            <Label htmlFor="email" className="dark:text-zinc-500 text-[10px] uppercase tracking-widest ml-1">Email Address</Label>
            <div className="relative group">
                <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#FF2E2E] transition-colors" size={16} />
                <Input 
                  id="email" 
                  placeholder="identity@deebzlenuz.com" 
                  type="email" 
                  className="pl-12 bg-white/[0.02] border-white/5 focus:border-[#FF2E2E]/30"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>
          </LabelInputContainer>

          {/* Password Field */}
          <LabelInputContainer>
            <Label htmlFor="password" className="dark:text-zinc-500 text-[10px] uppercase tracking-widest ml-1">Password</Label>
            <div className="relative group">
                <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#FF2E2E] transition-colors" size={16} />
                <Input 
                  id="password" 
                  placeholder="••••••••" 
                  type="password" 
                  className="pl-12 bg-white/[0.02] border-white/5 focus:border-[#FF2E2E]/30"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>
          </LabelInputContainer>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group/btn relative block h-12 w-full rounded-xl bg-gradient-to-br from-[#1a1a1a] to-black font-black uppercase tracking-[0.2em] text-[10px] text-white shadow-xl transition-all duration-300 hover:from-[#FF2E2E] hover:to-[#bc2525]"
            type="submit"
          >
            Confirm Registry &rarr;
            <BottomGradient />
          </motion.button>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#050505] px-4 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Quick Verification</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="group/btn shadow-input relative flex h-12 flex-1 items-center justify-center space-x-3 rounded-xl bg-white/[0.03] border border-white/5 px-4 transition-colors hover:bg-white/[0.05]"
              type="button"
            >
              <IconBrandGoogle className="h-5 w-5 text-neutral-800 dark:text-neutral-300 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
                Google
              </span>
              <BottomGradient colorvia="#D4AF37" colorvia2="#FF2E2E" />
            </button>
            <button
              className="group/btn shadow-input relative flex h-12 flex-1 items-center justify-center space-x-3 rounded-xl bg-white/[0.03] border border-white/5 px-4 transition-colors hover:bg-white/[0.05]"
              type="button"
            >
              <IconBrandFacebook className="h-5 w-5 text-neutral-800 dark:text-neutral-300 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
                Facebook
              </span>
              <BottomGradient colorvia="#1877F2" colorvia2="#FF2E2E" />
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-10 text-center text-[11px] text-neutral-500 inter-medium">
            Already have an identity?{" "}
            <Link href="/login" className="text-white hover:text-[#FF2E2E] transition-colors font-bold border-b border-white/20 pb-0.5">
              Log In
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

// Custom Bottom Gradient with Dynamic Colors
const BottomGradient = ({ colorvia = "#FF2E2E", colorvia2 = "#D4AF37" }) => {
  return (
    <>
      <span style={{ background: `linear-gradient(to right, transparent, ${colorvia}, transparent)` }} className="absolute inset-x-0 -bottom-px block h-px w-full opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span style={{ background: `linear-gradient(to right, transparent, ${colorvia2}, transparent)` }} className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2.5", className)}>
      {children}
    </div>
  );
};