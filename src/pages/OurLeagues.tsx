import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { ShieldAlert, MapPin } from 'lucide-react';

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

      {/* Mamelodi League - Background Opacity Increased to 35% */}
      <section className="relative py-32 px-6 md:px-10 bg-[#072e28] overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779558549/Ludo_league_South_Africa_Mamelodi_branch_aho65a.jpg" 
            alt="Mamelodi Ludo League Branch" 
            className="w-full h-full object-cover opacity-35 mix-blend-luminosity filter blur-[1px]"
          />
          <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[#072e28] via-[#072e28]/95 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#072e28] to-transparent"></div>
        </div>

        <div className="container relative z-10 grid-2">
          <div className="space-y-6">
            <span className="eyebrow">EST. FEB 2019</span>
            <h2>Mamelodi Ludo League</h2>
            <p className="text-[#9abcb6] text-lg leading-relaxed">
              Featuring a highly competitive roster of 20 registered clubs, our Pretoria/Mamelodi hub holds the standard for high-octane township strategy and community support.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#e8a020] font-bold">
              <MapPin size={18} /> Pretoria, Gauteng
            </div>
          </div>
          <div className="hidden md:block"></div>
        </div>
      </section>

      {/* BOTK (Battle of the Kasis) - Fully Immersive Blended Layout */}
      <section className="relative py-32 px-6 md:px-10 bg-[#0a3d35] overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779563470/INTER-TOWNSHIP-KNOCKOUT_Battle_of_the_Kasis.The_ultimate_inter_township_clash.The_three_titans_of_the_Ludo_League_South_Africa_rmnqm4.jpg" 
            alt="Battle of the Kasis" 
            className="w-full h-full object-cover opacity-35 mix-blend-luminosity filter blur-[1px]"
          />
          <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[#0a3d35] via-[#0a3d35]/95 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a3d35] to-transparent"></div>
        </div>

        <div className="container relative z-10 grid-2">
          <div className="space-y-6">
            <span className="eyebrow">INTER-TOWNSHIP KNOCKOUT</span>
            <h2>Battle of the Kasis (BOTK)</h2>
            <p className="text-[#9abcb6] text-lg leading-relaxed">
              The ultimate inter-township clash. The three titans of the league (Soweto, Alexandra, and Mamelodi) send their top 5 ranked clubs into a brutal, bracket-based knockout tournament to claim national supremacy.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#00c9a7] font-bold">
              <ShieldAlert size={18} /> Clash of the Giants
            </div>
          </div>
          <div className="hidden md:block"></div>
        </div>
      </section>
    </div>
  );
};
