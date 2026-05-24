import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  { q: "What is the Ludo League SA?", a: "The Ludo League SA is South Africa's premier competitive ludo circuit, transforming the beloved traditional board game into a professional sport with standardized rules, leagues, and cash prizes." },
  { q: "How do I register a professional club?", a: "Entrepreneurs and community organizers can purchase a 'Right to Participate' (RTP) status, registering their franchise of 20 players to participate in the 10-month league season." },
  { q: "What are the banking details for the EFT fee?", a: "All entrance fees must be made to our verified Nedbank current account: 1120230365, branch code: 198765. Please ensure you upload your proof of payment on the form." },
  { q: "How do I join the Ludo4Schools program?", a: "Schools can contact our admin division directly at info@ludoleague.co.za to request complete rulebooks, game boards, and to coordinate educational league clinics." }
];

export const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen w-full py-24 px-4 md:px-10 bg-slate-50 text-slate-900">
      <div className="max-w-3xl mx-auto">
        <SectionHeader tag="Support Portal" title="Frequently Asked Questions" colorClass="text-slate-900" />

        <div className="space-y-4 mt-12">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-bold text-slate-800 text-lg hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-3"><HelpCircle className="text-[#0EA5E9]" /> {faq.q}</span>
                <ChevronDown className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="p-6 bg-slate-50 border-t border-slate-100 text-slate-600 leading-relaxed text-sm md:text-base">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
