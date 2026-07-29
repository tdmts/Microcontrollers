/* Single source of truth for every lab's reference topics, keyed by labId.
   Read by each LaboN/Reference/reference.html (via initReferenceHub) -- add new
   reference topics here only.

   Categories are always shown in full (no accordion/collapse); "order" is
   simply the array order within a category, so reorder by moving entries. */
window.LAB_REFERENCE = {
    labo0: {
        labId: 'labo0',
        labTitle: 'Labo 0',
        categories: [
            {
                name: 'Basisbegrippen',
                topics: [
                    { id: 'watiseenmicrocontroller', name: 'Wat is een microcontroller?', href: 'WatIsEenMicrocontroller.html', blurb: 'Een computer op één chip: waarin hij verschilt van de pc waarop je programmeert, en van een PLC of Siemens LOGO.' },
                    { id: 'hardensoftware', name: 'Hard- en software', href: 'HardEnSoftware.html', blurb: 'Overzicht van de hardware (Arduino-kit) en software (Arduino IDE, TinkerCAD) die je nodig hebt.' },
                    { id: 'setuploop', name: 'Setup en loop', href: 'SetupLoop.html', blurb: 'Een Arduino-programma bestaat altijd uit twee functies: setup en loop.' },
                    { id: 'programmauploaden', name: 'Een programma uploaden', href: 'ProgrammaUploaden.html', blurb: 'Stap voor stap je bord en poort kiezen, het voorbeeld Blink openen, verifiëren en uploaden naar de Arduino.' }
                ]
            },
            {
                name: 'Programmeerconcepten',
                topics: [
                    { id: 'spelregels', name: 'De spelregels van C++', href: 'SpelregelsVanCpp.html', blurb: 'De vormregels waar de compiler op staat: de puntkomma, de accolades, hoofdletters die meetellen, en waar je code hoort te staan.' },
                    { id: 'constantenvariabelen', name: 'Constanten, variabelen en gegevenstypes', href: 'ConstantenVariabelenGegevenstypes.html', blurb: 'Het verschil tussen constanten en variabelen, en de courante gegevenstypes in Arduino.' },
                    { id: 'wiskundigeoperatoren', name: 'Wiskundige operatoren', href: 'WiskundigeOperatoren.html', blurb: 'Met wiskundige operatoren kan je berekeningen uitvoeren op variabelen en constanten.' },
                    { id: 'selecties', name: 'Selecties', href: 'Selecties.html', blurb: 'Een keuze maken in je programma op basis van een voorwaarde die herleidt tot true of false.' },
                    { id: 'iteraties', name: 'Iteraties', href: 'Iteraties.html', blurb: 'De for-, while- en do-while-lus om een stuk code herhaaldelijk uit te voeren.' },
                    { id: 'functiesparameters', name: 'Functies en parameters', href: 'FunctiesParameters.html', blurb: 'Een functie is een stuk code dat een bepaalde taak uitvoert en dat je kan hergebruiken.' }
                ]
            },
            {
                name: 'I/O & signalen',
                topics: [
                    { id: 'pinmode', name: 'pinMode()', href: 'pinMode.html', blurb: 'De verschillende manieren waarop een pin als input of output gebruikt kan worden.' },
                    { id: 'digitalreadwrite', name: 'digitalRead / digitalWrite', href: 'digitalReadDigitalWrite.html', blurb: 'Met digitalRead() en digitalWrite() bedien je de digitale ingangen en uitgangen van de Arduino.' },
                    { id: 'pullup-pulldown', name: 'Pull up en pull down weerstanden', href: 'PullUpPullDown.html', blurb: 'Dieper ingaan op het uitlezen van knoppen via pull-up- en pull-downweerstanden.' },
                    { id: 'sourcensinken', name: 'Sourcen en sinken', href: 'SourcenSinken.html', blurb: 'Het verschil tussen een pin die stroom sourcet (levert) of sinkt (opneemt).' },
                    { id: 'wetvanohm', name: 'De wet van Ohm', href: 'WetVanOhm.html', blurb: 'Het verband tussen spanning, stroom en weerstand, en hoe je daarmee de voorschakelweerstand van een led berekent.' },
                    { id: 'impedantie', name: 'Weerstand en impedantie', href: 'Impedantie.html', blurb: 'Wat impedantie is, waarom ze in dit vak samenvalt met weerstand, en wat een hoog- of laagimpedante pin doet met de stroom.' }
                ]
            },
            {
                name: 'Debuggen & robuustheid',
                topics: [
                    { id: 'debouncen', name: 'Debouncen', href: 'Debouncen.html', blurb: 'Hoe je het denderen van een mechanische schakelaar softwarematig opvangt.' },
                    { id: 'debuggen', name: 'Debuggen', href: 'Debuggen.html', blurb: 'Seriële communicatie gebruiken om te zien wat er in je programma gebeurt, want er is geen scherm of debugger.' }
                ]
            }
        ]
    },
    labo1: {
        labId: 'labo1',
        labTitle: 'Labo 1',
        categories: [
            {
                name: 'Programmeerconcepten',
                topics: [
                    { id: 'arrays', name: 'Arrays', href: 'Arrays.html', blurb: 'Eén variabele met een hele rij waarden erin, hoe je die met een lus doorloopt, en de tweedimensionale vorm waarmee je cijferpatronen bijhoudt.' }
                ]
            },
            {
                name: 'Displays',
                topics: [
                    { id: 'zevensegment', name: 'Het 7-segment display', href: 'ZevenSegmentDisplay.html', blurb: 'De segmenten a tot g, het verschil tussen common anode en common cathode, en hoe een cijfer een patroon wordt.' },
                    { id: 'multiplexing', name: 'Multiplexing', href: 'Multiplexing.html', blurb: 'Twee cijfers tonen met de pinnen van één display door er zo snel tussen te wisselen dat je oog het verschil niet ziet.' }
                ]
            }
        ]
    },
    labo2: {
        labId: 'labo2',
        labTitle: 'Labo 2',
        categories: [
            {
                name: 'Analoge in- en uitgangen',
                topics: [
                    { id: 'analogread', name: 'analogRead()', href: 'analogRead.html', blurb: 'Analoge spanningen inlezen op de analoge pinnen en omzetten naar een waarde tussen 0 en 1023.' },
                    { id: 'analogwrite', name: 'analogWrite()', href: 'analogWrite.html', blurb: 'Met PWM een pin een waarde tussen volledig uit en volledig aan geven, bijvoorbeeld om een led te dimmen.' },
                    { id: 'map', name: 'map()', href: 'map.html', blurb: 'Een waarde uit een bereik herschalen naar een ander bereik.' },
                    { id: 'spanningsdeler', name: 'De spanningsdeler', href: 'Spanningsdeler.html', blurb: 'Waarom je een weerstandssensor altijd met een tweede weerstand uitleest, de formule erachter, en hoe je die vaste weerstand kiest.' }
                ]
            },
            {
                name: 'Datasheets',
                topics: [
                    { id: 'datasheettmp36', name: 'TMP35 / TMP36 / TMP37', href: '../../datasheets/tmp35-36-37.pdf', blurb: 'De datasheet van de temperatuursensor. Hierin vind je de schaalfactor van 10 mV per graad en de 750 mV bij 25 graden waarmee je de spanning omrekent.' },
                    { id: 'datasheetlm35', name: 'LM35', href: '../../datasheets/lm35.pdf', blurb: 'De datasheet van de temperatuursensor uit je starterkit. Hierin vind je dat de uitgang 0 V geeft bij 0 graden en 10 mV per graad stijgt, anders dan bij de TMP36.' },
                    { id: 'datasheetldr', name: 'LDR 3190', href: '../../datasheets/ldr-3190.pdf', blurb: 'De datasheet van de lichtgevoelige weerstand, met de weerstandswaarde bij verschillende lichtsterktes.' }
                ]
            }
        ]
    },
    labo3: {
        labId: 'labo3',
        labTitle: 'Labo 3',
        categories: [
            {
                name: 'Schuifregisters',
                topics: [
                    { id: 'schuifregister', name: 'Werking van het schuifregister', href: 'Schuifregister.html', blurb: 'Hoe de 74HC595 met vier ingangssignalen acht uitgangen aanstuurt, met een interactieve simulatie om zelf uit te proberen.' }
                ]
            },
            {
                name: 'Datasheets',
                topics: [
                    { id: 'datasheet74hc595', name: '74HC595 / 74HCT595', href: '../../datasheets/74hc595.pdf', blurb: 'De volledige datasheet van het schuifregister. Kijk vooral naar pinning information, functional description en limiting values.' }
                ]
            }
        ]
    },
    labo4: {
        labId: 'labo4',
        labTitle: 'Labo 4',
        categories: [
            {
                name: 'Bits en bytes',
                topics: [
                    { id: 'bits', name: 'Werken met bits', href: 'Bits.html', blurb: 'Binaire notatie, maskeren met &, en de operatoren ~ en << waarmee je één pin aanspreekt terwijl je altijd een hele byte schrijft.' }
                ]
            },
            {
                name: 'I²C en de PCF8574',
                topics: [
                    { id: 'bibliotheken', name: 'Bibliotheken gebruiken', href: 'Bibliotheken.html', blurb: 'Hoe je een bibliotheek toevoegt aan je sketch en hoe je terugvindt welke functies ze aanbiedt, met Wire als voorbeeld.' },
                    { id: 'pcf8574', name: 'Werken met de PCF8574', href: 'PCF8574.html', blurb: 'De aansluitingen van de I/O-expander, hoe A0, A1 en A2 het adres bepalen, en hoe je met Wire naar de chip schrijft en ervan leest.' },
                    { id: 'i2cadres', name: 'Het I²C adres vinden', href: 'I2CAdres.html', blurb: 'De I2C scanner loopt alle adressen af en toont welke chips er op de bus hangen. Handig als je niet zeker bent van je bedrading.' }
                ]
            },
            {
                name: 'Datasheets',
                topics: [
                    { id: 'datasheetpcf8574', name: 'PCF8574', href: '../../datasheets/datasheet-pcf8574.pdf', blurb: 'De datasheet van de I/O-expander. Kijk vooral naar de pinout, de quasi-bidirectionele I/O en hoeveel stroom een uitgang kan leveren of opnemen.' }
                ]
            }
        ]
    },
    labo5: {
        labId: 'labo5',
        labTitle: 'Labo 5',
        categories: [
            {
                name: 'Soorten motoren',
                topics: [
                    { id: 'servo', name: 'De servomotor', href: 'Servo.html', blurb: 'Een motor die een hoek aanneemt in plaats van rond te draaien, met de Servo-bibliotheek en de pulsen waar ze op draait.' },
                    { id: 'dcmotor', name: 'De DC motor', href: 'DCMotor.html', blurb: 'De eenvoudigste motor die er is. Spanning erop en hij draait, en waarom je hem nooit rechtstreeks aan een uitgangspin hangt.' },
                    { id: 'stappenmotor', name: 'De stappenmotor', href: 'Stappenmotor.html', blurb: 'Een motor die je stap voor stap voortduwt en dus zijn positie kent, met de stappentabellen voor full step en half step.' }
                ]
            },
            {
                name: 'Een motor aansturen',
                topics: [
                    { id: 'transistor', name: 'De transistor als schakelaar', href: 'TransistorAlsSchakelaar.html', blurb: 'Een kleine stroom uit je pin die een grote stroom schakelt, hoe je de basisweerstand berekent, en waarom er een vrijloopdiode over de motor hoort.' },
                    { id: 'hbrug', name: 'De H-brug', href: 'HBrug.html', blurb: 'Vier schakelaars rond een motor, waarmee je de stroomrichting kiest. De pinout van de L293D en hoe de L298N-module daarmee overeenkomt.' }
                ]
            },
            {
                name: 'Datasheets',
                topics: [
                    { id: 'datasheetp2n2222a', name: 'P2N2222A (2N2222)', href: '../../datasheets/p2n2222a.pdf', blurb: 'De datasheet van de NPN-transistor. Hierin vind je de Vbe en de hFE die je nodig hebt om je basisweerstand te berekenen.' },
                    { id: 'datasheetl293d', name: 'L293D', href: '../../datasheets/l293d.pdf', blurb: 'De datasheet van de dubbele H-brug. Kijk vooral naar de pinout, de pinfuncties en hoeveel stroom één kanaal aankan.' }
                ]
            }
        ]
    },
    labo6: {
        labId: 'labo6',
        labTitle: 'Labo 6',
        categories: [
            {
                name: 'De seriële verbinding',
                topics: [
                    { id: 'serieelkanaal', name: 'Het seriële kanaal', href: 'SerieelKanaal.html', blurb: 'De drie draden tussen twee Arduino\'s, waarom Tx en Rx gekruist moeten, dat het pin 0 en 1 zijn, en waarom je ze op echte hardware moet vrijmaken om te uploaden.' }
                ]
            },
            {
                name: 'Gegevens over de lijn',
                topics: [
                    { id: 'tekensengetallen', name: 'Tekens en getallen', href: 'TekensEnGetallen.html', blurb: 'Waarom het getal 100 als drie tekens over de draad gaat, wat ASCII daarmee te maken heeft, en welke twee tekens println() er zelf achter zet.' },
                    { id: 'boodschappenlezen', name: 'Boodschappen lezen', href: 'BoodschappenLezen.html', blurb: 'De ontvangstbuffer, available() en read(), en hoe je met readStringUntil() een volledige boodschap tegelijk ophaalt.' },
                    { id: 'strings', name: 'Werken met een String', href: 'Strings.html', blurb: 'Tekst in een variabele: trim, indexOf, substring, toInt en toFloat, en de volledige aanpak om een boodschap van de vorm SLEUTEL:WAARDE uit elkaar te halen.' }
                ]
            },
            {
                name: 'Downloads',
                topics: [
                    { id: 'csharpproject', name: 'Serieel communiceren (C#-project)', href: '../../datasheets/serieel-communiceren-csharp.zip', blurb: 'Het Visual Studio-project waarmee je vanaf je pc met de Arduino praat. Je hebt het nodig voor de laatste oefening. Er zit een gebouwde versie in bin\\Debug.' }
                ]
            }
        ]
    },
    labo7: {
        labId: 'labo7',
        labTitle: 'Labo 7',
        categories: [
            {
                name: 'Onderbreken in plaats van wachten',
                topics: [
                    { id: 'polleneninterrupts', name: 'Van pollen naar interrupts', href: 'PollenEnInterrupts.html', blurb: 'Waarom een knop uitlezen in je loop je drukken doet missen zodra er iets anders moet gebeuren, en wat een interrupt daaraan verandert.' },
                    { id: 'interruptpinnen', name: 'attachInterrupt en de interruptpinnen', href: 'Interruptpinnen.html', blurb: 'Alleen pin 2 en pin 3 van je UNO kunnen dit. Hoe je een functie aan een pin koppelt, en wat het verschil is tussen RISING, FALLING en CHANGE.' }
                ]
            },
            {
                name: 'Werken met een ISR',
                topics: [
                    { id: 'interruptserviceroutine', name: 'De regels van een ISR', href: 'InterruptServiceRoutine.html', blurb: 'Wat je wel en niet mag doen in een interruptroutine. Waarom delay() blijft hangen, Wire je bord ophangt en Serial alles vertraagt.' },
                    { id: 'volatileenvlaggen', name: 'volatile en de vlagvariabele', href: 'VolatileEnVlaggen.html', blurb: 'Hoe je gegevens uit je ISR naar je loop krijgt zonder ze onderweg kwijt te spelen. Het vlagpatroon, en waarom een getal van vier bytes extra bescherming nodig heeft.' },
                    { id: 'denderenbijeeninterrupt', name: 'Denderen bij een interrupt', href: 'DenderenBijEenInterrupt.html', blurb: 'Eén druk op de knop roept je ISR tien keer op. Hoe je dat met een vergrendeling opvangt, en waarom je het in TinkerCAD niet ziet gebeuren.' }
                ]
            },
            {
                name: 'Datasheets',
                topics: [
                    { id: 'datasheetpcf8574', name: 'PCF8574', href: '../../datasheets/datasheet-pcf8574.pdf', blurb: 'De datasheet van de I/O-expander. Kijk hier naar de /INT-pin, want die is een open-collectoruitgang, en dat bepaalt hoe je hem aansluit.' }
                ]
            }
        ]
    }
};
