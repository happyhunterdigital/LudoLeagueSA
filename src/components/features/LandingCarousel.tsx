import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';

interface NewsItem {
  tag: string;
  title: string;
  date: string;
}

const newsItems: NewsItem[] = [
  { tag: "SEASON UPDATE", title: "National Qualifiers now active in Pretoria & Soweto", date: "May 2026" },
  { tag: "RULEBOOK", title: "Standardized time-control parameters updated for 2026", date: "April 2026" },
  { tag: "COMMUNITY", title: "Ludo4Schools launches in 15 new Gauteng schools", date: "April 2026" },
  { tag: "AWARDS", title: "R100,000 prize pool confirmed for Ludo Summer Clash", date: "March 2026" },
];

export const LandingCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <div className="w-full bg-slate-900 text-white py-4 px-6 md:px-10 flex items-center justify-between border-b border-white/10 relative z-10">
      <div className="flex items-center gap-3 flex-grow overflow-hidden">
        <div className="flex items-center gap-1.5 bg-accent-teal/20 text-[#0EA5E9] px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shrink-0">
          <Bell size={12} className="animate-bounce" /> News Flash
        </div>
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-xs md:text-sm font-medium truncate"
        >
          <span className="text-[#FFC107] font-bold mr-2">[{newsItems[currentIndex].tag}]</span>
          {newsItems[currentIndex].title} ({newsItems[currentIndex].date})
        </motion.div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-4">
        <button onClick={handlePrev} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><ChevronLeft size={16} /></button>
        <button onClick={handleNext} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
};
