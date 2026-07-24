/* Single source of truth for Labo 0's exercises.
   Read by dashboard.html (via initDashboard) and by every exercise page
   in this folder (via initChecklistSync) -- add new exercises here only.

   To reorder exercises on the dashboard, just change the "order" number --
   lower numbers show up first. No need to move lines around. */
window.LAB_EXERCISES = {
    labId: 'labo0',
    labTitle: 'Labo 0',
    exercises: [
        { id: 'blink', order: 1, name: 'Blink', href: 'https://tdmts.github.io/Microcontrollers/Labo0/Blink.html' }
    ]
};
