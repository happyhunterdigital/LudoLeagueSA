import React, { useState, useRef } from 'react';
import { Loader2, CheckCircle2, UploadCloud, CreditCard, Landmark, Gift, Award, Shield } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { DonationHero } from '../components/features/DonationHero';
import { ScrollReveal } from '../components/ui/ScrollReveal';

interface FundTier { amount: number; perk: string; }
const fundTiers: FundTier[] = [
  { amount: 50, perk: 'Supporter Profile Badge' },
  { amount: 200, perk: 'Exclusive Player Avatar' },
  { amount: 500, perk: 'Complimentary Ludo Leauge Gift' },
];

export const DonationPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'payfast' | 'eft' | 'investment'>('payfast');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '', proofOfPayment: null as File | null });

  const formRef = useRef<HTMLDivElement>(null);
  const currentFunds = 12500;
  const goalFunds = 1000000;
  const progressPercentage = Math.min((currentFunds / goalFunds) * 100, 100);

  const getFinalAmount = () => customAmount !== '' ? parseFloat(customAmount) || 50 : selectedAmount || 50;
  const finalAmount = getFinalAmount();

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const compressAndGetBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const r = new FileReader(); r.readAsDataURL(file);
      r.onload = (e) => {
        const img = new Image(); img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height, max = 1000;
          if (w > h) { if (w > max) { h *= max / w; w = max; } }
          else { if (h > max) { w *= max / h; h = max; } }
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) { ctx.drawImage(img, 0, 0, w, h); resolve(canvas.toDataURL('image/jpeg', 0.6)); }
          else { resolve(e.target?.result as string); }
        };
        img.onerror = (err) => reject(err);
      };
      r.onerror = (err) => reject(err);
    });
  };

  const triggerPayfastRedirect = () => {
    const form = document.createElement('form');
    form.action = 'https://www.payfast.co.za/eng/process'; form.method = 'POST';
    const fields = {
      merchant_id: '35471207', merchant_key: 'q9qkx9sqx9l3m',
      return_url: 'https://ludoleague.co.za/?page=donate&status=success',
      cancel_url: 'https://ludoleague.co.za/?page=donate&status=cancel',
      name_first: formData.fullName.split(' ')[0] || '', name_last: formData.fullName.split(' ').slice(1).join(' ') || '',
      email_address: formData.email, m_payment_id: `don_${Date.now()}`, amount: finalAmount.toFixed(2),
      item_name: 'League Crowdfunding Contribution', custom_str1: 'crowdfunding_donation'
    };
    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement('input'); input.type = 'hidden'; input.name = k; input.value = v;
      form.appendChild(input);
    });
    document.body.appendChild(form); form.submit();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const isCallback = paymentMethod === 'investment';
    if (!isCallback && finalAmount < 20) { alert("Contributions must start from as little as R20.00."); return; }
    
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (paymentMethod === 'eft' && formData.proofOfPayment) {
        popUrl = await compressAndGetBase64(formData.proofOfPayment);
      }
      if (db) {
        await addDoc(collection(db, 'event_registrations'), {
          fullName: formData.fullName, email: formData.email, phone: formData.phone || 'N/A',
          paymentMethod, proofOfPaymentUrl: popUrl, amount: isCallback ? 0 : finalAmount,
          message: formData.message || 'N/A',
          status: isCallback ? 'pending_callback' : paymentMethod === 'payfast' ? 'pending_online_payment' : 'pending_verification',
          eventName: isCallback ? 'Investment Callback Request' : 'Crowdfunding Narrative 2026',
          type: isCallback ? 'investment' : 'donation',
          eventDate: new Date().toLocaleDateString(), timestamp: serverTimestamp()
        });
      }
      if (paymentMethod === 'payfast') { triggerPayfastRedirect(); }
      else { setStep(3); }
    } catch (err) {
      console.error("Donation failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white flex flex-col justify-start">
      
      {/* Premium DonationHero with campaign poster narrative and form scrolling link */}
      <DonationHero 
        title={<>THE FUTURE OF LUDO LEAGUE IS IN <span className="text-[#FFE600]">OUR HANDS</span></>}
        subtitle="Every game played, every friendship formed, and every opportunity created through Ludo has been made possible by our community."
        stats={[
          { value: "Opportunities", label: "For young people" },
          { value: "Leagues", label: "Grow communities" },
          { value: "Platform", label: "To learn & compete" }
        ]}
        actions={[
          { text: "Support the Campaign", onClick: handleScrollToForm, isPrimary: true }, 
          { text: "Read Our Story", onClick: () => window.scrollBy({ top: 600, behavior: 'smooth' }), isPrimary: false }
        ]} 
      />

      {/* Narrative Section */}
      <div className="w-full max-w-5xl mx-auto py-24 px-6 md:px-12 space-y-24">
        
        {/* Intro */}
        <ScrollReveal direction="up" className="text-center space-y-6">
          <h2 className="text-[#FFD700] font-display font-black text-3xl md:text-5xl uppercase tracking-tight">Ludo ka Nkane!</h2>
          <p className="text-xl md:text-2xl font-light text-neutral-300 italic border-l-4 border-[#FFD700] pl-6 py-2 mx-auto max-w-2xl text-left">
            "South Africa's youth don't need handouts. They need opportunities. Help us create them, one roll at a time."
          </p>
        </ScrollReveal>

        {/* Section 1: Help Us Build The Future */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left" className="space-y-6 text-neutral-400 leading-relaxed font-light">
            <h3 className="text-white font-display font-black text-2xl uppercase tracking-wider">Help Us Build The Future</h3>
            <p><strong className="text-white">Every legend starts with a single roll.</strong></p>
            <p>South Africa doesn't have a shortage of talent. It has a shortage of opportunities.</p>
            <p>Every year, thousands of young South Africans leave school and university full of hope, only to find themselves locked out of the economy. Graduates search for work. Young entrepreneurs struggle to get funding. Communities battle with unemployment and a lack of positive spaces to gather and grow.</p>
            <p>But what if something as simple as a board game could become a platform for opportunity?</p>
            <p>At Ludo League SA, we believe it can.</p>
          </ScrollReveal>
          
          <ScrollReveal direction="right" className="space-y-6">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl bg-neutral-900/50">
              <img 
                src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142496/LudoLeagueSA_Team_gvizo3.png" 
                alt="LudoLeagueSA Team and participants" 
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
            <div className="bg-neutral-900/30 p-6 rounded-2xl border border-neutral-800/50 text-neutral-400 leading-relaxed font-light text-sm">
              <p className="mb-3">What started around kitchen tables and street corners is becoming a movement that brings people together, builds communities, and creates jobs.</p>
              <ul className="grid grid-cols-2 gap-2 text-white font-bold tracking-wide">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />Creating a sport</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />A business</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />A culture</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />A future</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Section 2: Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-12 border-t border-neutral-900/60">
          <ScrollReveal direction="left" className="order-2 md:order-1">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl bg-neutral-900/50">
              <img 
                src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142713/LudoLeagueSA_taking_kids_off_the_street_and_screen._dgzntf.png" 
                alt="LudoLeagueSA taking kids off the street and screen" 
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" className="space-y-6 text-neutral-400 leading-relaxed font-light order-1 md:order-2 bg-neutral-900/30 p-8 rounded-2xl border border-neutral-800/50">
            <h3 className="text-white font-display font-black text-2xl uppercase tracking-wider">Our Mission</h3>
            <p>To create opportunities for South Africans through the power of community, competition, and entrepreneurship.</p>
            <p>To give young people a platform to lead and express themselves constructively.</p>
            <p>To build a proudly South African sport that belongs to everyone, in every township and town.</p>
            <p>To turn a simple board game into a lasting development legacy.</p>
          </ScrollReveal>
        </div>

        {/* Section 3: More Than A Game */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-12 border-t border-neutral-900/60">
          <ScrollReveal direction="left" className="space-y-6 text-neutral-400 leading-relaxed font-light">
            <h3 className="text-white font-display font-black text-2xl uppercase tracking-wider">More Than A Game</h3>
            <p>When people think of Ludo, they think of family. Laughter. Friendly competition. Stories that last a lifetime.</p>
            <p>We're taking that feeling and turning it into something bigger. We are creating concrete opportunities for:</p>
            <div className="grid grid-cols-2 gap-3 text-xs text-white">
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Players</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Content Creators</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Photographers</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Event Hosts</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Organisers</div>
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/30 flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFD700]"/> Entrepreneurs</div>
            </div>
            <p className="font-bold text-[#FFD700] mt-4">We want every tournament to create not only champions, but opportunities.</p>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl bg-neutral-900/50">
              <img 
                src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142261/LudoLeagueSA_taking_kids_off_the_street_and_screen_dykywz.png" 
                alt="LudoLeagueSA youth development action" 
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Section 4: Full-width Campaign Showcase Banner */}
        <ScrollReveal direction="up" className="pt-12 border-t border-neutral-900/60">
          <div className="relative w-full h-[280px] sm:h-[380px] md:h-[450px] overflow-hidden rounded-3xl border border-neutral-800/60 shadow-2xl bg-neutral-900/40">
            <img 
              src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142171/LudoLeagueSA_vwtysc.png" 
              alt="LudoLeagueSA crowdfunding banner artwork" 
              loading="lazy"
              className="w-full h-full object-cover" 
            />
            {/* Subtle premium dark gradient vignette over the banner */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        </ScrollReveal>
        
        {/* Our Funding Goal Section */}
        <ScrollReveal direction="up" className="text-center pt-8 space-y-4">
          <h3 className="text-white font-display font-black text-3xl uppercase tracking-wider">Our Funding Goal</h3>
          <p className="text-5xl md:text-6xl font-black text-[#FFD700] tracking-tighter">R1,000,000</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-neutral-400 pt-4 uppercase tracking-widest font-bold">
            <span>National Expansion</span> • <span>Recruitment</span> • <span>League Production</span> • <span>Ludo4Schools</span>
          </div>
        </ScrollReveal>
      </div>

      {/* Narrative Matrix Grids */}
      <div className="w-full max-w-6xl mx-auto pb-24 px-6 md:px-12">
        <h2 className="text-center font-display font-black text-3xl text-white uppercase mb-12">Three Ways To Be Part Of The Movement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Gift, title: "Donate", desc: "Whether it's R20 or R50,000, you're helping create opportunities where they're needed most. You aren't simply giving money. You're helping build a future." },
            { icon: Shield, title: "Invest", desc: "Competitive Ludo is one of the most accessible sports in Africa. Low barriers to entry. Mass participation. High entertainment value. Help us build Africa's premier Ludo ecosystem." },
            { icon: Award, title: "Sponsor", desc: "Partner with a movement reaching communities overlooked by traditional sports. Brand exposure. Community impact. Digital reach. National tournaments. Together, we can build something iconic." }
          ].map((item, idx) => (
            <div key={idx} className="border-t-4 border-[#FFD700] bg-neutral-900/60 p-8 rounded-b-2xl space-y-4 hover:bg-neutral-900 transition-all cursor-pointer" onClick={handleScrollToForm}>
              <item.icon size={32} className="text-[#FFD700]" />
              <h3 className="font-display font-black tracking-thonik-tight uppercase text-2xl text-white">{item.title}</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Step Contribution Form Ref Anchor */}
      <div ref={formRef} className="w-full max-w-3xl mx-auto bg-black border border-neutral-900 p-8 md:p-12 rounded-3xl shadow-2xl relative mb-24">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-neutral-900 pb-4">
              <button type="button" onClick={() => { setPaymentMethod('payfast'); setSelectedAmount(50); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg ${paymentMethod !== 'investment' ? 'bg-[#FFD700] text-black' : 'text-neutral-500 hover:text-white'}`}>Direct Supporter</button>
              <button type="button" onClick={() => { setPaymentMethod('investment'); setSelectedAmount(null); }} className={`px-4 py-2 text-[10px] tracking-widest font-black uppercase rounded-lg ${paymentMethod === 'investment' ? 'bg-[#FFD700] text-black' : 'text-neutral-500 hover:text-white'}`}>Invest / Callback</button>
            </div>

            {paymentMethod !== 'investment' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-xs uppercase tracking-widest font-bold text-neutral-500">
                    <span>Raised: R{currentFunds.toLocaleString()}</span>
                    <span>Goal: R{goalFunds.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-neutral-900 rounded-full h-3 overflow-hidden border border-neutral-800">
                    <div className="bg-[#FFD700] h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>

                {finalAmount >= 500 && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-[#00c9a7] text-xs font-black uppercase tracking-widest rounded-xl text-center animate-pulse">🎉 Qualified for complimentary Ludo Leauge Gift!</div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  {fundTiers.map((tier) => (
                    <button key={tier.amount} type="button" onClick={() => { setSelectedAmount(tier.amount); setCustomAmount(''); }} className={`p-4 rounded-xl border-2 text-center transition-all ${selectedAmount === tier.amount && customAmount === '' ? 'border-[#FFD700] bg-neutral-900' : 'border-neutral-900 hover:border-neutral-700'}`}>
                      <div className="font-display font-black text-xl text-white">R{tier.amount}</div>
                      <div className="text-[7px] text-neutral-500 font-bold uppercase tracking-wider mt-1">{tier.perk}</div>
                    </button>
                  ))}
                </div>

                <input type="number" min="20" placeholder="Custom Supporter Amount (Minimum R20.00)" value={customAmount} onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }} className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-[#FFD700] font-bold outline-none focus:border-[#FFD700]" />
              </div>
            ) : (
              <div className="bg-neutral-900/40 p-5 border-l-4 border-[#FFD700] text-xs text-neutral-400 space-y-2 rounded-r-xl">
                <p className="font-bold text-white uppercase text-sm">Corporate Investment Callback Request</p>
                <p>Leave your coordinates below. Our executive committee will promptly schedule an offline phone consultation to discuss local franchise club ownership (RTP modeling), corporate CSI sponsorships, and league shares.</p>
              </div>
            )}

            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <input required type="text" placeholder="Full Name" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700]" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
              <input required type="email" placeholder="Email Address" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700]" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input required={paymentMethod === 'investment'} type="tel" placeholder="Phone Number" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700]" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              {paymentMethod === 'investment' && (
                <textarea placeholder="Message / Specific Queries (Optional)" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700] h-20" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
              )}
            </div>

            <button disabled={(paymentMethod !== 'investment' && finalAmount < 20) || !formData.fullName || !formData.email || (paymentMethod === 'investment' && !formData.phone)} onClick={() => paymentMethod === 'investment' ? handleSubmit() : setStep(2)} className="w-full py-4 bg-[#D32F2F] hover:bg-[#FFD700] text-white hover:text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-lg text-xs disabled:opacity-50">
              {paymentMethod === 'investment' ? 'Request Callback' : 'Continue to Transfer'}
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="font-display font-black tracking-thonik-tight text-3xl uppercase text-white border-b border-neutral-900 pb-4 text-center">Step 2: Choose Payment</h4>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setPaymentMethod('payfast')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold transition-all ${paymentMethod === 'payfast' ? 'border-[#FFD700] bg-neutral-900' : 'border-neutral-900'}`}><CreditCard size={20} className="text-[#FFD700]" />Payfast Online</button>
              <button type="button" onClick={() => setPaymentMethod('eft')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold transition-all ${paymentMethod === 'eft' ? 'border-[#FFD700] bg-neutral-900' : 'border-neutral-900'}`}><Landmark size={20} className="text-[#FFD700]" />Manual EFT</button>
            </div>

            {paymentMethod === 'eft' ? (
              <div className="space-y-4">
                <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-900 text-xs text-neutral-400 space-y-2">
                  <p><b>Bank Name:</b> Nedbank</p>
                  <p><b>Account Holder:</b> THE LUDO LEAGUE SOUTH AFRICA (PTY) LTD</p>
                  <p><b>Account Number:</b> 1120230365</p>
                  <p><b>Branch Code:</b> 198765 // Current Account</p>
                  <p><b>Reference:</b> DON-{formData.fullName.replace(/\s+/g, '')}</p>
                  <p className="pt-2 border-t border-neutral-900 text-sm text-[#FFD700]"><b>Grand Total:</b> R{finalAmount.toLocaleString()}</p>
                </div>
                <div className="border-2 border-dashed border-neutral-800 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer relative bg-neutral-900/20 hover:bg-neutral-900/40">
                  <UploadCloud size={24} className="text-neutral-500 mb-1" />
                  <span className="text-[10px] font-black text-[#0ea5e9] text-center truncate max-w-[200px]">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                  <input required={paymentMethod === 'eft'} type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({ ...formData, proofOfPayment: e.target.files ? e.target.files[0] : null })} />
                </div>
              </div>
            ) : (
              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 text-center space-y-4 text-xs text-neutral-400">
                <p className="text-sm text-white"><b>Total Contribution:</b> <span className="text-[#FFD700] font-black">R{finalAmount.toLocaleString()}</span></p>
                <div className="border-t border-neutral-900 pt-3 text-[10px] text-neutral-500">
                  <p className="font-bold text-neutral-400 uppercase tracking-wider mb-2">Accepted Payment Methods:</p>
                  <p>Visa - Mastercard - Maestro - Instant EFT - Capitec Pay - SnapScan - Zapper</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="w-1/2 py-4 bg-neutral-900 text-white font-bold rounded-xl">Back</button>
              <button type="submit" disabled={isSubmitting || (paymentMethod === 'eft' && !formData.proofOfPayment)} className="w-1/2 py-4 bg-[#D32F2F] hover:bg-[#FFD700] text-white hover:text-black font-black uppercase tracking-widest rounded-xl disabled:opacity-50 flex items-center justify-center shadow-lg">
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : paymentMethod === 'payfast' ? 'Pay Now' : 'Complete Donation'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 py-6">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-[#00c9a7]"><CheckCircle2 size={48} /></div>
            <h3 className="font-display font-black tracking-thonik-tight text-3xl uppercase text-white">REQUEST LOGGED</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {paymentMethod === 'investment' 
                ? 'Thank you! Your corporate investment callback query has been logged. Our administration and executive committee will contact you shortly on your provided phone number to arrange an offline consultation.'
                : 'Thank you for backing the Ludo League South Africa! Your generous contribution has been logged. Once we verify your transfer, your supporter status and profile badges will be unlocked.'}
            </p>
            <button onClick={() => { setStep(1); setSelectedAmount(50); setCustomAmount(''); setPaymentMethod('payfast'); setFormData({ fullName: '', email: '', phone: '', message: '', proofOfPayment: null }); }} className="w-full py-4 bg-neutral-900 hover:bg-[#FFD700] text-white hover:text-black font-black uppercase tracking-widest rounded-xl transition-all">Close Window</button>
          </div>
        )}
      </div>
    </div>
  );
};
