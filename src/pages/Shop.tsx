import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SectionHeader } from '../components/ui/SharedUI';

export const Shop = ({ cart, setCart }: { cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const addToCart = (id: string) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);

  return (
    <section className="relative z-10 py-10 md:py-20 px-4 md:px-10 border-t-4 border-ludo-green">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag="Merchandise" title="Official Gear" colorClass="text-ludo-green" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
          {PRODUCTS.map((product: Product) => (
            <div key={product.id} className="bg-bg-card border border-white/10 rounded-xl overflow-hidden hover:border-ludo-green/50 transition-colors group flex flex-col">
              <div className="h-56 md:h-64 overflow-hidden relative bg-black/20">
                <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-bg-deep/90 border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold rounded">{product.tag}</div>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-ludo-green text-[10px] font-bold uppercase tracking-widest mb-1">{product.category}</div>
                <h3 className="text-lg md:text-xl text-white font-bold mb-2">{product.name}</h3>
                <p className="text-white/60 text-xs md:text-sm mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-xl md:text-2xl text-white font-display font-bold">R {product.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(product.id)} className={`p-2 md:p-3 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold ${cart.includes(product.id) ? 'bg-ludo-green text-bg-deep' : 'bg-white/10 text-white hover:bg-ludo-green hover:text-bg-deep'}`}>
                    <ShoppingCart size={16} /> {cart.includes(product.id) ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
