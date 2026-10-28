/* Prime Estate & Properties: shared menu (header) and footer for every page.
   Pages contain <div id="rc-header"></div> and <div id="rc-footer"></div>. Edit links here, once. */
(function () {
  var CSS = '' +
  '.rcn-head{background:#fff;border-bottom:1px solid #e1e7e1;position:sticky;top:0;z-index:50}' +
  '.rcn-bar{width:min(1180px,calc(100% - 32px));margin:auto;min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:16px}' +
  '.rcn-brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-weight:800;font-size:1.15rem;color:#0f3d2e;letter-spacing:-.02em}' +
  '.rcn-brand span{color:#2a9d4a}.rcn-brand b{display:flex;flex-direction:column;line-height:1.1}.rcn-nm{font-style:normal}.rcn-tag{font-style:normal;font-size:.66rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#6b7a70;margin-top:3px}' +
  '.rcn-logo{width:34px;height:34px;border-radius:9px;background:#0f4a39;display:inline-flex;align-items:center;justify-content:center;flex:none}' +
  '.rcn-links{display:flex;align-items:center;gap:26px}' +
  '.rcn-links a{color:#17251f;text-decoration:none;font-size:.95rem;font-weight:600}' +
  '.rcn-links a:hover,.rcn-links a.on{color:#2a9d4a}' +
  '.rcn-links a.rcn-cta{background:#0f4a39;color:#fff;padding:12px 20px;border-radius:999px}' +
  '.rcn-links a.rcn-cta:hover{background:#0b3a2d;color:#d9f27a}' +
  '.rcn-menu{display:none;background:#fff;border:1px solid #17251f;color:#17251f;border-radius:999px;padding:9px 18px;font:inherit;font-weight:700;cursor:pointer}' +
  '.rcn-foot{background:#06332a;color:#cfe0d7;margin-top:40px}' +
  '.rcn-foot-in{width:min(1180px,calc(100% - 32px));margin:auto;padding:48px 0 22px;display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:32px}' +
  '.rcn-foot h4{margin:0 0 12px;color:#fff;font-size:.95rem}' +
  '.rcn-foot a{display:block;color:#cfe0d7;text-decoration:none;padding:5px 0;font-size:.95rem}' +
  '.rcn-foot a:hover{color:#d9f27a}' +
  '.rcn-foot p{margin:14px 0 0;line-height:1.6;max-width:300px}' +
  '.rcn-foot .rcn-brand{color:#fff}.rcn-foot .rcn-brand span{color:#f2c94c}' +
  '.rcn-legal{width:min(1180px,calc(100% - 32px));margin:auto;padding:16px 0 28px;border-top:1px solid #1d5143;font-size:.85rem;color:#9db8ac}' +
  '.rcn-links{order:1}.rcn-theme{order:2;width:42px;height:42px;flex:none;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid #c9d4cd;background:#fff;color:#17251f;cursor:pointer;padding:0}' +
  '.rcn-theme:hover{border-color:#2a9d4a;color:#2a9d4a}.rcn-theme svg{width:20px;height:20px}.rcn-theme .i-sun{display:none}' +
  '.rcn-office{margin:14px 0 0;line-height:1.6;font-size:.92rem;color:#cfe0d7}.rcn-office b{color:#fff;display:block;margin-bottom:2px}.rcn-office a{display:inline;padding:0;text-decoration:underline}' +
  '@media(max-width:860px){.rcn-menu{display:inline-block;order:3}.rcn-theme{order:2;margin-left:auto}' +
  '.rcn-links{display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border-bottom:1px solid #e1e7e1;flex-direction:column;align-items:stretch;gap:0;padding:8px 16px 16px}' +
  '.rcn-links.open{display:flex}.rcn-links a{padding:13px 4px;border-bottom:1px solid #eef2ee}' +
  '.rcn-links a.rcn-cta{text-align:center;margin-top:12px;border-bottom:0}' +
  '.rcn-foot-in{grid-template-columns:1fr 1fr}}' +
  '@media(max-width:520px){.rcn-foot-in{grid-template-columns:1fr}}';

  var LOGO = '<span class="rcn-logo"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d9f27a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 14.5l2.2 2.2L15.5 12"/></svg></span>';
  var BRAND = '<a class="rcn-brand" href="index.html">' + LOGO + '<b><i class="rcn-nm">Prime Estate <span>&amp; Properties</span></i><em class="rcn-tag">Buy or Rent</em></b></a>';

  var MOON = '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var SUN = '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var SITE = window.SITE || { name: 'Prime Estate & Properties', rcNumber: '', office: {} };
  var O = SITE.office || {};

  function officeBlock() {
    var place = [O.address, O.city, O.state].filter(Boolean).map(esc).join(', ');
    var out = '<p class="rcn-office"><b>' + esc(O.title || 'Head office') + '</b>' + place;
    if (O.phone) out += '<br><a href="tel:' + esc(O.phone.replace(/\s+/g, '')) + '">' + esc(O.phone) + '</a>';
    if (O.whatsapp) out += '<br><a href="https://wa.me/' + esc(String(O.whatsapp).replace(/\D/g, '')) + '" rel="noopener">WhatsApp us</a>';
    if (O.email) out += '<br><a href="mailto:' + esc(O.email) + '">' + esc(O.email) + '</a>';
    if (O.hours) out += '<br>' + esc(O.hours);
    return out + '</p>';
  }

  var LINKS = [
    ['Find a home', 'index.html#homes'],
    ['List your property', 'owners.html'],
    ['Become an agent', 'agents.html'],
    ['Trust & safety', 'safety.html'],
    ['Contact', 'contact.html']
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  var h = document.getElementById('rc-header');
  if (h) {
    var links = LINKS.map(function (l) {
      var on = l[1].split('#')[0].toLowerCase() === here && l[1].indexOf('#') < 0 ? ' class="on"' : '';
      return '<a href="' + l[1] + '"' + on + '>' + esc(l[0]) + '</a>';
    }).join('');
    h.innerHTML = '<header class="rcn-head"><div class="rcn-bar">' + BRAND +
      '<button type="button" class="rcn-theme" id="rcnTheme" aria-pressed="false" aria-label="Switch to dark mode" title="Switch to dark mode">' + MOON + SUN + '</button>' +
      '<button type="button" class="rcn-menu" id="rcnMenu" aria-expanded="false" aria-controls="rcnLinks">Menu</button>' +
      '<nav class="rcn-links" id="rcnLinks" aria-label="Main">' + links +
      '<a class="rcn-cta" href="agent.html">Agent login</a></nav></div></header>';
    var tb = document.getElementById('rcnTheme');
    function syncTheme() {
      var dark = window.RCTheme && window.RCTheme.get() === 'dark';
      tb.setAttribute('aria-pressed', dark ? 'true' : 'false');
      var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
      tb.setAttribute('aria-label', label); tb.title = label;
      tb.querySelector('.i-moon').style.display = dark ? 'none' : 'block';
      tb.querySelector('.i-sun').style.display = dark ? 'block' : 'none';
    }
    tb.addEventListener('click', function () { if (window.RCTheme) window.RCTheme.toggle(); });
    document.addEventListener('rc-theme', syncTheme); syncTheme();
    var btn = document.getElementById('rcnMenu'), nav = document.getElementById('rcnLinks');
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var f = document.getElementById('rc-footer');
  if (f) {
    f.innerHTML = '<footer class="rcn-foot"><div class="rcn-foot-in">' +
      '<div>' + BRAND + '<p>Rental homes in Nigeria, checked before you pay.</p>' + officeBlock() + '</div>' +
      '<div><h4>Renters</h4><a href="index.html#homes">Find a home</a><a href="how-it-works.html">How it works</a><a href="safety.html">Trust &amp; safety</a><a href="faq.html">FAQs</a><a href="complaints.html">Report a concern</a></div>' +
      '<div><h4>Agents and owners</h4><a href="agents.html">Become an agent</a><a href="agent.html">Agent login</a><a href="owners.html">List your property</a></div>' +
      '<div><h4>Company</h4><a href="about.html">About</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="admin.html">Staff login</a></div>' +
      '</div><div class="rcn-legal">&copy; ' + new Date().getFullYear() + ' ' + esc(SITE.name || 'Prime Estate & Properties') + ' \u2014 Buy or Rent. ' + (SITE.rcNumber ? esc(SITE.rcNumber) + '.' : 'Company registration in progress.') + '</div></footer>';
  }
})();
