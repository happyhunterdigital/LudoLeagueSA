import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  scaleX: any;
  cart: string[];
  wishlist: string[];
  activeSection: string;
  scrollToSection: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  openCart: () => void;
}

export function Navbar({ scaleX, cart, activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen, openCart }: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { id: 'leagues', label: 'Leagues' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'shop', label: 'Shop' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleOverlayLinkClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-colors duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          
          {/* Brand Logo - Preserved Exact Original Structure and Style */}
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-yellow rounded flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="font-display font-black text-black text-xl">LL</span>
            </div>
            <span className="font-display font-bold text-white tracking-widest uppercase hidden md:block">
              Ludo League <span className="text-brand-yellow">SA</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeSection === link.id ? 'text-brand-yellow' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <button 
              onClick={() => scrollToSection('donate')}
              className="px-5 py-2 bg-brand-yellow text-black font-bold uppercase tracking-widest text-sm hover:bg-brand-yellow-hot transition-colors rounded"
            >
              Donate
            </button>

            <button onClick={openCart} className="relative text-white hover:text-brand-yellow transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-yellow text-black text-xs font-bold flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle - md:hidden Restored to prevent rendering on desktop */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow origin-left"
          style={{ scaleX }}
        />
      </motion.nav>

      {/* System Index Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-md text-white p-6 md:p-16 flex flex-col justify-start overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex justify-between items-center w-full border-b border-white/5 pb-6">
              <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-brand-yellow" />
                <span>System Index</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:border-white/30 hover:text-brand-yellow transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            {/* Grid Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 md:mt-24 max-w-7xl mx-auto w-full">
              
              {/* 01. CIRCUIT ARENA */}
              <div className="flex flex-col gap-6">
                <span className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-2">01. Circuit Arena</span>
                <div className="flex flex-col gap-4">
                  <button onClick={() => handleOverlayLinkClick('home')} className="text-left font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white/40 hover:text-white transition-colors">Home Base</button>
                  <button onClick={() => handleOverlayLinkClick('tournaments')} className="text-left font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white/40 hover:text-white transition-colors">Tournaments</button>
                  <button onClick={() => handleOverlayLinkClick('leagues')} className="text-left font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white/40 hover:text-white transition-colors">Leagues</button>
                  <button onClick={() => handleOverlayLinkClick('history')} className="text-left font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white/40 hover:text-white transition-colors">Hall of Fame</button>
                </div>
              </div>

              {/* 02. SOCIAL IMPACT */}
              <div className="flex flex-col gap-6">
                <span className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-2">02. Social Impact</span>
                <div className="flex flex-col gap-4">
                  <button onClick={() => handleOverlayLinkClick('ludo4schools')} className="text-left font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white/40 hover:text-white transition-colors">Ludo 4 Schools</button>
                  <button onClick={() => handleOverlayLinkClick('donate')} className="relative group text-left block font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white hover:text-white transition-colors">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white group-hover:from-brand-yellow group-hover:to-brand-yellow-hot transition-colors duration-300">crowd funding</span>
                    <span className="absolute inset-0 bg-radial-gradient opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-2xl rounded-full bg-red-600/30 w-full h-full scale-150" />
                  </button>
                  <button onClick={() => handleOverlayLinkClick('about')} className="text-left font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white/40 hover:text-white transition-colors">Identity & Vision</button>
                </div>
              </div>

              {/* 03. PLATFORM ACCESS */}
              <div className="flex flex-col gap-6">
                <span className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-2">03. Platform Access</span>
                <div className="flex flex-col gap-4">
                  <button onClick={() => handleOverlayLinkClick('portal')} className="text-left font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white/40 hover:text-white transition-colors">Player Portal</button>
                  <button onClick={() => handleOverlayLinkClick('contact')} className="text-left font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white/40 hover:text-white transition-colors">Get in Touch</button>
                  <button onClick={() => handleOverlayLinkClick('admin')} className="text-left font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-white/40 hover:text-white transition-colors">Secure Console</button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
