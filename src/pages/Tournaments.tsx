import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { RegistrationData } from '../types';
import { Loader2, CheckCircle2, UploadCloud } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/ui/SharedUI';

export const Tournaments = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegistrationData & { proofOfPayment: File | null }>({ 
    fullName: '', 
    email: '', 
    phoneNumber: '', 
    region: 'Soweto',
    proofOfPayment: null
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (formData.proofOfPayment && storage) {
        const fileRef = ref(storage, `tournament_pops/${Date.now()}_${formData.proofOfPayment.name}`);
        const uploadResult = await uploadBytes(fileRef, formData.proofOfPayment);
        popUrl = await getDownloadURL(uploadResult.ref);
      }

      if (db) {
        const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        await setDoc(doc(db, 'event_registrations', registrationId), {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          region: formData.region,
          paymentMethod: 'eft',
          proofOfPaymentUrl: popUrl,
          status: 'pending_verification',
          eventName: 'Tournament Entry Registration',
          eventDate: '2026 season live',
          eventLink: 'https://ludoleague.co.za/#home',
          timestamp: serverTimestamp()
        });
      }
      setStep(3);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="tournaments" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A]">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-7xl mx-auto">
        <SectionHeader tag="Compete" title="Registration" colorClass="text-white" />

        <div className="max-w-2xl mx-auto bg-white border border-white/20 p-8 rounded-2xl shadow-xl">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
              <h3 className="text-2xl font-display font-black italic uppercase">Step 1: Your Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="Full Name" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                <input required type="email" placeholder="Email" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <input required type="tel" placeholder="Phone" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
                <select className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9] appearance-none" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value as any})}>
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
              <h3 className="text-2xl font-display font-black italic uppercase">Step 2: Entrance Fee</h3>
              <div className="bg-[#F8F9FA] p-5 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-2">
                <p><b>Bank Name:</b> Nedbank</p>
                <p><b>Account Holder:</b> THE LUDO LEAGUE SOUTH AFRICA (PTY) LTD</p>
                <p><b>Account Number:</b> 1120230365</p>
                <p><b>Branch Code:</b> 198765</p>
                <p><b>Account Type:</b> Current Account</p>
                <p><b>Required Entry Fee:</b> R100.00</p>
                <p><b>Reference:</b> TOUR-{formData.fullName.replace(/\s+/g, '')}</p>
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer relative bg-slate-50 hover:bg-slate-100 transition-colors">
                <UploadCloud size={32} className="text-slate-400 mb-2" />
                <span className="text-xs font-black text-accent-teal">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                <input required type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({...formData, proofOfPayment: e.target.files ? e.target.files[0] : null})} />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(1)} className="w-1/2 py-4 bg-slate-100 rounded-xl text-slate-700 font-bold hover:bg-slate-200 transition-colors">Back</button>
                <button type="submit" disabled={isSubmitting || !formData.proofOfPayment} className="w-1/2 py-4 bg-[#D32F2F] text-white font-black uppercase tracking-widest rounded-xl disabled:opacity-50 transition-all flex items-center justify-center">
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Complete Registration'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500"><CheckCircle2 size={48} /></div>
              <h3 className="text-2xl font-display font-black italic uppercase text-slate-900">Registration Complete!</h3>
              <p className="text-slate-600 leading-relaxed">Thank you for joining the 2026 Tournament Circuit! Your registration status is pending bank payment verification.</p>
              <button onClick={() => setStep(1)} className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all">Back to start</button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
