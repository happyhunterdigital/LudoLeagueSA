import React from 'react';
import { motion } from 'motion/react';
import { Users, Trophy, GraduationCap } from 'lucide-react';

export const LandingFeatures: React.FC = () => {
  return (
    <div className="w-full relative z-10 flex flex-col">
      {/* Feature A - Left Text, Right Illustration */}
      <section className="py-24 px-6 md:px-10 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6 text-[#001F3F]">
            <div className="tag-status border-[#D32F2F] text-slate-800 flex items-center gap-2"><Users size={16} className="text-[#D32F2F]" /> IMMENSE</div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic">Inclusive Community</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              We transcend race, gender, sexual orientation, and age. Ludo League SA provides a physical, screen-free platform designed to build vibrant networks, foster social cohesion, and empower local townships.
            </p>
          </motion.div>
          <div className="md:w-1/2 h-80 rounded-[20px] overflow-hidden shadow-xl">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949477/Ludo_League_SA_School_teams_playing_Ludo_jhuckm.jpg" alt="Inclusive Community" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Feature B - Right Text, Left Illustration */}
      <section className="py-24 px-6 md:px-10 bg-[#FFFDF5] border-b border-red-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-80 rounded-[20px] overflow-hidden shadow-xl">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1778074844/Ludo_League_SA_award_ceremony_tsya47.jpg" alt="Competitive Excellence" className="w-full h-full object-cover" />
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6 text-[#001F3F]">
            <div className="tag-status border-[#FFC107] text-slate-800 flex items-center gap-2"><Trophy size={16} className="text-[#FFC107]" /> TACTICAL</div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic">Competitive Excellence</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Participate in professional structures, climb the national rankings, and become a verified legend. With weekly regional fixtures in Pretoria and Soweto, compete for substantial player salaries and cash prizes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature C - Left Text, Right Illustration */}
      <section className="py-24 px-6 md:px-10 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6 text-[#001F3F]">
            <div className="tag-status border-[#0EA5E9] text-slate-800 flex items-center gap-2"><GraduationCap size={16} className="text-[#0EA5E9]" /> FANTASTIC</div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic">Ludo4Schools</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Through our specialized schools initiative, we are introducing cognitive, screen-free strategic problem solving into South African primary and high schools, transforming education and building social cohesion.
            </p>
          </motion.div>
          <div className="md:w-1/2 h-80 rounded-[20px] overflow-hidden shadow-xl">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_School_team_hold_Ludo_league_Boards_xaiclf.jpg" alt="Ludo4Schools" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};
