import React from 'react';
import { Instagram, Twitter, Youtube, Music2 } from 'lucide-react'; // আইকনের জন্য

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-16 font-sans border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Newsletter */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-black tracking-tighter mb-4">
              DEEBZ<span className="text-[#FF004D]">LENUZ</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Ultra-Modern, High-Fidelity Audio Experiences. <br />
              Shaping the sound of the new era.
            </p>
            
            <div className="relative flex items-center max-w-sm">
              <input 
                type="email" 
                placeholder="Join the mailing list..." 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-zinc-600 transition-all"
              />
              <button className="absolute right-1.5 bg-white text-black font-bold text-xs px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-zinc-200">Explore</h3>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Music</li>
              <li className="hover:text-white cursor-pointer transition-colors">Videos</li>
              <li className="hover:text-white cursor-pointer transition-colors">Tour Dates</li>
              <li className="hover:text-white cursor-pointer transition-colors">The Vault (Shop)</li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-zinc-200">Connect</h3>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <Instagram size={16} /> Instagram
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <Twitter size={16} /> Twitter/X
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <Youtube size={16} /> YouTube
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <Music2 size={16} /> TikTok
              </li>
            </ul>
          </div>

          {/* Management & Booking */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-zinc-200">Management</h3>
            <button className="w-full border border-red-900/50 bg-red-950/10 text-red-500 font-bold py-4 px-6 rounded-md hover:bg-red-900/20 transition-all duration-300 shadow-[0_0_15px_rgba(153,27,27,0.1)] mb-4 uppercase tracking-tighter text-sm">
              Book DEEBZLENUZ
            </button>
            <p className="text-zinc-500 text-xs hover:text-zinc-300 cursor-pointer transition-colors">
              Press Kit (EPK)
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">
          <p>© 2024 DEEBZLENUZ OFFICIAL. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;