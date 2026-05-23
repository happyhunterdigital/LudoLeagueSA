import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col w-full bg-[#041a18]">
      <section className="py-24 px-6 md:px-10" style={{ background: 'radial-gradient(circle, var(--color-bg-mid) 0%, var(--color-bg-darkest) 100%)' }}>
        <div className="max-w-7xl mx-auto text-center mt-12">
          <SectionHeader tag="Get in Touch" title="Contact Us" colorClass="text-[#00c9a7]" />
        </div>
      </section>

      <section className="py-24 px-6 bg-[#072e28]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-white">Reach Us Directly</h3>
            <p className="text-[#9abcb6]">Our admin team is standing by to assist with club registrations and tournament queries.</p>
            <div className="space-y-4 pl-4 border-l-2 border-[#00c9a7]">
              <p className="flex items-center gap-2"><Mail size={16} /> info@ludoleague.co.za</p>
              <p className="flex items-center gap-2"><Phone size={16} /> 072 557 8097</p>
              <p className="flex items-center gap-2"><Phone size={16} /> 068 016 7684</p>
            </div>
          </div>

          <div className="theme-card">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 size={48} className="text-[#00c9a7] mx-auto" />
                <h3 className="text-white">Message Sent!</h3>
                <p className="text-[#9abcb6]">Thanks for reaching out. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <input required type="text" placeholder="Your Name" className="w-full bg-[#041a18] border border-slate-700 rounded-xl p-4 text-white outline-none" />
                <input required type="email" placeholder="Your Email" className="w-full bg-[#041a18] border border-slate-700 rounded-xl p-4 text-white outline-none" />
                <textarea required rows={4} placeholder="Your Message" className="w-full bg-[#041a18] border border-slate-700 rounded-xl p-4 text-white outline-none"></textarea>
                <button type="submit" className="w-full btn-action">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
