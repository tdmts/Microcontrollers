/* ============================================================
   Shared engine for the per-lab reference hubs.
   Usage (see Labo0/Reference/index.html):

     <div id="reference-root"></div>
     <script src="../../reference.js"></script>
     <script src="../../reference-dashboard.js"></script>
     <script>initReferenceHub('labo0');</script>

   Every category and topic is rendered up front so students can browse
   non-linearly instead of working through a fixed order.

   No XP, no badges, no levels: a theory page is not something you
   "complete". The one thing it does track is whether the page has been
   opened -- back-link.js writes msDashboard:{labId}:theory:{topicId} on
   every theory page, and this hub reads it back as a check on the card,
   so a student browsing a dozen topics can see which ones are still
   untouched. The reset link at the bottom clears those checks, and only
   those: the exercises have their own reset on dashboard.html.
   ============================================================ */

(function () {
    'use strict';

    /* The same prefix dashboard.js, checklist-sync.js and back-link.js use.
       back-link.js is the only writer of the "theory:" keys; this file reads
       them and clears them, never sets them. */
    var STORAGE_PREFIX = 'msDashboard:';

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    /* A topic href normally points at a sibling page, but the Datasheets
       category points at a file in datasheets/. These hubs are iframed into
       Orion, so opening a PDF in the same tab would load it inside that narrow
       frame. Documents therefore get their own tab; pages stay in the frame. */
    var DOCUMENT_RE = /\.(pdf|zip|docx?|pptx?|xlsx?)(?:[?#]|$)/i;

    function isDocument(href) {
        return DOCUMENT_RE.test(String(href));
    }

    function theoryKey(labId, topicId) {
        return STORAGE_PREFIX + labId + ':theory:' + topicId;
    }

    /* Wrapped for the same reason back-link.js wraps its reads: a browser that
       blocks storage for an embedded frame throws on the first access, and the
       hub has to keep listing the topics either way. */
    function isVisited(labId, topicId) {
        try {
            return window.localStorage.getItem(theoryKey(labId, topicId)) === '1';
        } catch (e) {
            return false;
        }
    }

    function initReferenceHub(labId) {
        var root = document.getElementById('reference-root');
        var data = window.LAB_REFERENCE && window.LAB_REFERENCE[labId];
        if (!root || !data || !Array.isArray(data.categories)) return;

        /* Only the topics this lab actually lists, so a reset here cannot touch
           another lab's keys -- the same rule dashboard.js follows. Documents
           are left out: a PDF cannot carry back-link.js, so it could never be
           marked in the first place. */
        function pageTopics() {
            var topics = [];
            data.categories.forEach(function (category) {
                (category.topics || []).forEach(function (topic) {
                    if (!isDocument(topic.href)) topics.push(topic);
                });
            });
            return topics;
        }

        function clearVisited() {
            pageTopics().forEach(function (topic) {
                try {
                    window.localStorage.removeItem(theoryKey(labId, topic.id));
                } catch (e) {
                    /* Nothing to clear if storage is unavailable. */
                }
            });
        }

        function cardHtml(topic) {
            var isDoc = isDocument(topic.href);
            var newTab = isDoc ? ' target="_blank" rel="noopener"' : '';
            var visited = !isDoc && isVisited(labId, topic.id);
            var check = visited
                ? '<span class="ms-ref-card-check" aria-hidden="true">✓</span>'
                : '';
            return (
                '<a class="ms-ref-card' + (visited ? ' ms-ref-card--visited' : '') + '"' +
                ' href="' + escapeHtml(topic.href) + '"' + newTab +
                (visited ? ' title="Gelezen"' : '') + '>' +
                '<div class="ms-ref-card-title">' + escapeHtml(topic.name) + check + '</div>' +
                (topic.blurb ? '<div class="ms-ref-card-blurb">' + escapeHtml(topic.blurb) + '</div>' : '') +
                '</a>'
            );
        }

        function render() {
            var categoriesHtml = data.categories.map(function (category) {
                var topicsHtml = (category.topics || []).map(cardHtml).join('');

                return (
                    '<section class="ms-ref-category">' +
                    '<h2 class="ms-ref-category-title">' + escapeHtml(category.name) + '</h2>' +
                    '<div class="ms-ref-grid">' + topicsHtml + '</div>' +
                    '</section>'
                );
            }).join('');

            root.innerHTML =
                '<div class="ms-ref-hub">' + categoriesHtml +
                '<button class="ms-ref-reset-btn" type="button" id="ms-ref-reset-btn">Voortgang resetten</button>' +
                '</div>';

            var resetBtn = root.querySelector('#ms-ref-reset-btn');
            if (resetBtn) resetBtn.addEventListener('click', onReset);
        }

        /* Names what it clears. There are two reset links in a lab now, and
           "je voortgang" on its own no longer says which one you clicked. */
        function onReset() {
            if (!window.confirm('Weet je zeker dat je wil wissen welke theoriepagina\'s je gelezen hebt?')) return;
            clearVisited();
            render();
        }

        /* Picks up a page read in another tab while this hub stays open, the
           same way dashboard.js follows a checklist ticked off elsewhere. */
        window.addEventListener('storage', function (event) {
            if (!event.key || event.key.indexOf(STORAGE_PREFIX + labId + ':theory:') !== 0) return;
            render();
        });

        render();
    }

    window.initReferenceHub = initReferenceHub;
})();
