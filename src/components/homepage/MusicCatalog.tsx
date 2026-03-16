/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// আপনার JSON অনুযায়ী ইন্টারফেস আপডেট করা হয়েছে
interface MusicFormat {
  price: number;
}

interface MusicItem {
  id: number;
  title: string;
  main_genre: string; // আপনার JSON-এ এটা main_genre
  release_year: string;
  cover_image: string; // আপনার JSON-এ এটা cover_image
  formats: MusicFormat[]; // প্রাইস বের করার জন্য
}

const MusicCatalog = () => {
  const router = useRouter();
  const [musicData, setMusicData] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        // পাথ: public/data/music.json
        const response = await axios.get('/data/music.json');
        // প্রথম ৪টি ডাটা নেওয়া হচ্ছে
        setMusicData(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching music data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMusic();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center bg-[#050505]">
        <Loader2 className="text-[#FF2E2E] animate-spin" size={24} />
      </div>
    );
  }

  return (
    <section className="w-full bg-[#050505] px-6 md:px-12 lg:px-20 selection:bg-[#FF2E2E]">
      <div className="max-w-[1400px] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-6 bg-[#FF2E2E]"></span>
            <span className="text-[#FF2E2E] text-[9px] font-black tracking-[0.5em] uppercase">
              Selected Releases
            </span>
            <span className="h-[1px] w-6 bg-[#FF2E2E]"></span>
          </motion.div>

          {/* Judson Font, Sentence Case (Normal), No Italic, Heavy Bold */}
          <h2 className="text-white judson-bold text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4 lowercase first-letter:capitalize">
            Music <span className="text-zinc-800 not-italic capitalize">Catalog</span>
          </h2>

          <p className="text-zinc-500 text-[9px] md:text-[10px] max-w-xs uppercase tracking-[0.3em] leading-relaxed font-medium opacity-70">
            High-fidelity sonic experimentalism.
          </p>
        </div>

        {/* Music Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {musicData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => router.push(`/music/${item.id}`)}
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src={item.cover_image} // JSON এর cover_image কি ব্যবহার করা হয়েছে
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Cover+Missing';
                  }}
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-2xl">
                    <Play fill="currentColor" size={16} className="ml-1" />
                  </div>
                </div>

                <div className="absolute top-2 right-2">
                  <span className="bg-black/80 text-white text-[7px] font-black px-1.5 py-0.5 rounded-sm border border-white/10 uppercase">
                    {item.release_year}
                  </span>
                </div>
              </div>

              {/* Title & Info */}
              <div className="mt-4 text-center">
                <h3 className="text-white text-[10px] font-black uppercase tracking-[0.15em] group-hover:text-[#FF2E2E] transition-colors duration-300 truncate">
                  {item.title}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-1 opacity-60">
                  <span className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest">{item.main_genre}</span>
                  <span className="text-[#FF2E2E] text-[9px] font-black tracking-tighter">
                    {/* প্রথম ফরম্যাটের প্রাইস দেখানো হচ্ছে */}
                    ${item.formats[0]?.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modern Button */}
        <div className="flex justify-center mt-4">
          <Link href="/music">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group px-10 py-4 border border-zinc-900 overflow-hidden mb-12"
            >
              <div className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-500 ease-in-out"></div>
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-zinc-500 group-hover:text-black text-[9px] font-black uppercase tracking-[0.4em]">
                  View Full Discography
                </span>
                <ArrowRight size={12} className="text-[#FF2E2E] group-hover:text-black transition-all duration-300" />
              </div>
            </motion.div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default MusicCatalog;