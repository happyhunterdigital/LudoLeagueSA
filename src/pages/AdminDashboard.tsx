import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy, updateDoc, doc, addDoc } from 'firebase/firestore';
import { Loader2, FileText, Filter, Users, Lock, Gift, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';

export const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'LudoAdmin2026!') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect access password. Please try again.');
    }
  };

  const fetchData = async () => {
    if (!db || !isAuthenticated) return;
    setLoading(true);
    try {
      const regQuery = query(collection(db, 'event_registrations'), orderBy('timestamp', 'desc'));
      const regSnap = await getDocs(regQuery);
      setRegistrations(regSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Failed fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const getAccumulativeDonations = (email: string): number => {
    return registrations
      .filter(r => r.email === email && (r.eventName.toLowerCase().includes('donation') || r.eventName.toLowerCase().includes('fund')))
      .reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
  };

  const handleVerify = async (reg: any) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'event_registrations', reg.id), { status: 'verified' });
      
      const isShop = reg.eventName.toLowerCase().includes('shop') || reg.eventName.toLowerCase().includes('merchandise');
      const isDonation = reg.eventName.toLowerCase().includes('donation') || reg.eventName.toLowerCase().includes('fund');
      
      let emailSubject = `Payment Verified: ${reg.eventName}`;
      let thankYouMessage = '';

      if (isShop) {
        emailSubject = `Order Confirmed: Ludo League SA Official Gear`;
        thankYouMessage = `<p>Thank you for purchasing official Ludo League SA merchandise! Your manual EFT payment has been verified, and your order is now being packaged for courier delivery.</p>`;
      } else if (isDonation) {
        emailSubject = `Contribution Confirmed: Ludo League SA Community Fund`;
        thankYouMessage = `<p>Thank you for your generous contribution to the Ludo League SA Community Fund! Your manual EFT payment has been verified. Your support directly funds server upkeep and township development.</p>`;
      } else {
        emailSubject = `Registration Confirmed: Ludo League SA Tournament Arena`;
        thankYouMessage = `<p>Thank you for registering to compete in the upcoming Ludo League SA tournament qualifiers! Your manual EFT entrance fee has been successfully verified, and your spot in the bracket is now fully secured.</p>`;
      }

      await addDoc(collection(db, 'mail'), {
        to: reg.email,
        message: {
          subject: emailSubject,
          html: `
            <div style="font-family: sans-serif; padding: 32px; background-color: #f8fafc; color: #0f172a; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid #e2e8f0;">
              <h2 style="color: #0d9488; font-style: italic; margin-bottom: 20px; font-size: 24px; text-transform: uppercase;">Payment Verification Successful</h2>
              <p style="font-size: 16px;">Hi <b>${reg.fullName}</b>,</p>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin: 20px 0; font-size: 15px; line-height: 1.6;">
                ${thankYouMessage}
              </div>
              <p style="font-size: 14px; color: #64748b; margin-top: 24px;">Ludo League South Africa (Pty) Ltd</p>
            </div>
          `
        }
      });
      fetchData();
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const filteredRegistrations = registrations.filter(r => {
    if (filterType === 'all') return true;
    if (filterType === 'shop') return r.eventName.includes('Shop');
    if (filterType === 'tournament') return r.eventName.includes('Tournament');
    if (filterType === 'donation') return r.eventName.includes('Donation');
    return true;
  });

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center bg-slate-900 text-white p-6">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center border border-amber-500/20">
            <Lock size={28} />
          </div>
          <h2 className="text-3xl font-display font-black uppercase italic">Admin Portal Locked</h2>
          <p className="text-slate-400 text-sm">Please input the secret administrator access password to enter the console.</p>
          <input required type="password" placeholder="Access Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white text-center font-bold outline-none focus:border-amber-500 transition-colors" />
          <button type="submit" className="w-full py-4 bg-amber-500 hover:bg-white text-slate-950 font-black uppercase tracking-widest rounded-xl transition-all shadow-lg">Authenticate Console</button>
        </form>
      </section>
    );
  }

  return (
    <section id="admin" className="min-h-screen w-full py-24 px-4 md:px-10 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag="Secure Console" title="Admin Control" colorClass="text-slate-900" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 font-bold uppercase tracking-widest text-xs">
            <Filter size={16} /> Filter Collections:
          </div>
          <div className="flex gap-2">
            {['all', 'shop', 'tournament', 'donation'].map(type => (
              <button key={type} onClick={() => setFilterType(type)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${filterType === type ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {type}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-amber-500" size={48} /></div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <th className="p-6">Member Details</th>
                    <th className="p-6">Category/Region</th>
                    <th className="p-6">Event/Item</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredRegistrations.map(item => {
                    const accumulativeDonations = getAccumulativeDonations(item.email);
                    const isEligibleForGift = accumulativeDonations >= 500;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="p-6 space-y-2">
                          <div>
                            <div className="font-bold text-slate-900">{item.fullName}</div>
                            <div className="text-xs text-slate-500">{item.email}</div>
                          </div>
                          {isEligibleForGift && (
                            <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-black rounded-lg flex items-center gap-1.5 w-fit animate-pulse">
                              <Gift size={12} /> ELIGIBLE FOR GIFT (R{accumulativeDonations})
                            </div>
                          )}
                        </td>
                        <td className="p-6">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase rounded-full">
                            <Users size={12} /> {item.region || 'Supporter'}
                          </span>
                        </td>
                        <td className="p-6 font-medium text-slate-700">{item.eventName}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${item.status === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-6 flex items-center gap-3">
                          {item.proofOfPaymentUrl && (
                            <a href={item.proofOfPaymentUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-accent-teal hover:underline">
                              <FileText size={16} /> Receipt
                            </a>
                          )}
                          {item.status !== 'verified' && (
                            <button onClick={() => handleVerify(item)} className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-colors">
                              Verify
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
