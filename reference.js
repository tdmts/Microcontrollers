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
                    { id: 'hardensoftware', name: 'Hard- en software', href: 'HardEnSoftware.html', blurb: 'Overzicht van de hardware (Arduino-kit) en software (Arduino IDE, TinkerCAD) die je nodig hebt.' },
                    { id: 'setuploop', name: 'Setup en loop', href: 'SetupLoop.html', blurb: 'Een Arduino-programma bestaat altijd uit twee functies: setup en loop.' },
                    { id: 'programmauploaden', name: 'Een programma uploaden', href: 'ProgrammaUploaden.html', blurb: 'Stap voor stap een sketch verifiëren en uploaden naar de Arduino.' }
                ]
            },
            {
                name: 'Programmeerconcepten',
                topics: [
                    { id: 'constantenvariabelen', name: 'Constanten, variabelen en gegevenstypes', href: 'ConstantenVariabelenGegevenstypes.html', blurb: 'Het verschil tussen constanten en variabelen, en de courante gegevenstypes in Arduino.' },
                    { id: 'wiskundigeoperatoren', name: 'Wiskundige operatoren', href: 'WiskundigeOperatoren.html', blurb: 'Met wiskundige operatoren kan je berekeningen uitvoeren op variabelen en constanten.' },
                    { id: 'selecties', name: 'Selecties', href: 'Selecties.html', blurb: 'Een keuze maken in je programma op basis van een voorwaarde die herleidt tot true of false.' },
                    { id: 'iteraties', name: 'Iteraties', href: 'Iteraties.html', blurb: 'De for-, while- en do-while-lus om een stuk code herhaaldelijk uit te voeren.' },
                    { id: 'functiesparameters', name: 'Functies en parameters', href: 'FunctiesParameters.html', blurb: 'Een functie is een stukje code dat een bepaalde taak uitvoert en dat je kan hergebruiken.' }
                ]
            },
            {
                name: 'I/O & signalen',
                topics: [
                    { id: 'pinmode', name: 'pinMode()', href: 'pinMode.html', blurb: 'De verschillende manieren waarop een pin als input of output gebruikt kan worden.' },
                    { id: 'digitalreadwrite', name: 'digitalRead / digitalWrite', href: 'digitalReadDigitalWrite.html', blurb: 'Met digitalRead() en digitalWrite() bedien je de digitale ingangen en uitgangen van de Arduino.' },
                    { id: 'pullup-pulldown', name: 'Pull up en pull down weerstanden', href: 'PullUpPullDown.html', blurb: 'Dieper ingaan op het uitlezen van knoppen via pull-up- en pull-downweerstanden.' },
                    { id: 'sourcensinken', name: 'Sourcen en sinken', href: 'SourcenSinken.html', blurb: 'Het verschil tussen een pin die stroom sourcet (levert) of sinkt (opneemt).' },
                    { id: 'wetvanohm', name: 'De wet van Ohm', href: 'WetVanOhm.html', blurb: 'Het verband tussen spanning, stroom en weerstand, en hoe je daarmee de voorschakelweerstand van een led berekent.' }
                ]
            },
            {
                name: 'Debuggen & robuustheid',
                topics: [
                    { id: 'debouncen', name: 'Debouncen', href: 'Debouncen.html', blurb: 'Hoe je het bouncen van een mechanische schakelaar softwarematig opvangt.' },
                    { id: 'debuggen', name: 'Debuggen', href: 'Debuggen.html', blurb: 'Seriële communicatie gebruiken om te zien wat er in je programma gebeurt, want er is geen scherm of debugger.' }
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
                    { id: 'map', name: 'map()', href: 'map.html', blurb: 'Een waarde uit een bereik herschalen naar een ander bereik.' }
                ]
            },
            {
                name: 'Datasheets',
                topics: [
                    { id: 'datasheettmp36', name: 'TMP35 / TMP36 / TMP37', href: '../../datasheets/tmp35-36-37.pdf', blurb: 'De datasheet van de temperatuursensor. Hierin vind je de schaalfactor van 10 mV per graad en de 750 mV bij 25 graden waarmee je de spanning omrekent.' },
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
    }
};
