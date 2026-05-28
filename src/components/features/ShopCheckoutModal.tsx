import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, CheckCircle2, UploadCloud, CreditCard, Landmark } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PRODUCTS } from '../../data/products';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cart: string[];
  clearCart: () => void;
}

const courierOptions = [
  { id: 'local_over', name: 'Local (Gauteng) - Overnight (3kg)', price: 151 },
  { id: 'local_sameday', name: 'Local (Gauteng) - Same Day (Before 10:30) (3kg)', price: 190 },
  { id: 'inland_eco', name: 'Inland (Truck) - Economy (3kg)', price: 174 },
  { id: 'inland_over', name: 'Inland (Truck) - Overnight (3kg)', price: 242 },
  { id: 'coastal_eco', name: 'Coastal (Flight) - Economy (3kg)', price: 174 },
  { id: 'coastal_over', name: 'Coastal (Flight) - Overnight (3kg)', price: 283 },
];

export const ShopCheckoutModal: React.FC<CheckoutProps> = ({ isOpen, onClose, cart, clearCart }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'eft' | 'payfast'>('payfast');
  const [selectedCourier, setSelectedCourier] = useState<string>('local_over');
  const [formData, setFormData] = useState({ fullName: '', email: '', address: '', proofOfPayment: null as File | null });

  const baseTotal = cart.reduce((sum, itemId) => sum + (PRODUCTS.find(p => p.id === itemId)?.price || 0), 0);
  const chosenCourier = courierOptions.find(o => o.id === selectedCourier);
  const courierPrice = chosenCourier ? chosenCourier.price : 0;
  const grandTotal = baseTotal + courierPrice;

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
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) { ctx.drawImage(img, 0, 0, width, height); resolve(canvas.toDataURL('image/jpeg', 0.6)); }
          else { resolve(event.target?.result as string); }
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleCancelTransaction = () => {
    clearCart();
    setStep(1);
    setFormData({ fullName: '', email: '', address: '', proofOfPayment: null });
    onClose();
    alert("Transaction cancelled. Your shopping cart has been emptied.");
  };

  const triggerPayfastRedirect = () => {
    const form = document.createElement('form');
    form.action = 'https://www.payfast.co.za/eng/process';
    form.method = 'POST';

    const fields = {
      merchant_id: '35471207',
      merchant_key: 'q9qkx9sqx9l3m',
      return_url: 'https://ludoleague.co.za/?page=shop&status=success',
      cancel_url: 'https://ludoleague.co.za/?page=shop&status=cancel',
      name_first: formData.fullName.split(' ')[0] || '',
      name_last: formData.fullName.split(' ').slice(1).join(' ') || '',
      email_address: formData.email,
      m_payment_id: `shop_${Date.now()}`,
      amount: grandTotal.toFixed(2),
      item_name: `Shop Purchase: ${cart.join(', ')}`,
      custom_str1: 'shop_purchase'
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = key; input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (paymentMethod === 'eft' && formData.proofOfPayment) {
        popUrl = await compressAndGetBase64(formData.proofOfPayment);
      }
      if (db) {
        await addDoc(collection(db, 'event_registrations'), {
          fullName: formData.fullName,
          email: formData.email,
          paymentMethod,
          proofOfPaymentUrl: popUrl,
          status: paymentMethod === 'payfast' ? 'pending_online_payment' : 'pending_verification',
          eventName: 'Shop Merchandise Purchase',
          eventDate: new Date().toLocaleDateString(),
          eventLink: 'N/A - Physical Gear Delivery',
          deliveryAddress: formData.address,
          courierChoice: chosenCourier?.name,
          courierCost: courierPrice,
          items: cart,
          totalCost: grandTotal,
          timestamp: serverTimestamp(),
        });
      }
      if (paymentMethod === 'payfast') {
        triggerPayfastRedirect();
      } else {
        setStep(3);
      }
    } catch (error) {
      console.error("Checkout failed entirely:", error);
      alert("An unexpected error occurred during submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 overflow-y-auto bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white border border-slate-200 p-5 sm:p-8 rounded-[20px] shadow-2xl z-10 text-[#001F3F] my-auto">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors"><X size={18} /></button>
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-3.5">
                <h3 className="text-xl sm:text-2xl font-display font-black italic uppercase">Step 1: Shipping Details</h3>
                <input required type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm outline-none focus:border-[#0EA5E9] text-slate-900 font-bold" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                <input required type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm outline-none focus:border-[#0EA5E9] text-slate-900 font-bold" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <textarea required placeholder="Delivery Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm outline-none focus:border-[#0EA5E9] h-16 sm:h-20 text-slate-900 font-bold" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Select Courier Rate (106x87x2cm - 3kg)</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm outline-none focus:border-[#0EA5E9] text-slate-900 font-bold" value={selectedCourier} onChange={e => setSelectedCourier(e.target.value)}>
                    {courierOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name} (+R{option.price})</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full py-3 sm:py-4 bg-[#0EA5E9] hover:bg-slate-900 text-white text-xs sm:text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-md mt-1">Next: Payment Info</button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-display font-black italic uppercase">Step 2: Choose Payment</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setPaymentMethod('payfast')} className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${paymentMethod === 'payfast' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><CreditCard size={18} className="text-[#0EA5E9]" />Payfast Online</button>
                  <button type="button" onClick={() => setPaymentMethod('eft')} className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${paymentMethod === 'eft' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><Landmark size={18} className="text-[#0EA5E9]" />Manual EFT</button>
                </div>
                {paymentMethod === 'eft' ? (
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                      <p><b>Bank Name:</b> Nedbank</p>
                      <p><b>Account Holder:</b> THE LUDO LEAGUE SOUTH AFRICA (PTY) LTD</p>
                      <p><b>Account Number:</b> 1120230365</p>
                      <p><b>Branch Code:</b> 198765</p>
                      <p><b>Account Type:</b> Current Account</p>
                      <p><b>Reference:</b> SHOP-{formData.fullName.replace(/\s+/g, '')}</p>
                      <p className="pt-1.5 border-t text-sm text-[#001F3F]"><b>Grand Total:</b> <span className="text-[#0EA5E9] font-black">R{grandTotal.toLocaleString()}</span></p>
                    </div>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer relative bg-slate-50 hover:bg-slate-100 transition-colors">
                      <UploadCloud size={24} className="text-slate-400 mb-1" />
                      <span className="text-[10px] font-black text-[#0EA5E9] text-center truncate max-w-[200px]">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                      <input required={paymentMethod === 'eft'} type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({ ...formData, proofOfPayment: e.target.files ? e.target.files[0] : null })} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-3.5 text-xs text-slate-700">
                    <p className="text-sm text-[#001F3F]"><b>Total Payment:</b> <span className="text-[#0EA5E9] font-black">R{grandTotal.toLocaleString()}</span></p>
                    <div className="border-t border-slate-200 pt-2.5 space-y-2">
                      <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Accepted Payment Methods:</p>
                      <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-2 rounded-xl border border-slate-100">
                        <svg className="h-3 w-8 text-[#1A1F71]" viewBox="0 0 24 15" fill="currentColor"><path d="M10.15 0l-2.4 14.3h2.36l2.4-14.3H10.15zm8.13 0l-2.2 10.3-.9-4.7c-.2-.9-.9-1.6-1.8-1.6H9.41l-.14.6 2.15.5c.6.1.9.4 1 .8l2.1 8.7h2.47L21 0h-2.72zm-12 0L3.8 9.5 3.5 8C2.9 6 1 3.8 0 3.3v11H2.47L6.47 0H6.28z" /></svg>
                        <svg className="h-4 w-6" viewBox="0 0 24 15" fill="currentColor"><circle cx="7" cy="7.5" r="7" fill="#EB001B" /><circle cx="15" cy="7.5" r="7" fill="#F79E1B" opacity="0.8" /></svg>
                        <svg className="h-4 w-6" viewBox="0 0 24 15" fill="currentColor"><circle cx="7" cy="7.5" r="7" fill="#0064B3" /><circle cx="15" cy="7.5" r="7" fill="#EB001B" opacity="0.8" /></svg>
                        <svg className="h-4 w-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M12 10v11M12 3L3 10h18L12 3z" /></svg>
                        <svg className="h-3.5 w-10" viewBox="0 0 40 15"><rect x="2" y="2" width="12" height="10" fill="#003366" rx="1" /><rect x="18" y="2" width="12" height="10" fill="#D32F2F" rx="1" /></svg>
                        <svg className="h-4 w-4 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9V5a2 2 0 012-2h4M21 9V5a2 2 0 00-2-2h-4M3 15v4a2 2 0 002 2h4M21 15v4a2 2 0 01-2 2h-4M12 12h.01" /></svg>
                        <svg className="h-4 w-4 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-2 4L9 17h8m0-10H7l8 10H7" /></svg>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button type="button" onClick={handleCancelTransaction} className="w-1/2 py-3 bg-red-100 hover:bg-red-200 rounded-xl text-red-700 font-bold transition-colors text-xs sm:text-sm">Cancel</button>
                  <button type="submit" disabled={isSubmitting || (paymentMethod === 'eft' && !formData.proofOfPayment)} className="w-1/2 py-3 bg-[#D32F2F] hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl disabled:opacity-50 transition-all flex items-center justify-center shadow-lg text-xs sm:text-sm">
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : paymentMethod === 'payfast' ? 'Pay Now' : 'Place Order'}
                  </button>
                </div>
              </form>
            )}
            {step === 3 && (
              <div className="text-center space-y-6 py-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500"><CheckCircle2 size={48} /></div>
                <h3 className="text-2xl font-display font-black italic uppercase text-slate-955">ORDER PLACED pending verification</h3>
                <p className="text-slate-600 leading-relaxed">Thank you for purchasing official gear! Your order status is currently pending verification of your bank transfer receipt.</p>
                <button onClick={() => { setStep(1); onClose(); }} className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all">Close Window</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
