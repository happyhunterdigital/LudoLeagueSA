import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';

interface PrivacyProps {
  onBack?: () => void;
}

export const Privacy: React.FC<PrivacyProps> = ({ onBack }) => {
  return (
    <section
      className="min-h-screen w-full py-24 px-4 md:px-10"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <SectionHeader tag="Your data, protected" title="Privacy & Cookie Policy" />
          <p className="max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed mt-4 opacity-70">
            How the Ludo League SA collects, processes, and secures your personal
            information — in compliance with POPIA (South Africa).
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed opacity-90">
          <section>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
              1. Overview & Scope
            </h3>
            <p>
              The Ludo League SA respects your privacy. This policy dictates how we
              collect, process, and secure your data in strict compliance with the
              Protection of Personal Information Act (POPIA - South Africa) and the
              General Data Protection Regulation (GDPR - UK/EU).
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
              2. Data Collection
            </h3>
            <p className="mb-2">
              We collect the following personal information when you register for
              tournaments or purchase official gear:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><b>Identity Data:</b> Full Name.</li>
              <li><b>Contact Data:</b> Email Address, Phone Number, Region (e.g., Soweto, Alexandra).</li>
              <li><b>Technical Data:</b> IP address, browser type, and device telemetry via strictly necessary cookies.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
              3. Purpose of Processing
            </h3>
            <p>
              Your data is processed exclusively to facilitate tournament bracketing,
              distribute league communications, process shop transactions, and secure
              our network against malicious bots. We do not sell your personal data
              to third-party brokers.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
              4. Cookies & Tracking
            </h3>
            <p>
              We use local storage and cookies to maintain your shopping cart, validate
              form submissions, and track platform performance. You reserve the right
              to decline non-essential cookies via our consent manager.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
              5. WhatsApp Messaging
            </h3>
            <p>
              When you initiate a conversation with our automated assistant, Meta may
              process your phone number in accordance with its Privacy Policy. Ludo
              League SA only receives the information necessary to respond to your
              inquiry and does not store your conversations outside of our secure
              systems.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
              6. Your Rights (POPIA &amp; GDPR)
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><b>Right to Access:</b> You may request a copy of all personal data we hold.</li>
              <li><b>Right to Rectification:</b> You may request corrections to inaccurate data.</li>
              <li><b>Right to Erasure:</b> You possess the "Right to be Forgotten" and may request complete deletion of your profile from our Firestore database.</li>
              <li><b>Data Portability:</b> You may request your data in a structured, machine-readable format.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
              7. Contact Information
            </h3>
            <p>
              To exercise any of your data rights, or if you have concerns regarding our
              data architecture, please contact our Data Protection Officer at{' '}
              <b>info@ludoleague.co.za</b>.
            </p>
          </section>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-3 uppercase text-xs font-black tracking-widest rounded-lg shadow-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
          >
            <ArrowLeft size={16} /> Back to Site
          </button>
        </div>
      </div>
    </section>
  );
};

export default Privacy;