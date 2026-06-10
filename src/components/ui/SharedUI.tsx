import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const LudoBoardDecoration = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-10">
      <div className="w-[600px] h-[600px] border-[30px] border-white/20 rounded-full absolute" />
      <div className="w-[800px] h-[800px] border-[20px] border-white/20 rounded-full absolute" />
    </div>
  );
};

interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  colorClass?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  tag, 
  title, 
  subtitle, 
  colorClass = 'text-white' 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`flex flex-col items-center text-center space-y-4 ${colorClass}`}>
      {tag && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-black uppercase tracking-widest eyebrow"
        >
          {tag}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase italic leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-sm sm:text-base opacity-80 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
