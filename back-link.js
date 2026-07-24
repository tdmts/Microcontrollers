/* ============================================================
   Adds a "Terug naar dashboard" link to the top of an exercise page.
   Self-running -- just include the script, no init call needed:

     <script src="https://tdmts.github.io/Microcontrollers/back-link.js"></script>

   Every LaboN/ exercise page lives in the same folder as that lab's
   dashboard.html, so the link always just points at the relative
   "dashboard.html" -- no manifest lookup needed. Skips itself on
   dashboard.html (and any page without a .container/<h1>).
   ============================================================ */

(function () {
    'use strict';

    var currentFile = (window.location.pathname.split('/').pop() || '').toLowerCase();
    if (currentFile === 'dashboard.html') return;

    var container = document.querySelector('.container');
    var heading = container && container.querySelector('h1');
    if (!heading) return;

    var style = document.createElement('style');
    style.textContent =
        '.ms-back-link{display:inline-flex;align-items:center;gap:0.4rem;' +
        'margin-bottom:0.75rem;color:#4f46e5;font-weight:600;font-size:0.9rem;' +
        'text-decoration:none;}' +
        '.ms-back-link:hover{text-decoration:underline;}';
    document.head.appendChild(style);

    var link = document.createElement('a');
    link.className = 'ms-back-link';
    link.href = 'dashboard.html';
    link.textContent = '← Terug naar dashboard';

    heading.parentNode.insertBefore(link, heading);
})();
