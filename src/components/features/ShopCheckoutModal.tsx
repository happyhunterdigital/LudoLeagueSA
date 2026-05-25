import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, CheckCircle2, UploadCloud } from 'lucide-react';
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
  const [selectedCourier, setSelectedCourier] = useState<string>('local_over');
  const [formData, setFormData] = useState({ fullName: '', email: '', address: '', proofOfPayment: null as File | null });

  const baseTotal = cart.reduce((sum, itemId) => sum + (PRODUCTS.find(p => p.id === itemId)?.price || 0), 0);
  const chosenCourier = courierOptions.find(o => o.id === selectedCourier);
  const courierPrice = chosenCourier ? chosenCourier.price : 0;
  const grandTotal = baseTotal + courierPrice;

  // Compresses screenshots to fit perfectly within the Firestore 1MB document limit
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
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress to standard JPEG at 60% quality (under 100KB payload size)
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

  const handleCancelTransaction = () => {
    clearCart();
    setStep(1);
    setFormData({ fullName: '', email: '', address: '', proofOfPayment: null });
    onClose();
    alert("Transaction cancelled. Your shopping cart has been emptied.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (formData.proofOfPayment) {
        // High-speed compression eliminates Firestore size errors and bypasses Storage preflight blocks
        popUrl = await compressAndGetBase64(formData.proofOfPayment);
      }
      if (db) {
        await addDoc(collection(db, 'event_registrations'), {
          fullName: formData.fullName,
          email: formData.email,
          paymentMethod: 'eft',
          proofOfPaymentUrl: popUrl,
          status: 'pending_verification',
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
      setStep(3);
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
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white border border-slate-200 p-8 rounded-[20px] shadow-2xl z-10 text-[#001F3F]">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-lg hover:bg-slate-100 transition-colors"><X size={20} /></button>
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <h3 className="text-2xl font-display font-black italic uppercase">Step 1: Shipping Details</h3>
                <input required type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-[#0EA5E9] text-slate-900 font-bold" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                <input required type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-[#0EA5E9] text-slate-900 font-bold" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <textarea required placeholder="Delivery Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-[#0EA5E9] h-20 text-slate-900 font-bold" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-slate-500">Select Courier Rate (106x87x2cm - 3kg)</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-[#0EA5E9] text-slate-900 font-bold" value={selectedCourier} onChange={e => setSelectedCourier(e.target.value)}>
                    {courierOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name} (+R{option.price})</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-[#0EA5E9] hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-md">Next: Payment Info</button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-display font-black italic uppercase">Step 2: Bank Transfer</h3>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-sm text-slate-700">
                  <p><b>Bank Name:</b> Nedbank</p>
                  <p><b>Account Holder:</b> THE LUDO LEAGUE SOUTH AFRICA (PTY) LTD</p>
                  <p><b>Account Number:</b> 1120230365</p>
                  <p><b>Branch Code:</b> 198765</p>
                  <p><b>Account Type:</b> Current Account</p>
                  <p><b>Reference:</b> SHOP-{formData.fullName.replace(/\s+/g, '')}</p>
                  <p className="pt-2 border-t text-base text-[#001F3F]"><b>Grand Total (inc. Shipping):</b> <span className="text-[#0EA5E9] font-black">R{grandTotal.toLocaleString()}</span></p>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer relative bg-slate-50 hover:bg-slate-100 transition-colors">
                  <UploadCloud size={32} className="text-slate-400 mb-2" />
                  <span className="text-xs font-black text-[#0EA5E9]">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                  <input required type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({ ...formData, proofOfPayment: e.target.files ? e.target.files[0] : null })} />
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={handleCancelTransaction} className="w-1/2 py-4 bg-red-100 hover:bg-red-200 rounded-xl text-red-700 font-bold transition-colors">Cancel Transaction</button>
                  <button type="submit" disabled={isSubmitting || !formData.proofOfPayment} className="w-1/2 py-4 bg-[#D32F2F] hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl disabled:opacity-50 transition-all flex items-center justify-center shadow-lg">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Place Order'}
                  </button>
                </div>
              </form>
            )}
            {step === 3 && (
              <div className="text-center space-y-6 py-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500"><CheckCircle2 size={48} /></div>
                <h3 className="text-2xl font-display font-black italic uppercase">Order Placed!</h3>
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
