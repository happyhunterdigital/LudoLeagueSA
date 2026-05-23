import React from 'react';
import { Mail, MessageCircle, Download } from 'lucide-react';
import { SectionHeader } from '../ui/SharedUI';

export const LandingCTA: React.FC = () => {
  return (
    <section className="relative z-10 py-24 px-6 md:px-10 bg-[#FFFDF5] text-[#001F3F]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag="Join Us" title="Be A Part Of Something Big" colorClass="text-[#D32F2F]" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          <div className="bg-white p-8 rounded-[20px] border border-red-100 shadow-sm text-center flex flex-col items-center">
            <div className="p-4 bg-red-50 text-[#D32F2F] rounded-2xl mb-6"><Mail size={28} /></div>
            <h3 className="text-xl font-display font-black italic uppercase mb-2">Subscribe</h3>
            <p className="text-slate-600 text-sm mb-6">Stay ahead of major announcements, patch notes, and tournament schedules.</p>
            <button className="px-6 py-3 bg-[#D32F2F] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-colors w-full mt-auto">Subscribe</button>
          </div>

          <div className="bg-white p-8 rounded-[20px] border border-red-100 shadow-sm text-center flex flex-col items-center">
            <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl mb-6"><MessageCircle size={28} /></div>
            <h3 className="text-xl font-display font-black italic uppercase mb-2">Community</h3>
            <p className="text-slate-600 text-sm mb-6">Connect directly with over 10,000 active tournament players in our WhatsApp groups.</p>
            <button className="px-6 py-3 bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-colors w-full mt-auto">Join WhatsApp</button>
          </div>

          <div className="bg-white p-8 rounded-[20px] border border-red-100 shadow-sm text-center flex flex-col items-center">
            <div className="p-4 bg-sky-50 text-sky-500 rounded-2xl mb-6"><Download size={28} /></div>
            <h3 className="text-xl font-display font-black italic uppercase mb-2">Press Kit</h3>
            <p className="text-slate-600 text-sm mb-6">Download high-resolution branding assets, tournament rulebooks, and press releases.</p>
            <button className="px-6 py-3 bg-sky-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-colors w-full mt-auto">Download</button>
          </div>

        </div>
      </div>
    </section>
  );
};
