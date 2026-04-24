import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion } from 'motion/react';

const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949477/Ludo_League_SA_tough_match_evhrw5.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1777030102/Ludo_League_SA_tourmanent_in_session_e0qruk.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949476/Ludo_League_SA_women_and_kids_oioj8d.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949477/Ludo_League_SA_School_teams_playing_Ludo_jhuckm.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949475/Ludo_League_SA_Africa_Playing_tq1eth.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_Corporate_exhibition_rv2l3j.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949475/IMG-20191017-WA0019_pascys.jpg"
];

export const Gallery = () => {
  return (
    <section className="relative z-10 py-10 md:py-20 px-4 md:px-10 border-t-4 border-ludo-blue">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          tag="Community & Culture" 
          title="The Gallery" 
          subtitle="Moments captured across our nationwide circuits, schools, and corporate exhibitions."
          colorClass="text-ludo-blue"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {GALLERY_IMAGES.map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-bg-panel rounded-xl overflow-hidden relative group shadow-lg border border-ludo-blue/20 ${index === 0 ? 'sm:col-span-2 md:col-span-2 md:row-span-2 h-64 md:h-[500px]' : 'h-48 md:h-60'}`}
            >
              <img 
                src={src} 
                alt={`Ludo League Gallery ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
