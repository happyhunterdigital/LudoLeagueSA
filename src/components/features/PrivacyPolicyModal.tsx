import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.95 }} 
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl border"
            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-color)', color: 'var(--text)' }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b backdrop-blur-md" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
              <div className="flex items-center gap-3">
                <ShieldCheck style={{ color: 'var(--accent)' }} size={28} />
                <h2 className="text-2xl font-display font-black italic uppercase tracking-tight">Privacy & Cookie Policy</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-8 text-sm sm:text-base opacity-90 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>1. Overview & Scope</h3>
                <p>The Ludo League SA respects your privacy. This policy dictates how we collect, process, and secure your data in strict compliance with the Protection of Personal Information Act (POPIA - South Africa) and the General Data Protection Regulation (GDPR - UK/EU).</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>2. Data Collection</h3>
                <p className="mb-2">We collect the following personal information when you register for tournaments or purchase official gear:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><b>Identity Data:</b> Full Name.</li>
                  <li><b>Contact Data:</b> Email Address, Phone Number, Region (e.g., Soweto, Alexandra).</li>
                  <li><b>Technical Data:</b> IP address, browser type, and device telemetry via strictly necessary cookies.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>3. Purpose of Processing</h3>
                <p>Your data is processed exclusively to facilitate tournament bracketing, distribute league communications, process shop transactions, and secure our network against malicious bots. We do not sell your personal data to third-party brokers.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>4. Cookies & Tracking</h3>
                <p>We use local storage and cookies to maintain your shopping cart, validate form submissions, and track platform performance. You reserve the right to decline non-essential cookies via our consent manager.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>5. Your Rights (POPIA & GDPR)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><b>Right to Access:</b> You may request a copy of all personal data we hold.</li>
                  <li><b>Right to Rectification:</b> You may request corrections to inaccurate data.</li>
                  <li><b>Right to Erasure:</b> You possess the "Right to be Forgotten" and may request complete deletion of your profile from our Firestore database.</li>
                  <li><b>Data Portability:</b> You may request your data in a structured, machine-readable format.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>6. Contact Information</h3>
                <p>To exercise any of your data rights, or if you have concerns regarding our data architecture, please contact our Data Protection Officer at <b>info@ludoleague.co.za</b>.</p>
              </section>
            </div>
            
            <div className="sticky bottom-0 p-6 border-t flex justify-end backdrop-blur-md" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
              <button onClick={onClose} className="px-8 py-3 uppercase text-xs font-black tracking-widest rounded-lg shadow-lg" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
