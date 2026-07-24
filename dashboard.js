/* ============================================================
   Shared engine for the per-lab exercise dashboards.
   Usage (see Labo0/dashboard.html or Labo1/dashboard.html):

     <div id="dashboard-root"></div>
     <script src="../dashboard.js"></script>
     <script>
       initDashboard({
         labId: 'labo1',
         labTitle: 'Labo 1',
         exercises: [
           { id: 'looplicht', name: 'Looplicht', href: 'Looplicht.html' },
           { id: 'morsecode', name: 'Morsecode', href: 'Morsecode.html' }
         ]
       });
     </script>

   Progress is self-reported by the student and stored in this browser's
   localStorage only (no backend) -- it is not verified or synced anywhere.
   ============================================================ */

(function () {
    'use strict';

    var STORAGE_PREFIX = 'msDashboard:';
    var XP_PER_EXERCISE = 100;

    var ENCOURAGEMENTS = [
        'Goed bezig! \uD83D\uDCAA',
        'Op naar de volgende! \uD83D\uDD25',
        'Je bent goed op weg! \uD83D\uDE80',
        'Knap gedaan! \u2B50',
        'Sterk werk! \uD83D\uDE4C',
        'Mooi zo! \uD83C\uDF89'
    ];

    var confettiParticles = [];
    var confettiRunning = false;

    function stateKey(labId, exerciseId) {
        return STORAGE_PREFIX + labId + ':' + exerciseId;
    }

    function isDone(labId, exerciseId) {
        return localStorage.getItem(stateKey(labId, exerciseId)) === '1';
    }

    function setDone(labId, exerciseId, done) {
        var key = stateKey(labId, exerciseId);
        if (done) {
            localStorage.setItem(key, '1');
        } else {
            localStorage.removeItem(key);
        }
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function initDashboard(config) {
        var root = document.getElementById('dashboard-root');
        if (!root || !config || !Array.isArray(config.exercises)) return;

        function completedCount() {
            return config.exercises.filter(function (e) { return isDone(config.labId, e.id); }).length;
        }

        function render() {
            var total = config.exercises.length;
            var done = completedCount();
            var xp = done * XP_PER_EXERCISE;
            var level = Math.floor(xp / XP_PER_EXERCISE) + 1;
            var pct = total === 0 ? 0 : Math.round((done / total) * 100);
            var allDone = total > 0 && done === total;

            var badgesHtml = config.exercises.map(function (e) {
                var unlocked = isDone(config.labId, e.id);
                return (
                    '<div class="ms-badge' + (unlocked ? ' unlocked' : ' locked') + '" title="' + escapeHtml(e.name) + '">' +
                    '<div class="ms-badge-icon">' + (unlocked ? '\uD83C\uDFC5' : '\uD83D\uDD12') + '</div>' +
                    '<div class="ms-badge-name">' + escapeHtml(e.name) + '</div>' +
                    '</div>'
                );
            }).join('');

            badgesHtml += (
                '<div class="ms-badge ms-badge-grand' + (allDone ? ' unlocked' : ' locked') + '" title="' + escapeHtml(config.labTitle) + ' Meester">' +
                '<div class="ms-badge-icon">' + (allDone ? '\uD83D\uDC51' : '\uD83D\uDD12') + '</div>' +
                '<div class="ms-badge-name">' + escapeHtml(config.labTitle) + ' Meester</div>' +
                '</div>'
            );

            var itemsHtml = config.exercises.map(function (e) {
                var exDone = isDone(config.labId, e.id);
                var disabledAttr = e.checklistDriven ? ' disabled' : '';
                var hintHtml = e.checklistDriven && !exDone
                    ? '<span class="ms-exercise-hint">Voltooi de checklist op de oefenpagina</span>'
                    : '';
                return (
                    '<li class="ms-exercise-item' + (exDone ? ' done' : '') + '">' +
                    '<label class="ms-exercise-check">' +
                    '<input type="checkbox" data-toggle="' + escapeHtml(e.id) + '"' + (exDone ? ' checked' : '') + disabledAttr + '>' +
                    '<span class="ms-exercise-name">' + escapeHtml(e.name) + '</span>' +
                    '</label>' +
                    hintHtml +
                    (e.href ? '<a class="ms-exercise-link" href="' + escapeHtml(e.href) + '" target="_blank" rel="noopener">Open oefening \u2192</a>' : '') +
                    '</li>'
                );
            }).join('');

            root.innerHTML =
                '<div class="ms-dashboard">' +
                '<div class="ms-xp-card">' +
                '<div class="ms-level-badge">Lvl ' + level + '</div>' +
                '<div class="ms-xp-info">' +
                '<div class="ms-xp-label">' + xp + ' XP</div>' +
                '<div class="ms-progress-bar"><div class="ms-progress-fill" style="width:' + pct + '%"></div></div>' +
                '<div class="ms-progress-label">' + done + ' / ' + total + ' oefeningen voltooid (' + pct + '%)</div>' +
                '</div>' +
                '</div>' +
                '<div class="ms-badges">' + badgesHtml + '</div>' +
                '<ul class="ms-exercise-list">' + itemsHtml + '</ul>' +
                '<button class="ms-reset-btn" type="button" id="ms-reset-btn">Voortgang resetten</button>' +
                '</div>' +
                '<canvas class="ms-confetti-canvas" id="ms-confetti-canvas"></canvas>';

            config.exercises.forEach(function (e) {
                if (e.checklistDriven) return;
                var input = root.querySelector('[data-toggle="' + cssEscape(e.id) + '"]');
                if (input) {
                    input.addEventListener('change', function () { onToggle(e.id); });
                }
            });

            var resetBtn = root.querySelector('#ms-reset-btn');
            if (resetBtn) resetBtn.addEventListener('click', onReset);
        }

        function cssEscape(value) {
            return String(value).replace(/["\\]/g, '\\$&');
        }

        function onToggle(exerciseId) {
            var wasDone = isDone(config.labId, exerciseId);
            setDone(config.labId, exerciseId, !wasDone);
            render();

            if (!wasDone) {
                confettiBurst(60);
                showToast(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);

                if (completedCount() === config.exercises.length) {
                    setTimeout(celebrateAll, 500);
                }
            }
        }

        function onReset() {
            if (!window.confirm('Weet je zeker dat je jouw voortgang voor dit labo wil resetten?')) return;
            config.exercises.forEach(function (e) { setDone(config.labId, e.id, false); });
            render();
        }

        function showToast(message) {
            var toast = document.createElement('div');
            toast.className = 'ms-toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            requestAnimationFrame(function () { toast.classList.add('show'); });
            setTimeout(function () {
                toast.classList.remove('show');
                setTimeout(function () { toast.remove(); }, 300);
            }, 2200);
        }

        function celebrateAll() {
            confettiBurst(220);
            var overlay = document.createElement('div');
            overlay.className = 'ms-celebration-overlay';
            overlay.innerHTML =
                '<div class="ms-celebration-modal">' +
                '<div class="ms-celebration-emoji">\uD83C\uDF89\uD83D\uDC51\uD83C\uDF89</div>' +
                '<h2>Gefeliciteerd!</h2>' +
                '<p>Je hebt alle oefeningen van <strong>' + escapeHtml(config.labTitle) + '</strong> voltooid!</p>' +
                '<button type="button" class="ms-celebration-close">Verder gaan</button>' +
                '</div>';
            document.body.appendChild(overlay);
            overlay.querySelector('.ms-celebration-close').addEventListener('click', function () {
                overlay.remove();
            });
        }

        function confettiBurst(count) {
            var canvas = document.getElementById('ms-confetti-canvas');
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            resizeCanvas(canvas);

            var colors = ['#4f46e5', '#06b6d4', '#f59e0b', '#16a34a', '#ec4899'];
            for (var i = 0; i < count; i++) {
                confettiParticles.push({
                    x: Math.random() * canvas.width,
                    y: -20 - Math.random() * canvas.height * 0.3,
                    size: 6 + Math.random() * 6,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speedY: 2 + Math.random() * 3,
                    speedX: (Math.random() - 0.5) * 2,
                    rotation: Math.random() * 360,
                    spin: (Math.random() - 0.5) * 10
                });
            }

            if (!confettiRunning) {
                confettiRunning = true;
                requestAnimationFrame(function tick() { animateConfetti(canvas, ctx, tick); });
            }
        }

        function resizeCanvas(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function animateConfetti(canvas, ctx, tick) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confettiParticles.forEach(function (p) {
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.spin;
            });

            confettiParticles = confettiParticles.filter(function (p) { return p.y < canvas.height + 30; });

            confettiParticles.forEach(function (p) {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                ctx.restore();
            });

            if (confettiParticles.length > 0) {
                requestAnimationFrame(tick);
            } else {
                confettiRunning = false;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        window.addEventListener('resize', function () {
            var canvas = document.getElementById('ms-confetti-canvas');
            if (canvas) resizeCanvas(canvas);
        });

        // Picks up checklist-driven completions (see checklist-sync.js) made on the
        // exercise page itself, when this dashboard is open live in another tab.
        window.addEventListener('storage', function (event) {
            if (!event.key) return;
            var matchedExercise = config.exercises.filter(function (e) {
                return e.checklistDriven && event.key === stateKey(config.labId, e.id);
            })[0];
            if (!matchedExercise) return;

            var justCompleted = event.newValue === '1' && event.oldValue !== '1';
            render();
            if (justCompleted) {
                confettiBurst(60);
                showToast(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
                if (completedCount() === config.exercises.length) {
                    setTimeout(celebrateAll, 500);
                }
            }
        });

        render();
    }

    window.initDashboard = initDashboard;
})();
