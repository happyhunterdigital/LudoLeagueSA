import React, { useEffect, useState } from 'react';
import { useScroll, useSpring } from 'motion/react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db, chatbotConfig } from './config/firebase';
import { Navbar } from './components/layout/Navbar';
import { LandingHero } from './components/features/LandingHero';
import { About } from './pages/About';
import { Leagues } from './pages/Leagues';
import { Tournaments } from './pages/Tournaments';
import { History } from './pages/History';
import { Gallery } from './pages/Gallery';
import { Shop } from './pages/Shop';
import { CommunityFund } from './components/features/CommunityFund';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { BotkGallery } from './pages/BotkGallery';
import { NewsUpdates } from './pages/NewsUpdates';
import { Faqs } from './pages/Faqs';
import { CookieConsent } from './components/features/CookieConsent';
import { PrivacyPolicyModal } from './components/features/PrivacyPolicyModal';

export type Page = 'Landing' | 'Home' | 'Leagues' | 'Tournaments' | 'History' | 'Gallery' | 'Shop' | 'Contact' | 'Admin' | 'BotkGallery' | 'NewsUpdates' | 'Faqs';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const standalonePages = ['admin', 'botkgallery', 'newsupdates', 'faqs'];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('page') === 'admin') {
      setActiveSection('admin');
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const isStandalone = standalonePages.includes(activeSection.toLowerCase());
        if (entry.isIntersecting && !isStandalone && params.get('page') !== 'admin') {
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
      catch (error) { console.error("Firebase offline"); }
    };
    testConnection();
    
    (window as any).agencyDigitalAuditLink = chatbotConfig;
    return () => observer.disconnect();
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    if (standalonePages.includes(activeSection.toLowerCase())) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setActiveSection(id.toLowerCase());
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
        {activeSection === 'admin' && <AdminDashboard />}
        {activeSection === 'botkgallery' && <BotkGallery />}
        {activeSection === 'newsupdates' && <NewsUpdates />}
        {activeSection === 'faqs' && <Faqs />}
        
        {!standalonePages.includes(activeSection.toLowerCase()) && (
          <>
            <LandingHero scrollToSection={scrollToSection} />
            <About />
            <Leagues setActivePage={(p) => setActiveSection(p.toLowerCase())} />
            <Tournaments />
            <History />
            <Gallery />
            <Shop cart={cart} setCart={setCart} />
            <CommunityFund />
            <Contact />
          </>
        )}
        
        <footer className="py-10 text-center bg-[#0F172A] flex flex-col items-center gap-6 border-t border-slate-800">
          <p className="text-xs md:text-sm font-mono text-white/60">&copy; 2026 Ludo League South Africa. All Rights Reserved.</p>
          
          {/* Proper, Modern Social Media Icons using verified SVG paths */}
          <div className="flex items-center gap-4">
            <a href="https://x.com/TheLudoLeagueSA" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#0EA5E9] hover:bg-slate-800 hover:scale-110 transition-all shadow-md" aria-label="X / Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@ludoleaguesa" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#0EA5E9] hover:bg-slate-800 hover:scale-110 transition-all shadow-md" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.93-1.78-.22-.2-.42-.43-.61-.67-.01 2.37.01 4.75-.01 7.12-.11 1.15-.49 2.33-1.22 3.23-.74.92-1.8 1.55-2.94 1.81-1.17.26-2.43.14-3.52-.37-1.11-.53-2.02-1.47-2.48-2.61-.46-1.13-.48-2.41-.05-3.52.41-1.07 1.23-1.97 2.24-2.49 1.11-.57 2.41-.69 3.59-.34v4.14c-.69-.2-1.45-.11-2.05.24-.59.35-.98.98-1.05 1.67-.07.72.22 1.48.78 1.93.57.45 1.34.52 1.95.2.62-.31 1.01-.98 1.01-1.68V.02z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/18sGYSyF2b/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#0EA5E9] hover:bg-slate-800 hover:scale-110 transition-all shadow-md" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/joe-setladi-10124031" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#0EA5E9] hover:border-[#0EA5E9] transition-all" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://wa.me/27725578097" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 hover:text-white hover:border-[#0EA5E9] hover:bg-slate-800 hover:scale-110 transition-all shadow-md" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-[#0EA5E9]">
            <button onClick={() => setActiveSection('newsupdates')} className="hover:text-white transition-colors underline">News & Updates</button>
            <button onClick={() => setActiveSection('faqs')} className="hover:text-white transition-colors underline">FAQs</button>
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
