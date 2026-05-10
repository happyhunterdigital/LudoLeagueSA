import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export const SectionHeader = ({ tag, title, subtitle, colorClass }: { tag: string, title: string, subtitle?: string, colorClass?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-4xl mx-auto mb-20"
    >
      <div className="mb-6 bg-[#0F172A] text-white text-[11px] uppercase font-black italic tracking-widest px-4 py-2 border-l-4 border-[#0EA5E9] inline-flex items-center shadow-lg rounded-r-xl">
        <span className="w-3 h-3 rounded-full mr-3 bg-[#FFC107]"></span> {tag}
      </div>
      <h2 className={`text-5xl md:text-7xl font-display font-black mb-6 uppercase italic leading-none drop-shadow-sm ${colorClass || 'text-white'}`}>
        {title}
      </h2>
      {subtitle && <p className={`text-lg md:text-xl font-bold tracking-tight leading-relaxed max-w-2xl mx-auto opacity-90 ${colorClass === 'text-white' ? 'text-white' : 'text-[#0F172A]'}`}>{subtitle}</p>}
    </motion.div>
  );
};

export const LudoBoardDecoration = () => (
  <>
    <div className="absolute w-64 h-64 opacity-10 blur-[100px] -z-10 top-0 left-0 bg-[#E31B23]" />
    <div className="absolute w-64 h-64 opacity-10 blur-[100px] -z-10 top-0 right-0 bg-[#10B981]" />
    <div className="absolute w-64 h-64 opacity-10 blur-[100px] -z-10 bottom-0 left-0 bg-[#FFC107]" />
    <div className="absolute w-64 h-64 opacity-10 blur-[100px] -z-10 bottom-0 right-0 bg-[#0033A0]" />
  </>
);
