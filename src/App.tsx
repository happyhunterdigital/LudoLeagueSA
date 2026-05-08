import React, { useEffect, useState } from 'react';
import { useScroll, useSpring } from 'motion/react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db, chatbotConfig } from './config/firebase';
import { Navbar } from './components/layout/Navbar';
import { LandingHero } from './components/features/LandingHero';
import { Tournaments } from './pages/Tournaments';
import { History } from './pages/History';
import { Gallery } from './pages/Gallery';
import { Shop } from './pages/Shop';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          document.title = `Ludo League SA | ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
          window.history.replaceState(null, '', `#${sectionId}`);
        }
      });
    }, { threshold: 0.4 }); 

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => observer.observe(sec));

    const testConnection = async () => {
      try { await getDocFromServer(doc(db, 'test', 'connection')); } 
      catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Firebase configuration check required.");
        }
      }
    };
    testConnection();
    
    (window as any).agencyDigitalAuditLink = chatbotConfig;
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const getDynamicBackground = () => {
    switch(activeSection) {
      case 'tournaments': return 'bg-red-50';
      case 'history': return 'bg-amber-50';
      case 'gallery': return 'bg-blue-100'; // Light Navy/Blue influence
      case 'shop': return 'bg-teal-50';
      default: return 'bg-slate-50'; // Default Light Navy tint
    }
  };

  return (
    <div className={`relative w-full ${getDynamicBackground()} transition-colors duration-1000 ease-in-out text-slate-900 font-sans`}>
      <Navbar 
        scaleX={scaleX} cart={cart} wishlist={wishlist} 
        activeSection={activeSection} scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      <main className="w-full">
        <LandingHero scrollToSection={scrollToSection} />
        <Tournaments />
        <History />
        <Gallery />
        <Shop cart={cart} setCart={setCart} />
        
        <footer className="bg-slate-900 py-10 text-center border-t border-slate-800">
          <p className="text-white/40 text-xs md:text-sm font-mono">&copy; 2025 Ludo League South Africa. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
}
