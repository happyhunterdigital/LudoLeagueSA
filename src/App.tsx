import React, { useEffect, useState } from 'react';
import { useScroll, useSpring } from 'motion/react';
import { doc, setDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import { db, chatbotConfig } from './config/firebase';
import { RegistrationData } from './types';
import { Navbar } from './components/layout/Navbar';
import { ShopGrid } from './components/features/ShopGrid';
import { TournamentRegistration } from './components/features/TournamentRegistration';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    region: 'Soweto'
  });

  const addToCart = (id: string) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Validate Connection to Firestore - Defensive Protocol
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const docRef = doc(db, 'registrations', registrationId);
      await setDoc(docRef, { ...formData, createdAt: serverTimestamp() });
      setFormStatus('success');
      setFormData({ fullName: '', email: '', phoneNumber: '', region: 'Soweto' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error("Registration failed. Verification Error:", error);
      setFormStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-deep selection:bg-white selection:text-black font-sans">
      <Navbar 
        scrolled={scrolled} 
        scaleX={scaleX} 
        cart={cart} 
        wishlist={wishlist} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      {/* Spacer to account for fixed navbar */}
      <div className="h-32"></div>

      <main>
        <TournamentRegistration 
          formData={formData} 
          setFormData={setFormData} 
          handleRegister={handleRegister} 
          formStatus={formStatus} 
        />
        
        <ShopGrid 
          addToCart={addToCart} 
          cart={cart} 
        />
      </main>
    </div>
  );
}
