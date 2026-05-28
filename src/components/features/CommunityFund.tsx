import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { RegistrationData } from '../types';
import { Loader2, CheckCircle2, UploadCloud, ArrowRight, CreditCard, Landmark } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/ui/SharedUI';

export const Tournaments = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'eft' | 'payfast'>('payfast');
  const [formData, setFormData] = useState<RegistrationData & { proofOfPayment: File | null }>({
    fullName: '',
    email: '',
    phoneNumber: '',
    region: 'Soweto',
    proofOfPayment: null
  });

  const entryFee = 200.00;

  const compressAndGetBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
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

  const triggerPayfastRedirect = () => {
    const form = document.createElement('form');
    form.action = 'https://www.payfast.co.za/eng/process';
    form.method = 'POST';

    const fields = {
      merchant_id: '35471207',
      merchant_key: 'q9qkx9sqx9l3m',
      return_url: 'https://ludoleague.co.za/?page=tournaments&status=success',
      cancel_url: 'https://ludoleague.co.za/?page=tournaments&status=cancel',
      name_first: formData.fullName.split(' ')[0] || '',
      name_last: formData.fullName.split(' ').slice(1).join(' ') || '',
      email_address: formData.email,
      m_payment_id: `tour_${Date.now()}`,
      amount: entryFee.toFixed(2),
      item_name: 'Tournament Entry Registration',
      custom_str1: 'tournament_registration'
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = key; input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (paymentMethod === 'eft' && formData.proofOfPayment) {
        popUrl = await compressAndGetBase64(formData.proofOfPayment);
      }
      const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      await setDoc(doc(db, 'event_registrations', registrationId), {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        region: formData.region,
        paymentMethod,
        proofOfPaymentUrl: popUrl,
        status: paymentMethod === 'payfast' ? 'pending_online_payment' : 'pending_verification',
        eventName: 'Tournament Entry Registration',
        eventDate: '2026 season live',
        timestamp: serverTimestamp()
      });

      if (paymentMethod === 'payfast') {
        triggerPayfastRedirect();
      } else {
        setStep(3);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed entirely. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="tournaments" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A]">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-7xl mx-auto">
        <SectionHeader tag="Compete" title="Registration" colorClass="text-white" />

        <div className="max-w-2xl mx-auto bg-slate-900 text-white border border-slate-800 p-8 rounded-3xl shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase text-[#FFC107] tracking-widest block mb-1">Archived Cup</span>
            <h4 className="text-2xl font-display font-black italic">AFCON 2023 Details</h4>
            <p className="text-slate-400 text-sm mt-1">Review brackets, standings, and gallery from Africa's Cup of Nations.</p>
          </div>
          <a href="?page=afcontournament" className="btn-action bg-[#0EA5E9] text-white hover:bg-white hover:text-[#0F172A] shrink-0 rounded-xl px-6 py-3 font-bold flex items-center gap-2">
            View Details <ArrowRight size={16} />
          </a>
        </div>

        <div className="max-w-2xl mx-auto bg-white border border-white/20 p-8 rounded-2xl shadow-xl">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
              <h3 className="text-2xl font-display font-black italic uppercase">Step 1: Your Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="Full Name" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                <input required type="email" placeholder="Email" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input required type="tel" placeholder="Phone" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
                <select className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9] appearance-none" value={formData.region} onChange={e => setFormData({ ...formData, region: e.target.value as any })}>
                  <option value="Alexandra">Alexandra</option>
                  <option value="Soweto">Soweto</option>
                  <option value="Mamelodi">Mamelodi</option>
                </select>
              </div>
              <button type="submit" className="w-full py-4 bg-[#D32F2F] text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-md">Next: Payment</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-6">
              <h3 className="text-2xl font-display font-black italic uppercase">Step 2: Choose Payment</h3>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setPaymentMethod('payfast')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold transition-all ${paymentMethod === 'payfast' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><CreditCard size={20} className="text-[#0EA5E9]" />Payfast Online</button>
                <button type="button" onClick={() => setPaymentMethod('eft')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold transition-all ${paymentMethod === 'eft' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><Landmark size={20} className="text-[#0EA5E9]" />Manual EFT</button>
              </div>

              {paymentMethod === 'eft' ? (
                <div className="space-y-6">
                  <div className="bg-[#F8F9FA] p-5 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-2">
                    <p><b>Bank Name:</b> Nedbank</p>
                    <p><b>Account Holder:</b> THE LUDO LEAGUE SOUTH AFRICA (PTY) LTD</p>
                    <p><b>Account Number:</b> 1120230365</p>
                    <p><b>Branch Code:</b> 198765</p>
                    <p><b>Account Type:</b> Current Account</p>
                    <p><b>Required Entry Fee:</b> R{entryFee.toFixed(2)}</p>
                    <p><b>Reference:</b> TOUR-{formData.fullName.replace(/\s+/g, '')}</p>
                  </div>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer relative bg-slate-50 hover:bg-slate-100 transition-colors">
                    <UploadCloud size={32} className="text-slate-400 mb-2" />
                    <span className="text-xs font-black text-accent-teal">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                    <input required={paymentMethod === 'eft'} type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({ ...formData, proofOfPayment: e.target.files ? e.target.files[0] : null })} />
                  </div>
                </div>
              ) : (
                <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-slate-200 text-center space-y-4 text-sm text-slate-700">
                  <p className="text-base text-[#001F3F]"><b>Total Entry Fee:</b> <span className="text-[#0EA5E9] font-black">R{entryFee.toFixed(2)}</span></p>
                  <div className="border-t border-slate-200 pt-3 space-y-2.5">
                    <p className="font-bold text-slate-700 uppercase tracking-wider text-xs">Accepted Payment Methods:</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 bg-white p-3.5 rounded-xl border border-slate-100">
                      {/* Visa */}
                      <svg className="h-4 w-10 text-[#1A1F71]" viewBox="0 0 24 15" fill="currentColor"><path d="M10.15 0l-2.4 14.3h2.36l2.4-14.3H10.15zm8.13 0l-2.2 10.3-.9-4.7c-.2-.9-.9-1.6-1.8-1.6H9.41l-.14.6 2.15.5c.6.1.9.4 1 .8l2.1 8.7h2.47L21 0h-2.72zm-12 0L3.8 9.5 3.5 8C2.9 6 1 3.8 0 3.3v11H2.47L6.47 0H6.28z" /></svg>
                      {/* Mastercard */}
                      <svg className="h-5 w-8" viewBox="0 0 24 15" fill="currentColor"><circle cx="7" cy="7.5" r="7" fill="#EB001B" /><circle cx="15" cy="7.5" r="7" fill="#F79E1B" opacity="0.8" /></svg>
                      {/* Maestro */}
                      <svg className="h-5 w-8" viewBox="0 0 24 15" fill="currentColor"><circle cx="7" cy="7.5" r="7" fill="#0064B3" /><circle cx="15" cy="7.5" r="7" fill="#EB001B" opacity="0.8" /></svg>
                      {/* Instant EFT */}
                      <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M12 10v11M12 3L3 10h18L12 3z" /></svg>
                      {/* Capitec Pay */}
                      <svg className="h-4 w-12" viewBox="0 0 40 15"><rect x="2" y="2" width="12" height="10" fill="#003366" rx="1" /><rect x="18" y="2" width="12" height="10" fill="#D32F2F" rx="1" /></svg>
                      {/* SnapScan */}
                      <svg className="h-5 w-5 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9V5a2 2 0 012-2h4M21 9V5a2 2 0 00-2-2h-4M3 15v4a2 2 0 002 2h4M21 15v4a2 2 0 01-2 2h-4M12 12h.01" /></svg>
                      {/* Zapper */}
                      <svg className="h-5 w-5 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-2 4L9 17h8m0-10H7l8 10H7" /></svg>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(1)} className="w-1/2 py-4 bg-slate-100 rounded-xl text-slate-700 font-bold hover:bg-slate-200 transition-colors">Back</button>
                <button type="submit" disabled={isSubmitting || (paymentMethod === 'eft' && !formData.proofOfPayment)} className="w-1/2 py-4 bg-[#D32F2F] hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl disabled:opacity-50 transition-all flex items-center justify-center shadow-lg">
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : paymentMethod === 'payfast' ? 'Pay Now' : 'Complete Registration'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500"><CheckCircle2 size={48} /></div>
              <h3 className="text-2xl font-display font-black italic uppercase text-slate-955">ORDER PLACED pending verification</h3>
              <p className="text-slate-600 leading-relaxed">Thank you for joining the 2026 Tournament Circuit! Your registration status is pending bank payment verification.</p>
              <button onClick={() => setStep(1)} className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all">Back to start</button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
