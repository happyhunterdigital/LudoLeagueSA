import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';

interface ShopGridProps {
  addToCart: (id: string) => void;
  cart: string[];
}

export const ShopGrid: React.FC<ShopGridProps> = ({ addToCart, cart }) => {
  return (
    <section id="shop" className="relative z-10 py-32 px-10 border-b border-teal-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tight">Official Gear</h2>
          <div className="w-24 h-1 bg-accent-teal mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product: Product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-card border border-white/10 rounded-xl overflow-hidden hover:border-accent-teal/50 transition-colors group"
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-bg-deep/80 backdrop-blur-sm border border-white/10 text-white text-xs uppercase tracking-widest font-bold rounded">
                  {product.tag}
                </div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-2">{product.category}</div>
                <h3 className="text-xl text-white font-bold mb-2">{product.name}</h3>
                <p className="text-white/60 text-sm mb-6 h-10">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-white font-display font-bold">R {product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product.id)}
                    className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${
                      cart.includes(product.id) 
                        ? 'bg-accent-teal text-bg-deep' 
                        : 'bg-white/5 text-white hover:bg-accent-teal hover:text-bg-deep'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {cart.includes(product.id) ? 'Added' : 'Add'}
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
