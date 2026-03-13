/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Send, CheckCircle2, Download, Instagram, Twitter, Music2, Youtube } from 'lucide-react';
import Image from 'next/image';

const ContactPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeInquiry, setActiveInquiry] = useState('Booking');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <main className="bg-[#050505] min-h-screen selection:bg-[#FF2E2E] selection:text-white overflow-x-hidden">

            {/* --- Hero Section --- */}
            <section className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero/chero.png"
                        alt="Contact Hero"
                        fill
                        className="object-cover opacity-20 scale-105 blur-[2px]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/0 via-[#050505]/80 to-[#050505]" />
                </div>

                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white text-4xl md:text-5xl judson-bold"
                    >
                        Contact Hub
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-500 inter-medium text-xs tracking-[0.3em] uppercase"
                    >
                        Operating from key cultural hubs.
                    </motion.p>

                    {/* Centered Decorative Line */}
                    <div className="flex justify-center mt-6">
                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#FF2E2E]/50 to-transparent" />
                    </div>
                </div>

            </section>

            {/* --- Main Content --- */}
            <section className="max-w-[1300px] mx-auto px-5 md:px-10 lg:px-20 -mt-16 relative z-20 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">

                    {/* Left Side: Info */}
                    <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
                        <div className="space-y-6">
                            <h2 className="text-white text-3xl md:text-4xl judson-regular-italic">Management & Booking</h2>
                            <p className="text-zinc-500 inter-medium text-sm md:text-base max-w-md leading-relaxed">
                                For all professional inquiries, please direct your message to the appropriate department. We aim to respond to all serious proposals within 48 hours.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Info Cards */}
                            {[
                                { label: 'GENERAL MANAGEMENT', name: 'Sarah Jenkins', email: 'sarah@lumina-music.com', color: '#FF2E2E' },
                                { label: 'PRESS & PR', name: 'Echo Agency', email: 'press@echo-agency.com', color: '#44DDFF' }
                            ].map((card, i) => (
                                <div key={i} className="p-6 bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-2xl group hover:bg-zinc-900/50 transition-all">
                                    <div className={`w-1 h-12 absolute left-0 top-1/2 -translate-y-1/2 rounded-full`} style={{ backgroundColor: card.color }} />
                                    <p className="text-zinc-600 inter-bold text-[9px] uppercase tracking-widest mb-1">{card.label}</p>
                                    <p className="text-white inter-semibold text-base">{card.name}</p>
                                    <p className="text-zinc-500 inter-medium text-sm">{card.email}</p>
                                </div>
                            ))}

                            {/* EPK Download */}
                            <div className="p-7 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-[#FF2E2E]/30 transition-all">
                                <div>
                                    <h4 className="text-white inter-bold text-lg">Electronic Press Kit</h4>
                                    <p className="text-zinc-500 inter-medium text-xs mt-1">High-res photos, biography, and technical riders.</p>
                                    <p className="text-[#FF2E2E] inter-bold text-[11px] uppercase mt-4 tracking-wider flex items-center gap-2">
                                        DOWNLOAD EPK (128MB) <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl group-hover:bg-[#FF2E2E] transition-colors">
                                    <Download className="text-white" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <p className="text-zinc-500 inter-bold text-[10px] uppercase tracking-[0.3em] mb-6">Connect Socially</p>
                            <div className="flex gap-4">
                                {[Instagram, Twitter, Music2, Youtube].map((Icon, i) => (
                                    <button key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:border-white transition-all duration-500">
                                        <Icon size={18} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-[#0A0A0A] border border-white/10 p-8 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                        >
                            {/* Top-Right Background Glow (Image specific) */}
                            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#FF2E2E]/10 blur-[120px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>

                            <h3 className="text-white text-[2.5rem] judson-bold mb-3 leading-tight">Send a Message</h3>
                            <p className="text-zinc-500 inter-medium text-xs mb-10">
                                Please fill out the form below. Fields marked with <span className="text-[#FF2E2E]">*</span> are required.
                            </p>

                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-50 bg-[#050505]/90 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8"
                                    >
                                        <div className="w-20 h-20 bg-[#FF2E2E] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,46,46,0.4)]">
                                            <CheckCircle2 size={40} className="text-white" />
                                        </div>
                                        <h2 className="text-white text-3xl judson-regular-italic mb-3">Message Dispatched</h2>
                                        <p className="text-zinc-400 inter-medium text-sm max-w-xs">Your transmission has been received. We will respond within 24 hours.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-zinc-400 inter-bold text-[10px] uppercase tracking-[0.2em] ml-1">Name <span className="text-[#FF2E2E]">*</span></label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Your full name"
                                            className="w-full bg-[#111111]/80 border border-white/5 rounded-2xl py-5 px-6 text-white focus:outline-none focus:border-[#FF2E2E]/40 focus:bg-zinc-900 transition-all inter-medium text-sm placeholder:text-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-zinc-400 inter-bold text-[10px] uppercase tracking-[0.2em] ml-1">Email <span className="text-[#FF2E2E]">*</span></label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="name@example.com"
                                            className="w-full bg-[#111111]/80 border border-white/5 rounded-2xl py-5 px-6 text-white focus:outline-none focus:border-[#FF2E2E]/40 focus:bg-zinc-900 transition-all inter-medium text-sm placeholder:text-zinc-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-zinc-400 inter-bold text-[10px] uppercase tracking-[0.2em] ml-1">Inquiry Type <span className="text-[#FF2E2E]">*</span></label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Booking', 'Collab', 'Press', 'General'].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setActiveInquiry(type)}
                                                className={`px-8 py-3.5 rounded-xl inter-bold text-[10px] uppercase tracking-widest border transition-all duration-300 ${activeInquiry === type
                                                    ? 'bg-[#FF2E2E] border-[#FF2E2E] text-white shadow-[0_10px_20px_rgba(255,46,46,0.3)]'
                                                    : 'border-white/10 text-zinc-500 hover:border-white/30'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-zinc-400 inter-bold text-[10px] uppercase tracking-[0.2em] ml-1">Message <span className="text-[#FF2E2E]">*</span></label>
                                    <textarea
                                        required
                                        rows={6}
                                        placeholder="Tell us about your project..."
                                        className="w-full bg-[#111111]/80 border border-white/5 rounded-3xl py-5 px-6 text-white focus:outline-none focus:border-[#FF2E2E]/40 focus:bg-zinc-900 transition-all inter-medium text-sm placeholder:text-zinc-700 resize-none"
                                    ></textarea>
                                </div>

                                {/* reCAPTCHA Placeholder (From Image) */}
                                <div className="flex items-center gap-4 bg-[#111111] border border-white/5 rounded-xl p-4 w-fit pr-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 border-2 border-zinc-700 rounded bg-white/5"></div>
                                        <span className="text-zinc-400 text-[11px] inter-medium">I am not a robot</span>
                                    </div>
                                    <div className="ml-4 flex flex-col items-center">
                                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="w-5 h-5 opacity-50 grayscale" />
                                        <span className="text-[8px] text-zinc-600 mt-0.5 uppercase tracking-tighter">reCAPTCHA</span>
                                    </div>
                                </div>

                                {/* Button with Red Outer Glow */}
                                <div className="relative pt-2">
                                    <button
                                        type="submit"
                                        className="w-fit group bg-[#FF2E2E] py-5 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 hover:bg-white overflow-hidden relative shadow-[0_10px_40px_rgba(255,46,46,0.4)]"
                                    >
                                        <span className="relative z-10 text-white inter-bold text-[13px] uppercase tracking-[0.25em] group-hover:text-black transition-colors">
                                            Send Message
                                        </span>
                                        <Send size={18} className="relative z-10 text-white group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>

                {/* --- Global Presence (Modern Re-design) --- */}
                <div className="mt-40 max-w-7xl mx-auto px-4">
                    {/* Centered Title Section */}
                    <div className="text-center mb-16 space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-white text-4xl md:text-5xl judson-bold"
                        >
                            Global Presence
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-500 inter-medium text-xs tracking-[0.3em] uppercase"
                        >
                            Operating from key cultural hubs.
                        </motion.p>

                        {/* Centered Decorative Line */}
                        <div className="flex justify-center mt-6">
                            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#FF2E2E]/50 to-transparent" />
                        </div>
                    </div>

                    {/* Grid with More Professional Spacing */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
                        {[
                            { city: 'Berlin', studio: 'Kreuzberg Studio', time: 'Mon-Fri, 10am - 6pm CET', img: '/hero/image.png', type: 'HQ' },
                            { city: 'London', studio: 'Shoreditch Creative Hub', time: 'By Appointment Only', img: '/hero/image.png', type: 'STUDIO' },
                            { city: 'Tokyo', studio: 'Shibuya Crossing', time: 'Tour Management Office', img: '/hero/image.png', type: 'STUDIO' }
                        ].map((loc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="group relative bg-[#0D0D0D] border border-white/[0.05] rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-white/10"
                            >
                                {/* Image Container - Height Adjusted for Professional Look */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={loc.img}
                                        alt={loc.city}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />
                                    {/* Subtle Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-90" />

                                    {/* Minimal Badge */}
                                    <div className="absolute top-5 left-5 bg-[#FF2E2E] text-white inter-bold text-[8px] px-3 py-1 rounded-full tracking-[0.15em] shadow-lg">
                                        {loc.type}
                                    </div>
                                </div>

                                {/* Content Section - Compact and Clean */}
                                <div className="p-7">
                                    <h4 className="text-white inter-bold text-xl mb-1 tracking-tight group-hover:text-[#FF2E2E] transition-colors">
                                        {loc.city}
                                    </h4>
                                    <p className="text-zinc-500 inter-medium text-xs mb-6">
                                        {loc.studio}
                                    </p>

                                    {/* Minimal Footer with Pulse */}
                                    <div className="flex items-center gap-2.5 text-zinc-600 inter-semibold text-[9px] uppercase tracking-widest pt-5 border-t border-white/[0.03]">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2E2E] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF2E2E]"></span>
                                        </span>
                                        {loc.time}
                                    </div>
                                </div>

                                {/* Subtle Hover Glow Line at the top */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF2E2E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;