import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Users, Shield, Compass } from 'lucide-react';

export const OurTeam = () => {
  return (
    <div className="flex flex-col w-full bg-[#041a18]">
      <section className="py-24 px-6 md:px-10" style={{ background: 'radial-gradient(circle, var(--color-bg-mid) 0%, var(--color-bg-darkest) 100%)' }}>
        <div className="max-w-7xl mx-auto text-center mt-12">
          <SectionHeader tag="Our Leadership" title="Our Team" colorClass="text-[#e8a020]" />
          <p className="text-lg text-[#9abcb6] max-w-2xl mx-auto">
            Bakotsi ka ludo! — Passionate about the game, dedicated to the community.
          </p>
        </div>
      </section>

      {/* Leadership Profile Stack */}
      <section className="py-24 px-6 bg-[#072e28]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="theme-card flex flex-col items-center text-center p-10">
            <img src="https://placehold.co/150x150/041a18/e8a020?text=JS" alt="Joe Setladi" className="w-32 h-32 rounded-full border-2 border-[#e8a020] mb-6 object-cover" />
            <h3 className="text-white mb-2">Joe Setladi</h3>
            <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>Founder & President</span>
            <p className="text-[#9abcb6] text-sm max-w-sm mt-4">
              "The driving force behind Ludo League SA since its founding in 2009. Dedicated to building communities through the power of strategic play."
            </p>
          </div>

          <div className="theme-card flex flex-col items-center text-center p-10">
            <img src="https://placehold.co/150x150/041a18/00c9a7?text=Tibi" alt="Tibi" className="w-32 h-32 rounded-full border-2 border-[#00c9a7] mb-6 object-cover" />
            <h3 className="text-white mb-2">Tibi</h3>
            <span className="eyebrow">Community Liaison</span>
            <p className="text-[#9abcb6] text-sm max-w-sm mt-4">
              "An integral co-founder since 2009. Leading grassroots community operations across Mamelodi, Soweto, and Alexandra."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
