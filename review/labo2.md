# Review labo 2 | studentbril

Laatste ronde: 2026-07-26. Gelezen: alle tien de oefeningen in volgorde, en de drie
referentiepagina's.

Voorkennis waarvan deze ronde vertrekt: labo 0 en labo 1 in hun gecorrigeerde vorm. De
student kent digitale in- en uitgangen, pull-up en pull-down, sourcen en sinken, de wet van
Ohm, selecties, iteraties, eigen functies met parameters, `millis()`, arrays (ook
tweedimensionaal), het 7-segment display met common anode en cathode, en multiplexing.

Onderzocht en g&eacute;&eacute;n bevinding:

- **De moeilijkheidsdaling van de TMP36 (3) naar de LM35 (2)** ziet er uit als een
  volgordeprobleem, maar is duidelijk bedoeld: de LM35 is expliciet "doe hetzelfde, maar nu
  met de sensor uit je starterkit", en de rekenformule is er eenvoudiger. Een lichtere
  herhaling met een ander onderdeel is een geldige stap.
- **De verwijzing van de thermometeroefening naar labo 1** blijft na de herstructurering
  van labo 1 gewoon werken en wijst nog altijd naar de juiste oefening.

Buiten deze review (technische correctheid, door de gebruiker zelf na te kijken): het
bijschrift bij de grafiek op
[TemperatuursensorTMP36.html:54](../Labo2/Exercises/TemperatuursensorTMP36.html#L54) zegt
dat 1,2 V overeenkomt met ongeveer 75 &deg;C, terwijl de formule die de oplossing gebruikt
op 70 &deg;C uitkomt.

---

## L2-01 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina's:** alle tien de oefeningen

**Wat de student raakt:** g&eacute;&eacute;n enkele oefening van labo 2 bevat een link naar
een referentiepagina of een datasheet. Nul op tien. Dat is extra pijnlijk omdat de theorie
er w&eacute;l is, en bijna &eacute;&eacute;n op &eacute;&eacute;n aansluit op de oefeningen:
[analogRead.html](../Labo2/Reference/analogRead.html) behandelt precies wat oefening 1
nodig heeft, inclusief de valkuil van `/1023.0` tegenover `/1023`;
[analogWrite.html](../Labo2/Reference/analogWrite.html) dekt oefening 2;
en voorbeeld 1 van [map.html](../Labo2/Reference/map.html) &iacute;s de oplossing van
oefening 3, terwijl voorbeeld 2 die van oefening 5 is.

Nog scherper: vier oefeningen dragen de student uitdrukkelijk op de datasheet te
raadplegen, zonder ernaar te linken, terwijl beide datasheets in `datasheets/` staan en op
de reference-hub vermeld zijn:

- [LdrLichtmeting.html:25](../Labo2/Exercises/LdrLichtmeting.html#L25) "Bekijk eerst de
  datasheet van de LDR"
- [TemperatuursensorTMP36.html:16](../Labo2/Exercises/TemperatuursensorTMP36.html#L16)
  "Bekijk eerst de datasheet", en op regel 51 "Zoek in de datasheet de grafiek"
- [TemperatuursensorLM35.html:20](../Labo2/Exercises/TemperatuursensorLM35.html#L20) "Zoek
  in de datasheet op welke spanning bij 0 &deg;C op de uitgang staat"
- [TemperatuurindicatorMetRGBLed.html:16](../Labo2/Exercises/TemperatuurindicatorMetRGBLed.html#L16),
  zie L2-03

Dit is dezelfde vorm als L4-03 en L0-05, maar dan over een heel labo tegelijk.

**Besluit (2026-07-26):** aanvaard, optie 'overal linken waar het hoort'. Alle tien de
oefeningen verwijzen nu naar de theorie die ze nodig hebben: `analogRead` bij oefening 1,
`analogWrite` bij 2, `map` bij 3, `PullUpPullDown` bij 4, de spanningsdeler bij 1 en 5,
`Debouncen` bij 6 voor de `millis()`-aanpak, en `Multiplexing` uit labo 1 bij 10. De vier
datasheetverwijzingen zijn echte links geworden.

De **LM35-datasheet ontbrak in de repo**, waardoor oefening 8 naar een bestand verwees dat
nergens stond. De gebruiker heeft hem aangeleverd; hij staat nu als `datasheets/lm35.pdf`
in de Datasheets-categorie van labo 2 en wordt vanuit oefening 8 gelinkt.

**Status:** opgelost, 2026-07-26

---

## L2-02 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina's:** [LedDimmenMetPotentiometer.html:66](../Labo2/Exercises/LedDimmenMetPotentiometer.html#L66)
en [DimmerMetSchakelaar.html:78](../Labo2/Exercises/DimmerMetSchakelaar.html#L78) en
[LdrLichtmeting.html:131](../Labo2/Exercises/LdrLichtmeting.html#L131), tegenover
[TemperatuursensorTMP36.html:57](../Labo2/Exercises/TemperatuursensorTMP36.html#L57)

**Wat de student raakt:** `map()` wordt vanaf oefening **3** gebruikt en pas in oefening
**7** uitgelegd. In oefening 3 staat het niet alleen in de oplossing, maar ook in de
checklist ("wordt herschaald naar 0-255, bijvoorbeeld met `map()`"), dus de student komt het
tegen nog voor hij de oplossing opendoet. Oefening 4 en 5 gebruiken het ook. De
referentiepagina die het netjes uitlegt bestaat, maar wordt nergens gelinkt (zie L2-01).

Exact dezelfde vorm als L1-01, waar arrays vanaf oefening 2 gebruikt werden en pas in
oefening 5 uitgelegd.

**Besluit (2026-07-26):** aanvaard, optie 'oefening 3 introduceert map()'. Die oefening
heeft nu een sectie "Twee bereiken die niet op elkaar passen" die uitlegt waarom 0-1023
niet zomaar in 0-255 past, wat `map()` doet, en dat je het uitvoerbereik mag omdraaien.
Dat laatste heeft de student bij de LDR nodig. De volledige uitleg blijft op
[map.html](../Labo2/Reference/map.html), waar nu ook naar gelinkt wordt.

**Status:** opgelost, 2026-07-26

---

## L2-03 &middot; OPDRACHT &middot; vertraagt &middot; opgelost

**Pagina:** [TemperatuurindicatorMetRGBLed.html:16](../Labo2/Exercises/TemperatuurindicatorMetRGBLed.html#L16)

**Wat de student raakt:** "Je kan de datasheet van de sensor **onderaan** terugvinden, of
opzoeken via Google." Onderaan de pagina staat geen datasheet. Er staat niets onderaan
behalve de checklist en de oplossing. De student scrolt naar beneden, vindt niets, en weet
niet of hij iets mist. Vermoedelijk een restant van de Brightspace-import, waar het bestand
als bijlage onder de opdracht hing. Zelfde soort restant als L4-04.

**Besluit (2026-07-26):** opgelost als onderdeel van L2-01. De zin verwijst niet langer
naar een bijlage 'onderaan' die er niet is, maar linkt rechtstreeks naar de datasheet in
`datasheets/`.

**Status:** opgelost, 2026-07-26

---

## L2-04 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina:** [TemperatuursensorTMP36.html:57](../Labo2/Exercises/TemperatuursensorTMP36.html#L57)

**Wat de student raakt:** dit is de enige uitgewerkte uitleg van `map()` in het hele labo,
en de getallen kloppen niet met elkaar. Als **value** wordt 1,2 V genoemd, terwijl het
invoerbereik als 0,75 V tot 1 V wordt opgegeven. De waarde die je wil omzetten ligt dus
buiten het bereik waarin je hem omzet, zonder dat iemand daar iets over zegt. Wie probeert
te snappen wat `fromLow` en `fromHigh` betekenen, raakt hier de draad kwijt.

Daar komt bij dat de oplossing van diezelfde oefening `map()` uiteindelijk helemaal niet
gebruikt, maar rechtstreeks met `double` rekent, met de uitleg dat dat eenvoudiger en
nauwkeuriger is. De student krijgt dus een moeizame uitleg van een aanpak die daarna wordt
afgeraden.

**Besluit (2026-07-26):** aanvaard, optie 'allebei tonen als bewuste vergelijking'. De
sectie toont nu eerst de `map()`-aanpak met de vaststelling dat die op gehele getallen
stukloopt, dan de rechtstreekse berekening met `double`, en sluit af met een denkvraag:
welke van de twee neem je hier best, en waarom? Het antwoord geeft de vuistregel: `map()`
voor gehele bereiken, een eigen formule zodra er kommagetallen in het spel zijn. Daarmee is
de spanning tussen de uitleg en de oplossing een leermoment geworden in plaats van een
tegenspraak. De getallen die niet klopten zijn verdwenen.

**Status:** opgelost, 2026-07-26

---

## L2-05 &middot; BEELD &middot; vertraagt &middot; open

**Pagina's:** het hele labo

**Wat de student raakt:** geen enkele oefening in labo 2 toont hoe je de schakeling
bedraadt. Er staat geen enkel aansluitschema of breadboardfoto; overal is dat een
YouTube-video. De enige schakelingsafbeeldingen in het labo zijn de algemene
spanningsdelerfiguren, en die zitten verstopt in een spoiler bij een vraag.

Dat weegt hier zwaarder dan in labo 1, want een potentiometer met drie pootjes en een
spanningsdeler met een LDR zijn allebei dingen waar een beginner de bedrading niet van kan
raden. Zelfde bevinding als L1-05, maar over tien oefeningen.

**Besluit (2026-07-26):** aanvaard, optie 'TODO-schema's voor de vier onmisbare'. Er
staat nu een `TODO-`figure met een beschrijvend commentaar bij de potentiometer, de led op
een PWM-pin, de LDR-spanningsdeler en de TMP36 met RGB-led. `check-content.sh` meldt ze bij
elke run.

**Status:** open, wacht op de tekeningen

---

## L2-06 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina:** [PotentiometerUitlezen.html:29](../Labo2/Exercises/PotentiometerUitlezen.html#L29)

**Wat de student raakt:** de eerste vraag van de eerste oefening luidt "Kan men op elke pin
van de **Leonardo** een analoge spanning inlezen?". De student heeft heel labo 0 en 1 met
een UNO gewerkt, en de v&oacute;lgende oefening heeft het over de UNO ("Voor de UNO is dat
bijvoorbeeld pin 11, 10, 9, 6, 5 en 3"). De twee referentiepagina's noemen "Uno of
Leonardo" telkens samen en zijn daarmee w&eacute;l duidelijk. Alleen deze vraag doet alsof
de student een Leonardo voor zich heeft.

**Correctie tijdens de ronde.** De eerste versie van deze bevinding beweerde dat er een
Leonardo-afbeelding bij stond. Dat klopte niet: de afbeelding toont een **UNO**, met "UNO"
op het bord en A0 t/m A5 omkaderd. Ze was alleen `analoge-ingangen-leonardo.png` genoemd en
had een alt-tekst die Leonardo zei. De bevinding werd oorspronkelijk opgeschreven op basis
van die bestandsnaam en alt-tekst, zonder de afbeelding zelf te bekijken. Het woord
Leonardo stond dus op drie plaatsen fout (vraagtekst, alt-tekst, bestandsnaam) bij
&eacute;&eacute;n afbeelding die juist w&eacute;l klopte. Daarmee is de opmerkingsbox uit
labo 4 hier niet nodig: die bestaat omdat het schema d&aacute;&aacute;r echt een Leonardo
toont.

**Besluit (2026-07-26):** aanvaard. De vraag gaat nu over "de Arduino" en het antwoord
zegt er expliciet bij dat het er op de UNO zes zijn, A0 t/m A5, zoals op de afbeelding
gegroepeerd onder ANALOG IN. De alt-tekst noemt nu een UNO, en de afbeelding is hernoemd
van `analoge-ingangen-leonardo.png` naar `analoge-ingangen-uno.png`, zodat een volgende
auteur er niet opnieuw door misleid wordt.

**Status:** opgelost, 2026-07-26

---

## L2-07 &middot; BEGRIP &middot; detail &middot; opgelost

**Pagina:** [LdrLichtmeting.html:66](../Labo2/Exercises/LdrLichtmeting.html#L66)

**Wat de student raakt:** de spanningsdeler is het idee achter elke weerstandssensor in dit
labo, maar heeft als enige onderwerp van labo 2 geen eigen referentiepagina. De lead van de
LDR-oefening noemt de term, en het schema en de formule staan in een spoiler bij een vraag.
Oefening 6 bouwt erop verder zonder de term nog uit te leggen. Wie er later op terugkomt,
moet zich herinneren dat het antwoord in een dichtgeklapte spoiler van een andere oefening
zit.

**Besluit (2026-07-26):** aanvaard, eigen referentiepagina
[De spanningsdeler](../Labo2/Reference/Spanningsdeler.html). Ze begint bij het probleem
(een Arduino meet volt, geen ohm), geeft de formule met het bestaande schema, legt uit hoe
je de vaste weerstand kiest en waarom een verkeerde keuze je meetbereik weggooit, en zegt
erbij dat een potentiometer gewoon een verschuifbare spanningsdeler is. Oefening 1 en 5
verwijzen ernaar.

**Status:** opgelost, 2026-07-26
