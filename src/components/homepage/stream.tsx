/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { motion } from "framer-motion";

const platforms = [
    {
        name: "Spotify",
        icon: "/icon/Vector.png",
        link: "#",
    },
    {
        name: "Apple Music",
        icon: "/icon/Vector (1).png",
        link: "#",
    },
    {
        name: "YouTube Music",
        icon: "/icon/Vector (2).png",
        link: "#",
    },
    {
        name: "Amazon Music",
        icon: "/icon/Vector (4).png",
        link: "#",
    },
];

const StreamEverywhere = () => {
    return (
        <section className="w-full bg-[#050505] py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 relative overflow-hidden">
            {/* Background Glow for Modern Touch */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF2E2E]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-[1200px] mx-auto text-center relative z-10">

                {/* Modern Title - Not all uppercase as requested */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16 space-y-2"
                >
                    <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight">
                        Stream Everywhere
                    </h2>
                    <div className="w-12 h-[2px] bg-[#FF2E2E] mx-auto rounded-full" />
                </motion.div>

                {/* Platforms Grid - Fully Responsive */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {platforms.map((platform, index) => (
                        <motion.a
                            key={index}
                            href={platform.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{
                                y: -8,
                                backgroundColor: "rgba(240, 153, 153, 0.03)",
                                borderColor: "rgba(245, 115, 115, 0.2)"
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center p-6 md:p-10 bg-[#0A0A0A] border border-white/5 rounded-2xl transition-all duration-300 group shadow-xl"
                        >
                            {/* Icon Container */}
                            <div className="w-10 h-10 md:w-14 md:h-14 mb-5 flex items-center justify-center transition-all duration-500 transform group-hover:scale-110">
                                <img
                                    src={platform.icon}
                                    alt={platform.name}
                                    className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                    // Apple Music আইকন সাদা করার জন্য ইনভার্ট ফিল্টার
                                    style={platform.name === 'Apple Music' ? { filter: 'invert(1)' } : {}}
                                />
                            </div>

                            {/* Platform Name */}
                            <span className="text-zinc-500 group-hover:text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-colors">
                                {platform.name}
                            </span>

                            {/* Hover Indicator Line */}
                            <motion.div
                                className="w-0 h-[1px] bg-[#FF2E2E] mt-2 group-hover:w-8 transition-all duration-500"
                            />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StreamEverywhere;