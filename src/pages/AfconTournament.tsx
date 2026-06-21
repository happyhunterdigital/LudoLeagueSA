import React from 'react';
import { Page } from '../App';
import { Trophy, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { AfconPodiumAndTable } from '../components/features/AfconPodiumAndTable';
import { AfconGalleryAndInfo } from '../components/features/AfconGalleryAndInfo';

interface AfconProps {
  setActivePage: (p: Page) => void;
}

export const AfconTournament: React.FC<AfconProps> = ({ setActivePage }) => {
  return (
    <div className="flex flex-col w-full bg-slate-900 text-white min-h-screen">
      {/* Deep Navy / Blue Hero Gradient Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-b from-[#0F172A] via-[#1E3A8A] to-[#0F172A] border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779665655/Ludo_League-Africa_Ludo_Cup_Of_Nations_Alcon_2023_Event_z5m9xa.jpg" 
            alt="AFCON 2023 Stadium" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <button onClick={() => setActivePage('Tournaments')} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0EA5E9] hover:text-white transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Tournaments
          </button>
          
          <div className="tag-status bg-slate-900/80 border-[#FFC107] text-[#FFC107] shadow-xl">
            <Trophy size={14} className="mr-2" /> Continental Event
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase italic leading-tight drop-shadow-2xl">
            Africa Ludo Cup <br /> <span className="text-[#FFC107]">Of Nations 2023</span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold uppercase tracking-widest text-slate-300">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-[#0EA5E9]" /> October 2023</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-[#0EA5E9]" /> Pretoria Arena</span>
          </div>
        </div>
      </section>

      {/* Podium & Live Results Tables */}
      <AfconPodiumAndTable />

      {/* Media Grid & Info Cards */}
      <AfconGalleryAndInfo setActivePage={setActivePage} />
    </div>
  );
};
