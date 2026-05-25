import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SharedUI';
import { Calendar, Shield, Users, ArrowRight, Video } from 'lucide-react';
import { Page } from '../../App';

const afconPhotos = [
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779665652/Africa_Ludo_Cup_Of_Nations_Alcon_2023_rnrjoi.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779665651/Ludo_League-Africa_Ludo_Cup_Of_Nations_Alcon_2023_event_uo14yy.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779665651/Ludo_League-Africa_Ludo_Cup_Of_Nations_Alcon_2023._pb5mac.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779665652/Ludo_League-Africa_Ludo_Cup_Of_Nations_Alcon_2023_rhukdf.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779665652/Ludo_League-Africa_Ludo_Cup_Of_Nations_Alcon_2023__ndqmwh.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779665654/Ludo_League-Africa_Ludo_Cup_Of_Nations_Alcon_2023_y4yvix.jpg"
];

export const AfconGalleryAndInfo = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <div className="w-full bg-[#0F172A] text-white">
      {/* Photo Gallery Section */}
      <section className="py-24 px-4 md:px-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <SectionHeader tag="Immersive Action" title="Tournament Media" colorClass="text-[#0EA5E9]" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {/* Featured Hero Image spanning 2 columns */}
            <div className="col-span-2 row-span-2 h-64 md:h-[420px] rounded-2xl overflow-hidden relative group border border-slate-800 shadow-2xl">
              <img src={afconPhotos[0]} alt="Featured AFCON" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end">
                <span className="text-sm font-bold tracking-widest text-[#FFC107]">Opening Ceremony - AFCON 2023</span>
              </div>
            </div>

            {afconPhotos.slice(1, 4).map((src, idx) => (
              <div key={idx} className="h-32 md:h-48 rounded-2xl overflow-hidden relative group border border-slate-800">
                <img src={src} alt="AFCON Match" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white">Qualifier Match</span>
                </div>
              </div>
            ))}

            {/* Overflow Tile */}
            <div className="h-32 md:h-48 rounded-2xl overflow-hidden relative group border border-slate-800 bg-[#1E293B] flex flex-col items-center justify-center text-center">
              <Video size={32} className="text-[#0EA5E9] mb-2" />
              <span className="text-lg font-display font-black text-white">+3 Gallery Tiles</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Row (Two side-by-side cards) */}
      <section className="py-24 px-6 md:px-10 bg-[#1E293B] border-t border-slate-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#0F172A] border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
            <h4 className="text-2xl font-display font-black italic text-[#FFC107] uppercase">Tournament Details</h4>
            <div className="space-y-4 text-slate-300 text-sm">
              <p><b>Format:</b> Doubles & Singles Knockout brackets</p>
              <p><b>Surface:</b> Handcrafted solid wood boards only</p>
              <p><b>Equipment:</b> Certified Professional Acrylic tokens and balanced dice</p>
              <p><b>Head Referee:</b> Joe Setladi (League President)</p>
            </div>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
            <h4 className="text-2xl font-display font-black italic text-[#0EA5E9] uppercase">Fun Stats</h4>
            <div className="space-y-4 text-slate-300 text-sm">
              <p><b>Matches Played:</b> 76 games total</p>
              <p><b>Longest Match:</b> 1hr 42mins (Semi-Finals)</p>
              <p><b>Standout Stat:</b> Thabo Nkosi captured 12 tokens in a single bracket</p>
              <p><b>Total Attendance:</b> 1,200+ Spectators</p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Footer Row */}
      <section className="py-24 px-6 md:px-10 bg-[#D32F2F] text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-display font-black italic uppercase leading-none">Ready to write your legend?</h2>
          <p className="opacity-90 font-bold">Secure your space in the upcoming 2026 season qualifiers. Entries are strictly limited.</p>
          <button onClick={() => setActivePage('Tournaments')} className="btn-action bg-white text-[#D32F2F] hover:bg-slate-900 hover:text-white mx-auto font-black uppercase text-sm mt-8">
            Register Your Spot <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
