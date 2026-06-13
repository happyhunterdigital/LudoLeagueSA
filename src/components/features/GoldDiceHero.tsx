import React from 'react';
import { motion } from 'framer-motion';

interface GoldDiceHeroProps {
  onActionClick: () => void;
}

export const GoldDiceHero: React.FC<GoldDiceHeroProps> = ({ onActionClick }) => {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center">
      
      {/* Dynamic Floating Luxury Object Backdrop Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <motion.img 
          src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1781360203/GoldDiceHero_ptqaga.png" 
          alt="Floating Gold Dice Centerpiece" 
          className="max-h-[50vh] max-w-[85%] object-contain opacity-80 select-none"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Overlaid Branded Content Layer */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6 select-none pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-display font-black italic uppercase leading-none text-white">
          Invest in <span className="text-[#FFD700]">Hope.</span> Invest in Ludo.
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans max-w-3xl mx-auto italic">
          "South Africa's youth don't need handouts. They need opportunities. Help us create them, one roll at a time."
        </p>
        <div className="pt-4 pointer-events-auto">
          <button 
            onClick={onActionClick} 
            className="px-10 py-5 bg-[#D32F2F] hover:bg-[#FFD700] text-white hover:text-black font-black uppercase text-[11px] tracking-[0.25em] font-style: italic rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            Back the Movement
          </button>
        </div>
      </div>

    </section>
  );
};
