import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie } from 'lucide-react';

interface CookieConsentProps {
  openPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ openPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already acknowledged the cookie policy
    const consent = localStorage.getItem('ludo-cookie-consent');
    if (!consent) {
      // Small delay so it slides in smoothly after page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('ludo-cookie-consent', type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:w-[450px] z-[9000] p-6 rounded-2xl shadow-2xl border backdrop-blur-xl"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--accent)', color: 'var(--text)' }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--bg)' }}>
              <Cookie size={24} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Cookie Preferences</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                We use cookies to optimize your experience, secure tournaments, and analyze platform traffic in compliance with POPIA & GDPR. 
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <button 
              onClick={() => handleAccept('all')}
              className="w-full sm:w-auto px-6 py-3 text-xs font-black uppercase tracking-widest rounded-lg shadow-md hover:scale-105 transition-transform"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
            >
              Accept All
            </button>
            <button 
              onClick={() => handleAccept('essential')}
              className="w-full sm:w-auto px-6 py-3 text-xs font-black uppercase tracking-widest rounded-lg border hover:bg-white/10 transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text)' }}
            >
              Essential Only
            </button>
            <button 
              onClick={openPrivacy}
              className="w-full sm:w-auto px-4 py-3 text-xs font-bold underline opacity-70 hover:opacity-100 transition-opacity"
            >
              View Policy
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
