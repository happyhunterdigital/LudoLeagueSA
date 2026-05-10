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
import { CookieConsent } from './components/features/CookieConsent';
import { PrivacyPolicyModal } from './components/features/PrivacyPolicyModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
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
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          document.title = `Ludo League SA | ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
          window.history.replaceState(null, '', `#${sectionId}`);
          
          const themeColorMeta = document.querySelector('meta[name="theme-color"]');
          if (themeColorMeta) {
            // Mobile browser header color matches the #2C3E50 Navbar Roof
            themeColorMeta.setAttribute('content', '#2C3E50');
          }
        }
      });
    }, { threshold: 0.4 }); 

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => observer.observe(sec));

    const testConnection = async () => {
      try { await getDocFromServer(doc(db, 'test', 'connection')); } 
      catch (error) { console.error("Firebase offline"); }
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

  return (
    <div className={`theme-${activeSection} relative w-full font-sans transition-colors duration-700 ease-in-out`}>
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
        
        <footer className="py-10 text-center border-t border-slate-200 flex flex-col items-center gap-4" style={{ backgroundColor: 'var(--bg-bottom)' }}>
          <p className="text-xs md:text-sm font-mono opacity-60">&copy; 2025 Ludo League South Africa. All Rights Reserved.</p>
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="text-xs uppercase tracking-widest hover:opacity-100 transition-opacity font-bold underline"
            style={{ color: 'var(--text)' }}
          >
            Privacy Policy & Terms
          </button>
        </footer>
      </main>

      <CookieConsent openPrivacy={() => setIsPrivacyOpen(true)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}
