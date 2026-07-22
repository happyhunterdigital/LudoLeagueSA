import React, { useState } from 'react';
import { Lock, Loader2, CheckCircle2, UploadCloud, CreditCard, Landmark, Shield } from 'lucide-react';
import { SectionHeader } from '../ui/SharedUI';
import { motion } from 'framer-motion';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FundTier {
  amount: number;
  perk: string;
}

const fundTiers: FundTier[] = [
  { amount: 20, perk: 'Supporter Badge on Profile' },
  { amount: 100, perk: 'Exclusive Ludo League SA Avatar' },
  { amount: 500, perk: 'VIP Tournament Entry & Gift' },
];

export const CommunityFund: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(20);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'eft' | 'payfast' | 'investment' | 'sponsorship' | 'agent'>('payfast');
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    businessName: '',
    province: 'Gauteng',
    message: '', 
    proofOfPayment: null as File | null 
  });

  const currentFunds = 12500;
  const goalFunds = 1000000;
  const progressPercentage = Math.min((currentFunds / goalFunds) * 100, 100);

  const getFinalAmount = (): number => {
    if (paymentMethod === 'agent') return 1500;
    if (customAmount !== '') return parseFloat(customAmount) || 20;
    return selectedAmount || 20;
  };

  const finalAmount = getFinalAmount();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      if (db) {
        const registrationType = paymentMethod === 'agent' ? 'agent' : (paymentMethod === 'sponsorship' ? 'sponsorship' : (paymentMethod === 'investment' ? 'investment' : 'donation'));
        const eventTitle = paymentMethod === 'agent' ? 'Ludo Academy Agent Registration' : (paymentMethod === 'sponsorship' ? 'Corporate Sponsorship Inquiry' : (paymentMethod === 'investment' ? 'Investment Callback Request' : 'League Community Fund Donation'));

        // Save to Firestore
        await addDoc(collection(db, 'event_registrations'), {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone || 'N/A',
          businessName: formData.businessName || 'N/A',
          province: formData.province,
          paymentMethod,
          status: 'pending_verification',
          eventName: eventTitle,
          type: 'contact',
          amount: finalAmount,
          message: formData.message || 'N/A',
          timestamp: serverTimestamp(),
          createdAt: serverTimestamp(),
        });

        // Trigger Auto-Email Acknowledgment
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `Application Logged: ${eventTitle}`,
            html: `<div style="font-family: Arial, sans-serif; padding:20px; background:#0f172a; color:#fff;">
              <h2 style="color:#d4af37;">Application Received!</h2>
              <p>Dear ${formData.fullName},</p>
              <p>Your <b>${eventTitle}</b> request has been received. Our administrative team will review your application shortly.</p>
              <p>Best regards,<br>The Ludo League SA Team</p>
            </div>`
          },
          createdAt: serverTimestamp()
        });
      }
      setStep(3);
    } catch (error) {
      console.error("Donation/Agent submission failed:", error);
      alert("Submission failed. Please check your connection and try again.");
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
          
          {/* Toggle Menu Including New Ludo Agents Tab */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
            <button type="button" onClick={() => { setPaymentMethod('payfast'); setSelectedAmount(20); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg transition-all ${paymentMethod === 'payfast' || paymentMethod === 'eft' ? 'bg-[#0EA5E9] text-white' : 'text-slate-400 hover:text-slate-600'}`}>Direct Supporter</button>
            <button type="button" onClick={() => { setPaymentMethod('investment'); setSelectedAmount(null); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg transition-all ${paymentMethod === 'investment' ? 'bg-[#0EA5E9] text-white' : 'text-slate-400 hover:text-slate-600'}`}>Invest / Callback</button>
            <button type="button" onClick={() => { setPaymentMethod('sponsorship'); setSelectedAmount(null); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg transition-all ${paymentMethod === 'sponsorship' ? 'bg-[#0EA5E9] text-white' : 'text-slate-400 hover:text-slate-600'}`}>Sponsor / Callback</button>
            <button type="button" onClick={() => { setPaymentMethod('agent'); setSelectedAmount(1500); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg transition-all ${paymentMethod === 'agent' ? 'bg-[#D32F2F] text-white' : 'text-slate-400 hover:text-slate-600'}`}>Ludo Agents</button>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {paymentMethod === 'agent' ? (
                <div className="bg-slate-50 p-5 border-l-4 border-[#D32F2F] text-xs text-slate-600 space-y-2 rounded-r-xl">
                  <p className="font-bold text-slate-800 uppercase text-sm">Official Ludo Agent Registration</p>
                  <p>Register as an Official Player Agent for Ludo South Africa. Fee: <strong className="text-[#D32F2F]">R1,500.00</strong> <span className="line-through text-slate-400">R2,500.00</span> (Founding Rate).</p>
                </div>
              ) : (paymentMethod === 'payfast' || paymentMethod === 'eft') ? (
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
                      <button key={tier.amount} type="button" onClick={() => { setSelectedAmount(tier.amount); setCustomAmount(''); }} className={`p-6 rounded-xl border-2 text-left transition-all ${selectedAmount === tier.amount && customAmount === '' ? 'border-[#0EA5E9] bg-sky-50 shadow-md' : 'border-slate-200 hover:border-[#0EA5E9]'}`}>
                        <div className="font-display font-black italic text-2xl text-[#0F172A] mb-2">R{tier.amount}</div>
                        <div className="text-xs text-slate-600 font-bold leading-relaxed">{tier.perk}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="space-y-4 pt-6 border-t">
                <input required type="text" placeholder="Your Full Name *" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                <input required type="email" placeholder="Your Email *" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input required type="tel" placeholder="Your Phone Number *" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                {paymentMethod === 'agent' && (
                  <input type="text" placeholder="Business / Agency Name *" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none" value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} />
                )}
                <textarea placeholder="Message / Specific Queries (Optional)" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none h-20" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
              </div>

              <button disabled={!formData.fullName || !formData.email || !formData.phone} onClick={() => handleSubmit()} className="w-full py-4 bg-[#D32F2F] hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-md">
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={18} /> : (paymentMethod === 'agent' ? 'Submit Agent Registration (R1,500)' : 'Submit Request')}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500"><CheckCircle2 size={48} /></div>
              <h3 className="text-2xl font-display font-black italic uppercase text-slate-950">Registration Complete</h3>
              <p className="text-slate-600 leading-relaxed font-light">Thank you for submitting your details. An automatic email acknowledgment has been sent to your email address and your registration has been logged for admin review.</p>
              <button onClick={() => setStep(1)} className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl">Back to Form</button>
            </div>
          )}
        </motion.div>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500 uppercase tracking-widest font-bold">
          <Lock size={14} className="text-[#0EA5E9]" /> Secure local payments via Payfast / EFT
        </div>
      </div>
    </section>
  );
};
