import React from 'react';
import { Users, Trophy, GraduationCap, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const features = [
  {
    icon: Users,
    tag: 'IMMENSE',
    tagColor: '#FACC15',
    title: 'Inclusive Community',
    description: 'We transcend race, gender, sexual orientation, and age. Ludo League SA provides a physical, screen-free platform designed to build vibrant networks, foster social cohesion, and empower local townships.',
    image: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949477/Ludo_League_SA_School_teams_playing_Ludo_jhuckm.jpg',
    reverse: false,
  },
  {
    icon: Trophy,
    tag: 'TACTICAL',
    tagColor: '#00f0c2',
    title: 'Competitive Excellence',
    description: 'Participate in professional structures, climb the national rankings, and become a verified legend. With weekly regional fixtures in Pretoria and Soweto, compete for substantial player salaries and cash prizes.',
    image: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1778074844/Ludo_League_SA_award_ceremony_tsya47.jpg',
    reverse: true,
  },
  {
    icon: GraduationCap,
    tag: 'FANTASTIC',
    tagColor: '#FACC15',
    title: 'Ludo4Schools',
    description: 'Through our specialized schools initiative, we are introducing cognitive, screen-free strategic problem solving into South African primary and high schools, transforming education and building social cohesion.',
    image: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_School_team_hold_Ludo_league_Boards_xaiclf.jpg',
    reverse: false,
  },
];

export const LandingFeatures: React.FC = () => {
  return (
    <div className="w-full relative z-10 flex flex-col">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isReversed = feature.reverse;

        return (
          <section 
            key={index} 
            className="relative overflow-hidden border-b border-white/[0.04]"
            style={{ background: index % 2 === 0 ? '#000000' : '#0A0A0A' }}
          >
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FACC15]/30 to-transparent" />

            <div className="max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-10">
              <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}>
                
                {/* Text Block */}
                <ScrollReveal 
                  direction={isReversed ? 'right' : 'left'} 
                  delay={0.1} 
                  className="md:w-1/2 space-y-6"
                >
                  <div 
                    className="tag-status inline-flex items-center gap-2" 
                    style={{ borderColor: `${feature.tagColor}40` }}
                  >
                    <Icon size={14} style={{ color: feature.tagColor }} />
                    <span style={{ color: feature.tagColor }}>{feature.tag}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase leading-[0.95] text-white">
                    {feature.title}
                  </h2>
                  
                  <p className="text-white/50 leading-relaxed text-base md:text-lg max-w-xl">
                    {feature.description}
                  </p>

                  <button className="inline-flex items-center gap-2 text-[#FACC15] text-xs uppercase tracking-[0.2em] font-bold hover:text-white transition-colors group mt-2">
                    Learn More 
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </ScrollReveal>

                {/* Image Block */}
                <ScrollReveal 
                  direction={isReversed ? 'left' : 'right'} 
                  delay={0.25} 
                  className="md:w-1/2"
                >
                  <div className="relative group">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06]">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    {/* Subtle glow behind image */}
                    <div 
                      className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${feature.tagColor}10, transparent 70%)` }}
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
