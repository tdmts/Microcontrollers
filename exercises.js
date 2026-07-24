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
            { id: 'blink', order: 1, name: 'Blink', href: 'https://tdmts.github.io/Microcontrollers/Labo0/Blink.html', difficulty: 1, time: '~10 min', blurb: 'Je allereerste sketch: laat een ingebouwde LED periodiek knipperen.' }
        ]
    },
    labo1: {
        labId: 'labo1',
        labTitle: 'Labo 1',
        exercises: [
            { id: 'looplicht', order: 2, name: 'Looplicht', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Looplicht.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Verbind 4 leds en laat ze na elkaar oplichten voor een looplicht-effect.' },
            { id: 'morsecode', order: 1, name: 'Morsecode', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Morsecode.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Laat een led het woord SOS in morsecode knipperen.' },
            { id: 'knightrider', order: 3, name: 'Knight rider', href: 'https://tdmts.github.io/Microcontrollers/Labo1/KnightRider.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Bouw het looplicht om tot een heen-en-weer Knight Rider effect.' },
            { id: 'rgbled', order: 4, name: 'RGB Led', href: 'https://tdmts.github.io/Microcontrollers/Labo1/RGBLed.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Meng de 7 basiskleuren op een RGB-led met de juiste pin-combinaties.' },
            { id: 'dubbel7segment', order: 5, name: 'Dubbel 7 segment', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Dubbel7Segment.html', checklistDriven: true, difficulty: 2, time: '~25 min', blurb: 'Stuur een dubbel 7-segment display aan in een 8-animatie.' },
            { id: 'sevensegmentmetteller', order: 6, name: '7 segment met teller', href: 'https://tdmts.github.io/Microcontrollers/Labo1/7SegmentMetTeller.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Bouw een teller van 0 tot 9 op één 7-segment display met een letterpatroon-array.' },
            { id: 'dubbel7segmentmetteller', order: 7, name: 'Dubbel 7 segment met teller', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Dubbel7SegmentMetTeller.html', checklistDriven: true, difficulty: 3, time: '~35 min', blurb: 'Combineer multiplexing met tellerlogica voor een 00-99 teller op dubbel 7-segment.' }
        ]
    }
};
