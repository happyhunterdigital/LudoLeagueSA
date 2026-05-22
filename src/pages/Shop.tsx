import React, { useState } from 'react';
import { ShoppingCart, Tag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion } from 'motion/react';
import { ShopCheckoutModal } from '../components/features/ShopCheckoutModal';

export const Shop = ({ cart, setCart }: { cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const addToCart = (id: string) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);
  const clearCart = () => setCart([]);

  return (
    <section id="shop" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeader tag="Merchandise" title="Official Gear" colorClass="text-white" />
        
        {cart.length > 0 && (
          <div className="flex justify-end mb-8 max-w-7xl mx-auto">
            <button onClick={() => setIsCheckoutOpen(true)} className="btn-action bg-[#FFC107] text-[#0F172A] font-black uppercase tracking-widest shadow-xl">
              Proceed to Checkout ({cart.length} items)
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
                  <button onClick={() => addToCart(product.id)} className={`p-2 px-4 rounded-xl transition-colors flex items-center gap-2 text-sm font-bold shadow-sm ${cart.includes(product.id) ? 'bg-[#0EA5E9] text-white' : 'bg-[#0F172A] text-white border border-slate-600 hover:bg-[#0EA5E9]'}`}>
                    <ShoppingCart size={16} /> {cart.includes(product.id) ? 'Added' : 'Add'}
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
