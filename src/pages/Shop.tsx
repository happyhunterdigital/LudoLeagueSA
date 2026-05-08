import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { motion } from 'motion/react';

export const Shop = ({ cart, setCart }: { cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const addToCart = (id: string) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);

  return (
    <section id="shop" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 border-b" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="tag-status mb-6">Merchandise</div>
          <h2 className="text-6xl md:text-8xl font-display font-black mb-8 uppercase italic leading-none">Official Gear</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {PRODUCTS.map((product: Product, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={product.id} className="theme-card p-0 flex flex-col overflow-hidden">
              <div className="h-48 overflow-hidden relative border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg)' }}>
                <div className="absolute top-3 left-3 z-10 px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded shadow-sm backdrop-blur-md border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text)' }}>
                  {product.tag}
                </div>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>{product.category}</div>
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-xl font-display font-bold">R {product.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(product.id)} className={`p-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold shadow-sm`} style={{ backgroundColor: cart.includes(product.id) ? 'var(--text)' : 'var(--accent)', color: 'var(--bg)' }}>
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
