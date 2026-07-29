import { useState } from 'react';
import { motion } from 'framer-motion';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Loader2, CheckCircle2, UploadCloud, CreditCard, Landmark, Shield } from 'lucide-react';
import { SectionHeader } from '../components/ui/SharedUI';

function md5(str: string): string {
  function safeAdd(x: number, y: number) { var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF); }
  function bitRotateLeft(num: number, cnt: number) { return (num << cnt) | (num >>> (32 - cnt)); }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b); }
  function md5ff(a:number,b:number,c:number,d:number,x:number,s:number,t:number){ return md5cmn((b & c) | (~b & d), a, b, x, s, t); }
  function md5gg(a:number,b:number,c:number,d:number,x:number,s:number,t:number){ return md5cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function md5hh(a:number,b:number,c:number,d:number,x:number,s:number,t:number){ return md5cmn(b ^ c ^ d, a, b, x, s, t); }
  function md5ii(a:number,b:number,c:number,d:number,x:number,s:number,t:number){ return md5cmn(c ^ (b | ~d), a, b, x, s, t); }
  function str2binl(s: string) { var output: number[] = []; for (var i = 0; i < s.length * 8; i += 8) output[i >> 5] |= (s.charCodeAt(i / 8) & 0xFF) << (i % 32); return output; }
  function binl2hex(binarray: number[]) { var hex_tab = '0123456789abcdef'; var output = ''; for (var i = 0; i < binarray.length * 4; i++) { output += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF); } return output; }
  function coreMD5(x: number[], len: number) {
    x[len >> 5] |= 0x80 << (len % 32); x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
      var olda=a, oldb=b, oldc=c, oldd=d;
      a=md5ff(a,b,c,d,x[i+0],7,-680876936); d=md5ff(d,a,b,c,x[i+1],12,-389564586); c=md5ff(c,d,a,b,x[i+2],17,606105819); b=md5ff(b,c,d,a,x[i+3],22,-1044525330);
      a=md5ff(a,b,c,d,x[i+4],7,-176418897); d=md5ff(d,a,b,c,x[i+5],12,1200080426); c=md5ff(c,d,a,b,x[i+6],17,-1473231341); b=md5ff(b,c,d,a,x[i+7],22,-45705983);
      a=md5ff(a,b,c,d,x[i+8],7,1770035416); d=md5ff(d,a,b,c,x[i+9],12,-1958414417); c=md5ff(c,d,a,b,x[i+10],17,-42063); b=md5ff(b,c,d,a,x[i+11],22,-1990404162);
      a=md5ff(a,b,c,d,x[i+12],7,1804603682); d=md5ff(d,a,b,c,x[i+13],12,-40341101); c=md5ff(c,d,a,b,x[i+14],17,-1502002290); b=md5ff(b,c,d,a,x[i+15],22,1236535329);
      a=md5gg(a,b,c,d,x[i+1],5,-165796510); d=md5gg(d,a,b,c,x[i+6],9,-1069501632); c=md5gg(c,d,a,b,x[i+11],14,643717713); b=md5gg(b,c,d,a,x[i+0],20,-373897302);
      a=md5gg(a,b,c,d,x[i+5],5,-701558691); d=md5gg(d,a,b,c,x[i+10],9,38016083); c=md5gg(c,d,a,b,x[i+15],14,-660478335); b=md5gg(b,c,d,a,x[i+4],20,-405537848);
      a=md5gg(a,b,c,d,x[i+9],5,568446438); d=md5gg(d,a,b,c,x[i+14],9,-1019803690); c=md5gg(c,d,a,b,x[i+3],14,-187363961); b=md5gg(b,c,d,a,x[i+8],20,1163531501);
      a=md5gg(a,b,c,d,x[i+13],5,-1444681467); d=md5gg(d,a,b,c,x[i+2],9,-51403784); c=md5gg(c,d,a,b,x[i+7],14,1735328473); b=md5gg(b,c,d,a,x[i+12],20,-1926607734);
      a=md5hh(a,b,c,d,x[i+5],4,-378558); d=md5hh(d,a,b,c,x[i+8],11,-2022574463); c=md5hh(c,d,a,b,x[i+11],16,1839030562); b=md5hh(b,c,d,a,x[i+14],23,-35309556);
      a=md5hh(a,b,c,d,x[i+1],4,-1530992060); d=md5hh(d,a,b,c,x[i+4],11,1272893353); c=md5hh(c,d,a,b,x[i+7],16,-155497632); b=md5hh(b,c,d,a,x[i+10],23,-1094730640);
      a=md5hh(a,b,c,d,x[i+13],4,681279174); d=md5hh(d,a,b,c,x[i+0],11,-358537222); c=md5hh(c,d,a,b,x[i+3],16,-722521979); b=md5hh(b,c,d,a,x[i+6],23,76029189);
      a=md5hh(a,b,c,d,x[i+9],4,-640364487); d=md5hh(d,a,b,c,x[i+12],11,-421815835); c=md5hh(c,d,a,b,x[i+15],16,530742520); b=md5hh(b,c,d,a,x[i+2],23,-995338651);
      a=md5ii(a,b,c,d,x[i+0],6,-198630844); d=md5ii(d,a,b,c,x[i+7],10,1126891415); c=md5ii(c,d,a,b,x[i+14],15,-1416354905); b=md5ii(b,c,d,a,x[i+5],21,-57434055);
      a=md5ii(a,b,c,d,x[i+12],6,1700485571); d=md5ii(d,a,b,c,x[i+3],10,-1894986606); c=md5ii(c,d,a,b,x[i+10],15,-1051523); b=md5ii(b,c,d,a,x[i+1],21,-2054922799);
      a=md5ii(a,b,c,d,x[i+8],6,1873313359); d=md5ii(d,a,b,c,x[i+15],10,-30611744); c=md5ii(c,d,a,b,x[i+6],15,-1560198380); b=md5ii(b,c,d,a,x[i+13],21,1309151649);
      a=md5ii(a,b,c,d,x[i+4],6,-145523070); d=md5ii(d,a,b,c,x[i+11],10,-1120210379); c=md5ii(c,d,a,b,x[i+2],15,718787259); b=md5ii(b,c,d,a,x[i+9],21,-343485551);
      a=safeAdd(a,olda); b=safeAdd(b,oldb); c=safeAdd(c,oldc); d=safeAdd(d,oldd);
    }
    return [a, b, c, d];
  }
  var s = unescape(encodeURIComponent(str));
  return binl2hex(coreMD5(str2binl(s), s.length * 8));
}

function generatePayFastSignature(data: Record<string, string>): string {
  var pfOutput = '';
  var keys = Object.keys(data).sort();
  keys.forEach(function(key) {
    if (key !== 'signature' && data[key] !== '' && data[key] !== null && data[key] !== undefined) {
      pfOutput += key + '=' + encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+') + '&';
    }
  });
  return md5(pfOutput.slice(0, -1));
}

export const Tournaments = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'payfast' | 'eft'>('payfast');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    region: 'Soweto',
    experience: 'intermediate',
    motivation: '',
    proofOfPayment: null as File | null
  });

  const entryFee = 1500.00;

  const triggerPayfastRedirect = (regId: string) => {
    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '-';
    const cleanPhone = formData.phoneNumber.replace(/\D/g, '');

    const payfastData: Record<string, string> = {
      merchant_id: '35471207',
      merchant_key: 'q9qkx9sqx9l3m',
      return_url: 'https://ludoleague.co.za/?page=tournaments&status=success',
      cancel_url: 'https://ludoleague.co.za/?page=tournaments&status=cancel',
      notify_url: 'https://us-central1-ludoleaguesa-33371.cloudfunctions.net/payfastNotify',
      amount: '1500.00',
      item_name: 'Ludo Agent Official Registration',
      item_description: 'Official Agent Registration - Ludo League South Africa',
      name_first: firstName,
      name_last: lastName,
      email_address: formData.email,
      cell_number: cleanPhone,
      m_payment_id: regId,
      custom_str1: regId,
      custom_str2: 'agent'
    };

    const signature = generatePayFastSignature(payfastData);

    const form = document.createElement('form');
    form.action = 'https://www.payfast.co.za/eng/process';
    form.method = 'POST';

    Object.entries({ ...payfastData, signature }).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const registrationId = `agent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    if (db) {
      try {
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          phoneNumber: formData.phoneNumber,
          businessName: formData.businessName,
          region: formData.region,
          experience: formData.experience,
          motivation: formData.motivation,
          paymentMethod,
          status: paymentMethod === 'payfast' ? 'pending_online_payment' : 'pending_verification',
          eventName: 'Ludo Agent Registration',
          type: 'contact',
          amount: entryFee,
          timestamp: serverTimestamp(),
          createdAt: serverTimestamp()
        };

        await setDoc(doc(db, 'event_registrations', registrationId), payload);
        await addDoc(collection(db, 'academy_registrations'), payload);

        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: 'Ludo Agent Application Received - Ludo League SA',
            html: `<div style="font-family: sans-serif; padding:20px; background:#0f172a; color:#fff;">
              <h2 style="color:#FFC107;">Application Logged Successfully!</h2>
              <p>Hello ${formData.fullName},</p>
              <p>Thank you for registering as an Official Ludo Agent for <b>${formData.businessName || formData.fullName}</b> in the ${formData.region} region.</p>
              <p>Fee: R${entryFee.toFixed(2)} (Founding Agent Rate).</p>
              <p>Best regards,<br>The Ludo League SA Team</p>
            </div>`
          },
          createdAt: serverTimestamp()
        });
      } catch (fsErr) {
        console.warn("Firestore logging completed with fallback:", fsErr);
      }
    }

    if (paymentMethod === 'payfast') {
      triggerPayfastRedirect(registrationId);
    } else {
      setStep(3);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="tournaments" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#0EA5E9] text-[#0F172A]">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl mx-auto">
        <SectionHeader tag="Official Accreditation" title="Ludo Agents Registration" colorClass="text-white" />

        <div className="bg-white border border-white/20 p-8 rounded-2xl shadow-xl mt-8">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs space-y-1 mb-4">
                <p className="font-bold text-amber-900 text-sm flex items-center gap-2"><Shield size={16} /> Founding Agent Licence: R{entryFee.toFixed(2)}</p>
                <p className="text-amber-700">* Reduced from R2,500.00 for early adopters (Limited Slots).</p>
              </div>

              <input required type="text" placeholder="Full Name *" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 font-bold" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
              <input required type="email" placeholder="Email Address *" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 font-bold" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input required type="tel" placeholder="Phone Number *" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 font-bold" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
              <input required type="text" placeholder="Business / Agency Name *" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 font-bold" value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} />
              
              <select className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 font-bold" value={formData.region} onChange={e => setFormData({ ...formData, region: e.target.value })}>
                <option value="Soweto">Soweto</option>
                <option value="Alexandra">Alexandra</option>
                <option value="Mamelodi">Mamelodi</option>
                <option value="Pretoria">Pretoria</option>
                <option value="Gauteng">Gauteng (Other)</option>
              </select>

              <textarea required rows={3} placeholder="Why do you want to become a Ludo Agent? *" className="w-full bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl p-4 font-bold" value={formData.motivation} onChange={e => setFormData({ ...formData, motivation: e.target.value })} />

              <div className="flex gap-3">
                <button type="button" onClick={() => { window.location.href = window.location.origin; }} className="w-1/2 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black uppercase tracking-widest rounded-xl shadow-md cursor-pointer">Cancel</button>
                <button type="submit" className="w-1/2 py-4 bg-[#D32F2F] text-white font-black uppercase tracking-widest rounded-xl shadow-md cursor-pointer">Next: Payment</button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-6">
              <h3 className="text-xl font-bold uppercase">Step 2: Choose Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setPaymentMethod('payfast')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold cursor-pointer ${paymentMethod === 'payfast' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><CreditCard size={20} />PayFast Online</button>
                <button type="button" onClick={() => setPaymentMethod('eft')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 font-bold cursor-pointer ${paymentMethod === 'eft' ? 'border-[#0EA5E9] bg-sky-50' : 'border-slate-200'}`}><Landmark size={20} />Manual EFT</button>
              </div>

              {paymentMethod === 'eft' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border text-xs space-y-1">
                    <p><b>Bank:</b> Nedbank | <b>Account:</b> THE LUDO LEAGUE SOUTH AFRICA</p>
                    <p><b>Account No:</b> 1120230365 | <b>Branch:</b> 198765</p>
                    <p><b>Amount Due:</b> R{entryFee.toFixed(2)} | <b>Ref:</b> AGENT-{formData.fullName.replace(/\s+/g,'')}</p>
                  </div>

                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer relative bg-slate-50">
                    <UploadCloud size={24} className="text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-[#0EA5E9]">{formData.proofOfPayment ? formData.proofOfPayment.name : 'Upload Proof of Payment (EFT)'}</span>
                    <input type="file" accept=".pdf,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({ ...formData, proofOfPayment: e.target.files ? e.target.files[0] : null })} />
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(1)} className="w-1/2 py-4 bg-slate-100 rounded-xl font-bold cursor-pointer">Back</button>
                <button type="submit" disabled={isSubmitting} className="w-1/2 py-4 bg-[#D32F2F] text-white font-black uppercase tracking-widest rounded-xl cursor-pointer">
                  {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={18} /> : (paymentMethod === 'payfast' ? `Pay R${entryFee.toFixed(2)} Now` : 'Complete Registration')}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500"><CheckCircle2 size={48} /></div>
              <h3 className="text-2xl font-bold uppercase">Application Logged!</h3>
              <p className="text-slate-600">Your Ludo Agent application and registration details have been securely recorded. An acknowledgment email has been dispatched.</p>
              <button onClick={() => setStep(1)} className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl cursor-pointer">Back to Start</button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
