import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';

interface BoardItem {
  id: string;
  name: string;
  desc: string;
  src: string;
}

const boards: BoardItem[] = [
  { id: "purple", name: "Royal Purple", desc: "Premium handcrafted timber board layout.", src: "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458042/Final_Purple_Board_hohd9k.png" },
  { id: "original", name: "Classic Teal", desc: "Our signature flagship tournament board.", src: "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458042/Final_Original_Board_m6uyqi.png" },
  { id: "orange", name: "Amber Orange", desc: "High-vibrancy solid wood amber layout.", src: "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Orange_Board_h3mopp.png" },
  { id: "black", name: "Obsidian Black", desc: "Sleek, modern matte obsidian design.", src: "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Black_Board_aq9yjo.png" },
  { id: "blue", name: "Electric Blue", desc: "Modern blue layout certified for league play.", src: "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Blue_Board_mvqu4j.png" },
];

export const LandingGallery: React.FC = () => {
  const [selected, setSelected] = useState<BoardItem>(boards[1]);

  return (
    <section id="board-gallery" className="relative z-10 bg-[#0A0A0A] border-t border-b border-white/[0.04] overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FACC15]/[0.02] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          
          {/* Text side */}
          <ScrollReveal direction="left" className="md:w-1/2 space-y-6">
            <span className="eyebrow">Equipment</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-white leading-[0.95]">
              Choose Your <span className="text-[#FACC15]">Board</span>
            </h2>
            <p className="text-white/40 max-w-lg text-base leading-relaxed">
              Our luxury wooden boards are custom-engineered for balanced, competitive tournament play, utilizing professional-grade, high-density local timber.
            </p>
            
            {/* Board selector thumbnails */}
            <div className="flex flex-wrap gap-3 pt-4">
              {boards.map((board) => (
                <button 
                  key={board.id} 
                  onClick={() => setSelected(board)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 p-1.5 bg-white/5 backdrop-blur-sm ${
                    selected.id === board.id 
                      ? 'border-[#FACC15] scale-110 shadow-[0_0_20px_rgba(250,204,21,0.15)]' 
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={board.src} alt={board.name} className="w-full h-full object-contain" loading="lazy" />
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Board display */}
          <ScrollReveal direction="right" delay={0.2} className="md:w-1/2 flex flex-col items-center">
            <div className="relative h-80 w-full max-w-md bg-[#111827]/40 border border-white/[0.06] rounded-3xl p-8 flex items-center justify-center backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={selected.id}
                  src={selected.src} 
                  alt={selected.name}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-h-full max-w-full object-contain drop-shadow-2xl"
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
            <div className="text-center mt-6">
              <h4 className="text-2xl font-display font-black text-[#FACC15]">{selected.name}</h4>
              <p className="text-white/40 text-sm mt-1">{selected.desc}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
