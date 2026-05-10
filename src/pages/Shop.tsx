import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/ui/SharedUI';

export const Shop = ({ cart, setCart }: { cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const addToCart = (id: string) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);

  return (
    <section id="shop" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeader tag="Merchandise" title="Official Gear" colorClass="text-white" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {PRODUCTS.slice(0, 3).map((product: Product, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={product.id} className="bg-[#1E293B] border border-slate-700 p-0 flex flex-col overflow-hidden rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative bg-white">
                <div className="absolute top-3 left-3 z-10 px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded shadow-sm bg-white text-[#0F172A]">
                  {product.tag}
                </div>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-[#0EA5E9] text-[10px] font-bold uppercase tracking-widest mb-1">{product.category}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{product.name}</h3>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                  <span className="text-xl font-display font-bold text-[#FFC107]">R {product.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(product.id)} className={`p-2 px-4 rounded-xl transition-colors flex items-center gap-2 text-sm font-bold shadow-sm ${cart.includes(product.id) ? 'bg-[#0EA5E9] text-white' : 'bg-[#0F172A] text-white border border-slate-600 hover:bg-[#0EA5E9]'}`}>
                    <ShoppingCart size={16} /> {cart.includes(product.id) ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
