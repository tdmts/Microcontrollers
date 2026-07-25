/* ============================================================
   Adds a "Terug naar ..." link to the top AND bottom of an
   exercise/reference page. Self-running -- just include the script,
   no init call needed:

     <script src="https://tdmts.github.io/Microcontrollers/back-link.js"></script>

   TARGET
   ------
   The default target is computed from the URL structure. dashboard.html
   lives in the LaboN/Exercises/ folder, and the current page may be
   nested at various depths under LaboN/ (e.g. an exercise in
   LaboN/Exercises/ or a page in LaboN/Reference/), so the relative path
   back up is computed from how many segments separate the page from the
   LaboN/ folder, then extended down into Exercises/.

   Pages inside a Reference/ folder default back to that folder's
   reference.html (the reference hub) instead of straight to the lab
   dashboard -- except reference.html itself, which links up to
   the lab dashboard like any other top-level page.

   "TERUG NAAR WAAR JE VANDAAN KWAM"
   ---------------------------------
   If the student arrived here by clicking a link on another page of this
   same site (document.referrer, same origin, a different .html page),
   the link points back to THAT page instead -- so a student who jumps
   from an exercise into a reference page returns to the exercise, not to
   the reference hub. If the referrer is unknown (bookmark, direct visit,
   new tab without a referrer) we fall back to the URL-based default.

   As a nicety: when the referrer happens to be the same page as the
   default target anyway (e.g. dashboard -> exercise), we keep the
   specific default label ("Terug naar dashboard") instead of the neutral
   "Terug naar vorige pagina".

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
        // anchorIndex points at the LaboN/ segment; the prefix walks up
        // to LaboN/, then Exercises/ steps back down to the dashboard.
        targetFile = 'Exercises/dashboard.html';
        targetLabel = '← Terug naar dashboard';
        anchorIndex = parts.findIndex(function (p) { return /^labo\d+$/i.test(p); });
    }

    var depth = anchorIndex === -1 ? 0 : parts.length - anchorIndex - 2;
    var prefix = new Array(Math.max(depth, 0) + 1).join('../');

    // Absolute URL of the default target, so we can compare it to the
    // referrer below.
    var defaultHref = new URL(prefix + targetFile, window.location.href);
    var backHref = defaultHref.href;
    var backLabel = targetLabel;

    // Prefer "back to where you came from" when we can trust the referrer:
    // same origin, an actual .html page, and not the page we're already on.
    var ref = referrerIfUsable();
    if (ref) {
        if (ref.pathname === defaultHref.pathname) {
            // Came from the default target anyway -> keep its nicer label,
            // but honour the exact referrer URL (preserves any anchor).
            backHref = ref.href;
        } else {
            backHref = ref.href;
            backLabel = '← Terug naar vorige pagina';
        }
    }

    function referrerIfUsable() {
        if (!document.referrer) return null;
        var url;
        try {
            url = new URL(document.referrer);
        } catch (e) {
            return null;
        }
        if (url.origin !== window.location.origin) return null;
        if (!/\.html?$/i.test(url.pathname)) return null;
        if (url.pathname === window.location.pathname) return null;
        return url;
    }

    var style = document.createElement('style');
    style.textContent =
        '.ms-back-link{display:inline-flex;align-items:center;gap:0.4rem;' +
        'margin-bottom:0.75rem;color:#4f46e5;font-weight:600;font-size:0.9rem;' +
        'text-decoration:none;}' +
        '.ms-back-link:hover{text-decoration:underline;}' +
        '.ms-back-link--bottom{margin-top:1.5rem;margin-bottom:0;}';
    document.head.appendChild(style);

    function makeLink(extraClass) {
        var a = document.createElement('a');
        a.className = 'ms-back-link' + (extraClass ? ' ' + extraClass : '');
        a.href = backHref;
        a.textContent = backLabel;
        return a;
    }

    // Top: just before the page heading.
    heading.parentNode.insertBefore(makeLink(), heading);
    // Bottom: at the end of the content container.
    container.appendChild(makeLink('ms-back-link--bottom'));
})();
