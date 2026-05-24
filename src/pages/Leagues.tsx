import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion } from 'motion/react';

export const Leagues = () => {
  return (
    <div className="w-full relative z-10 flex flex-col">
      {/* League 1 — Mamelodi Ludo League (Sky Blue) */}
      <section id="leagues" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A] border-b border-white/15">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="md:w-1/2 space-y-6">
            <span className="tag-status border-[#0F172A] text-slate-800">Mamelodi</span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Mamelodi Ludo League</h2>
            <p className="text-slate-700 leading-relaxed text-lg">Started February 2019 • 20 Active Clubs • Pretoria Region</p>
            <p className="text-slate-800 leading-relaxed text-lg">
              South Africa's fastest-growing competitive district. High strategy, dedicated fanbases, and weekly neighborhood fixtures that lock out local halls.
            </p>
          </motion.div>
          {/* Custom SVG Map Outline representing Pretoria / Mamelodi */}
          <div className="md:w-1/2 flex items-center justify-center p-8 bg-white/10 rounded-3xl border border-white/20 h-80">
            <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M10 20 L30 10 L50 25 L80 15 L90 40 L70 60 L85 90 L40 85 L20 95 L10 60 Z" />
              <circle cx="50" cy="25" r="4" fill="#D32F2F" />
              <line x1="10" y1="20" x2="90" y2="40" strokeDasharray="4" />
              <line x1="20" y1="95" x2="80" y2="15" strokeDasharray="4" />
            </svg>
          </div>
        </div>
      </section>

      {/* League 2 — Battle of the Kasis (Navy) */}
      <section className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A] text-white border-b border-white/15">
        <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Custom SVG Triple Shields representing Soweto, Alexandra, and Mamelodi */}
          <div className="md:w-1/2 flex items-center justify-center gap-4 h-80">
            <svg width="100" height="120" viewBox="0 0 100 100" fill="#ef4444" className="drop-shadow-lg">
              <path d="M50 0 C70 0 90 20 90 50 C90 80 50 100 50 100 C50 100 10 80 10 50 C10 20 30 0 50 0 Z" />
              <text x="50" y="55" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">SOW</text>
            </svg>
            <svg width="110" height="130" viewBox="0 0 100 100" fill="#e8a020" className="drop-shadow-xl -translate-y-4">
              <path d="M50 0 C70 0 90 20 90 50 C90 80 50 100 50 100 C50 100 10 80 10 50 C10 20 30 0 50 0 Z" />
              <text x="50" y="55" fill="#0F172A" fontSize="16" fontWeight="bold" textAnchor="middle">BOTK</text>
            </svg>
            <svg width="100" height="120" viewBox="0 0 100 100" fill="#3b82f6" className="drop-shadow-lg">
              <path d="M50 0 C70 0 90 20 90 50 C90 80 50 100 50 100 C50 100 10 80 10 50 C10 20 30 0 50 0 Z" />
              <text x="50" y="55" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">ALX</text>
            </svg>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="md:w-1/2 space-y-6">
            <span className="tag-status border-[#0EA5E9]">THE SHOWDOWN</span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Battle of the Kasis (BOTK)</h2>
            <p className="text-[#0EA5E9] leading-relaxed text-lg">Soweto vs Alexandra vs Mamelodi Knockout</p>
            <p className="text-slate-300 leading-relaxed text-lg">
              The ultimate inter-township clash. The three titans of the league send their top 5 ranked clubs into a brutal, winner-takes-all knockout bracket. Only the best survive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* League 3 — Alexandra Ludo League (Sky Blue) */}
      <section className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A]">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="md:w-1/2 space-y-6">
            <span className="tag-status border-[#0F172A] text-slate-800">Alexandra</span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Alexandra Ludo League</h2>
            <p className="text-slate-700 leading-relaxed text-lg">Origin League • Est. 2016 • Alexandra, Gauteng</p>
            <p className="text-slate-800 leading-relaxed text-lg">
              The historic birthplace of professional Ludo. Where strategic blockings and the modern rules of the league were first declared.
            </p>
          </motion.div>
          {/* Custom Golden SVG Trophy */}
          <div className="md:w-1/2 flex items-center justify-center p-8 bg-white/10 rounded-3xl border border-white/20 h-80">
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FFC107] drop-shadow-xl">
              <path d="M30 20 H70 V50 C70 65 50 75 50 75 C50 75 30 65 30 50 Z" fill="#FFC107" />
              <path d="M50 75 V90" strokeWidth="4" />
              <path d="M25 90 H75" strokeWidth="6" />
              <path d="M30 30 H15 V45 H30" />
              <path d="M70 30 H85 V45 H70" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};
