// src/components/features/GalleryAndContact.tsx
import { Phone, Instagram, Twitter, Facebook } from 'lucide-react';
import { SectionHeader } from '../ui/SharedUI';

export const GallerySection = () => {
  return (
    <section id="gallery" className="relative z-10 py-32 px-10 border-b border-teal-950 bg-bg-panel/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          tag="Visuals" 
          title="The Gallery" 
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          <div className="md:col-span-2 md:row-span-2 h-64 md:h-full bg-bg-deep rounded-xl overflow-hidden relative group">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1776949477/Ludo_League_SA_tough_match_evhrw5.jpg" alt="Intense Ludo League SA tournament match in progress" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          </div>
          <div className="h-48 md:h-64 bg-bg-deep rounded-xl overflow-hidden relative group">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1776949473/Ludo_League_SA_Corporate_exhibition_rv2l3j.jpg" alt="Ludo League SA corporate exhibition boards on display" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          </div>
          <div className="h-48 md:h-64 bg-bg-deep rounded-xl overflow-hidden relative group">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1777030102/Ludo_League_SA_tourmanent_in_session_e0qruk.jpg" alt="Tournament dice roll deciding a Ludo League SA match" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          </div>
          <div className="h-48 md:h-64 bg-bg-deep rounded-xl overflow-hidden relative group">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1776949476/Ludo_League_SA_women_and_kids_oioj8d.jpg" alt="Focused Ludo League SA player studying the board" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          </div>
          <div className="h-48 md:h-64 bg-bg-deep rounded-xl overflow-hidden relative group">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1776949477/Ludo_League_SA_School_teams_playing_Ludo_jhuckm.jpg" alt="Ludo4Schools tournament board setup before a match" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const ContactSection = () => {
  return (
    <section id="contact" className="relative z-10 py-32 px-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic mb-8">Get In Touch</h2>
        <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">Have questions about upcoming qualifiers, sponsorships, or league rulings? Our committee is ready.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
          <div className="flex items-center gap-4 text-xl text-white">
            <div className="w-12 h-12 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal">
              <Phone size={24} />
            </div>
            +27 11 000 0000
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          {[Instagram, Twitter, Facebook].map((Icon, i) => (
            <a key={i} href="#" className="w-14 h-14 rounded-full bg-bg-panel border border-white/10 flex items-center justify-center text-white/50 hover:bg-accent-teal hover:text-bg-deep hover:border-accent-teal transition-all">
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
