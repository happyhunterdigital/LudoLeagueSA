import React from 'react';
import { PlayCircle } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerChild } from '../ui/ScrollReveal';

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
    <section id="media-grid" className="relative z-10 bg-black border-b border-white/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#00f0c2' }}>See Ludo In Action</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-white leading-[0.95]">
              Media & <span className="text-[#00f0c2]">Content</span>
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" staggerDelay={0.08}>
          {mediaPhotos.map((src, index) => (
            <StaggerChild
              key={index}
              className={`${index === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <div 
                className={`rounded-2xl overflow-hidden relative group cursor-pointer border border-white/[0.06] ${
                  index === 0 ? 'h-64 md:h-[420px]' : 'h-32 md:h-48'
                }`}
              >
                <img 
                  src={src} 
                  alt="Media Asset" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <PlayCircle size={index === 0 ? 56 : 36} className="text-[#FACC15] drop-shadow-lg" />
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
