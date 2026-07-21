const crypto = require('crypto');

// THESE STAY ON YOUR SERVER - NEVER EXPOSE TO CLIENT
const MERCHANT_ID = '35471207';
const MERCHANT_KEY = 'q9qkx9sqx9l3m';
const PASSPHRASE = 'your_secure_passphrase'; // Add this in PayFast dashboard

module.exports = async function createPayment(req, res) {
  try {
    const { firstName, lastName, email, phone, course, amount } = req.body;

    // Generate unique transaction ID
    const m_payment_id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create PayFast fields
    const pfData = {
      merchant_id: MERCHANT_ID,
      merchant_key: MERCHANT_KEY,
      return_url: `${process.env.BASE_URL}/payment/success`,
      cancel_url: `${process.env.BASE_URL}/payment/cancel`,
      notify_url: `${process.env.BASE_URL}/api/payment-ipn`,
      name_first: firstName,
      name_last: lastName,
      email_address: email,
      cell_number: phone,
      m_payment_id: m_payment_id,
      amount: amount,
      item_name: `Ludo Academy - ${course} Course`,
      custom_str1: course,
      custom_str2: email,
    };

    // Generate signature
    const pfParamString = Object.keys(pfData)
      .filter(key => pfData[key] !== '' && pfData[key] !== null && pfData[key] !== undefined)
      .map(key => `${key}=${encodeURIComponent(pfData[key]).replace(/%20/g, '+')}`)
      .join('&');

    const signature = crypto
      .createHash('md5')
      .update(pfParamString + '&passphrase=' + encodeURIComponent(PASSPHRASE))
      .digest('hex');

    pfData.signature = signature;

    // Save registration to database here
    // await db.registrations.create({ ...req.body, paymentId: m_payment_id });

    res.json({
      success: true,
      fields: pfData,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment',
    });
  }
};
