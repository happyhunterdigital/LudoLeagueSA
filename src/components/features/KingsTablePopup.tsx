import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, X, ArrowRight, Users } from 'lucide-react';

interface KingsTablePopupProps {
  scrollToSection: (id: string) => void;
}

const SESSION_KEY = 'kt_popup_dismissed';

export const KingsTablePopup: React.FC<KingsTablePopupProps> = ({ scrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const heroRef = useRef<Element | null>(null);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    heroRef.current = heroSection;

    // Use IntersectionObserver to detect when user scrolls PAST the hero
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero is no longer intersecting (user scrolled past it)
        if (!entry.isIntersecting && !hasShown) {
          setHasShown(true);
          // Small delay for smoothness
          setTimeout(() => setIsVisible(true), 400);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, [hasShown]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  const handleRegister = () => {
    handleDismiss();
    scrollToSection('kingstable');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop (subtle, doesn't block scrolling) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1500] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at bottom center, rgba(250,204,21,0.04) 0%, transparent 70%)' }}
          />

          {/* Popup Card — slides up from bottom-right */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.8 }}
            className="fixed bottom-6 right-4 md:right-6 z-[1600] w-[calc(100vw-32px)] max-w-[360px] pointer-events-auto"
            role="dialog"
            aria-label="King's Table registration popup"
          >
            <div className="relative bg-[#0D1117] border border-[#FACC15]/25 rounded-2xl shadow-2xl overflow-hidden">

              {/* Gold accent bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#FACC15] to-transparent" />

              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/[0.04] to-transparent pointer-events-none" />

              {/* Dismiss button */}
              <button
                id="kt-popup-dismiss"
                onClick={handleDismiss}
                aria-label="Close popup"
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all z-10"
              >
                <X size={13} />
              </button>

              <div className="relative p-5 pt-4">
                {/* Crown + tag */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FACC15]/20 to-[#D4A017]/10 border border-[#FACC15]/25 flex items-center justify-center shrink-0">
                    <Crown size={18} className="text-[#FACC15]" />
                  </div>
                  <div>
                    <span className="text-[#FACC15] text-[10px] font-bold uppercase tracking-[0.2em]">
                      Exclusive Tournament
                    </span>
                    <h3 className="text-white font-display font-black text-lg leading-tight">
                      The King's Table
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Register your team for South Africa's most prestigious Ludo tournament. Limited spots available!
                </p>

                {/* Fee pill */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5 bg-[#FACC15]/10 border border-[#FACC15]/20 rounded-lg px-3 py-1.5">
                    <Users size={12} className="text-[#FACC15]" />
                    <span className="text-[#FACC15] font-black text-sm">R250</span>
                    <span className="text-white/40 text-xs">/ team</span>
                  </div>
                  <span className="text-white/30 text-xs">· Payable via PayFast or EFT</span>
                </div>

                {/* CTA */}
                <button
                  id="kt-popup-register-btn"
                  onClick={handleRegister}
                  className="w-full py-3 bg-[#FACC15] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-[#FFE600] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-[#FACC15]/15 group"
                >
                  Register Now <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Dismiss link */}
                <button
                  onClick={handleDismiss}
                  className="w-full mt-2 text-center text-white/25 text-[11px] hover:text-white/50 transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
