import React from 'react';
import { Page } from '../App';
import { motion } from 'motion/react';

interface LeaguesProps {
  setActivePage: (p: Page) => void;
  setSelectedGalleryTab: (tab: 'botk' | 'mamelodi' | 'soweto') => void;
}

export const Leagues: React.FC<LeaguesProps> = ({ setActivePage, setSelectedGalleryTab }) => {
  const handleLaunchGallery = (tab: 'botk' | 'mamelodi' | 'soweto') => {
    setSelectedGalleryTab(tab);
    setActivePage('BotkGallery');
  };

  return (
    <div className="w-full relative z-10 flex flex-col">
      {/* League 1 — Mamelodi Ludo League (Sky Blue) */}
      <section id="leagues" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A] border-b border-white/15">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6">
            <span className="tag-status border-[#0F172A] text-slate-800">Mamelodi District</span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Mamelodi Ludo League</h2>
            <p className="text-slate-700 font-bold leading-relaxed text-lg">Started February 2019 • 20 Active Clubs • Pretoria Region</p>
            <p className="text-slate-800 leading-relaxed mb-6">
              South Africa's fastest-growing competitive district. High strategy, dedicated fanbases, and weekly neighborhood fixtures that lock out local community halls.
            </p>
            <button onClick={() => handleLaunchGallery('mamelodi')} className="btn-action bg-[#0F172A] text-white">
              Launch Mamelodi Gallery &rarr;
            </button>
          </motion.div>
          <div className="md:w-1/2 h-80 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative group cursor-pointer" onClick={() => handleLaunchGallery('mamelodi')}>
            <img src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779558549/Ludo_league_South_Africa_Mamelodi_branch_aho65a.jpg" alt="Mamelodi" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-6 py-3 bg-white text-bg-deep font-black uppercase text-xs rounded-xl tracking-wider shadow-lg">View Gallery &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* League 2 — Battle of the Kasis (Navy) */}
      <section className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A] text-white border-b border-white/15">
        <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-80 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative group cursor-pointer" onClick={() => handleLaunchGallery('botk')}>
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1779651635/Battle_of_the_Kasis_BOTK_hero_image_e8e2cy.jpg" alt="BOTK" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-6 py-3 bg-white text-bg-deep font-black uppercase text-xs rounded-xl tracking-wider shadow-lg">View Gallery &rarr;</span>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6">
            <span className="tag-status border-[#0EA5E9]">The Championship Showdown</span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Battle of the Kasis (BOTK)</h2>
            <p className="text-[#0EA5E9] font-bold leading-relaxed text-lg">Soweto vs Alexandra vs Mamelodi Knockout</p>
            <p className="text-slate-300 leading-relaxed mb-6">
              The ultimate inter-township clash. The three titans of the league send their top 5 ranked clubs into a brutal, winner-takes-all knockout bracket. Rivalries are built, legends are made.
            </p>
            <button onClick={() => handleLaunchGallery('botk')} className="btn-action bg-[#FFC107] text-[#0F172A] font-black uppercase tracking-widest">
              Launch BOTK Gallery &rarr;
            </button>
          </motion.div>
        </div>
      </section>

      {/* League 3 — Soweto Ludo League (Sky Blue) */}
      <section className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A]">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6">
            <span className="tag-status border-[#0F172A] text-slate-800">Soweto Circuit</span>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Soweto Ludo League</h2>
            <p className="text-slate-700 font-bold leading-relaxed text-lg">District HQ • Est. 2009 • Soweto, Gauteng</p>
            <p className="text-slate-800 leading-relaxed mb-6">
              The historic core and administrative heart of the Ludo League SA. Home of the legendary Soweto Giants and the official Battle of the Kasis operations base.
            </p>
            <button onClick={() => handleLaunchGallery('soweto')} className="btn-action bg-[#0F172A] text-white">
              Launch Soweto Gallery &rarr;
            </button>
          </motion.div>
          <div className="md:w-1/2 h-80 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative group cursor-pointer" onClick={() => handleLaunchGallery('soweto')}>
            <img src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779664330/Soweto_Ludo_League_Event_zjbpig.jpg" alt="Soweto Ludo League" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-6 py-3 bg-white text-bg-deep font-black uppercase text-xs rounded-xl tracking-wider shadow-lg">View Gallery &rarr;</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
