import { SectionHeader } from '../components/ui/SharedUI';
import { GraduationCap, Award, Compass } from 'lucide-react';

export const Academy = () => {
  return (
    <div className="flex flex-col w-full bg-[#041a18]">
      <section className="py-24 px-6 md:px-10" style={{ background: 'radial-gradient(circle, var(--color-bg-mid) 0%, var(--color-bg-darkest) 100%)' }}>
        <div className="max-w-7xl mx-auto text-center mt-12">
          <SectionHeader tag="Cognitive Excellence" title="Ludo Academy" colorClass="text-[#00c9a7]" />
          <p className="text-lg text-[#9abcb6] max-w-2xl mx-auto">
            Finesse. Strategy. Planning. Mastery. Turn casual matches into professional championships.
          </p>
        </div>
      </section>

      {/* Course Levels Grid */}
      <section className="py-24 px-6 bg-[#072e28]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="theme-card">
            <div className="p-3 bg-[#0a3d35] text-[#00c9a7] rounded-xl w-fit mb-6"><Compass size={24} /></div>
            <span className="eyebrow">LEVEL 1</span>
            <h3 className="text-white mb-4">Beginner Foundations</h3>
            <p className="text-[#9abcb6] text-sm">
              Learn baseline strategic blocks, secure safety zone paths, and probability theory on standard dice-rolling.
            </p>
          </div>

          <div className="theme-card border-[#e8a020]/20">
            <div className="p-3 bg-[#e8a020]/10 text-[#e8a020] rounded-xl w-fit mb-6"><GraduationCap size={24} /></div>
            <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>LEVEL 2</span>
            <h3 className="text-white mb-4">Intermediate Tactics</h3>
            <p className="text-[#9abcb6] text-sm">
              Acquire racing trajectories, block manipulation, and double-token split strategies to control the board pace.
            </p>
          </div>

          <div className="theme-card">
            <div className="p-3 bg-[#0a3d35] text-[#00c9a7] rounded-xl w-fit mb-6"><Award size={24} /></div>
            <span className="eyebrow">LEVEL 3</span>
            <h3 className="text-white mb-4">Advanced Mastery</h3>
            <p className="text-[#9abcb6] text-sm">
              Master tournament psychology, club asset coordination, and advanced defensive and offensive strategy configurations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
