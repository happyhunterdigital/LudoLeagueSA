import React, { useEffect, useState, useRef } from 'react';
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
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    // 1. Intersection Observer for Scroll Tracking & Dynamic Browser UI
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          // Dynamically change browser title to feel like a "new page"
          document.title = `Ludo League SA | ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
          // Silently update URL without triggering a jump
          window.history.replaceState(null, '', `#${sectionId}`);
        }
      });
    }, { threshold: 0.5 }); // Triggers when section is 50% visible

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => observer.observe(sec));

    // 2. Validate Connection to Firestore
    const testConnection = async () => {
      try { await getDocFromServer(doc(db, 'test', 'connection')); } 
      catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Firebase configuration check required.");
        }
      }
    };
    testConnection();
    
    // 3. Neural Link Secured
    console.log(`[Neural Link Secured] Chatbot model strictly set to: ${chatbotConfig.model}`);
    console.log(`[Audit Targeted] Initiating evaluation for: ${chatbotConfig.agencyAuditTarget}`);
    console.log(`[Focus Status] Target scope confirmed: ${chatbotConfig.focus}`);
    (window as any).agencyDigitalAuditLink = chatbotConfig;
    
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative h-screen w-full bg-bg-deep selection:bg-white selection:text-black font-sans overflow-hidden">
      <Navbar 
        scaleX={scaleX} cart={cart} wishlist={wishlist} 
        activeSection={activeSection} scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      {/* Scroll-Snapped Container */}
      <main 
        ref={scrollContainerRef}
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        <LandingHero scrollToSection={scrollToSection} />
        <Tournaments />
        <History />
        <Gallery />
        <Shop cart={cart} setCart={setCart} />
        
        {/* Footer contained within the last snap element */}
        <section className="h-auto snap-end bg-bg-panel py-10 text-center border-t border-white/10">
          <p className="text-white/40 text-xs md:text-sm font-mono">&copy; 2025 Ludo League South Africa. All Rights Reserved.</p>
        </section>
      </main>
    </div>
  );
}
