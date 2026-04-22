/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  AlertCircle,
  Menu,
  X,
  CheckCircle2,
  Loader2,
  Dice1 as Dice,
  Users,
  Camera,
  PlayCircle,
  Hash
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

const chatbotConfig = {
    model: "gemini-3.1-flash-lite-preview",
    agencyAuditTarget: "www.happyhunterdigital.com",
    focus: "Key Advantages for a Digital Agency Website"
};

interface RegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  region: 'Alexandra' | 'Soweto' | 'Mamelodi';
}

interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: any;
}

const handleFirestoreError = (error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null): never => {
  const errorInfo: FirestoreErrorInfo = {
    error: error.message || 'Unknown Firestore error',
    operationType,
    path,
    authInfo: null // Public access for registrations
  };
  throw new Error(JSON.stringify(errorInfo));
};

const SectionHeader = ({ tag, title, subtitle, colorClass = "text-accent-teal" }: { tag: string, title: string, subtitle?: string, colorClass?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-4xl mx-auto mb-20"
    >
      <div className={`text-[11px] uppercase tracking-[0.5em] font-black italic ${colorClass} mb-6`}>
        {tag}
      </div>
      <h2 className="text-6xl md:text-8xl font-display font-black mb-8 text-white uppercase italic leading-none">{title}</h2>
      {subtitle && <p className="text-white/50 text-xl font-medium tracking-tight leading-relaxed max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
};

const LudoToken = ({ color, className }: { color: string, className?: string }) => (
  <div className={`w-8 h-8 rounded-full border-2 border-white/20 shadow-lg ${className}`} style={{ backgroundColor: color }}>
    <div className="w-full h-full rounded-full border-t border-white/40" />
  </div>
);

const LudoBoardDecoration = () => (
  <>
    <div className="board-corner top-0 left-0 bg-ludo-red" />
    <div className="board-corner top-0 right-0 bg-ludo-green" />
    <div className="board-corner bottom-0 left-0 bg-ludo-yellow" />
    <div className="board-corner bottom-0 right-0 bg-ludo-blue" />
  </>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Validate Connection to Firestore
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
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

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    region: 'Soweto'
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const docRef = doc(db, 'registrations', registrationId);
      
      await setDoc(docRef, {
        ...formData,
        createdAt: serverTimestamp()
      });

      setFormStatus('success');
      setFormData({ fullName: '', email: '', phoneNumber: '', region: 'Soweto' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error("Registration failed:", error);
      setFormStatus('error');
      // handleFirestoreError(error, 'create', '/registrations'); // This would throw, interrupting UI
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-deep selection:bg-white selection:text-black">
      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-sky-400 z-[9999] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] px-10 py-6 border-b transition-all duration-500 bg-bg-panel/90 backdrop-blur-md ${scrolled ? 'border-teal-400/20 py-4 shadow-[0_0_30px_rgba(20,184,166,0.2)]' : 'border-teal-400/10'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 via-teal-600 to-teal-900 rounded-lg flex items-center justify-center border border-teal-400/40">
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
            </div>
            <span className="text-2xl font-display italic font-medium tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-teal-400">
              Ludo League South Africa
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Tournaments', 'History', 'Winners', 'Gallery', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] uppercase tracking-[0.25rem] font-medium text-white/50 hover:text-white transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:block px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-all uppercase text-[10px] tracking-widest font-bold">
              Join League
            </button>
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[999] bg-bg-deep pt-32 px-10 flex flex-col gap-8"
        >
          {['Tournaments', 'History', 'Winners', 'Gallery', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-4xl font-display italic font-light hover:text-accent-teal transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button 
            className="mt-8 px-10 py-6 bg-white text-black text-xl font-bold uppercase tracking-widest"
            onClick={() => setMobileMenuOpen(false)}
          >
            Join League
          </button>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-40 border-b border-white/5 relative overflow-hidden">
        <LudoBoardDecoration />
        
        {/* Floating Game Elements */}
        <motion.div 
          initial={{ rotate: -720, scale: 0, x: 100, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, x: 0, opacity: 0.2 }}
          transition={{ duration: 2, type: "spring", bounce: 0.4 }}
          className="absolute top-[20%] right-[15%] hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Dice size={160} className="text-white" strokeWidth={0.5} />
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[10%] opacity-10 hidden lg:block"
        >
          <LudoToken color="var(--color-ludo-red)" className="w-24 h-24" />
        </motion.div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm uppercase tracking-[0.5em] text-accent-teal font-black italic"
              >
                The Premier Competitive Board
              </motion.h2>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-8xl md:text-9xl font-display italic font-black leading-[0.9] text-white uppercase"
              >
                Classic Play.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-ludo-red via-ludo-yellow to-ludo-green">Elite Stakes.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-2xl text-white/60 max-w-lg leading-tight font-semibold"
              >
                Join the ultimate professional Ludo circuit. Alexandra standard to Soweto Grand Slam.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a href="#register" className="btn-action btn-action-primary">
                Register for Tournament
              </a>
              <button className="btn-action btn-action-outline">
                View Schedule
              </button>
            </motion.div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
              <div className="flex items-start gap-4">
                <LudoToken color="var(--color-ludo-red)" className="w-6 h-6 flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
                <div>
                  <div className="text-xs font-black text-white uppercase tracking-wider italic">Instant Payouts</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-bold">Under 5 minutes</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <LudoToken color="var(--color-ludo-teal)" className="w-6 h-6 flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(13,148,136,0.4)]" />
                <div>
                  <div className="text-xs font-black text-white uppercase tracking-wider italic">Verified Integrity</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-bold">Certified RNG dice</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="bg-bg-panel border-4 border-ludo-teal p-2 relative overflow-hidden group">
              <div className="aspect-[4/5] relative overflow-hidden transition-all duration-1000 group-hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1612287230217-969b698cb8d1?w=800&h=1000&fit=crop" 
                  alt="Ludo Professional" 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent opacity-90" />
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-ludo-red text-white text-[10px] font-black uppercase italic animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" /> Live Arena
              </div>
              </div>
              <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-4">
                <div className="text-[11px] text-ludo-yellow uppercase tracking-[0.4em] font-black italic">Upcoming: Dlamini Hall</div>
                <h3 className="text-5xl font-display italic font-black text-white leading-tight uppercase">Battle of the Kasis</h3>
                <div className="flex justify-between items-end border-t border-white/20 pt-4 mt-2">
                  <div className="text-xs uppercase tracking-widest text-white/60 font-black">Prize Pool</div>
                  <div className="text-4xl font-mono text-accent-teal tracking-tighter font-black italic">R50,000.00</div>
                </div>
              </div>
            </div>
            
            {/* Status Snippet */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-bg-card border border-white/10 p-8 shadow-2xl z-20"
            >
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Total Paid Out</div>
              <div className="text-3xl font-mono text-white tracking-tighter">R1.2M+</div>
                <div className="flex items-center gap-2 mt-4 bg-teal-400/10 px-4 py-2 border-l-2 border-teal-400">
                  <span className="status-indicator"></span>
                  <span className="text-[10px] uppercase tracking-widest text-teal-400 font-black italic">Live Payout System</span>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section id="tournaments" className="bg-bg-panel relative border-t border-teal-800/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400 opacity-[0.05] blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            tag="Tournament Circuit" 
            title="Elite Arena & Standoffs" 
            subtitle="The highest-stakes Ludo ecosystem in South Africa. From Alexandra standard tables to Soweto grand championships."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {/* Featured Tournament */}
            <motion.div whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.05)' }} className="lg:col-span-2 p-12 bg-bg-panel/50 space-y-8 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="tag-status text-teal-300">Starting soon in 14m 02s</div>
                <h3 className="text-5xl md:text-7xl font-display italic font-black uppercase text-white leading-none">The Master Trilogy</h3>
                <p className="text-white/40 text-lg font-light leading-relaxed max-w-xl">
                  Alexandra, Soweto, and Mamelodi face off at Dlamini Multi-Purpose Hall. Professional tier rules enforced. 
                </p>
              </div>
              <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-10">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2 font-bold">Grand Prize</div>
                  <div className="text-3xl font-mono text-teal-200">R20,000.00</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2 font-bold">Entry Invitation</div>
                  <div className="text-3xl font-mono text-teal-200">Verified Tier</div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar Tournaments */}
            <div className="space-y-px bg-teal-800/10">
              <motion.div whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.08)', cursor: 'pointer' }} className="bg-bg-panel p-10 h-1/2 flex flex-col justify-center gap-4 transition-colors">
                <div className="text-[10px] uppercase font-bold text-teal-100/30 tracking-widest">Completed</div>
                <h4 className="text-3xl font-display italic font-black uppercase text-ludo-blue">Mamelodi Clash</h4>
                <div className="text-xl font-mono text-white/60">R10,000.00</div>
              </motion.div>
              <motion.div whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.08)', cursor: 'pointer' }} className="bg-bg-panel p-10 h-1/2 flex flex-col justify-center gap-4 transition-colors">
                <div className="text-[10px] uppercase font-bold text-teal-100/30 tracking-widest">Historical</div>
                <h4 className="text-3xl font-display italic font-black uppercase text-ludo-red">Inaugural West</h4>
                <div className="text-xl font-mono text-white/60">R10,000.00</div>
              </motion.div>
            </div>
          </div>

          <div className="mt-20 p-10 bg-bg-panel border border-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-red-500 shrink-0 mt-1">Operational Bulletin</span>
              <div className="space-y-4">
                <h3 className="text-3xl font-display italic text-white">BOTK Postponement Protocol</h3>
                <p className="text-white/40 leading-relaxed font-light">
                  Our BOTK Tournament has been postponed due to sponsor logistical challenges. 
                  <span className="text-white"> Full refunds are processing for all ticket holders immediately.</span> 
                  System integrity remains confirmed for upcoming local rounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="bg-bg-deep">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            tag="Legacy & Origin" 
            title="The Established Path" 
            subtitle="Documentation of South Africa's professional Ludo trajectory."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-teal-800/20 border border-teal-800/20">
              {[
                { year: '2022', title: 'The Trilogy Protocol', content: 'Three townships converged for the high-limit showdown at Dlamini Multi-Purpose Hall.', color: 'var(--color-ludo-red)' },
                { year: '2021', title: 'Eastbank Rematch', content: 'Soweto returned to defend the crown against Alexandra in the second professional edition.', color: 'var(--color-ludo-green)' },
                { year: '2020', title: 'Winner Takes All', content: 'Post-lockdown recovery round at Ikageng. Implementation of high-intensity knockout rules.', color: 'var(--color-ludo-blue)' },
                { year: '2019', title: 'Initial Rollout', content: 'Inaugural tournament launch at Mamelodi West. The start of the professional ecosystem.', color: 'var(--color-ludo-yellow)' },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.05)' }}
                  className="bg-bg-deep p-12 space-y-6 transition-all border-teal-800/10 relative"
                >
                  <LudoToken color={item.color} className="absolute top-12 right-12 opacity-50 w-4 h-4" />
                  <div className="text-white/20 font-mono text-sm tracking-widest">{item.year}</div>
                  <h4 className="text-4xl font-display italic font-black uppercase text-white leading-none">{item.title}</h4>
                  <p className="text-white/40 font-light leading-relaxed">{item.content}</p>
                <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent-teal inline-flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent-teal rounded-full" /> Verified Archive
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Winners Section */}
      <section id="winners" className="bg-bg-panel border-t border-teal-800/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            tag="Active Rankings" 
            title="Elite Performers" 
            subtitle="The definitive leaderboard of grand slam Ludo champions."
            colorClass="text-ludo-green"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="bg-bg-card border border-teal-400/20 p-2 relative shadow-[0_0_40px_rgba(20,184,166,0.1)]">
              <div className="aspect-[16/10] grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&h=500&fit=crop" className="w-full h-full object-cover" alt="Elite Winner" />
              </div>
              <div className="absolute top-8 right-8 bg-accent-teal text-white px-8 py-3 text-[10px] uppercase font-bold tracking-widest shadow-xl">
                Highest Earned 2019
              </div>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-6xl md:text-8xl font-display italic font-black text-white leading-none uppercase tracking-tighter">K. Mdawe</h3>
                <p className="text-xl italic text-teal-100/60 font-light border-l border-teal-400/20 pl-8 leading-relaxed">
                  "At 20, Mdawe established the benchmark for tactical play, routing his bracket with precision and composure."
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-px bg-teal-800/20 shadow-lg border border-teal-800/20">
                {[
                  { label: 'Carrier Wins', val: '05' },
                  { label: 'Baseline Age', val: '20' },
                  { label: 'Earning Tier', val: 'MAX' },
                  { label: 'Champ Since', val: '2019' },
                ].map(s => (
                  <div key={s.label} className="bg-bg-card p-10 text-center">
                    <div className="text-3xl font-mono text-teal-50 tracking-tighter mb-2">{s.val}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-teal-100/30 font-bold">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Gallery Section */}
      <section id="gallery" className="bg-bg-deep relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-teal-400 h-full" />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            tag="Arena Highlights" 
            title="League in Motion" 
            subtitle="Catch every block, every capture, and every victory across the circuit."
            colorClass="text-ludo-yellow"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Featured Large */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-bg-card border border-teal-400/20 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Community Finals"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-ludo-yellow mb-2">
                  <PlayCircle size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Video Highlight</span>
                </div>
                <h4 className="text-2xl font-display italic text-white">Soweto Open: The Final Block</h4>
              </div>
            </motion.div>

            {/* Grid Items */}
            {[
              { 
                url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18", 
                tag: "Strategy", 
                title: "Mental Focus",
                color: "border-ludo-red"
              },
              { 
                url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a", 
                tag: "Atmosphere", 
                title: "Alexandra Courts",
                color: "border-ludo-blue"
              },
              { 
                url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205", 
                tag: "Victory", 
                title: "Champion Smile",
                color: "border-ludo-green"
              },
              { 
                url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1", 
                tag: "Legacy", 
                title: "The Mamelodi Circle",
                color: "border-ludo-yellow"
              },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`group relative aspect-[4/5] bg-bg-card border border-teal-400/10 overflow-hidden ${item.color} border-l-4`}
              >
                <img 
                  src={`${item.url}?w=400&q=80`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-bg-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/60">{item.tag}</span>
                  <h5 className="text-lg font-display italic text-white">{item.title}</h5>
                </div>
              </motion.div>
            ))}

            {/* Stats Block */}
            <div className="bg-ludo-blue/10 border border-ludo-blue/20 p-8 flex flex-col justify-center items-center text-center space-y-4">
              <Camera className="text-ludo-blue w-10 h-10 mb-2" />
              <div className="text-3xl font-mono font-bold text-white">5,000+</div>
              <div className="text-[10px] uppercase tracking-widest text-ludo-blue font-bold">Photos Captured</div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">Documenting the rise of SA Ludo stars</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="bg-bg-panel border-t border-teal-800/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            tag="Sign Up" 
            title="Join the Next Tournament" 
            subtitle="Secure your place at the table. Registrations are open for the Soweto, Alexandra, and Mamelodi qualifiers."
            colorClass="text-teal-400"
          />

          <div className="max-w-3xl mx-auto">
            <div className="bg-bg-panel border-4 border-teal-500/10 p-10 md:p-16 shadow-2xl relative overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 98% 100%, 0 100%)' }}>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-400/5 blur-3xl rounded-full" />
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20"
                  >
                    <CheckCircle2 className="w-20 h-20 text-teal-400 mx-auto mb-6 shadow-[0_0_20px_rgba(45,212,191,0.2)]" />
                    <h3 className="text-4xl font-display italic font-black mb-4 uppercase text-accent-teal">Registration Secured</h3>
                    <p className="text-white/40 leading-relaxed font-light">
                      Your entry has been recorded in the professional registry. You will receive a notification via email with tournament details.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleRegister} 
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Full Name</label>
                        <input 
                          required
                          type="text"
                          className="w-full bg-bg-panel/50 border border-teal-400/10 p-4 text-white focus:outline-none focus:border-teal-400/40 transition-colors font-light"
                          placeholder="e.g. Sipho Khumalo"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Email Address</label>
                        <input 
                          required
                          type="email"
                          className="w-full bg-bg-panel/50 border border-teal-400/10 p-4 text-white focus:outline-none focus:border-teal-400/40 transition-colors font-light"
                          placeholder="sipho@example.co.za"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Phone Number</label>
                        <input 
                          required
                          type="tel"
                          className="w-full bg-bg-panel/50 border border-teal-400/10 p-4 text-white focus:outline-none focus:border-teal-400/40 transition-colors font-light"
                          placeholder="+27 (0) 72..."
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Preferred Location</label>
                        <select 
                          required
                          className="w-full bg-bg-panel/50 border border-teal-400/10 p-4 text-white focus:outline-none focus:border-teal-400/40 transition-colors font-light appearance-none"
                          value={formData.region}
                          onChange={(e) => setFormData({...formData, region: e.target.value as any})}
                        >
                          <option value="Soweto">Soweto</option>
                          <option value="Alexandra">Alexandra</option>
                          <option value="Mamelodi">Mamelodi</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      disabled={formStatus === 'submitting'}
                      type="submit" 
                      className="btn-action btn-action-primary w-full py-6 text-sm disabled:opacity-50"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4" /> Processing Registration
                        </>
                      ) : (
                        "Submit Entry"
                      )}
                    </button>

                    {formStatus === 'error' && (
                      <p className="text-red-500 text-[10px] uppercase tracking-widest text-center">
                        Registration system encounterd an error. Please try again.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-bg-deep border-t border-teal-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="flex-1 space-y-10">
              <SectionHeader 
                tag="Communications" 
                title="Direct Interface" 
                subtitle="High-priority channels for tournament registration and league enquiries."
                colorClass="text-teal-400"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-teal-800/20 shadow-xl">
                <div className="bg-bg-panel p-12 space-y-4 relative overflow-hidden group border-r border-teal-500/10">
                  <motion.div 
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-20 transition-opacity"
                  >
                    <Dice size={120} strokeWidth={0.5} className="text-ludo-red" />
                  </motion.div>
                  <div className="text-[11px] uppercase tracking-widest text-teal-100/40 font-black italic">Admin Lead: Joe</div>
                  <a href="tel:+27725578097" className="text-3xl font-mono text-white block hover:text-ludo-teal transition-all font-black italic tracking-tighter">072 557 8097</a>
                </div>
                <div className="bg-bg-panel p-12 space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-20 transition-opacity">
                    <Users size={120} strokeWidth={0.5} className="text-ludo-blue" />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-teal-100/40 font-black italic">Support: Masego</div>
                  <a href="tel:+27679325513" className="text-3xl font-mono text-white block hover:text-ludo-teal transition-all font-black italic tracking-tighter">067 932 5513</a>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col gap-px bg-teal-800/20 mt-auto shadow-2xl">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="bg-bg-panel p-8 flex items-center justify-between group transition-all hover:bg-accent-teal hover:text-white text-teal-100/60"
                >
                  <span className="text-[10px] uppercase tracking-widest font-bold font-sans">Connect_0{idx + 1}</span>
                  <Icon size={16} strokeWidth={1.5} className="group-hover:scale-125 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Status Bar */}
      <footer className="px-10 py-6 border-t border-white/5 bg-bg-panel flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold">
        <div className="flex flex-col md:flex-row gap-10">
          <span className="text-white/60 flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 via-teal-600 to-teal-900 rounded-lg flex items-center justify-center border border-teal-400/40 scale-75">
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
            </div>
            Ludo League SA
          </span>
          <div className="flex gap-8 py-3">
            <span>Online: <span className="text-white/80 font-mono">42,912</span></span>
            <span>Total Paid: <span className="text-white/80 font-mono">R4.2M</span></span>
          </div>
        </div>
        <div className="flex items-center gap-2 py-3">
          <span className="status-indicator"></span> System Operational
        </div>
        <div className="py-3 text-[8px] opacity-50">
          © 2026 Atheo Consulting Pty Ltd. Professional Tier Secured.
        </div>
      </footer>
    </div>
  );
}
