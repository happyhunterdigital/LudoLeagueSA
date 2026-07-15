import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Loader2, CheckCircle2, Crown, CreditCard, Landmark, UploadCloud, ArrowRight, ArrowLeft, MapPin, User, Mail, Phone, Users } from 'lucide-react';

interface KingsTableFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  teamName: string;
  city: string;
  region: string;
  proofOfPayment: File | null;
}

const SA_CITIES = [
  'Alexandra', 'Soweto', 'Mamelodi', 'Johannesburg CBD', 'Pretoria',
  'Tembisa', 'Katlehong', 'Vosloorus', 'Daveyton', 'Thokoza',
  'Kagiso', 'Krugersdorp', 'Midrand', 'Randburg', 'Roodepoort',
  'Cape Town', 'Durban', 'Port Elizabeth', 'Bloemfontein', 'Other'
];

const ENTRY_FEE = 250.00;
const MERCHANT_ID = '35471207';
const MERCHANT_KEY = 'q9qkx9sqx9l3m';

export const KingsTable = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'payfast' | 'eft'>('payfast');
  const [registrationId, setRegistrationId] = useState('');
  const [formData, setFormData] = useState<KingsTableFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    teamName: '',
    city: 'Soweto',
    region: 'Gauteng',
    proofOfPayment: null,
  });

  // Check for PayFast return URL status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (status === 'success') {
      setStep(3);
    }
  }, []);

  const compressAndGetBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX = 1000;
          if (width > height) {
            if (width > MAX) { height *= MAX / width; width = MAX; }
          } else {
            if (height > MAX) { width *= MAX / height; height = MAX; }
          }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.6));
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const triggerPayfastRedirect = (regId: string) => {
    const form = document.createElement('form');
    form.action = 'https://www.payfast.co.za/eng/process';
    form.method = 'POST';
    const fields: Record<string, string> = {
      merchant_id: MERCHANT_ID,
      merchant_key: MERCHANT_KEY,
      return_url: `https://ludoleague.co.za/?page=kingstable&status=success`,
      cancel_url: `https://ludoleague.co.za/?page=kingstable&status=cancel`,
      name_first: formData.fullName.split(' ')[0] || '',
      name_last: formData.fullName.split(' ').slice(1).join(' ') || '',
      email_address: formData.email,
      m_payment_id: regId,
      amount: ENTRY_FEE.toFixed(2),
      item_name: "King's Table Tournament Entry",
      item_description: `Team: ${formData.teamName} | City: ${formData.city}`,
      custom_str1: 'kings_table',
      custom_str2: formData.teamName,
      custom_str3: formData.city,
    };
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = key; input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (paymentMethod === 'eft' && formData.proofOfPayment) {
        popUrl = await compressAndGetBase64(formData.proofOfPayment);
      }
      const regId = `kt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      setRegistrationId(regId);
      await setDoc(doc(db, 'kings_table_registrations', regId), {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        teamName: formData.teamName,
        city: formData.city,
        region: formData.region,
        paymentMethod,
        proofOfPaymentUrl: popUrl,
        status: paymentMethod === 'payfast' ? 'pending_online_payment' : 'pending_verification',
        eventName: "King's Table Tournament",
        entryFee: ENTRY_FEE,
        timestamp: serverTimestamp(),
      });
      if (paymentMethod === 'payfast') {
        triggerPayfastRedirect(regId);
      } else {
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('King\'s Table registration failed:', error);
      alert('Registration failed. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ['Your Details', 'Payment', 'Confirmed'];

  return (
    <div className="min-h-screen w-full bg-black text-white">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-black pt-8 pb-16 md:pb-20 px-4 border-b border-[#FACC15]/10">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/[0.04] via-transparent to-[#D4A017]/[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FACC15]/[0.05] rounded-full blur-3xl" />

        {/* Decorative diamond pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #FACC15 0, #FACC15 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px'
        }} />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Crown icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FACC15]/20 to-[#D4A017]/10 border border-[#FACC15]/30 mb-6"
          >
            <Crown size={40} className="text-[#FACC15]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block text-[10px] md:text-xs text-[#FACC15] font-bold uppercase tracking-[0.3em] bg-[#FACC15]/10 border border-[#FACC15]/20 rounded-full px-4 py-1.5 mb-4">
              Exclusive Tournament
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase leading-[0.9] mb-4"
          >
            <span className="text-white">The</span>{' '}
            <span className="bg-gradient-to-r from-[#FACC15] via-[#FFE600] to-[#D4A017] bg-clip-text text-transparent">
              King's
            </span>
            <br />
            <span className="text-white">Table</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-6 leading-relaxed"
          >
            Register your team for the most prestigious Ludo competition in South Africa. 
            <span className="text-[#FACC15] font-semibold"> R250 per team entry.</span>
          </motion.p>

          {/* Fee badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-flex items-center gap-3 bg-[#111827] border border-[#FACC15]/20 rounded-2xl px-6 py-3"
          >
            <Crown size={16} className="text-[#FACC15]" />
            <span className="text-white font-bold text-sm">Entry Fee:</span>
            <span className="text-[#FACC15] font-black text-lg">R{ENTRY_FEE.toFixed(2)}</span>
            <span className="text-white/40 text-xs">/ team</span>
          </motion.div>
        </div>
      </div>

      {/* ── Registration Form Area ── */}
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">

        {/* Step Progress Indicator */}
        <AnimatePresence mode="wait">
          {step !== 3 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-0 mb-10"
            >
              {stepLabels.map((label, i) => {
                const stepNum = i + 1;
                const isActive = step === stepNum;
                const isDone = step > stepNum;
                return (
                  <div key={i} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all duration-500 ${
                        isDone ? 'bg-[#FACC15] border-[#FACC15] text-black' :
                        isActive ? 'bg-black border-[#FACC15] text-[#FACC15]' :
                        'bg-black border-white/20 text-white/30'
                      }`}>
                        {isDone ? <CheckCircle2 size={16} /> : stepNum}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider mt-1.5 ${isActive ? 'text-[#FACC15]' : isDone ? 'text-white/50' : 'text-white/20'}`}>
                        {label}
                      </span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div className={`h-[2px] flex-1 mx-2 transition-all duration-500 ${isDone ? 'bg-[#FACC15]' : 'bg-white/10'}`} />
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <div className="bg-[#0D1117] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: Details ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10"
              >
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-display font-black uppercase text-white">
                    Step 1: <span className="text-[#FACC15]">Your Details</span>
                  </h2>
                  <p className="text-white/40 text-sm mt-1">Fill in your team's information to secure your spot.</p>
                </div>

                <form onSubmit={handleDetailsSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="relative">
                    <label className="block text-white/60 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                      Full Name <span className="text-[#FACC15]">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        id="kt-fullname"
                        type="text"
                        required
                        maxLength={100}
                        placeholder="e.g. John Dube"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Team Name */}
                  <div>
                    <label className="block text-white/60 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                      Team Name <span className="text-[#FACC15]">*</span>
                    </label>
                    <div className="relative">
                      <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        id="kt-teamname"
                        type="text"
                        required
                        maxLength={80}
                        placeholder="e.g. Soweto Kings"
                        value={formData.teamName}
                        onChange={e => setFormData({ ...formData, teamName: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/60 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                        Email <span className="text-[#FACC15]">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          id="kt-email"
                          type="email"
                          required
                          maxLength={128}
                          placeholder="you@email.com"
                          autoComplete="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/60 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                        Phone <span className="text-[#FACC15]">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          id="kt-phone"
                          type="tel"
                          required
                          maxLength={20}
                          placeholder="0XX XXX XXXX"
                          autoComplete="tel"
                          value={formData.phoneNumber}
                          onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* City / Location */}
                  <div>
                    <label className="block text-white/60 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                      City / Location <span className="text-[#FACC15]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <select
                        id="kt-city"
                        required
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/20 transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: 'none' }}
                      >
                        {SA_CITIES.map(city => (
                          <option key={city} value={city} className="bg-[#0D1117] text-white">
                            {city}
                          </option>
                        ))}
                      </select>
                      <ArrowRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  {/* Entry fee reminder */}
                  <div className="flex items-center gap-3 bg-[#FACC15]/[0.04] border border-[#FACC15]/15 rounded-xl px-5 py-4">
                    <Crown size={18} className="text-[#FACC15] shrink-0" />
                    <p className="text-white/60 text-sm">
                      Entry fee: <strong className="text-[#FACC15]">R{ENTRY_FEE.toFixed(2)}</strong> per team — payment collected on the next step.
                    </p>
                  </div>

                  <button
                    type="submit"
                    id="kt-next-btn"
                    className="w-full mt-2 py-4 bg-[#FACC15] text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-[#FFE600] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#FACC15]/10"
                  >
                    Next: Payment <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10"
              >
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-display font-black uppercase text-white">
                    Step 2: <span className="text-[#FACC15]">Payment</span>
                  </h2>
                  <p className="text-white/40 text-sm mt-1">Choose how you'd like to pay your R{ENTRY_FEE.toFixed(2)} entry fee.</p>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  {/* Summary pill */}
                  <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider">Team</p>
                      <p className="text-white font-bold text-sm mt-0.5">{formData.teamName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-xs uppercase tracking-wider">Entry Fee</p>
                      <p className="text-[#FACC15] font-black text-xl mt-0.5">R{ENTRY_FEE.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Payment method selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      id="kt-payfast-btn"
                      onClick={() => setPaymentMethod('payfast')}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold text-sm transition-all duration-300 ${
                        paymentMethod === 'payfast'
                          ? 'border-[#FACC15] bg-[#FACC15]/[0.08] text-white'
                          : 'border-white/10 text-white/50 hover:border-white/20'
                      }`}
                    >
                      <CreditCard size={22} className={paymentMethod === 'payfast' ? 'text-[#FACC15]' : 'text-white/40'} />
                      <span>Pay Online</span>
                      <span className="text-[10px] font-normal text-white/30">via PayFast</span>
                    </button>
                    <button
                      type="button"
                      id="kt-eft-btn"
                      onClick={() => setPaymentMethod('eft')}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold text-sm transition-all duration-300 ${
                        paymentMethod === 'eft'
                          ? 'border-[#FACC15] bg-[#FACC15]/[0.08] text-white'
                          : 'border-white/10 text-white/50 hover:border-white/20'
                      }`}
                    >
                      <Landmark size={22} className={paymentMethod === 'eft' ? 'text-[#FACC15]' : 'text-white/40'} />
                      <span>Manual EFT</span>
                      <span className="text-[10px] font-normal text-white/30">Bank transfer</span>
                    </button>
                  </div>

                  {/* PayFast details */}
                  {paymentMethod === 'payfast' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 space-y-3 text-sm"
                    >
                      <p className="text-white/60 font-bold">You will be securely redirected to PayFast to complete payment.</p>
                      <p className="text-white/40 text-xs">Accepted: Visa · Mastercard · Maestro · Capitec Pay · Instant EFT · SnapScan · Zapper</p>
                    </motion.div>
                  )}

                  {/* EFT banking details + upload */}
                  {paymentMethod === 'eft' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 space-y-2 text-sm">
                        <p className="text-[#FACC15] font-bold text-xs uppercase tracking-widest mb-3">Banking Details</p>
                        {[
                          ['Bank', 'Nedbank'],
                          ['Account Holder', 'THE LUDO LEAGUE SOUTH AFRICA (PTY) LTD'],
                          ['Account Number', '1120230365'],
                          ['Branch Code', '198765'],
                          ['Account Type', 'Current Account'],
                          ['Amount', `R${ENTRY_FEE.toFixed(2)}`],
                          ['Reference', `KT-${formData.teamName.replace(/\s+/g, '').toUpperCase()}`],
                        ].map(([label, value]) => (
                          <div key={label} className="flex justify-between text-xs">
                            <span className="text-white/40">{label}:</span>
                            <span className="text-white font-bold text-right max-w-[60%]">{value}</span>
                          </div>
                        ))}
                      </div>

                      <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center relative bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#FACC15]/30 transition-all">
                          <UploadCloud size={28} className="text-white/30 mb-2" />
                          <span className="text-xs font-bold text-[#FACC15]">
                            {formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment'}
                          </span>
                          <span className="text-white/30 text-[10px] mt-1">PDF or image accepted</span>
                          <input
                            id="kt-proof"
                            type="file"
                            accept=".pdf,image/*"
                            required={paymentMethod === 'eft'}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={e => setFormData({ ...formData, proofOfPayment: e.target.files ? e.target.files[0] : null })}
                          />
                        </div>
                      </label>
                    </motion.div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-white/60 font-bold hover:bg-white/[0.08] hover:text-white transition-all flex items-center justify-center gap-1.5 text-sm"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="submit"
                      id="kt-pay-btn"
                      disabled={isSubmitting || (paymentMethod === 'eft' && !formData.proofOfPayment)}
                      className="w-2/3 py-4 bg-[#FACC15] text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-[#FFE600] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FACC15]/10"
                    >
                      {isSubmitting
                        ? <><Loader2 className="animate-spin" size={18} /> Processing...</>
                        : paymentMethod === 'payfast'
                        ? <><CreditCard size={18} /> Pay R{ENTRY_FEE.toFixed(2)} Now</>
                        : <><CheckCircle2 size={18} /> Submit Registration</>
                      }
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ── STEP 3: Success ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 md:p-12 text-center"
              >
                {/* Success crown */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FACC15]/20 to-[#D4A017]/10 border border-[#FACC15]/30 flex items-center justify-center">
                    <Crown size={44} className="text-[#FACC15]" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full bg-[#FACC15]/10 blur-xl"
                  />
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-black uppercase text-white mb-3">
                  You're at the{' '}
                  <span className="text-[#FACC15]">Table!</span>
                </h2>

                <p className="text-white/50 leading-relaxed mb-2 max-w-md mx-auto">
                  {paymentMethod === 'eft'
                    ? `Your registration is submitted! We'll verify your payment and confirm your team's spot within 24–48 hours.`
                    : `Your payment has been processed. Your team is now registered for the King's Table Tournament!`
                  }
                </p>

                {registrationId && (
                  <p className="text-white/20 text-xs mb-8">
                    Registration ID: <span className="font-mono text-white/40">{registrationId}</span>
                  </p>
                )}

                <div className="space-y-3 max-w-sm mx-auto">
                  <div className="bg-[#FACC15]/[0.06] border border-[#FACC15]/15 rounded-xl px-5 py-4 text-sm text-white/60 text-left space-y-1.5">
                    <p>✅ Check your email for confirmation</p>
                    <p>📲 We'll WhatsApp you event details</p>
                    <p>👑 Welcome to the King's Table</p>
                  </div>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="w-full py-4 bg-white/[0.04] border border-white/10 rounded-xl text-white font-bold text-sm hover:bg-white/[0.08] transition-all"
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
