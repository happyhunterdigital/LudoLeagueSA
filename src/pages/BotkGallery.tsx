import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const botkPhotos = [
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779654012/Battle_of_the_Kasis_BOTK_Ludo_League_bw2pa9.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779654107/Battle_of_the_Kasis_BOTK_Ludo_League1_zkgif3.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779654159/Battle_of_the_Kasis__BOTK__Ludo_League_rvhbya.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779654190/Battle_of_the_Kasis_BOTK_Ludo_League2_zqwyvz.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779655268/20210911_151619_kospmv.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779655339/Battle_of_the_Kasis_BOTK_entry_to_the_Ludo_League_rznpkq.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779655371/Battle_of_the_Kasis_BOTK_Ludo_League_Alex_shhxsl.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779655376/Battle_of_the_Kasis_BOTK_Ludo_League_welcome_gbrgzp.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779655380/Battle_of_the_Kasis_BOTK_Ludo_League_Soweto_uutjzq.jpg",
  "https://res.cloudinary.com/dkyg07qvv/image/upload/v1779655586/Battle_of_the_Kasis_BOTK_hero_image_ehchpx.jpg"
];

const mamelodiPhotos = [
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779661781/Mamelodi_Ludo_League_Tournament_sua998.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779661778/Mamelodi_Ludo_League_hw5c2g.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779661774/Mamelodi_Ludo_LeagueSA_b7yihd.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779661774/Mamelodi_Ludo_League_SA_plfeug.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779661771/Mamelodi_Ludo_League_Event_cdpxhz.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779661772/Mamelodi_Ludo_League_Tournament_fo6dyu.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779661757/Mamelodi_Ludo_League_1_qffeol.jpg",
  "https://res.cloudinary.com/dfzeb1s54/video/upload/q_auto/f_auto/v1779568638/The_Ludo_League_South_Africa_Hero_video_acnbip.mp4",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779558549/Ludo_league_South_Africa_Mamelodi_branch_aho65a.jpg"
];

const sowetoPhotos = [
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779664327/Soweto_Ludo_League_zh9qtr.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779664332/Soweto_Ludo_League_Tournament_sw2zmb.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779664332/Soweto_Ludo_League_Tournament_bcixeg.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779664335/Soweto_Ludo_League_Tournament_rnkewh.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779664335/Soweto_Ludo_League_Tournament_Event_vlovsc.jpg",
  "https://res.cloudinary.com/dfzeb1s54/image/upload/q_auto/f_auto/v1779664334/Soweto_Ludo_League_Event_xlhpkw.jpg"
];

interface BotkGalleryProps {
  selectedTab: 'botk' | 'mamelodi' | 'soweto';
  setSelectedTab: (tab: 'botk' | 'mamelodi' | 'soweto') => void;
}

export const BotkGallery: React.FC<BotkGalleryProps> = ({ selectedTab, setSelectedTab }) => {
  const [index, setIndex] = useState(0);

  const getPhotos = () => {
    if (selectedTab === 'mamelodi') return mamelodiPhotos;
    if (selectedTab === 'soweto') return sowetoPhotos;
    return botkPhotos;
  };

  const activePhotos = getPhotos();
  const currentAsset = activePhotos[index];
  const isVideo = currentAsset ? currentAsset.endsWith('.mp4') : false;

  const next = () => setIndex((prev) => (prev + 1) % activePhotos.length);
  const prev = () => setIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);

  // Sync index on tab alterations
  useEffect(() => {
    setIndex(0);
  }, [selectedTab]);

  return (
    <section className="min-h-screen w-full py-24 px-4 md:px-10 bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader tag="Archived Events" title="League Gallery" colorClass="text-[#FFC107]" />

        {/* Dynamic Tab Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button onClick={() => setSelectedTab('botk')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedTab === 'botk' ? 'bg-[#FFC107] text-[#0F172A]' : 'bg-[#1E293B] text-slate-400 hover:bg-slate-800'}`}>
            Battle of the Kasis (BOTK)
          </button>
          <button onClick={() => setSelectedTab('mamelodi')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedTab === 'mamelodi' ? 'bg-[#FFC107] text-[#0F172A]' : 'bg-[#1E293B] text-slate-400 hover:bg-slate-800'}`}>
            Mamelodi Ludo League
          </button>
          <button onClick={() => setSelectedTab('soweto')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedTab === 'soweto' ? 'bg-[#FFC107] text-[#0F172A]' : 'bg-[#1E293B] text-slate-400 hover:bg-slate-800'}`}>
            Soweto Ludo League
          </button>
        </div>

        {/* Large Featured Slide */}
        <div className="relative h-[300px] md:h-[500px] w-full bg-black/40 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isVideo ? (
              <video key={currentAsset} autoPlay loop muted playsInline controls className="w-full h-full object-cover">
                <source src={currentAsset} type="video/mp4" />
              </video>
            ) : (
              <motion.img 
                key={currentAsset}
                src={currentAsset} 
                alt="Active View"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full object-cover"
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between p-6">
            <span className="text-sm font-bold tracking-widest text-[#FFC107]">Asset {index + 1} of {activePhotos.length}</span>
            <div className="flex gap-2">
              <button onClick={prev} className="p-3 bg-white/10 hover:bg-[#0EA5E9] text-white rounded-xl backdrop-blur-sm transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={next} className="p-3 bg-white/10 hover:bg-[#0EA5E9] text-white rounded-xl backdrop-blur-sm transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>

        {/* Interactive Thumbnails */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mt-8">
          {activePhotos.map((src, i) => {
            const isThumbVideo = src.endsWith('.mp4');
            return (
              <button 
                key={i} 
                onClick={() => setIndex(i)}
                className={`h-16 rounded-xl overflow-hidden border-2 transition-all relative ${index === i ? 'border-[#FFC107] scale-105 shadow-md' : 'border-slate-800 opacity-60 hover:opacity-100'}`}
              >
                {isThumbVideo ? (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white"><Play size={20} /></div>
                ) : (
                  <img src={src} alt="Thumbnail" className="w-full h-full object-cover" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
