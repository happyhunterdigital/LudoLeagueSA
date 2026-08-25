import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy, updateDoc, doc, addDoc } from 'firebase/firestore';
import { Loader2, FileText, Filter, Users, Lock, Gift, MapPin, Phone, ShieldCheck, Download, Search } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';
import { SILVERTON_ATTENDEES, SILVERTON_EVENT_META } from '../data/silvertonAttendance';

export const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'registrations' | 'ludo_agents'>('ludo_agents');
  // Ludo Agents filters
  const [agentSearch, setAgentSearch] = useState('');
  const [agentRegion, setAgentRegion] = useState<string>('all');
  const [agentGender, setAgentGender] = useState<string>('all');
  const [agentAgeGroup, setAgentAgeGroup] = useState<string>('all');
  const [agentsFromDb, setAgentsFromDb] = useState<any[] | null>(null);

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
      setRegistrations(regSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Failed fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    if (!db || !isAuthenticated) return;
    try {
      // Try Firestore first (admin-only collection); fallback to local JSON on permission/empty
      const q = query(collection(db, 'ludo_agents'), orderBy('fullName', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setAgentsFromDb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setAgentsFromDb(null);
      }
    } catch (e) {
      // Permission denied or not seeded yet — use local bundled data
      console.warn('ludo_agents fetch failed, using bundled data:', e);
      setAgentsFromDb(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      fetchAgents();
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

  // Ludo Agents derived data (Firestore if seeded, else bundled)
  const agentsSource = useMemo(() => agentsFromDb && agentsFromDb.length > 0 ? agentsFromDb : SILVERTON_ATTENDEES, [agentsFromDb]);

  const filteredAgents = useMemo(() => {
    return agentsSource.filter((a: any) => {
      if (agentRegion !== 'all' && a.regionCluster !== agentRegion) return false;
      if (agentGender !== 'all' && a.gender !== agentGender) return false;
      if (agentAgeGroup !== 'all' && a.ageGroup !== agentAgeGroup) return false;
      if (agentSearch) {
        const q = agentSearch.toLowerCase();
        return a.fullName.toLowerCase().includes(q) || a.townNormalized.toLowerCase().includes(q) || a.phoneRaw.includes(q) || a.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [agentsSource, agentRegion, agentGender, agentAgeGroup, agentSearch]);

  const agentStats = useMemo(() => {
    const byRegion: Record<string, number> = {};
    const byGender: Record<string, number> = {};
    const byAge: Record<string, number> = {};
    for (const a of agentsSource as any[]) {
      byRegion[a.regionCluster] = (byRegion[a.regionCluster] || 0) + 1;
      byGender[a.gender] = (byGender[a.gender] || 0) + 1;
      byAge[a.ageGroup] = (byAge[a.ageGroup] || 0) + 1;
    }
    return { byRegion, byGender, byAge, total: agentsSource.length, qualified: (agentsSource as any[]).filter(a => a.signature).length };
  }, [agentsSource]);

  const downloadAgentsCSV = () => {
    const header = 'id,fullName,age,gender,phoneRaw,phoneE164,townNormalized,regionCluster,ageGroup,qualificationStatus,eventId\n';
    const rows = filteredAgents.map((a: any) => [a.id, `"${a.fullName}"`, a.age, a.gender, `"${a.phoneRaw}"`, a.phoneE164, `"${a.townNormalized}"`, a.regionCluster, a.ageGroup, a.qualificationStatus, a.eventId].join(',')).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const el = document.createElement('a');
    el.href = url;
    el.download = `silverton-2026-agents-${new Date().toISOString().slice(0,10)}.csv`;
    el.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center bg-slate-900 text-white p-6">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center border border-amber-500/20">
            <Lock size={28} />
          </div>
          <h2 className="text-3xl font-display font-black uppercase italic">Admin Portal Locked</h2>
          <p className="text-slate-400 text-sm">Please input the secret administrator access password to enter the console. Access at <span className="text-amber-400 font-mono">academy.ludoleague.co.za/?page=admin</span></p>
          <input id="admin-password" name="password" required type="password" placeholder="Access Password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white text-center font-bold outline-none focus:border-amber-500 transition-colors" />
          <button type="submit" className="w-full py-4 bg-amber-500 hover:bg-white text-slate-950 font-black uppercase tracking-widest rounded-xl transition-all shadow-lg">Authenticate Console</button>
        </form>
      </section>
    );
  }

  return (
    <section id="admin" className="min-h-screen w-full py-24 px-4 md:px-10 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag="Secure Console — academy.ludoleague.co.za" title="Admin Control" colorClass="text-slate-900" />
        {/* Top tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('ludo_agents')} className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'ludo_agents' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
            <ShieldCheck size={16} /> Silverton 2026 — Ludo Agents <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-500 text-slate-900 text-[10px]">{agentStats.total}</span>
          </button>
          <button onClick={() => setActiveTab('registrations')} className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'registrations' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
            <Users size={16} /> Registrations <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]">{registrations.length}</span>
          </button>
        </div>

        {activeTab === 'ludo_agents' ? (
          <>
            {/* Event summary + stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Event</div>
                <div className="font-black text-slate-900 mt-1">{SILVERTON_EVENT_META.venue}</div>
                <div className="text-xs text-slate-500">{SILVERTON_EVENT_META.date} • {SILVERTON_EVENT_META.eventName}</div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full"><ShieldCheck size={12} /> {agentStats.qualified} qualified ✓</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">By Region Cluster</div>
                <div className="mt-2 space-y-1 text-xs">
                  {Object.entries(agentStats.byRegion).map(([k,v]) => (
                    <div key={k} className="flex justify-between"><span className="text-slate-600">{k}</span><span className="font-bold text-slate-900">{v}</span></div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">By Gender / Age</div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-slate-600">M / F</span><span className="font-bold">{agentStats.byGender['M'] || 0} / {agentStats.byGender['F'] || 0}</span></div>
                  {Object.entries(agentStats.byAge).map(([k,v]) => (
                    <div key={k} className="flex justify-between"><span className="text-slate-600">{k}</span><span className="font-bold">{v}</span></div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-500 rounded-2xl p-5 shadow-sm text-slate-900">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Qualification</div>
                <div className="font-black text-lg mt-1 leading-tight">Ticks ✓ = qualifies to be <em>considered</em> for Ludo Agent</div>
                <div className="text-xs mt-2 opacity-80">All 57 with signature tick. Next: vetting + R1,500 Founding Licence.</div>
                <div className="mt-3 text-[10px] font-mono bg-black/10 rounded-lg px-2 py-1 inline-block">{SILVERTON_EVENT_META.eventId}</div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 mb-6 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={agentSearch} onChange={e => setAgentSearch(e.target.value)} placeholder="Search name, town, phone, ID…" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <select value={agentRegion} onChange={e => setAgentRegion(e.target.value)} className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest outline-none">
                    <option value="all">All Regions</option>
                    <option value="Mamelodi-Pretoria">Mamelodi-Pretoria</option>
                    <option value="Soweto">Soweto</option>
                    <option value="Bronkhorstspruit-Cullinan">Bronkhorstspruit-Cullinan</option>
                    <option value="Silverton-Atteridgeville">Silverton-Atteridgeville</option>
                    <option value="Other-Gauteng">Other-Gauteng</option>
                  </select>
                  <select value={agentGender} onChange={e => setAgentGender(e.target.value)} className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest outline-none">
                    <option value="all">All Genders</option>
                    <option value="F">Female (F)</option>
                    <option value="M">Male (M)</option>
                  </select>
                  <select value={agentAgeGroup} onChange={e => setAgentAgeGroup(e.target.value)} className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest outline-none">
                    <option value="all">All Ages</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45+">45+</option>
                  </select>
                  <button onClick={downloadAgentsCSV} className="px-4 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors">
                    <Download size={14} /> Export CSV ({filteredAgents.length})
                  </button>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-500">Showing <b className="text-slate-900">{filteredAgents.length}</b> of <b>{agentsSource.length}</b> candidates • Data: {agentsFromDb ? 'Firestore `ludo_agents` (live)' : 'Bundled `src/data/silvertonAttendance.ts` (Firestore not seeded yet — run `npm run seed:silverton`)'} • Visible only at <b>academy.ludoleague.co.za/?page=admin</b> after password</div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <th className="p-4">#</th>
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Age / Gender</th>
                      <th className="p-4">Town / Region</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Qualification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredAgents.map((a: any) => (
                      <tr key={a.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono text-xs text-slate-500">{a.id}<div className="text-[10px]">p{a.sourcePage}-r{a.sourceRow}</div></td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{a.fullName}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={10} /> {a.townNormalized}</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-full">{a.age} • {a.gender}</span>
                          <div className="text-[10px] text-slate-500 mt-1">{a.ageGroup}</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">{a.regionCluster}</span>
                          <div className="text-xs text-slate-500 mt-1">{a.townRaw}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-1"><Phone size={12} /> {a.phoneRaw}</div>
                          <div className="text-[10px] text-slate-500">{a.phoneE164}</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                            <ShieldCheck size={12} /> qualified_pending_review ✓
                          </span>
                          <div className="text-[10px] text-slate-500 mt-1">eligible to be considered</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredAgents.length === 0 && (
                <div className="py-12 text-center text-sm text-slate-500">No candidates match filters.</div>
              )}
            </div>
            <div className="mt-4 text-[11px] text-slate-400 text-center">Private admin view only • Not indexed • Accessible at <b>https://academy.ludoleague.co.za/?page=admin</b> with password <b>LudoAdmin2026!</b> • API: Firestore `ludo_agents` (admin-only writes, reads gated by UI)</div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
};
