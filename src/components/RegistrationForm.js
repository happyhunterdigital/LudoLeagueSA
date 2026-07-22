// components/RegistrationForm.js
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DISTRICTS = ['Alexandra', 'Soweto', 'Mamelodi'];
const EVENT_TYPES = ['Tournament', 'League', 'Clinic', 'Schools Program'];

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    district: '',
    
    // Step 2: Event Details
    eventType: '',
    preferredDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Step 3: Payment
    paymentMethod: 'payfast',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 1) {
      // Validate personal details
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
        isValid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
        isValid = false;
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
        isValid = false;
      }
      
      if (!formData.idNumber.trim()) {
        newErrors.idNumber = 'ID number is required';
        isValid = false;
      }
      
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
        isValid = false;
      }
      
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
        isValid = false;
      }
      
      if (!formData.district) {
        newErrors.district = 'District is required';
        isValid = false;
      }
    }

    if (step === 2) {
      // Validate event details
      if (!formData.eventType) {
        newErrors.eventType = 'Event type is required';
        isValid = false;
      }
      
      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Preferred date is required';
        isValid = false;
      }
      
      if (!formData.emergencyContact.trim()) {
        newErrors.emergencyContact = 'Emergency contact name is required';
        isValid = false;
      }
      
      if (!formData.emergencyPhone.trim()) {
        newErrors.emergencyPhone = 'Emergency contact phone is required';
        isValid = false;
      }
    }

    if (step === 3) {
      // Validate payment
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      // Save registration to Firestore
      const registrationData = {
        ...formData,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        type: 'contact' // For email extension trigger
      };

      const docRef = await addDoc(collection(db, 'event_registrations'), registrationData);
      setRegistrationId(docRef.id);

      // Create payment record
      const paymentResponse = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationId: docRef.id,
          amount: 150, // Example amount
          paymentMethod: formData.paymentMethod,
          participantData: {
            fullName: formData.fullName,
            email: formData.email
          }
        })
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to create payment');
      }

      const paymentData = await paymentResponse.json();
      
      // Redirect to payment gateway or show success
      setCurrentStep(4);

    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 1: Your Details</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone Number *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="082 123 4567"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">ID Number *</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.idNumber ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter ID number"
        />
        {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth *</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gender *</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not">Prefer not to say</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">District *</label>
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select district</option>
          {DISTRICTS.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
        {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 2: Event Details</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">Event Type *</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.eventType ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select event type</option>
          {EVENT_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Preferred Date *</label>
        <input
          type="date"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.preferredDate ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Emergency Contact Name *</label>
        <input
          type="text"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Full name"
        />
        {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Emergency Contact Phone *</label>
        <input
          type="tel"
          name="emergencyPhone"
          value={formData.emergencyPhone}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="082 123 4567"
        />
        {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 3: Payment</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Registration Fee: R150.00</h3>
        <p className="text-sm text-gray-600">Secure payment via PayFast</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="payfast">PayFast (Credit Card/EFT)</option>
          <option value="eft">Direct EFT</option>
        </select>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className="mt-1 mr-2"
        />
        <label className="text-sm">
          I agree to the <a href="/terms" className="text-blue-600 underline">Terms and Conditions</a> and 
          <a href="/privacy" className="text-blue-600 underline"> Privacy Policy</a> *
        </label>
      </div>
      {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center py-8">
      <div className="text-green-500 text-6xl mb-4">✓</div>
      <h2 className="text-2xl font-bold mb-4">Registration Complete!</h2>
      <p className="mb-4">Thank you for registering with Ludo League SA.</p>
      <p className="mb-4">A confirmation email has been sent to <strong>{formData.email}</strong></p>
      <p className="text-sm text-gray-600">Registration ID: {registrationId}</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-20 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Details</span>
          <span>Event</span>
          <span>Payment</span>
          <span>Complete</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg border border-gray-300
                ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              Back
            </button>
            
            {currentStep === 3 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Complete Registration'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next: {currentStep === 1 ? 'Event' : 'Payment'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
