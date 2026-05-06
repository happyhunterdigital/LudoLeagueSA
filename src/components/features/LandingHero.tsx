import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { LudoBoardDecoration } from '../ui/SharedUI';
import { Page } from '../../App';

export const LandingHero = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  const scrollToDonation = () => {
    document.getElementById('donation-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center py-20 overflow-hidden border-b border-white/10">
      <LudoBoardDecoration />
      
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949472/Ludo_League_SA_School_team_hold_Ludo_league_Boards_available_on_our_website_o9kls9.jpg" 
          alt="Ludo League SA Gameplay" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg-deep to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-deep to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-deep to-transparent hidden md:block"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-deep to-transparent hidden md:block"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center mt-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="tag-status bg-bg-deep/80 backdrop-blur-sm border-accent-teal text-white shadow-lg">
              <span className="status-indicator"></span> R12,500+ Raised
            </div>
            <div className="tag-status bg-bg-deep/80 backdrop-blur-sm border-accent-teal text-white shadow-lg">
              <span className="status-indicator"></span> 500+ Active Players
            </div>
          </div>
          
          <h2 className="text-xl md:text-3xl text-accent-teal font-bold tracking-widest uppercase mb-4 drop-shadow-md">
            South Africa's Premier Ludo League
          </h2>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black text-white uppercase italic leading-none mb-6 drop-shadow-2xl">
            From the Streets <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-sky-400 drop-shadow-none">To The Global Stage</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto mb-10 font-medium leading-relaxed px-4 drop-shadow-lg">
            Building community, inspiring champions, and transforming lives through the sport of ludo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => setActivePage('Tournaments')} 
              className="btn-action btn-action-primary w-full sm:w-auto shadow-[0_0_30px_rgba(20,184,166,0.6)] text-sm px-12"
            >
              Join the Movement <ArrowRight size={18} />
            </button>
            <button 
              onClick={scrollToDonation} 
              className="btn-action bg-accent-gold text-bg-deep hover:bg-white hover:text-accent-gold transition-colors w-full sm:w-auto shadow-[0_0_30px_rgba(251,191,36,0.4)] text-sm px-12"
            >
              <Heart size={18} /> Support Us Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
