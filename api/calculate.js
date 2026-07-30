const SPREADSHEETWEB_ENDPOINT = 'https://api.spreadsheetweb.com/calculations/calculatesinglesimple';
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

  try {
    const upstream = await fetch(SPREADSHEETWEB_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({ error: 'Proxy failed to reach SpreadsheetWeb: ' + err.message });
  }
};
