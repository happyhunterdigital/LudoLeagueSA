import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingCart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
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
  const [aboutHover, setAboutHover] = useState(false);
  const navItems: Page[] = ['Home', 'Leagues', 'Tournaments', 'History', 'Gallery', 'Shop', 'Contact'];

  const handleNavClick = (item: Page) => {
    scrollToSection(item.toLowerCase() === 'home' ? 'home' : item.toLowerCase());
  };

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FFD700] to-[#FFC107] z-[9999] origin-left" style={{ scaleX }} />

      <nav className="fixed top-0 left-0 right-0 z-[1000] px-4 md:px-8 py-4 transition-all duration-500 bg-[#2C3E50] shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949471/The_Ludo_League_Logo_p2pzvn.jpg" alt="Logo" className="w-9 h-9 md:w-11 md:h-11 rounded-xl object-cover shadow-sm group-hover:rotate-12 transition-transform" />
            <span className="text-lg md:text-xl font-display italic font-black tracking-tight text-white">Ludo League SA</span>
          </button>

          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            <button onClick={() => handleNavClick('Home')} className={`text-[10px] xl:text-[11px] uppercase tracking-wider xl:tracking-[0.2rem] font-black italic transition-colors ${activeSection === 'home' ? 'text-[#FFD700]' : 'text-slate-300 hover:text-white'}`}>
              Home
            </button>

            <div 
              className="relative py-2"
              onMouseEnter={() => setAboutHover(true)}
              onMouseLeave={() => setAboutHover(false)}
            >
              <button 
                onClick={() => handleNavClick('About')}
                className={`text-[10px] xl:text-[11px] uppercase tracking-wider xl:tracking-[0.2rem] font-black italic transition-colors flex items-center gap-1 ${activeSection === 'about' || activeSection === 'faqs' ? 'text-[#FFD700]' : 'text-slate-300 hover:text-white'}`}
              >
                About <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {aboutHover && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 bg-[#2C3E50] border border-slate-700 rounded-xl shadow-2xl p-1.5 w-48 flex flex-col gap-0.5 z-[2000] mt-1"
                  >
                    <button onClick={() => { scrollToSection('about'); setAboutHover(false); }} className="text-left text-[9px] uppercase font-black tracking-wider text-slate-300 hover:text-[#FFD700] p-2.5 hover:bg-slate-800 rounded-lg transition-colors">Identity & Vision</button>
                    <button onClick={() => { scrollToSection('faqs'); setAboutHover(false); }} className="text-left text-[9px] uppercase font-black tracking-wider text-slate-300 hover:text-[#FFD700] p-2.5 hover:bg-slate-800 rounded-lg transition-colors">FAQs & Rules</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.slice(1).map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-[10px] xl:text-[11px] uppercase tracking-wider xl:tracking-[0.2rem] font-black italic transition-colors ${activeSection === item.toLowerCase() ? 'text-[#FFD700]' : 'text-slate-300 hover:text-white'}`}
              >
                {item}
              </button>
            ))}

            <button onClick={() => handleNavClick('portal' as Page)} className={`text-[10px] xl:text-[11px] uppercase tracking-wider xl:tracking-[0.2rem] font-black italic transition-colors ${activeSection === 'portal' ? 'text-[#FFD700]' : 'text-slate-300 hover:text-white'}`}>
              My Portal
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            <div className="flex items-center gap-1 pr-1.5 sm:pr-3 border-r border-slate-600">
              <button onClick={() => scrollToSection('shop')} className="relative p-1.5 text-slate-300 hover:text-[#FFD700] transition-colors">
                <Heart size={16} fill={wishlist.length > 0 ? "currentColor" : "none"} className={wishlist.length > 0 ? "text-red-400" : ""} />
              </button>
              <button onClick={() => scrollToSection('shop')} className="relative p-1.5 text-slate-300 hover:text-[#FFD700] transition-colors">
                <ShoppingCart size={16} fill={cart.length > 0 ? "currentColor" : "none"} className={cart.length > 0 ? "text-[#FFD700]" : ""} />
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#FFD700] text-[#2C3E50] text-[8px] font-bold flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            <button onClick={() => scrollToSection('shop')} className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-[#FFD700] text-[#2C3E50] hover:bg-white transition-all uppercase text-[9px] tracking-widest font-black italic rounded-lg shadow-sm">
              <ShoppingBag size={12} /> Shop
            </button>

            <button className="lg:hidden text-white p-1.5 hover:bg-slate-700 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#2C3E50] border-t border-slate-700 py-3 px-4 flex flex-col gap-3 shadow-2xl">
            <button onClick={() => { scrollToSection('home'); setMobileMenuOpen(false); }} className="text-left p-2.5 text-xs uppercase tracking-wider font-black italic rounded-lg text-slate-300 hover:bg-slate-800">Home</button>
            <button onClick={() => { scrollToSection('about'); setMobileMenuOpen(false); }} className="text-left p-2.5 text-xs uppercase tracking-wider font-black italic rounded-lg text-slate-300 hover:bg-slate-800">Identity & Vision</button>
            <button onClick={() => { scrollToSection('faqs'); setMobileMenuOpen(false); }} className="text-left p-2.5 text-xs uppercase tracking-wider font-black italic rounded-lg text-slate-300 hover:bg-slate-800">FAQs & Rules</button>
            {navItems.slice(1).map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-left p-2.5 text-xs uppercase tracking-wider font-black italic rounded-lg ${activeSection === item.toLowerCase() ? 'bg-slate-800 text-[#FFD700]' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                {item}
              </button>
            ))}
            <button onClick={() => { scrollToSection('portal'); setMobileMenuOpen(false); }} className="text-left p-2.5 text-xs uppercase tracking-wider font-black italic rounded-lg text-slate-300 hover:bg-slate-800">My Portal</button>
          </div>
        )}
      </nav>
    </>
  );
};
