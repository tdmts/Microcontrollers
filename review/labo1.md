# Review labo 1 | studentbril

Laatste ronde: 2026-07-26. Gelezen: alle zeven oefeningen in volgorde. Labo 1 had op dat
moment geen enkele referentiepagina, zie L1-04.

Na deze ronde telt labo 1 acht oefeningen in plaats van zeven, en heeft het een eigen
`Reference/`-map met drie pagina's. De 7-segmentreeks is opnieuw opgebouwd, zie L1-06.

## Herstructurering 2026-07-31 (geen reviewronde)

Dit is geen studentbril-ronde maar een structurele ingreep op vraag van de gebruiker: labo 1
telde negen oefeningen en vier daarvan overlapten elkaar. Labo 1 telt er nu **zes**, en de
`Reference/`-map vier pagina's. Wat er veranderde:

- De vier 7-segmentoefeningen zijn er twee geworden:
  `TellerOp7SegmentDisplay.html` (8-animatie + teller op &eacute;&eacute;n display) en
  `TellerOpDubbel7SegmentDisplay.html` (transistor + multiplexing + teller op twee displays).
  De opbouw van L1-06 blijft, maar per deel binnen een pagina in plaats van per kaart, elk
  met een eigen tussenoplossing en een eigen blok in de checklist. Zie de aanvulling bij L1-06.
- De losse oefening `DrieLedsMetTransistor.html` is geschrapt. Het uitgewerkte voorbeeld van
  de drie leds blijft staan op [Vermogen schakelen](../Labo1/Reference/VermogenSchakelen.html);
  de student past de berekening nu zelf toe op het dubbele display, waar het stroomprobleem
  echt bestaat. Daarmee vervangt een transistor per display de 74HC14 uit het oude
  TinkerCAD-sjabloon, die nergens uitgelegd werd en zelf maar ~25 mA mag voeren.
- Woordafspraak, voortaan repo-breed: een **display** is &eacute;&eacute;n 7-segment display,
  een **segment** is &eacute;&eacute;n led daarin, een **cijfer** is de waarde 0 tot en met 9.
  De oude code gebruikte `cijfer` voor allebei (`cijferKiesPin` naast `toonCijfer(links)`).
  `displayPins` en `kiesDisplay()` vervangen `cijferKiesPin` en `CIJFER_LINKS`.
- De 7-segmentoefeningen gaan voortaan uit van een **common cathode** display: de
  gemeenschappelijke pin aan de GND, een segment brandt bij `HIGH`. De constante
  `SEGMENT_AAN` is daarmee verdwenen uit de vier sketches die haar gebruikten (de twee
  oplossingen van `TellerOp7SegmentDisplay.html`, de twee van
  `TellerOpDubbel7SegmentDisplay.html` en die van
  `Labo2/Exercises/ThermometerOp7Segment.html`), die schrijven nu rechtstreeks `HIGH`/`LOW`.
  Zie de aanvulling bij L1-07.
- De vijf oude ids zijn vervallen en vervangen door `teller7segment` en
  `tellerdubbel7segment`. Zelfde afweging als in L1-06: de checklists zijn inhoudelijk
  veranderd en de opgeslagen vinkjes hangen aan hun index.

De historische bevindingen hieronder verwijzen naar pagina's die intussen verdwenen zijn.
Die links blijven staan zoals ze waren: ze beschrijven de toestand op het moment van de
bevinding.

Voorkennis waarvan deze ronde vertrekt: labo 0 in zijn gecorrigeerde vorm. De student kent
setup/loop, uploaden, constanten en variabelen met hun types, rekenkundige operatoren, de
wet van Ohm, selecties, iteraties (for, while, do-while), eigen functies met parameters,
`pinMode`, `digitalRead`/`digitalWrite`, pull-up en pull-down, sourcen en sinken,
debouncen, seri&euml;le debug-uitvoer en `millis()`. Hij heeft Blink gedraaid en de
begeleide oefening gebouwd, waarin een led volgens **sourcing** hangt: `HIGH` laat hem
branden.

Onderzocht en g&eacute;&eacute;n bevinding:

- **De vraag "sourcing of sinking?" in Looplicht** ziet er op het eerste gezicht uit als
  een ontbrekende uitleg, maar is duidelijk met opzet gesteld: de opgave vraagt de student
  er zelf over te redeneren en de oplossing geeft het antwoord. Dat is dezelfde
  didactische vorm als de denkstappen in de begeleide oefening van labo 0. Alleen het
  ontbrekende schema is wel een bevinding, zie L1-05.
- **De verwijzing naar "een List uit de lessen Technisch programmeren (C#)"** op
  [7SegmentMetTeller.html:16](../Labo1/Exercises/7SegmentMetTeller.html#L16) veronderstelt
  een ander vak, maar dat is een zustervak van dezelfde opleiding en de zin legt daarna
  zelf uit wat een array is. Bruikbaar aanknopingspunt, geen gat.

---

## L1-01 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina's:** [Looplicht.html:58](../Labo1/Exercises/Looplicht.html#L58),
[KnightRider.html:61](../Labo1/Exercises/KnightRider.html#L61),
[RGBLed.html:82](../Labo1/Exercises/RGBLed.html#L82), tegenover
[7SegmentMetTeller.html:16](../Labo1/Exercises/7SegmentMetTeller.html#L16)

**Wat de student raakt:** arrays worden pas in oefening **5** uitgelegd, maar staan al in
de oplossing van oefening **2**. Looplicht en Knight rider openen met
`const int ledPins[] = {3, 4, 5, 6}` en indexeren erin; RGBLed gebruikt zelfs een
**tweedimensionale** array `const bool kleuren[7][3]` met `kleuren[i][0]`. In labo 0 komt
het woord array niet voor en staat geen enkele `[]`. De uitleg in oefening 5 komt dus drie
oefeningen te laat, en behandelt bovendien alleen de eendimensionale vorm, terwijl
oefening 4, 5 en 7 alle drie op de tweedimensionale steunen.

**Besluit (2026-07-26):** aanvaard, twee dingen samen. De uitleg staat nu op de nieuwe
referentiepagina [Arrays](../Labo1/Reference/Arrays.html), inclusief het stuk over
tweedimensionale arrays dat nergens bestond. En de oplossingen van Looplicht en Knight
rider gebruiken g&eacute;&eacute;n array meer: ze werken met vier benoemde constanten en een
functie `laatBranden(pin)` met een parameter, wat aansluit op de `blink()`-functie die de
student in labo 0 zelf gemaakt heeft. Daarmee is RGBLed (oefening 4) de eerste die een
array gebruikt, en die verwijst er nu naar voor hij hem nodig heeft.

Looplicht sluit af met een vooruitwijzing: vier keer dezelfde regel is omslachtig, en vanaf
RGBLed leer je dat inkorten. Zo is de herhaling een motivatie in plaats van een slordigheid.

**Status:** opgelost, 2026-07-26

---

## L1-02 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** [Dubbel7SegmentMetTeller.html](../Labo1/Exercises/Dubbel7SegmentMetTeller.html)

**Wat de student raakt:** de laatste en zwaarste oefening van het labo bestaat uit een
lead van twee zinnen en dan meteen de checklist. Er staat geen schema, geen video en geen
uitleg op de pagina. Multiplexing, het begrip waar de hele oefening om draait, wordt
uitsluitend b&iacute;nnen de oplossingsspoiler uitgelegd. Wie de oplossing niet opendoet,
heeft alleen "maak een 00 tot 99 teller door gebruik te maken van multiplexing, pin10
bepaalt welk van beide displays actief is" om mee te werken. Het is een concept dat de
student nergens eerder gezien heeft.

**Besluit (2026-07-26):** aanvaard. Multiplexing heeft nu een eigen pagina,
[Multiplexing](../Labo1/Reference/Multiplexing.html), met het probleem van de gedeelde
segmentpinnen, de persistentie van het netvlies en de valkuil van `delay()`. Daarnaast is
de oefening in twee&euml;n gesplitst, zie L1-06: multiplexing komt nu binnen in een eigen
oefening waar verder niets nieuws in zit.

**Status:** opgelost, 2026-07-26

---

## L1-03 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** [Morsecode.html:47](../Labo1/Exercises/Morsecode.html#L47)

**Wat de student raakt:** in de voorbeeldcode van de allereerste oefening van het labo
laat `digitalWrite(12, LOW)` de led branden en zet `digitalWrite(12, HIGH)` hem uit. In
labo 0 heeft de student net het omgekeerde geleerd en zelf gebouwd: de begeleide oefening
sluit de led volgens **sourcing** aan, waarbij `HIGH` hem doet branden, en laat hem daar in
stap 6 uitdrukkelijk over redeneren. Op deze pagina staat nergens dat de
TinkerCAD-schakeling actief laag is. De woorden sourcing, sinking en actief laag komen er
geen enkele keer in voor. De student ziet dus code die zichzelf lijkt tegen te spreken,
zonder aanknopingspunt.

**Besluit (2026-07-26):** aanvaard, optie 'er een denkvraag van maken'. Morsecode heeft
nu een sectie "Denk eens na over de niveaus" met een spoiler, in dezelfde vorm als de
denkstappen in de begeleide oefening van labo 0 en als de sourcing/sinking-vraag in
Looplicht. Het antwoord legt uit dat de schakeling sinking is, verwijst naar Sourcen en
sinken, en zegt erbij dat de student deze actief lage vorm nog vaak gaat tegenkomen.

**Status:** opgelost, 2026-07-26

---

## L1-04 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina:** het hele labo

**Wat de student raakt:** labo 1 heeft als enige labo **geen `Reference/`-map en geen
`labo1`-blok in `reference.js`**. Labo 0, 2, 3 en 4 hebben er allemaal een. Daardoor is er
in dit labo geen enkele plek waar theorie kan staan en kan geen enkele oefening ergens naar
verwijzen: zeven oefeningen bevatten samen niet &eacute;&eacute;n link naar een
referentiepagina, ook niet naar die van labo 0. Dat is de onderliggende reden waarom de
uitleg over arrays (L1-01) en multiplexing (L1-02) in een oefening of in een spoiler
terechtgekomen is in plaats van op een eigen pagina. Ook `back-link.js` heeft in dit labo
geen reference-hub om op terug te vallen.

**Besluit (2026-07-26):** aanvaard, optie 'hub met arrays, multiplexing én 7-segment'.
Er is nu een `Labo1/Reference/` met een hub en drie pagina's
([Arrays](../Labo1/Reference/Arrays.html),
[Het 7-segment display](../Labo1/Reference/ZevenSegmentDisplay.html),
[Multiplexing](../Labo1/Reference/Multiplexing.html)) en een `labo1`-blok in
`reference.js` met de categorie&euml;n Programmeerconcepten en Displays. Daarmee heeft elk
labo een reference-hub, kunnen de oefeningen ergens naar verwijzen, en heeft `back-link.js`
ook in dit labo een hub om op terug te vallen.

**Status:** opgelost, 2026-07-26

---

## L1-05 &middot; BEELD &middot; vertraagt &middot; open

**Pagina's:** [Looplicht.html](../Labo1/Exercises/Looplicht.html) en
[KnightRider.html](../Labo1/Exercises/KnightRider.html)

**Wat de student raakt:** beide oefeningen tonen hun schakeling uitsluitend in een
YouTube-video. Bij Looplicht wordt de student uitdrukkelijk gevraagd uit die video af te
leiden of het sourcing of sinking is. Bij Knight rider verandert de schakeling bovendien
stilzwijgend van sinking naar sourcing, en dat wordt pas in de oplossing gezegd ("anders
dan bij de Looplicht-oefening"). Wie de video niet kan bekijken, of hem overslaat, heeft
geen schakeling om mee te beginnen en geen manier om die verandering op te merken.

**Besluit (2026-07-26):** aanvaard, optie 'TODO-schema's inplannen'. Beide pagina's
hebben nu een `figure` met een `TODO-`bestandsnaam en een HTML-commentaar dat beschrijft
wat er getekend moet worden, inclusief de waarschuwing dat het verschil tussen de sinking-
en de sourcingbedrading uit de tekening moet blijken. `check-content.sh` meldt ze bij elke
run als niet-blokkerende waarschuwing.

**Aanvulling (2026-07-31):** de tekeningen bestaan intussen.
`img/looplicht-sinking-schema.png` en `img/knightrider-sourcing-schema.png` staan in beide
pagina's en tonen het verschil tussen de sinking- en de sourcingbedrading.

**Status:** opgelost, 2026-07-31

---

## L1-06 &middot; SPRONG &middot; vertraagt &middot; opgelost

**Pagina's:** [7SegmentMetTeller.html](../Labo1/Exercises/7SegmentMetTeller.html) (order 5,
difficulty 3) en [Dubbel7Segment.html:20](../Labo1/Exercises/Dubbel7Segment.html#L20)
(order 6, difficulty 2)

**Wat de student raakt:** oefening 6 zegt "Zoek eerst de layout en pinout op van een
7-segment display", terwijl oefening 5 die layout al toont en de segmenten a t/m g al
gebruikt heeft om cijferpatronen te bouwen. Oefening 6 lijkt dus geschreven om v&oacute;&oacute;r
oefening 5 te komen. De moeilijkheidsgraden zeggen hetzelfde: 3, dan 2, dan weer 3.

**Besluit (2026-07-26):** aanvaard, en breder aangepakt dan de bevinding zelf. De
7-segmentreeks is opnieuw opgebouwd zodat elke oefening precies &eacute;&eacute;n nieuw
ding binnenbrengt:

| Order | Oefening | Wat er nieuw is |
|---|---|---|
| 5 | 8-animatie op een 7-segment display (nieuw) | pinout uitzoeken, zelf vaststellen of het display common anode of cathode is, een rij pinnen doorlopen |
| 6 | 7 segment met teller (bestond al) | de cijferpatronentabel, dus de tweedimensionale array |
| 7 | Vast getal op een dubbel 7-segment display (nieuw) | multiplexing, en verder niets |
| 8 | Dubbel 7 segment met teller (bestond al) | niet-blokkerende timing met `millis()` |

De oude oefening 'Dubbel 7 segment' is vervangen door oefening 5: de 8-animatie loopt over
de segmenten van &eacute;&eacute;n cijfer en had nooit een dubbel display nodig. De
openingsstap 'laat eerst &eacute;&eacute;n segment oplichten' is overgenomen van
[Enkel7SegmentDisplay.html:22](../Labo3/Exercises/Enkel7SegmentDisplay.html#L22) in labo 3,
waar hij precies dient om te ontdekken welk type display je hebt.

De `id`-velden van de twee bestaande oefeningen zijn ongewijzigd gebleven. De twee nieuwe
oefeningen kregen nieuwe ids; de oude id `dubbel7segment` is verdwenen samen met zijn
pagina. Voortgang die studenten daarop hadden staan, vervalt dus, en dat is hier de juiste
keuze: de checklist van die oefening is inhoudelijk veranderd, en de opgeslagen
vinkjestoestand hangt aan de index binnen die checklist.

**Aanvulling (2026-07-31):** de reeks is teruggebracht van vier oefeningen naar twee, omdat
oefening 5 en 6 exact dezelfde schakeling gebruikten en 7 en 8 ~80% van hun oplossingscode
deelden. Het uitgangspunt van deze bevinding blijft overeind: elk nieuw ding komt nog altijd
apart binnen, maar als genummerd deel van een pagina.

| Pagina | Deel | Wat er nieuw is |
|---|---|---|
| Teller op een 7-segment display | 1 | pinout uitzoeken, common anode of cathode vaststellen, een rij pinnen doorlopen |
| | 2 | de 8-animatie |
| | 3 | de cijferpatronentabel, dus de tweedimensionale array |
| Teller op een dubbel 7-segment display | 1 | het stroomprobleem van veertien segmenten |
| | 2 | multiplexing |
| | 3 | een transistor per display, met de basisweerstand zelf berekend |
| | 4 | een vast getal stabiel houden |
| | 5 | niet-blokkerende timing met `millis()` |

Elk deel heeft een eigen tussenoplossing en een eigen blok in de checklist, dus de student
kan nog altijd per stap afvinken. Wat verdween, zijn de dashboardkaarten, niet de opbouw.

**Status:** opgelost, aangevuld 2026-07-31

---

## L1-07 &middot; BEELD &middot; vertraagt &middot; open

**Pagina's:** [Dubbel7Segment.html](../Labo1/Exercises/Dubbel7Segment.html) en
[Dubbel7SegmentMetTeller.html](../Labo1/Exercises/Dubbel7SegmentMetTeller.html)

**Wat de student raakt:** geen van beide pagina's toont de pinout van het dubbele display
of van het TinkerCAD-sjabloon waarnaar ze verwijzen. Het gevolg staat met zoveel woorden in
allebei de oplossingen: "de pinnummers hieronder zijn placeholders", en de student moet
zelf uitzoeken wat `SEGMENT_AAN` en `DIGIT_TIENTALLEN` moeten zijn. Een oplossing die
alleen uit placeholders bestaat, kan niet dienen om je eigen werk aan af te toetsen. Labo 3
doet dit wel:
[Enkel7SegmentDisplay.html:26](../Labo3/Exercises/Enkel7SegmentDisplay.html#L26) toont een
echte pinout-afbeelding.

**Besluit (2026-07-26):** uitgesteld op vraag van de gebruiker, niet verworpen. De
oplossingen van de twee dubbel-displayoefeningen bestaan nog altijd deels uit placeholders
omdat het pinout van het TinkerCAD-sjabloon nergens getoond wordt. Komt terug in een
volgende ronde.

**Besluit (2026-07-31):** aanvaard, optie 'TODO-figuur inplannen', dezelfde aanpak als bij
L1-05. De twee pagina's zijn er &eacute;&eacute;n geworden, en die heeft een `figure` met
`img/TODO-dubbel7segment-pinout.png` waar het pinout van het sjabloon hoort, plus twee
andere TODO-figuren voor het schema met de transistoren en voor de stroommeting. De
gebruiker maakt een nieuw TinkerCAD-sjabloon met een transistor per display en levert de
screenshots. De placeholders in de oplossing zijn intussen wel weg: `CIJFER_LINKS` bestaat
niet meer, want met een NPN onder elk display activeert een hoog niveau altijd dat display.
Wat er overblijft is `SEGMENT_AAN`, en dat is een echte eigenschap van jouw display in
plaats van een gat in de opgave.

**Aanvulling (2026-07-31):** die laatste zin geldt niet meer. Op vraag van de gebruiker
ligt het displaytype nu vast: beide teller-oefeningen gaan uit van een common cathode
display, met de gemeenschappelijke pin aan de GND en een segment dat brandt bij `HIGH`.
`SEGMENT_AAN` is daarmee uit alle sketches verdwenen. De student stelt het type niet meer
zelf vast; de eerste stap van `TellerOp7SegmentDisplay.html` dient nog om te controleren
welke Arduino-pin aan welk segment hangt. Het verschil tussen common anode en common
cathode blijft staan op
[ZevenSegmentDisplay.html](../Labo1/Reference/ZevenSegmentDisplay.html), waar de theorie
hoort. De oplossingen bevatten hiermee geen enkele placeholder meer.

**Status:** open, wacht op de tekeningen

---

## L1-08 &middot; OPDRACHT &middot; detail &middot; opgelost

**Pagina:** [Morsecode.html:44](../Labo1/Exercises/Morsecode.html#L44)

**Wat de student raakt:** de voorbeeldcode schrijft drie keer het kale getal 12
(`pinMode(12, OUTPUT)`, `digitalWrite(12, LOW)`, `digitalWrite(12, HIGH)`), terwijl stap 2
van de begeleide oefening in labo 0 er net een punt van maakte: "Door met een naam te
werken in plaats van het getal 2 blijft je code leesbaar en pas je het pinnummer later op
&eacute;&eacute;n plaats aan." De eerste voorbeeldcode die de student daarna ziet, doet het
omgekeerde.

**Besluit (2026-07-26):** aanvaard. `const int pinLed = 12;` staat nu bovenaan de
voorbeeldcode en de drie plaatsen gebruiken die naam.

**Status:** opgelost, 2026-07-26
