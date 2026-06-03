import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface SelectorProps {
  selectedVariant: string;
  setSelectedVariant: (id: string) => void;
  onSelectComplete: () => void;
}

const variants = [
  { id: 'board-purple', name: 'Royal Purple', src: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458042/Final_Purple_Board_hohd9k.png', price: 1200 },
  { id: 'board-original', name: 'Classic Teal', src: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458042/Final_Original_Board_m6uyqi.png', price: 1200 },
  { id: 'board-black', name: 'Obsidian Black', src: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Black_Board_aq9yjo.png', price: 1200 },
  { id: 'board-blue', name: 'Electric Blue', src: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Blue_Board_mvqu4j.png', price: 1200 },
  { id: 'board-orange', name: 'Amber Orange', src: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Orange_Board_h3mopp.png', price: 1200 },
  { id: 'tokens-dice', name: 'Token & Dice Set', src: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Tokens_and_Dice_gk3mbd.png', price: 200 }
];

export const ShopSelector: React.FC<SelectorProps> = ({ selectedVariant, setSelectedVariant, onSelectComplete }) => {
  const currentIndex = variants.findIndex(v => v.id === selectedVariant);

  const handleNext = () => {
    setSelectedVariant(variants[(currentIndex + 1) % variants.length].id);
  };

  const handlePrev = () => {
    setSelectedVariant(variants[(currentIndex - 1 + variants.length) % variants.length].id);
  };

  const currentItem = variants[currentIndex];

  return (
    <div className="relative w-full h-screen bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Ambient floor glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-gradient-to-t from-[#FFC107]/5 to-transparent -z-10" />

      {/* Central accent pillar behind product */}
      <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-[55%] top-[12%] bg-gradient-to-b from-[#FFC107] via-[#FF8C00] to-[#FFC107] shadow-[0_0_60px_20px_rgba(255,193,7,0.35)] -z-10" />

      {/* Selector Heading */}
      <div className="absolute top-24 text-center space-y-2">
        <span className="text-[10px] tracking-[0.2em] font-black uppercase text-[#FFC107]">Choose Your Selection</span>
        <h3 className="text-3xl font-display font-black uppercase italic text-white">The Catalog</h3>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex items-center justify-center gap-6 sm:gap-12 relative max-w-4xl w-full">
        <button onClick={handlePrev} className="p-3 bg-slate-800 border border-slate-700 rounded-full hover:bg-white hover:text-slate-950 transition-all text-white cursor-pointer select-none">&larr;</button>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedVariant}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 p-2 bg-white flex items-center justify-center">
              <img src={currentItem.src} alt={currentItem.name} className="max-w-full max-h-full object-contain" />
            </div>
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFC107]">Professional Series</span>
              <h4 className="text-xl sm:text-2xl font-display font-black italic text-white uppercase">{currentItem.name}</h4>
              <p className="text-sm font-black text-slate-300">R{currentItem.price.toLocaleString()}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button onClick={handleNext} className="p-3 bg-slate-800 border border-slate-700 rounded-full hover:bg-white hover:text-slate-950 transition-all text-white cursor-pointer select-none">&rarr;</button>
      </div>

      {/* Action Button */}
      <button 
        onClick={onSelectComplete}
        className="absolute bottom-12 px-10 py-4 bg-[#FFC107] text-[#0F172A] font-black uppercase text-xs tracking-widest rounded-xl shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
      >
        <Check size={14} /> Select This Board
      </button>
    </div>
  );
};
