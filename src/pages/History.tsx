import React from 'react';
import { Trophy, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/ui/SharedUI';

export const History = () => {
  return (
    <section id="history" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeader tag="Legacy" title="Our History" colorClass="text-[#FFC107]" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {[
            { year: "2018", title: "Foundation", desc: "Started as a community tournament in Soweto." },
            { year: "2021", title: "National Circuit", desc: "Expanded across 5 provinces with professional rules." },
            { year: "2024", title: "Digital Evolution", desc: "Integrated cryptographic registrations and AI." }
          ].map((item, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-[#1E293B] border border-slate-700 p-8 rounded-2xl shadow-xl">
              <div className="text-3xl md:text-4xl font-display font-black italic mb-3 text-[#FFC107]">{item.year}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-slate-300 text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeader tag="Hall of Fame" title="Past Winners" colorClass="text-[#0EA5E9]" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#1E293B] border border-slate-700 p-8 rounded-2xl flex items-center gap-4 md:gap-6 shadow-xl">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0F172A] flex items-center justify-center shrink-0 border border-slate-600">
                <Trophy size={28} className="text-[#FFC107]" />
              </div>
              <div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 text-[#0EA5E9]">2024 Champion</div>
                <h3 className="text-xl md:text-3xl font-display font-black italic mb-1 text-white">Thabo 'The Dice' Nkosi</h3>
                <p className="flex items-center gap-2 text-xs md:text-sm text-slate-400"><MapPin size={12} /> Alexandra</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
