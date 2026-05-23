import React, { useEffect, useState } from 'react';
import { useScroll, useSpring } from 'motion/react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db, chatbotConfig } from './config/firebase';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { OurLeagues } from './pages/OurLeagues';
import { Tournaments } from './pages/Tournaments';
import { Academy } from './pages/Academy';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Shop } from './pages/Shop';
import { CommunityFund } from './components/features/CommunityFund';
import { ShippingReturns } from './pages/ShippingReturns';
import { CookieConsent } from './components/features/CookieConsent';
import { PrivacyPolicyModal } from './components/features/PrivacyPolicyModal';

export type Page = 'home' | 'leagues' | 'tournaments' | 'academy' | 'gallery' | 'contact' | 'shop' | 'shipping';

export default function App() {
  const [activeSection, setActiveSection] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id as Page;
          setActiveSection(sectionId);
          document.title = `The Ludo League SA | ${sectionId.toUpperCase()}`;
        }
      });
    }, { threshold: 0.4 });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => observer.observe(sec));

    const testConnection = async () => {
      try { await getDocFromServer(doc(db, 'test', 'connection')); } 
      catch (error) { console.error("Firebase offline check completed."); }
    };
    testConnection();
    
    (window as any).agencyDigitalAuditLink = chatbotConfig;
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: Page) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full bg-var(--color-bg-darkest) text-slate-50">
      <Navbar 
        scaleX={scaleX} cart={cart} wishlist={wishlist} 
        activeSection={activeSection} scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      <main className="w-full">
        {activeSection === 'shipping' ? (
          <ShippingReturns />
        ) : (
          <>
            <Home setActivePage={scrollToSection} />
            <OurLeagues />
            <Tournaments />
            <Academy />
            <Gallery />
            <Contact />
            <Shop cart={cart} setCart={setCart} />
            <CommunityFund />
          </>
        )}
        
        <footer className="py-10 text-center bg-[#041a18] flex flex-col items-center gap-4 border-t border-slate-800">
          <p className="text-xs md:text-sm font-mono text-white/60">&copy; 2026 Ludo League South Africa. All Rights Reserved.</p>
          <p className="text-xs text-white/40 font-mono">This website is coded by happyhunter.com</p>
          <div className="flex gap-6">
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="text-xs uppercase tracking-widest text-[#00c9a7] hover:text-white transition-colors font-bold underline"
            >
              Privacy Policy & Terms
            </button>
            <button 
              onClick={() => scrollToSection('shipping')}
              className="text-xs uppercase tracking-widest text-[#00c9a7] hover:text-white transition-colors font-bold underline"
            >
              Shipping & Returns
            </button>
          </div>
        </footer>
      </main>

      <CookieConsent openPrivacy={() => setIsPrivacyOpen(true)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}
