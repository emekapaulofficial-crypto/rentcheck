/* Prime Estate & Properties: shared menu (header) and footer for every page.
   Pages contain <div id="rc-header"></div> and <div id="rc-footer"></div>. Edit links here, once. */
(function () {
  var CSS = '' +
  '.rcn-head{background:#fff;border-bottom:1px solid #e1e7e1;position:sticky;top:0;z-index:50}' +
  '.rcn-bar{width:min(1180px,calc(100% - 32px));margin:auto;min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:16px}' +
  '.rcn-brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-weight:800;font-size:1.15rem;color:#0f3d2e;letter-spacing:-.02em}' +
  '.rcn-brand span{color:#2a9d4a}' +
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
  '@media(max-width:860px){.rcn-menu{display:inline-block}' +
  '.rcn-links{display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border-bottom:1px solid #e1e7e1;flex-direction:column;align-items:stretch;gap:0;padding:8px 16px 16px}' +
  '.rcn-links.open{display:flex}.rcn-links a{padding:13px 4px;border-bottom:1px solid #eef2ee}' +
  '.rcn-links a.rcn-cta{text-align:center;margin-top:12px;border-bottom:0}' +
  '.rcn-foot-in{grid-template-columns:1fr 1fr}}' +
  '@media(max-width:520px){.rcn-foot-in{grid-template-columns:1fr}}';

  var LOGO = '<span class="rcn-logo"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d9f27a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 14.5l2.2 2.2L15.5 12"/></svg></span>';
  var BRAND = '<a class="rcn-brand" href="index.html">' + LOGO + '<b>Prime Estate <span>&amp; Properties</span></b></a>';

  var LINKS = [
    ['Find a home', 'index.html#homes'],
    ['List your property', 'owners.html'],
    ['Become an agent', 'agents.html'],
    ['Trust & safety', 'safety.html'],
    ['Contact', 'contact.html']
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;'); }

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
      '<button type="button" class="rcn-menu" id="rcnMenu" aria-expanded="false" aria-controls="rcnLinks">Menu</button>' +
      '<nav class="rcn-links" id="rcnLinks" aria-label="Main">' + links +
      '<a class="rcn-cta" href="agent.html">Agent login</a></nav></div></header>';
    var btn = document.getElementById('rcnMenu'), nav = document.getElementById('rcnLinks');
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var f = document.getElementById('rc-footer');
  if (f) {
    f.innerHTML = '<footer class="rcn-foot"><div class="rcn-foot-in">' +
      '<div>' + BRAND + '<p>Rental homes in Nigeria, checked before you pay.</p></div>' +
      '<div><h4>Renters</h4><a href="index.html#homes">Find a home</a><a href="how-it-works.html">How it works</a><a href="safety.html">Trust &amp; safety</a><a href="faq.html">FAQs</a><a href="complaints.html">Report a concern</a></div>' +
      '<div><h4>Agents and owners</h4><a href="agents.html">Become an agent</a><a href="agent.html">Agent login</a><a href="owners.html">List your property</a></div>' +
      '<div><h4>Company</h4><a href="about.html">About</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></div>' +
      '</div><div class="rcn-legal">&copy; ' + new Date().getFullYear() + ' Prime Estate &amp; Properties. Company registration in progress.</div></footer>';
  }
})();
