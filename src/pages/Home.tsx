import { motion } from 'motion/react';
import { ArrowRight, Trophy, Target, Compass } from 'lucide-react';
import { LudoBoardDecoration } from '../components/ui/SharedUI';
import { Page } from '../App';

export const Home = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <div className="flex flex-col w-full">
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden" style={{ background: 'radial-gradient(circle, var(--color-bg-mid) 0%, var(--color-bg-darkest) 100%)' }}>
        <LudoBoardDecoration />
        
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover object-center">
            <source src="https://res.cloudinary.com/dfzeb1s54/video/upload/q_auto/f_auto/v1780409268/Giant_die_falling_onto_Ludo_league_SA_ludo_board_vosbiv.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg-darkest to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center mt-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="tag-status mb-6">
              <span className="status-indicator"></span> 2026 Season Live
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black uppercase italic leading-none mb-6 text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
              Play Bold. Win Big. <br /><span className="text-[#e8a020]">Build Community.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-2xl max-w-3xl mx-auto mb-10 font-medium leading-relaxed px-4 text-slate-100 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
              Since 2009, The Ludo League SA has been transforming communities through the sport of Ludo — from Alexandra to Mamelodi, township to tournament.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setActivePage('Tournaments')} className="btn-action">
                Join A League <ArrowRight size={18} />
              </button>
              <button onClick={() => setActivePage('Gallery')} className="px-10 py-5 uppercase text-[11px] tracking-[0.25em] font-black italic transition-all duration-300 flex items-center justify-center gap-2 rounded-2xl border-2 border-[#00c9a7] bg-[#072e28]/85 text-white hover:-translate-y-1 w-full sm:w-auto shadow-xl">
                Watch Highlights
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#e8a020] text-[#041a18] relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-around gap-8 text-center">
          {[
            { val: "15+", label: "Years Running" },
            { val: "500+", label: "Active Players" },
            { val: "3", label: "Township Leagues" },
            { val: "R50k+", label: "Prize Money Awarded" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-display font-black italic">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest font-black mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-32 px-6 md:px-10 bg-[#072e28] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1779551715/Ludo_League_game_pieces_on_wood_yz2omo.png" alt="Ludo Pieces" className="w-full h-full object-cover opacity-10 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#072e28] via-[#072e28]/95 to-[#072e28]"></div>
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">THE SPORT</span>
            <h2>More Than a Game. A Movement.</h2>
            <p className="text-[#9abcb6] text-lg leading-relaxed">
              The Ludo League SA is an inspiring, unique, and all-inclusive South African sport that transcends race, age, and background. We've been building champions and connecting communities since 2009.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="theme-card bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-center">
              <div className="p-3 bg-[#00c9a7]/10 text-[#00c9a7] rounded-xl mb-4">
                <Target size={24} />
              </div>
              <p className="text-white font-semibold leading-relaxed">Skill-based competitive play — not luck</p>
            </div>
            <div className="theme-card bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-center">
              <div className="p-3 bg-[#e8a020]/10 text-[#e8a020] rounded-xl mb-4">
                <Trophy size={24} />
              </div>
              <p className="text-white font-semibold leading-relaxed">Structured leagues and knockout tournaments</p>
            </div>
            <div className="theme-card bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-center">
              <div className="p-3 bg-[#00c9a7]/10 text-[#00c9a7] rounded-xl mb-4">
                <Compass size={24} />
              </div>
              <p className="text-white font-semibold leading-relaxed">Rooted in township culture and community pride</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
