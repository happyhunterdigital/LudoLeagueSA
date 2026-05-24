import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion } from 'motion/react';

export const Leagues = () => {
  return (
    <section id="leagues" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A]">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeader tag="Our Circuits" title="Our Leagues" colorClass="text-white" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0EA5E9] mb-2 block">Mamelodi</span>
            <h3 className="text-2xl font-display font-black italic mb-4">Mamelodi Ludo League</h3>
            <p className="text-slate-600 leading-relaxed mb-6">Started February 2019 • 20 Active Clubs</p>
            <p className="text-slate-600 leading-relaxed">South Africa's fastest-growing competitive district. High strategy, dedicated fanbases, and weekly neighborhood fixtures that lock out local halls.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0EA5E9] mb-2 block">The Showdown</span>
            <h3 className="text-2xl font-display font-black italic mb-4">Battle of the Kasis (BOTK)</h3>
            <p className="text-slate-600 leading-relaxed mb-6">Soweto vs Alexandra vs Mamelodi</p>
            <p className="text-slate-600 leading-relaxed">The ultimate inter-township clash. The three titans of the league send their top 5 ranked clubs into a brutal, winner-takes-all knockout bracket.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
