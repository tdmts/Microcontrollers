/* ============================================================
   Adds the navigation row above the <h1> of an exercise/reference
   page: "Terug naar ..." on the left, the lab menu in the middle and
   "Volgende: ..." on the right. The row is sticky, so it is the only
   one: an earlier version repeated it at the end of the page, which a
   bar that never scrolls out of view makes redundant. Self-running --
   just include the script, no init call needed:

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

   HET LABOMENU
   ------------
   The top row is sticky and carries the lab's whole menu in the middle:
   a button ("Oefening 3 / 10") opening a panel with two tabs, every
   exercise of this lab with a tick for the ones already finished, and
   every theory topic. It exists because these pages are read inside an
   iframe on Orion, where clicking an exercise on the dashboard replaces
   the only list the student had. orion-embed.css gives that iframe a
   fixed height, so the page scrolls inside it and a sticky bar stays put
   at the top of the Orion content pane.

   Everything it shows comes out of the two manifests and out of the same
   localStorage keys dashboard.js writes, so an exercise added to
   exercises.js turns up in the menu of every page of that lab without
   touching a single page.

   A page loads only its own manifest (an exercise page has exercises.js,
   a reference topic has reference.js), so the other one is fetched here,
   from the folder this script itself was loaded out of. The panel renders
   with whatever is loaded at the moment it opens and re-renders when the
   second manifest lands.

   Skips itself on dashboard.html (and any page without a .container/<h1>).
   ============================================================ */

(function () {
    'use strict';

    // Captured while the script is executing, because document.currentScript
    // is null by the time DOMContentLoaded fires. Its folder is the repo root
    // (every page loads this file as ../../back-link.js), which is where both
    // manifests sit.
    var MANIFEST_ROOT = document.currentScript && document.currentScript.src
        ? new URL('.', document.currentScript.src).href
        : null;

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

        // Absolute URL of the LaboN/ folder and of the two folders inside it.
        // The menu links to pages from BOTH manifests, and a reference href is
        // a bare filename next to reference.html, so it can only be resolved
        // against that folder -- not against the page doing the linking, which
        // may well sit in Exercises/.
        var labIndex = parts.findIndex(function (p) { return /^labo\d+$/i.test(p); });
        var labBase = null, exercisesBase = null, referenceBase = null;
        if (labIndex !== -1) {
            var upToLab = new Array(Math.max(parts.length - labIndex - 2, 0) + 1).join('../');
            // "" would resolve to the page itself rather than to its folder.
            labBase = new URL(upToLab || './', window.location.href);
            exercisesBase = new URL('Exercises/', labBase);
            referenceBase = new URL('Reference/', labBase);
        }

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
            anchorIndex = labIndex;
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
            if (!data || !Array.isArray(data.exercises) || !exercisesBase) return null;
            // The same comparator as dashboard.js: the "order" number decides,
            // entries without one land at the end in array order. "Volgende" has
            // to mean the next card on the dashboard, so if that rule ever
            // changes it must change in both files at once.
            return data.exercises.slice().sort(function (a, b) {
                var orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
                var orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
                return orderA - orderB;
            }).map(function (e) {
                // A manifest href is a bare filename next to that lab's
                // dashboard.html, exactly as in reference.js below, so it is
                // resolved against the folder holding it rather than against
                // the current page: the menu links to both manifests, and only
                // one of them lives in the folder this page sits in. Works in a
                // local preview as well as on Pages. (Matching is on
                // baseName(), which lowercases; the href itself may not be,
                // since Pages is case-sensitive.)
                return { id: e.id, name: e.name, href: new URL(e.href, exercisesBase).href };
            });
        }

        function referenceChain() {
            var data = window.LAB_REFERENCE && window.LAB_REFERENCE[labId];
            if (!data || !Array.isArray(data.categories) || !referenceBase) return null;
            var sequence = [];
            data.categories.forEach(function (category) {
                (category.topics || []).forEach(function (topic) {
                    // Datasheets are left out of the chain, and out of the menu
                    // with it. A PDF cannot carry this script, so it would be a
                    // dead end, and the hub opens documents in a new tab on
                    // purpose because a PDF inside the narrow Orion iframe is
                    // unreadable -- a same-tab link would undo exactly that.
                    if (DOCUMENT_RE.test(String(topic.href))) return;
                    sequence.push({ id: topic.id, name: topic.name, href: new URL(topic.href, referenceBase).href });
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
        // Hoisted: the menu below labels its button with this position
        // ("Oefening 3 / 10"), which is the same lookup.
        var index = -1;

        if (chain) {
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
                forwardHref = chain[index + 1].href;
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

        /* -------------------------------------------------- lab menu */

        // The hubs are left out: dashboard.html and reference.html already show
        // every card, so a menu repeating them is noise. A TestN page has no
        // manifest by design, and a page outside a LaboN/ folder has no lab.
        var showMenu = !!labId && testIndex === -1 &&
            currentFile !== 'reference.html' && currentFile !== 'dashboard.html';

        // The same key dashboard.js and checklist-sync.js read and write, so a
        // ticked-off checklist shows up here as a tick without any extra state.
        var STORAGE_PREFIX = 'msDashboard:';

        function isDone(exerciseId) {
            try {
                return window.localStorage.getItem(STORAGE_PREFIX + labId + ':' + exerciseId) === '1';
            } catch (e) {
                // A browser that blocks storage for an embedded third-party
                // frame throws on the very first read. Losing the ticks beats
                // losing the whole nav row, so this is caught rather than left
                // to bubble out of run().
                return false;
            }
        }

        function labTitle() {
            var data = (window.LAB_EXERCISES && window.LAB_EXERCISES[labId]) ||
                (window.LAB_REFERENCE && window.LAB_REFERENCE[labId]);
            return (data && data.labTitle) || 'Overzicht';
        }

        // Which tab opens first: the one this page belongs to. The page's own
        // kind is kept separately, because the button keeps naming this page's
        // position ("Oefening 3 / 10") after the student switches tabs.
        var pageKind = referenceIndex !== -1 ? 'reference' : 'exercises';
        var activeTab = pageKind;
        var panelEl = null;
        var buttonEl = null;
        var pending = {};
        var failed = {};

        // Theorie sits first because that is the order of the course: a student
        // reads the theory and then makes the exercise. Which tab is *open*
        // first is a different question, answered by activeTab above -- landing
        // on the theory list from an exercise page would hide exactly the list
        // this menu exists to keep within reach.
        function sections() {
            return [
                {
                    key: 'reference',
                    tab: 'Theorie',
                    // A reference topic has no "done" state: the hub is pure
                    // navigation and awards no XP, so no ticks on this tab.
                    items: referenceChain(),
                    ticks: false,
                    hubHref: referenceBase ? new URL('reference.html', referenceBase).href : null,
                    hubLabel: 'Naar het theorie-overzicht →'
                },
                {
                    key: 'exercises',
                    tab: 'Oefeningen',
                    items: exerciseChain(),
                    ticks: true,
                    hubHref: exercisesBase ? new URL('dashboard.html', exercisesBase).href : null,
                    hubLabel: 'Naar het dashboard →'
                }
            ];
        }

        // Each page loads one manifest (rule 3 of check-content.sh guarantees
        // which one); the menu needs both, so the other is fetched from the
        // folder this script came out of. Deliberately not blocking: the panel
        // renders with whatever is there and re-renders on arrival, which for a
        // small cached file is long before anyone manages to click.
        function loadManifest(file, loaded) {
            if (loaded() || !MANIFEST_ROOT || pending[file] || failed[file]) return;
            pending[file] = true;
            var script = document.createElement('script');
            script.src = new URL(file, MANIFEST_ROOT).href;
            script.async = true;
            script.onload = function () {
                pending[file] = false;
                refreshMenu();
            };
            script.onerror = function () {
                pending[file] = false;
                failed[file] = true;
                console.warn('back-link.js: could not load ' + script.src + ' for the lab menu.');
                refreshMenu();
            };
            document.body.appendChild(script);
        }

        function isPending() {
            return !!(pending['exercises.js'] || pending['reference.js']);
        }

        function refreshMenu() {
            if (!panelEl) return;
            if (buttonEl) buttonEl.firstChild.textContent = menuLabel();
            if (!panelEl.hidden) renderPanel();
        }

        function menuLabel() {
            if (chain && index !== -1) {
                return (pageKind === 'reference' ? 'Theorie ' : 'Oefening ') +
                    (index + 1) + ' / ' + chain.length;
            }
            return labTitle();
        }

        function renderPanel() {
            while (panelEl.firstChild) panelEl.removeChild(panelEl.firstChild);

            var all = sections();
            var tabs = document.createElement('div');
            tabs.className = 'ms-lab-tabs';
            tabs.setAttribute('role', 'tablist');
            all.forEach(function (section) {
                var tab = document.createElement('button');
                tab.type = 'button';
                tab.className = 'ms-lab-tab';
                tab.setAttribute('role', 'tab');
                tab.setAttribute('aria-selected', section.key === activeTab ? 'true' : 'false');
                tab.textContent = section.tab;
                tab.addEventListener('click', function () {
                    activeTab = section.key;
                    renderPanel();
                });
                tabs.appendChild(tab);
            });
            panelEl.appendChild(tabs);

            var active = all.filter(function (s) { return s.key === activeTab; })[0];
            if (!active) return;

            if (!active.items) {
                var note = document.createElement('p');
                note.className = 'ms-lab-note';
                note.textContent = isPending() ? 'Laden…' : 'Niet beschikbaar.';
                panelEl.appendChild(note);
            } else {
                var list = document.createElement('ul');
                list.className = 'ms-lab-list';
                active.items.forEach(function (item, position) {
                    var isCurrent = baseName(item.href) === currentFile;
                    var li = document.createElement('li');
                    if (isCurrent) li.className = 'ms-lab-current';

                    var link = document.createElement('a');
                    link.href = item.href;
                    if (isCurrent) link.setAttribute('aria-current', 'page');

                    var done = active.ticks && isDone(item.id);
                    var mark = document.createElement('span');
                    mark.className = 'ms-lab-mark' + (active.ticks
                        ? (done ? ' ms-lab-mark--done' : ' ms-lab-mark--todo')
                        : ' ms-lab-mark--plain');
                    mark.textContent = active.ticks ? (done ? '✓' : '○') : '·';
                    // The tick is decoration next to a label that already reads
                    // as a link; the state itself is announced on the text.
                    mark.setAttribute('aria-hidden', 'true');

                    var text = document.createElement('span');
                    text.textContent = (position + 1) + '. ' + item.name;
                    if (active.ticks && done) text.title = 'Afgewerkt';

                    link.appendChild(mark);
                    link.appendChild(text);
                    li.appendChild(link);
                    list.appendChild(li);
                });
                panelEl.appendChild(list);
            }

            if (active.hubHref) {
                var hub = document.createElement('a');
                hub.className = 'ms-lab-hub';
                hub.href = active.hubHref;
                hub.textContent = active.hubLabel;
                panelEl.appendChild(hub);
            }
        }

        // The panel is centred under the button in CSS. That is already inside
        // the text column on any sane width, but the panel is wider than the
        // button, so on a squeezed pane it can still reach past one edge.
        // Measured rather than guessed: shifted by exactly the overshoot, and
        // never past the opposite edge.
        var CENTRE = 'translateX(-50%)';

        function positionPanel() {
            panelEl.style.transform = CENTRE;
            var panel = panelEl.getBoundingClientRect();
            var limits = container.getBoundingClientRect();
            var shift = 0;
            if (panel.right > limits.right) shift = limits.right - panel.right;
            if (panel.left + shift < limits.left) shift = limits.left - panel.left;
            if (shift) {
                panelEl.style.transform = CENTRE + ' translateX(' + Math.round(shift) + 'px)';
            }
        }

        function openPanel() {
            renderPanel();
            panelEl.hidden = false;
            positionPanel();
            buttonEl.setAttribute('aria-expanded', 'true');
        }

        function closePanel() {
            panelEl.hidden = true;
            buttonEl.setAttribute('aria-expanded', 'false');
        }

        function buildMenu(row) {
            buttonEl = document.createElement('button');
            buttonEl.type = 'button';
            buttonEl.className = 'ms-lab-menu-btn';
            buttonEl.id = 'ms-lab-menu-btn';
            buttonEl.setAttribute('aria-haspopup', 'true');
            buttonEl.setAttribute('aria-expanded', 'false');
            buttonEl.setAttribute('aria-controls', 'ms-lab-panel');
            buttonEl.appendChild(document.createTextNode(menuLabel()));
            var caret = document.createElement('span');
            caret.className = 'ms-lab-caret';
            caret.setAttribute('aria-hidden', 'true');
            caret.textContent = '▾';
            buttonEl.appendChild(caret);

            panelEl = document.createElement('div');
            panelEl.className = 'ms-lab-panel';
            panelEl.id = 'ms-lab-panel';
            panelEl.hidden = true;
            panelEl.setAttribute('aria-labelledby', 'ms-lab-menu-btn');

            buttonEl.addEventListener('click', function (event) {
                event.stopPropagation();
                if (panelEl.hidden) { openPanel(); } else { closePanel(); }
            });
            // Clicking a link inside the panel navigates, so only a click that
            // lands outside it has to close anything.
            panelEl.addEventListener('click', function (event) { event.stopPropagation(); });
            document.addEventListener('click', function () {
                if (panelEl && !panelEl.hidden) closePanel();
            });
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape' && panelEl && !panelEl.hidden) {
                    closePanel();
                    buttonEl.focus();
                }
            });
            window.addEventListener('resize', function () {
                if (panelEl && !panelEl.hidden) positionPanel();
            });

            // The panel hangs off the button rather than off the row, so it
            // reads as belonging to it. The button sits on the left half of the
            // row (the forward link takes the free space), so aligning the
            // panel's left edge to it cannot push it past the right margin.
            var menu = document.createElement('span');
            menu.className = 'ms-lab-menu';
            menu.appendChild(buttonEl);
            menu.appendChild(panelEl);
            row.appendChild(menu);

            loadManifest('exercises.js', function () { return window.LAB_EXERCISES; });
            loadManifest('reference.js', function () { return window.LAB_REFERENCE; });
        }

        /* -------------------------------------------------- rendering */

        var style = document.createElement('style');
        style.textContent =
            '.ms-back-link{display:inline-flex;align-items:center;gap:0.4rem;' +
            'color:#4f46e5;font-weight:600;font-size:0.9rem;text-decoration:none;}' +
            '.ms-back-link:hover{text-decoration:underline;}' +
            // Sticky against the top of the iframe: orion-embed.css gives the
            // frame a fixed height, so this is the top of the Orion content
            // pane. The background is opaque because content scrolls under it.
            //
            // Three grid columns, because the menu has to sit dead centre
            // whatever stands beside it: the two outer columns are always the
            // same width, so the middle one is centred even when the last
            // exercise of a lab has no "Volgende" link to fill column three.
            // minmax(0,1fr) lets a long label wrap inside its own column
            // instead of pushing the menu off centre.
            '.ms-page-nav{position:sticky;top:0;z-index:60;margin-bottom:0.75rem;' +
            'display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);' +
            'align-items:center;gap:0.75rem;background:var(--bs-body-bg,#fff);' +
            'padding:0.5rem 0;border-bottom:1px solid rgba(0,0,0,.08);}' +
            '.ms-page-nav--forward{justify-self:end;text-align:right;}' +
            '.ms-lab-menu{justify-self:center;}' +
            '.ms-lab-menu-btn{display:inline-flex;align-items:center;gap:0.35rem;' +
            'border:1px solid rgba(0,0,0,.18);background:var(--bs-body-bg,#fff);' +
            'color:inherit;border-radius:999px;padding:0.25rem 0.8rem;font:inherit;' +
            'font-size:0.85rem;font-weight:600;line-height:1.5;cursor:pointer;}' +
            '.ms-lab-menu-btn:hover,.ms-lab-menu-btn[aria-expanded="true"]' +
            '{border-color:#4f46e5;color:#4f46e5;}' +
            '.ms-lab-caret{font-size:0.7em;}' +
            '.ms-lab-menu{position:relative;display:inline-flex;}' +
            // Centred under the button, and capped against the viewport as well
            // as in rem so it stays inside the pane when Orion is squeezed into
            // a narrow column.
            '.ms-lab-panel{position:absolute;top:100%;left:50%;' +
            'transform:translateX(-50%);z-index:70;' +
            'width:min(28rem,88vw);margin-top:0.4rem;padding:0.5rem;' +
            'max-height:65vh;overflow-y:auto;background:var(--bs-body-bg,#fff);' +
            'border:1px solid rgba(0,0,0,.12);border-radius:0.6rem;' +
            'box-shadow:0 12px 32px rgba(0,0,0,.18);text-align:left;}' +
            '.ms-lab-panel[hidden]{display:none;}' +
            '.ms-lab-tabs{display:flex;gap:0.25rem;margin-bottom:0.4rem;' +
            'border-bottom:1px solid rgba(0,0,0,.08);}' +
            '.ms-lab-tab{flex:1;border:0;background:none;color:inherit;font:inherit;' +
            'font-size:0.8rem;font-weight:600;padding:0.35rem 0.5rem;cursor:pointer;' +
            'border-bottom:2px solid transparent;}' +
            '.ms-lab-tab[aria-selected="true"]{color:#4f46e5;border-bottom-color:#4f46e5;}' +
            '.ms-lab-list{list-style:none;margin:0;padding:0;}' +
            '.ms-lab-list a{display:flex;align-items:baseline;gap:0.5rem;' +
            'padding:0.3rem 0.5rem;border-radius:0.4rem;color:inherit;' +
            'text-decoration:none;font-size:0.85rem;line-height:1.35;}' +
            '.ms-lab-list a:hover{background:rgba(79,70,229,.09);color:#4f46e5;}' +
            '.ms-lab-current a{background:rgba(79,70,229,.14);color:#4f46e5;font-weight:600;}' +
            '.ms-lab-mark{flex:0 0 1rem;text-align:center;font-size:0.8rem;}' +
            '.ms-lab-mark--done{color:#16a34a;}' +
            '.ms-lab-mark--todo,.ms-lab-mark--plain{color:rgba(0,0,0,.3);}' +
            '.ms-lab-note{margin:0.5rem;font-size:0.85rem;opacity:0.7;}' +
            '.ms-lab-hub{display:block;margin-top:0.35rem;padding:0.45rem 0.5rem;' +
            'border-top:1px solid rgba(0,0,0,.08);font-size:0.82rem;font-weight:600;' +
            'color:#4f46e5;text-decoration:none;}' +
            '.ms-lab-hub:hover{text-decoration:underline;}' +
            // On paper the bar is a page element like any other, and a panel
            // that is closed anyway would only leave a gap.
            '@media print{.ms-page-nav{position:static;border-bottom:0;}' +
            '.ms-lab-menu-btn,.ms-lab-panel{display:none;}}' +
            // A jump to #indienen would otherwise put that heading exactly
            // under the bar.
            'h1[id],h2[id],h3[id],h4[id]{scroll-margin-top:3.75rem;}';

        document.head.appendChild(style);

        function makeLink(href, label, extraClass) {
            var a = document.createElement('a');
            a.className = 'ms-back-link' + (extraClass ? ' ' + extraClass : '');
            a.href = href;
            a.textContent = label;
            return a;
        }

        // One row, at the top, and it stays in view: there is no second copy at
        // the end of the page. A page that ends without an exit was the reason
        // for the bottom one, and a bar that never scrolls away answers that
        // better than a duplicate does. The row is built even when it holds
        // nothing but the back link (a TestN page, the reference hub), because
        // that is precisely the page that used to need the bottom copy.
        function buildNav() {
            var row = document.createElement('nav');
            row.className = 'ms-page-nav';
            row.setAttribute('aria-label', 'Navigatie');
            row.appendChild(makeLink(backHref, backLabel));
            if (showMenu) buildMenu(row);
            if (forwardHref) {
                var forward = makeLink(forwardHref, forwardLabel, 'ms-page-nav--forward');
                forward.rel = 'next';
                row.appendChild(forward);
            }
            return row;
        }

        heading.parentNode.insertBefore(buildNav(), heading);
    }
})();
