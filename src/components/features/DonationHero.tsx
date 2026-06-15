import React from 'react';
import { motion } from 'framer-motion';

// Simple utility function to combine class names without requiring external libraries
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Fully typed props allowing flexibility while maintaining robust defaults
interface StatProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ActionProps {
  text: string;
  onClick: () => void;
  className?: string;
  isPrimary?: boolean;
}

interface DonationHeroProps {
  title?: React.ReactNode;
  subtitle?: string;
  actions?: ActionProps[];
  stats?: StatProps[];
  className?: string;
}

// Fixed Cloudinary image paths provided for the Ludo4Schools ecosystem
const DEFAULT_IMAGES = [
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1781478032/Ludo4School_Ludo_league_ckgoa0.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1781478039/Ludo4School-Ludoleague_wmbnpe.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1781478024/Ludo4School_Ludoleague_epotdv.jpg"
];

// High-contrast animation variants matching the UI UX Pro Max layout guidelines
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Premium cinematic ease-out
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const DonationHero = ({
  title = (
    <>
      POWERING THE NEXT LEVEL OF <span className="text-[#FFE600]">LUDO4SCHOOLS</span>
    </>
  ),
  subtitle = "Your contribution directly funds the expansion of our Gauteng classroom clinics, tournament equipment, and youth development infrastructure across South Africa.",
  actions = [
    { text: "Donate Safely Now", onClick: () => {}, isPrimary: true },
    { text: "View Our Roadmap", onClick: () => {}, isPrimary: false }
  ],
  stats = [
    { value: "15+", label: "New Clinics Slotted" },
    { value: "100%", label: "Direct Impact Sourced" },
    { value: "2026", label: "League Roadmap Vision" }
  ],
  className
}: DonationHeroProps) => {
  return (
    <section className={cn('w-full overflow-hidden bg-black py-20 lg:py-32 border-b border-neutral-900', className)}>
      <div className="container mx-auto px-4 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        
        {/* Left Column: Premium Text Architecture */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Elite Mini-Tag */}
          <motion.span 
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFE600]/30 bg-[#FFE600]/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-[#FFE600]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFE600] animate-pulse" />
            Official Development Fund
          </motion.span>

          <motion.h1
            className="text-4xl font-black tracking-tight text-white sm:text-6xl uppercase font-display"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          
          <motion.p className="mt-6 max-w-lg text-base md:text-lg text-neutral-400 font-sans leading-relaxed" variants={itemVariants}>
            {subtitle}
          </motion.p>
          
          {/* Custom Yellow & Black Action Cluster */}
          <motion.div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start" variants={itemVariants}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={cn(
                  "px-8 py-4 text-sm uppercase font-mono font-black tracking-wider transition-all duration-300 rounded-none border",
                  action.isPrimary 
                    ? "bg-[#FFE600] text-black border-[#FFE600] hover:bg-black hover:text-[#FFE600]"
                    : "bg-transparent text-white border-white/20 hover:border-[#FFE600] hover:text-[#FFE600]",
                  action.className
                )}
              >
                {action.text}
              </button>
            ))}
          </motion.div>

          {/* Core Impact Matrix Row */}
          <motion.div className="mt-14 grid grid-cols-3 gap-6 md:gap-12 w-full max-w-md border-t border-neutral-900 pt-8" variants={itemVariants}>
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center lg:items-start">
                <p className="text-3xl font-black text-[#FFE600] font-display tracking-tight">{stat.value}</p>
                <p className="text-xs font-mono uppercase text-neutral-500 mt-1 text-center lg:text-left leading-tight">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: High-Contrast Dynamic Collage */}
        <motion.div
          className="relative h-[450px] w-full sm:h-[550px] flex items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Pure Theme Decorative Ambient Gradients (No colors from outside the palette) */}
          <motion.div
            className="absolute top-10 left-1/4 h-32 w-32 rounded-full bg-[#FFE600]/5 blur-3xl"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-10 right-1/4 h-24 w-24 rounded-full bg-[#FFE600]/5 blur-2xl"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: '0.5s' }}
          />

          {/* Back Left Image Layer */}
          <motion.div
            className="absolute bottom-4 left-2 h-40 w-40 overflow-hidden border border-neutral-800 bg-neutral-900 p-1.5 shadow-2xl sm:h-56 sm:w-56 grayscale hover:grayscale-0 transition-all duration-500 z-10"
            style={{ transformOrigin: 'top right' }}
            variants={imageVariants}
          >
            <img src={DEFAULT_IMAGES[2]} alt="Ludo4Schools collaborative clinic session" className="h-full w-full object-cover" />
          </motion.div>

          {/* Top Center Focus Image Layer */}
          <motion.div
            className="absolute left-1/2 top-4 h-52 w-52 -translate-x-1/2 overflow-hidden border-2 border-[#FFE600] bg-neutral-900 p-2 shadow-2xl sm:h-72 sm:w-72 z-20"
            style={{ transformOrigin: 'bottom center' }}
            variants={imageVariants}
          >
            <img src={DEFAULT_IMAGES[0]} alt="Ludo League SA youth development matching" className="h-full w-full object-cover" />
          </motion.div>
          
          {/* Bottom Right Floating Image Layer */}
          <motion.div
            className="absolute right-2 top-1/3 h-44 w-44 overflow-hidden border border-neutral-800 bg-neutral-900 p-1.5 shadow-2xl sm:h-60 sm:w-60 grayscale hover:grayscale-0 transition-all duration-500 z-10"
            style={{ transformOrigin: 'left center' }}
            variants={imageVariants}
          >
            <img src={DEFAULT_IMAGES[1]} alt="Tournament execution layout" className="h-full w-full object-cover" />
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};
