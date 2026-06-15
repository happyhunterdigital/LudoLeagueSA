import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';

export const LeadCaptureSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate async submission (replace with actual API call for email orchestration)
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <section id="lead-capture" className="relative z-10 bg-black overflow-hidden">
      {/* ── Background gradient mesh ── */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          
          <ScrollReveal>
            <div className="relative rounded-3xl border border-[#FACC15]/15 bg-[#111827]/30 backdrop-blur-xl overflow-hidden">
              
              {/* Accent bar top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FACC15] to-transparent" />
              
              {/* Glow effect */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FACC15]/[0.04] rounded-full blur-3xl" />
              
              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                  
                  {/* Text content */}
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 text-[#FACC15] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                      <Sparkles size={14} />
                      Never Miss a Roll
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase text-white leading-[0.95] mb-4">
                      Stay in <span className="text-[#FACC15]">The Game</span>
                    </h2>
                    
                    <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                      Get exclusive tournament schedules, prize announcements, rulebook updates, and community news delivered straight to your inbox. Be the first to know, always.
                    </p>
                  </div>

                  {/* Form */}
                  <div className="lg:w-1/2 w-full">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.form 
                          key="form"
                          onSubmit={handleSubmit}
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              required
                              id="lead-capture-email"
                              className="w-full pl-12 pr-4 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#FACC15]/40 focus:ring-1 focus:ring-[#FACC15]/20 transition-all"
                            />
                          </div>
                          
                          <button 
                            type="submit"
                            disabled={isLoading || !email}
                            id="lead-capture-submit"
                            className="w-full py-4 bg-[#FACC15] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#FFE600] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                              />
                            ) : (
                              <>
                                Subscribe Now
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                          
                          <p className="text-[10px] text-white/20 text-center">
                            No spam. Unsubscribe anytime. We respect your privacy.
                          </p>
                        </motion.form>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-8"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          >
                            <CheckCircle size={48} className="mx-auto text-[#00f0c2] mb-4" />
                          </motion.div>
                          <h3 className="text-xl font-display font-black text-white mb-2">You're In!</h3>
                          <p className="text-white/50 text-sm">
                            Welcome to the Ludo League community. Check your inbox for a confirmation.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
