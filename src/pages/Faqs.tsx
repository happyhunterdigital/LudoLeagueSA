import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { ChevronDown, HelpCircle, AlertCircle, BookOpen, Scale } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  badge?: string;
}

const disputeFramework = [
  { category: 'A. Dice Roll Disputes', items: 'Dice falling off the board, dice not shaken properly, rolling with two hands, or rolling before the opponent finishes their move.' },
  { category: 'B. Touch Disputes ("Touch is a Move")', items: 'Player touching a token and trying to move another, opponent touching the board/tokens during your turn, or touching the dice before the opponent finishes playing.' },
  { category: 'C. Token Movement Disputes', items: 'Incorrect counting, illegal splitting of married tokens, moving tokens out of order, or moving without an exact number.' },
  { category: 'D. Capture Disputes', items: 'A player disputing whether a capture was legal, a token moved incorrectly before capture, or a capture being missed or ignored.' },
  { category: 'E. Time-Wasting Disputes', items: 'A player intentionally delaying moves, repeatedly asking unnecessary questions, or refusing to roll.' },
  { category: 'F. Coaching & Interference Disputes', items: 'Coaching during active play, spectator interference, or manager gestures/signals.' },
  { category: 'G. Behavioural Misconduct', items: 'Inappropriate language, aggression, touching opponent\'s tokens, wearing unapproved brands, or substance use.' },
  { category: 'H. Venue & Environmental Disputes', items: 'Poor lighting, unsafe environment, or noise interference.' }
];

const ruleDisputes: FaqItem[] = [
  {
    q: "Can I land on an opponent's colored starting point if it is empty?",
    a: "Yes. The starting point is part of the shared main orbital track and can be landed on by any player traversing the board. Players cannot claim territorial ownership of the main track based on color.",
    badge: "Dispute Resolution"
  },
  {
    q: "Is a starting square considered a universal \"safe zone\"?",
    a: "This depends strictly on the physical board's markings. On most modern boards, starting squares are marked with arrows or shields, designating them as safe zones where captures cannot occur. Players must verify their physical board's iconography prior to play.",
    badge: "Board Geometry"
  },
  {
    q: "What happens if I land on an opponent's occupied starting square?",
    a: "If the starting square lacks safe zone iconography, the opponent's piece is captured and immediately returned to their locked corner base. It offers no inherent immunity unless visually marked.",
    badge: "Dispute Resolution"
  },
  {
    q: "Can I form a blockade (two identical tokens) on my own starting square?",
    a: "Yes, theoretically this is permitted. However, in professional league play, this is classified as an \"advanced rule\" that must be agreed upon prior to the match, as it creates an impassable chokepoint early in the loop.",
    badge: "Tactics"
  }
];

export const Faqs = () => {
  const [disputeIndex, setDisputeIndex] = useState<number | null>(null);
  const [frameworkOpen, setFrameworkOpen] = useState<number | null>(null);

  return (
    <section className="min-h-screen w-full py-24 px-4 md:px-10 bg-slate-50 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <SectionHeader tag="Rulebook & disputes" title="Ludo FAQs & Mechanics" colorClass="text-slate-900" />
          <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed mt-4">
            Physical Ludo lacks a digital referee, making disputes over edge-case scenarios common. Below is the official standardized play disputes framework and ludological resolutions.
          </p>
        </div>

        {/* Disputes Framework A to H */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-black italic uppercase text-slate-955 flex items-center gap-3">
            <Scale className="text-[#0EA5E9]" /> Standardised Play Disputes Framework
          </h3>
          <p className="text-xs text-slate-500 pb-2">Below are the official dispute categories recognised by the Ludo League South Africa (LLSA):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {disputeFramework.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">{item.category}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{item.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Standardized Disputes FAQ */}
        <div className="space-y-4 pt-6">
          <h3 className="text-xl sm:text-2xl font-display font-black italic uppercase text-slate-955 flex items-center gap-3">
            <AlertCircle className="text-amber-500" /> Standardized Play Disputes
          </h3>
          <div className="space-y-3">
            {ruleDisputes.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setDisputeIndex(disputeIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-800 text-sm sm:text-base hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="text-slate-400 shrink-0" size={18} />
                    {faq.q}
                  </span>
                  <ChevronDown className={`transition-transform duration-300 shrink-0 ${disputeIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {disputeIndex === idx && (
                  <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-2.5">
                    <span className="px-3 py-0.5 bg-sky-50 text-[#0EA5E9] text-[9px] font-black uppercase tracking-widest rounded-full">{faq.badge}</span>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm pt-1.5">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
