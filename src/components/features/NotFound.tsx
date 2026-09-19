import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  requestedPage?: string | null;
  onHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ requestedPage, onHome }) => {
  return (
    <section className="min-h-[70vh] w-full flex flex-col items-center justify-center text-center px-6 py-24 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto space-y-6"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/[0.04] border border-white/10">
          <Ghost size={36} className="text-[#FACC15]" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">404 — Off the board</p>
        <h1 className="text-5xl md:text-6xl font-display font-black uppercase text-white leading-none">
          Lost <span className="text-[#FACC15]">Roll</span>
        </h1>
        <p className="text-white/50 text-sm leading-relaxed">
          {requestedPage
            ? `There's no arena called "${requestedPage}" — the link may be outdated or mistyped.`
            : 'This page rolled off the board. The link may be outdated or mistyped.'}
        </p>
        <button
          onClick={onHome}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#FACC15] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-[#FFE600] transition-all"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </motion.div>
    </section>
  );
};
