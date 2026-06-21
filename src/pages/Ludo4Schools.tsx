import { BookOpen, Landmark, Heart } from 'lucide-react';

export const Ludo4Schools = () => {
  return (
    <section id="ludo4schools" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_School_team_hold_Ludo_league_Boards_xaiclf.jpg" alt="Schools" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-transparent to-[#0F172A]"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">
        <div>
          <SectionHeader tag="Syllabus" title="Ludo4Schools Program" colorClass="text-[#0EA5E9]" />
          <p className="text-slate-300 text-center max-w-3xl mx-auto text-sm md:text-base leading-relaxed mt-4">
            An approved curriculum add-on designed to introduce spatial geometry, probability assessment, and strategic reasoning into South African primary and secondary classrooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-sky-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="w-10 h-10 text-sky-400 bg-sky-500/10 rounded-lg flex items-center justify-center"><BookOpen size={20} /></div>
            <h4 className="text-lg font-display font-black italic text-white uppercase">Cognitive Mathematics</h4>
            <p className="text-slate-300 text-xs leading-relaxed">Fosters foundational mathematical skills through rapid dice summation, spatial board counting, probability evaluation, and strategic planning.</p>
          </div>
          <div className="bg-slate-800/50 border border-amber-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="w-10 h-10 text-amber-400 bg-amber-500/10 rounded-lg flex items-center justify-center"><Heart size={20} /></div>
            <h4 className="text-lg font-display font-black italic text-white uppercase">Social Cohesion</h4>
            <p className="text-slate-300 text-xs leading-relaxed">Promotes offline team leadership, face-to-face cooperation, and healthy rivalries, mitigating the social isolation of digital gaming.</p>
          </div>
          <div className="bg-slate-800/50 border border-teal-400/20 p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="w-10 h-10 text-teal-400 bg-teal-500/10 rounded-lg flex items-center justify-center"><Landmark size={20} /></div>
            <h4 className="text-lg font-display font-black italic text-white uppercase">Hybrid Funding</h4>
            <p className="text-slate-300 text-xs leading-relaxed">Sustained through robust corporate CSI sponsorships, government education grants, and nominal parent subscriptions (R50 to R100/month).</p>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-3xl text-center space-y-6 max-w-2xl mx-auto">
          <h4 className="text-2xl font-display font-black italic text-white uppercase">Onboard Your Institution</h4>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Our organizational target dictates the rapid onboarding of over 300 schools within the current fiscal season. Contact our education division directly at info@ludoleague.co.za to request official rulesets and schedule a clinic.
          </p>
        </div>
      </div>
    </section>
  );
};
