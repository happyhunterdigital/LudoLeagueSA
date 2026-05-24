import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Page } from '../App';
import { motion } from 'motion/react';

interface LeaguesProps {
  setActivePage: (p: Page) => void;
}

export const Leagues: React.FC<LeaguesProps> = ({ setActivePage }) => {
  return (
    <div className="w-full relative z-10 flex flex-col">
      {/* League 1 — Mamelodi Ludo League (Sky Blue) */}
      <section id="leagues" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A] border-b border-white/15">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6">
            <span className="tag-status border-[#0F172A] text-slate-800">Mamelodi District</span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Mamelodi Ludo League</h2>
            <p className="text-slate-700 font-bold leading-relaxed text-lg">Started February 2019 • 20 Active Clubs • Pretoria Region</p>
            <p className="text-slate-800 leading-relaxed text-lg">
              South Africa's fastest-growing competitive district. High strategy, dedicated fanbases, and weekly neighborhood fixtures that lock out local community halls.
            </p>
          </motion.div>
          <div className="md:w-1/2 h-80 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779558549/Ludo_league_South_Africa_Mamelodi_branch_aho65a.jpg" alt="Mamelodi" className="w-full h-full object-cover object-center" />
          </div>
        </div>
      </section>

      {/* League 2 — Battle of the Kasis (Navy) */}
      <section className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A] text-white border-b border-white/15">
        <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-80 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative group cursor-pointer" onClick={() => setActivePage('BotkGallery')}>
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1779651635/Battle_of_the_Kasis_BOTK_hero_image_e8e2cy.jpg" alt="BOTK" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-6 py-3 bg-white text-bg-deep font-black uppercase text-xs rounded-xl tracking-wider shadow-lg">View BOTK Gallery &rarr;</span>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6">
            <span className="tag-status border-[#0EA5E9]">The Championship Showdown</span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Battle of the Kasis (BOTK)</h2>
            <p className="text-[#0EA5E9] font-bold leading-relaxed text-lg">Soweto vs Alexandra vs Mamelodi Knockout</p>
            <p className="text-slate-300 leading-relaxed mb-6">
              The ultimate inter-township clash. The three titans of the league send their top 5 ranked clubs into a brutal, winner-takes-all knockout bracket. Rivalries are built, legends are made.
            </p>
            <button onClick={() => setActivePage('BotkGallery')} className="btn-action bg-[#FFC107] text-[#0F172A] font-black uppercase tracking-widest">
              Launch BOTK Slides &rarr;
            </button>
          </motion.div>
        </div>
      </section>

      {/* League 3 — Alexandra Ludo League (Sky Blue) */}
      <section className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A]">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6">
            <span className="tag-status border-[#0F172A] text-slate-800">Alexandra Circuit</span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Alexandra Ludo League</h2>
            <p className="text-slate-700 font-bold leading-relaxed text-lg">Origin League • Est. 2016 • Alexandra, Gauteng</p>
            <p className="text-slate-800 leading-relaxed">
              The historic birthplace of professional Ludo. Where strategic blockings and the modern competitive rules of the league were first declared.
            </p>
          </motion.div>
          <div className="md:w-1/2 flex items-center justify-center p-8 bg-white/10 rounded-[20px] border border-white/20 h-80 md:h-[400px]">
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
