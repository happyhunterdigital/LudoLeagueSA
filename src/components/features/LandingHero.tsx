import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { LudoBoardDecoration } from '../ui/SharedUI';

export const LandingHero = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <section id="home" className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-black">
      <LudoBoardDecoration />

      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover object-center scale-105">
          <source src="https://res.cloudinary.com/dfzeb1s54/video/upload/q_auto/f_auto/v1780409268/Giant_die_falling_onto_Ludo_league_SA_ludo_board_vosbiv.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        {/* Subtle brand glow on bottom */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/90 to-transparent" />
      </div>

      {/* ── Decorative accent lines ── */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FACC15] to-transparent opacity-40 z-20" />

      {/* ── Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center pt-32 pb-24 md:pt-40 md:pb-32">
        
        {/* Eyebrow Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 text-[10px] md:text-xs text-white/90 bg-white/5 backdrop-blur-md uppercase font-bold tracking-[0.2em] px-5 py-2.5 border border-white/10 rounded-full">
            <span className="status-indicator"></span>
            <span>2026 Season Live</span>
            <Zap size={12} className="text-[#FACC15] ml-1" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-display font-black uppercase leading-[0.9] mb-8 tracking-tight"
        >
          <span className="text-white">The Roll of</span>
          <br />
          <span className="bg-gradient-to-r from-[#FACC15] via-[#FFE600] to-[#FACC15] bg-clip-text text-transparent drop-shadow-none">
            Legends
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed text-white/70"
        >
          South Africa's premier competitive Ludo circuit. 
          <span className="text-white/90 font-semibold"> Play. Compete. Earn.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
        >
          {/* King's Table Register CTA */}
          <button
            onClick={() => scrollToSection('kingstable')}
            className="relative inline-flex items-center gap-2 px-7 py-4 font-black text-sm uppercase tracking-widest rounded-xl overflow-hidden group"
            id="hero-cta-kingstable"
            style={{
              background: 'linear-gradient(135deg, #FACC15 0%, #D4A017 100%)',
              color: '#000',
              boxShadow: '0 0 30px rgba(250,204,21,0.25)'
            }}
          >
            <span className="text-lg leading-none">👑</span>
            Register Now — King's Table
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button 
            onClick={() => scrollToSection('tournaments')} 
            className="btn-action text-sm"
            id="hero-cta-primary"
          >
            Enter Tournament <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => scrollToSection('history')} 
            className="btn-secondary text-sm w-full sm:w-auto"
            id="hero-cta-secondary"
          >
            View History
          </button>
        </motion.div>

        {/* Stats ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { value: '500+', label: 'Active Players' },
            { value: 'R100k+', label: 'Prize Money' },
            { value: '50+', label: 'Schools Reached' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-black text-[#FACC15]">{stat.value}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/40 font-semibold mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-[#FACC15] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
