// File: src/components/ProductStore.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import { products } from '../data/products'; // Corrected database import path

interface ProductStoreProps {
  isDarkMode: boolean;
  onAddToCart: (p: Product, shade: string | null) => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

interface SelectedVariants {
  [productId: string]: string;
}

export default function ProductStore({ 
  onAddToCart, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery 
}: ProductStoreProps) {
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({});

  const handleSwatchSelect = (prodId: string, shade: string): void => {
    setSelectedVariants(prev => ({ ...prev, [prodId]: shade }));
  };

  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === 'All' || p.category === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="explore-products" className="pt-8 border-t border-white/5 space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950/40 p-4 border border-white/5">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#fbbf24] uppercase">Inventory Search</span>
          <h2 className="text-xl font-serif text-white mt-1">Refine Selection</h2>
        </div>
        <div className="w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search synonyms (SPF, glass skin, cica)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-xs p-3 text-white outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredProducts.map(p => {
          const currentShade = selectedVariants[p.id] || (p.swatches.length > 0 ? p.swatches[0] : null);
          const payJustNowRate = (p.price / 3).toFixed(2);

          return (
            <div 
              key={p.id} 
              className="bg-zinc-900/50 border border-white/5 p-5 flex flex-col justify-between hover:border-amber-500/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                  {currentShade ? (
                    <img 
                      src={currentShade} 
                      alt={p.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                      {p.category} Category
                    </span>
                  )}
                </div>

                {p.swatches.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 block">Available Tones:</span>
                    <div className="flex space-x-2 overflow-x-auto py-1 scrollbar-hide">
                      {p.swatches.map(sw => (
                        <button
                          key={sw}
                          onClick={() => handleSwatchSelect(p.id, sw)}
                          style={{ backgroundColor: sw.includes('Shade_03') ? '#EED2BA' : sw.includes('Shade_05') ? '#E5C2A3' : sw.includes('Shade_06') ? '#DBB18C' : sw.includes('Shade_07') ? '#BD8C5E' : '#A7764A' }}
                          aria-label={`Select shade hex ${sw}`}
                          className={`w-4 h-4 rounded-full border ${currentShade === sw ? 'border-amber-400 scale-110' : 'border-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-base text-white tracking-wide">{p.name}</h3>
                  <span className="text-amber-400 font-mono text-sm font-bold">R {p.price.toFixed(2)}</span>
                </div>
                
                {p.id === 'p1' ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1 text-xs text-amber-400 font-bold">
                      <span>★ ★ ★ ★ ★</span>
                      <span className="text-zinc-400 font-mono text-[10px]">(5.00 out of 5 based on 2 customer reviews)</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
                    <div className="text-[10px] space-y-1 text-zinc-400 font-mono border-t border-white/5 pt-2">
                      <p>✔️ Designed for diverse African skin tones</p>
                      <p>✔️ Long-wear, transfer-resistant formula</p>
                      <p>✔️ Matte, high-definition SPF 25 finish</p>
                      <p>✔️ 30ml pump bottle for hygienic application</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
                  <span>PayJustNow 3x</span>
                  <span className="text-[#fbbf24] font-bold">R {payJustNowRate}</span>
                </div>

                <div className="text-[9px] font-mono text-emerald-400">
                  🚚 Delivery: Order within 3 hours to arrive by tomorrow
                </div>

                <button 
                  onClick={() => onAddToCart(p, currentShade)}
                  className="w-full py-2 bg-zinc-800 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-black text-xs font-black uppercase tracking-widest text-center transition-all"
                >
                  Quick Add
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-950/40 p-6 border border-white/5 space-y-6 mt-12 text-left">
        <h3 className="font-serif text-lg text-[#fbbf24] uppercase tracking-wider">Product Reviews (2)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 p-4 bg-zinc-900/30 border border-white/5">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-white">Mary K</span>
              <span className="text-[10px] text-zinc-500 font-mono">1 December 2021</span>
            </div>
            <span className="text-amber-400 text-xs block">★ ★ ★ ★ ★</span>
            <p className="text-xs text-zinc-400 leading-relaxed italic">
              "Love this foundation It’s gentle on skin and stays on all day!"
            </p>
          </div>
          <div className="space-y-2 p-4 bg-zinc-900/30 border border-white/5">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-white">Funeka</span>
              <span className="text-[10px] text-zinc-500 font-mono">16 February 2022</span>
            </div>
            <span className="text-amber-400 text-xs block">★ ★ ★ ★ ★</span>
            <p className="text-xs text-zinc-400 leading-relaxed italic">
              "I love this precious product and I would continue using it! It is lightweight and the colour on the high bone cheeks looks just perfect!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
