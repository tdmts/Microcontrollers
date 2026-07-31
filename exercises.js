/* Single source of truth for every lab's exercises, keyed by labId.
   Read by each LaboN/dashboard.html (via initDashboard) and by every
   checklist-driven exercise page (via initChecklistSync) -- add new
   exercises here only.

   To reorder exercises on a lab's dashboard, just change the "order"
   number -- lower numbers show up first. No need to move lines around.

   An "href" is the bare filename of a page sitting next to that lab's
   dashboard.html, never a full https://tdmts.github.io/... URL: the
   dashboard puts the href straight into the card, so an absolute one
   sends every click in a local copy off to the live site. */
window.LAB_EXERCISES = {
    labo0: {
        labId: 'labo0',
        labTitle: 'Labo 0',
        exercises: [
            { id: 'blink', order: 1, name: 'Blink', href: 'Blink.html', checklistDriven: true, difficulty: 1, time: '~10 min', blurb: 'Je allereerste sketch: laat een ingebouwde led knipperen en pas het knipperritme aan.' },
            { id: 'begeleideoefening', order: 2, name: 'Begeleide oefening', href: 'BegeleideOefening.html', checklistDriven: true, difficulty: 2, time: '~45 min', blurb: 'Bouw stap voor stap een knop-en-led-schakeling en breid je programma uit met een parametriseerbare knipper-functie.' }
        ]
    },
    labo1: {
        labId: 'labo1',
        labTitle: 'Labo 1',
        exercises: [
            { id: 'looplicht', order: 2, name: 'Looplicht', href: 'Looplicht.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Verbind 4 leds en laat ze na elkaar oplichten voor een looplicht-effect.' },
            { id: 'morsecode', order: 1, name: 'Morsecode', href: 'Morsecode.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Laat een led het woord SOS in morsecode knipperen.' },
            { id: 'knightrider', order: 3, name: 'Knight rider', href: 'KnightRider.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Bouw het looplicht om tot een heen-en-weer Knight Rider effect.' },
            { id: 'rgbled', order: 4, name: 'RGB Led', href: 'RGBLed.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Meng de 7 basiskleuren op een RGB-led met de juiste pin-combinaties.' },
            { id: 'teller7segment', order: 5, name: 'Teller op een 7-segment display', href: 'TellerOp7SegmentDisplay.html', checklistDriven: true, difficulty: 3, time: '~45 min', blurb: 'Begin met één segment, teken er een acht mee, en laat het display daarna tellen van 0 tot 9.' },
            { id: 'tellerdubbel7segment', order: 6, name: 'Teller op een dubbel 7-segment display', href: 'TellerOpDubbel7SegmentDisplay.html', checklistDriven: true, difficulty: 3, time: '~60 min', blurb: 'Twee displays delen zeven pinnen, en de stroom van één cijfer is te groot voor een uitgangspin. Je lost dat op met multiplexing en een transistor die je zelf dimensioneert.' }
        ]
    },
    labo2: {
        labId: 'labo2',
        labTitle: 'Labo 2',
        exercises: [
            { id: 'potentiometeruitlezen', order: 1, name: 'Potentiometer uitlezen', href: 'PotentiometerUitlezen.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Lees een potentiometer in met analogRead() en stuur de waarde via seriële communicatie naar de PC.' },
            { id: 'leddimmen', order: 2, name: 'Led dimmen', href: 'LedDimmen.html', checklistDriven: true, difficulty: 1, time: '~15 min', blurb: 'Laat een led met analogWrite() langzaam van gedoofd naar volle sterkte gaan en terug.' },
            { id: 'leddimmenmetpotentiometer', order: 3, name: 'Led dimmen met potentiometer', href: 'LedDimmenMetPotentiometer.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Combineer analogRead() en analogWrite() tot een dimmer: de stand van de potentiometer bepaalt de helderheid van de led.' },
            { id: 'dimmermetschakelaar', order: 4, name: 'Dimmer met schakelaar', href: 'DimmerMetSchakelaar.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Voeg een schakelaar toe aan je dimmer, zodat je de gedimde led ook helemaal aan en uit kan zetten.' },
            { id: 'ldrlichtmeting', order: 5, name: 'LDR: lichtmeting', href: 'LdrLichtmeting.html', checklistDriven: true, difficulty: 2, time: '~25 min', blurb: 'Meet licht met een LDR in een spanningsdeler en laat de led feller branden naarmate het donkerder wordt.' },
            { id: 'nachtlampmettijd', order: 6, name: 'Nachtlamp met tijd', href: 'NachtlampMetTijd.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Schakel de led in zodra het donker wordt en na 10 seconden weer uit, met millis() in plaats van delay().' },
            { id: 'temperatuursensortmp36', order: 7, name: 'Temperatuursensor TMP36', href: 'TemperatuursensorTMP36.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Lees de TMP36 uit, reken de spanning om naar graden Celsius en toon de temperatuur in de seriële monitor.' },
            { id: 'temperatuursensorlm35', order: 8, name: 'Temperatuursensor LM35', href: 'TemperatuursensorLM35.html', checklistDriven: true, difficulty: 2, time: '~20 min', blurb: 'Doe hetzelfde met de LM35 uit je starterkit, die de spanning anders omrekent dan de TMP36.' },
            { id: 'temperatuurindicatorrgbled', order: 9, name: 'Temperatuurindicator met RGB-led', href: 'TemperatuurindicatorMetRGBLed.html', checklistDriven: true, difficulty: 3, time: '~35 min', blurb: 'Duid met een RGB-led aan of de gemeten temperatuur te hoog, goed of te laag is.' },
            { id: 'thermometerop7segment', order: 10, name: 'Thermometer op 7-segment display', href: 'ThermometerOp7Segment.html', checklistDriven: true, difficulty: 3, time: '~45 min', blurb: 'Toon de temperatuur van -9 tot 99 graden op het dubbele 7-segment display, met multiplexing.' }
        ]
    },
    labo3: {
        labId: 'labo3',
        labTitle: 'Labo 3',
        exercises: [
            { id: 'enkel7segment', order: 1, name: '1x 7 segment display', href: 'Enkel7SegmentDisplay.html', checklistDriven: true, difficulty: 2, time: '~40 min', blurb: 'Stuur een 7-segment display aan met een 74HC595 schuifregister en tel af van 3 naar 1.' },
            { id: 'dubbel7segment', order: 2, name: '2x 7 segment display', href: 'Dubbel7SegmentDisplay.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Plaats twee schuifregisters in cascade en tel af van 10 naar 0 op twee displays.' },
            { id: 'looplicht8bit', order: 3, name: '8-bit looplicht', href: 'Looplicht8Bit.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Laat één led over acht uitgangen van het schuifregister wandelen, met een lus in plaats van een sequentie.' },
            { id: 'looplicht16bit', order: 4, name: '16-bit looplicht', href: 'Looplicht16Bit.html', checklistDriven: true, difficulty: 3, time: '~20 min', blurb: 'Breid je looplicht uit naar 16 leds met een tweede schuifregister in cascade.' },
            { id: 'ledbarmetpotentiometer', order: 5, name: 'Ledbar met potentiometer', href: 'LedbarMetPotentiometer.html', checklistDriven: true, difficulty: 3, time: '~30 min', blurb: 'Laat de stand van een potentiometer bepalen hoeveel leds van de ledbar oplichten.' },
            { id: 'lichtpatronenuitarray', order: 6, name: 'Lichtpatronen uit een array', href: 'LichtpatronenUitEenArray.html', checklistDriven: true, difficulty: 3, time: '~45 min', blurb: 'Doorloop drie patronen uit een multidimensionele array, met de potentiometer als snelheidsregelaar.' }
        ]
    },
    labo4: {
        labId: 'labo4',
        labTitle: 'Labo 4',
        exercises: [
            { id: 'ledsaansturen', order: 1, name: 'Leds aansturen met de PCF8574', href: 'LedsAansturen.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Bouw je eerste I²C-schakeling, zoek het adres van je PCF8574 en laat er twee leds afwisselend op branden.' },
            { id: 'drukknoppeninlezen', order: 2, name: 'Drukknoppen inlezen via de PCF8574', href: 'DrukknoppenInlezen.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Lees twee drukknoppen in via de I/O-expander en meld op de seriële monitor elke keer dat er eentje verandert.' },
            { id: 'tekstopi2clcd', order: 3, name: 'Tekst op een I²C LCD display', href: 'TekstOpI2CLcd.html', checklistDriven: true, difficulty: 2, time: '~25 min', blurb: 'Schrijf twee regels tekst naar een LCD-module die via een PCF8574 aan de I2C-bus hangt.' },
            { id: 'vollopermetdrukknoppen', order: 4, name: 'Volloper met twee drukknoppen', href: 'VolloperMetDrukknoppen.html', checklistDriven: true, difficulty: 3, time: '~45 min', blurb: 'Laat vier leds op de expander vollopen vanaf de ene of de andere kant, afhankelijk van welke knop je indrukt.' },
            { id: 'tellermeti2cdrukknoppen', order: 5, name: 'Teller met I²C-drukknoppen', href: 'TellerMetI2CDrukknoppen.html', checklistDriven: true, difficulty: 3, time: '~60 min', blurb: 'Combineer twee schuifregisters en een I/O-expander tot een teller van 0 tot 99 die je kan op- en aftellen en pauzeren.' }
        ]
    },
    labo5: {
        labId: 'labo5',
        labTitle: 'Labo 5',
        exercises: [
            { id: 'servometpotentiometer', order: 1, name: 'Servo besturen met een potentiometer', href: 'ServoMetPotentiometer.html', checklistDriven: true, difficulty: 1, time: '~20 min', blurb: 'Je eerste motor: laat de as van een servo meedraaien met de stand van een potentiometer.' },
            { id: 'dcmotormettransistor', order: 2, name: 'DC motor regelen met een transistor', href: 'DCMotorMetTransistor.html', checklistDriven: true, difficulty: 2, time: '~45 min', blurb: 'Bereken zelf de basisweerstand en schakel een motor die te veel stroom trekt voor een gewone uitgangspin.' },
            { id: 'draairichtingmetl293', order: 3, name: 'Draairichting omkeren met de L293D', href: 'DraairichtingMetL293.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Zet een H-brug in en laat dezelfde motor twee kanten op draaien, zonder één draad te verleggen.' },
            { id: 'snelheidenrichtingmetl293', order: 4, name: 'Zacht omkeren met de L293D', href: 'SnelheidEnRichtingMetL293.html', checklistDriven: true, difficulty: 3, time: '~35 min', blurb: 'Regel richting én snelheid met één potentiometer, zodat de motor afremt tot stilstand voor hij omkeert.' },
            { id: 'dcmotormetl298n', order: 5, name: 'Dezelfde motor op een L298N-module', href: 'DCMotorMetL298N.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Vervang de L293D door een krachtiger module en zoek in de datasheet uit welke pin met welke overeenkomt.' },
            { id: 'stappenmotorfullstep', order: 6, name: 'Stappenmotor laten draaien in full step', href: 'StappenmotorInFullStep.html', checklistDriven: true, difficulty: 2, time: '~45 min', blurb: 'Duw een stappenmotor stap voor stap rond met een stappentabel, en regel de snelheid met een potentiometer.' },
            { id: 'stappenmotorhalfstep', order: 7, name: 'Wisselen tussen full step en half step', href: 'StappenmotorInHalfStep.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Verdubbel het aantal stappen per omwenteling door twee spoelen tegelijk te bekrachtigen, met een schuifschakelaar ertussen.' },
            { id: 'stappenmotorrichtingmetdrukknop', order: 8, name: 'Stappenmotor van richting doen keren met een drukknop', href: 'StappenmotorRichtingMetDrukknop.html', checklistDriven: true, difficulty: 3, time: '~40 min', blurb: 'Loop je stappentabel achterstevoren af, en laat een ontdenderde drukknop de richting omkeren als een eindeloopschakelaar.' },
            { id: 'rolluikmetldr', order: 9, name: 'Automatisch rolluik met LDR en eindeloopschakelaars', href: 'RolluikMetLdrEnEindeloopschakelaars.html', checklistDriven: true, difficulty: 3, time: '~90 min', blurb: 'Breng LDR, LCD en H-brug samen tot een rolluik dat zichzelf stuurt, met hysteresis tegen oscilleren en verbreekcontacten tegen draadbreuk.' }
        ]
    },
    labo6: {
        labId: 'labo6',
        labTitle: 'Labo 6',
        exercises: [
            { id: 'ledvanuitmonitor', order: 1, name: 'Led schakelen vanuit de seriële monitor', href: 'LedSchakelenVanuitDeMonitor.html', checklistDriven: true, difficulty: 1, time: '~20 min', blurb: 'Typ een 1 of een 0 in de monitor en schakel er een led mee. Voor het eerst stuur jij iets naar de Arduino in plaats van omgekeerd.' },
            { id: 'getalnaartweedearduino', order: 2, name: 'Een getal doorsturen naar een tweede Arduino', href: 'GetalNaarTweedeArduino.html', checklistDriven: true, difficulty: 1, time: '~25 min', blurb: 'Kruis Tx en Rx, leg een gemeenschappelijke massa, en ontdek welke vijf bytes er echt over de draad gaan als je 100 verstuurt.' },
            { id: 'drukknophierleddaar', order: 3, name: 'Een drukknop hier, een led daar', href: 'DrukknopHierLedDaar.html', checklistDriven: true, difficulty: 2, time: '~25 min', blurb: 'Laat de ene Arduino de andere een opdracht geven, en stuur alleen iets door wanneer de knop echt van stand verandert.' },
            { id: 'potentiometerdoorsturen', order: 4, name: 'Een potentiometerwaarde doorsturen en dimmen', href: 'PotentiometerwaardeDoorsturen.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Stuur een meting in plaats van een commando, en ondervind waarom je niet sneller mag zenden dan de lijn aankan.' },
            { id: 'driegetallenoptellen', order: 5, name: 'Drie getallen doorsturen en optellen', href: 'DrieGetallenOptellen.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Meerdere waarden na elkaar over dezelfde lijn, en een reset halverwege die laat zien hoe een ontvanger het spoor bijster raakt.' },
            { id: 'boodschappenmetsleutel', order: 6, name: 'Drie soorten boodschappen uit elkaar houden', href: 'BoodschappenMetEenSleutel.html', checklistDriven: true, difficulty: 2, time: '~35 min', blurb: 'Zet een sleutel voor elke waarde en splits op de dubbelepunt, zodat je ontvanger van elke boodschap weet wat ze voorstelt.' },
            { id: 'weerstationoplcd', order: 7, name: 'Weerstation op het LCD', href: 'WeerstationOpLcd.html', checklistDriven: true, difficulty: 3, time: '~45 min', blurb: 'Breng het LCD uit labo 4 samen met je seriële weerstation, en zorg dat er geen letters van de vorige boodschap blijven staan.' },
            { id: 'arduinovanafpc', order: 8, name: 'De Arduino aansturen vanaf je pc', href: 'ArduinoAansturenVanafPc.html', checklistDriven: true, difficulty: 3, time: '~60 min', blurb: 'Op echte hardware: een C#-programma op je pc schakelt je led en vraagt je sensorwaarde op, in dezelfde taal als je twee Arduino\'s onderling spreken.' }
        ]
    },
    labo7: {
        labId: 'labo7',
        labTitle: 'Labo 7',
        exercises: [
            { id: 'ledaanmetinterrupt', order: 1, name: 'Een led die aangaat zonder loop', href: 'LedAanMetEenInterrupt.html', checklistDriven: true, difficulty: 1, time: '~20 min', blurb: 'Je eerste interrupt. Je loop blijft helemaal leeg en toch reageert je led op de knop.' },
            { id: 'drukkentellen', order: 2, name: 'Drukken tellen zonder dender', href: 'DrukkenTellenZonderDender.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Eén druk die als zeven telt, en de vergrendeling die dat oplost. Ontdek meteen waarom je nooit iets print vanuit een ISR.' },
            { id: 'looplichtmetnoodstop', order: 3, name: 'Noodstop op je looplicht', href: 'LooplichtMetNoodstop.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Het looplicht uit labo 1 krijgt een noodknop die werkt terwijl je programma in een delay zit.' },
            { id: 'motormetnoodstop', order: 4, name: 'Motor met een echte noodstop', href: 'MotorMetNoodstop.html', checklistDriven: true, difficulty: 2, time: '~35 min', blurb: 'Je transistorschakeling uit labo 5, tien seconden draaitijd, en een noodstop die niet mag wachten tot de delay voorbij is.' },
            { id: 'knoppenoppcf8574', order: 5, name: 'De PCF8574 laat van zich horen', href: 'KnoppenOpDePCF8574.html', checklistDriven: true, difficulty: 2, time: '~35 min', blurb: 'De /INT-pin van je I/O-expander wekt de Arduino, en je leert waarom je in een ISR geen enkele I&sup2;C-opdracht mag geven.' },
            { id: 'vierknoppentweeleds', order: 6, name: 'Vier knoppen, twee leds', href: 'VierKnoppenTweeLeds.html', checklistDriven: true, difficulty: 2, time: '~30 min', blurb: 'Eén byte binnen, vier knoppen eruit. Maskeren en flanken detecteren, want de expander meldt ook het loslaten.' },
            { id: 'ledsopdeexpander', order: 7, name: 'Leds op de expander zelf', href: 'LedsOpDeExpander.html', checklistDriven: true, difficulty: 3, time: '~40 min', blurb: 'Vier knoppen en vier leds op één chip, actief laag geschakeld, en een valstrik waardoor je knoppen voorgoed ingedrukt lijken.' },
            { id: 'noodstopoverserieel', order: 8, name: 'Noodstop over de seri&euml;le lijn', href: 'NoodstopOverDeSerieleLijn.html', checklistDriven: true, difficulty: 3, time: '~40 min', blurb: 'De noodknop zit op de ene Arduino, de machine op de andere. Je ontdekt dat een interrupt niets oplost zolang de ontvanger in een delay zit.' }
        ]
    }
};
