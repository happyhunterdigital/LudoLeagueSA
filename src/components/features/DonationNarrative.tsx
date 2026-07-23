import React from 'react';
import { Gift, Award, Shield, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const DonationNarrative: React.FC<{ onScrollToForm: () => void }> = ({ onScrollToForm }) => {
  const currentFunds = 12500;
  const goalFunds = 1000000;

  return (
    <>
      {/* Narrative Section */}
      <div className="w-full max-w-5xl mx-auto py-24 px-6 md:px-12 space-y-24">
        {/* Intro */}
        <ScrollReveal direction="up" className="text-center space-y-6">
          <h2 className="text-[#FFD700] font-display font-black text-3xl md:text-5xl uppercase tracking-tight">Ludo ka Nkane!</h2>
          <p className="text-xl md:text-2xl font-light text-neutral-300 italic border-l-4 border-[#FFD700] pl-6 py-2 mx-auto max-w-2xl text-left">
            "South Africa's youth don't need handouts. They need opportunities. Help us create them, one roll at a time."
          </p>
        </ScrollReveal>

        {/* Section 1: Help Us Build The Future */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left" className="space-y-6 text-neutral-400 leading-relaxed font-light">
            <h3 className="text-white font-display font-black text-2xl uppercase tracking-wider">Help Us Build The Future</h3>
            <p><strong className="text-white">Every legend starts with a single roll.</strong></p>
            <p>South Africa doesn't have a shortage of talent. It has a shortage of opportunities.</p>
            <p>Every year, thousands of young South Africans leave school and university full of hope, only to find themselves locked out of the economy. Graduates search for work. Young entrepreneurs struggle to get funding. Communities battle with unemployment and a lack of positive spaces to gather and grow.</p>
            <p>But what if something as simple as a board game could become a platform for opportunity?</p>
            <p>At Ludo League SA, we believe it can.</p>
          </ScrollReveal>
          
          <ScrollReveal direction="right" className="space-y-6">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl bg-neutral-900/50">
              <img 
                src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142496/LudoLeagueSA_Team_gvizo3.png" 
                alt="LudoLeagueSA Team and participants" 
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
            <div className="bg-neutral-900/30 p-6 rounded-2xl border border-neutral-800/50 text-neutral-400 leading-relaxed font-light text-sm">
              <p className="mb-3">What started around kitchen tables and street corners is becoming a movement that brings people together, builds communities, and creates jobs.</p>
              <ul className="grid grid-cols-2 gap-2 text-white font-bold tracking-wide">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />Creating a sport</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />A business</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />A culture</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />A future</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Section 2: Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-12 border-t border-neutral-900/60">
          <ScrollReveal direction="left" className="order-2 md:order-1">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl bg-neutral-900/50">
              <img 
                src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142713/LudoLeagueSA_taking_kids_off_the_street_and_screen._dgzntf.png" 
                alt="LudoLeagueSA taking kids off the street and screen" 
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" className="space-y-6 text-neutral-400 leading-relaxed font-light order-1 md:order-2 bg-neutral-900/30 p-8 rounded-2xl border border-neutral-800/50">
            <h3 className="text-white font-display font-black text-2xl uppercase tracking-wider">Our Mission</h3>
            <p>To create opportunities for South Africans through the power of community, competition, and entrepreneurship.</p>
            <p>To give young people a platform to lead and express themselves constructively.</p>
            <p>To build a proudly South African sport that belongs to everyone, in every township and town.</p>
            <p>To turn a simple board game into a lasting development legacy.</p>
          </ScrollReveal>
        </div>

        {/* Section 3: More Than A Game */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-12 border-t border-neutral-900/60">
          <ScrollReveal direction="left" className="space-y-6 text-neutral-400 leading-relaxed font-light">
            <h3 className="text-white font-display font-black text-2xl uppercase tracking-wider">More Than A Game</h3>
            <p>When people think of Ludo, they think of family. Laughter. Friendly competition. Stories that last a lifetime.</p>
            <p>We're taking that feeling and turning it into something bigger. We are creating concrete opportunities for:</p>
            <div className="grid grid-cols-2 gap-3 text-xs text-white">
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Players</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Content Creators</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Photographers</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Event Hosts</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Organisers</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Entrepreneurs</div>
            </div>
            <p className="font-bold text-[#FFD700] mt-4">We want every tournament to create not only champions, but opportunities.</p>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl bg-neutral-900/50">
              <img 
                src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142261/LudoLeagueSA_taking_kids_off_the_street_and_screen_dykywz.png" 
                alt="LudoLeagueSA youth development action" 
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Section 4: Showcase Banner */}
        <ScrollReveal direction="up" className="pt-12 border-t border-neutral-900/60">
          <div className="relative w-full h-[280px] sm:h-[380px] md:h-[450px] overflow-hidden rounded-3xl border border-neutral-800/60 shadow-2xl bg-neutral-900/40">
            <img 
              src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142171/LudoLeagueSA_vwtysc.png" 
              alt="LudoLeagueSA crowdfunding banner artwork" 
              loading="lazy"
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        </ScrollReveal>
        
        {/* Our Funding Goal Section */}
        <ScrollReveal direction="up" className="text-center pt-8 space-y-4">
          <h3 className="text-white font-display font-black text-3xl uppercase tracking-wider">Our Funding Goal</h3>
          <p className="text-5xl md:text-6xl font-black text-[#FFD700] tracking-tighter">R1,000,000</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-neutral-400 pt-4 uppercase tracking-widest font-bold">
            <span>National Expansion</span> • <span>Recruitment</span> • <span>League Production</span> • <span>Ludo4Schools</span>
          </div>
        </ScrollReveal>
      </div>

      {/* Narrative Matrix Grids */}
      <div className="w-full max-w-6xl mx-auto pb-24 px-6 md:px-12">
        <h2 className="text-center font-display font-black text-3xl text-white uppercase mb-12">Three Ways To Be Part Of The Movement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Gift, title: "Donate", desc: "Whether it's R20 or R50,000, you're helping create opportunities where they're needed most. You aren't simply giving money. You're helping build a future." },
            { icon: Shield, title: "Invest", desc: "Competitive Ludo is one of the most accessible sports in Africa. Low barriers to entry. Mass participation. High entertainment value. Help us build Africa's premier Ludo ecosystem." },
            { icon: Award, title: "Sponsor", desc: "Partner with a movement reaching communities overlooked by traditional sports. Brand exposure. Community impact. Digital reach. National tournaments. Together, we can build something iconic." }
          ].map((item, idx) => (
            <div key={idx} className="border-t-4 border-[#FFD700] bg-neutral-900/60 p-8 rounded-b-2xl space-y-4 hover:bg-neutral-900 transition-all cursor-pointer" onClick={onScrollToForm}>
              <item.icon size={32} className="text-[#FFD700]" />
              <h3 className="font-display font-black tracking-thonik-tight uppercase text-2xl text-white">{item.title}</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
