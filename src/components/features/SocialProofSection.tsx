import React from 'react';
import { Quote, Star, Users, Trophy, School, Calendar } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerChild } from '../ui/ScrollReveal';

const stats = [
  { value: '500+', label: 'Active Players', icon: Users, color: '#FACC15' },
  { value: '50+', label: 'Schools Reached', icon: School, color: '#00f0c2' },
  { value: 'R100k+', label: 'In Prize Money', icon: Trophy, color: '#FACC15' },
  { value: '10+', label: 'Years of Excellence', icon: Calendar, color: '#D32F2F' },
];

const testimonials = [
  {
    quote: "Ludo changed my life. I went from playing in the streets to competing at tournaments and earning real money.",
    author: "Thabo N.",
    role: "Tournament Winner",
    rating: 5,
  },
  {
    quote: "Ludo4Schools has transformed how our children learn. They're engaged, happy, and building friendships.",
    author: "Sarah M.",
    role: "School Coordinator",
    rating: 5,
  },
  {
    quote: "The Ludo League brought our community together. It's more than a game; it's a movement.",
    author: "David K.",
    role: "Community Leader",
    rating: 5,
  },
];

export const SocialProofSection: React.FC = () => {
  return (
    <section id="social-proof" className="relative z-10 bg-[#0A0A0A] overflow-hidden">
      
      {/* ── Stats Counter Bar ── */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto py-20 md:py-24 px-6 md:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="eyebrow">By The Numbers</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-white leading-[0.95]">
                Impact & Reach
              </h2>
            </div>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.1}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <StaggerChild key={i}>
                  <div className="relative p-6 md:p-8 rounded-2xl bg-[#111827]/60 border border-white/[0.06] backdrop-blur-sm text-center group hover:border-white/[0.12] transition-all duration-500">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at center, ${stat.color}08, transparent 70%)` }} 
                    />
                    <Icon size={20} className="mx-auto mb-3 opacity-40" style={{ color: stat.color }} />
                    <div className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-2" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.15em] font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </StaggerChild>
              );
            })}
          </StaggerContainer>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="eyebrow">What Communities Say</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-white leading-[0.95]">
              Voices of the League
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.15}>
          {testimonials.map((t, i) => (
            <StaggerChild key={i}>
              <div className="relative p-8 md:p-10 rounded-2xl bg-[#111827]/40 border border-white/[0.06] backdrop-blur-sm group hover:border-[#FACC15]/20 transition-all duration-500">
                {/* Decorative quote */}
                <Quote className="absolute top-6 right-6 text-white/[0.04]" size={56} />
                
                {/* Star rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-[#FACC15] text-[#FACC15]" />
                  ))}
                </div>

                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 relative z-10">
                  "{t.quote}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FACC15]/20 to-[#00f0c2]/20 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.author}</div>
                    <div className="text-[#FACC15] text-xs font-medium">{t.role}</div>
                  </div>
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>

      {/* ── Founder Section ── */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto py-24 md:py-32 px-6 md:px-10">
          <ScrollReveal>
            <div className="bg-[#111827]/40 border border-[#FACC15]/10 rounded-3xl overflow-hidden flex flex-col md:flex-row backdrop-blur-sm">
              <div className="md:w-2/5 h-80 md:h-auto relative">
                <img 
                  src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1778074844/Ludo_League_SA_awards_dwmmoi.jpg" 
                  alt="Joe Setladi - Founder" 
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111827]/60 hidden md:block" />
              </div>
              <div className="md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <span className="text-[#FACC15] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Meet the Founder</span>
                <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-2">Joe Setladi</h3>
                <p className="text-white/40 text-sm mb-6">Founder & President, The Ludo League SA</p>
                <p className="text-white/60 leading-relaxed mb-8">
                  "My vision was always to elevate ludo from a casual pastime to a recognized, competitive sport. We are building a platform where local talent can shine, earn, and be celebrated on a professional stage."
                </p>
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-xs text-white/50 font-medium">Founded 2009</span>
                  <span className="px-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-xs text-white/50 font-medium">National Expansion</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
