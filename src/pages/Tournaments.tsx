import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { RegistrationData } from '../types';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';

export const Tournaments = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<RegistrationData>({ fullName: '', email: '', phoneNumber: '', region: 'Soweto' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      await setDoc(doc(db, 'registrations', registrationId), { ...formData, createdAt: serverTimestamp() });
      setFormStatus('success');
      setFormData({ fullName: '', email: '', phoneNumber: '', region: 'Soweto' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error("Registration failed:", error);
      setFormStatus('error');
    }
  };

  return (
    <section className="relative z-10 py-10 md:py-20 px-4 md:px-10 border-t-4 border-ludo-red">
      <SectionHeader tag="Compete" title="Registration" colorClass="text-ludo-red" />
      <div className="max-w-2xl mx-auto bg-bg-panel border border-ludo-red/30 p-6 md:p-10 rounded-2xl shadow-2xl mt-8">
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
              <input type="text" required maxLength={100} className="w-full bg-bg-deep border border-white/10 rounded-lg p-3 md:p-4 text-white focus:border-ludo-red outline-none" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
            </div>
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Email</label>
              <input type="email" required maxLength={128} className="w-full bg-bg-deep border border-white/10 rounded-lg p-3 md:p-4 text-white focus:border-ludo-red outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Phone</label>
              <input type="tel" required maxLength={20} className="w-full bg-bg-deep border border-white/10 rounded-lg p-3 md:p-4 text-white focus:border-ludo-red outline-none" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
            </div>
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Region</label>
              <select className="w-full bg-bg-deep border border-white/10 rounded-lg p-3 md:p-4 text-white focus:border-ludo-red outline-none appearance-none" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value as any})}>
                <option value="Alexandra">Alexandra</option>
                <option value="Soweto">Soweto</option>
                <option value="Mamelodi">Mamelodi</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={formStatus === 'submitting'} className="w-full mt-6 bg-ludo-red text-white font-black uppercase tracking-widest py-4 rounded-lg hover:bg-white hover:text-ludo-red transition-colors flex items-center justify-center gap-3">
            {formStatus === 'submitting' && <Loader2 className="animate-spin" size={20} />}
            {formStatus === 'success' && <CheckCircle2 size={20} />}
            {formStatus === 'error' && <AlertCircle size={20} />}
            {formStatus === 'idle' ? 'Register Now' : formStatus === 'submitting' ? 'Processing' : formStatus === 'success' ? 'Registered!' : 'Try Again'}
          </button>
        </form>
      </div>
    </section>
  );
};
