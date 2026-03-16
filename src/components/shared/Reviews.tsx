/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  id: number;
  name: string;
  image: string;
  status: string;
  date: string;
  comment: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/data/reviews.json');
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return (
    <div className="w-full h-[323px] flex items-center justify-center text-zinc-700 font-inter uppercase text-[9px] tracking-widest">
      Loading Manifesto...
    </div>
  );

  const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden bg-transparent mx-auto" style={{ maxWidth: '794.67px', height: '323px' }}>

      {/* Header - Compact version to save space */}
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
            x: [0, -2000],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[280px] flex-shrink-0 bg-[#0A0A0A] border border-zinc-900/50 p-5 rounded-[8px] hover:bg-[#0E0E0E] transition-all duration-500"
            >
              {/* User Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-800 p-[1px]">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-zinc-200 leading-none mb-1 font-inter">{review.name}</h4>
                    <p className="text-[9px] text-[#FF4D3D] font-black uppercase tracking-tighter opacity-70">
                      Verified User
                    </p>
                  </div>
                </div>
                <span className="text-[9px] text-zinc-700 font-mono">{review.date}</span>
              </div>

              {/* Comment - Line Clamp for consistency */}
              <p className="text-zinc-500 text-[12px] leading-[1.6] font-medium tracking-tight font-inter h-[60px] overflow-hidden line-clamp-3">
                {review.comment}
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

        {/* Shadow Overlays for smooth fade */}
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