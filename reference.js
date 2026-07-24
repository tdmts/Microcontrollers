/* Single source of truth for every lab's reference topics, keyed by labId.
   Read by each LaboN/Reference/index.html (via initReferenceHub) -- add new
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
                    { id: 'sourcensinken', name: 'Sourcen en sinken', href: 'SourcenSinken.html', blurb: 'Het verschil tussen een pin die stroom sourcet (levert) of sinkt (opneemt).' }
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
    }
};
