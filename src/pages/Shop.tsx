import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion } from 'motion/react';

export const Shop = ({ cart, setCart }: { cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const addToCart = (id: string) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);

  return (
    <section id="shop" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeader tag="Merchandise" title="Official Gear" colorClass="text-accent-teal" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {PRODUCTS.slice(0, 3).map((product: Product, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-teal-200 hover:shadow-xl transition-all duration-300 group flex flex-col shadow-md">
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-white/90 border border-slate-200 text-slate-900 text-[10px] uppercase tracking-widest font-bold rounded shadow-sm">{product.tag}</div>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-accent-teal text-[10px] font-bold uppercase tracking-widest mb-1">{product.category}</div>
                <h3 className="text-lg text-slate-900 font-bold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <span className="text-xl text-slate-900 font-display font-bold">R {product.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(product.id)} className={`p-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold shadow-sm ${cart.includes(product.id) ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-accent-teal hover:text-white'}`}>
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
