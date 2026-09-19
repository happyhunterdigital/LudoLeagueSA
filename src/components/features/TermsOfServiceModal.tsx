import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ScrollText } from 'lucide-react';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceProps> = ({ isOpen, onClose }) => {
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
                <ScrollText style={{ color: 'var(--accent)' }} size={28} />
                <h2 className="text-2xl font-display font-black italic uppercase tracking-tight">Terms of Service</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Close terms">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-8 text-sm sm:text-base opacity-90 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>1. Who We Are</h3>
                <p>These terms govern your use of The Ludo League South Africa (LLSA) platform, tournaments, leagues, shop, and Ludo4Schools programme. LLSA is headquartered in Pretoria, Gauteng, South Africa. Contact: <b>info@ludoleague.co.za</b> · +27 (0) 75 321 1350.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>2. Eligibility & Guardian Consent</h3>
                <p className="mb-2">Tournament players must meet the minimum age for their division. Players under 18 may participate only with the consent of a parent or legal guardian, who accepts these terms on the minor's behalf and provides emergency contact details. LLSA may request proof of age or guardian consent at any time.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>3. Tournament Rules & Fair Play</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>All matches use the official standardised LLSA ruleset — casual "house rules" do not apply.</li>
                  <li>Certified referees' decisions on disputes, time-controls, and results are final on the day.</li>
                  <li>Cheating, collusion, match manipulation, or tampering with boards, tokens, or dice leads to immediate disqualification and possible season bans.</li>
                  <li>Players must arrive on time; walkovers apply after a 15-minute grace period unless the referee rules otherwise.</li>
                  <li>Entry fees are confirmed on each tournament page (e.g. King's Table R250 per team; Ludo Agent registration R1,500 founding rate). Fees secure your slot and are non-transferable without LLSA approval.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>4. Prizes (R100k+ Season Pool)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Prize amounts are announced per tournament before entries close. The advertised season pool exceeds R100,000 across all events.</li>
                  <li>Prizes are paid within 30 days of verified results to the registered account holder only. Winners must provide a valid SA ID and matching banking details.</li>
                  <li>Prizes may be withheld or reclaimed where results are overturned for rule violations or fraud.</li>
                  <li>Where the Consumer Protection Act 68 of 2008 applies to promotional competitions, LLSA complies with s36 requirements: competition rules, prize details, and closing dates are published per event, and winners are drawn/declared transparently.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>5. Code of Conduct</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Respect opponents, referees, officials, venues, and spectators at all times.</li>
                  <li>No harassment, hate speech, intimidation, or unsporting behaviour — on or off the board.</li>
                  <li>No alcohol abuse, illegal substances, or weapons at LLSA venues, including school venues.</li>
                  <li>Breaches may result in warnings, point deductions, disqualification, venue bans, or reporting to authorities.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>6. Shop, Payments & Refunds</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Payments are processed via PayFast or verified manual EFT to our official Nedbank account. Never pay into any other account claiming to be LLSA.</li>
                  <li>Prices are in ZAR and include VAT where applicable. Delivery timelines are confirmed at checkout.</li>
                  <li>Under the Consumer Protection Act, you may cancel tournament entries for a full refund within 5 business days of payment, provided the event has not yet taken place. Defective merchandise may be returned within 6 months for repair, replacement, or refund.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>7. Liability</h3>
                <p>Participation is at your own risk. To the maximum extent permitted by law (and subject to your non-excludable rights under the Consumer Protection Act), LLSA is not liable for indirect or consequential loss. Nothing in these terms limits liability for gross negligence or wilful misconduct.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>8. Changes & Governing Law</h3>
                <p>We may update these terms; material changes are announced on the platform. Continued participation constitutes acceptance. These terms are governed by the laws of the Republic of South Africa.</p>
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
