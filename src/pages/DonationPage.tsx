import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Loader2, CheckCircle2, UploadCloud, CreditCard, Landmark, Gift, Users, Award, BookOpen, MapPin, Heart } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';
import { db } from '../config/firebase';
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

export const DonationPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(20);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'eft' | 'payfast' | 'investment'>('payfast');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '', proofOfPayment: null as File | null });

  const getFinalAmount = (): number => {
    if (customAmount !== '') return parseFloat(customAmount) || 20;
    return selectedAmount || 20;
  };

  const finalAmount = getFinalAmount();

  const compressAndGetBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width; let height = img.height;
          const MAX_WIDTH = 1000; const MAX_HEIGHT = 1000;
          if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } }
          else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) { ctx.drawImage(img, 0, 0, width, height); resolve(canvas.toDataURL('image/jpeg', 0.6)); }
          else { resolve(event.target?.result as string); }
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleCancelTransaction = () => {
    setStep(1);
    setFormData({ fullName: '', email: '', phone: '', message: '', proofOfPayment: null });
  };

  const triggerPayfastRedirect = () => {
    const form = document.createElement('form');
    form.action = 'https://www.payfast.co.za/eng/process';
    form.method = 'POST';
    const fields = {
      merchant_id: '35471207', merchant_key: 'q9qkx9sqx9l3m',
      return_url: 'https://ludoleague.co.za/?page=donate&status=success',
      cancel_url: 'https://ludoleague.co.za/?page=donate&status=cancel',
      name_first: formData.fullName.split(' ')[0] || '',
      name_last: formData.fullName.split(' ').slice(1).join(' ') || '',
      email_address: formData.email,
      m_payment_id: `don_${Date.now()}`,
      amount: finalAmount.toFixed(2),
      item_name: 'League Community Fund Donation',
      custom_str1: 'community_donation'
    };
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = key; input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod !== 'investment' && finalAmount < 20) {
      alert("Donations must start from as little as R20. Please adjust your amount.");
      return;
    }
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (paymentMethod === 'eft' && formData.proofOfPayment) {
        popUrl = await compressAndGetBase64(formData.proofOfPayment);
      }
      if (db) {
        await addDoc(collection(db, 'event_registrations'), {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone || 'N/A',
          paymentMethod,
          proofOfPaymentUrl: popUrl,
          status: paymentMethod === 'payfast' ? 'pending_online_payment' : paymentMethod === 'investment' ? 'pending_callback' : 'pending_verification',
          eventName: paymentMethod === 'investment' ? 'Investment Callback Request' : 'League Community Fund Donation',
          eventDate: new Date().toLocaleDateString(),
          eventLink: 'N/A',
          amount: paymentMethod === 'investment' ? 0 : finalAmount,
          message: formData.message || 'N/A',
          timestamp: serverTimestamp(),
        });
      }
      if (paymentMethod === 'payfast') {
        triggerPayfastRedirect();
      } else {
        setStep(3);
      }
    } catch (error) {
      console.error("Donation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#0F172A] text-white py-24 px-4 md:px-10">
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6 text-left">
            <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-widest rounded-xl">Back the Movement</span>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-none uppercase italic">Secure a <br /><span className="text-[#0EA5E9]">Township Legacy</span></h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">By contributing to the Ludo League South Africa, you are directly investing in job creation for local carpenters, seamstresses, and tournament coordinators. Your support expands the Ludo4Schools curriculum, placing rigid, screen-free strategic play into primary classrooms to sharpen foundational mathematics and build lifelong offline friendships.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: [1, 1.02, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} className="rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50">
            <img src="https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1780434262/Ludo_League_SA_Tokens_x4cu8a.jpg" alt="Live Ludo Tokens" className="w-full h-80 sm:h-[400px] object-cover" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1E293B] border border-slate-800 p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400"><BookOpen size={24} /></div>
            <h3 className="text-lg font-display font-black italic uppercase">Screen-Free Classrooms</h3>
            <p className="text-slate-400 text-xs leading-relaxed">Your funding puts physical boards directly into schools. Ludo4Schools enhances logical reasoning, rapid mental mathematics, and face-to-face classroom teamwork, breaking screen addiction.</p>
          </div>
          <div className="bg-[#1E293B] border border-slate-800 p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400"><Users size={24} /></div>
            <h3 className="text-lg font-display font-black italic uppercase">Township Circular Cash</h3>
            <p className="text-slate-400 text-xs leading-relaxed">We manufacture 100% of our equipment locally. Contributions fund materials, township wood workshops, and apparel tailoring, fostering direct black economic empowerment.</p>
          </div>
          <div className="bg-[#1E293B] border border-slate-800 p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500"><Award size={24} /></div>
            <h3 className="text-lg font-display font-black italic uppercase">Sustaining Local Talent</h3>
            <p className="text-slate-400 text-xs leading-relaxed">We employ township referees, operations managers, and commentators. Your support directly guarantees salaries for local organizers, professionalizing a cultural pastime.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-2xl text-slate-800 max-w-3xl mx-auto">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-3xl font-display font-black italic uppercase text-[#0F172A] text-center border-b pb-4">Contribution Portal</h3>
              <div className="grid grid-cols-3 gap-3">
                <button type="button" onClick={() => { setPaymentMethod('payfast'); setSelectedAmount(20); setCustomAmount(''); }} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${paymentMethod !== 'investment' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><Heart size={20} className="text-rose-500 mb-1" />Direct Supporter</button>
                <button type="button" onClick={() => { setPaymentMethod('payfast'); setSelectedAmount(100); setCustomAmount(''); }} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${selectedAmount === 100 ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><Award size={20} className="text-[#0EA5E9] mb-1" />Sponsor League</button>
                <button type="button" onClick={() => { setPaymentMethod('investment'); setSelectedAmount(null); setCustomAmount(''); }} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${paymentMethod === 'investment' ? 'border-amber-500 bg-amber-50' : 'border-slate-200'}`}><Users size={20} className="text-amber-500 mb-1" />Invest / Callback</button>
              </div>

              {paymentMethod !== 'investment' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {fundTiers.map((tier) => (
                      <button key={tier.amount} type="button" onClick={() => { setSelectedAmount(tier.amount); setCustomAmount(''); }} className={`p-5 rounded-xl border-2 text-left transition-all ${selectedAmount === tier.amount && customAmount === '' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200 hover:border-[#0EA5E9]'}`}>
                        <div className="font-display font-black italic text-2xl text-[#0F172A] mb-1">R{tier.amount}</div>
                        <div className="text-[10px] text-slate-600 font-bold leading-relaxed">{tier.perk}</div>
                      </button>
                    ))}
                  </div>
                  <input type="number" min="20" placeholder="Custom Supporter Amount (Minimum R20)" value={customAmount} onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" />
                </div>
              ) : (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600 leading-relaxed">
                  <p className="font-bold text-slate-800 text-sm">Corporate Investment Callback Request</p>
                  <p>Entrepreneurs and corporate investors can leave their contact details below. Our executive committee will promptly schedule an offline phone consultation to discuss local franchise club ownership (RTP modeling), CSR sponsorships, and league shares.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-200">
                <input required type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                <input required type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                {paymentMethod === 'investment' && (
                  <input required type="tel" placeholder="Phone Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                )}
                <textarea placeholder="Message (Optional)" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9] h-20" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                
                <button type="submit" className="w-full py-4 bg-[#D32F2F] hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-md">{paymentMethod === 'investment' ? 'Request Callback' : 'Continue to Payment'}</button>
              </form>
            </div>
          )}

          {step === 2 && paymentMethod !== 'investment' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-display font-black italic uppercase text-slate-900">Step 2: Payment Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setPaymentMethod('payfast')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold transition-all ${paymentMethod === 'payfast' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><CreditCard size={20} className="text-[#0EA5E9]" />Payfast Online</button>
                <button type="button" onClick={() => setPaymentMethod('eft')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold transition-all ${paymentMethod === 'eft' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><Landmark size={20} className="text-[#0EA5E9]" />Manual EFT</button>
              </div>

              {paymentMethod === 'eft' ? (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-5 rounded-xl border text-sm text-slate-700 space-y-2">
                    <p><b>Bank Name:</b> Nedbank</p>
                    <p><b>Account Holder:</b> THE LUDO LEAGUE SOUTH AFRICA (PTY) LTD</p>
                    <p><b>Account Number:</b> 1120230365</p>
                    <p><b>Branch Code:</b> 198765</p>
                    <p><b>Account Type:</b> Current Account</p>
                    <p><b>Amount:</b> R{finalAmount}</p>
                    <p><b>Reference:</b> DON-{formData.fullName.replace(/\s+/g, '')}</p>
                  </div>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer relative bg-slate-50 hover:bg-slate-100 transition-colors">
                    <UploadCloud size={32} className="text-slate-400 mb-2" />
                    <span className="text-xs font-black text-accent-teal">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                    <input required={paymentMethod === 'eft'} type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({ ...formData, proofOfPayment: e.target.files ? e.target.files[0] : null })} />
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-4 text-sm text-slate-700">
                  <p className="text-base text-[#001F3F]"><b>Total Contribution:</b> <span className="text-[#0EA5E9] font-black">R{finalAmount.toFixed(2)}</span></p>
                  <div className="border-t border-slate-200 pt-3 space-y-2.5">
                    <p className="font-bold text-slate-700 uppercase tracking-wider text-xs">Accepted Payment Methods:</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 bg-white p-3.5 rounded-xl border border-slate-100">
                      <svg className="h-4 w-10 text-[#1A1F71]" viewBox="0 0 24 15" fill="currentColor"><path d="M10.15 0l-2.4 14.3h2.36l2.4-14.3H10.15zm8.13 0l-2.2 10.3-.9-4.7c-.2-.9-.9-1.6-1.8-1.6H9.41l-.14.6 2.15.5c.6.1.9.4 1 .8l2.1 8.7h2.47L21 0h-2.72zm-12 0L3.8 9.5 3.5 8C2.9 6 1 3.8 0 3.3v11H2.47L6.47 0H6.28z" /></svg>
                      <svg className="h-5 w-8" viewBox="0 0 24 15" fill="currentColor"><circle cx="7" cy="7.5" r="7" fill="#EB001B" /><circle cx="15" cy="7.5" r="7" fill="#F79E1B" opacity="0.8" /></svg>
                      <svg className="h-5 w-8" viewBox="0 0 24 15" fill="currentColor"><circle cx="7" cy="7.5" r="7" fill="#0064B3" /><circle cx="15" cy="7.5" r="7" fill="#EB001B" opacity="0.8" /></svg>
                      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M12 10v11M12 3L3 10h18L12 3z" /></svg>
                      <svg className="h-4 w-12" viewBox="0 0 40 15"><rect x="2" y="2" width="12" height="10" fill="#003366" rx="1" /><rect x="18" y="2" width="12" height="10" fill="#D32F2F" rx="1" /></svg>
                      <svg className="h-5 w-5 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9V5a2 2 0 012-2h4M21 9V5a2 2 0 00-2-2h-4M3 15v4a2 2 0 002 2h4M21 15v4a2 2 0 01-2 2h-4M12 12h.01" /></svg>
                      <svg className="h-5 w-5 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-2 4L9 17h8m0-10H7l8 10H7" /></svg>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(1)} className="w-1/2 py-4 bg-slate-100 rounded-xl text-slate-700 font-bold hover:bg-slate-200 transition-colors">Back</button>
                <button type="submit" disabled={isSubmitting || (paymentMethod === 'eft' && !formData.proofOfPayment)} className="w-1/2 py-4 bg-[#D32F2F] hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl disabled:opacity-50 transition-all flex items-center justify-center shadow-lg">
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : paymentMethod === 'payfast' ? 'Pay Now' : 'Complete Donation'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 py-6 text-[#0F172A]">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500"><CheckCircle2 size={48} /></div>
              <h3 className="text-2xl font-display font-black italic uppercase">ORDER PLACED pending verification</h3>
              <p className="text-slate-600 leading-relaxed">{paymentMethod === 'investment' ? 'Thank you! Your callback query has been logged. Our administration team will contact you shortly.' : 'Your generous donation has been initiated! Once we verify your transfer receipt, your supporter status and perks will be unlocked.'}</p>
              <button onClick={() => { setStep(1); setSelectedAmount(20); setCustomAmount(''); }} className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all">Close Window</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
