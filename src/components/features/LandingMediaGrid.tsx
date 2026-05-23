import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SharedUI';
import { PlayCircle } from 'lucide-react';

const mediaPhotos = [
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949477/Ludo_League_SA_tough_match_evhrw5.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949476/Ludo_League_SA_women_and_kids_oioj8d.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949477/Ludo_League_SA_School_teams_playing_Ludo_jhuckm.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949475/IMG-20191017-WA0019_pascys.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_Corporate_exhibition_rv2l3j.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1777030102/Ludo_League_SA_tourmanent_in_session_e0qruk.jpg",
];

export const LandingMediaGrid: React.FC = () => {
  return (
    <section id="media-grid" className="relative z-10 py-24 px-4 md:px-10 bg-slate-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag="See Ludo In Action" title="Media & Content" colorClass="text-[#0EA5E9]" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {mediaPhotos.map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg border border-white/10 ${index === 0 ? 'col-span-2 row-span-2 h-64 md:h-[420px]' : 'h-32 md:h-48'}`}
            >
              <img src={src} alt="Media Asset" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <PlayCircle size={40} className="text-[#0EA5E9] scale-75 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
