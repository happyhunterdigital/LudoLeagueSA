 import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, ShoppingBag, Menu, X } from 'lucide-react';
import { Page } from '../../App';

interface NavbarProps {
  scaleX: any;
  cart: string[];
  wishlist: string[];
  activeSection: string;
  scrollToSection: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  scaleX, cart, wishlist, activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen 
}) => {
  // "team" is permanently removed from the navigation bar
  const navItems = ['home', 'leagues', 'tournaments', 'academy', 'gallery', 'contact'];

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e8a020] to-[#00c9a7] z-[9999] origin-left" style={{ scaleX }} />
      
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-4 md:px-10 py-4 md:py-5 bg-[#041a18]/92 backdrop-blur-md border-b border-[#00c9a7]/18 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-3 group">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949471/The_Ludo_League_Logo_p2pzvn.jpg" alt="Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover shadow-sm group-hover:rotate-12 transition-transform" />
            <span className="text-xl md:text-2xl font-display italic font-black tracking-tighter text-white hidden xl:block">Ludo League SA</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item as Page)} 
                className={`text-[11px] uppercase tracking-[0.25rem] font-black italic transition-colors ${activeSection === item ? 'text-[#e8a020]' : 'text-slate-300 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-2 pr-2 md:pr-4 border-r border-slate-600">
              <button onClick={() => scrollToSection('shop')} className="relative p-2 text-slate-300 hover:text-[#e8a020] transition-colors">
                <Heart size={18} fill={wishlist.length > 0 ? "currentColor" : "none"} className={wishlist.length > 0 ? "text-red-400" : ""} />
              </button>
              <button onClick={() => scrollToSection('shop')} className="relative p-2 text-slate-300 hover:text-[#e8a020] transition-colors">
                <ShoppingCart size={18} fill={cart.length > 0 ? "currentColor" : "none"} className={cart.length > 0 ? "text-[#e8a020]" : ""} />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e8a020] text-[#041a18] text-[9px] font-bold flex items-center justify-center rounded-full">{cart.length}</span>}
              </button>
            </div>
            
            <button onClick={() => scrollToSection('shop')} className="hidden sm:flex items-center gap-2 px-6 py-2 bg-[#e8a020] text-[#041a18] hover:bg-white transition-all uppercase text-[10px] tracking-widest font-black italic rounded-xl shadow-sm border-none">
              <ShoppingBag size={14} /> Shop
            </button>
            
            <button className="lg:hidden text-white p-2 hover:bg-slate-700 rounded-xl transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#041a18] border-t border-slate-700 py-4 px-4 flex flex-col gap-4 shadow-2xl">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollToSection(item as Page)} className={`text-left p-3 text-sm uppercase tracking-widest font-black italic rounded-xl ${activeSection === item ? 'bg-slate-800 text-[#e8a020]' : 'text-slate-300 hover:bg-slate-800'}`}>
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};
