import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Heart, ShoppingCart, X, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  scaleX: any;
  cart: string[];
  wishlist: string[];
  activeSection: string;
  scrollToSection: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

interface NavigationLink {
  id: string;
  label: string;
}

interface NavigationGroup {
  categoryName: string;
  links: NavigationLink[];
}

const CONSOLIDATED_MENU: NavigationGroup[] = [
  {
    categoryName: "01. Circuit Arena",
    links: [
      { id: "home", label: "Home Base" },
      { id: "tournaments", label: "Tournaments Circuit" },
      { id: "leagues", label: "Township Leagues" },
      { id: "history", label: "Hall of Fame" },
      { id: "gallery", label: "Action Gallery" }
    ]
  },
  {
    categoryName: "02. Social Impact",
    links: [
      { id: "ludo4schools", label: "Ludo 4 Schools" },
      { id: "donate", label: "Community Fund" },
      { id: "about", label: "Identity & Vision" }
    ]
  },
  {
    categoryName: "03. Platform Access",
    links: [
      { id: "portal", label: "Player Portal" },
      { id: "contact", label: "Get In Touch" },
      { id: "admin", label: "Secure Console" }
    ]
  }
];

const canvasVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.04
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.02,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

export const Navbar: React.FC<NavbarProps> = ({
  scaleX,
  cart,
  wishlist,
  activeSection,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  
  const elasticPhysics = { damping: 45, stiffness: 450, mass: 0.35 };
  const smoothX = useSpring(pointerX, elasticPhysics);
  const smoothY = useSpring(pointerY, elasticPhysics);

  const toggleOverlayMenu = () => {
    if (!mobileMenuOpen) {
      setHoveredLink(null);
    }
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigationTrigger = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      scrollToSection(id);
    }, 250);
  };

  useEffect(() => {
    const processCursorMovement = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };

    if (mobileMenuOpen) {
      window.addEventListener("mousemove", processCursorMovement);
    }
    return () => window.removeEventListener("mousemove", processCursorMovement);
  }, [mobileMenuOpen, pointerX, pointerY]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FFD700] to-[#E6C200] z-[9999] origin-left" 
        style={{ scaleX }} 
      />

      <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 md:px-12 py-5 bg-black/95 backdrop-blur-md border-b border-neutral-900 select-none transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <button 
            onClick={() => handleNavigationTrigger("home")} 
            className="flex items-center gap-3 group tracking-normal select-none"
          >
            <img 
              src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949471/The_Ludo_League_Logo_p2pzvn.jpg" 
              alt="LLSA Branding Badge" 
              className="w-10 h-10 rounded-xl object-cover border border-neutral-800 transition-transform duration-500 group-hover:rotate-6" 
            />
            <span className="text-base font-display italic font-black uppercase tracking-tight text-white group-hover:text-[#FFD700] transition-colors">
              Ludo League SA
            </span>
          </button>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-1.5 pr-3 sm:pr-5 border-r border-neutral-800">
              <button 
                onClick={() => handleNavigationTrigger("shop")} 
                className="relative p-2 text-neutral-400 hover:text-[#FFD700] transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} fill={wishlist.length > 0 ? "#FFD700" : "none"} className={wishlist.length > 0 ? "text-[#FFD700]" : ""} />
              </button>
              <button 
                onClick={() => handleNavigationTrigger("shop")} 
                className="relative p-2 text-neutral-400 hover:text-[#FFD700] transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={18} fill={cart.length > 0 ? "#FFD700" : "none"} className={cart.length > 0 ? "text-[#FFD700]" : ""} />
                {cart.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#FFD700] text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-md">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            <button 
              onClick={() => handleNavigationTrigger("shop")} 
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-neutral-900 border border-neutral-800 hover:border-[#FFD700] text-white hover:text-[#FFD700] font-black uppercase text-[10px] tracking-widest rounded-xl transition-all"
            >
              Equipment Shop
            </button>

            <button
              onClick={toggleOverlayMenu}
              className="px-4 py-2.5 bg-[#FFD700] text-black font-black uppercase text-[10px] tracking-widest rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95"
              aria-label="Open Navigation Index"
            >
              MENU
              <div className="flex flex-col gap-0.5 w-3">
                <span className="w-full h-0.5 bg-black" />
                <span className="w-full h-0.5 bg-black" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: hoveredLink ? 1.8 : 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed top-0 left-0 w-8 h-8 border-2 border-[#FFD700] rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
              style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
              }}
            />

            <motion.div
              variants={canvasVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[9000] bg-black text-white flex flex-col justify-between p-8 md:p-12 overflow-y-auto"
            >
              <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto py-4 border-b border-neutral-900">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2">
                  <ShieldAlert size={12} className="text-[#FFD700]" /> SYSTEM INDEX
                </span>
                <button 
                  onClick={toggleOverlayMenu} 
                  className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:border-[#FFD700] transition-colors"
                >
                  <X size={14} /> Close
                </button>
              </div>

              <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 my-auto py-12">
                {CONSOLIDATED_MENU.map((group, groupIdx) => (
                  <motion.div 
                    key={groupIdx} 
                    variants={columnVariants}
                    className="flex flex-col space-y-6"
                  >
                    <h3 className="text-xs font-black tracking-widest uppercase text-neutral-600 border-b border-neutral-900 pb-2">
                      {group.categoryName}
                    </h3>
                    <div className="flex flex-col space-y-1">
                      {group.links.map((link) => {
                        const isSelected = activeSection === link.id;
                        const isAnyHovered = hoveredLink !== null;
                        const isSelfHovered = hoveredLink === link.id;

                        return (
                          <div key={link.id} className="overflow-hidden py-1">
                            <button
                              onClick={() => handleNavigationTrigger(link.id)}
                              onMouseEnter={() => setHoveredLink(link.id)}
                              onMouseLeave={() => setHoveredLink(null)}
                              className="w-full text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase italic tracking-tighter transition-all duration-300 ease-thonik-ease hover:pl-4 flex items-center justify-between group"
                              style={{
                                color: isSelfHovered 
                                  ? "#FFD700" 
                                  : isAnyHovered 
                                    ? "rgba(255,255,255,0.15)" 
                                    : isSelected 
                                      ? "#FFFFFF" 
                                      : "rgba(255,255,255,0.4)"
                              }}
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight 
                                size={24} 
                                className={`text-[#FFD700] transition-transform duration-300 ${isSelfHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} 
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="w-full max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] tracking-widest uppercase text-neutral-500 pt-6 border-t border-neutral-900">
                <div><p className="font-bold text-neutral-400 mb-1">Corporate HQ</p><p>Pretoria, Gauteng, ZA</p></div>
                <div><p className="font-bold text-neutral-400 mb-1">Administrative Mail</p><p>info@ludoleague.co.za</p></div>
                <div><p className="font-bold text-neutral-400 mb-1">Ecosystem Engineers</p><p className="text-white">Happy Hunter Smart Marketing</p></div>
                <div className="text-right self-end font-mono text-neutral-700">©2026 CIRCUIT CONFIG</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
