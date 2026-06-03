import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  { headline: "Balanced Acrylic Tokens", subline: "Engineered specifically for low-friction movements, preventing accidental displacements during competitive play." },
  { headline: "6mm Premium MDF Rigidity", subline: "High-density locally tailored solid wood frame guaranteeing complete resistance to warping." },
  { headline: "106x87x2cm Box Dimensions", subline: "Oversized tactical play layout satisfying physical standards required for serious tournament play." }
];

export const ShopFeatures = ({ selectedVariant }: { selectedVariant: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient background glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#0EA5E9]/10 blur-[100px] -z-10 top-1/3 left-1/4" />

      {/* Side Slide Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl w-full">
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950/60 p-6 flex items-center justify-center min-h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent -z-10" />
          <motion.img 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1780434262/Ludo_League_SA_Tokens_x4cu8a.jpg" 
            alt="Feature focus" 
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>

        <div className="h-48 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
              className="space-y-4 text-left"
            >
              <span className="text-[10px] tracking-[0.2em] font-black uppercase text-[#0EA5E9]">Features & Specifications</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase italic leading-none text-white">{slides[index].headline}</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{slides[index].subline}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
