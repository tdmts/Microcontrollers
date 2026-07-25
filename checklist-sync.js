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

        function updateDoneState() {
            var allChecked = checkboxes.every(function (cb) { return cb.checked; });
            var key = doneKey(config.labId, config.exerciseId);
            if (allChecked) {
                localStorage.setItem(key, '1');
            } else {
                localStorage.removeItem(key);
            }
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
                updateDoneState();
            });
        });

        updateDoneState();
    }

    window.initChecklistSync = initChecklistSync;
})();
