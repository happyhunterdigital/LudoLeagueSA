import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (db) {
        await addDoc(collection(db, 'event_registrations'), {
          fullName: formData.name,
          email: formData.email,
          message: formData.message,
          type: 'contact',
          eventName: 'Contact Us Submission',
          timestamp: serverTimestamp()
        });
      }
      setSuccess(true);
    } catch (error) {
      console.error("Failed to send contact message:", error);
      alert("Failed to send message. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                <a href="mailto:info@ludoleague.co.za" className="flex items-center gap-3 font-bold hover:text-sky-300 transition-colors"><Mail className="text-white" /> info@ludoleague.co.za</a>
                <a href="tel:+27753211350" className="flex items-center gap-3 font-bold hover:text-sky-300 transition-colors"><Phone className="text-white" /> +27 (0) 75 321 1350</a>
                <a href="tel:0725578097" className="flex items-center gap-3 font-semibold text-slate-600 hover:text-sky-300 transition-colors"><Phone className="text-white/50" size={18} /> 072 557 8097</a>
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
                <input id="contact-name" name="name" required type="text" placeholder="Your Name" autoComplete="name" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input id="contact-email" name="email" required type="email" placeholder="Your Email" autoComplete="email" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <textarea id="contact-message" name="message" required rows={4} placeholder="Your Message" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 text-[#001F3F] font-bold outline-none focus:border-[#0EA5E9]" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
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
