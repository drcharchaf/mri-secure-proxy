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
  const { advisorEmail, clientEmail, resumeLink } = req.body || {};
  if (!advisorEmail || !resumeLink) {
    res.status(400).json({ error: 'Missing advisorEmail or resumeLink.' });
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
        to: [advisorEmail],
        subject: 'Client Risk Assessment Completed — MRI Secure',
        html:
          '<p>Your client' + (clientEmail ? ' (' + clientEmail + ')' : '') + ' has completed their MRI Secure risk assessment.</p>' +
          '<p style="margin:22px 0"><a href="' + resumeLink + '" style="display:inline-block;background:#2e69a3;color:#ffffff;font-weight:600;font-size:15px;padding:12px 24px;border-radius:8px;text-decoration:none">Continue — Enter Portfolio &amp; Generate Report</a></p>' +
          '<p style="color:#888;font-size:12px">If the button above doesn\'t work, copy and paste this link into your browser:<br>' + resumeLink + '</p>' +
          '<p style="color:#888;font-size:12px">This link contains your client\'s assessment answers. Don\'t forward it to anyone outside your firm.</p>'
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
