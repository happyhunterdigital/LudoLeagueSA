import React from 'react';
import { Users, Trophy, Heart, GraduationCap, MapPin, Star } from 'lucide-react';
import { SectionHeader } from '../ui/SharedUI';
import { Page } from '../../App';

export const ValuePropsAndPrograms = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <>
      {/* Value Proposition Section */}
      <section className="relative z-10 py-24 px-6 md:px-10 bg-bg-panel/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader tag="Why The Ludo League SA?" title="More Than A Game" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="theme-card hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-accent-teal/10 flex items-center justify-center mb-6">
                <Users className="text-accent-teal" size={28} />
              </div>
              <h3 className="text-2xl text-white font-bold mb-4">Inclusive Community</h3>
              <p className="text-white/70 leading-relaxed">We transcend race, gender, sexual orientation, and age. Ludo is for everyone.</p>
            </div>
            
            <div className="theme-card hover:-translate-y-2 transition-transform duration-300 border-accent-gold/20">
              <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mb-6">
                <Trophy className="text-accent-gold" size={28} />
              </div>
              <h3 className="text-2xl text-white font-bold mb-4">Competitive Excellence</h3>
              <p className="text-white/70 leading-relaxed">Participate in tournaments with real prizes, professional organization, and a clear pathway to becoming a legend.</p>
            </div>

            <div className="theme-card hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-ludo-red/10 flex items-center justify-center mb-6">
                <Heart className="text-ludo-red" size={28} />
              </div>
              <h3 className="text-2xl text-white font-bold mb-4">Social Impact</h3>
              <p className="text-white/70 leading-relaxed">Through Ludo4Schools, we're transforming education and building social cohesion in South African communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Initiatives Section */}
      <section className="relative z-10 py-24 px-6 md:px-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader tag="What We Offer" title="Programs & Initiatives" colorClass="text-sky-400" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden group">
              <div className="h-64 relative overflow-hidden bg-black">
                <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_School_team_hold_Ludo_league_Boards_xaiclf.jpg" alt="Ludo4Schools" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-sky-500 text-white p-2 rounded-lg"><GraduationCap size={24} /></div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-display font-black italic text-white mb-3">Ludo4Schools</h3>
                <p className="text-white/60 mb-6">Bringing ludo to primary and high schools across South Africa as an alternative learning tool.</p>
                <button className="text-sky-400 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">Learn More &rarr;</button>
              </div>
            </div>

            <div className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden group">
              <div className="h-64 relative overflow-hidden bg-black">
                <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1778074844/Ludo_League_SA_award_ceremony_tsya47.jpg" alt="The Roll of Legends" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-accent-gold text-bg-deep p-2 rounded-lg"><Trophy size={24} /></div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-display font-black italic text-white mb-3">The Roll of Legends</h3>
                <p className="text-white/60 mb-6">Our premier competitive circuit for serious players. Enter tournaments, win prizes, and build your legend.</p>
                <button onClick={() => setActivePage('Tournaments')} className="text-accent-gold font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">Enter Tournament &rarr;</button>
              </div>
            </div>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 hover:border-accent-teal/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent-teal/10 rounded-lg text-accent-teal"><Star size={24} /></div>
                <h3 className="text-2xl font-display font-black italic text-white">Ludo Academy of Excellence (L.A.E)</h3>
              </div>
              <p className="text-white/60 mb-6">Elite training program for aspiring champions. Master strategies, compete at the highest level.</p>
              <button className="text-accent-teal font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">Join Academy &rarr;</button>
            </div>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 hover:border-ludo-red/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-ludo-red/10 rounded-lg text-ludo-red"><MapPin size={24} /></div>
                <h3 className="text-2xl font-display font-black italic text-white">Community Tournaments</h3>
              </div>
              <p className="text-white/60 mb-6">Battle of the Kasis, township tournaments, and grassroots events bringing communities together.</p>
              <button className="text-ludo-red font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">View Events &rarr;</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
