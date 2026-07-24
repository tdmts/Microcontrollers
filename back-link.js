/* ============================================================
   Adds a "Terug naar ..." link to the top of an exercise/reference page.
   Self-running -- just include the script, no init call needed:

     <script src="https://tdmts.github.io/Microcontrollers/back-link.js"></script>

   dashboard.html always lives directly in the LaboN/ folder, but the
   current page may be nested one or more levels below it (e.g.
   LaboN/Reference/...), so the relative path back up is computed from
   how many segments separate the page from its target folder.

   Pages inside a Reference/ folder link back to that folder's
   reference.html (the reference hub) instead of straight to the lab
   dashboard -- except reference.html itself, which links up to
   the lab dashboard like any other top-level page.

   Skips itself on dashboard.html (and any page without a .container/<h1>).
   ============================================================ */

(function () {
    'use strict';

    var parts = window.location.pathname.split('/').filter(Boolean);
    var currentFile = (parts[parts.length - 1] || '').toLowerCase();
    if (currentFile === 'dashboard.html') return;

    var container = document.querySelector('.container');
    var heading = container && container.querySelector('h1');
    if (!heading) return;

    var referenceIndex = parts.findIndex(function (p) { return /^reference$/i.test(p); });
    var targetFile, targetLabel, anchorIndex;

    if (referenceIndex !== -1 && currentFile !== 'reference.html') {
        // anchorIndex points at the Reference/ segment itself, since
        // reference.html (the hub) lives directly inside that folder.
        targetFile = 'reference.html';
        targetLabel = '← Terug naar overzicht';
        anchorIndex = referenceIndex;
    } else {
        // anchorIndex points at the LaboN/ segment itself, since
        // dashboard.html lives directly inside that folder.
        targetFile = 'dashboard.html';
        targetLabel = '← Terug naar dashboard';
        anchorIndex = parts.findIndex(function (p) { return /^labo\d+$/i.test(p); });
    }

    var depth = anchorIndex === -1 ? 0 : parts.length - anchorIndex - 2;
    var prefix = new Array(Math.max(depth, 0) + 1).join('../');

    var style = document.createElement('style');
    style.textContent =
        '.ms-back-link{display:inline-flex;align-items:center;gap:0.4rem;' +
        'margin-bottom:0.75rem;color:#4f46e5;font-weight:600;font-size:0.9rem;' +
        'text-decoration:none;}' +
        '.ms-back-link:hover{text-decoration:underline;}';
    document.head.appendChild(style);

    var link = document.createElement('a');
    link.className = 'ms-back-link';
    link.href = prefix + targetFile;
    link.textContent = targetLabel;

    heading.parentNode.insertBefore(link, heading);
})();
