import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Award, ShieldAlert, MapPin } from 'lucide-react';

export const OurLeagues = () => {
  return (
    <div className="flex flex-col w-full bg-[#041a18]">
      <section className="py-24 px-6 md:px-10" style={{ background: 'radial-gradient(circle, var(--color-bg-mid) 0%, var(--color-bg-darkest) 100%)' }}>
        <div className="max-w-7xl mx-auto text-center mt-12">
          <SectionHeader tag="Our Circuits" title="Our Leagues" colorClass="text-[#e8a020]" />
          <p className="text-lg text-[#9abcb6] max-w-2xl mx-auto">
            Competitive Ludo circuits running across South Africa's most iconic townships.
          </p>
        </div>
      </section>

      {/* Mamelodi League */}
      <section className="py-24 px-6 bg-[#072e28]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <span className="eyebrow">EST. FEB 2019</span>
            <h2>Mamelodi Ludo League</h2>
            <p className="text-[#9abcb6] leading-relaxed">
              Featuring a highly competitive roster of 20 registered clubs, our Pretoria/Mamelodi hub holds the standard for high-octane township strategy and community support.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#e8a020] font-bold">
              <MapPin size={18} /> Pretoria, Gauteng
            </div>
          </div>
          <div className="md:w-1/2 h-80 rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://placehold.co/600x400/0a3d35/e8a020?text=Mamelodi+League" alt="Mamelodi" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* BOTK */}
      <section className="py-24 px-6 bg-[#0a3d35]">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-80 rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://placehold.co/600x400/072e28/00c9a7?text=Battle+of+the+Kasis" alt="BOTK" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 space-y-6">
            <span className="eyebrow">INTER-TOWNSHIP KNOCKOUT</span>
            <h2>Battle of the Kasis (BOTK)</h2>
            <p className="text-[#9abcb6] leading-relaxed">
              The ultimate Ludo clash between Soweto, Alexandra, and Mamelodi. The top clubs send their highly-trained champions into a bracket-based knockout to claim national supremacy.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#00c9a7] font-bold">
              <ShieldAlert size={18} /> Clash of the Giants
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
