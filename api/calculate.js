// Vercel serverless function: proxies calculation requests to SpreadsheetWeb.
// This runs server-side, so it is not subject to browser CORS restrictions —
// it can call SpreadsheetWeb's API directly, then hand the result back to the
// GitHub Pages front-end with CORS headers WE control.
//
// File location matters for Vercel: this must live at   api/calculate.js
// in the repo root. Vercel auto-detects anything under /api as a serverless
// function and exposes it at:   https://<your-project>.vercel.app/api/calculate

const SPREADSHEETWEB_ENDPOINT = 'https://private.spreadsheetweb.com/api/calculations/calculatesinglesimple';

// Restrict to your GitHub Pages origin. Change/add origins here if you later
// move the front-end or add a custom domain.
const ALLOWED_ORIGIN = 'https://money-and-risk-inventory.github.io';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight request — browsers send this automatically before the real POST.
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
}
