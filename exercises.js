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
            { id: 'blink', order: 1, name: 'Blink', href: 'https://tdmts.github.io/Microcontrollers/Labo0/Exercises/Blink.html', checklistDriven: true, difficulty: 1, time: '~10 min', blurb: 'Je allereerste sketch: laat een ingebouwde LED periodiek knipperen.' },
            { id: 'begeleideoefening', order: 2, name: 'Begeleide oefening', href: 'https://tdmts.github.io/Microcontrollers/Labo0/Exercises/BegeleideOefening.html', checklistDriven: true, difficulty: 2, time: '~45 min', blurb: 'Bouw stap voor stap een knop-en-LED-schakeling en breid je programma uit met een parametriseerbare blink-functie.' }
        ]
    },
    labo1: {
        labId: 'labo1',
        labTitle: 'Labo 1',
        exercises: [
            { id: 'looplicht', order: 2, name: 'Looplicht', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/Looplicht.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Verbind 4 leds en laat ze na elkaar oplichten voor een looplicht-effect.' },
            { id: 'morsecode', order: 1, name: 'Morsecode', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/Morsecode.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Laat een led het woord SOS in morsecode knipperen.' },
            { id: 'knightrider', order: 3, name: 'Knight rider', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/KnightRider.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Bouw het looplicht om tot een heen-en-weer Knight Rider effect.' },
            { id: 'rgbled', order: 4, name: 'RGB Led', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/RGBLed.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Meng de 7 basiskleuren op een RGB-led met de juiste pin-combinaties.' },
            { id: 'dubbel7segment', order: 6, name: 'Dubbel 7 segment', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/Dubbel7Segment.html', checklistDriven: true, difficulty: 2, time: '~25 min', blurb: 'Stuur een dubbel 7-segment display aan in een 8-animatie.' },
            { id: 'sevensegmentmetteller', order: 5, name: '7 segment met teller', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/7SegmentMetTeller.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Bouw een teller van 0 tot 9 op één 7-segment display met een letterpatroon-array.' },
            { id: 'dubbel7segmentmetteller', order: 7, name: 'Dubbel 7 segment met teller', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/Dubbel7SegmentMetTeller.html', checklistDriven: true, difficulty: 3, time: '~35 min', blurb: 'Combineer multiplexing met tellerlogica voor een 00-99 teller op dubbel 7-segment.' }
        ]
    },
    labo2: {
        labId: 'labo2',
        labTitle: 'Labo 2',
        exercises: [
            { id: 'potentiometeruitlezen', order: 1, name: 'Potentiometer uitlezen', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/PotentiometerUitlezen.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Lees een potentiometer in met analogRead() en stuur de waarde via seriële communicatie naar de PC.' },
            { id: 'leddimmen', order: 2, name: 'LED dimmen', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/LedDimmen.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Laat een LED met analogWrite() langzaam van gedoofd naar volle sterkte gaan en terug.' },
            { id: 'leddimmenmetpotentiometer', order: 3, name: 'LED dimmen met potentiometer', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/LedDimmenMetPotentiometer.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Combineer analogRead() en analogWrite() tot een dimmer: de stand van de potentiometer bepaalt de helderheid van de LED.' },
            { id: 'dimmermetschakelaar', order: 4, name: 'Dimmer met schakelaar', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/DimmerMetSchakelaar.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Voeg een schakelaar toe aan je dimmer, zodat je de gedimde LED ook helemaal aan en uit kan zetten.' },
            { id: 'ldrlichtmeting', order: 5, name: 'LDR: lichtmeting', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/LdrLichtmeting.html', checklistDriven: true, difficulty: 2, time: '~25 min', blurb: 'Meet licht met een LDR in een spanningsdeler en laat de LED feller branden naarmate het donkerder wordt.' },
            { id: 'nachtlampmettijd', order: 6, name: 'Nachtlamp met tijd', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/NachtlampMetTijd.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Schakel de LED in zodra het donker wordt en na 10 seconden weer uit, met millis() in plaats van delay().' },
            { id: 'temperatuursensortmp36', order: 7, name: 'Temperatuursensor TMP36', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/TemperatuursensorTMP36.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Lees de TMP36 uit, reken de spanning om naar graden Celsius en toon de temperatuur in de seriële monitor.' },
            { id: 'temperatuursensorlm35', order: 8, name: 'Temperatuursensor LM35', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/TemperatuursensorLM35.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Doe hetzelfde met de LM35 uit je starterkit, die de spanning anders omrekent dan de TMP36.' },
            { id: 'temperatuurindicatorrgbled', order: 9, name: 'Temperatuurindicator met RGB-LED', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/TemperatuurindicatorMetRGBLed.html', checklistDriven: true, difficulty: 3, time: '~35 min', blurb: 'Duid met een RGB-LED aan of de gemeten temperatuur te hoog, goed of te laag is.' },
            { id: 'thermometerop7segment', order: 10, name: 'Thermometer op 7-segment display', href: 'https://tdmts.github.io/Microcontrollers/Labo2/Exercises/ThermometerOp7Segment.html', checklistDriven: true, difficulty: 3, time: '~45 min', blurb: 'Toon de temperatuur van -9 tot 99 graden op het dubbele 7-segment display, met multiplexing.' }
        ]
    },
    labo3: {
        labId: 'labo3',
        labTitle: 'Labo 3',
        exercises: [
            { id: 'enkel7segment', order: 1, name: '1x 7 segment display', href: 'https://tdmts.github.io/Microcontrollers/Labo3/Exercises/Enkel7SegmentDisplay.html', checklistDriven: true, difficulty: 2, time: '~40 min', blurb: 'Stuur een 7-segment display aan met een 74HC595 schuifregister en tel af van 3 naar 1.' },
            { id: 'dubbel7segment', order: 2, name: '2x 7 segment display', href: 'https://tdmts.github.io/Microcontrollers/Labo3/Exercises/Dubbel7SegmentDisplay.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Plaats twee schuifregisters in cascade en tel af van 10 naar 0 op twee displays.' },
            { id: 'looplicht8bit', order: 3, name: '8-bit looplicht', href: 'https://tdmts.github.io/Microcontrollers/Labo3/Exercises/Looplicht8Bit.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Laat één LED over acht uitgangen van het schuifregister wandelen, met een lus in plaats van een sequentie.' },
            { id: 'looplicht16bit', order: 4, name: '16-bit looplicht', href: 'https://tdmts.github.io/Microcontrollers/Labo3/Exercises/Looplicht16Bit.html', checklistDriven: true, difficulty: 3, time: '~20 min', blurb: 'Breid je looplicht uit naar 16 LEDs met een tweede schuifregister in cascade.' },
            { id: 'ledbarmetpotentiometer', order: 5, name: 'Ledbar met potentiometer', href: 'https://tdmts.github.io/Microcontrollers/Labo3/Exercises/LedbarMetPotentiometer.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Laat de stand van een potentiometer bepalen hoeveel LEDs van de ledbar oplichten.' },
            { id: 'lichtpatronenuitarray', order: 6, name: 'Lichtpatronen uit een array', href: 'https://tdmts.github.io/Microcontrollers/Labo3/Exercises/LichtpatronenUitEenArray.html', checklistDriven: true, difficulty: 3, time: '~45 min', blurb: 'Doorloop drie patronen uit een multidimensionele array, met de potentiometer als snelheidsregelaar.' }
        ]
    }
};
