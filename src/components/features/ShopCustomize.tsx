import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { AnimatePresence } from 'motion/react';

export const ShopCustomize = ({ selectedVariant }: { selectedVariant: string }) => {
  const [name, setName] = useState('My Board');
  const [showModal, setShowModal] = useState(false);

  const currentItem = PRODUCTS.find(p => p.id === selectedVariant) || PRODUCTS[1];

  return (
    <div className="relative w-full h-screen bg-[#F8FAFC] flex flex-col items-center justify-center overflow-hidden px-4 text-[#0F172A]">
      {/* Background Watermark Marquee */}
      <div className="absolute inset-0 z-0 flex flex-col justify-around select-none pointer-events-none overflow-hidden py-12">
        <div className="text-[12vw] font-black tracking-widest text-[#0F172A]/5 uppercase whitespace-nowrap animate-[marquee_20s_linear_infinite]">Ludo League SA Ludo League SA Ludo League SA</div>
        <div className="text-[12vw] font-black tracking-widest text-[#0F172A]/5 uppercase whitespace-nowrap animate-[marquee-reverse_25s_linear_infinite]">Ludo League SA Ludo League SA Ludo League SA</div>
        <div className="text-[12vw] font-black tracking-widest text-[#0F172A]/5 uppercase whitespace-nowrap animate-[marquee_30s_linear_infinite]">Ludo League SA Ludo League SA Ludo League SA</div>
      </div>

      {/* Center Personalization Board */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-xl w-full">
        <span className="text-[10px] tracking-[0.25em] font-black uppercase text-slate-500">Double click and enter your name</span>
        
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-white border border-slate-200 shadow-2xl p-4 rounded-[32px] flex items-center justify-center">
          <img src={currentItem.image} alt={currentItem.name} className="max-w-[85%] max-h-[85%] object-contain" />
          
          {/* Custom Name Typography Overlay */}
          <input 
            type="text" 
            value={name} 
            maxLength={18}
            onChange={e => setName(e.target.value)} 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs font-black uppercase tracking-widest bg-slate-900/90 text-[#FFC107] px-4 py-2 border border-amber-500/20 rounded-xl outline-none shadow-lg focus:border-amber-500 transition-colors pointer-events-auto"
          />
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="px-10 py-4 bg-slate-900 text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-lg hover:bg-[#D32F2F] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer pointer-events-auto"
        >
          <Share2 size={14} /> Share Specification
        </button>
      </div>

      {/* Social Mock Share Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pointer-events-auto">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-6 relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors">X</button>
              <h4 className="text-2xl font-display font-black italic uppercase text-slate-950">Share Your Board</h4>
              <p className="text-slate-600 text-xs leading-relaxed">Let your friends or local club managers see your custom personalizations.</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button onClick={() => alert("Link copied to clipboard!")} className="p-3 bg-slate-50 border hover:bg-slate-100 rounded-xl font-bold cursor-pointer">Copy Link</button>
                <button onClick={() => alert("Shared on WhatsApp!")} className="p-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl font-bold cursor-pointer">WhatsApp</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
