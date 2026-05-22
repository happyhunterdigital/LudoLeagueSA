import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { LudoBoardDecoration } from '../ui/SharedUI';

export const LandingHero = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <section id="home" className="min-h-screen w-full relative flex flex-col items-center justify-center pt-32 pb-20 bg-[#001F3F]">
      <LudoBoardDecoration />
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/dkyg07qvv/image/upload/f_auto,q_auto/v1778264852/Ludo_League_SA_tournament_photos_j85mdo.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="https://res.cloudinary.com/dkyg07qvv/video/upload/f_auto,q_auto/v1779445750/The_Ludo_League_South_Africa_Hero_video_t1jl8j.mp4" type="video/mp4" />
        </video>
        
        {/* Subtle overlay to guarantee white text remains legible over video motion */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center mt-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-6 text-[9px] md:text-[11px] text-white bg-[#001F3F] uppercase font-black italic tracking-widest px-4 py-2 border-l-4 border-[#007BFF] inline-flex items-center shadow-lg rounded-r-xl">
            <span className="status-indicator"></span> 2026 Season Live
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black uppercase italic leading-none mb-6 text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            The Roll of <br /> <span className="text-[#007BFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Legends</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-bold leading-relaxed px-4 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            South Africa's premier competitive Ludo circuit.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollToSection('tournaments')} className="btn-action bg-[#E63946] text-white hover:bg-white hover:text-[#E63946]">
              Enter Tournament <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection('history')} className="px-10 py-5 uppercase text-[11px] tracking-[0.25em] font-black italic transition-all duration-300 flex items-center justify-center gap-2 rounded-2xl border-2 border-white/50 bg-[#001F3F]/80 text-white hover:-translate-y-1 w-full sm:w-auto shadow-xl backdrop-blur-md hover:bg-white hover:text-[#001F3F]">
              View History
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
