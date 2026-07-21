const crypto = require('crypto');
const https = require('https');

const MERCHANT_ID = '35471207';
const MERCHANT_KEY = 'q9qkx9sqx9l3m';
const PASSPHRASE = 'your_secure_passphrase';

module.exports = async function handleIPN(req, res) {
  try {
    // Validate IPN comes from PayFast
    const validHosts = [
      'www.payfast.co.za',
      'w1w.payfast.co.za',
      'w2w.payfast.co.za',
    ];
    
    if (!validHosts.includes(req.headers.host)) {
      return res.status(403).send('Invalid host');
    }

    // Create parameter string
    const pfData = { ...req.body };
    delete pfData.signature;
    
    const pfParamString = Object.keys(pfData)
      .filter(key => pfData[key] !== '' && pfData[key] !== null)
      .map(key => `${key}=${encodeURIComponent(pfData[key]).replace(/%20/g, '+')}`)
      .join('&');

    const signature = crypto
      .createHash('md5')
      .update(pfParamString + '&passphrase=' + encodeURIComponent(PASSPHRASE))
      .digest('hex');

    if (signature !== req.body.signature) {
      return res.status(400).send('Invalid signature');
    }

    // Verify with PayFast
    const verifyData = {
      merchant_id: MERCHANT_ID,
      merchant_key: MERCHANT_KEY,
      ...pfData,
    };

    const verifyString = Object.keys(verifyData)
      .map(key => `${key}=${encodeURIComponent(verifyData[key]).replace(/%20/g, '+')}`)
      .join('&');

    const options = {
      hostname: 'www.payfast.co.za',
      port: 443,
      path: '/eng/query/validate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(verifyString),
      },
    };

    const verifyReq = https.request(options, (verifyRes) => {
      let data = '';
      verifyRes.on('data', (chunk) => { data += chunk; });
      verifyRes.on('end', async () => {
        if (data === 'VALID') {
          // Payment successful - update database
          await updatePaymentStatus(req.body.m_payment_id, 'PAID');
          res.send('OK');
        } else {
          res.status(400).send('INVALID');
        }
      });
    });

    verifyReq.write(verifyString);
    verifyReq.end();

  } catch (error) {
    console.error('IPN Error:', error);
    res.status(500).send('Error');
  }
};

async function updatePaymentStatus(paymentId, status) {
  // Update your database
  // await db.registrations.update({ paymentId }, { status });
}
