import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

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
  videoUrl?: string;
  className?: string;
}

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
  videoUrl = "https://res.cloudinary.com/dfzeb1s54/video/upload/v1783104793/Ludo_League_Fund_raising_hero_section_video_d0qhp7.mp4",
  className
}: DonationHeroProps) => {
  const [isMuted, setIsMuted] = useState(true); // Default to true to bypass browser autoplay blocks

  return (
    <section className={cn('relative w-full overflow-hidden bg-black flex flex-col md:flex-row md:items-center md:justify-center md:min-h-[85vh] border-b border-neutral-900', className)}>
      
      {/* Video Container */}
      {/* On mobile: static block at the top with aspect-video. On desktop: absolute inset-0 object-cover */}
      <div className="relative w-full md:absolute md:inset-0 md:h-full md:w-full z-0 aspect-video md:aspect-auto h-auto md:h-full overflow-hidden">
        <video 
          src={videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Anti-Gravity Protocol Phase 1: High contrast background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black md:from-black/85 md:via-black/60 md:to-black z-10" />

        {/* Floating Mute/Unmute Control directly on the video */}
        <button 
          onClick={() => setIsMuted(!isMuted)} 
          className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-white/20 hover:border-[#FFE600] text-white hover:text-[#FFE600] transition-all focus:outline-none flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider shadow-lg"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <>
              <VolumeX size={14} />
              <span>Unmute</span>
            </>
          ) : (
            <>
              <Volume2 size={14} />
              <span>Mute</span>
            </>
          )}
        </button>
      </div>

      {/* Content Container */}
      {/* On mobile: stacked below the video. On desktop: centered on top of video */}
      <div className="relative container mx-auto px-6 py-12 md:py-28 lg:py-36 z-20 flex flex-col items-center text-center max-w-4xl">
        
        <motion.div
          className="flex flex-col items-center text-center w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Elite Mini-Tag */}
          <motion.span 
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFE600]/30 bg-[#FFE600]/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#FFE600]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFE600] animate-pulse" />
            Official Development Fund
          </motion.span>

          <motion.h1
            className="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl uppercase font-display max-w-3xl leading-[1.05]"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          
          <motion.p className="mt-6 max-w-xl text-base md:text-lg text-neutral-300 font-sans leading-relaxed" variants={itemVariants}>
            {subtitle}
          </motion.p>
          
          {/* Custom Yellow & Black Action Cluster */}
          <motion.div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto" variants={itemVariants}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={cn(
                  "px-10 py-4 text-xs uppercase font-mono font-black tracking-wider transition-all duration-300 rounded-none border w-full sm:w-auto",
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
          <motion.div className="mt-16 grid grid-cols-3 gap-6 md:gap-12 w-full max-w-lg border-t border-neutral-900/60 pt-8" variants={itemVariants}>
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-3xl font-black text-[#FFE600] font-display tracking-tight">{stat.value}</p>
                <p className="text-xs font-mono uppercase text-neutral-500 mt-1 text-center leading-tight">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
