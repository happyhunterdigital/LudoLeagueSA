import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Target, Trophy, Users, Briefcase } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto w-full">
        
        <SectionHeader tag="Our Mission" title="About the League" colorClass="text-[#0EA5E9]" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <p className="text-lg md:text-2xl text-white font-medium leading-relaxed drop-shadow-sm">
            The National Ludo League is a pioneering initiative that transforms South Africa's most beloved traditional board game into a structured, competitive sport.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#1E293B] border border-slate-700 p-8 md:p-10 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-xl bg-[#0F172A] border border-slate-600 flex items-center justify-center mb-6">
              <Target className="text-[#0EA5E9]" size={28} />
            </div>
            <h3 className="text-2xl font-display font-black italic text-white mb-4">A Professional Structure</h3>
            <p className="text-slate-300 leading-relaxed">
              The professional tier features a rigorous <b>10-month season</b> comprising <b>20 registered clubs</b>. Each club competes in <b>38 matches</b>. We operate with standardized rules and competitive ranking systems to ensure integrity across all levels of play.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#1E293B] border border-slate-700 p-8 md:p-10 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-xl bg-[#0F172A] border border-slate-600 flex items-center justify-center mb-6">
              <Trophy className="text-[#0EA5E9]" size={28} />
            </div>
            <h3 className="text-2xl font-display font-black italic text-white mb-4">Major Tournaments</h3>
            <p className="text-slate-300 leading-relaxed">
              We host four major quarterly tournaments—including the highly anticipated <b>Ludo Summer Clash, Winter Cup, and National Championship</b>. These 1-to-2-day events attract thousands of participants and spectators.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#1E293B] border border-slate-700 p-8 md:p-10 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-xl bg-[#0F172A] border border-slate-600 flex items-center justify-center mb-6">
              <Users className="text-[#0EA5E9]" size={28} />
            </div>
            <h3 className="text-2xl font-display font-black italic text-white mb-4">Empowering Communities</h3>
            <ul className="text-slate-300 leading-relaxed space-y-2 list-disc pl-5">
              <li><b>Salaries & Prizes:</b> Professional players earn a monthly salary and compete for significant prize pools.</li>
              <li><b>Development:</b> Players receive mentorship and financial coaching.</li>
              <li><b>Job Creation:</b> Direct employment for officials, referees, commentators, and event staff.</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#1E293B] border border-slate-700 p-8 md:p-10 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-xl bg-[#0F172A] border border-slate-600 flex items-center justify-center mb-6">
              <Briefcase className="text-[#0EA5E9]" size={28} />
            </div>
            <h3 className="text-2xl font-display font-black italic text-white mb-4">Club Ownership</h3>
            <p className="text-slate-300 leading-relaxed">
              Entrepreneurs and investors have the unique opportunity to buy a <b>"Right to Participate" (RTP)</b> in the league. This high-value system allows them to register and manage one of the 20 professional clubs, drawing parallels to established sports leagues like the PSL.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
