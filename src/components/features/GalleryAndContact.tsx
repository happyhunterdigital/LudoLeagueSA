// src/components/features/GalleryAndContact.tsx
import React from 'react';
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
            <img src="https://images.unsplash.com/photo-1611996598517-380f27471644?w=800&h=800&fit=crop" alt="Ludo Match" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          </div>
          <div className="h-48 md:h-64 bg-bg-deep rounded-xl overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=600&h=400&fit=crop" alt="Tournament Gear" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          </div>
          <div className="h-48 md:h-64 bg-bg-deep rounded-xl overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1589149022630-fce4e6f47795?w=600&h=400&fit=crop" alt="Dice Roll" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          </div>
          <div className="h-48 md:h-64 bg-bg-deep rounded-xl overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop" alt="Player Focus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          </div>
          <div className="h-48 md:h-64 bg-bg-deep rounded-xl overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1605733513597-a8f8d410fe3c?w=600&h=400&fit=crop" alt="Board Setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
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
