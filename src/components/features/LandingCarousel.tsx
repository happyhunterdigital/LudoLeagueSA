import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';

interface NewsItem {
  tag: string;
  title: string;
  date: string;
}

const newsItems: NewsItem[] = [
  { tag: "COMMUNITY FUNDING", title: "Your contributions sustain screen-free learning clinics and township manufacturing jobs", date: "Active Now" },
  { tag: "SPONSOR BENEFITS", title: "LLSA partnerships offer high brand visibility in regional hubs and full B-BBEE alignment", date: "2026 Cycle" },
  { tag: "INVESTOR APPS", title: "Secure club ownership with standard RTP licenses modeled after premier business structures", date: "Open" },
  { tag: "DONATE & EMPOWER", title: "Every R20 directly funds local carpentry artisans crafting handcrafted timber tournament boards", date: "Ongoing" }
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
    <div className="w-full bg-[#0A0A0A] text-white py-4 px-6 md:px-10 flex items-center justify-between border-b border-white/[0.04] relative z-10">
      <div className="flex items-center gap-3 flex-grow overflow-hidden">
        <div className="flex items-center gap-1.5 bg-[#FACC15]/10 text-[#FACC15] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] shrink-0">
          <Bell size={11} className="animate-bounce" /> News Flash
        </div>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-xs md:text-sm font-medium truncate text-white/60"
        >
          <span className="text-[#FACC15] font-bold mr-2">[{newsItems[currentIndex].tag}]</span>
          {newsItems[currentIndex].title} ({newsItems[currentIndex].date})
        </motion.div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0 ml-4">
        <button onClick={handlePrev} className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors text-white/40 hover:text-white">
          <ChevronLeft size={16} />
        </button>
        <button onClick={handleNext} className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors text-white/40 hover:text-white">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
