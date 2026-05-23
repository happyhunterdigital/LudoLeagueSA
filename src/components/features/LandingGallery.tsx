import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../ui/SharedUI';

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
    <section id="board-gallery" className="relative z-10 py-24 px-6 md:px-10 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <SectionHeader tag="Equipment" title="Choose Your Board" colorClass="text-[#FFC107]" />
          <p className="text-slate-300 max-w-lg">
            Our luxury wooden boards are custom-engineered for balanced, competitive tournament play, utilizing professional-grade, high-density local timber.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-4">
            {boards.map((board) => (
              <button 
                key={board.id} 
                onClick={() => setSelected(board)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white ${selected.id === board.id ? 'border-[#FFC107] scale-110 shadow-lg' : 'border-white/10 opacity-70 hover:opacity-100'}`}
              >
                <img src={board.src} alt={board.name} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col items-center">
          <div className="h-80 w-full max-w-md bg-white rounded-3xl p-6 flex items-center justify-center border border-white/10 shadow-2xl relative">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selected.id}
                src={selected.src} 
                alt={selected.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-h-full max-w-full object-contain"
              />
            </AnimatePresence>
          </div>
          <div className="text-center mt-6">
            <h4 className="text-2xl font-display font-black italic text-[#FFC107]">{selected.name}</h4>
            <p className="text-slate-400 text-sm mt-1">{selected.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
