# Review labo 4 | studentbril

Laatste ronde: 2026-07-26. Gelezen: alle 5 oefeningen in volgorde, plus
`PCF8574.html`, `Bibliotheken.html` en de manifests van labo 0 t/m 3 als
basislijn.

Voorkennis waarvan deze ronde vertrekt: na labo 0 t/m 3 kent de student
setup/loop, variabelen en types, selecties, iteraties, functies, arrays
(ook meerdimensionaal), `pinMode`, `digitalRead`/`digitalWrite`, pull-up en
pull-down, sourcen en sinken, debouncen, seri&euml;le debug-uitvoer,
`analogRead`/`analogWrite`, `map()`, `millis()`, de ternaire operator, common
anode/cathode, en het 74HC595-schuifregister.

Onderzocht en g&eacute;&eacute;n bevinding: "common anode / common cathode" leek in
oefening 4 uit de lucht te vallen, maar blijkt netjes ingevoerd in
[Enkel7SegmentDisplay.html:30](../Labo3/Exercises/Enkel7SegmentDisplay.html#L30) en al
gebruikt vanaf labo 1. Ook `millis()` en de ternaire operator, die in de oplossingen van
labo 4 opduiken, staan al in labo 0 t/m 3.

---

## L4-01 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina's:** [DrukknoppenInlezen.html:81](../Labo4/Exercises/DrukknoppenInlezen.html#L81),
[VolloperMetDrukknoppen.html:373](../Labo4/Exercises/VolloperMetDrukknoppen.html#L373),
[TellerMetI2CDrukknoppen.html:188](../Labo4/Exercises/TellerMetI2CDrukknoppen.html#L188)

**Wat de student raakt:** het hele labo draait om acht pinnen die je als
&eacute;&eacute;n byte leest en schrijft, dus om bitbewerkingen: binaire
literals (`B00000001`), maskeren met `&`, `&=`, `~`, en `1 << bitNummer`. Geen
van die operatoren komt v&oacute;&oacute;r labo 4 ook maar &eacute;&eacute;n
keer voor in de cursus, en
[WiskundigeOperatoren.html](../Labo0/Reference/WiskundigeOperatoren.html)
behandelt alleen `+ - * / %`, `pow` en `sqrt`. Labo 4 heeft geen
referentiepagina over bitbewerkingen. De enige uitleg is &eacute;&eacute;n
spoiler in oefening 1 die `&` met &eacute;&eacute;n voorbeeld toont. Vanaf
oefening 4 moet de student `patroon &= ~(1 << bitNummer)` lezen zonder ooit
`<<` of `~` gezien te hebben.

**Besluit (2026-07-26):** aanvaard, aangepakt met een nieuwe referentiepagina
[Werken met bits](../Labo4/Reference/Bits.html), met een entry in `reference.js` onder de
nieuwe categorie 'Bits en bytes'. Gelinkt vanuit oefening 2 (bij de voorbeeldcode),
oefening 4 (bij de bitpatroontabel en bij `maakPatroon()`) en oefening 5 (bij de drie
knoppen op een byte).

**Status:** opgelost, 2026-07-26

---

## L4-02 &middot; OPDRACHT &middot; blokkeert &middot; opgelost

**Pagina's:** [LedsAansturen.html:31](../Labo4/Exercises/LedsAansturen.html#L31)
tegenover [VolloperMetDrukknoppen.html:30](../Labo4/Exercises/VolloperMetDrukknoppen.html#L30)

**Wat de student raakt:** oefening 2 zegt "wat je beter niet doet, is een
ongebruikte pin rechtstreeks aan GND of Vcc hangen", en zet dat ook in de
checklist. Oefening 4 zegt "merk op dat de lege I/O-pinnen op het schema
verbonden zijn met ground", zet dat &oacute;&oacute;k in de checklist, en de
hele oplossing (`allesUit = B00111111`) hangt ervan af. Twee oefeningen later
moet de student dus precies doen wat hem eerder werd afgeraden, zonder dat
&eacute;&eacute;n van beide pagina's het verschil uitlegt.

**Besluit (2026-07-26):** aanvaard, optie 'oefening 2 nuanceren'. De alinea in
[LedsAansturen.html](../Labo4/Exercises/LedsAansturen.html) legt nu uit dat aan GND
leggen mag zolang die bit in elk patroon laag blijft, verwijst vooruit naar de volloper,
en zegt dat het gevaar in het bitpatroon zit en niet in de draad. De checklistregel is
mee herschreven. Oefening 4 blijft ongewijzigd.

**Status:** opgelost, 2026-07-26

---

## L4-03 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina:** [DrukknoppenInlezen.html:18](../Labo4/Exercises/DrukknoppenInlezen.html#L18)

**Wat de student raakt:** dit is zijn eerste I&sup2;C-schakeling &egrave;n zijn
eerste bibliotheek in de hele cursus. De pagina begint meteen met bouwen:
`#include <Wire.h>`, `Wire.requestFrom()` en adres 0x38 verschijnen zonder
introductie. [PCF8574.html](../Labo4/Reference/PCF8574.html) legt dit allemaal
w&eacute;l goed uit, maar wordt pas op regel 30 genoemd, in een opmerkingsbox
die over adreslijnen gaat. [Bibliotheken.html](../Labo4/Reference/Bibliotheken.html)
wordt in oefening 1 helemaal niet gelinkt.
[Enkel7SegmentDisplay.html:18](../Labo3/Exercises/Enkel7SegmentDisplay.html#L18)
doet dit wel goed en is het model.

**Besluit (2026-07-26):** aanvaard, optie 'inleidende alinea zoals labo 3'. Omdat
L4-05 de volgorde omdraaide, staat die alinea nu bovenaan
[LedsAansturen.html](../Labo4/Exercises/LedsAansturen.html), de nieuwe eerste oefening.
Ze verwijst naar zowel `PCF8574.html` als `Bibliotheken.html`.

**Status:** opgelost, 2026-07-26

---

## L4-04 &middot; OPDRACHT &middot; vertraagt &middot; opgelost

**Pagina:** [LedsAansturen.html:31](../Labo4/Exercises/LedsAansturen.html#L31)

**Wat de student raakt:** de alinea begint met "De opmerking uit de opdracht
over het beschermen van de schakeling gaat over de pinnen die je niet
gebruikt." Er staat nergens op de pagina zo'n opmerking. De student zoekt naar
iets dat niet bestaat. Vermoedelijk een restant van de Brightspace-import,
waar die opmerking in de opdrachttekst stond.

**Besluit (2026-07-26):** aanvaard, zin herschreven. De verwijzing naar een
niet-bestaande opmerking is weg; de alinea begint nu rechtstreeks bij de vraag wat je met
P2 tot P7 doet. Uitgevoerd samen met L4-02, zodat de tekst in één keer klopt.

**Status:** opgelost, 2026-07-26

---

## L4-05 &middot; SPRONG &middot; vertraagt &middot; opgelost

**Pagina's:** [DrukknoppenInlezen.html](../Labo4/Exercises/DrukknoppenInlezen.html)
(order 1, difficulty 2) tegenover
[LedsAansturen.html](../Labo4/Exercises/LedsAansturen.html) (order 2, difficulty 1)

**Wat de student raakt:** de eerste oefening van het labo stapelt in
&eacute;&eacute;n keer: adres opzoeken met de scanner, zelf pull-ups voorzien,
een byte lezen over de bus, bits maskeren, en flankdetectie. De tweede oefening
is &eacute;&eacute;n byte schrijven en staat zelf in zijn lead dat ze op de
eerste voortbouwt. Schrijven is de eenvoudigste kant van de expander en zou het
eerste contact kunnen zijn. De moeilijkheidsgraden in het manifest (2 dan 1)
zeggen hetzelfde.

**Besluit (2026-07-26):** aanvaard, volgorde omgedraaid. `LedsAansturen` is nu order
1 en `DrukknoppenInlezen` order 2. De basisschakeling en het opzoeken van het adres zijn
mee verhuisd naar de nieuwe eerste oefening; beide leads zijn herschreven. De `id`-velden
zijn bewust ongewijzigd gebleven, want daar hangt de voortgang in `localStorage` aan.
`difficulty` van `LedsAansturen` ging van 1 naar 2 en de tijdsinschatting van 20 naar 30
minuten, omdat die oefening er de opstart bij kreeg.

**Status:** opgelost, 2026-07-26

---

## L4-06 &middot; OPDRACHT &middot; detail &middot; opgelost

**Pagina:** [TekstOpI2CLcd.html:14](../Labo4/Exercises/TekstOpI2CLcd.html#L14)

**Wat de student raakt:** de lead zegt niets over TinkerCAD, maar vanaf regel
18 gaat alles over een TinkerCAD-project, een type-veld en een adres dat
TinkerCAD invult. Wie met de echte kit werkt weet niet of hij hier goed zit.
[TellerMetI2CDrukknoppen.html:14](../Labo4/Exercises/TellerMetI2CDrukknoppen.html#L14)
doet dit wel expliciet: "Deze oefening werk je uit in TinkerCAD."

**Besluit (2026-07-26):** aanvaard. De lead begint nu met 'Deze oefening werk je uit
in TinkerCAD', net als oefening 5.

**Status:** opgelost, 2026-07-26

---

## L4-07 &middot; BEGRIP &middot; detail &middot; opgelost

**Pagina:** [DrukknoppenInlezen.html:107](../Labo4/Exercises/DrukknoppenInlezen.html#L107)

**Wat de student raakt:** de pagina zegt "deze voorbeeldcode werkt", maar de
voorbeeldcode schrijft nooit 0xFF naar de expander. De oplossing doet dat wel
en noemt het nodig, en
[PCF8574.html:158](../Labo4/Reference/PCF8574.html#L158) waarschuwt er
uitdrukkelijk voor. Bij een chip die net opgestart is valt het niet op; heeft
de student eerst oefening 2 gedaan, dan staan er nog nullen in de latch en
lijkt een knop permanent ingedrukt.

**Besluit (2026-07-26):** aanvaard. De voorbeeldcode schrijft nu zelf 0xFF in de
`setup()`, met een waarschuwingsbox erbij die uitlegt waarom, en een checklistregel. Dat
was na L4-05 nog nodiger geworden: de student komt nu rechtstreeks van de LED-oefening,
waar P0 en P1 laag stonden.

**Status:** opgelost, 2026-07-26
