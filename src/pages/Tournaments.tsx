import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { RegistrationData } from '../types';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

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
    <section id="tournaments" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 border-b border-white/10">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-7xl mx-auto">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="tag-status mb-6">Compete</div>
          <h2 className="text-6xl md:text-8xl font-display font-black mb-8 uppercase italic leading-none">Registration</h2>
        </div>

        <div className="max-w-2xl mx-auto theme-card rounded-2xl">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Full Name</label>
                <input type="text" required maxLength={100} className="w-full bg-black/20 border border-white/20 rounded-lg p-3 md:p-4 outline-none focus:border-white transition-colors" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ color: 'var(--text)' }} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Email</label>
                <input type="email" required maxLength={128} className="w-full bg-black/20 border border-white/20 rounded-lg p-3 md:p-4 outline-none focus:border-white transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ color: 'var(--text)' }} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Phone</label>
                <input type="tel" required maxLength={20} className="w-full bg-black/20 border border-white/20 rounded-lg p-3 md:p-4 outline-none focus:border-white transition-colors" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} style={{ color: 'var(--text)' }} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Region</label>
                <select className="w-full bg-black/20 border border-white/20 rounded-lg p-3 md:p-4 outline-none appearance-none focus:border-white transition-colors" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value as any})} style={{ color: 'var(--text)' }}>
                  <option value="Alexandra" style={{ color: '#000' }}>Alexandra</option>
                  <option value="Soweto" style={{ color: '#000' }}>Soweto</option>
                  <option value="Mamelodi" style={{ color: '#000' }}>Mamelodi</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={formStatus === 'submitting'} className="w-full mt-6 btn-action border-none rounded-lg">
              {formStatus === 'submitting' && <Loader2 className="animate-spin" size={20} />}
              {formStatus === 'success' && <CheckCircle2 size={20} />}
              {formStatus === 'error' && <AlertCircle size={20} />}
              {formStatus === 'idle' ? 'Register Now' : formStatus === 'submitting' ? 'Processing' : formStatus === 'success' ? 'Registered!' : 'Try Again'}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
