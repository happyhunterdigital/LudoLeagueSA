import React, { useState } from 'react';
import { ShoppingCart, Tag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion } from 'motion/react';
import { ShopCheckoutModal } from '../components/features/ShopCheckoutModal';

export const Shop = ({ cart, setCart }: { cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const addToCart = (id: string) => setCart(prev => [...prev, id]);
  const removeFromCart = (indexToRemove: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };
  const clearCart = () => setCart([]);

  return (
    <section id="shop" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeader tag="Merchandise" title="Official Gear" colorClass="text-white" />
        
        {cart.length > 0 && (
          <div className="bg-[#1E293B] border border-slate-700 p-6 rounded-2xl mb-8 max-w-2xl mx-auto text-white">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#FFC107]"><ShoppingCart /> Your Cart</h4>
            <div className="divide-y divide-slate-700 mb-6">
              {cart.map((itemId, idx) => {
                const product = PRODUCTS.find(p => p.id === itemId);
                if (!product) return null;
                return (
                  <div key={idx} className="flex justify-between items-center py-3">
                    <span className="text-sm font-semibold truncate max-w-[200px] sm:max-w-[400px]">{product.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-[#FFC107]">R{product.price}</span>
                      <button onClick={() => removeFromCart(idx)} className="text-red-400 hover:text-red-500 transition-colors p-1" aria-label="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setIsCheckoutOpen(true)} className="w-full btn-action bg-[#FFC107] text-[#0F172A] font-black uppercase tracking-widest shadow-xl">
              Proceed to Checkout (R{cart.reduce((sum, id) => sum + (PRODUCTS.find(p => p.id === id)?.price || 0), 0)})
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {PRODUCTS.map((product: Product, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={product.id} className="bg-[#1E293B] border border-slate-700 p-0 flex flex-col overflow-hidden rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative bg-white">
                <div className="absolute top-3 left-3 z-10 px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded shadow-sm bg-white text-[#0F172A] flex items-center gap-1 border border-slate-200">
                  <Tag size={12} className="text-red-500 animate-pulse" /> {product.tag}
                </div>
                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-[#0EA5E9] text-[10px] font-bold uppercase tracking-widest mb-1">{product.category}</div>
                <h3 className="text-lg font-bold mb-2 text-white h-12 leading-tight">{product.name}</h3>
                <p className="text-slate-400 text-xs mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-xs text-red-400 line-through font-bold">R {product.originalPrice.toFixed(2)}</span>
                    )}
                    <span className="text-2xl font-display font-black text-[#FFC107]">R {product.price.toFixed(2)}</span>
                  </div>
                  <button onClick={() => addToCart(product.id)} className="p-2 px-4 bg-[#0F172A] text-white border border-slate-600 rounded-xl hover:bg-[#0EA5E9] transition-colors flex items-center gap-2 text-sm font-bold shadow-sm">
                    <ShoppingCart size={16} /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ShopCheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart} 
        clearCart={clearCart} 
      />
    </section>
  );
};
