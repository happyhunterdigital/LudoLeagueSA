import React from 'react';
import { Target, Shield, Landmark, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const LandingSystems: React.FC = () => {
  return (
    <div className="w-full relative z-10 flex flex-col">
      
      {/* Section 6 - Core Systems */}
      <section className="relative bg-black border-b border-white/[0.04] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FACC15]/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            
            <ScrollReveal direction="left" className="md:w-1/2 space-y-8">
              <div>
                <span className="eyebrow">Core Infrastructure</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-white leading-[0.95] mt-2">
                  A Professional <span className="text-[#FACC15]">Sporting Structure</span>
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#FACC15]/[0.08] border border-[#FACC15]/20 flex items-center justify-center shrink-0 group-hover:bg-[#FACC15]/[0.15] transition-colors">
                    <Target size={20} className="text-[#FACC15]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">10-Month Season</h4>
                    <p className="text-white/40 text-sm leading-relaxed">20 registered professional clubs compete in 38 weekly matches.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#00f0c2]/[0.08] border border-[#00f0c2]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00f0c2]/[0.15] transition-colors">
                    <Shield size={20} className="text-[#00f0c2]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Standardized Rules</h4>
                    <p className="text-white/40 text-sm leading-relaxed">Standardized, screen-free time-controls and licensed, physical referees.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2} className="md:w-1/2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06] group">
                <img 
                  src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1778074844/Ludo_League_SA_awards_dwmmoi.jpg" 
                  alt="Sporting Structure" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy" 
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 7 - Club Franchise */}
      <section className="relative bg-[#0A0A0A] border-b border-white/[0.04] overflow-hidden">
        <div className="max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
            
            <ScrollReveal direction="left" className="md:w-1/2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06] group">
                <img 
                  src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949475/Ludo_League_SA_Africa_Playing_tq1eth.jpg" 
                  alt="Club Franchise" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy" 
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15} className="md:w-1/2 space-y-8">
              <div>
                <span className="eyebrow" style={{ color: '#D32F2F' }}>Business Model</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-white leading-[0.95] mt-2">
                  Club Ownership <span className="text-[#D32F2F]">(RTP)</span>
                </h2>
              </div>
              
              <div className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#D32F2F]/[0.08] border border-[#D32F2F]/20 flex items-center justify-center shrink-0 group-hover:bg-[#D32F2F]/[0.15] transition-colors">
                  <Landmark size={20} className="text-[#D32F2F]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Right to Participate (RTP)</h4>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Entrepreneurs and owners can purchase an RTP status to register and manage one of our 20 league franchises, modeling the highly successful business structures of the PSL.
                  </p>
                </div>
              </div>

              <button className="inline-flex items-center gap-2 text-[#D32F2F] text-xs uppercase tracking-[0.2em] font-bold hover:text-white transition-colors group/btn mt-2">
                Learn About RTP
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
