import { useState } from 'react';
import { motion } from 'motion/react';
import { Crown, Trophy, Medal, Star } from 'lucide-react';

interface PlayerRow {
  rank: number;
  initials: string;
  name: string;
  club: string;
  record: string;
  round: string;
  category: 'singles' | 'doubles';
}

const tableData: PlayerRow[] = [
  { rank: 1, initials: 'TN', name: 'Thabo Nkosi', club: 'Alexandra Club', record: '9-1', round: 'Finals (Winner)', category: 'singles' },
  { rank: 2, initials: 'SM', name: 'Sibusiso Mokoena', club: 'Soweto Giants', record: '8-2', round: 'Finals (Runner-up)', category: 'singles' },
  { rank: 3, initials: 'GS', name: 'Gift Selepe', club: 'Mamelodi United', record: '7-3', round: 'Semi-Finals', category: 'singles' },
  { rank: 4, initials: 'TL', name: 'Thabang Letsoalo', club: 'Eagles Ludo Club', record: '6-4', round: 'Quarter-Finals', category: 'singles' },
  { rank: 5, initials: 'MK', name: 'Moses Khumalo', club: 'Buda Ludo Club', record: '5-5', round: 'Quarter-Finals', category: 'singles' },
  { rank: 1, initials: 'SG', name: 'Soweto Giants Duos', club: 'Soweto Giants', record: '10-0', round: 'Finals (Winner)', category: 'doubles' },
  { rank: 2, initials: 'AC', name: 'Alex Classics', club: 'Alexandra Club', record: '8-2', round: 'Finals (Runner-up)', category: 'doubles' },
];

export const AfconPodiumAndTable = () => {
  const [category, setCategory] = useState<'singles' | 'doubles'>('singles');

  const filteredData = tableData.filter(row => row.category === category);

  return (
    <div className="w-full bg-white text-slate-900 py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* 3-Column Podium ordered 2nd, 1st, 3rd */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic text-slate-900">The Podium</h2>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Africa's top ranked Ludo tacticians</p>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-0 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full md:w-1/3 p-8 bg-slate-50 border border-slate-200 rounded-3xl md:rounded-r-none md:rounded-l-3xl text-center shadow-lg order-2 md:order-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4 border border-slate-300"><Medal size={28} className="text-slate-500" /></div>
              <h4 className="text-2xl font-display font-black italic">S. Mokoena</h4>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Soweto Giants</p>
              <div className="mt-4 px-4 py-1 bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-full">2nd Place</div>
            </motion.div>

            {/* 1st Place - Champion */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full md:w-1/3 p-10 bg-slate-900 text-white rounded-3xl text-center shadow-2xl border-4 border-[#FFC107] relative order-1 md:order-2 flex flex-col items-center z-10 md:scale-105">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FFC107] text-[#0F172A] px-4 py-1 rounded-full flex items-center gap-1.5 text-xs font-black uppercase tracking-wider shadow-md">
                <Crown size={12} /> Champion
              </div>
              <div className="w-20 h-20 rounded-full bg-[#FFC107]/10 flex items-center justify-center mb-4 border border-[#FFC107]"><Trophy size={36} className="text-[#FFC107]" /></div>
              <h4 className="text-3xl font-display font-black italic">Thabo Nkosi</h4>
              <p className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest mt-1">Alexandra Club</p>
              <div className="mt-4 px-4 py-1 bg-[#FFC107] text-[#0F172A] text-xs font-black uppercase tracking-wider rounded-full">1st Place</div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full md:w-1/3 p-8 bg-slate-50 border border-slate-200 rounded-3xl md:rounded-l-none md:rounded-r-3xl text-center shadow-lg order-3 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4 border border-amber-200"><Star size={28} className="text-amber-600" /></div>
              <h4 className="text-2xl font-display font-black italic">Gift Selepe</h4>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Mamelodi United</p>
              <div className="mt-4 px-4 py-1 bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-wider rounded-full">3rd Place</div>
            </motion.div>
          </div>
        </div>

        {/* Full Results Table with Pill Filters */}
        <div className="pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl font-display font-black italic uppercase">Championship Brackets</h3>
            <div className="flex gap-2">
              <button onClick={() => setCategory('singles')} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${category === 'singles' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Singles</button>
              <button onClick={() => setCategory('doubles')} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${category === 'doubles' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Doubles</button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <th className="p-6">Rank</th>
                    <th className="p-6">Player/Team</th>
                    <th className="p-6">Club</th>
                    <th className="p-6">W/L Record</th>
                    <th className="p-6">Round Reached</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredData.map((row) => (
                    <tr key={row.rank} className="hover:bg-slate-50/50">
                      <td className="p-6">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${row.rank <= 3 ? 'bg-[#FFC107] text-[#0F172A]' : 'bg-slate-100 text-slate-600'}`}>{row.rank}</span>
                      </td>
                      <td className="p-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">{row.initials}</div>
                        <span className="font-bold text-slate-900">{row.name}</span>
                      </td>
                      <td className="p-6 text-slate-600 font-bold">{row.club}</td>
                      <td className="p-6 text-[#0EA5E9] font-black">{row.record}</td>
                      <td className="p-6 font-medium text-slate-500">{row.round}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
