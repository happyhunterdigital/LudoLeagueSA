// src/components/features/InfoSections.tsx
import React from 'react';
import { Trophy, Calendar, MapPin } from 'lucide-react';
import { SectionHeader } from '../ui/SharedUI';

export const HistorySection = () => {
  return (
    <section id="history" className="relative z-10 py-32 px-10 border-b border-teal-950 bg-bg-panel/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          tag="Our Legacy" 
          title="The History" 
          subtitle="Born in the townships, elevated to a professional circuit. The Ludo League South Africa represents the pinnacle of strategic board gameplay."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { year: "2018", title: "The Foundation", desc: "Started as a community tournament in Soweto with 32 local players." },
            { year: "2021", title: "National Circuit", desc: "Expanded across 5 provinces, introducing professional time-controls and verified referees." },
            { year: "2024", title: "Digital Evolution", desc: "Integrated cryptographic tournament registrations and automated ranking systems." }
          ].map((item, index) => (
            <div key={index} className="theme-card">
              <div className="text-accent-teal text-4xl font-display font-black italic mb-4">{item.year}</div>
              <h3 className="text-2xl text-white font-bold mb-3">{item.title}</h3>
              <p className="text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WinnersSection = () => {
  return (
    <section id="winners" className="relative z-10 py-32 px-10 border-b border-teal-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          tag="Hall of Fame" 
          title="Past Winners" 
          subtitle="The grandmasters who conquered the board and secured their legacy in the Ludo League."
          colorClass="text-accent-gold"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="theme-card border-accent-gold/20 hover:border-accent-gold/50 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-accent-gold/10 flex items-center justify-center border border-accent-gold/30 shrink-0">
              <Trophy className="text-accent-gold" size={32} />
            </div>
            <div>
              <div className="text-accent-gold text-xs font-bold uppercase tracking-widest mb-1">2024 Grand Champion</div>
              <h3 className="text-3xl text-white font-display font-black italic mb-2">Thabo 'The Dice' Nkosi</h3>
              <p className="text-white/60 flex items-center gap-2 text-sm"><MapPin size={14} /> Alexandra Region</p>
            </div>
          </div>
          <div className="theme-card border-white/10 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
              <Calendar className="text-white/50" size={32} />
            </div>
            <div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">2023 Grand Champion</div>
              <h3 className="text-3xl text-white font-display font-black italic mb-2">Sarah Mokoena</h3>
              <p className="text-white/60 flex items-center gap-2 text-sm"><MapPin size={14} /> Soweto Region</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
