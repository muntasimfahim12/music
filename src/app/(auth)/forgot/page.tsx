"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../../../components/ui/label"; 
import { Input } from "../../../components/ui/input"; 
import { cn } from "../../../lib/utils";
import { IconMail, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function DEEBZLENÜZForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 py-20 selection:bg-[#FF2E2E]/20">
      
      {/* Background Decor */}
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
        <div className="flex flex-col items-center mb-10 text-center">
           <Link href="/login" className="self-start mb-6 text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
             <IconArrowLeft size={14} /> Back to Login
           </Link>
           <h2 className="text-3xl font-judson-bold uppercase tracking-tighter text-neutral-800 dark:text-neutral-200">
             Restore Access
           </h2>
           <p className="mt-3 max-w-sm text-xs text-neutral-600 dark:text-neutral-500 uppercase tracking-widest inter-medium leading-relaxed">
             Enter your registered email to receive a recovery link.
           </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="email" className="dark:text-zinc-500 text-[10px] uppercase tracking-widest ml-1">Email Address</Label>
            <div className="relative group">
                <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#FF2E2E] transition-colors" size={16} />
                <Input 
                  id="email" 
                  placeholder="identity@deebzlenuz.com" 
                  type="email" 
                  className="pl-12 bg-white/[0.02] border-white/5 focus:border-[#FF2E2E]/30"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </div>
          </LabelInputContainer>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group/btn relative block h-12 w-full rounded-xl bg-gradient-to-br from-[#1a1a1a] to-black font-black uppercase tracking-[0.2em] text-[10px] text-white shadow-xl transition-all duration-300 hover:from-[#FF2E2E] hover:to-[#bc2525]"
            type="submit"
          >
            Send Recovery Link &rarr;
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#FF2E2E] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

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