 // src/components/features/Hero.tsx
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { LudoBoardDecoration } from '../ui/SharedUI';

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden border-b border-teal-950">
      <LudoBoardDecoration />
      <div className="relative z-10 max-w-7xl mx-auto px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-block tag-status mb-8">
            <span className="status-indicator"></span>
            2025 Season Live
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black text-white uppercase italic leading-none mb-6">
            The Roll of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-sky-400">Legends</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            South Africa's premier competitive Ludo circuit. From the streets of Alexandra to the global stage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => document.getElementById('tournaments')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-action btn-action-primary w-full sm:w-auto"
            >
              Enter Tournament <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-action btn-action-outline w-full sm:w-auto"
            >
              <PlayCircle size={18} /> Watch Highlights
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
