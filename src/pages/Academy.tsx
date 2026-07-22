import { SectionHeader } from '../components/ui/SharedUI';
import { GraduationCap, Award, Compass, Briefcase, Users, Shield, TrendingUp } from 'lucide-react';

export const Academy = ({ setActivePage }: { setActivePage?: (p: string) => void }) => {
  const handleNavToAgentForm = () => {
    if (setActivePage) {
      setActivePage('tournaments');
    } else {
      const el = document.getElementById('tournaments');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.href = '?page=tournaments';
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#041a18]">
      <section className="py-24 px-6 md:px-10" style={{ background: 'radial-gradient(circle, var(--color-bg-mid) 0%, var(--color-bg-darkest) 100%)' }}>
        <div className="max-w-7xl mx-auto text-center mt-12">
          <SectionHeader tag="Cognitive Excellence" title="Ludo Academy" colorClass="text-[#00c9a7]" />
          <p className="text-lg text-[#9abcb6] max-w-2xl mx-auto mb-8">
            Finesse. Strategy. Planning. Mastery. Turn casual matches into professional championships.
          </p>
          <button onClick={handleNavToAgentForm} className="px-8 py-3 bg-[#e8a020] text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-colors">
            Register as Ludo Agent (R1,500)
          </button>
        </div>
      </section>

      {/* LUDO AGENTS */}
      <section className="py-24 px-6 md:px-10" id="ludo-agents">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#00c9a7] mb-4">Professional Opportunity</span>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white mb-4">Call for Ludo Agents</h2>
          <p className="text-[#9abcb6] max-w-3xl mx-auto leading-relaxed mb-8">
            Ludo South Africa is inviting registered agencies and sports talent representatives to become Official Ludo Agents. Founding Agent Fee: R1,500.00 (Reduced from R2,500.00).
          </p>

          <button onClick={handleNavToAgentForm} className="inline-block px-10 py-4 rounded-full font-black italic uppercase tracking-wider text-[#041a18] transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #e8a020, #f4c84a)', boxShadow: '0 4px 20px rgba(232,160,32,0.4)' }}>
            Register Your Agency Now →
          </button>
        </div>
      </section>
    </div>
  );
};
