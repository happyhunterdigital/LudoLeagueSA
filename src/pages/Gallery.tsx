import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion } from 'motion/react';

const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949477/Ludo_League_SA_tough_match_evhrw5.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1777030102/Ludo_League_SA_tourmanent_in_session_e0qruk.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949476/Ludo_League_SA_women_and_kids_oioj8d.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949477/Ludo_League_SA_School_teams_playing_Ludo_jhuckm.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949475/Ludo_League_SA_Africa_Playing_tq1eth.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_Corporate_exhibition_rv2l3j.jpg"
];

export const Gallery = () => {
  return (
    <section id="gallery" className="h-screen w-full snap-start overflow-y-auto relative flex flex-col justify-center px-4 md:px-10 border-t-4 border-ludo-blue bg-gradient-to-b from-ludo-blue/10 to-bg-deep">
      <div className="max-w-7xl mx-auto w-full mt-24">
        <SectionHeader tag="Community & Culture" title="The Gallery" colorClass="text-ludo-blue" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {GALLERY_IMAGES.map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-bg-panel rounded-xl overflow-hidden relative group shadow-lg border border-ludo-blue/20 ${index === 0 ? 'col-span-2 md:col-span-2 md:row-span-2 h-48 md:h-[400px]' : 'h-32 md:h-48'}`}
            >
              <img src={src} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
