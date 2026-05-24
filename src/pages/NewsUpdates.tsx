import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

const newsArticles = [
  { id: 1, tag: 'TOURNAMENT', title: 'Soweto Giants Clinch Battle of the Kasis 2026', date: 'May 14, 2026', desc: 'In a stunning final showcase, the Soweto Ludo Giants secured the top spot after a dramatic late-game block.' },
  { id: 2, tag: 'SCHOOLS', title: 'Ludo4Schools Program Expands into 15 New Venues', date: 'April 28, 2026', desc: 'We are officially bringing critical cognitive strategy training and physical game boards to Mamelodi and Boveti primary schools.' },
  { id: 3, tag: 'ANNOUNCEMENT', title: 'Nedbank Business Account Integration Verified', date: 'April 09, 2026', desc: 'The league has successfully integrated our official corporate Nedbank account with the registration database.' },
];

export const NewsUpdates = () => {
  return (
    <section className="min-h-screen w-full py-24 px-4 md:px-10 bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto">
        <SectionHeader tag="League Updates" title="News & Press" colorClass="text-slate-900" />

        <div className="space-y-8 mt-12">
          {newsArticles.map(post => (
            <div key={post.id} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-3 flex-grow">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#0EA5E9]">
                  <Tag size={14} /> {post.tag} <span className="text-slate-400">|</span> <Calendar size={14} /> {post.date}
                </div>
                <h3 className="text-2xl font-display font-black italic uppercase text-[#0F172A]">{post.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-3xl">{post.desc}</p>
              </div>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0EA5E9] hover:text-slate-900 transition-colors mt-2">
                Read Article <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
