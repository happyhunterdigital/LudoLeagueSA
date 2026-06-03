import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { LudoScene } from '../components/features/LudoScene';
import { ShopCheckoutModal } from '../components/features/ShopCheckoutModal';

export const Shop = ({ cart, setCart }: { cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  const addToCart = (id: string) => setCart(prev => [...prev, id]);
  const removeFromCart = (indexToRemove: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };
  const clearCart = () => setCart([]);

  return (
    <section id="shop" className="min-h-screen w-full relative bg-[#0C152B] overflow-hidden flex flex-col justify-between">
      {/* 3D WebGL Canvas Layer - Configured with demand rendering to prevent scroll lag */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas 
          camera={{ position: [0, 1.8, 6.5], fov: 45 }}
          frameloop="demand"
          className="w-full h-full"
        >
          <LudoScene 
            selectedId={selectedBoardId} 
            setSelectedId={setSelectedBoardId} 
            addToCart={addToCart} 
            cart={cart}
          />
        </Canvas>
      </div>

      {/* 2D UI Overlay - High Z-Index with pointer-events-none to let scroll pass to canvas */}
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col justify-between pointer-events-none">
        
        {/* Top Header */}
        <header className="p-6 md:p-8 flex justify-between items-center w-full pointer-events-auto">
          <div className="flex items-center gap-4">
            {selectedBoardId && (
              <button 
                onClick={() => setSelectedBoardId(null)}
                className="p-3 bg-slate-900/80 border border-slate-700/50 rounded-xl text-white hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Catalog
              </button>
            )}
          </div>

          {/* Cart Trigger */}
          {cart.length > 0 && (
            <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-2xl w-72 text-white shadow-2xl space-y-4">
              <h4 className="text-sm font-bold flex items-center gap-2 text-[#FFC107] uppercase tracking-wider"><ShoppingCart size={16} /> Your Cart</h4>
              <div className="divide-y divide-slate-800 max-h-[120px] overflow-y-auto pr-1">
                {cart.map((itemId, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 text-xs">
                    <span className="font-semibold truncate max-w-[140px]">Ludo Item</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#FFC107]">R1200</span>
                      <button onClick={() => removeFromCart(idx)} className="text-red-400 hover:text-red-500 transition-colors p-1" aria-label="Remove item">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsCheckoutOpen(true)} className="w-full py-3 bg-[#FFC107] text-[#0F172A] font-black uppercase tracking-widest text-[10px] rounded-lg shadow-xl hover:bg-white transition-all cursor-pointer">
                Checkout (R{cart.length * 1200})
              </button>
            </div>
          )}
        </header>

        {/* Bottom Metadata & Specifications Footer */}
        <footer className="p-6 md:p-8 flex justify-end items-end w-full">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Interactive 3D Product Showcase</p>
        </footer>
      </div>

      <ShopCheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} cart={cart} clearCart={clearCart} />
    </section>
  );
};
