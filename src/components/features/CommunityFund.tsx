import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { SectionHeader } from '../ui/SharedUI';

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
    <section className="relative z-10 py-20 px-4 md:px-10 border-t border-white/10 bg-bg-panel/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          tag="Community First" 
          title="Back the League" 
          subtitle="Ludo League SA is built by the community, for the community. Contributions fund server upkeep, new features, and local prize pools."
          colorClass="text-accent-gold"
        />

        <div className="bg-bg-card border border-white/10 p-6 md:p-10 rounded-2xl shadow-2xl mt-12">
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-3xl md:text-4xl font-display font-black text-accent-gold italic">R{currentFunds.toLocaleString()}</span>
              <span className="text-white/50 ml-2 text-[10px] md:text-xs font-bold uppercase tracking-widest">raised of R{goalFunds.toLocaleString()} goal</span>
            </div>
            <span className="text-sm font-bold text-accent-gold">{progressPercentage.toFixed(1)}%</span>
          </div>
          
          <div className="w-full bg-bg-deep rounded-full h-3 mb-8 border border-white/5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-accent-gold to-yellow-300 h-full rounded-full transition-all duration-1000 relative shadow-[0_0_15px_rgba(251,191,36,0.5)]" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {fundTiers.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => setSelectedAmount(tier.amount)}
                className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                  selectedAmount === tier.amount 
                    ? 'border-accent-gold bg-accent-gold/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]' 
                    : 'border-white/10 hover:border-accent-gold/50 hover:bg-white/5'
                }`}
              >
                <div className="font-display font-black italic text-2xl text-white mb-2">R{tier.amount}</div>
                <div className="text-xs text-white/70 font-medium leading-relaxed">{tier.perk}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-6 sm:mb-0 text-[10px] sm:text-xs text-white/50 uppercase tracking-widest font-bold">
              <Lock size={14} className="text-accent-gold" />
              <span>Secure local payments via <span className="text-white">Paystack / Yoco</span></span>
            </div>
            <button 
              disabled={!selectedAmount}
              className="w-full sm:w-auto px-8 py-4 bg-accent-gold text-bg-deep font-black uppercase tracking-widest italic rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-gold"
            >
              {selectedAmount ? `Contribute R${selectedAmount}` : 'Select an amount'}
            </button>
          </div>
        </div>
        
        <div className="text-center text-[10px] text-white/40 mt-6 max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
          Every transaction is heavily encrypted and audited. We believe in 100% financial transparency with our player base.
        </div>
      </div>
    </section>
  );
};
