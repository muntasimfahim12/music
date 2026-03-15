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

  if (loading) return <div className="text-zinc-500 animate-pulse py-10 font-inter uppercase text-[10px] tracking-widest text-center">Loading Reviews...</div>;

  // স্লাইডারটি লুপ করার জন্য রিভিউ লিস্ট ট্রিপল করা হয়েছে
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-20 overflow-hidden relative bg-transparent">
      
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto flex items-end justify-between mb-12 px-6">
        <div>
          <h3 className="text-white text-4xl md:text-5xl judson-bold italic tracking-tight mb-2">Reviews</h3>
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold">What our listeners say</p>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex text-[#FF4D3D] gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <span className="text-[11px] font-medium text-zinc-500 tracking-wider font-inter">
            (4.8/5 • {reviews.length} Reviews)
          </span>
        </div>
      </div>

      {/* --- Infinite Sliding Row --- */}
      <div className="relative flex items-center">
        <motion.div 
          className="flex gap-4 pointer-events-auto cursor-grab active:cursor-grabbing px-4"
          animate={{
            x: [0, -3000], 
          }}
          transition={{
            duration: 35, // স্পিড আপনার পছন্দমতো এখান থেকে অ্যাডজাস্ট করতে পারেন
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedReviews.map((review, index) => (
            <div 
              key={`${review.id}-${index}`} 
              className="w-[340px] md:w-[420px] flex-shrink-0 bg-[#111111]/60 border border-white/5 p-7 rounded-[12px] hover:border-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Card Header: User Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-white/5">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-white leading-none mb-1 font-inter">{review.name}</h4>
                    <p className="text-[11px] text-zinc-500 font-medium italic font-inter">
                      Verified Purchase
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-zinc-600 font-medium font-inter">{review.date}</span>
              </div>
              
              {/* Card Body: Comment */}
              <p className="text-zinc-400 text-[14px] leading-[1.7] font-normal tracking-wide font-inter">
                {review.comment}
              </p>

              {/* Bottom Stars */}
              <div className="mt-6 flex text-[#FF4D3D]/40 gap-0.5">
                 {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="currentColor" />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/20 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Footer Button */}
      <div className="mt-16 px-6 max-w-[1400px] mx-auto">
        <button className="w-full py-4 border border-zinc-800/50 rounded-[4px] text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all duration-500 font-inter">
          Read All Reviews
        </button>
      </div>

      <style jsx>{`
        .cursor-grab:active {
          cursor: grabbing;
        }
      `}</style>
    </section>
  );
};

export default Reviews;