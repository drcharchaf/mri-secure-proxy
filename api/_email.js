// Shared branded email layout for MRI Secure.
// Files starting with "_" in /api are not exposed as Vercel routes.
// MRI logo is embedded in the email itself (inline CID attachment) so it shows even when
// mail apps block remote images.
const MRI_LOGO = 'cid:mri-logo';
const MRI_LOGO_ATTACHMENT = { filename: 'mri-logo.png', content_type: 'image/png', content_id: 'mri-logo', content: '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' };

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

module.exports = { layout, esc, MRI_LOGO_ATTACHMENT };
