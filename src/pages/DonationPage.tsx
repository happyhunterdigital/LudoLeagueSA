import React, { useState, useRef } from 'react';
import { Loader2, CheckCircle2, UploadCloud, CreditCard, Landmark, Shield } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { DonationHero } from '../components/features/DonationHero';
import { DonationNarrative } from '../components/features/DonationNarrative';

interface FundTier { amount: number; perk: string; }
const fundTiers: FundTier[] = [
  { amount: 50, perk: 'Supporter Profile Badge' },
  { amount: 200, perk: 'Exclusive Player Avatar' },
  { amount: 500, perk: 'Complimentary Ludo Leauge Gift' },
];

export const DonationPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'payfast' | 'eft' | 'investment' | 'sponsorship' | 'agent'>('payfast');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', businessName: '', message: '', proofOfPayment: null as File | null });

  const formRef = useRef<HTMLDivElement>(null);
  const currentFunds = 12500;
  const goalFunds = 1000000;
  const progressPercentage = Math.min((currentFunds / goalFunds) * 100, 100);

  const getFinalAmount = () => {
    if (paymentMethod === 'agent') return 1500;
    return customAmount !== '' ? parseFloat(customAmount) || 50 : selectedAmount || 50;
  };
  const finalAmount = getFinalAmount();

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      item_name: paymentMethod === 'agent' ? 'Ludo Agent Official Registration' : 'League Crowdfunding Contribution',
      custom_str1: paymentMethod === 'agent' ? 'agent_registration' : 'crowdfunding_donation'
    };
    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement('input'); input.type = 'hidden'; input.name = k; input.value = v;
      form.appendChild(input);
    });
    document.body.appendChild(form); form.submit();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const isCallback = paymentMethod === 'investment' || paymentMethod === 'sponsorship';
    if (!isCallback && paymentMethod !== 'agent' && finalAmount < 20) { alert("Contributions must start from as little as R20.00."); return; }
    
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (paymentMethod === 'eft' && formData.proofOfPayment) {
        popUrl = await compressAndGetBase64(formData.proofOfPayment);
      }
      if (db) {
        const eventTitle = paymentMethod === 'agent' ? 'Ludo Academy Agent Registration' : (paymentMethod === 'sponsorship' ? 'Corporate Sponsorship Inquiry' : (paymentMethod === 'investment' ? 'Investment Callback Request' : 'Crowdfunding Narrative 2026'));
        await addDoc(collection(db, 'event_registrations'), {
          fullName: formData.fullName, email: formData.email, phone: formData.phone || 'N/A',
          businessName: formData.businessName || 'N/A',
          paymentMethod, proofOfPaymentUrl: popUrl, amount: isCallback ? 0 : finalAmount,
          message: formData.message || 'N/A',
          status: isCallback ? 'pending_callback' : paymentMethod === 'payfast' ? 'pending_online_payment' : 'pending_verification',
          eventName: eventTitle,
          type: paymentMethod === 'sponsorship' ? 'sponsorship' : (paymentMethod === 'investment' ? 'investment' : 'donation'),
          eventDate: new Date().toLocaleDateString(), timestamp: serverTimestamp()
        });

        // Trigger Auto-Email Acknowledgment
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `Application Logged: ${eventTitle}`,
            html: `<div style="font-family: sans-serif; padding:20px; background:#0f172a; color:#fff;">
              <h2 style="color:#FFD700;">Registration Acknowledged!</h2>
              <p>Dear ${formData.fullName},</p>
              <p>Your registration for <b>${eventTitle}</b> has been received and logged for administration review.</p>
              <p>Best regards,<br>The Ludo League SA Team</p>
            </div>`
          },
          createdAt: serverTimestamp()
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
    <div className="min-h-screen w-full bg-neutral-950 text-white flex flex-col justify-start">
      <DonationHero 
        title={<>THE FUTURE OF LUDO LEAGUE IS IN <span className="text-[#FFE600]">OUR HANDS</span></>}
        subtitle="Every game played, every friendship formed, and every opportunity created through Ludo has been made possible by our community."
        stats={[
          { value: "Opportunities", label: "For young people" },
          { value: "Leagues", label: "Grow communities" },
          { value: "Platform", label: "To learn & compete" }
        ]}
        actions={[
          { text: "Support the Campaign", onClick: handleScrollToForm, isPrimary: true }, 
          { text: "Read Our Story", onClick: () => window.scrollBy({ top: 600, behavior: 'smooth' }), isPrimary: false }
        ]} 
      />

      <DonationNarrative onScrollToForm={handleScrollToForm} />

      {/* Multi-Step Contribution Form Ref Anchor */}
      <div ref={formRef} className="w-full max-w-3xl mx-auto bg-black border border-neutral-900 p-8 md:p-12 rounded-3xl shadow-2xl relative mb-24">
        {step === 1 && (
          <div className="space-y-6">
            
            {/* Toggle Line With Surgically Added Ludo Agents Tab */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-neutral-900 pb-4">
              <button type="button" onClick={() => { setPaymentMethod('payfast'); setSelectedAmount(50); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg ${paymentMethod === 'payfast' || paymentMethod === 'eft' ? 'bg-[#FFD700] text-black' : 'text-neutral-500 hover:text-white'}`}>Direct Supporter</button>
              <button type="button" onClick={() => { setPaymentMethod('investment'); setSelectedAmount(null); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg ${paymentMethod === 'investment' ? 'bg-[#FFD700] text-black' : 'text-neutral-500 hover:text-white'}`}>Invest / Callback</button>
              <button type="button" onClick={() => { setPaymentMethod('sponsorship'); setSelectedAmount(null); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg ${paymentMethod === 'sponsorship' ? 'bg-[#FFD700] text-black' : 'text-neutral-500 hover:text-white'}`}>Sponsor / Callback</button>
              <button type="button" onClick={() => { setPaymentMethod('agent'); setSelectedAmount(1500); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg ${paymentMethod === 'agent' ? 'bg-[#D32F2F] text-white' : 'text-neutral-500 hover:text-white'}`}>Ludo Agents</button>
            </div>

            {paymentMethod === 'agent' ? (
              <div className="bg-neutral-900/60 p-5 border-l-4 border-[#D32F2F] text-xs text-neutral-300 space-y-2 rounded-r-xl">
                <p className="font-bold text-white uppercase text-sm flex items-center gap-2"><Shield size={16} className="text-[#D32F2F]" /> Ludo Agent Official Registration</p>
                <p>Register as an Official Player Agent for Ludo South Africa. Fee: <strong className="text-[#FFE600]">R1,500.00</strong> <span className="line-through text-neutral-500">R2,500.00</span> (Founding Rate).</p>
              </div>
            ) : paymentMethod !== 'investment' && paymentMethod !== 'sponsorship' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-xs uppercase tracking-widest font-bold text-neutral-500">
                    <span>Raised: R{currentFunds.toLocaleString()}</span>
                    <span>Goal: R{goalFunds.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-neutral-900 rounded-full h-3 overflow-hidden border border-neutral-800">
                    <div className="bg-[#FFD700] h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>

                {finalAmount >= 500 && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-[#00c9a7] text-xs font-black uppercase tracking-widest rounded-xl text-center animate-pulse">🎉 Qualified for complimentary Ludo Leauge Gift!</div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  {fundTiers.map((tier) => (
                    <button key={tier.amount} type="button" onClick={() => { setSelectedAmount(tier.amount); setCustomAmount(''); }} className={`p-4 rounded-xl border-2 text-center transition-all ${selectedAmount === tier.amount && customAmount === '' ? 'border-[#FFD700] bg-neutral-900' : 'border-neutral-900 hover:border-neutral-700'}`}>
                      <div className="font-display font-black text-xl text-white">R{tier.amount}</div>
                      <div className="text-[7px] text-neutral-500 font-bold uppercase tracking-wider mt-1">{tier.perk}</div>
                    </button>
                  ))}
                </div>

                <input id="donate-custom-amount" name="customAmount" type="number" min="20" placeholder="Custom Supporter Amount (Minimum R20.00)" value={customAmount} onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }} className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-[#FFD700] font-bold outline-none focus:border-[#FFD700]" />
              </div>
            ) : paymentMethod === 'investment' ? (
              <div className="bg-neutral-900/40 p-5 border-l-4 border-[#FFD700] text-xs text-neutral-400 space-y-2 rounded-r-xl">
                <p className="font-bold text-white uppercase text-sm">Corporate Investment Callback Request</p>
                <p>Leave your coordinates below. Our executive committee will promptly schedule an offline phone consultation to discuss local franchise club ownership (RTP modeling), corporate CSI sponsorships, and league shares.</p>
              </div>
            ) : (
              <div className="bg-neutral-900/40 p-5 border-l-4 border-[#FFD700] text-xs text-neutral-400 space-y-2 rounded-r-xl">
                <p className="font-bold text-white uppercase text-sm">Corporate Sponsorship Inquiry</p>
                <p>Leave your coordinates below. An administrative representative will promptly contact you to coordinate tournament media visibility, brand integration, and CSI sponsorship packages.</p>
              </div>
            )}

            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <input id="donate-fullname" name="fullName" required type="text" placeholder="Full Name" autoComplete="name" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700]" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
              <input id="donate-email" name="email" required type="email" placeholder="Email Address" autoComplete="email" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700]" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input id="donate-phone" name="phone" required={paymentMethod === 'investment' || paymentMethod === 'sponsorship' || paymentMethod === 'agent'} type="tel" placeholder="Phone Number" autoComplete="tel" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700]" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              {paymentMethod === 'agent' && (
                <input type="text" placeholder="Business / Agency Name *" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700]" value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} />
              )}
              {(paymentMethod === 'investment' || paymentMethod === 'sponsorship' || paymentMethod === 'agent') && (
                <textarea id="donate-message" name="message" placeholder="Message / Specific Queries (Optional)" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700] h-20" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
              )}
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => { window.location.href = window.location.origin; }} className="w-1/2 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black uppercase tracking-widest rounded-xl transition-all text-xs cursor-pointer">Cancel</button>
              <button disabled={(!formData.fullName || !formData.email) || ((paymentMethod === 'investment' || paymentMethod === 'sponsorship' || paymentMethod === 'agent') && !formData.phone)} onClick={() => (paymentMethod === 'investment' || paymentMethod === 'sponsorship' || paymentMethod === 'agent') ? handleSubmit() : setStep(2)} className="w-1/2 py-4 bg-[#D32F2F] hover:bg-[#FFD700] text-white hover:text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-lg text-xs disabled:opacity-50 cursor-pointer">
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={18} /> : (paymentMethod === 'agent' ? 'Submit Ludo Agent Registration (R1,500)' : (paymentMethod === 'investment' || paymentMethod === 'sponsorship' ? 'Request Callback' : 'Continue to Transfer'))}
              </button>
            </div>
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
                <div className="border-2 border-dashed border-neutral-800 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer relative bg-neutral-900/20 hover:bg-neutral-900/40">
                  <UploadCloud size={24} className="text-neutral-500 mb-1" />
                  <span className="text-[10px] font-black text-[#0ea5e9] text-center truncate max-w-[200px]">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                  <input id="donate-proof" name="proofOfPayment" required={paymentMethod === 'eft'} type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({ ...formData, proofOfPayment: e.target.files ? e.target.files[0] : null })} />
                </div>
              </div>
            ) : (
              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 text-center space-y-4 text-xs text-neutral-400">
                <p className="text-sm text-white"><b>Total Contribution:</b> <span className="text-[#FFD700] font-black">R{finalAmount.toLocaleString()}</span></p>
                <div className="border-t border-neutral-900 pt-3 text-[10px] text-neutral-500">
                  <p className="font-bold text-neutral-400 uppercase tracking-wider mb-2">Accepted Payment Methods:</p>
                  <p>Visa - Mastercard - Maestro - Instant EFT - Capitec Pay - SnapScan - Zapper</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="w-1/2 py-4 bg-neutral-900 text-white font-bold rounded-xl">Back</button>
              <button type="submit" disabled={isSubmitting || (paymentMethod === 'eft' && !formData.proofOfPayment)} className="w-1/2 py-4 bg-[#D32F2F] hover:bg-[#FFD700] text-white hover:text-black font-black uppercase tracking-widest rounded-xl disabled:opacity-50 flex items-center justify-center shadow-lg">
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : paymentMethod === 'payfast' ? 'Pay Now' : 'Complete Registration'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 py-6">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-[#00c9a7]"><CheckCircle2 size={48} /></div>
            <h3 className="font-display font-black tracking-thonik-tight text-3xl uppercase text-white">REQUEST LOGGED</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Thank you for registering with Ludo League South Africa! Your registration has been logged and a confirmation email has been sent to {formData.email}.
            </p>
            <button onClick={() => { setStep(1); setSelectedAmount(50); setCustomAmount(''); setPaymentMethod('payfast'); setFormData({ fullName: '', email: '', phone: '', businessName: '', message: '', proofOfPayment: null }); }} className="w-full py-4 bg-neutral-900 hover:bg-[#FFD700] text-white hover:text-black font-black uppercase tracking-widest rounded-xl transition-all">Close Window</button>
          </div>
        )}
      </div>
    </div>
  );
};
