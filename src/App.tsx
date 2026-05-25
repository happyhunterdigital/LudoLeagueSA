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
import { AfconTournament } from './pages/AfconTournament';
import { CookieConsent } from './components/features/CookieConsent';
import { PrivacyPolicyModal } from './components/features/PrivacyPolicyModal';

export type Page = 'Landing' | 'Home' | 'Leagues' | 'Tournaments' | 'History' | 'Gallery' | 'Shop' |
  'Contact' | 'Admin' | 'BotkGallery' | 'NewsUpdates' | 'Faqs' | 'AfconTournament';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState<'botk' | 'mamelodi' | 'soweto'>('botk');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const standalonePages = ['admin', 'botkgallery', 'newsupdates', 'faqs', 'afcontournament'];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam && standalonePages.includes(pageParam.toLowerCase())) {
      setActiveSection(pageParam.toLowerCase());
    }

    const observer = new IntersectionObserver((entries) => {
      const isStandalone = standalonePages.includes(activeSection.toLowerCase());
      if (entries[0] && entries[0].isIntersecting && !isStandalone && !params.get('page')) {
        const sectionId = entries[0].target.id;
        setActiveSection(sectionId);
        document.title = `Ludo League SA | ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
        window.history.replaceState(null, '', `#${sectionId}`);
      }
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
        {activeSection === 'botkgallery' && (
          <BotkGallery selectedTab={selectedGalleryTab} setSelectedTab={setSelectedGalleryTab} />
        )}
        {activeSection === 'newsupdates' && <NewsUpdates />}
        {activeSection === 'faqs' && <Faqs />}
        {activeSection === 'afcontournament' && (
          <AfconTournament setActivePage={(p) => setActiveSection(p.toLowerCase())} />
        )}

        {!standalonePages.includes(activeSection.toLowerCase()) && (
          <>
            <LandingHero scrollToSection={scrollToSection} />
            <About />
            <Leagues
              setActivePage={(p) => setActiveSection(p.toLowerCase())}
              setSelectedGalleryTab={setSelectedGalleryTab}
            />
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
          
          <div className="flex items-center gap-4">
            <a href="https://x.com/TheLudoLeagueSA" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all" aria-label="X">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.tiktok.com/@ludoleaguesa" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all" aria-label="TikTok">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.21-.19-.4-.39-.58-.61-.02 1.75-.01 3.5 0 5.25 0 .34-.04.68-.07 1.01-.2 2.52-1.76 4.93-4.17 5.73-2.15.77-4.7.45-6.52-1.02-2.01-1.61-2.78-4.47-1.89-6.9 1.11-2.48 4.01-3.9 6.64-3.15.11-.47.09-.94.1-1.41-2.88-.63-6.1.48-7.72 3.01-2 2.96-1.57 7.37 1.13 9.87 2.45 2.34 6.37 2.66 9.17.84 2.3-1.4 3.52-4.15 3.32-6.83l-.01-10.15H12.53V.02z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/18sGYSyF2b/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/joe-setladi-10124031" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://wa.me/27725578097" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-all" aria-label="WhatsApp">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.615.96 3.2 1.456 4.903 1.456 5.4 0 9.794-4.392 9.797-9.794.002-2.618-1.01-5.074-2.852-6.92C16.652 2.052 14.191.995 11.597.995c-5.405 0-9.8 4.394-9.802 9.797-.001 1.792.482 3.447 1.4 4.966l-.92 3.35 3.456-.906zM17.5 13.9c-.3-.15-1.7-.85-2-.95-.25-.1-.45-.15-.65.15-.2.3-.75.95-.95 1.15-.15.2-.35.2-.65.05-1.1-.55-1.95-1-2.75-2.4-.2-.35-.05-.55.1-.7.15-.15.3-.35.45-.5.15-.15.2-.25.3-.45.1-.2.05-.35-.05-.5-.1-.15-.65-1.6-.9-2.2-.2-.55-.45-.45-.65-.45-.2 0-.4 0-.6.2-.2.2-.8.8-.8 1.95s.8 2.3 1 2.5c.2.2 1.8 2.7 4.3 3.8.6.25 1.1.4 1.5.55.6.2 1.1.15 1.5.1.5-.05 1.7-.7 1.9-1.35.2-.65.2-1.2.1-1.35-.1-.1-.3-.2-.6-.35z" />
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
