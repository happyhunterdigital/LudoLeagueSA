import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { LudoBoardDecoration } from '../ui/SharedUI';

export const LandingHero = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <section id="home" className="min-h-screen w-full relative flex flex-col items-center justify-center pt-32 pb-20 border-b" style={{ borderColor: 'var(--border-color)' }}>
      <LudoBoardDecoration />
      
      {/* 
        Image is now 100% visible (opacity-100), no blue overlay. 
        Gradients use dynamic var(--bg) to fade the borders heavily while leaving the boards visible. 
      */}
      <div className="absolute inset-0 z-0">
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
            className="w-full h-full object-cover object-center"
          />
        </picture>
        
        {/* Expanded Border Fades */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 transition-colors duration-700" style={{ backgroundImage: 'linear-gradient(to top, var(--bg), transparent)' }}></div>
        <div className="absolute inset-x-0 top-0 h-1/4 transition-colors duration-700" style={{ backgroundImage: 'linear-gradient(to bottom, var(--bg), transparent)' }}></div>
        <div className="absolute inset-y-0 left-0 w-1/4 hidden md:block transition-colors duration-700" style={{ backgroundImage: 'linear-gradient(to right, var(--bg), transparent)' }}></div>
        <div className="absolute inset-y-0 right-0 w-1/4 hidden md:block transition-colors duration-700" style={{ backgroundImage: 'linear-gradient(to left, var(--bg), transparent)' }}></div>
        
        {/* Subtle center radial to ensure white text pops without ruining the image */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center mt-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="tag-status mb-6">
            <span className="status-indicator"></span> 2025 Season Live
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black uppercase italic leading-none mb-6 drop-shadow-2xl text-white">
            The Roll of <br /> <span className="text-sky-400 drop-shadow-none">Legends</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed px-4 drop-shadow-lg text-white">
            South Africa's premier competitive Ludo circuit.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollToSection('tournaments')} className="btn-action w-full sm:w-auto">
              Enter Tournament <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection('history')} className="px-10 py-5 uppercase text-[11px] tracking-[0.25em] font-black italic transition-all duration-300 flex items-center justify-center gap-2 rounded-xl border-2 hover:bg-white hover:text-black w-full sm:w-auto backdrop-blur-sm text-white" style={{ borderColor: 'var(--accent)' }}>
              View History
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
