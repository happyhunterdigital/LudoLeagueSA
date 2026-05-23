import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { LudoBoardDecoration } from '../ui/SharedUI';

export const LandingHero = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <section id="home" className="min-h-screen w-full relative flex flex-col items-center justify-center pt-32 pb-20 border-b border-white/5 bg-[#081619]">
      <LudoBoardDecoration />
      
      {/* Background Video Layer - Updated with your new active video URL */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          src="https://res.cloudinary.com/dkyg07qvv/video/upload/v1779572768/The_Ludo_League_South_Africa_Hero_video_b2dcx9.mp4"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle, neutral dark overlay for typography legibility */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#081619] to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center mt-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-6 text-[9px] md:text-[11px] text-white bg-[#0F172A] uppercase font-black italic tracking-widest px-4 py-2 border-l-4 border-[#0EA5E9] inline-flex items-center shadow-lg rounded-r-xl">
            <span className="status-indicator"></span> 2026 Season Live
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black uppercase italic leading-none mb-6 text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            The Roll of <br /> <span className="text-[#00f0c2] drop-shadow-none">Legends</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-bold leading-relaxed px-4 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            South Africa's premier competitive Ludo circuit.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollToSection('tournaments')} className="btn-action bg-[#D32F2F] text-white">
              Enter Tournament <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection('history')} className="px-10 py-5 uppercase text-[11px] tracking-[0.25em] font-black italic transition-all duration-300 flex items-center justify-center gap-2 rounded-xl border-2 border-[#00f0c2] bg-[#0d272b]/80 text-white hover:-translate-y-1 w-full sm:w-auto shadow-xl">
              View History
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
