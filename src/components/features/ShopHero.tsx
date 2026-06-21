import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const phrases = [
  "Handcrafted African Timber",
  "Oversized Professional Design",
  "Rigid Warp-Resistant Surface"
];

export const ShopHero = ({ onExplore }: { onExplore: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden">
      {/* Twin pulsing accent pillars */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[4px] h-[70vh] bg-gradient-to-b from-transparent via-[#FFC107] to-transparent shadow-[0_0_40px_15px_rgba(255,193,7,0.4)] animate-pulse" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[4px] h-[70vh] bg-gradient-to-b from-transparent via-[#FFC107] to-transparent shadow-[0_0_40px_15px_rgba(255,193,7,0.4)] animate-pulse" />

      {/* Dark radial fog overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.35)_0%,rgba(15,23,42,0.95)_100%)]" />

      {/* Hero Visual */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 mb-8"
      >
        <img src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1780434262/Ludo_League_SA_Tokens_x4cu8a.jpg" alt="Ludo Hero" className="w-full h-full object-cover" />
      </motion.div>

      {/* Cycling feature text with crossfades */}
      <div className="relative z-10 text-center h-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            <h2 className="text-lg md:text-2xl font-black font-display uppercase tracking-[0.2em] text-white">{phrases[index]}</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Designed for Competitive Play</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <button onClick={onExplore} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[9px] tracking-[0.3em] text-white/50 hover:text-white transition-colors cursor-pointer z-20">
        <span>EXPLORE CATALOG</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-[#FFC107]" />
        </motion.div>
      </button>
    </div>
  );
};
