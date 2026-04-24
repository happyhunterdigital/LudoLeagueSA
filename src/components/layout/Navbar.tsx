import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, ShoppingBag, Menu, X } from 'lucide-react';
import { Page } from '../../App';

interface NavbarProps {
  scrolled: boolean;
  scaleX: any;
  cart: string[];
  wishlist: string[];
  activePage: Page;
  setActivePage: (page: Page) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  scrolled, scaleX, cart, wishlist, activePage, setActivePage, mobileMenuOpen, setMobileMenuOpen 
}) => {
  const navItems: Page[] = ['Home', 'Tournaments', 'History', 'Gallery', 'Shop'];

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-sky-400 z-[9999] origin-left" style={{ scaleX }} />
      
      <nav className={`fixed top-0 left-0 right-0 z-[1000] px-4 md:px-10 py-4 md:py-6 border-b transition-all duration-500 bg-bg-panel/95 backdrop-blur-xl ${scrolled ? 'border-teal-400/20 py-3 shadow-lg' : 'border-teal-400/10'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => handleNavClick('Home')} className="flex items-center gap-3 group">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949471/The_Ludo_League_Logo_p2pzvn.jpg" alt="Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover border border-teal-400/40 group-hover:rotate-12 transition-transform" />
            <span className="text-xl md:text-2xl font-display italic font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-teal-400 hidden sm:block">Ludo League SA</span>
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item} onClick={() => handleNavClick(item)} className={`text-[11px] uppercase tracking-[0.25rem] font-black italic transition-all ${activePage === item ? 'text-accent-teal' : 'text-white/50 hover:text-white'}`}>
                {item}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-2 pr-2 md:pr-4 border-r border-white/10">
              <button onClick={() => handleNavClick('Shop')} className="relative p-2 text-white/60 hover:text-red-500 transition-colors">
                <Heart size={18} fill={wishlist.length > 0 ? "currentColor" : "none"} className={wishlist.length > 0 ? "text-red-500" : ""} />
              </button>
              <button onClick={() => handleNavClick('Shop')} className="relative p-2 text-white/60 hover:text-accent-teal transition-colors">
                <ShoppingCart size={18} fill={cart.length > 0 ? "currentColor" : "none"} className={cart.length > 0 ? "text-accent-teal" : ""} />
                {cart.length > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-accent-teal text-bg-deep text-[9px] font-bold flex items-center justify-center rounded-full">{cart.length}</span>}
              </button>
            </div>
            
            <button onClick={() => handleNavClick('Shop')} className="hidden sm:flex items-center gap-2 px-6 py-2 bg-accent-teal text-white hover:bg-white hover:text-accent-teal transition-all uppercase text-[10px] tracking-widest font-black italic shadow-lg">
              <ShoppingBag size={14} /> Shop
            </button>
            
            <button className="md:hidden text-white p-2 hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-bg-panel border-b border-teal-400/20 py-4 px-4 flex flex-col gap-4 shadow-2xl">
            {navItems.map((item) => (
              <button key={item} onClick={() => handleNavClick(item)} className={`text-left p-3 text-sm uppercase tracking-widest font-black italic rounded-lg ${activePage === item ? 'bg-accent-teal/10 text-accent-teal' : 'text-white/70 hover:bg-white/5'}`}>
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};
