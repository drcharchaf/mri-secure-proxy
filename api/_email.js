// Shared branded email layout for MRI Secure.
// Files starting with "_" in /api are not exposed as Vercel routes.
const MRI_LOGO = 'https://moneyandriskinventory.com/sig-logo.png';

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function safeUrl(u) {
  return /^https:\/\/[^\s"'<>]+$/i.test(String(u || '')) ? String(u) : '';
}

// firmName / firmLogo are optional (white-label). Without them the header reads "MRI Secure".
function layout({ firmName, firmLogo, heading, bodyHtml, buttonText, buttonUrl, footnote }) {
  const logo = safeUrl(firmLogo);
  const name = esc(firmName);
  const header = logo
    ? '<img src="' + esc(logo) + '" alt="' + (name || 'Logo') + '" style="max-height:48px;max-width:220px;display:block;border:0">'
    : '<div style="font-family:Georgia,serif;font-size:24px;font-weight:bold;color:#0B1F3A">' + (name || 'MRI Secure&trade;') + '</div>';

  return '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#F5F0E8">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:24px 12px"><tr><td align="center">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;color:#1f2a37">' +
      '<tr><td style="padding:24px 28px 18px;border-bottom:3px solid #DCB032">' + header + '</td></tr>' +
      '<tr><td style="padding:26px 28px 8px">' +
        '<div style="font-size:20px;font-weight:bold;color:#0B1F3A;margin:0 0 12px">' + heading + '</div>' +
        '<div style="font-size:15px;line-height:1.6;color:#374151">' + bodyHtml + '</div>' +
        '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0 8px"><tr><td style="border-radius:8px;background:#0B1F3A">' +
          '<a href="' + esc(buttonUrl) + '" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:8px">' + buttonText + '</a>' +
        '</td></tr></table>' +
        (footnote ? '<div style="font-size:12px;line-height:1.5;color:#8a94a3;margin:14px 0 6px">' + footnote + '</div>' : '') +
      '</td></tr>' +
      '<tr><td style="padding:18px 28px 22px;border-top:1px solid #eee5d3" align="left">' +
        '<table role="presentation" cellpadding="0" cellspacing="0"><tr>' +
          '<td style="font-size:11px;color:#8a94a3;padding-right:8px;vertical-align:middle">Powered by</td>' +
          '<td style="vertical-align:middle"><img src="' + MRI_LOGO + '" alt="MRI" height="16" style="height:16px;width:auto;display:block;border:0"></td>' +
          '<td style="font-size:11px;color:#8a94a3;padding-left:8px;vertical-align:middle">Money &amp; Risk Inventory</td>' +
        '</tr></table>' +
      '</td></tr>' +
    '</table></td></tr></table></body></html>';
}

module.exports = { layout, esc };
