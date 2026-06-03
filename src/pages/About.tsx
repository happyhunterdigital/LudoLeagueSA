import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Target, Users, Shield, Trophy, Shirt, Compass, MapPin, Award } from 'lucide-react';

const kitTiers = [
  {
    tier: 'Officials',
    gear: 'Judge (referee) short/long-sleeve jerseys, branded chinos, polo shirts, lightweight windbreakers, and caps.',
    material: 'Breathable polyester blends, poly-cotton mixes, and microfibre fleece for long tournament hours.',
    icon: Shield,
    color: 'text-sky-400',
    border: 'border-sky-500/20'
  },
  {
    tier: 'Players',
    gear: 'Home and away team jerseys, tracksuits, team trousers, training polo shirts, jackets, caps, and beanies.',
    material: '100% polyester sports mesh, sweat-wicking Dri-fit, and comfortable cotton blends.',
    icon: Trophy,
    color: 'text-amber-500',
    border: 'border-amber-500/20'
  },
  {
    tier: 'Clubs',
    gear: 'Club-branded polo shirts, management tracksuits, coach jackets, caps, and long-sleeve shirts.',
    material: 'Durable piqué cotton, insulated polyester fleece, and professional softshell layers.',
    icon: Users,
    color: 'text-teal-400',
    border: 'border-teal-400/20'
  },
  {
    tier: 'Fans',
    gear: 'Replica jerseys, fan T-shirts, hoodies, caps, and knitted beanies.',
    material: 'Premium cotton blends, replica polyester, and fleece-lined fabrics for seasonal comfort.',
    icon: Shirt,
    color: 'text-rose-400',
    border: 'border-rose-400/20'
  }
];

export const About = () => {
  return (
    <section id="about" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1779551715/Ludo_League_game_pieces_on_wood_yz2omo.png" alt="Ludo Pieces" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-transparent to-[#0F172A]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-24">
        {/* Core Identity */}
        <div className="space-y-8">
          <SectionHeader tag="Core Identity" title="From Pastime to National Sport" colorClass="text-[#0EA5E9]" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-[#1E293B] border border-slate-700 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400"><Compass size={24} /></div>
              <h3 className="text-2xl font-display font-black italic text-white uppercase">The Pretoria Headquartered Vision</h3>
              <p className="text-slate-300 leading-relaxed text-sm">Ludo League South Africa is a pioneering initiative set to transform the culturally beloved game of Ludo into a structured, competitive, and impactful national sport. Headquartered in Pretoria, the league operates with a national framework designed to pioneer Ludo as a formal competitive discipline, bridging socio-economic divides through the power of play.</p>
            </div>
            <div className="bg-[#1E293B] border border-slate-700 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400"><Target size={24} /></div>
              <h3 className="text-2xl font-display font-black italic text-white uppercase">Strategic Cultural Synergy</h3>
              <p className="text-slate-300 leading-relaxed text-sm">Our core mission is to provide an accessible and inclusive environment where individuals of all ages can engage in strategic gameplay. By leveraging the game's deep cultural resonance across South African communities, the league uses structured competition to promote teamwork, enhance cognitive abilities, encourage problem-solving, and strengthen community bonds.</p>
            </div>
          </motion.div>
        </div>

        {/* Grassroots Ecosystem Section */}
        <div className="space-y-8">
          <SectionHeader tag="Grassroots Ecosystem" title="The Physical Tournament Structure" colorClass="text-[#FFC107]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1E293B] border border-slate-700 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500"><Award size={24} /></div>
              <h3 className="text-2xl font-display font-black italic text-white uppercase">Tournament and Clinics</h3>
              <p className="text-slate-300 leading-relaxed text-sm">Ludo tournaments and clinics create vibrant, positive spaces where communities come together to learn, compete, and grow. They strengthen social cohesion, boost confidence, and sharpen strategic thinking in a fun, structured environment. Clinics introduce new players to the fundamentals of the sport, while tournaments showcase talent and celebrate achievement. These events also stimulate local economies by creating opportunities for facilitators and judges/referees, and small businesses. Most importantly, they offer safe, inclusive platforms that empower youth, promote teamwork, and build community pride through a culturally loved game.</p>
            </div>
            <div className="bg-[#1E293B] border border-slate-700 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400"><MapPin size={24} /></div>
              <h3 className="text-2xl font-display font-black italic text-white uppercase">Offline Footprint</h3>
              <p className="text-slate-300 leading-relaxed text-sm">To ensure the sport remains deeply rooted where people naturally gather, the league establishes a permanent, ambient presence in local communities. Branded, physical Ludo boards are placed directly into grassroots social hubs, including local parks and community halls. This placement allows everyday players to engage in casual matches within their daily social fabric, keeping the brand continuously visible.</p>
            </div>
          </div>
        </div>

        {/* Athletic Identity Grid */}
        <div className="space-y-8">
          <SectionHeader tag="Athletic Identity" title="Standardized League Kit Matrix" colorClass="text-emerald-400" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kitTiers.map((item, idx) => (
              <div key={idx} className={`bg-[#1E293B] border ${item.border} p-6 rounded-2xl shadow-xl space-y-4`}>
                <div className={`w-10 h-10 ${item.color} bg-white/5 rounded-lg flex items-center justify-center`}><item.icon size={20} /></div>
                <h4 className="text-xl font-display font-black italic text-white uppercase">{item.tier}</h4>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p><b>Official Gear:</b> {item.gear}</p>
                  <p className="border-t border-slate-700/50 pt-2 mt-2"><b>Material Blueprint:</b> {item.material}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Framework Section */}
        <div className="space-y-8">
          <SectionHeader tag="Competitive Framework" title="Player Dynamics & Governance" colorClass="text-rose-400" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1E293B] border border-slate-700 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400"><Users size={24} /></div>
              <h3 className="text-2xl font-display font-black italic text-white uppercase">The On-Ground Player Base</h3>
              <div className="space-y-3 text-slate-300 text-sm">
                <p>Our real-world competitive ecosystem is built around two distinct player profiles:</p>
                <p><b>Casual & Social Gamers:</b> Individuals spanning ages 13 to 60 who seek accessible entertainment, nostalgic experiences, and opportunities for real-world social interaction.</p>
                <p><b>Competitive Enthusiasts:</b> Dedicated players aged 17 to 45 who are driven by structured competition, the pursuit of mastery, and formal ranking within an organized league framework.</p>
              </div>
            </div>
            <div className="bg-[#1E293B] border border-slate-700 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400"><Shield size={24} /></div>
              <h3 className="text-2xl font-display font-black italic text-white uppercase">Governance and Enforcement</h3>
              <p className="text-slate-300 leading-relaxed text-sm">To transition away from casual backyard rules, the league implements proprietary, standardized Ludo rulesets to ensure competitive fairness across all regions. Integrity is maintained on-the-ground by certified referees (judges) who oversee tournament matches and strictly enforce the official regulations. This field operation is supported by a network of regional coordinators who systematically manage local club relationships, player progression, and community outreach.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
