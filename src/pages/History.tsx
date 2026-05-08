import React from 'react';
import { Trophy, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const History = () => {
  return (
    <section id="history" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="tag-status mb-6">Legacy</div>
          <h2 className="text-6xl md:text-8xl font-display font-black mb-8 uppercase italic leading-none">Our History</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {[
            { year: "2018", title: "Foundation", desc: "Started as a community tournament in Soweto." },
            { year: "2021", title: "National Circuit", desc: "Expanded across 5 provinces with professional rules." },
            { year: "2024", title: "Digital Evolution", desc: "Integrated cryptographic registrations and AI." }
          ].map((item, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="theme-card rounded-xl">
              <div className="text-3xl md:text-4xl font-display font-black italic mb-3 opacity-90">{item.year}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
              <p className="opacity-70 text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <div className="tag-status mb-6">Hall of Fame</div>
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 uppercase italic">Past Winners</h2>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="theme-card rounded-xl flex items-center gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Trophy size={28} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 opacity-70">2024 Champion</div>
                <h3 className="text-xl md:text-3xl font-display font-black italic mb-1">Thabo 'The Dice' Nkosi</h3>
                <p className="flex items-center gap-2 text-xs md:text-sm opacity-60"><MapPin size={12} /> Alexandra</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
