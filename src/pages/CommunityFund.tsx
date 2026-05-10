import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion } from 'motion/react';

interface FundTier {
  amount: number;
  perk: string;
}

const fundTiers: FundTier[] = [
  { amount: 50, perk: 'Supporter Badge on Profile' },
  { amount: 200, perk: 'Exclusive Ludo League SA Avatar' },
  { amount: 500, perk: 'VIP Tournament Entry & Custom Board' },
];

export const CommunityFund: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const currentFunds = 12500;
  const goalFunds = 50000;
  const progressPercentage = Math.min((currentFunds / goalFunds) * 100, 100);

  return (
    <section id="fund" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9]">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeader 
          tag="Community First" 
          title="Back the League" 
          subtitle="Ludo League SA is built by the community, for the community. Contributions fund server upkeep, new features, and local prize pools."
          colorClass="text-white"
        />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white border border-white/20 p-6 md:p-10 rounded-2xl shadow-xl mt-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-4xl font-display font-black italic text-[#0F172A]">R{currentFunds.toLocaleString()}</span>
              <span className="text-slate-500 ml-2 text-[10px] md:text-xs font-bold uppercase tracking-widest">raised of R{goalFunds.toLocaleString()} goal</span>
            </div>
            <span className="text-sm font-bold text-[#0EA5E9]">{progressPercentage.toFixed(1)}%</span>
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-4 mb-8 border border-slate-200 overflow-hidden shadow-inner">
            <div 
              className="bg-[#0EA5E9] h-full rounded-full transition-all duration-1000 relative shadow-md" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {fundTiers.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => setSelectedAmount(tier.amount)}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                  selectedAmount === tier.amount 
                    ? 'border-[#0EA5E9] bg-sky-50 shadow-md' 
                    : 'border-slate-200 hover:border-[#0EA5E9] hover:bg-slate-50'
                }`}
              >
                <div className="font-display font-black italic text-2xl text-[#0F172A] mb-2">R{tier.amount}</div>
                <div className="text-xs text-slate-600 font-bold leading-relaxed">{tier.perk}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-200">
            <div className="flex items-center space-x-3 mb-6 sm:mb-0 text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-bold">
              <Lock size={14} className="text-[#0EA5E9]" />
              <span>Secure local payments via <span className="text-[#0F172A]">Paystack / Yoco</span></span>
            </div>
            <button 
              disabled={!selectedAmount}
              className="w-full sm:w-auto btn-action bg-[#D32F2F] text-white disabled:opacity-50 disabled:cursor-not-allowed border-none rounded-xl"
            >
              {selectedAmount ? `Contribute R${selectedAmount}` : 'Select an amount'}
            </button>
          </div>
        </motion.div>
        
        <div className="text-center text-[10px] text-[#0F172A] mt-6 max-w-2xl mx-auto uppercase tracking-widest leading-relaxed opacity-80 font-bold">
          Every transaction is heavily encrypted and audited. We believe in 100% financial transparency with our player base.
        </div>
      </div>
    </section>
  );
};
