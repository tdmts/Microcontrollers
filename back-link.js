/* ============================================================
   Adds the navigation row to the top AND bottom of an
   exercise/reference page: "Terug naar ..." on the left, and
   "Volgende: ..." on the right. Self-running -- just include the
   script, no init call needed:

     <script src="https://tdmts.github.io/Microcontrollers/back-link.js"></script>

   TARGET (BACK)
   -------------
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

   Pages inside a TestN/ folder are the exception to everything below:
   they always link to that folder's overview.html (the test hub) and
   ignore the referrer entirely, so the exit is the same wherever the
   student came from. overview.html itself gets no link, the same way
   dashboard.html doesn't -- it is the page pasted into Orion, so there
   is nothing above it to go back to.

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

   TARGET (VOLGENDE)
   -----------------
   The forward link needs an order, and both manifests already carry one:
   exercises.js has an explicit "order" number per exercise (the same one
   dashboard.js sorts its cards on), reference.js has the reading order
   the hub shows, categories in array order and topics in array order
   within each. So the page it links to is simply the next entry in its
   own lab's manifest, and on the last entry it points at the dashboard
   (exercises) or the reference hub (reference topics), rather than
   leaving a dead end -- unless the back link happens to point there
   already, in which case it is dropped instead of shown twice.

   This means the page must load its manifest -- exercises.js on an
   exercise page, reference.js on a reference page. Without it the page
   still renders perfectly and only the forward link disappears, so
   scripts/check-content.sh asserts the include rather than leaving that
   to be discovered by a student.

   Skipped: dashboard.html and reference.html (they are the hubs, and
   they already show everything), TestN pages (no manifest by design),
   and any page its own manifest does not list (logged to the console;
   check-content.sh fails on that separately).

   Skips itself on dashboard.html (and any page without a .container/<h1>).
   ============================================================ */

(function () {
    'use strict';

    // The manifests are separate <script> tags at the end of body, and pages
    // load them in either order, so the globals may not exist yet at the moment
    // this file runs. DOMContentLoaded fires only after every parser-inserted
    // script has executed, so by then both the DOM and the manifests are there,
    // whatever the order in the page.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    function run() {
        var parts = window.location.pathname.split('/').filter(Boolean);
        var currentFile = (parts[parts.length - 1] || '').toLowerCase();
        if (currentFile === 'dashboard.html') return;

        var container = document.querySelector('.container');
        var heading = container && container.querySelector('h1');
        if (!heading) return;

        var referenceIndex = parts.findIndex(function (p) { return /^reference$/i.test(p); });
        var exercisesIndex = parts.findIndex(function (p) { return /^exercises$/i.test(p); });
        var testIndex = parts.findIndex(function (p) { return /^test\d+$/i.test(p); });
        var labSegment = parts.filter(function (p) { return /^labo\d+$/i.test(p); })[0];
        // "Labo1" -> "labo1", the key both manifests are stored under.
        var labId = labSegment ? labSegment.toLowerCase() : null;

        var targetFile, targetLabel, anchorIndex;
        // A TestN page always goes back to its own hub, never to "where you came
        // from": these pages are read side by side before an exam, so the one
        // predictable exit is worth more than retracing the click path.
        var forceDefault = false;

        if (testIndex !== -1) {
            if (currentFile === 'overview.html') return;
            // anchorIndex points at the TestN/ segment itself, since overview.html
            // (the hub) lives directly inside that folder.
            targetFile = 'overview.html';
            targetLabel = '← Terug naar overzicht';
            anchorIndex = testIndex;
            forceDefault = true;
        } else if (referenceIndex !== -1 && currentFile !== 'reference.html') {
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
        // referrer below. It doubles as the end-of-sequence forward target.
        var defaultHref = new URL(prefix + targetFile, window.location.href);
        var backHref = defaultHref.href;
        var backLabel = targetLabel;

        // Prefer "back to where you came from" when we can trust the referrer:
        // same origin, an actual .html page, and not the page we're already on.
        var ref = forceDefault ? null : referrerIfUsable();
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

        /* -------------------------------------------------- forward link */

        // Same "which manifest entry is this page?" rule as checklist-sync.js:
        // compare basenames, lowercased. Both manifests hold bare filenames, so
        // this is only tolerant of a stray path in front of one.
        function baseName(href) {
            return String(href).split(/[?#]/)[0].split('/').pop().toLowerCase();
        }

        // Same list as reference-dashboard.js: a reference topic may point at a
        // datasheet instead of a page. Extend both together.
        var DOCUMENT_RE = /\.(pdf|zip|docx?|pptx?|xlsx?)(?:[?#]|$)/i;

        function exerciseChain() {
            var data = window.LAB_EXERCISES && window.LAB_EXERCISES[labId];
            if (!data || !Array.isArray(data.exercises)) return null;
            // The same comparator as dashboard.js: the "order" number decides,
            // entries without one land at the end in array order. "Volgende" has
            // to mean the next card on the dashboard, so if that rule ever
            // changes it must change in both files at once.
            return data.exercises.slice().sort(function (a, b) {
                var orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
                var orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
                return orderA - orderB;
            }).map(function (e) {
                // A manifest href is a bare filename next to this page, exactly
                // as in reference.js below, so it is resolved against the
                // current page and works in a local preview as well as on
                // Pages. (Matching is on baseName(), which lowercases; the href
                // itself may not be, since Pages is case-sensitive.)
                return { name: e.name, href: e.href };
            });
        }

        function referenceChain() {
            var data = window.LAB_REFERENCE && window.LAB_REFERENCE[labId];
            if (!data || !Array.isArray(data.categories)) return null;
            var sequence = [];
            data.categories.forEach(function (category) {
                (category.topics || []).forEach(function (topic) {
                    // Datasheets are left out of the chain. A PDF cannot carry
                    // this script, so it would be a dead end, and the hub opens
                    // documents in a new tab on purpose because a PDF inside the
                    // narrow Orion iframe is unreadable -- a same-tab forward
                    // link would undo exactly that.
                    if (DOCUMENT_RE.test(String(topic.href))) return;
                    sequence.push({ name: topic.name, href: topic.href });
                });
            });
            return sequence;
        }

        var chain = null;
        var manifestName = null;
        // reference.html and dashboard.html are the hubs: they already show
        // every card, so there is no single "next" for them. (dashboard.html
        // returned at the top of run(); reference.html is excluded here.)
        if (labId && testIndex === -1 && currentFile !== 'reference.html') {
            if (referenceIndex !== -1) {
                manifestName = 'reference.js';
                chain = referenceChain();
            } else if (exercisesIndex !== -1) {
                manifestName = 'exercises.js';
                chain = exerciseChain();
            }
        }

        var forwardHref = null;
        var forwardLabel = null;

        if (chain) {
            var index = -1;
            for (var i = 0; i < chain.length; i++) {
                if (baseName(chain[i].href) === currentFile) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                console.warn('back-link.js: no entry for ' + labId + ' in ' + manifestName +
                    ' matches this page ("' + currentFile + '"), so there is no forward link.');
            } else if (index === chain.length - 1) {
                // Last one: name the destination and nothing else. A sentence
                // ("dit was de laatste oefening, ...") is longer than the link
                // next to it and says what the student can already see.
                forwardHref = defaultHref.href;
                forwardLabel = manifestName === 'reference.js'
                    ? 'Terug naar overzicht →'
                    : 'Terug naar dashboard →';
            } else {
                forwardHref = new URL(chain[index + 1].href, window.location.href).href;
                forwardLabel = 'Volgende: ' + chain[index + 1].name + ' →';
            }
            // Both links landing on the same page reads as a mistake rather than
            // as a choice. Happens only on the last item of a chain, and only
            // without a usable referrer (a bookmark, a direct link), because
            // arriving via "Volgende" makes the back link point at the previous
            // item instead. Dropping the forward one leaves no dead end: the way
            // out is the link on the left, pointing exactly where this one did.
            if (forwardHref === backHref) {
                forwardHref = null;
                forwardLabel = null;
            }
        } else if (manifestName) {
            console.warn('back-link.js: this page needs ' + manifestName +
                ' loaded (with a ' + labId + ' block in it) to show a forward link.');
        }

        /* -------------------------------------------------- rendering */

        var style = document.createElement('style');
        style.textContent =
            '.ms-back-link{display:inline-flex;align-items:center;gap:0.4rem;' +
            'margin-bottom:0.75rem;color:#4f46e5;font-weight:600;font-size:0.9rem;' +
            'text-decoration:none;}' +
            '.ms-back-link:hover{text-decoration:underline;}' +
            '.ms-back-link--bottom{margin-top:1.5rem;margin-bottom:0;}' +
            '.ms-page-nav{display:flex;align-items:center;justify-content:space-between;' +
            'gap:1rem;flex-wrap:wrap;margin-bottom:0.75rem;}' +
            '.ms-page-nav--bottom{margin-top:1.5rem;margin-bottom:0;}' +
            '.ms-page-nav .ms-back-link{margin-bottom:0;}' +
            '.ms-page-nav--forward{margin-left:auto;text-align:right;}';
        document.head.appendChild(style);

        function makeLink(href, label, extraClass) {
            var a = document.createElement('a');
            a.className = 'ms-back-link' + (extraClass ? ' ' + extraClass : '');
            a.href = href;
            a.textContent = label;
            return a;
        }

        // Without a forward link this emits exactly what it always emitted: a
        // bare <a>, no wrapper. Wrapping a lone link in a flex row would shift
        // every TestN page and every hub by a few pixels for nothing.
        function buildNav(atBottom) {
            if (!forwardHref) {
                return makeLink(backHref, backLabel, atBottom ? 'ms-back-link--bottom' : '');
            }
            var row = document.createElement('nav');
            row.className = 'ms-page-nav' + (atBottom ? ' ms-page-nav--bottom' : '');
            row.setAttribute('aria-label', atBottom ? 'Navigatie onderaan de pagina' : 'Navigatie bovenaan de pagina');
            row.appendChild(makeLink(backHref, backLabel));
            var forward = makeLink(forwardHref, forwardLabel, 'ms-page-nav--forward');
            forward.rel = 'next';
            row.appendChild(forward);
            return row;
        }

        // Top: just before the page heading.
        heading.parentNode.insertBefore(buildNav(false), heading);
        // Bottom: at the end of the content container.
        container.appendChild(buildNav(true));
    }
})();
