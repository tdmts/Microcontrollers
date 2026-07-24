/* Single source of truth for every lab's exercises, keyed by labId.
   Read by each LaboN/dashboard.html (via initDashboard) and by every
   checklist-driven exercise page (via initChecklistSync) -- add new
   exercises here only.

   To reorder exercises on a lab's dashboard, just change the "order"
   number -- lower numbers show up first. No need to move lines around. */
window.LAB_EXERCISES = {
    labo0: {
        labId: 'labo0',
        labTitle: 'Labo 0',
        exercises: [
            { id: 'blink', order: 1, name: 'Blink', href: 'https://tdmts.github.io/Microcontrollers/Labo0/Blink.html' }
        ]
    },
    labo1: {
        labId: 'labo1',
        labTitle: 'Labo 1',
        exercises: [
            { id: 'looplicht', order: 2, name: 'Looplicht', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Looplicht.html', checklistDriven: true },
            { id: 'morsecode', order: 1, name: 'Morsecode', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Morsecode.html', checklistDriven: true },
            { id: 'knightrider', order: 3, name: 'Knight rider', href: 'https://tdmts.github.io/Microcontrollers/Labo1/KnightRider.html', checklistDriven: true },
            { id: 'rgbled', order: 4, name: 'RGB Led', href: 'https://tdmts.github.io/Microcontrollers/Labo1/RGBLed.html', checklistDriven: true },
            { id: 'dubbel7segment', order: 5, name: 'Dubbel 7 segment', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Dubbel7Segment.html', checklistDriven: true },
            { id: 'sevensegmentmetteller', order: 6, name: '7 segment met teller', href: 'https://tdmts.github.io/Microcontrollers/Labo1/7SegmentMetTeller.html', checklistDriven: true },
            { id: 'dubbel7segmentmetteller', order: 7, name: 'Dubbel 7 segment met teller', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Dubbel7SegmentMetTeller.html', checklistDriven: true }
        ]
    }
};
