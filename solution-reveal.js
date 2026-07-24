/* ============================================================
   Reveals a per-exercise solution on click. Self-running -- just
   include the script, no init call needed:

     <script src="https://tdmts.github.io/Microcontrollers/solution-reveal.js"></script>

   Markup per exercise page:

     <div class="solution-container">
         <button type="button" class="btn-spoiler solution-reveal-btn">Toon oplossing</button>
         <div class="spoiler-content solution-content">
             ...solution content...
         </div>
     </div>

   Reuses the .btn-spoiler / .spoiler-content styling already shipped
   in orion.css, but doesn't touch .spoiler-container or rely on
   orion.js's own spoiler auto-init -- this is a one-click, one-way
   reveal, not a collapsible toggle. Supports multiple
   .solution-container blocks per page.
   ============================================================ */

(function () {
    'use strict';

    document.querySelectorAll('.solution-container').forEach(function (container) {
        var revealBtn = container.querySelector('.solution-reveal-btn');
        var content = container.querySelector('.solution-content');
        if (!revealBtn || !content) return;

        revealBtn.addEventListener('click', function () {
            revealBtn.style.display = 'none';
            content.classList.add('active');
        });
    });
})();
