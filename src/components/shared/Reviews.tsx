/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import api from '../../lib/axios'; 
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

// API Response অনুযায়ী ইন্টারফেস আপডেট করা হয়েছে
interface Review {
  _id: string; // MongoDB ID সাধারণত _id হয়
  name: string;
  avatar: string; // আপনার ব্যাকএন্ডে হয়তো avatar নাম আছে
  status: string;
  createdAt: string;
  message: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // ইমেজ URL হ্যান্ডেল করার জন্য (Cloudinary বা Local Multer)
  const getImageUrl = (path: string) => {
    if (!path) return "/placeholder-avatar.png";
    if (path.startsWith("http")) return path;
    // যদি ব্যাকএন্ড লোকাল ফোল্ডারে ইমেজ রাখে তবে baseURL থেকে নিবে
    const serverBase = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:5000';
    return `${serverBase}/${path}`;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // আপনার ব্যাকএন্ড এন্ডপয়েন্ট অনুযায়ী পরিবর্তন করুন
        const response = await api.get('/testimonials'); 
        if (response.data.success) {
          setReviews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return (
    <div className="w-full h-[323px] flex items-center justify-center text-zinc-700 font-inter uppercase text-[9px] tracking-widest bg-transparent">
      Loading Manifesto...
    </div>
  );

  // ইনফিনিট স্লাইডারের জন্য ডেটা ডুপ্লিকেট করা
  const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden bg-transparent mx-auto" style={{ maxWidth: '794.67px', height: '323px' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-6 px-2">
        <div>
          <h3 className="text-white text-3xl judson-bold tracking-tight leading-none mb-1 ">Reviews</h3>
          <p className="text-zinc-600 text-[8px] uppercase tracking-[0.2em] font-black">Community Feedback</p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex text-[#FF4D3D] gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-[9px] font-bold text-zinc-700 tracking-tighter font-inter uppercase">
            {reviews.length} Verified Logs
          </span>
        </div>
      </div>

      {/* --- Infinite Sliding Row --- */}
      <div className="relative flex items-center mt-2">
        <motion.div
          className="flex gap-3 cursor-grab active:cursor-grabbing"
          animate={{
            x: reviews.length > 0 ? [0, -2000] : 0,
          }}
          transition={{
            duration: 35, // স্পিড একটু স্মুথ করার জন্য বাড়ানো হয়েছে
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review._id}-${index}`}
              className="w-[280px] flex-shrink-0 bg-[#0A0A0A] border border-zinc-900/50 p-5 rounded-[8px] hover:bg-[#0E0E0E] transition-all duration-500"
            >
              {/* User Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-800 p-[1px]">
                    <img
                      src={getImageUrl(review.avatar)}
                      alt={review.name}
                      className="w-full h-full object-cover rounded-full transition-all duration-700"
                    />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-zinc-200 leading-none mb-1 font-inter">{review.name}</h4>
                    <p className="text-[9px] text-[#FF4D3D] font-black uppercase tracking-tighter opacity-70">
                      Verified User
                    </p>
                  </div>
                </div>
                <span className="text-[9px] text-zinc-700 font-mono">
                   {new Date(review.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </span>
              </div>

              {/* Comment */}
              <p className="text-zinc-500 text-[12px] leading-[1.6] font-medium tracking-tight font-inter h-[60px] overflow-hidden line-clamp-3">
                {review.message}
              </p>

              {/* Bottom Decoration */}
              <div className="mt-4 pt-4 border-t border-zinc-900/50 flex justify-between items-center">
                <div className="flex text-zinc-800 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={8} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <div className="w-8 h-[1px] bg-zinc-900"></div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Shadow Overlays */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Action Line */}
      <div className="mt-8 flex justify-center">
        <button className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 hover:text-[#FF4D3D] transition-colors duration-500 py-2 border-b border-zinc-900 hover:border-[#FF4D3D]/30">
          Access Full Archive
        </button>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Reviews;