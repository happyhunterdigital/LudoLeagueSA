import { SectionHeader } from '../components/ui/SharedUI';
import { GraduationCap, Award, Compass, Briefcase, Users, Shield, TrendingUp } from 'lucide-react';

export const Academy = ({ setActivePage }: { setActivePage?: (p: string) => void }) => {
  const handleNavToAgentForm = () => {
    if (setActivePage) {
      setActivePage('tournaments');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = 'https://ludoleague.co.za/?page=tournaments';
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#041a18]">
      {/* Intro Header */}
      <section className="py-24 px-6 md:px-10" style={{ background: 'radial-gradient(circle, var(--color-bg-mid) 0%, var(--color-bg-darkest) 100%)' }}>
        <div className="max-w-7xl mx-auto text-center mt-12">
          <SectionHeader tag="Cognitive Excellence" title="Ludo Academy" colorClass="text-[#00c9a7]" />
          <p className="text-lg text-[#9abcb6] max-w-2xl mx-auto mb-8">
            Finesse. Strategy. Planning. Mastery. Turn casual matches into professional championships.
          </p>
          <button onClick={handleNavToAgentForm} className="px-8 py-3 bg-[#e8a020] text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-colors shadow-lg cursor-pointer">
            Register as Ludo Agent (R1,500)
          </button>
        </div>
      </section>

      {/* Course Levels Grid */}
      <section className="py-24 px-6 bg-[#072e28]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="theme-card">
            <div className="p-3 bg-[#0a3d35] text-[#00c9a7] rounded-xl w-fit mb-6"><Compass size={24} /></div>
            <span className="eyebrow">LEVEL 1</span>
            <h3 className="text-white text-xl font-bold mb-4">Beginner Foundations</h3>
            <p className="text-[#9abcb6] text-sm leading-relaxed">
              Learn baseline strategic blocks, secure safety zone paths, and probability theory on standard dice-rolling.
            </p>
          </div>
          <div className="theme-card border-[#e8a020]/20">
            <div className="p-3 bg-[#e8a020]/10 text-[#e8a020] rounded-xl w-fit mb-6"><GraduationCap size={24} /></div>
            <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>LEVEL 2</span>
            <h3 className="text-white text-xl font-bold mb-4">Intermediate Tactics</h3>
            <p className="text-[#9abcb6] text-sm leading-relaxed">
              Acquire racing trajectories, block manipulation, and double-token split strategies to control the board pace.
            </p>
          </div>
          <div className="theme-card">
            <div className="p-3 bg-[#0a3d35] text-[#00c9a7] rounded-xl w-fit mb-6"><Award size={24} /></div>
            <span className="eyebrow">LEVEL 3</span>
            <h3 className="text-white text-xl font-bold mb-4">Advanced Mastery</h3>
            <p className="text-[#9abcb6] text-sm leading-relaxed">
              Master tournament psychology, club asset coordination, and advanced defensive and offensive strategy configurations.
            </p>
          </div>
        </div>
      </section>

      {/* LUDO AGENTS SECTION */}
      <section className="py-24 px-6 md:px-10" id="ludo-agents" style={{ background: 'radial-gradient(ellipse at top, #0a1f1c 0%, #041a18 100%)' }}>
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#00c9a7] mb-4">Professional Opportunity</span>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white mb-4">Ludo Agents</h2>
            <p className="text-xl font-bold italic text-[#00c9a7] mb-2">Call for Ludo Agents</p>
            <p className="text-lg font-bold text-white/80 mb-4">Become an Official Ludo South Africa Player Agency</p>
            <p className="text-[#9abcb6] max-w-3xl mx-auto leading-relaxed">
              Ludo South Africa is inviting registered agencies and sports talent representatives to become Official Ludo Agents. As the sport continues to grow across the country, this is an opportunity to establish your agency within an emerging professional sporting ecosystem from the very beginning.
            </p>
          </div>

          {/* Responsibilities + Why */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="theme-card">
              <div className="p-3 bg-[#0a3d35] text-[#00c9a7] rounded-xl w-fit mb-6"><Users size={24} /></div>
              <h3 className="text-white text-xl font-bold mb-5">Your Responsibilities</h3>
              <ul className="space-y-3">
                {[
                  'Scout, recruit, and develop talented Ludo players.',
                  'Register your agency with Ludo South Africa.',
                  'Build and manage your own roster of players.',
                  'Prepare players for leagues, tournaments, championships, and official events.',
                  'Work with Ludo South Africa to ensure players are available for competitions and media engagements.',
                  'Ensure all players are properly registered, accredited, and compliant with Ludo South Africa regulations.',
                  'Guide and protect the professional interests of your players throughout their careers.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#9abcb6] text-sm">
                    <span className="text-[#00c9a7] mt-0.5 flex-shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="theme-card border-[#e8a020]/20">
              <div className="p-3 bg-[#e8a020]/10 text-[#e8a020] rounded-xl w-fit mb-6"><TrendingUp size={24} /></div>
              <h3 className="text-white text-xl font-bold mb-5">Why Become an Official Agent?</h3>
              <p className="text-[#9abcb6] text-sm leading-relaxed mb-4">
                As one of the first officially recognised Ludo agencies in South Africa, you'll have the opportunity to establish relationships with players at the grassroots level and grow alongside the sport.
              </p>
              <p className="text-[#9abcb6] text-sm leading-relaxed">
                Your registered players remain your agency's responsibility and portfolio. Whenever they earn prize money, secure sponsorships, or endorsements, your agency will be entitled to its agreed share.
              </p>
            </div>
          </div>

          {/* Minimum Requirements */}
          <div className="theme-card">
            <div className="p-3 bg-[#0a3d35] text-[#00c9a7] rounded-xl w-fit mb-6"><Shield size={24} /></div>
            <h3 className="text-white text-xl font-bold mb-6">Minimum Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'A registered business with a valid licence to operate.',
                'Commitment to ethical player representation and development.',
                'Ability to recruit, manage, and support players professionally.',
                'Ensure every player under your agency is officially registered and accredited.',
                'Comply with all Ludo South Africa rules and the Official Agent Code of Conduct.'
              ].map((req, i) => (
                <div key={i} className="flex items-start gap-3 text-[#9abcb6] text-sm">
                  <span className="text-[#00c9a7] mt-0.5 flex-shrink-0 font-bold">✓</span>
                  {req}
                </div>
              ))}
            </div>
          </div>

          {/* Licensing Table */}
          <div className="theme-card overflow-x-auto">
            <div className="p-3 bg-[#0a3d35] text-[#00c9a7] rounded-xl w-fit mb-6"><Briefcase size={24} /></div>
            <h3 className="text-white text-xl font-bold mb-6">Licensing Model</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#0a3d35]">
                  {['Licence Type', 'Initial Fee', 'Annual Renewal', 'Notes'].map(h => (
                    <th key={h} className="text-left p-3 text-[#00c9a7] text-xs uppercase tracking-wider font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-white font-semibold">Individual Player Agent</td>
                  <td className="p-3 text-[#9abcb6]">R2,500 – R5,000</td>
                  <td className="p-3 text-[#9abcb6]">R1,000 – R2,000</td>
                  <td className="p-3 text-[#9abcb6]">Standard rate</td>
                </tr>
                <tr className="bg-[#0a3d35]/40">
                  <td className="p-3">
                    <span className="text-[#e8a020] font-bold">Founding Agent Licence</span>
                    <span className="ml-2 inline-block bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">Early Adopter</span>
                  </td>
                  <td className="p-3 text-[#e8a020] font-bold">R1,500</td>
                  <td className="p-3 text-[#9abcb6]">Standard annual rate</td>
                  <td className="p-3 text-[#9abcb6]">First 50–100 agencies</td>
                </tr>
              </tbody>
            </table>
            <p className="text-[#9abcb6] text-xs mt-4 opacity-70">
              ⚡ The Founding Agent Licence rewards early adopters, helps establish a national agent network quickly, without permanently discounting the value of the licence.
            </p>
          </div>

          {/* Additional Revenue Streams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="theme-card">
              <h3 className="text-white text-lg font-bold mb-4">Additional Revenue Streams</h3>
              <p className="text-[#9abcb6] text-xs mb-4">Additional income you can generate as a registered agent:</p>
              <div className="space-y-3">
                {[
                  { label: 'Player registration', rate: 'R100 – R250 per player per month' },
                  { label: 'Agent ID card', rate: 'R150 – R300' },
                  { label: 'CPD workshops', rate: 'R500 – R1,500' },
                  { label: 'Licence reinstatement', rate: 'R1,000' },
                ].map(({ label, rate }, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
                    <span className="text-[#9abcb6]">{label}</span>
                    <span className="text-[#00c9a7] font-semibold">{rate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="theme-card border-[#00c9a7]/20">
              <h3 className="text-white text-lg font-bold mb-4">The Investment Perspective</h3>
              <p className="text-[#9abcb6] text-sm leading-relaxed mb-4">
                The key is that agents should see the licence as an investment in a long-term profession. As the Ludo ecosystem grows, the value of holding an official licence will increase alongside it.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center pt-8">
            <p className="text-[#9abcb6] max-w-2xl mx-auto mb-8 leading-relaxed">
              Register your agency today and become part of the foundation of South Africa's professional Ludo ecosystem.
            </p>
            <button onClick={handleNavToAgentForm} className="inline-block px-10 py-4 rounded-full font-black italic uppercase tracking-wider text-[#041a18] transition-all hover:scale-105 cursor-pointer" style={{ background: 'linear-gradient(135deg, #e8a020, #f4c84a)', boxShadow: '0 4px 20px rgba(232,160,32,0.4)' }}>
              Register Your Agency Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
