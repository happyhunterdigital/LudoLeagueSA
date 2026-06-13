import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, UploadCloud, CreditCard, Landmark, Shield, Award, Users, Heart } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FundTier { amount: number; perk: string; }
const fundTiers: FundTier[] = [
  { amount: 50, perk: 'Supporter Badge on Profile' },
  { amount: 200, perk: 'Exclusive Ludo League SA Avatar' },
  { amount: 1000, perk: 'VIP Tournament Entry & Heritage Board' },
];

export const DonationPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'payfast' | 'eft'>('payfast');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', proofOfPayment: null as File | null });

  const getFinalAmount = () => customAmount !== '' ? parseFloat(customAmount) || 50 : selectedAmount || 50;
  const finalAmount = getFinalAmount();

  const compressAndGetBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const r = new FileReader(); r.readAsDataURL(file);
      r.onload = (e) => {
        const img = new Image(); img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height, max = 1000;
          if (w > h) { if (w > max) { h *= max / w; w = max; } }
          else { if (h > max) { w *= max / h; h = max; } }
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) { ctx.drawImage(img, 0, 0, w, h); resolve(canvas.toDataURL('image/jpeg', 0.6)); }
          else { resolve(e.target?.result as string); }
        };
        img.onerror = (err) => reject(err);
      };
      r.onerror = (err) => reject(err);
    });
  };

  const triggerPayfastRedirect = () => {
    const form = document.createElement('form');
    form.action = 'https://www.payfast.co.za/eng/process'; form.method = 'POST';
    const fields = {
      merchant_id: '35471207', merchant_key: 'q9qkx9sqx9l3m',
      return_url: 'https://ludoleague.co.za/?page=donate&status=success',
      cancel_url: 'https://ludoleague.co.za/?page=donate&status=cancel',
      name_first: formData.fullName.split(' ')[0] || '', name_last: formData.fullName.split(' ').slice(1).join(' ') || '',
      email_address: formData.email, m_payment_id: `don_${Date.now()}`, amount: finalAmount.toFixed(2),
      item_name: 'League Crowdfunding Contribution', custom_str1: 'crowdfunding_donation'
    };
    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement('input'); input.type = 'hidden'; input.name = k; input.value = v;
      form.appendChild(input);
    });
    document.body.appendChild(form); form.submit();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount < 20) { alert("Contributions must start from as little as R20."); return; }
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (paymentMethod === 'eft' && formData.proofOfPayment) {
        popUrl = await compressAndGetBase64(formData.proofOfPayment);
      }
      if (db) {
        await addDoc(collection(db, 'event_registrations'), {
          fullName: formData.fullName, email: formData.email, phone: formData.phone || 'N/A',
          paymentMethod, proofOfPaymentUrl: popUrl, amount: finalAmount,
          status: paymentMethod === 'payfast' ? 'pending_online_payment' : 'pending_verification',
          eventName: 'Crowdfunding Narrative 2026', eventDate: new Date().toLocaleDateString(),
          timestamp: serverTimestamp()
        });
      }
      if (paymentMethod === 'payfast') { triggerPayfastRedirect(); }
      else { setStep(3); }
    } catch (err) {
      console.error("Donation failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-neutral-950 text-white py-32 px-6 md:px-12 flex flex-col justify-start select-none font-sans antialiased">
      
      {/* 1. EMOTIONAL PROSPECTUS HERO */}
      <div className="w-full max-w-5xl mx-auto text-center space-y-6 mb-20">
        <span className="font-sans font-black tracking-thonik-wide text-[10px] text-neutral-500 uppercase block">// LUDO CROWDFUNDING NARRATIVE 2026</span>
        <h2 className="font-display font-black tracking-thonik-mega text-4xl sm:text-6xl md:text-8xl uppercase text-white leading-none">
          INVEST IN <span className="text-[#FFD700]">HOPE.</span>
        </h2>
        <p className="font-sans font-light tracking-normal text-lg sm:text-2xl leading-relaxed text-neutral-300 max-w-3xl mx-auto italic">
          "South Africa's youth don't need handouts. They need opportunities. Help us create them, one roll at a time."
        </p>
      </div>

      {/* 2. THE SYSTEM MATRIX INFORMATION GRID */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {[
          { icon: Heart, title: "Donate", desc: "Whether it's R20 or R50,000, you are directly investing in youth empowerment, education, job creation, and national pride." },
          { icon: Shield, title: "Invest", desc: "Competitive Ludo has low barriers to entry, mass participation, and high entertainment. Help us build Africa's premier Ludo sport ecosystem." },
          { icon: Award, title: "Sponsor", desc: "Partner with a movement that is reaching township communities often overlooked by traditional sports and entertainment networks." }
        ].map((item, idx) => (
          <div key={idx} className="border-l-4 border-[#FFD700] bg-neutral-900/60 p-8 rounded-r-2xl space-y-4 hover:border-white transition-colors duration-300">
            <item.icon size={24} className="text-[#FFD700]" />
            <h3 className="font-display font-black tracking-thonik-tight uppercase text-2xl text-white">{item.title}</h3>
            <p className="text-sm font-light text-neutral-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. MULTI-STEP CHECKOUT PORTAL BLOCK */}
      <div className="w-full max-w-3xl mx-auto bg-black border border-neutral-900 p-8 md:p-12 rounded-3xl shadow-2xl relative">
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-neutral-900 pb-4 text-center">
              <h4 className="font-display font-black tracking-thonik-tight text-3xl uppercase text-white">Contribution Portal</h4>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Our Funding Target: R1,000,000.00</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {fundTiers.map((tier) => (
                <button key={tier.amount} type="button" onClick={() => { setSelectedAmount(tier.amount); setCustomAmount(''); }} className={`p-4 rounded-xl border-2 text-center transition-all ${selectedAmount === tier.amount && customAmount === '' ? 'border-[#FFD700] bg-neutral-900' : 'border-neutral-900 hover:border-neutral-700'}`}>
                  <div className="font-display font-black italic text-xl text-white">R{tier.amount}</div>
                  <div className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider mt-1">{tier.perk}</div>
                </button>
              ))}
            </div>

            <input type="number" min="20" placeholder="Custom Supporter Amount (Minimum R20)" value={customAmount} onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }} className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-[#FFD700] font-bold outline-none focus:border-[#FFD700] transition-colors" />

            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <input required type="text" placeholder="Your Full Name" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700]" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
              <input required type="email" placeholder="Your Email Address" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700]" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <button disabled={finalAmount < 20 || !formData.fullName || !formData.email} onClick={() => setStep(2)} className="w-full py-4 bg-[#D32F2F] hover:bg-[#FFD700] text-white hover:text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-lg text-xs disabled:opacity-50">Continue to Transfer</button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="font-display font-black tracking-thonik-tight text-3xl uppercase text-white border-b border-neutral-900 pb-4 text-center">Step 2: Choose Payment</h4>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setPaymentMethod('payfast')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold transition-all ${paymentMethod === 'payfast' ? 'border-[#FFD700] bg-neutral-900' : 'border-neutral-900'}`}><CreditCard size={20} className="text-[#FFD700]" />Payfast Online</button>
              <button type="button" onClick={() => setPaymentMethod('eft')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold transition-all ${paymentMethod === 'eft' ? 'border-[#FFD700] bg-neutral-900' : 'border-neutral-900'}`}><Landmark size={20} className="text-[#FFD700]" />Manual EFT</button>
            </div>

            {paymentMethod === 'eft' ? (
              <div className="space-y-4">
                <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-900 text-xs text-neutral-400 space-y-2">
                  <p><b>Bank Name:</b> Nedbank</p>
                  <p><b>Account Holder:</b> THE LUDO LEAGUE SOUTH AFRICA (PTY) LTD</p>
                  <p><b>Account Number:</b> 1120230365</p>
                  <p><b>Branch Code:</b> 198765 // Current Account</p>
                  <p><b>Reference:</b> DON-{formData.fullName.replace(/\s+/g, '')}</p>
                  <p className="pt-2 border-t border-neutral-900 text-sm text-[#FFD700]"><b>Grand Total:</b> R{finalAmount.toLocaleString()}</p>
                </div>
                <div className="border-2 border-dashed border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer relative bg-neutral-900/20 hover:bg-neutral-900/40 transition-colors">
                  <UploadCloud size={32} className="text-neutral-500 mb-2" />
                  <span className="text-xs font-black text-[#0ea5e9] text-center truncate max-w-[220px]">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                  <input required={paymentMethod === 'eft'} type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({ ...formData, proofOfPayment: e.target.files ? e.target.files[0] : null })} />
                </div>
              </div>
            ) : (
              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 text-center space-y-4 text-xs text-neutral-400">
                <p className="text-base text-white"><b>Total Contribution:</b> <span className="text-[#FFD700] font-black">R{finalAmount.toLocaleString()}</span></p>
                <div className="border-t border-neutral-900 pt-3 text-[10px] text-neutral-500">
                  <p className="font-bold text-neutral-400 uppercase tracking-wider mb-2">Accepted Payment Methods:</p>
                  <p>Visa - Mastercard - Maestro - Instant EFT - Capitec Pay - SnapScan - Zapper</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="w-1/2 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl transition-colors">Back</button>
              <button type="submit" disabled={isSubmitting || (paymentMethod === 'eft' && !formData.proofOfPayment)} className="w-1/2 py-4 bg-[#D32F2F] hover:bg-[#FFD700] text-white hover:text-black font-black uppercase tracking-widest rounded-xl disabled:opacity-50 transition-all flex items-center justify-center shadow-lg">
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : paymentMethod === 'payfast' ? 'Pay Now' : 'Complete Donation'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 py-6">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-[#00c9a7]"><CheckCircle2 size={48} /></div>
            <h3 className="font-display font-black tracking-thonik-tight text-3xl uppercase text-white">ORDER PLACED</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Thank you for backing the Ludo League South Africa! Your generous contribution has been logged. Once we verify your transfer, your supporter status and profile badges will be unlocked.</p>
            <button onClick={() => { setStep(1); setSelectedAmount(50); setCustomAmount(''); setFormData({ fullName: '', email: '', phone: '', proofOfPayment: null }); }} className="w-full py-4 bg-neutral-900 hover:bg-[#FFD700] text-white hover:text-black font-black uppercase tracking-widest rounded-xl transition-all">Close Window</button>
          </div>
        )}
      </div>

    </section>
  );
};
