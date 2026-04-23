import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
  scaleX: any;
  cart: string[];
  wishlist: string[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, scaleX, cart, wishlist, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-sky-400 z-[9999] origin-left"
        style={{ scaleX }}
      />
      
      <nav className={`fixed top-0 left-0 right-0 z-[1000] px-10 py-6 border-b transition-all duration-500 bg-bg-panel/95 backdrop-blur-xl ${scrolled ? 'border-teal-400/20 py-4 shadow-[0_0_30px_rgba(20,184,166,0.3)]' : 'border-teal-400/10'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-4 group">
            <img
              src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949471/The_Ludo_League_Logo_p2pzvn.jpg"
              alt="Ludo League SA Logo"
              className="w-12 h-12 rounded-lg object-cover border border-teal-400/40 group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(20,184,166,0.3)]"
            />
            <span className="text-2xl font-display italic font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-teal-400">
              Ludo League SA
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Tournaments', 'History', 'Winners', 'Gallery', 'Shop', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[11px] uppercase tracking-[0.25rem] font-black italic text-white/50 hover:text-accent-teal transition-all"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 pr-4 border-r border-white/10">
              <button
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative p-2 text-white/60 hover:text-red-500 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} fill={wishlist.length > 0 ? "currentColor" : "none"} className={wishlist.length > 0 ? "text-red-500" : ""} />
              </button>
              <button
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative p-2 text-white/60 hover:text-accent-teal transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={18} fill={cart.length > 0 ? "currentColor" : "none"} className={cart.length > 0 ? "text-accent-teal" : ""} />
              </button>
            </div>
            
            <a href="#shop" className="hidden sm:flex items-center gap-2 px-6 py-2 bg-accent-teal text-white hover:bg-white hover:text-accent-teal transition-all uppercase text-[10px] tracking-widest font-black italic shadow-[0_0_20px_rgba(20,184,166,0.2)]">
              <ShoppingBag size={14} /> Shop
            </a>
            
            <button
              className="md:hidden text-white p-2 hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
