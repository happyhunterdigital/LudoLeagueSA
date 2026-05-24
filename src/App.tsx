import React, { useEffect, useState } from 'react';
import { useScroll, useSpring } from 'motion/react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db, chatbotConfig } from './config/firebase';
import { Navbar } from './components/layout/Navbar';
import { LandingHero } from './components/features/LandingHero';
import { About } from './pages/About';
import { Tournaments } from './pages/Tournaments';
import { History } from './pages/History';
import { Gallery } from './pages/Gallery';
import { Shop } from './pages/Shop';
import { CommunityFund } from './components/features/CommunityFund';
import { AdminDashboard } from './pages/AdminDashboard';
import { CookieConsent } from './components/features/CookieConsent';
import { PrivacyPolicyModal } from './components/features/PrivacyPolicyModal';

export type Page = 'Landing' | 'Home' | 'Tournaments' | 'History' | 'Gallery' | 'Shop' | 'Admin';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('page') === 'admin') {
      setActiveSection('admin');
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && params.get('page') !== 'admin') {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          document.title = `Ludo League SA | ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
          window.history.replaceState(null, '', `#${sectionId}`);
          
          const themeColorMeta = document.querySelector('meta[name="theme-color"]');
          if (themeColorMeta) {
            const colors: Record<string, string> = { home: '#FFFFFF', about: '#0F172A', tournaments: '#0EA5E9', history: '#0F172A', gallery: '#0EA5E9', shop: '#0F172A', fund: '#0EA5E9' };
            themeColorMeta.setAttribute('content', colors[sectionId] || '#FFFFFF');
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
    if (activeSection === 'admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
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
        {activeSection === 'admin' ? (
          <AdminDashboard />
        ) : (
          <>
            <LandingHero scrollToSection={scrollToSection} />
            <About />
            <Tournaments />
            <History />
            <Gallery />
            <Shop cart={cart} setCart={setCart} />
            <CommunityFund />
          </>
        )}
        
        <footer className="py-10 text-center bg-[#0F172A] flex flex-col items-center gap-4 border-t border-slate-800">
          <p className="text-xs md:text-sm font-mono text-white/60">&copy; 2026 Ludo League South Africa. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <a href="https://x.com/TheLudoLeagueSA" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all">X</a>
            <a href="https://www.tiktok.com/@ludoleaguesa" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all">TT</a>
            <a href="https://www.facebook.com/share/18sGYSyF2b/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all">FB</a>
            <a href="https://www.linkedin.com/in/joe-setladi-10124031" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all">LN</a>
            <a href="https://wa.me/27725578097" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all">WA</a>
          </div>

          <p className="text-xs text-white/40 font-mono">This website is coded by happyhunter.com</p>
          <button onClick={() => setIsPrivacyOpen(true)} className="text-xs uppercase tracking-widest text-[#0EA5E9] hover:text-white transition-colors font-bold underline">Privacy Policy & Terms</button>
        </footer>
      </main>

      <CookieConsent openPrivacy={() => setIsPrivacyOpen(true)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
 }
