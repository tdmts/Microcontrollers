/* Single source of truth for Labo 1's exercises.
   Read by dashboard.html (via initDashboard) and by every exercise page
   in this folder (via initChecklistSync) -- add new exercises here only.

   To reorder exercises on the dashboard, just change the "order" number --
   lower numbers show up first. No need to move lines around. */
window.LAB_EXERCISES = {
    labId: 'labo1',
    labTitle: 'Labo 1',
    exercises: [
        { id: 'looplicht', order: 1, name: 'Looplicht', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Looplicht.html', checklistDriven: true },
        { id: 'morsecode', order: 2, name: 'Morsecode', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Morsecode.html' }
    ]
};
