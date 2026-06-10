import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const textLineVariants = {
  initial: { y: "105%" },
  animate: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const leftPanelVariants = {
  initial: { x: 0 },
  exit: { x: "-100%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 } }
};

const rightPanelVariants = {
  initial: { x: 0 },
  exit: { x: "100%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 } }
};

export const LudoLoader: React.FC<LoaderProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[10000] flex select-none pointer-events-none"
      onAnimationComplete={(definition) => {
        if (definition === "exit") onComplete();
      }}
    >
      <motion.div variants={leftPanelVariants} className="w-1/2 h-full bg-white text-black flex items-center justify-end overflow-hidden pr-[4vw] border-r border-neutral-100">
        <motion.div variants={containerVariants} className="flex flex-col items-end text-right font-display font-black tracking-thonik-mega uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9]">
          <div className="overflow-hidden py-2">
            <motion.span variants={textLineVariants} className="block">LUDO LEAGUE</motion.span>
          </div>
          <div className="overflow-hidden py-2">
            <motion.span variants={textLineVariants} className="block text-neutral-400">EST. 2009</motion.span>
          </div>
          <div className="overflow-hidden py-1 mt-6">
            <motion.span variants={textLineVariants} className="block text-[10px] tracking-thonik-wide font-sans font-black text-neutral-500">// LOADING SYSTEM</motion.span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={rightPanelVariants} className="w-1/2 h-full bg-white text-black flex items-center justify-start overflow-hidden pl-[4vw]">
        <motion.div variants={containerVariants} className="flex flex-col items-start text-left font-display font-black tracking-thonik-mega uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9]">
          <div className="overflow-hidden py-2">
            <motion.span variants={textLineVariants} className="block">SOUTH AFRICA</motion.span>
          </div>
          <div className="overflow-hidden py-2">
            <motion.span variants={textLineVariants} className="block text-neutral-400">CIRCUIT ENGINE</motion.span>
          </div>
          <div className="overflow-hidden py-1 mt-6">
            <motion.span variants={textLineVariants} className="block text-[10px] tracking-thonik-wide font-sans font-black text-neutral-400">©2026_V1.0</motion.span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
