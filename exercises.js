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
            { id: 'achtanimatie', order: 5, name: '8-animatie op een 7-segment display', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/AchtAnimatieOp7Segment.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Begin met één segment, zoek uit welk type display je hebt, en teken daarna een acht door de segmenten na elkaar te laten oplichten.' },
            { id: 'sevensegmentmetteller', order: 6, name: '7 segment met teller', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/7SegmentMetTeller.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Bouw een teller van 0 tot 9 op één 7-segment display met een letterpatroon-array.' },
            { id: 'vastgetaldubbel7segment', order: 7, name: 'Vast getal op een dubbel 7-segment display', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/VastGetalOpDubbel7Segment.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Zet 42 op een dubbel display en houd het stabiel: je eerste kennismaking met multiplexing, en verder niets nieuws.' },
            { id: 'dubbel7segmentmetteller', order: 8, name: 'Dubbel 7 segment met teller', href: 'https://tdmts.github.io/Microcontrollers/Labo1/Exercises/Dubbel7SegmentMetTeller.html', checklistDriven: true, difficulty: 3, time: '~35 min', blurb: 'Breid je stabiele dubbel display uit tot een teller van 00 tot 99, zonder de multiplexing te blokkeren.' }
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
    },
    labo4: {
        labId: 'labo4',
        labTitle: 'Labo 4',
        exercises: [
            { id: 'ledsaansturen', order: 1, name: 'LEDs aansturen met de PCF8574', href: 'https://tdmts.github.io/Microcontrollers/Labo4/Exercises/LedsAansturen.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Bouw je eerste I²C-schakeling, zoek het adres van je PCF8574 en laat er twee LEDs afwisselend op branden.' },
            { id: 'drukknoppeninlezen', order: 2, name: 'Drukknoppen inlezen via de PCF8574', href: 'https://tdmts.github.io/Microcontrollers/Labo4/Exercises/DrukknoppenInlezen.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Lees twee drukknoppen in via de I/O-expander en meld op de seriële monitor elke keer dat er eentje verandert.' },
            { id: 'tekstopi2clcd', order: 3, name: 'Tekst op een I²C LCD display', href: 'https://tdmts.github.io/Microcontrollers/Labo4/Exercises/TekstOpI2CLcd.html', checklistDriven: true, difficulty: 2, time: '~25 min', blurb: 'Schrijf twee regels tekst naar een LCD-module die via een PCF8574 aan de I2C-bus hangt.' },
            { id: 'vollopermetdrukknoppen', order: 4, name: 'Volloper met twee drukknoppen', href: 'https://tdmts.github.io/Microcontrollers/Labo4/Exercises/VolloperMetDrukknoppen.html', checklistDriven: true, difficulty: 3, time: '~45 min', blurb: 'Laat vier LEDs op de expander vollopen vanaf de ene of de andere kant, afhankelijk van welke knop je indrukt.' },
            { id: 'tellermeti2cdrukknoppen', order: 5, name: 'Teller met I²C-drukknoppen', href: 'https://tdmts.github.io/Microcontrollers/Labo4/Exercises/TellerMetI2CDrukknoppen.html', checklistDriven: true, difficulty: 3, time: '~60 min', blurb: 'Combineer twee schuifregisters en een I/O-expander tot een teller van 0 tot 99 die je kan op- en aftellen en pauzeren.' }
        ]
    },
    labo5: {
        labId: 'labo5',
        labTitle: 'Labo 5',
        exercises: [
            { id: 'servometpotentiometer', order: 1, name: 'Servo besturen met een potentiometer', href: 'https://tdmts.github.io/Microcontrollers/Labo5/Exercises/ServoMetPotentiometer.html', checklistDriven: true, difficulty: 1, time: '~20 min', blurb: 'Je eerste motor: laat de as van een servo meedraaien met de stand van een potentiometer.' },
            { id: 'dcmotormettransistor', order: 2, name: 'DC motor regelen met een transistor', href: 'https://tdmts.github.io/Microcontrollers/Labo5/Exercises/DCMotorMetTransistor.html', checklistDriven: true, difficulty: 2, time: '~45 min', blurb: 'Bereken zelf de basisweerstand en schakel een motor die te veel stroom trekt voor een gewone uitgangspin.' },
            { id: 'draairichtingmetl293', order: 3, name: 'Draairichting omkeren met de L293D', href: 'https://tdmts.github.io/Microcontrollers/Labo5/Exercises/DraairichtingMetL293.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Zet een H-brug in en laat dezelfde motor twee kanten op draaien, zonder één draad te verleggen.' },
            { id: 'snelheidenrichtingmetl293', order: 4, name: 'Zacht omkeren met de L293D', href: 'https://tdmts.github.io/Microcontrollers/Labo5/Exercises/SnelheidEnRichtingMetL293.html', checklistDriven: true, difficulty: 3, time: '~35 min', blurb: 'Regel richting én snelheid met één potentiometer, zodat de motor afremt tot stilstand voor hij omkeert.' },
            { id: 'dcmotormetl298n', order: 5, name: 'Dezelfde motor op een L298N-module', href: 'https://tdmts.github.io/Microcontrollers/Labo5/Exercises/DCMotorMetL298N.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Vervang de L293D door een krachtiger module en zoek in de datasheet uit welke pin met welke overeenkomt.' },
            { id: 'stappenmotorfullstep', order: 6, name: 'Stappenmotor laten draaien in full step', href: 'https://tdmts.github.io/Microcontrollers/Labo5/Exercises/StappenmotorInFullStep.html', checklistDriven: true, difficulty: 2, time: '~45 min', blurb: 'Duw een stappenmotor stap voor stap rond met een stappentabel, en regel de snelheid met een potentiometer.' },
            { id: 'stappenmotorhalfstep', order: 7, name: 'Wisselen tussen full step en half step', href: 'https://tdmts.github.io/Microcontrollers/Labo5/Exercises/StappenmotorInHalfStep.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Verdubbel het aantal stappen per omwenteling door twee spoelen tegelijk te bekrachtigen, met een schuifschakelaar ertussen.' },
            { id: 'stappenmotorrichtingmetdrukknop', order: 8, name: 'Stappenmotor van richting doen keren met een drukknop', href: 'https://tdmts.github.io/Microcontrollers/Labo5/Exercises/StappenmotorRichtingMetDrukknop.html', checklistDriven: true, difficulty: 3, time: '~40 min', blurb: 'Loop je stappentabel achterstevoren af, en laat een ontdenderde drukknop de richting omkeren als een eindeloopschakelaar.' },
            { id: 'rolluikmetldr', order: 9, name: 'Automatisch rolluik met LDR en eindeloopschakelaars', href: 'https://tdmts.github.io/Microcontrollers/Labo5/Exercises/RolluikMetLdrEnEindeloopschakelaars.html', checklistDriven: true, difficulty: 3, time: '~90 min', blurb: 'Breng LDR, LCD en H-brug samen tot een rolluik dat zichzelf stuurt, met hysteresis tegen oscilleren en verbreekcontacten tegen draadbreuk.' }
        ]
    }
};
