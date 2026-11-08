/* Light / dark mode. Loaded in <head> on every page so the saved choice is applied before the page paints.
   The visitor's choice is remembered in this browser. Default is light (the original look). */
(function () {
  var KEY = 'rc-theme', root = document.documentElement;
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function apply(t) {
    root.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (!m) { m = document.createElement('meta'); m.name = 'theme-color'; document.head.appendChild(m); }
    m.content = t === 'dark' ? '#0e1613' : '#ffffff';
  }
  var t = saved(); if (t !== 'dark' && t !== 'light') t = 'light';
  apply(t);
  window.RCTheme = {
    get: function () { return root.getAttribute('data-theme') || 'light'; },
    set: function (v) {
      apply(v);
      try { localStorage.setItem(KEY, v); } catch (e) {}
      document.dispatchEvent(new CustomEvent('rc-theme', { detail: v }));
    },
    toggle: function () { this.set(this.get() === 'dark' ? 'light' : 'dark'); }
  };
  window.addEventListener('storage', function (e) {
    if (e.key === KEY && (e.newValue === 'dark' || e.newValue === 'light')) apply(e.newValue);
  });
})();
