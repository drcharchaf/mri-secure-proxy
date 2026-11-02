const { layout, esc, MRI_LOGO_ATTACHMENT } = require('./_email');
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
  const { advisorEmail, clientEmail, resumeLink, firmName, firmLogo } = req.body || {};
  if (!advisorEmail || !resumeLink) {
    res.status(400).json({ error: 'Missing advisorEmail or resumeLink.' });
    return;
  }
  const html = layout({
    firmName, firmLogo,
    heading: 'Your client completed their assessment',
    bodyHtml: '<p style="margin:0">Your client' + (clientEmail ? ' (' + esc(clientEmail) + ')' : '') +
      ' has finished the MRI Secure risk assessment. Their answers are saved and ready.</p>' +
      '<p style="margin:12px 0 0">Next, enter their portfolio holdings to see their Annuity Fit Score, portfolio report, and Sandbox.</p>',
    buttonText: 'Continue &mdash; Enter Portfolio &amp; Generate Report',
    buttonUrl: resumeLink,
    footnote: 'This button contains your client\'s assessment answers. Please don\'t forward this email outside your firm.'
  });
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
        html,
        attachments: [MRI_LOGO_ATTACHMENT]
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
