/* Prime Estate & Properties: icon set (inline SVG, no external icon font).
   Use ic("name") in scripts, or <i data-i="name"></i> in HTML (swapped for the SVG on page load).
   To add an icon: add one line to PATHS below. */
(function () {
  var PATHS = {
    search:  '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    check:   '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    shield:  '<path d="M12 3 4.5 6v5.5c0 4.4 3.1 8 7.5 9.5 4.4-1.5 7.5-5.1 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    open:    '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5"/><path d="M12 16.5h.01"/>',
    images:  '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="m21 16-5-5-8 8"/>',
    heart:   '<path d="M12 20.5S4.5 16 4.5 10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 6-7.5 10.5-7.5 10.5z"/>',
    'heart-fill': '<path fill="currentColor" d="M12 20.5S4.5 16 4.5 10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 6-7.5 10.5-7.5 10.5z"/>',
    pin:     '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    home:    '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    bed:     '<path d="M3 19V6"/><path d="M3 15h18v4"/><path d="M21 15v-3a3 3 0 0 0-3-3h-8v6"/><circle cx="6.6" cy="11.4" r="1.8"/>',
    bath:    '<path d="M4 12h16v2.5a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 4 14.5z"/><path d="M6 12V6.5a2.5 2.5 0 0 1 4.4-1.6"/><path d="m7 19-1 2"/><path d="m17 19 1 2"/>',
    user:    '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7"/>',
    left:    '<path d="m15 5-7 7 7 7"/>',
    right:   '<path d="m9 5 7 7-7 7"/>',
    x:       '<path d="M6 6l12 12"/><path d="M18 6 6 18"/>',
    flag:    '<path d="M5 21V4"/><path d="M5 4h11l-1.8 4 1.8 4H5"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    plug:    '<path d="M9 3v5"/><path d="M15 3v5"/><path d="M7 8h10v3a5 5 0 0 1-10 0z"/><path d="M12 16v5"/>',
    whatsapp:'<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M9.2 8.3c-.4.6-.6 1.3-.1 2.3.9 1.9 2.6 3.6 4.5 4.4 1 .4 1.7.1 2.2-.4l.5-.7a.6.6 0 0 0-.1-.8l-1.5-.8a.6.6 0 0 0-.7.1l-.5.5c-1.1-.5-2-1.4-2.5-2.5l.5-.5a.6.6 0 0 0 .1-.7l-.8-1.5a.6.6 0 0 0-.8-.2z"/>'
  };

  function ic(name) {
    var p = PATHS[name] || PATHS.open;
    return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + p + '</svg>';
  }
  window.ic = ic;

  function swap(root) {
    var nodes = (root || document).querySelectorAll('i[data-i]');
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i], t = document.createElement('template');
      t.innerHTML = ic(n.getAttribute('data-i'));
      n.replaceWith(t.content.firstChild);
    }
  }

  function start() {
    swap(document);
    /* Also swap any <i data-i> that a script adds later. */
    if (window.MutationObserver) {
      new MutationObserver(function (list) {
        for (var i = 0; i < list.length; i++) {
          for (var j = 0; j < list[i].addedNodes.length; j++) {
            var n = list[i].addedNodes[j];
            if (n.nodeType === 1) { if (n.matches && n.matches('i[data-i]')) swap(n.parentNode); else swap(n); }
          }
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
