import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: 'prospect',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Please complete all required fields.');
      return;
    }
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: 1500, // Updated Prospect price in ZAR
        }),
      });
      const paymentData = await response.json();
      if (paymentData.success) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.payfast.co.za/eng/process';
        Object.keys(paymentData.fields).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = paymentData.fields[key];
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
      } else {
        alert('Payment setup failed: ' + paymentData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Ludo Academy Registration</h2>
      <p className="text-xs text-blue-600 font-semibold mb-6">Fee: R1,500.00 (Reduced from R2,500.00)</p>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">First Name *</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Last Name *</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Phone *</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Role Selection *</label>
        <select name="course" value={formData.course} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
          <option value="prospect">Founding Prospect - R1,500</option>
          <option value="agent">Official Ludo Agent - R1,500</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold">
        Register &amp; Pay R1,500 Now
      </button>
    </form>
  );
};

export default RegistrationForm;
