"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const ContactPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <main className="bg-[#050505] min-h-screen selection:bg-[#FF2E2E] selection:text-white">

            {/* --- Hero Section --- */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero/hero.jpeg"
                        alt="Contact Hero"
                        fill
                        className="object-cover opacity-30 scale-105 blur-[8px] transition-all duration-1000"
                        priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
                    <div className="absolute inset-0 bg-[#050505]/20 backdrop-brightness-75" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#FF2E2E] font-inter font-black text-[10px] md:text-[12px] tracking-[0.5em] uppercase mb-4 block"
                    >
                        Connect with the label
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white text-5xl md:text-8xl font-judson italic"
                    >
                        GET IN <span className="text-zinc-500">TOUCH</span>
                    </motion.h1>
                </div>
            </section>

            {/* --- Content Section --- */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 -mt-24 relative z-20 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Side: Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-2xl space-y-10">
                            <div>
                                <h3 className="text-white font-judson text-2xl italic mb-6">Direct Channels</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#FF2E2E] transition-colors">
                                            <Mail size={18} className="text-white" />
                                        </div>
                                        <span className="text-zinc-400 font-inter text-sm">support@void-system.com</span>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#FF2E2E] transition-colors">
                                            <Phone size={18} className="text-white" />
                                        </div>
                                        <span className="text-zinc-400 font-inter text-sm">+880 1700-000000</span>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#FF2E2E] transition-colors">
                                            <MapPin size={18} className="text-white" />
                                        </div>
                                        <span className="text-zinc-400 font-inter text-sm">Sylhet, Bangladesh</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4">Follow the Void</p>
                                <div className="flex gap-4">
                                    {['IG', 'TW', 'FB', 'YT'].map((social) => (
                                        <button key={social} className="w-10 h-10 border border-white/10 rounded-lg text-white text-[10px] font-bold hover:bg-white hover:text-black transition-all">
                                            {social}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden"
                        >
                            {/* Success Overlay */}
                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-50 bg-[#050505]/90 flex flex-col items-center justify-center text-center p-6"
                                    >
                                        <div className="w-20 h-20 bg-[#FF2E2E]/20 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 size={40} className="text-[#FF2E2E]" />
                                        </div>
                                        <h2 className="text-white text-3xl font-judson italic mb-2 text-">Message Dispatched</h2>
                                        <p className="text-zinc-400 font-inter text-sm max-w-xs">Your transmission has been received. We will respond within 24 hours.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Ex: John Doe"
                                            className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-[#FF2E2E]/50 transition-all font-inter text-sm placeholder:text-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-[#FF2E2E]/50 transition-all font-inter text-sm placeholder:text-zinc-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-1">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="What is this regarding?"
                                        className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-[#FF2E2E]/50 transition-all font-inter text-sm placeholder:text-zinc-700"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-1">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Write your transmission here..."
                                        className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-[#FF2E2E]/50 transition-all font-inter text-sm placeholder:text-zinc-700 resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full group relative overflow-hidden bg-white py-5 rounded-xl flex items-center justify-center gap-3 transition-all duration-500 hover:bg-[#FF2E2E]"
                                >
                                    <span className="text-black font-inter font-black text-[11px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">Send Message</span>
                                    <Send size={16} className="text-black group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;