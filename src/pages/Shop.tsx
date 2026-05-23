import React, { useState } from 'react';
import { ShoppingCart, Tag, Eye, Info, X } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SectionHeader } from '../components/ui/SharedUI';
import { motion, AnimatePresence } from 'motion/react';
import { ShopCheckoutModal } from '../components/features/ShopCheckoutModal';

export const Shop = ({ cart, setCart }: { cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
                <div className="flex gap-2 mb-4">
                  <button onClick={() => setSelectedProduct(product)} className="flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-[#0EA5E9] bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700"><Eye size={12} /> View Specs</button>
                </div>
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

      {/* Specifications Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white border border-slate-200 p-8 rounded-[20px] shadow-2xl z-10 text-[#001F3F] max-h-[85vh] overflow-y-auto">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 rounded-lg hover:bg-slate-100 transition-colors"><X size={20} /></button>
              <div className="flex items-center gap-2 text-[#0EA5E9] mb-4"><Info size={20} /><h3 className="text-xl font-display font-black italic uppercase">Product Details</h3></div>
              <div className="space-y-4 text-sm">
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Sold By:</span><span className="w-2/3 font-black text-[#0EA5E9]">The Ludo League</span></div>
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Brand:</span><span className="w-2/3 font-medium">Idaltes</span></div>
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Type:</span><span className="w-2/3 font-medium">Dice Game</span></div>
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Material:</span><span className="w-2/3 font-medium">Wood, Card Board</span></div>
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Game Type:</span><span className="w-2/3 font-medium">Pro Ludo (Non-Rechargeable)</span></div>
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Dimensions:</span><span className="w-2/3 font-medium">Width: 76 cm | Height: 0.3 cm | Depth: 76 cm</span></div>
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Weight:</span><span className="w-2/3 font-medium">3 kg</span></div>
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Skillset:</span><span className="w-2/3 font-medium leading-relaxed">Analysis & Critical Thinking, Creativity & Imagination, Hand & Eye Co-ordination, Problem Solving</span></div>
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Minimum Age:</span><span className="w-2/3 font-medium">4+ Years</span></div>
                <div className="flex border-b pb-2"><span className="w-1/3 text-slate-500 font-bold">Packaging Type:</span><span className="w-2/3 font-medium">Box (Pack of 1)</span></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ShopCheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart} 
        clearCart={clearCart} 
      />
    </section>
  );
};
