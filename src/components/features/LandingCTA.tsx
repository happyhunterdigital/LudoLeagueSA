import React from 'react';
import { Mail, MessageCircle, Download, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerChild } from '../ui/ScrollReveal';

const ctaCards = [
  {
    icon: Mail,
    title: 'Subscribe',
    description: 'Stay ahead of major announcements, patch notes, and tournament schedules.',
    buttonText: 'Subscribe',
    buttonColor: '#FACC15',
    buttonTextColor: '#000000',
    borderGlow: '#FACC15',
  },
  {
    icon: MessageCircle,
    title: 'Community',
    description: 'Connect directly with over 10,000 active tournament players in our WhatsApp groups.',
    buttonText: 'Join WhatsApp',
    buttonColor: '#00f0c2',
    buttonTextColor: '#000000',
    borderGlow: '#00f0c2',
  },
  {
    icon: Download,
    title: 'Press Kit',
    description: 'Download high-resolution branding assets, tournament rulebooks, and press releases.',
    buttonText: 'Download',
    buttonColor: '#FFFFFF',
    buttonTextColor: '#000000',
    borderGlow: '#FFFFFF',
  },
];

export const LandingCTA: React.FC = () => {
  return (
    <section id="landing-cta" className="relative z-10 bg-black overflow-hidden border-t border-white/[0.04]">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FACC15]/[0.02] rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="eyebrow">Join Us</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-white leading-[0.95]">
              Be A Part Of <span className="text-[#FACC15]">Something Big</span>
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.12}>
          {ctaCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <StaggerChild key={i}>
                <div className="relative group h-full">
                  <div className="h-full p-8 md:p-10 rounded-2xl bg-[#111827]/40 border border-white/[0.06] backdrop-blur-sm text-center flex flex-col items-center transition-all duration-500 hover:border-white/[0.12]">
                    
                    {/* Icon */}
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                      style={{ 
                        background: `${card.borderGlow}08`,
                        border: `1px solid ${card.borderGlow}20`,
                      }}
                    >
                      <Icon size={24} style={{ color: card.borderGlow }} />
                    </div>
                    
                    <h3 className="text-xl font-display font-black uppercase text-white mb-3">{card.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow">{card.description}</p>
                    
                    <button 
                      className="w-full py-3.5 font-bold text-xs uppercase tracking-[0.15em] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:shadow-lg"
                      style={{ 
                        backgroundColor: card.buttonColor,
                        color: card.buttonTextColor,
                      }}
                    >
                      {card.buttonText}
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                  {/* Hover glow */}
                  <div 
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl"
                    style={{ background: `radial-gradient(circle, ${card.borderGlow}08, transparent 70%)` }}
                  />
                </div>
              </StaggerChild>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
