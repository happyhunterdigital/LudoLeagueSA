import { useEffect, useState, useRef } from 'react';
import { useScroll, useSpring, AnimatePresence, motion } from 'framer-motion';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db, chatbotConfig } from './config/firebase';
import { Navbar } from './components/layout/Navbar';
import { LandingHero } from './components/features/LandingHero';
import { LandingCarousel } from './components/features/LandingCarousel';
import { LandingFeatures } from './components/features/LandingFeatures';
import { LandingGallery } from './components/features/LandingGallery';
import { LandingSystems } from './components/features/LandingSystems';
import { LandingMediaGrid } from './components/features/LandingMediaGrid';
import { SocialProofSection } from './components/features/SocialProofSection';
import { LeadCaptureSection } from './components/features/LeadCaptureSection';
import { LandingCTA } from './components/features/LandingCTA';
import { CommunityFund } from './components/features/CommunityFund';
import { About } from './pages/About';
import { Leagues } from './pages/Leagues';
import { Tournaments } from './pages/Tournaments';
import { History } from './pages/History';
import { Gallery } from './pages/Gallery';
import { Shop } from './pages/Shop';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { BotkGallery } from './pages/BotkGallery';
import { NewsUpdates } from './pages/NewsUpdates';
import { Faqs } from './pages/Faqs';
import { AfconTournament } from './pages/AfconTournament';
import { CookieConsent } from './components/features/CookieConsent';
import { PrivacyPolicyModal } from './components/features/PrivacyPolicyModal';
import { ChatbotWidget } from './components/features/ChatbotWidget';
import { UserDashboard } from './pages/UserDashboard';
import { Ludo4Schools } from './pages/Ludo4Schools';
import { DonationPage } from './pages/DonationPage';
import { KingsTable } from './pages/KingsTable';
import { LudoLoader } from './components/features/LudoLoader';
import { ShopCheckoutModal } from './components/features/ShopCheckoutModal';
import { KingsTablePopup } from './components/features/KingsTablePopup';

export type Page = 'Landing' | 'Home' | 'Leagues' | 'Tournaments' | 'History' | 'Gallery' | 'Shop' |
 'Contact' | 'Admin' | 'BotkGallery' | 'NewsUpdates' | 'Faqs' | 'AfconTournament' | 'About' | 'Portal' |
'Ludo4Schools' | 'Donate' | 'KingsTable';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist] = useState<string[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (id: string) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState<'botk' | 'mamelodi' | 'soweto'>('botk');
  const isScrollingLock = useRef(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const standalonePages = ['admin', 'botkgallery', 'newsupdates', 'faqs', 'afcontournament', 'portal', 'ludo4schools', 'donate', 'shop', 'kingstable'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam && standalonePages.includes(pageParam.toLowerCase())) {
      setActiveSection(pageParam.toLowerCase());
    }
    const observer = new IntersectionObserver((entries) => {
      if (isScrollingLock.current) return;
      const isStandalone = standalonePages.includes(activeSection.toLowerCase());
      if (entries[0] && entries[0].isIntersecting && !isStandalone && !params.get('page')) {
        const sectionId = entries[0].target.id;
        setActiveSection(sectionId);
        document.title = `The Ludo League SA | ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
        window.history.pushState({ section: sectionId }, '', `#${sectionId}`);
      }
    }, { threshold: 0.4 });

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => observer.observe(sec));

    const handlePopState = (event: PopStateEvent) => {
      const popParams = new URLSearchParams(window.location.search);
      const popPageParam = popParams.get('page');
      if (popPageParam && standalonePages.includes(popPageParam.toLowerCase())) {
        setActiveSection(popPageParam.toLowerCase());
      } else if (event.state && event.state.section) {
        setActiveSection(event.state.section);
        const el = document.getElementById(event.state.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        const hash = window.location.hash.replace('#', '');
        setActiveSection(hash || 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    const testConnection = async () => {
      try { await getDocFromServer(doc(db, 'test', 'connection')); }
      catch (error) { console.error("Firebase offline"); }
    };

    testConnection();
    (window as any).agencyDigitalAuditLink = chatbotConfig;
    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const isTargetStandalone = standalonePages.includes(id.toLowerCase());
    isScrollingLock.current = true;
    if (isTargetStandalone) {
      window.history.pushState({ page: id.toLowerCase() }, '', `?page=${id.toLowerCase()}`);
      setActiveSection(id.toLowerCase());
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => { isScrollingLock.current = false; }, 850);
    } else {
      const isCurrentlyStandalone = standalonePages.includes(activeSection.toLowerCase());
      if (isCurrentlyStandalone) {
        window.history.pushState({ section: id.toLowerCase() }, '', `/${window.location.hash}`);
        setActiveSection(id.toLowerCase());
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => { isScrollingLock.current = false; }, 850);
        }, 150);
      } else {
        window.history.pushState({ section: id.toLowerCase() }, '', `#${id.toLowerCase()}`);
        setActiveSection(id.toLowerCase());
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isScrollingLock.current = false; }, 850);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-black min-h-screen font-sans antialiased">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LudoLoader onComplete={() => {}} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className={`theme-${activeSection} relative w-full font-sans transition-colors duration-700 ease-in-out`}>
          <Navbar
            scaleX={scaleX} cart={cart} wishlist={wishlist}
            activeSection={activeSection} scrollToSection={scrollToSection}
            mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}
            openCart={() => setIsCheckoutOpen(true)}
          />
          
          {/* News Ticker */}
          <div className="fixed top-[69px] md:top-[81px] left-0 right-0 z-[900] overflow-hidden border-b border-white/[0.04] py-2.5 bg-black/95 backdrop-blur-sm whitespace-nowrap select-none flex items-center">
            <motion.div 
              animate={{ x: [0, -1400] }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
              className="flex space-x-16 text-[10px] font-display font-bold tracking-[0.18em] uppercase text-white/30"
            >
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" /> SOWETO GIANTS VS ALEXANDRA MASTERS ACTIVE IN BATTLE OF THE KASIS GRAND FINALS +++</span>
              <span>MAMELODI CIRCUIT: MASONA CLUB RETAINS UNDEFEATED LEAGUE RATING +++</span>
              <span>LUDO4SCHOOLS: EXPANDING TO 15 NEW GAUTENG CLASSROOM CLINICS +++</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" /> SOWETO GIANTS VS ALEXANDRA MASTERS ACTIVE IN BATTLE OF THE KASIS GRAND FINALS +++</span>
            </motion.div>
          </div>

          <main className="w-full pt-[111px] md:pt-[125px]">
            {activeSection === 'admin' && <AdminDashboard />}
            {activeSection === 'portal' && <UserDashboard />}
            {activeSection === 'ludo4schools' && <Ludo4Schools />}
            {activeSection === 'donate' && <DonationPage />}
            {activeSection === 'kingstable' && <KingsTable />}
            {activeSection === 'botkgallery' && (
              <BotkGallery selectedTab={selectedGalleryTab} setSelectedTab={setSelectedGalleryTab} />
            )}
            {activeSection === 'newsupdates' && <NewsUpdates />}
            {activeSection === 'faqs' && <Faqs />}
            {activeSection === 'shop' && (
              <Shop addToCart={addToCart} openCart={() => setIsCheckoutOpen(true)} />
            )}
            {activeSection === 'afcontournament' && (
              <AfconTournament setActivePage={(p: any) => setActiveSection(p.toLowerCase())} />
            )}
            {!standalonePages.includes(activeSection.toLowerCase()) && (
              <>
                {/* ═══ HERO ═══ */}
                <LandingHero scrollToSection={scrollToSection} />
                
                {/* ═══ NEWS CAROUSEL ═══ */}
                <LandingCarousel />

                {/* ═══ FEATURE / TOURNAMENT BLOCKS ═══ */}
                <LandingFeatures />

                {/* ═══ BOARD GALLERY ═══ */}
                <LandingGallery />

                {/* ═══ CORE SYSTEMS / SPORTING STRUCTURE ═══ */}
                <LandingSystems />

                {/* ═══ MEDIA GRID ═══ */}
                <LandingMediaGrid />

                {/* ═══ SOCIAL PROOF / COMMUNITY ═══ */}
                <SocialProofSection />

                {/* ═══ DONATION / COMMUNITY FUND ═══ */}
                <div id="donation-section">
                  <CommunityFund />
                </div>

                {/* ═══ LEAD CAPTURE / EMAIL ORCHESTRATION ═══ */}
                <LeadCaptureSection />

                {/* ═══ CTA ═══ */}
                <LandingCTA />

                {/* ═══ ORIGINAL SECTIONS ═══ */}
                <About />
                <Leagues
                  setActivePage={(p: any) => setActiveSection(p.toLowerCase())}
                  setSelectedGalleryTab={setSelectedGalleryTab}
                />
                <Tournaments />
                <History />
                <Gallery />
                <Contact />
              </>
            )}

            {/* ═══ FOOTER ═══ */}
            <footer className="py-16 bg-black border-t border-white/[0.04]">
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col items-center gap-8">
                  
                  {/* Brand */}
                  <div className="text-center">
                    <h3 className="text-lg font-display font-black uppercase text-[#FACC15] tracking-wide">The Ludo League SA</h3>
                    <p className="text-white/30 text-xs mt-1">Playing Successfully Since 2009</p>
                  </div>
                  
                  {/* Social icons */}
                  <div className="flex items-center gap-3">
                    <a href="https://x.com/TheLudoLeagueSA" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-[#FACC15] hover:border-[#FACC15]/30 transition-all duration-300" aria-label="X">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a href="https://www.tiktok.com/@ludoleaguesa" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-[#FACC15] hover:border-[#FACC15]/30 transition-all duration-300" aria-label="TikTok">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.21-.19-.4-.39-.58-.61-.02 1.75-.01 3.5 0 5.25 0 .34-.04.68-.07 1.01-.2 2.52-1.76 4.93-4.17 5.73-2.15.77-4.7.45-6.52-1.02-2.01-1.61-2.78-4.47-1.89-6.9 1.11-2.48 4.01-3.9 6.64-3.15.11-.47.09-.94.1-1.41-2.88-.63-6.1.48-7.72 3.01-2 2.96-1.57 7.37 1.13 9.87 2.45 2.34 6.37 2.66 9.17.84 2.3-1.4 3.52-4.15 3.32-6.83l-.01-10.15H12.53V.02z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/share/18sGYSyF2b/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-[#FACC15] hover:border-[#FACC15]/30 transition-all duration-300" aria-label="Facebook">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>
                    </a>
                    <a href="https://wa.me/27725578097" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-[#00f0c2] hover:border-[#00f0c2]/30 transition-all duration-300" aria-label="WhatsApp">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.615.96 3.2 1.456 4.903 1.456 5.4 0 9.794-4.392 9.797-9.794.002-2.618-1.01-5.074-2.852-6.92C16.652 2.052 14.191.995 11.597.995c-5.405 0-9.8 4.394-9.802 9.797-.001 1.792.482 3.447 1.4 4.966l-.92 3.35 3.456-.906zM17.5 13.9c-.3-.15-1.7-.85-2-.95-.25-.1-.45-.15-.65.15-.2.3-.75.95-.95 1.15-.15.2-.35.2-.65.05-1.1-.55-1.95-1-2.75-2.4-.2-.35-.05-.55.1-.7.15-.15.3-.35.45-.5.15-.15.2-.25.3-.45.1-.2.05-.35-.05-.5-.1-.15-.65-1.6-.9-2.2-.2-.55-.45-.45-.65-.45-.2 0-.4 0-.6.2-.2.2-.8.8-.8 1.95s.8 2.3 1 2.5c.2.2 1.8 2.7 4.3 3.8.6.25 1.1.4 1.5.55.6.2 1.1.15 1.5.1.5-.05 1.7-.7 1.9-1.35.2-.65.2-1.2.1-1.35-.1-.1-.3-.2-.6-.35z" /></svg>
                    </a>
                    <a href="https://www.youtube.com/@ludoleague1525" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-[#D32F2F] hover:border-[#D32F2F]/30 transition-all duration-300" aria-label="YouTube">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    <button onClick={() => scrollToSection('newsupdates')} className="hover:text-[#FACC15] transition-colors">News & Updates</button>
                    <button onClick={() => scrollToSection('faqs')} className="hover:text-[#FACC15] transition-colors">FAQs</button>
                  </div>
                  
                  {/* Divider */}
                  <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  {/* Copyright */}
                  <div className="text-center space-y-2">
                    <p className="text-[10px] text-white/20 font-medium">&copy; 2026 Ludo League South Africa. All Rights Reserved.</p>
                    <button onClick={() => setIsPrivacyOpen(true)} className="text-[10px] uppercase tracking-[0.15em] text-white/30 hover:text-[#FACC15] transition-colors font-bold">Privacy Policy & Terms</button>
                    <p className="text-[10px] text-white/10">This website is coded by happyhunter.com</p>
                  </div>
                </div>
              </div>
            </footer>
          </main>
          <CookieConsent openPrivacy={() => setIsPrivacyOpen(true)} />
          <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
          <ShopCheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} cart={cart} clearCart={() => setCart([])} />
          {/* King's Table scroll-triggered popup — only on main landing pages */}
          {!standalonePages.includes(activeSection.toLowerCase()) && (
            <KingsTablePopup scrollToSection={scrollToSection} />
          )}
          <ChatbotWidget />
        </div>
      )}
    </div>
  );
}
