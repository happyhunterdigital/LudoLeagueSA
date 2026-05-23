import React from 'react';
import { motion } from 'motion/react';
import { Users, Trophy, GraduationCap } from 'lucide-react';

export const LandingFeatures: React.FC = () => {
  return (
    <div className="w-full relative z-10 flex flex-col">
      
      {/* Feature A - Left Text, Right Illustration */}
      <section className="py-32 px-6 md:px-10 bg-[#0d272b] relative overflow-hidden">
        {/* Dynamic Angled Skew Divider Line */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#00f0c2] to-[#ff9d00] -skew-y-2 z-20 origin-left scale-x-110" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6">
            <div className="tag-status border-[#ff9d00] flex items-center gap-2"><Users size={16} className="text-[#ff9d00]" /> IMMENSE</div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Inclusive Community</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              We transcend race, gender, sexual orientation, and age. Ludo League SA provides a physical, screen-free platform designed to build vibrant networks, foster social cohesion, and empower local townships.
            </p>
          </motion.div>
          <div className="md:w-1/2 h-80 rounded-[20px] overflow-hidden shadow-2xl border border-white/5">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949477/Ludo_League_SA_School_teams_playing_Ludo_jhuckm.jpg" alt="Inclusive Community" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Feature B - Right Text, Left Illustration */}
      <section className="py-32 px-6 md:px-10 bg-[#081619] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#00f0c2] to-[#ff9d00] -skew-y-2 z-20 origin-left scale-x-110" />
        
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2 h-80 rounded-[20px] overflow-hidden shadow-2xl border border-white/5">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1778074844/Ludo_League_SA_award_ceremony_tsya47.jpg" alt="Competitive Excellence" className="w-full h-full object-cover" />
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6">
            <div className="tag-status border-[#00f0c2] flex items-center gap-2"><Trophy size={16} className="text-[#00f0c2]" /> TACTICAL</div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Competitive Excellence</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Participate in professional structures, climb the national rankings, and become a verified legend. With weekly regional fixtures in Pretoria and Soweto, compete for substantial player salaries and cash prizes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature C - Left Text, Right Illustration */}
      <section className="py-32 px-6 md:px-10 bg-[#0d272b] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#00f0c2] to-[#ff9d00] -skew-y-2 z-20 origin-left scale-x-110" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 space-y-6">
            <div className="tag-status border-[#ff9d00] flex items-center gap-2"><GraduationCap size={16} className="text-[#ff9d00]" /> FANTASTIC</div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic leading-none">Ludo4Schools</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Through our specialized schools initiative, we are introducing cognitive, screen-free strategic problem solving into South African primary and high schools, transforming education and building social cohesion.
            </p>
          </motion.div>
          <div className="md:w-1/2 h-80 rounded-[20px] overflow-hidden shadow-2xl border border-white/5">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949473/Ludo_League_SA_School_team_hold_Ludo_league_Boards_xaiclf.jpg" alt="Ludo4Schools" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};
