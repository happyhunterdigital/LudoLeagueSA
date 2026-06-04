// File: src/components/LipsCollection.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import { products } from '../data/products'; // Corrected database import path

interface LipsCollectionProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null) => void;
}

export default function LipsCollection({ isDarkMode, onAddToCart }: LipsCollectionProps) {
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

  const lipsProducts = products.filter(p => p.category === 'Lips');

  const handleSwatchSelect = (prodId: string, swatch: string) => {
    setSelectedVariants(prev => ({ ...prev, [prodId]: swatch }));
  };

  const photoshootGallery = [
    "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780597692/PB_photoshoot_Lipcolour1_cgv4km.jpg",
    "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780597691/PB_photoshoot_Lipcolour-2_ngh1nb.jpg",
    "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780597643/PB_photoshoot_Lipcolour_gev2jy.jpg"
  ];

  return (
    <section className="space-y-16 py-12 animate-fade-in">
      
      {/* Editorial Photoshoot Banner */}
      <div className="relative h-[50vh] bg-zinc-950 border border-white/5 flex overflow-hidden">
        {photoshootGallery.map((imgUrl, idx) => (
          <div key={idx} className="flex-1 relative group overflow-hidden h-full">
            <img 
              src={imgUrl} 
              alt={`Profuse Beauty Photoshoot Lipcolour Model ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none z-10">
          <span className="text-[10px] font-mono tracking-widest text-[#fbbf24] uppercase">Exclusive Release</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase text-white tracking-wide mt-2">The Lips Collection</h2>
          <p className="text-xs text-zinc-300 mt-2 font-mono">Designed for hydration and all-day transfer resistance.</p>
        </div>
      </div>

      {/* Standalone Lips Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lipsProducts.map(p => {
          const currentSwatch = selectedVariants[p.id] || p.swatches[0];
          const payJustNowRate = (p.price / 3).toFixed(2);

          return (
            <div 
              key={p.id} 
              className="bg-zinc-900/50 border border-white/5 p-5 flex flex-col justify-between hover:border-amber-500/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={currentSwatch} 
                    alt={p.name} 
                    className="w-full h-full object-cover border border-white/5"
                  />
                </div>

                {/* Horizontally swipeable swatch buttons */}
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 block">Select Shade Asset:</span>
                  <div className="flex space-x-2 overflow-x-auto py-1 scrollbar-hide">
                    {p.swatches.map((sw, idx) => (
                      <button
                        key={sw}
                        onClick={() => handleSwatchSelect(p.id, sw)}
                        className={`w-6 h-6 rounded-full border overflow-hidden ${currentSwatch === sw ? 'border-amber-400 scale-110' : 'border-transparent'}`}
                      >
                        <img src={sw} alt="swatch option" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-base text-white tracking-wide">{p.name}</h3>
                  <span className="text-amber-400 font-mono text-sm font-bold">R {p.price.toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
                  <span>PayJustNow 3x</span>
                  <span className="text-[#fbbf24] font-bold">R {payJustNowRate}</span>
                </div>

                <button 
                  onClick={() => onAddToCart(p, currentSwatch)}
                  className="w-full py-2 bg-zinc-800 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-black text-xs font-black uppercase tracking-widest text-center transition-all"
                >
                  Add Lip Colour to Bag
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
