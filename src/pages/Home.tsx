import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { LudoBoardDecoration } from '../components/ui/SharedUI';
import { Page } from '../App';

export const Home = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-10 overflow-hidden">
      <LudoBoardDecoration />
      
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_School_team_hold_Ludo_league_Boards_xaiclf.jpg" 
          alt="Ludo League SA Hero" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block tag-status mb-6 text-[9px] md:text-[11px]">
            <span className="status-indicator"></span> 2025 Season Live
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black text-white uppercase italic leading-none mb-6">
            The Roll of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-sky-400">Legends</span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 font-medium leading-relaxed px-4">
            South Africa's premier competitive Ludo circuit. From the streets to the global stage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setActivePage('Tournaments')} className="btn-action btn-action-primary w-full sm:w-auto">
              Enter Tournament <ArrowRight size={18} />
            </button>
            <button onClick={() => setActivePage('History')} className="btn-action btn-action-outline w-full sm:w-auto">
              View Circuit History
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
