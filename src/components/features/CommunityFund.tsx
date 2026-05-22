import React, { useState } from 'react';
import { Lock, Loader2, CheckCircle2, UploadCloud } from 'lucide-react';
import { SectionHeader } from '../ui/SharedUI';
import { motion } from 'motion/react';
import { db, storage } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    proofOfPayment: null as File | null,
  });

  const currentFunds = 12500;
  const goalFunds = 50000;
  const progressPercentage = Math.min((currentFunds / goalFunds) * 100, 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (formData.proofOfPayment && storage) {
        const fileRef = ref(storage, `donation_pops/${Date.now()}_${formData.proofOfPayment.name}`);
        const uploadResult = await uploadBytes(fileRef, formData.proofOfPayment);
        popUrl = await getDownloadURL(uploadResult.ref);
      }

      if (db) {
        await addDoc(collection(db, 'event_registrations'), {
          fullName: formData.fullName,
          email: formData.email,
          paymentMethod: 'eft',
          proofOfPaymentUrl: popUrl,
          status: 'pending_verification',
          eventName: 'League Community Fund Donation',
          eventDate: new Date().toLocaleDateString(),
          eventLink: 'N/A - Direct Donation',
          amount: selectedAmount,
          timestamp: serverTimestamp(),
        });
      }
      setStep(3);
    } catch (error) {
      console.error("Donation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="fund" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9]">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeader 
          tag="Community First" 
          title="Back the League" 
          subtitle="Ludo League SA is built by the community, for the community. Contributions fund server upkeep, new features, and local prize pools."
          colorClass="text-white"
        />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white border border-white/20 p-6 md:p-10 rounded-2xl shadow-xl mt-8 text-slate-800">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <span className="text-4xl font-display font-black italic text-[#0F172A]">R{currentFunds.toLocaleString()}</span>
                  <span className="text-slate-500 ml-2 text-xs font-bold uppercase tracking-widest">raised of R{goalFunds.toLocaleString()} goal</span>
                </div>
                <span className="text-sm font-bold text-[#0EA5E9]">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 mb-8 overflow-hidden shadow-inner">
                <div className="bg-[#0EA5E9] h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {fundTiers.map((tier) => (
                  <button key={tier.amount} onClick={() => setSelectedAmount(tier.amount)} className={`p-6 rounded-xl border-2 text-left transition-all ${selectedAmount === tier.amount ? 'border-[#0EA5E9] bg-sky-50 shadow-md' : 'border-slate-200 hover:border-[#0EA5E9]'}`}>
                    <div className="font-display font-black italic text-2xl text-[#0F172A] mb-2">R{tier.amount}</div>
                    <div className="text-xs text-slate-600 font-bold leading-relaxed">{tier.perk}</div>
                  </button>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t">
                <input required type="text" placeholder="Your Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] outline-none focus:border-[#0EA5E9]" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                <input required type="email" placeholder="Your Email" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] outline-none focus:border-[#0EA5E9]" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <button disabled={!selectedAmount || !formData.fullName || !formData.email} onClick={() => setStep(2)} className="w-full btn-action bg-[#D32F2F] text-white disabled:opacity-50">
                Continue to Transfer
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-display font-black italic uppercase">Step 2: Bank Transfer</h3>
              <div className="bg-slate-50 p-5 rounded-xl border text-sm text-slate-700 space-y-2">
                <p><b>Bank Name:</b> Nedbank</p>
                <p><b>Account Holder:</b> THE LUDO LEAGUE SOUTH AFRICA (PTY) LTD</p>
                <p><b>Account Number:</b> 1120230365</p>
                <p><b>Branch Code:</b> 198765</p>
                <p><b>Account Type:</b> Current Account</p>
                <p><b>Amount:</b> R{selectedAmount}</p>
                <p><b>Reference:</b> DON-{formData.fullName.replace(/\s+/g, '')}</p>
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer relative bg-slate-50 hover:bg-slate-100 transition-colors">
                <UploadCloud size={32} className="text-slate-400 mb-2" />
                <span className="text-xs font-bold text-slate-500">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                <input required type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({...formData, proofOfPayment: e.target.files ? e.target.files[0] : null})} />
              </div>
              <div className="flex gap-4">
                <p>Your payment is secure</p>
                <button type="button" onClick={() => setStep(1)} className="w-1/2 py-4 bg-slate-100 rounded-xl text-slate-700 font-bold hover:bg-slate-200 transition-colors">Back</button>
                <button type="submit" disabled={isSubmitting || !formData.proofOfPayment} className="w-1/2 btn-action bg-[#D32F2F] text-white disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Complete Donation'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500"><CheckCircle2 size={48} /></div>
              <h3 className="text-2xl font-display font-black italic uppercase text-slate-900">Thank You!</h3>
              <p className="text-slate-600 leading-relaxed">Your generous donation has been initiated! Once we verify your transfer receipt, your supporter status and perks will be unlocked.</p>
              <button onClick={() => { setStep(1); setSelectedAmount(null); }} className="w-full btn-action bg-slate-900 text-white">Back to start</button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
