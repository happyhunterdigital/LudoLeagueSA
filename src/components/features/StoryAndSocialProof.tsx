import React from 'react';
import { SectionHeader } from '../ui/SharedUI';
import { Page } from '../../App';
import { Quote } from 'lucide-react';

export const StoryAndSocialProof = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  const scrollToDonation = () => {
    document.getElementById('donation-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Social Proof & Statistics */}
      <section className="relative z-10 py-24 px-6 md:px-10 bg-bg-panel/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 text-center">
            {[
              { value: "500+", label: "Active Players", color: "text-accent-teal" },
              { value: "50+", label: "Schools Reached", color: "text-sky-400" },
              { value: "R100k+", label: "In Prize Money", color: "text-accent-gold" },
              { value: "10+", label: "Years of Excellence", color: "text-ludo-red" }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-bg-deep rounded-xl border border-white/5">
                <div className={`text-4xl md:text-5xl font-display font-black italic mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-white/60 text-xs md:text-sm uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>

          <SectionHeader tag="What Communities Say" title="Voices of the League" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { quote: "Ludo changed my life. I went from playing in the streets to competing at tournaments and earning real money.", author: "Thabo N.", role: "Tournament Winner" },
              { quote: "Ludo4Schools has transformed how our children learn. They're engaged, happy, and building friendships.", author: "Sarah M.", role: "School Coordinator" },
              { quote: "The Ludo League brought our community together. It's more than a game; it's a movement.", author: "David K.", role: "Community Leader" }
            ].map((t, i) => (
              <div key={i} className="bg-bg-card p-8 rounded-2xl border border-white/10 relative">
                <Quote className="absolute top-6 right-6 text-white/5" size={48} />
                <p className="text-white/80 text-lg italic mb-6 relative z-10">"{t.quote}"</p>
                <div>
                  <div className="text-white font-bold">{t.author}</div>
                  <div className="text-accent-teal text-sm">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder & Leadership Section */}
      <section className="relative z-10 py-24 px-6 md:px-10 border-b border-white/5">
        <div className="max-w-5xl mx-auto bg-bg-card border border-accent-gold/20 rounded-3xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-2/5 h-80 md:h-auto relative">
            <img 
              src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1778074844/Ludo_League_SA_awards_dwmmoi.jpg" 
              alt="Joe Setladi - Founder" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="md:w-3/5 p-8 md:p-12">
            <div className="text-accent-gold text-xs font-bold uppercase tracking-widest mb-2">Meet the Founder</div>
            <h3 className="text-4xl font-display font-black italic text-white mb-2">Joe Setladi</h3>
            <p className="text-white/50 mb-6">Founder & President, The Ludo League SA</p>
            <p className="text-white/80 leading-relaxed mb-6">
              "My vision was always to elevate ludo from a casual pastime to a recognized, competitive sport. We are building a platform where local talent can shine, earn, and be celebrated on a professional stage."
            </p>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-white/5 rounded text-sm text-white/60">Founded 2009</span>
              <span className="px-4 py-2 bg-white/5 rounded text-sm text-white/60">National Expansion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="relative z-10 py-24 px-6 md:px-10 bg-gradient-to-b from-bg-deep to-bg-panel">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic">Ready to Join?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-bg-deep p-10 rounded-2xl border border-accent-teal/30 text-center">
              <h3 className="text-3xl font-display font-black italic text-white mb-4">Compete & Win</h3>
              <p className="text-white/60 mb-8">Enter tournaments, climb the rankings, and become a legend.</p>
              <button onClick={() => setActivePage('Tournaments')} className="w-full py-4 bg-accent-teal text-bg-deep font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors">Enter Tournament</button>
            </div>
            <div className="bg-bg-deep p-10 rounded-2xl border border-accent-gold/30 text-center">
              <h3 className="text-3xl font-display font-black italic text-white mb-4">Support the Movement</h3>
              <p className="text-white/60 mb-8">Help us grow ludo and impact more communities.</p>
              <button onClick={scrollToDonation} className="w-full py-4 bg-accent-gold text-bg-deep font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors">Contribute Now</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
