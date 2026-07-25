/* ============================================================
   Syncs an in-page self-evaluation checklist (e.g. the "Checklist"
   evaluation box in Looplicht.html) with the exercise dashboard.

   The exercise only counts as "done" (and awards XP on the dashboard)
   once every checkbox in the checklist is checked. Uses the exact same
   localStorage key scheme as dashboard.js (msDashboard:{labId}:{exerciseId}),
   so no changes to dashboard.js's read logic are needed.

   Usage -- pass the current lab's entry from the shared exercises.js
   manifest, and the current exercise is auto-detected by matching its
   "href" against the current page (see Labo1/Exercises/Looplicht.html):

     <script src="../exercises.js"></script>
     <script src="../checklist-sync.js"></script>
     <script>
       initChecklistSync(LAB_EXERCISES.labo1);
     </script>

   A direct { labId, exerciseId } form is also accepted for one-off use
   without a manifest.
   ============================================================ */

(function () {
    'use strict';

    var STORAGE_PREFIX = 'msDashboard:';

    /* ------------------------------------------------------------
       Celebration: fires once when the student ticks the final box
       and the whole checklist becomes complete. Self-contained
       (no external libraries): a short confetti burst plus a small
       "Proficiat!"-banner. Shared here so every exercise page with a
       checklist gets it automatically. Honours prefers-reduced-motion
       by skipping the confetti but still showing the banner.
       ------------------------------------------------------------ */

    var CONFETTI_COLORS = ['#2e7d32', '#66bb6a', '#fbc02d', '#29b6f6', '#ab47bc', '#ef5350'];

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function showBanner() {
        var banner = document.createElement('div');
        banner.setAttribute('role', 'status');
        banner.style.cssText = [
            'position:fixed', 'top:24px', 'left:50%', 'transform:translateX(-50%) translateY(-16px)',
            'z-index:10000', 'background:#2e7d32', 'color:#fff',
            'padding:14px 22px', 'border-radius:10px', 'font-weight:600',
            'font-family:inherit', 'font-size:1.05rem', 'box-shadow:0 6px 24px rgba(0,0,0,.25)',
            'opacity:0', 'transition:opacity .35s ease, transform .35s ease',
            'max-width:90vw', 'text-align:center', 'pointer-events:none'
        ].join(';');
        banner.textContent = '🎉 Proficiat! Je hebt de oefening volledig afgewerkt.';
        document.body.appendChild(banner);

        // Force reflow so the transition runs, then fade in.
        void banner.offsetWidth;
        banner.style.opacity = '1';
        banner.style.transform = 'translateX(-50%) translateY(0)';

        setTimeout(function () {
            banner.style.opacity = '0';
            banner.style.transform = 'translateX(-50%) translateY(-16px)';
            setTimeout(function () {
                if (banner.parentNode) banner.parentNode.removeChild(banner);
            }, 400);
        }, 3200);
    }

    function launchConfetti() {
        var canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:9999;pointer-events:none';
        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        var dpr = window.devicePixelRatio || 1;

        function resize() {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener('resize', resize);

        var W = window.innerWidth;
        var particles = [];
        var count = 130;
        for (var i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: -20 - Math.random() * window.innerHeight * 0.5,
                w: 6 + Math.random() * 6,
                h: 8 + Math.random() * 8,
                color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
                vy: 2 + Math.random() * 3,
                vx: -1.5 + Math.random() * 3,
                rot: Math.random() * Math.PI,
                vrot: -0.15 + Math.random() * 0.3
            });
        }

        var start = null;
        var duration = 3000;

        function frame(ts) {
            if (start === null) start = ts;
            var elapsed = ts - start;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            var fade = elapsed > duration - 800
                ? Math.max(0, (duration - elapsed) / 800)
                : 1;

            particles.forEach(function (p) {
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.vrot;
                ctx.save();
                ctx.globalAlpha = fade;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            if (elapsed < duration) {
                requestAnimationFrame(frame);
            } else {
                window.removeEventListener('resize', resize);
                if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
            }
        }
        requestAnimationFrame(frame);
    }

    function celebrate() {
        showBanner();
        if (!prefersReducedMotion()) launchConfetti();
    }

    function itemKey(labId, exerciseId, index) {
        return STORAGE_PREFIX + labId + ':' + exerciseId + ':item:' + index;
    }

    function doneKey(labId, exerciseId) {
        return STORAGE_PREFIX + labId + ':' + exerciseId;
    }

    function resolveCurrentExercise(manifest) {
        var currentFile = (window.location.pathname.split('/').pop() || '').toLowerCase();
        var match = manifest.exercises.filter(function (e) {
            return e.href && e.href.split('/').pop().toLowerCase() === currentFile;
        })[0];

        if (!match) {
            console.warn('initChecklistSync: no exercise in the manifest matches the current page ("' + currentFile + '"). Check the "href" values in exercises.js.');
            return null;
        }

        return { labId: manifest.labId, exerciseId: match.id, selector: match.checklistSelector };
    }

    function initChecklistSync(config) {
        if (!config) return;

        // Manifest form: { labId, labTitle, exercises: [...] } -- auto-detect the
        // current exercise. Direct form: { labId, exerciseId } used as-is.
        var resolved = Array.isArray(config.exercises) ? resolveCurrentExercise(config) : config;
        if (!resolved || !resolved.labId || !resolved.exerciseId) return;
        config = resolved;

        var selector = config.selector || '.checklist input[type="checkbox"]';
        var checkboxes = Array.prototype.slice.call(document.querySelectorAll(selector));
        if (checkboxes.length === 0) return;

        // Tracks whether the checklist was already complete, so the
        // celebration fires only on the transition to complete caused by
        // the student, never on page load of an already-finished exercise.
        var wasComplete = false;

        function updateDoneState(fromUserAction) {
            var allChecked = checkboxes.every(function (cb) { return cb.checked; });
            var key = doneKey(config.labId, config.exerciseId);
            if (allChecked) {
                localStorage.setItem(key, '1');
            } else {
                localStorage.removeItem(key);
            }

            if (fromUserAction && allChecked && !wasComplete) {
                celebrate();
            }
            wasComplete = allChecked;
        }

        checkboxes.forEach(function (cb, index) {
            var key = itemKey(config.labId, config.exerciseId, index);
            cb.checked = localStorage.getItem(key) === '1';

            cb.addEventListener('change', function () {
                if (cb.checked) {
                    localStorage.setItem(key, '1');
                } else {
                    localStorage.removeItem(key);
                }
                updateDoneState(true);
            });
        });

        updateDoneState(false);
    }

    window.initChecklistSync = initChecklistSync;
})();
