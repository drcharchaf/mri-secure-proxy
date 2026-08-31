const ALLOWED_ORIGIN = 'https://money-and-risk-inventory.github.io';
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }
  const { advisorEmail, clientEmail, clientLink } = req.body || {};
  if (!clientEmail || !clientLink) {
    res.status(400).json({ error: 'Missing clientEmail or clientLink.' });
    return;
  }
  try {
    const upstream = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'MRI Secure <noreply@mail.moneyandriskinventory.com>',
        to: [clientEmail],
        reply_to: advisorEmail || undefined,
        subject: 'A Quick Financial Risk Assessment From Your Advisor',
        html:
          '<p>Your advisor has asked you to complete a short risk assessment as part of your financial planning.</p>' +
          '<p>It takes about 5 minutes — just answer honestly, there are no right or wrong answers.</p>' +
          '<p style="margin:22px 0"><a href="' + clientLink + '" style="display:inline-block;background:#2e69a3;color:#ffffff;font-weight:600;font-size:15px;padding:12px 24px;border-radius:8px;text-decoration:none">Begin the Assessment</a></p>' +
          '<p style="color:#888;font-size:12px">If the button above doesn\'t work, copy and paste this link into your browser:<br>' + clientLink + '</p>' +
          '<p style="color:#888;font-size:12px">If you weren\'t expecting this, you can safely ignore this email.</p>'
      })
    });
    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: 'Resend error', details: data });
      return;
    }
    res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    res.status(502).json({ error: 'Failed to send email: ' + err.message });
  }
};
