/* ============================================================
   Shared engine for the per-lab reference hubs.
   Usage (see Labo0/Reference/index.html):

     <div id="reference-root"></div>
     <script src="../../reference.js"></script>
     <script src="../../reference-dashboard.js"></script>
     <script>initReferenceHub('labo0');</script>

   Pure navigation -- no progress, XP, or completion tracking. Every
   category and topic is rendered up front so students can browse
   non-linearly instead of working through a fixed order.
   ============================================================ */

(function () {
    'use strict';

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function initReferenceHub(labId) {
        var root = document.getElementById('reference-root');
        var data = window.LAB_REFERENCE && window.LAB_REFERENCE[labId];
        if (!root || !data || !Array.isArray(data.categories)) return;

        var categoriesHtml = data.categories.map(function (category) {
            var topicsHtml = (category.topics || []).map(function (topic) {
                return (
                    '<a class="ms-ref-card" href="' + escapeHtml(topic.href) + '">' +
                    '<div class="ms-ref-card-title">' + escapeHtml(topic.name) + '</div>' +
                    (topic.blurb ? '<div class="ms-ref-card-blurb">' + escapeHtml(topic.blurb) + '</div>' : '') +
                    '</a>'
                );
            }).join('');

            return (
                '<section class="ms-ref-category">' +
                '<h2 class="ms-ref-category-title">' + escapeHtml(category.name) + '</h2>' +
                '<div class="ms-ref-grid">' + topicsHtml + '</div>' +
                '</section>'
            );
        }).join('');

        root.innerHTML = '<div class="ms-ref-hub">' + categoriesHtml + '</div>';
    }

    window.initReferenceHub = initReferenceHub;
})();
