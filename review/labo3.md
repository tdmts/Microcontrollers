# Review labo 3 | studentbril

Laatste ronde: 2026-07-26. Gelezen: alle zes de oefeningen in volgorde, en
`Schuifregister.html`.

Voorkennis waarvan deze ronde vertrekt: labo 0, 1 en 2 in hun gecorrigeerde vorm. De
student kent digitale in- en uitgangen, sourcen en sinken, de wet van Ohm, selecties,
iteraties, functies met parameters, `millis()`, arrays (ook tweedimensionaal, inclusief
`sizeof`), het 7-segment display met common anode en cathode, multiplexing, `analogRead`,
`analogWrite`, `map()` en de spanningsdeler.

**Dit is het best opgebouwde labo van de vijf.** Dat hoort ook in een eerlijke review te
staan. [Enkel7SegmentDisplay.html](../Labo3/Exercises/Enkel7SegmentDisplay.html) is het
model waar de andere labo's naartoe zouden moeten: het linkt zijn theoriepagina in een
tipbox nog voor de eerste stap, het linkt de datasheet twee keer met de naam van het
hoofdstuk erbij, het toont een echt aansluitschema en een pinout, en het laat de student de
voorschakelweerstand zelf berekenen uit de *limiting values*. Bij de andere labo's zijn de
zwaarste bevindingen telkens precies de dingen die deze pagina w&eacute;l goed doet.
[Schuifregister.html](../Labo3/Reference/Schuifregister.html) heeft bovendien een werkende
interactieve simulatie van de drie registers, waarmee de student de schuifvolgorde zelf kan
uitproberen voor hij iets bedraadt.

Onderzocht en g&eacute;&eacute;n bevinding:

- **Oefening 5 en 6 tonen geen aansluitschema**, maar beschrijven de bedrading wel in
  woorden en hergebruiken de schakeling van de vorige oefeningen, die w&eacute;l een schema
  hebben. Anders dan in labo 1 en 2 staat de student hier dus niet met lege handen.
- **De volgorde en de moeilijkheidsopbouw** kloppen: &eacute;&eacute;n segment, dan een
  cijfer, dan cascade, dan het looplicht, dan een berekening, dan een universeel programma.
  Elke stap voegt precies &eacute;&eacute;n ding toe. Dat is de opbouw die labo 1 na deze
  ronde ook gekregen heeft.

---

## L3-01 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina's:** [Dubbel7SegmentDisplay.html](../Labo3/Exercises/Dubbel7SegmentDisplay.html),
[Looplicht8Bit.html](../Labo3/Exercises/Looplicht8Bit.html) en
[Looplicht16Bit.html](../Labo3/Exercises/Looplicht16Bit.html)

**Wat de student raakt:** oefening 1 linkt zijn theoriepagina voorbeeldig, maar oefening 2,
3 en 4 linken helemaal niets, ook niet naar
[Schuifregister.html](../Labo3/Reference/Schuifregister.html). Alle drie steunen ze
nochtans rechtstreeks op wat daar staat: `risingEdge()`, de regel dat de laatst
ingeschoven bit op Q0 belandt, en bij de cascade de functie van Q7S. Wie oefening 1 heeft
overgeslagen of het een week later opnieuw opzoekt, heeft vanuit die drie pagina's geen
enkel aanknopingspunt. Oefening 5 en 6 doen het wel goed en verwijzen zelfs netjes naar
labo 2 voor `analogRead()` en `map()`.

**Besluit (2026-07-26):** aanvaard, alle drie voorzien van een verwijzing naar
`Schuifregister.html` op de plek waar ze de theorie nodig hebben: bij de cascade-uitleg in
oefening 2, bij `risingEdge()` en de schuifvolgorde in oefening 3, en bij Q7S in oefening
4. Alle zes de oefeningen van labo 3 linken nu theorie.

**Status:** opgelost, 2026-07-26

---

## L3-02 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina's:** [Schuifregister.html](../Labo3/Reference/Schuifregister.html) en
[Dubbel7SegmentDisplay.html:16](../Labo3/Exercises/Dubbel7SegmentDisplay.html#L16)

**Wat de student raakt:** het hele labo schuift de bits met de hand naar buiten, via een
zelfgeschreven `risingEdge()` en een lus van acht `digitalWrite`-oproepen. Arduino heeft
daar een ingebouwde functie voor, `shiftOut()`, die precies dit in &eacute;&eacute;n regel
doet. Die functie wordt in het hele labo geen enkele keer genoemd.

Dat wordt scherper doordat oefening 2 de student naar de Arduino-pagina **ShiftOut**
stuurt om over cascade te lezen. Daar staat `shiftOut()` gewoon in gebruik. De student
leest dus een externe pagina met een functie die zijn cursus nergens vermeldt, en komt
terug bij code die alles met de hand doet. Nergens staat dat dat met opzet is, namelijk
dat je het protocol eerst zelf uitvoert voor je de snelkoppeling gebruikt. Wie het opmerkt,
weet niet of hij iets mist of dat de cursus verouderd is.

**Besluit (2026-07-26):** aanvaard, optie 'uitleggen waarom je het met de hand doet'.
`Schuifregister.html` heeft nu een opmerkingsbox die erkent dat `shiftOut()` bestaat, dat
je die online meteen tegenkomt, en dat je het hier toch zelf uitschrijft om te zien wat er
per klokflank gebeurt. Dat inzicht heb je nodig zodra er iets niet werkt of zodra je twee
registers cascadeert. De box zegt er uitdrukkelijk bij dat je de ingebouwde functie in je
eigen projecten gerust mag gebruiken.

De voorbeeldcode met `shiftOut()` is bewust niet getoond, zodat de oefeningen om de
uitgeschreven lus blijven vragen. De externe link in oefening 2 blijft staan, maar de zin
erbij waarschuwt nu dat die pagina de ingebouwde functie gebruikt.

**Status:** opgelost, 2026-07-26

---

## L3-03 &middot; BEGRIP &middot; detail &middot; opgelost

**Pagina's:** [Enkel7SegmentDisplay.html:22](../Labo3/Exercises/Enkel7SegmentDisplay.html#L22)
en [LichtpatronenUitEenArray.html:37](../Labo3/Exercises/LichtpatronenUitEenArray.html#L37)

**Wat de student raakt:** labo 3 legt twee dingen opnieuw uit die sinds de review van labo
1 hun eigen referentiepagina hebben: het verschil tussen common anode en common cathode
staat nu op [Het 7-segment display](../Labo1/Reference/ZevenSegmentDisplay.html), en
multidimensionele arrays met `sizeof` staan op [Arrays](../Labo1/Reference/Arrays.html).
Voor de student is dat geen ramp, maar het betekent wel dat dezelfde uitleg nu op twee
plaatsen staat en dus uit elkaar kan groeien.

Deze bevinding is ontstaan door de herstructurering van labo 1 in dezelfde sessie: v&oacute;&oacute;r
die ronde bestonden die twee pagina's niet en was de uitleg in labo 3 de enige.

**Besluit (2026-07-26):** aanvaard, optie 'inkorten tot een verwijzing'. De uitleg over
common anode en cathode in oefening 1 is teruggebracht tot &eacute;&eacute;n zin met een
link naar [Het 7-segment display](../Labo1/Reference/ZevenSegmentDisplay.html). De sectie
over multidimensionele arrays in oefening 6, met twee volledige codevoorbeelden, is
vervangen door een verwijzing naar [Arrays](../Labo1/Reference/Arrays.html).

Daarbij bleek dat de `sizeof`-truc om het aantal rijen en kolommen uit een tweedimensionale
array af te leiden alleen in labo 3 stond en niet op de arraypagina. Die is dus eerst naar
`Arrays.html` verhuisd, anders zou het inkorten een gat geslagen hebben.

**Status:** opgelost, 2026-07-26

---

## L3-04 &middot; BEGRIP &middot; detail &middot; open

**Pagina:** [LedbarMetPotentiometer.html:14](../Labo3/Exercises/LedbarMetPotentiometer.html#L14)

**Wat de student raakt:** het woord **ledbar** duikt hier voor het eerst op in de cursus,
in de titel en in de lead, zonder uitleg en zonder afbeelding. Tot dan werkte de student
met acht losse LEDs op een breadboard, en die staan ook zo op het schema van oefening 3.
Een ledbar is in de praktijk gewoon acht LEDs in &eacute;&eacute;n behuizing, maar dat
staat er nergens, net zomin als hoe je hem aansluit of waar pin 1 zit. De oefening zelf
beschrijft alleen de bedrading van het schuifregister en de potentiometer, niet die van de
ledbar.

**Besluit (2026-07-26):** aanvaard, optie 'zin erbij plus TODO-afbeelding'. De oefening
legt nu uit dat een ledbar acht LEDs in &eacute;&eacute;n behuizing is, elektrisch
identiek aan de acht losse LEDs uit het 8-bit looplicht, met een waarschuwing over de
ori&euml;ntatie. De `TODO-ledbar-pinout.png` wacht nog op een foto of pinout waarop te zien
is welke kant de anodes zijn.

**Status:** open, wacht op de afbeelding
