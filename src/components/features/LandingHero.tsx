import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { LudoBoardDecoration } from '../ui/SharedUI';

export const LandingHero = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <section id="home" className="min-h-[90vh] w-full relative flex flex-col items-center justify-center pt-32 pb-20 border-b border-slate-200">
      <LudoBoardDecoration />
      
      <div className="absolute inset-0 z-0 opacity-20">
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
            className="w-full h-full object-cover object-center mix-blend-luminosity"
          />
        </picture>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center mt-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block tag-status mb-6 text-[9px] md:text-[11px] text-slate-800">
            <span className="status-indicator"></span> 2025 Season Live
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black text-slate-900 uppercase italic leading-none mb-6">
            The Roll of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-blue-600">Legends</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 font-medium leading-relaxed px-4">
            South Africa's premier competitive Ludo circuit.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollToSection('tournaments')} className="btn-action btn-action-primary w-full sm:w-auto">
              Enter Tournament <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection('history')} className="btn-action border-2 border-slate-300 text-slate-700 hover:border-accent-teal hover:bg-slate-100 w-full sm:w-auto bg-white/80 backdrop-blur-sm">
              View History
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
