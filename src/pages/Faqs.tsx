import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { ChevronDown, HelpCircle, AlertCircle, BookOpen } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  badge?: string;
}

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
  },
  {
    q: "If multiple tokens of different colors occupy a safe zone, does it form a blockade?",
    a: "No. A blockade strictly requires two tokens of the identical color. Differing colors coexisting on a safe square do not block other pieces from passing through.",
    badge: "Board Geometry"
  },
  {
    q: "Are there limits to how many pawns can occupy a safe space?",
    a: "No. There is no official limit. Theoretically, up to fifteen pawns could occupy a single safe space if the dice rolls align perfectly, though this leads to highly congested, chaotic mass-exoduses.",
    badge: "Board Geometry"
  }
];

const historicalFaqs: FaqItem[] = [
  {
    q: "What is the penalty for rolling three consecutive sixes?",
    a: "In standard rules, rolling a six three consecutive times terminates your turn immediately. In punitive variants, the player is heavily penalized by forcing their last moved token all the way back to the starting yard, provided it has not entered the protected home row.",
    badge: "Mechanics"
  },
  {
    q: "How does the \"blob\" blockade challenge operate in Uckers?",
    a: "In the naval variant Uckers, blockades form massive barriers called \"blobs.\" To break a blob, an opponent must land exactly behind the barrier, roll an initial six to declare an attack, and subsequently roll precise numbers to dismantle the blockade piece by piece.",
    badge: "Uckers Variant"
  },
  {
    q: "What is the extreme defeat rule in naval Uckers matches?",
    a: "Losing a game before securing a single token in your home triangle is called an \"eight-piece in harbour\" or \"eight-piece dicking.\" Maritime tradition mandates that the losing player's name be permanently inscribed on the reverse side of the physical board to memorialize the defeat. Act of flipping the board to inspect these rules taped underneath immediately terminates the match.",
    badge: "Uckers Variant"
  }
];

export const Faqs = () => {
  const [disputeIndex, setDisputeIndex] = useState<number | null>(null);
  const [histIndex, setHistIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen w-full py-24 px-4 md:px-10 bg-slate-50 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-16">
        <div>
          <SectionHeader tag="Rulebook & disputes" title="Ludo FAQs & Mechanics" colorClass="text-slate-900" />
          <p className="text-slate-600 text-center max-w-2xl mx-auto text-sm leading-relaxed mt-4">
            Physical Ludo lacks a digital referee, making disputes over edge-case scenarios common. Below is the official ludological resolution for recurring disputes, historical rulesets, and tactical configurations.
          </p>
        </div>

        {/* Section 1: Standardized Disputes */}
        <div className="space-y-6">
          <h3 className="text-2xl font-display font-black italic uppercase text-slate-950 flex items-center gap-3">
            <AlertCircle className="text-[#0EA5E9]" /> Standardized Play Disputes
          </h3>
          <div className="space-y-4">
            {ruleDisputes.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => setDisputeIndex(disputeIndex === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold text-slate-800 text-base md:text-lg hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="text-slate-400 shrink-0" size={20} />
                    {faq.q}
                  </span>
                  <ChevronDown className={`transition-transform duration-300 shrink-0 ${disputeIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {disputeIndex === idx && (
                  <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
                    <span className="px-3 py-1 bg-sky-50 text-[#0EA5E9] text-[10px] font-black uppercase tracking-widest rounded-full">{faq.badge}</span>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Historical & Variant Rules */}
        <div className="space-y-6">
          <h3 className="text-2xl font-display font-black italic uppercase text-slate-950 flex items-center gap-3">
            <BookOpen className="text-amber-500" /> Evolutionary & Historical Variants
          </h3>
          <div className="space-y-4">
            {historicalFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => setHistIndex(histIndex === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold text-slate-800 text-base md:text-lg hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="text-slate-400 shrink-0" size={20} />
                    {faq.q}
                  </span>
                  <ChevronDown className={`transition-transform duration-300 shrink-0 ${histIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {histIndex === idx && (
                  <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full">{faq.badge}</span>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base pt-2">{faq.a}</p>
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
