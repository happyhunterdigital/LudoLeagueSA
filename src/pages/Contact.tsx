import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <section id="contact" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A]">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeader tag="Communication" title="Get In Touch" colorClass="text-white" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-black italic uppercase">Reach Us Directly</h3>
            <p className="text-slate-700">Our administrative committee is ready to assist your team with registration or media inquiries.</p>
            <div className="space-y-4 pt-4">
              <p className="flex items-center gap-3 font-bold"><Mail className="text-white" /> info@ludoleague.co.za</p>
              <p className="flex items-center gap-3 font-bold"><Phone className="text-white" /> 072 557 8097</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
            {success ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500"><CheckCircle2 size={36} /></div>
                <h4 className="text-xl font-bold">Message Sent!</h4>
                <p className="text-slate-600">Thanks! We will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Your Name" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" />
                <input required type="email" placeholder="Your Email" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" />
                <textarea required rows={4} placeholder="Your Message" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]"></textarea>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#D32F2F] hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
