import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { LudoBoardDecoration } from '../ui/SharedUI';

export const LandingHero = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <section id="home" className="min-h-[90vh] w-full relative flex flex-col items-center justify-center pt-32 pb-20 bg-slate-900 border-b border-teal-500/20">
      <LudoBoardDecoration />
      
      <div className="absolute inset-0 z-0 opacity-40">
        <picture>
          <source srcSet="https://res.cloudinary.com/dkyg07qvv/image/upload/f_avif,q_auto/v1778264852/Ludo_League_SA_tournament_photos_j85mdo.jpg" type="image/avif" />
          <source srcSet="https://res.cloudinary.com/dkyg07qvv/image/upload/f_webp,q_auto/v1778264852/Ludo_League_SA_tournament_photos_j85mdo.jpg" type="image/webp" />
          <img 
            src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1778264852/Ludo_League_SA_tournament_photos_j85mdo.jpg" 
            alt="Ludo League SA App Portal" 
            width="1920" 
            height="800" 
            loading="eager" 
            fetchPriority="high"
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-70"
          />
        </picture>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-900 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center mt-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block tag-status mb-6 text-[9px] md:text-[11px] bg-slate-900/60 backdrop-blur-sm border-accent-teal">
            <span className="status-indicator"></span> 2025 Season Live
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black text-white uppercase italic leading-none mb-6 drop-shadow-2xl">
            The Roll of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-sky-400 drop-shadow-none">Legends</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto mb-10 font-medium leading-relaxed px-4 drop-shadow-lg">
            South Africa's premier competitive Ludo circuit.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollToSection('tournaments')} className="btn-action btn-action-primary w-full sm:w-auto shadow-[0_0_30px_rgba(20,184,166,0.6)]">
              Enter Tournament <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection('history')} className="btn-action border-2 border-slate-500 text-white hover:border-accent-teal w-full sm:w-auto bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800">
              View History
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
