import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Loader2, LogOut, Award, ShoppingBag, Heart, User as UserIcon, Shield } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';

export const UserDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        fetchUserRecords(currentUser.email || '');
      } else {
        setRecords([]);
      }
    });
    return unsubscribe;
  }, []);

  const fetchUserRecords = async (userEmail: string) => {
    setDataLoading(true);
    try {
      const q = query(collection(db, 'event_registrations'), where('email', '==', userEmail));
      const snap = await getDocs(q);
      setRecords(snap.docs.map(doc => doc.data()));
    } catch (err) {
      console.error('Error fetching records:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert('Google authentication failed. Please try again.');
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      alert(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleSignOut = () => signOut(auth);

  if (authLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-900">
        <Loader2 className="animate-spin text-amber-500" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center bg-[#0F172A] p-6 text-white">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl space-y-6">
          <h2 className="text-3xl font-display font-black uppercase italic text-center text-amber-500">My Portal</h2>
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <input required type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-bold outline-none focus:border-amber-500 text-sm" />
            <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-bold outline-none focus:border-amber-500 text-sm" />
            <button type="submit" className="w-full py-4 bg-[#D32F2F] hover:bg-white text-white hover:text-slate-950 font-black uppercase tracking-widest rounded-xl transition-all shadow-lg text-xs">{isSignUp ? 'Create Account' : 'Sign In'}</button>
          </form>
          <div className="relative flex items-center justify-center"><hr className="w-full border-slate-700" /><span className="absolute bg-slate-800 px-3 text-xs text-slate-400">OR</span></div>
          <button onClick={handleGoogleSignIn} className="w-full py-4 bg-white hover:bg-[#FFD700] text-slate-950 font-black uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs">Continue with Google</button>
          <p className="text-center text-xs text-slate-400"><button onClick={() => setIsSignUp(!isSignUp)} className="underline hover:text-white">{isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}</button></p>
        </div>
      </section>
    );
  }

  const isAthlete = records.some(r => r.eventName.toLowerCase().includes('tournament') || r.eventName.toLowerCase().includes('entry'));
  const isBuyer = records.some(r => r.eventName.toLowerCase().includes('shop') || r.eventName.toLowerCase().includes('merchandise'));
  const isDonor = records.some(r => r.eventName.toLowerCase().includes('donation') || r.eventName.toLowerCase().includes('fund'));

  return (
    <section className="min-h-screen w-full py-24 px-4 md:px-10 bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20"><UserIcon size={24} /></div>
            <div>
              <h2 className="text-2xl font-display font-black italic uppercase">Profile Portal</h2>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="px-5 py-3 bg-slate-800 hover:bg-red-600 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all"><LogOut size={14} /> Sign Out</button>
        </div>

        {dataLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-amber-500" size={32} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isAthlete && (
              <div className="bg-slate-800/50 border border-sky-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="w-10 h-10 text-sky-400 bg-sky-500/10 rounded-lg flex items-center justify-center"><Shield size={20} /></div>
                <h3 className="text-xl font-display font-black italic uppercase">Tournament Athlete</h3>
                <div className="text-xs text-slate-300 space-y-2">
                  <p>Your regional tournament registration is verified. Brackets and qualifiers are live in Pretoria.</p>
                  <p className="pt-2 border-t border-slate-700/50"><b>Ruleset:</b> Standardized physical clock rules strictly enforced by certified judges.</p>
                </div>
              </div>
            )}
            {isBuyer && (
              <div className="bg-slate-800/50 border border-emerald-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="w-10 h-10 text-emerald-400 bg-emerald-500/10 rounded-lg flex items-center justify-center"><ShoppingBag size={20} /></div>
                <h3 className="text-xl font-display font-black italic uppercase">Merchandise Orders</h3>
                <div className="text-xs text-slate-300 space-y-2">
                  <p>Your official high-density MDF wooden board order is currently processing.</p>
                  <p className="pt-2 border-t border-slate-700/50"><b>Shipping status:</b> EFT verification successful. Courier dispatch tracking code pending.</p>
                </div>
              </div>
            )}
            {isDonor && (
              <div className="bg-slate-800/50 border border-rose-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="w-10 h-10 text-rose-400 bg-rose-500/10 rounded-lg flex items-center justify-center"><Award size={20} /></div>
                <h3 className="text-xl font-display font-black italic uppercase">Community Backer</h3>
                <div className="text-xs text-slate-300 space-y-2">
                  <p>Thank you for backing Ludo League SA. Unlocked profile badge: Supporter.</p>
                  <p className="pt-2 border-t border-slate-700/50"><b>Impact Contribution:</b> Unlocks critical school resource kits and professional prize pools.</p>
                </div>
              </div>
            )}
            {!isAthlete && !isBuyer && !isDonor && (
              <div className="col-span-3 text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-2xl space-y-3">
                <p className="text-sm text-slate-400">You have no active registrations, orders, or contributions on this account profile.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
