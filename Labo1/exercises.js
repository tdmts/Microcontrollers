/* Single source of truth for Labo 1's exercises.
   Read by dashboard.html (via initDashboard) and by every exercise page
   in this folder (via initChecklistSync) -- add new exercises here only. */
window.LAB_EXERCISES = {
    labId: 'labo1',
    labTitle: 'Labo 1',
    exercises: [
        { id: 'looplicht', name: 'Looplicht', href: 'Looplicht.html', checklistDriven: true },
        { id: 'morsecode', name: 'Morsecode', href: 'Morsecode.html' }
    ]
};
