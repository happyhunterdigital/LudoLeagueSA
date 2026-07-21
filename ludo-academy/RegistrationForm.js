const RegistrationForm = ({ isOpen, onClose }) => {
  const [step, setStep] = React.useState(1);
  const [showPayFast, setShowPayFast] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '', email: '', phone: '', city: '', occupation: '',
    experienceLevel: '', playStyle: '', gameplayMode: [],
    coreValues: [], primaryGoal: '', agreedToTerms: false
  });

  if (!isOpen) return null;

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const toggleArrayField = (field, value) => {
    setFormData(prev => {
      const arr = prev[field];
      if (field === 'coreValues' && arr.includes(value) && arr.length >= 2) return prev;
      return { ...prev, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agreedToTerms) setShowPayFast(true);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#d4af37]">Step 1: Cadet Profile</h3>
            {['fullName', 'email', 'phone', 'city', 'occupation'].map(field => (
              <div key={field}>
                <label className="block text-sm text-gray-300 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input type={field === 'email' ? 'email' : 'text'} className="w-full bg-[#0f1535] border border-[#d4af37]/30 rounded p-2 text-white focus:outline-none focus:border-[#d4af37]" 
                  value={formData[field]} onChange={e => updateField(field, e.target.value)} required={field !== 'occupation'} />
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#d4af37]">Step 2: Gameplay Profile</h3>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Experience Level</label>
              {['Beginner', 'Casual', 'Intermediate', 'Advanced'].map(level => (
                <label key={level} className="flex items-center space-x-2 mb-2 cursor-pointer">
                  <input type="radio" name="exp" className="accent-[#d4af37]" checked={formData.experienceLevel === level} onChange={() => updateField('experienceLevel', level)} required />
                  <span className="text-sm text-gray-200">{level}</span>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Play Style</label>
              <select className="w-full bg-[#0f1535] border border-[#d4af37]/30 rounded p-2 text-white focus:outline-none focus:border-[#d4af37]" value={formData.playStyle} onChange={e => updateField('playStyle', e.target.value)} required>
                <option value="">Select...</option>
                {['Aggressive', 'Defensive', 'Balanced', 'Patient / Opportunistic'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Preferred Mode</label>
              {['Physical Board', 'Digital / Mobile', 'Both'].map(mode => (
                <label key={mode} className="flex items-center space-x-2 mb-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#d4af37]" checked={formData.gameplayMode.includes(mode)} onChange={() => toggleArrayField('gameplayMode', mode)} />
                  <span className="text-sm text-gray-200">{mode}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#d4af37]">Step 3: Mindset & Growth</h3>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Core Values (Max 2)</label>
              {['Patience & Timing', 'Focus & Concentration', 'Strategic Decision-Making', 'Resilience Under Setbacks', 'Calculated Risk-Taking'].map(val => (
                <label key={val} className="flex items-center space-x-2 mb-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#d4af37]" checked={formData.coreValues.includes(val)} onChange={() => toggleArrayField('coreValues', val)} disabled={formData.coreValues.length >= 2 && !formData.coreValues.includes(val)} />
                  <span className="text-sm text-gray-200">{val}</span>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Primary Goal</label>
              <textarea className="w-full bg-[#0f1535] border border-[#d4af37]/30 rounded p-2 text-white focus:outline-none focus:border-[#d4af37]" rows="3" value={formData.primaryGoal} onChange={e => updateField('primaryGoal', e.target.value)} required></textarea>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#d4af37]">Step 4: Code of Excellence</h3>
            <div className="bg-[#0f1535] p-4 rounded border border-[#d4af37]/20 text-sm text-gray-300 max-h-40 overflow-y-auto">
              <p className="mb-2 font-semibold text-[#d4af37]">Academy Pledge:</p>
              <p>"Every move matters both on the board and in life. I commit to upholding the values of discipline, sportsmanship, continuous learning, and respect."</p>
              <p className="mt-2 text-xs text-gray-400">By proceeding, you agree to the full Code of Excellence and Academy Terms (Zero tolerance for cheating, respect for opponents, etc.).</p>
            </div>
            <label className="flex items-start space-x-2 cursor-pointer">
              <input type="checkbox" className="accent-[#d4af37] w-5 h-5 mt-0.5" checked={formData.agreedToTerms} onChange={e => updateField('agreedToTerms', e.target.checked)} required />
              <span className="text-sm text-gray-200">I agree to the Code of Excellence and Academy Terms.</span>
            </label>
          </div>
        );
    }
  };

  if (showPayFast) {
    return (
      <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
        <div className="bg-[#0a0e27] border border-[#d4af37] rounded-2xl p-6 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="text-2xl font-bold text-[#d4af37] mb-2">Application Received!</h3>
          <p className="text-gray-300 mb-6">Proceed to secure payment via PayFast to finalize your cadet registration.</p>
          <form action="https://sandbox.payfast.co.za/eng/process" method="POST" className="space-y-3">
            <input type="hidden" name="merchant_id" value="YOUR_MERCHANT_ID" />
            <input type="hidden" name="merchant_key" value="YOUR_MERCHANT_KEY" />
            <input type="hidden" name="amount" value="150.00" />
            <input type="hidden" name="item_name" value="Ludo Academy Cadet Registration" />
            <input type="hidden" name="name_first" value={formData.fullName} />
            <input type="hidden" name="email_address" value={formData.email} />
            <input type="hidden" name="cell_number" value={formData.phone} />
            <input type="hidden" name="return_url" value="https://ludoacademy.ludoleague.co.za/success" />
            <input type="hidden" name="cancel_url" value="https://ludoacademy.ludoleague.co.za/cancel" />
            <button type="submit" className="w-full bg-[#d4af37] text-[#0a0e27] font-bold py-3 rounded-full hover:bg-[#f4e5c2] transition">Pay R150.00 via PayFast</button>
          </form>
          <button onClick={() => setShowPayFast(false)} className="mt-4 text-sm text-gray-400 hover:text-white">Back to Form</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0e27] border border-[#d4af37]/30 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-[#d4af37]/20 flex justify-between items-center sticky top-0 bg-[#0a0e27] z-10">
          <div>
            <h2 className="text-xl font-bold text-[#d4af37]">Cadet Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 4</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6">
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i <= step ? 'bg-[#d4af37]' : 'bg-gray-700'}`} />
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            {renderStep()}
            <div className="flex justify-between mt-8 sticky bottom-0 bg-[#0a0e27] pt-4 border-t border-[#d4af37]/10">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-2 border border-[#d4af37] text-[#d4af37] rounded-full hover:bg-[#d4af37]/10 transition">Back</button>
              ) : <div />}
              {step < 4 ? (
                <button type="button" onClick={nextStep} className="px-6 py-2 bg-[#d4af37] text-[#0a0e27] font-bold rounded-full hover:bg-[#f4e5c2] transition">Next</button>
              ) : (
                <button type="submit" className="px-6 py-2 bg-[#d4af37] text-[#0a0e27] font-bold rounded-full hover:bg-[#f4e5c2] transition">Submit Application</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CookieConsent = () => {
  const [visible, setVisible] = React.useState(true);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-[#0a0e27] border border-[#d4af37]/30 rounded-xl p-4 shadow-2xl z-40">
      <p className="text-sm text-gray-300 mb-3">
        We use cookies to enhance your experience and comply with the <strong className="text-[#d4af37]">POPI Act</strong>. By continuing, you agree to our <a href="#" className="text-[#d4af37] underline hover:text-[#f4e5c2]">Privacy Policy</a>.
      </p>
      <div className="flex space-x-2">
        <button onClick={() => setVisible(false)} className="flex-1 bg-[#d4af37] text-[#0a0e27] font-bold py-2 rounded-lg text-sm hover:bg-[#f4e5c2] transition">Accept All</button>
        <button onClick={() => setVisible(false)} className="flex-1 border border-gray-600 text-gray-300 py-2 rounded-lg text-sm hover:bg-gray-800 transition">Decline</button>
      </div>
    </div>
  );
};

window.LudoForms = { RegistrationForm, CookieConsent };
