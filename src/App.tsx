import React, { useEffect, useState } from 'react';
import { useScroll, useSpring } from 'motion/react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db, chatbotConfig } from './config/firebase';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Tournaments } from './pages/Tournaments';
import { History } from './pages/History';
import { Gallery } from './pages/Gallery';
import { Shop } from './pages/Shop';

export type Page = 'Home' | 'Tournaments' | 'History' | 'Gallery' | 'Shop';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState<Page>('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Validate Connection to Firestore
    const testConnection = async () => {
      try { await getDocFromServer(doc(db, 'test', 'connection')); } 
      catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Firebase configuration check required.");
        }
      }
    };
    testConnection();
    
    // Neural Link Secured
    console.log(`[Neural Link Secured] Chatbot model strictly set to: ${chatbotConfig.model}`);
    console.log(`[Audit Targeted] Initiating evaluation for: ${chatbotConfig.agencyAuditTarget}`);
    console.log(`[Focus Status] Target scope confirmed: ${chatbotConfig.focus}`);
    (window as any).agencyDigitalAuditLink = chatbotConfig;
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPageTheme = () => {
    switch(activePage) {
      case 'Tournaments': return 'from-ludo-red/10 to-bg-deep';
      case 'History': return 'from-ludo-yellow/10 to-bg-deep';
      case 'Gallery': return 'from-ludo-blue/10 to-bg-deep';
      case 'Shop': return 'from-ludo-green/10 to-bg-deep';
      default: return 'from-accent-teal/10 to-bg-deep';
    }
  };

  return (
    <div className={`relative min-h-screen bg-bg-deep bg-gradient-to-b ${getPageTheme()} selection:bg-white selection:text-black font-sans transition-colors duration-1000`}>
      <Navbar 
        scrolled={scrolled} scaleX={scaleX} cart={cart} wishlist={wishlist} 
        activePage={activePage} setActivePage={setActivePage}
        mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      <div className="h-24 md:h-32"></div>

      <main className="min-h-[80vh]">
        {activePage === 'Home' && <Home setActivePage={setActivePage} />}
        {activePage === 'Tournaments' && <Tournaments />}
        {activePage === 'History' && <History />}
        {activePage === 'Gallery' && <Gallery />}
        {activePage === 'Shop' && <Shop cart={cart} setCart={setCart} />}
      </main>

      <footer className="bg-bg-panel py-10 text-center border-t border-white/10 mt-20">
        <p className="text-white/40 text-xs md:text-sm font-mono">&copy; 2025 Ludo League South Africa. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
