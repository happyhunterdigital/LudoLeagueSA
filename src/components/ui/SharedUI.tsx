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
      <div className="tag-status mb-6">
        {tag}
      </div>
      <h2 className={`text-5xl md:text-7xl font-display font-black mb-6 uppercase italic leading-none ${colorClass || ''}`} style={{ color: colorClass ? undefined : 'var(--text)' }}>
        {title}
      </h2>
      {subtitle && <p className="text-lg md:text-xl font-medium tracking-tight leading-relaxed max-w-2xl mx-auto opacity-70" style={{ color: 'var(--text)' }}>{subtitle}</p>}
    </motion.div>
  );
};

export const LudoToken = ({ color, className }: { color: string, className?: string }) => (
  <div className={`w-8 h-8 rounded-full border-2 border-white/20 shadow-lg ${className}`} style={{ backgroundColor: color }}>
    <div className="w-full h-full rounded-full border-t border-white/40" />
  </div>
);

export const LudoBoardDecoration = () => (
  <>
    <div className="board-corner top-0 left-0 bg-ludo-red" />
    <div className="board-corner top-0 right-0 bg-ludo-green" />
    <div className="board-corner bottom-0 left-0 bg-ludo-yellow" />
    <div className="board-corner bottom-0 right-0 bg-ludo-blue" />
  </>
);
