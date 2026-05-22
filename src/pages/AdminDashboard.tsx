import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy, updateDoc, doc, addDoc } from 'firebase/firestore';
import { Loader2, CheckCircle2, FileText, Filter, Users } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';

export const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');

  const fetchData = async () => {
    if (!db) return;
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
    fetchData();
  }, []);

  const handleVerify = async (reg: any) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'event_registrations', reg.id), { status: 'verified' });
      await addDoc(collection(db, 'mail'), {
        to: reg.email,
        message: {
          subject: `Payment Verified & Confirmed: ${reg.eventName}`,
          html: `
            <div style="font-family: sans-serif; padding: 24px; color: #0f172a;">
              <h2 style="color: #0d9488; font-style: italic;">Payment Verification Successful</h2>
              <p>Hi <b>${reg.fullName}</b>,</p>
              <p>We have successfully verified your manual EFT bank transfer for <b>${reg.eventName}</b>.</p>
              <p><b>Event/Order details:</b> ${reg.eventDate}</p>
              <p>Thank you for competing and backing the league!</p>
              <a href="${reg.eventLink}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 16px;">Go to Portal</a>
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
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-accent-teal" size={48} /></div>
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
                  {filteredRegistrations.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="p-6">
                        <div className="font-bold text-slate-900">{item.fullName}</div>
                        <div className="text-xs text-slate-500">{item.email}</div>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
