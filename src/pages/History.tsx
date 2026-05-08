import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Trophy, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const History = () => {
  return (
    <section id="history" className="h-screen w-full snap-start overflow-y-auto relative flex flex-col justify-center px-4 md:px-10 border-t-4 border-ludo-yellow bg-gradient-to-b from-ludo-yellow/10 to-bg-deep">
      <div className="max-w-7xl mx-auto w-full mt-24">
        <SectionHeader tag="Legacy" title="Our History" colorClass="text-ludo-yellow" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {[
            { year: "2018", title: "Foundation", desc: "Started as a community tournament in Soweto." },
            { year: "2021", title: "National Circuit", desc: "Expanded across 5 provinces with professional rules." },
            { year: "2024", title: "Digital Evolution", desc: "Integrated cryptographic registrations and AI." }
          ].map((item, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-bg-panel border border-ludo-yellow/20 p-6 rounded-xl shadow-lg">
              <div className="text-ludo-yellow text-3xl md:text-4xl font-display font-black italic mb-3">{item.year}</div>
              <h3 className="text-xl md:text-2xl text-white font-bold mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <SectionHeader tag="Hall of Fame" title="Past Winners" colorClass="text-accent-gold" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-bg-panel border border-accent-gold/30 p-6 rounded-xl flex items-center gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0"><Trophy className="text-accent-gold" size={28} /></div>
              <div>
                <div className="text-accent-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">2024 Champion</div>
                <h3 className="text-xl md:text-3xl text-white font-display font-black italic mb-1">Thabo 'The Dice' Nkosi</h3>
                <p className="text-white/60 flex items-center gap-2 text-xs md:text-sm"><MapPin size={12} /> Alexandra</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
