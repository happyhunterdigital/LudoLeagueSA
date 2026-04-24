import React from 'react';
import { motion } from 'motion/react';
import { RegistrationData } from '../../types';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface RegistrationProps {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  formStatus: 'idle' | 'submitting' | 'success' | 'error';
}

export const TournamentRegistration: React.FC<RegistrationProps> = ({ formData, setFormData, handleRegister, formStatus }) => {
  return (
    <section id="tournaments" className="relative z-10 py-32 px-10">
      <div className="max-w-3xl mx-auto bg-bg-panel border border-teal-500/20 p-10 rounded-2xl shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase italic">Enter the Arena</h2>
          <p className="text-white/60 mt-4">Secure your spot in the upcoming regional qualifiers.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
              <input 
                type="text" 
                required 
                maxLength={100}
                className="w-full bg-bg-deep border border-white/10 rounded-lg p-4 text-white focus:border-accent-teal outline-none transition-colors"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Email</label>
              <input 
                type="email" 
                required 
                maxLength={128}
                className="w-full bg-bg-deep border border-white/10 rounded-lg p-4 text-white focus:border-accent-teal outline-none transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Phone Number</label>
              <input 
                type="tel" 
                required 
                maxLength={20}
                className="w-full bg-bg-deep border border-white/10 rounded-lg p-4 text-white focus:border-accent-teal outline-none transition-colors"
                value={formData.phoneNumber}
                onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Region</label>
              <select 
                className="w-full bg-bg-deep border border-white/10 rounded-lg p-4 text-white focus:border-accent-teal outline-none transition-colors appearance-none"
                value={formData.region}
                onChange={e => setFormData({...formData, region: e.target.value as any})}
              >
                <option value="Alexandra">Alexandra</option>
                <option value="Soweto">Soweto</option>
                <option value="Mamelodi">Mamelodi</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={formStatus === 'submitting'}
            className="w-full mt-8 bg-accent-teal text-bg-deep font-black uppercase tracking-widest py-5 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {formStatus === 'submitting' && <Loader2 className="animate-spin" size={20} />}
            {formStatus === 'success' && <CheckCircle2 size={20} />}
            {formStatus === 'error' && <AlertCircle size={20} />}
            {formStatus === 'idle' ? 'Register Now' : formStatus === 'submitting' ? 'Processing...' : formStatus === 'success' ? 'Registered!' : 'Try Again'}
          </button>
        </form>
      </div>
    </section>
  );
};
