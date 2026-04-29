import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { LudoBoardDecoration } from '../components/ui/SharedUI';
import { CommunityFund } from '../components/features/CommunityFund';
import { Page } from '../App';

export const Home = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <>
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-10 overflow-hidden">
        <LudoBoardDecoration />
        
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_School_team_hold_Ludo_league_Boards_xaiclf.jpg" 
            alt="Ludo League SA Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg-deep to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-deep to-transparent"></div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-deep to-transparent hidden md:block"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-deep to-transparent hidden md:block"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center mt-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block tag-status mb-6 text-[9px] md:text-[11px] bg-bg-deep/60 backdrop-blur-sm border-white/10">
              <span className="status-indicator"></span> 2025 Season Live
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black text-white uppercase italic leading-none mb-6 drop-shadow-2xl">
              The Roll of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-sky-400 drop-shadow-none">Legends</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-2xl text-white max-w-2xl mx-auto mb-10 font-medium leading-relaxed px-4 drop-shadow-lg">
              South Africa's premier competitive Ludo circuit. From the streets to the global stage.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setActivePage('Tournaments')} className="btn-action btn-action-primary w-full sm:w-auto shadow-[0_0_30px_rgba(20,184,166,0.6)]">
                Enter Tournament <ArrowRight size={18} />
              </button>
              <button onClick={() => setActivePage('History')} className="btn-action btn-action-outline w-full sm:w-auto bg-bg-deep/40 backdrop-blur-sm hover:bg-bg-deep/80">
                View Circuit History
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CommunityFund />
    </>
  );
};
