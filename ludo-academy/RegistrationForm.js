import { useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBqYqG2C4oqJL5w5Ub5RoUz3w_xrSkqW1Q",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ludoleaguesa-33371.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ludoleaguesa-33371",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ludoleaguesa-33371.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1088023817043",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1088023817043:web:b6e4b9a4e3a4f5c8d12345"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const PROVINCES = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape'];

// Minimal MD5 implementation for PayFast Signatures
function md5(str) {
  function safeAdd(x, y) { var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF); }
  function bitRotateLeft(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
  function md5cmn(q, a, b, x, s, t) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b); }
  function md5ff(a,b,c,d,x,s,t){ return md5cmn((b & c) | (~b & d), a, b, x, s, t); }
  function md5gg(a,b,c,d,x,s,t){ return md5cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function md5hh(a,b,c,d,x,s,t){ return md5cmn(b ^ c ^ d, a, b, x, s, t); }
  function md5ii(a,b,c,d,x,s,t){ return md5cmn(c ^ (b | ~d), a, b, x, s, t); }
  function str2binl(s) { var output = []; for (var i = 0; i < s.length * 8; i += 8) output[i >> 5] |= (s.charCodeAt(i / 8) & 0xFF) << (i % 32); return output; }
  function binl2hex(binarray) { var hex_tab = '0123456789abcdef'; var output = ''; for (var i = 0; i < binarray.length * 4; i++) { output += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF); } return output; }
  function coreMD5(x, len) {
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

function generatePayFastSignature(data) {
  var pfOutput = '';
  var keys = Object.keys(data).sort();
  keys.forEach(function(key) {
    if (key !== 'signature' && data[key] !== '' && data[key] !== null && data[key] !== undefined) {
      pfOutput += key + '=' + encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+') + '&';
    }
  });
  return md5(pfOutput.slice(0, -1));
}

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    province: 'Gauteng',
    role: 'prospect',
    experience: '',
    motivation: '',
    agreeToTerms: false
  });

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Full name (min 3 characters) is required';
        isValid = false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email address is required';
        isValid = false;
      }
      if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 9) {
        newErrors.phone = 'Valid phone number is required';
        isValid = false;
      }
      if (!formData.idNumber.trim() || !/^\d{13}$/.test(formData.idNumber)) {
        newErrors.idNumber = 'Valid 13-digit SA ID number is required';
        isValid = false;
      }
      if (!formData.province) {
        newErrors.province = 'Province selection is required';
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.experience) {
        newErrors.experience = 'Experience level is required';
        isValid = false;
      }
      if (!formData.motivation || formData.motivation.trim().length < 20) {
        newErrors.motivation = 'Motivation details required (at least 20 characters)';
        isValid = false;
      }
    }

    if (step === 3) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the Terms of Registration';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setIsSubmitting(true);

    try {
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '-';
      const cleanPhone = formData.phone.replace(/\D/g, '');

      const payload = {
        fullName: formData.fullName,
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        idNumber: formData.idNumber,
        province: formData.province,
        registrationType: formData.role,
        experience: formData.experience,
        motivation: formData.motivation,
        amount: 1500.00,
        currency: 'ZAR',
        status: 'pending_payment',
        paymentStatus: 'pending',
        eventName: formData.role === 'agent' ? 'Ludo Academy Agent Registration' : 'Ludo Academy Prospect Registration',
        type: 'contact',
        createdAt: serverTimestamp(),
        timestamp: serverTimestamp()
      };

      // Save to event_registrations (for AdminDashboard) and academy_registrations
      const docRef = await addDoc(collection(db, 'event_registrations'), payload);
      await addDoc(collection(db, 'academy_registrations'), payload);
      setRegistrationId(docRef.id);

      // Construct PayFast Production Payment Data
      const payfastData = {
        merchant_id: '35471207',
        merchant_key: 'q9qkx9sqx9l3m',
        return_url: 'https://academy.ludoleague.co.za?payment=success',
        cancel_url: 'https://academy.ludoleague.co.za?payment=cancelled',
        notify_url: 'https://us-central1-ludoleaguesa-33371.cloudfunctions.net/payfastNotify',
        amount: '1500.00',
        item_name: 'Ludo Academy of Excellence — Founding Prospect Licence',
        item_description: 'Official Prospect registration for Ludo Academy of Excellence',
        name_first: firstName,
        name_last: lastName,
        email_address: formData.email,
        cell_number: cleanPhone,
        custom_str1: docRef.id,
        custom_str2: formData.role
      };

      const signature = generatePayFastSignature(payfastData);

      // Create & submit live production PayFast form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.payfast.co.za/eng/process';

      Object.entries({ ...payfastData, signature }).forEach(([key, val]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = val;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      setCurrentStep(4);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-1">Step 1: Prospect Profile</h2>
      <p className="text-xs text-amber-600 font-semibold mb-4">Registration Fee: R1,500.00 (Reduced from R2,500.00)</p>
      
      <div>
        <label className="block text-sm font-medium mb-1">Full Name *</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g. Sipho Dlamini" />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email Address *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="you@email.com" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone Number *</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="+27 XX XXX XXXX" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">SA ID Number *</label>
        <input type="text" name="idNumber" maxLength={13} value={formData.idNumber} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.idNumber ? 'border-red-500' : 'border-gray-300'}`} placeholder="13-digit ID number" />
        {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Province *</label>
        <select name="province" value={formData.province} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.province ? 'border-red-500' : 'border-gray-300'}`}>
          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 2: Experience &amp; Motivation</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">Ludo Experience Level *</label>
        <select name="experience" value={formData.experience} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}>
          <option value="">Select experience level</option>
          <option value="beginner">Beginner — Casual player</option>
          <option value="intermediate">Intermediate — Regular player</option>
          <option value="competitive">Competitive — Tournament player</option>
          <option value="advanced">Advanced — Coach / Organizer</option>
        </select>
        {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Why do you want to join the Academy? *</label>
        <textarea name="motivation" rows={4} value={formData.motivation} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.motivation ? 'border-red-500' : 'border-gray-300'}`} placeholder="Tell us what drives you to professionalise your Ludo journey (at least 20 characters)..."></textarea>
        {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-2">Step 3: Registration Summary &amp; Payment</h2>
      
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg space-y-2 text-sm text-gray-800">
        <div className="flex justify-between"><span>Founding Prospect Licence:</span><span className="line-through">R2,500.00</span></div>
        <div className="flex justify-between text-green-600 font-semibold"><span>Early Adopter Discount:</span><span>−R1,000.00</span></div>
        <hr />
        <div className="flex justify-between font-bold text-base text-amber-900"><span>Total Due:</span><span>R1,500.00</span></div>
        <p className="text-xs text-amber-700 mt-1">* Reduced from R2,500.00 for Founding Prospects</p>
      </div>

      <div className="flex items-start mt-4">
        <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="mt-1 mr-2" />
        <label className="text-xs text-gray-700">
          I agree to the Ludo South Africa Code of Conduct, Terms of Registration, and understand that payment of R1,500.00 confirms my Founding Prospect place.
        </label>
      </div>
      {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center py-8">
      <div className="text-green-500 text-6xl mb-4">✓</div>
      <h2 className="text-2xl font-bold mb-2">Application Saved!</h2>
      <p className="mb-4 text-sm text-gray-600">Redirecting to PayFast to secure your R1,500.00 Founding Prospect place...</p>
      {registrationId && <p className="text-xs text-gray-400">Registration ID: {registrationId}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= step ? 'bg-amber-500 text-black' : 'bg-gray-200 text-gray-500'}`}>
                {step}
              </div>
              {step < 4 && <div className={`w-16 h-1 mx-2 ${currentStep > step ? 'bg-amber-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}

      {currentStep < 4 && (
        <div className="flex justify-between mt-8 pt-4 border-t">
          <button type="button" onClick={handleBack} disabled={currentStep === 1} className="px-6 py-2 rounded-lg border text-sm font-semibold disabled:opacity-50">
            Back
          </button>
          {currentStep === 3 ? (
            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-sm disabled:opacity-50">
              {isSubmitting ? 'Processing...' : 'Pay R1,500.00 via PayFast'}
            </button>
          ) : (
            <button type="button" onClick={handleNext} className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-sm">
              Next Step →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
