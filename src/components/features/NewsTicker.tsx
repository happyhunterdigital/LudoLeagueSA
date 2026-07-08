import { motion } from 'framer-motion';
import { Gift, Heart, Landmark, Award, Shield } from 'lucide-react';

export const NewsTicker = () => {
  const items = [
    {
      icon: Gift,
      text: "COMMUNITY FUNDING: Your donations fund township carpentry workshops hand-milling solid wood tournament boards, creating circular local cash-flow."
    },
    {
      icon: Heart,
      text: "LUDO4SCHOOLS: Contributions directly support screen-free math clinics, bringing cognitive spatial learning to primary and high school classrooms."
    },
    {
      icon: Landmark,
      text: "INVEST IN LUDO: Purchase an RTP (Right to Participate) status to register and manage your own professional league franchise club."
    },
    {
      icon: Award,
      text: "SPONSORSHIP: Partner with the LLSA to leverage high-impact township brand visibility and meet critical CSI scorecard parameters."
    },
    {
      icon: Shield,
      text: "BECOME A MEMBER: Unlock verified national rankings, elite training at the Ludo Academy of Excellence, and exclusive tournament benefits."
    }
  ];

  return (
    <div className="fixed top-[69px] md:top-[81px] left-0 right-0 z-[900] overflow-hidden border-b border-white/[0.04] py-2.5 bg-black/95 backdrop-blur-sm whitespace-nowrap select-none flex items-center">
      <motion.div
        animate={{ x: [0, -1800] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="flex space-x-16 text-[10px] font-display font-black tracking-[0.15em] uppercase text-white/40"
      >
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <span key={idx} className="flex items-center gap-2">
              <Icon size={12} className="text-[#FACC15] animate-pulse shrink-0" />
              <span>{item.text}</span>
              <span className="text-[#FFE600] ml-4 font-bold">//</span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};
