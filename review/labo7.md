# Review labo 7 | studentbril

Laatste ronde: 2026-07-27. Gelezen: de theoriepagina `Interrupts`, de vijf
dropbox-opdrachten en de contentpagina "onderbreek de boel eens" zoals ze uit de
Brightspace-export kwamen, plus de handout van week 10 (de lesslides), en de
manifests van labo 0 t/m 6 als basislijn. Deze ronde liep **samen met de
import**, dus alle bevindingen zijn meteen verwerkt in de pagina's die nu onder
`Labo7/` staan.

Voorkennis waarvan deze ronde vertrekt: na labo 0 t/m 6 kent de student
setup/loop, variabelen en types, selecties, iteraties, functies met parameters,
arrays, `pinMode`, `digitalRead`/`digitalWrite`, `INPUT_PULLUP`, sourcen en
sinken, debouncen met de toestandsmethode, `analogRead`/`analogWrite`, PWM,
`map()`, `millis()`, bibliotheken, I&sup2;C, de PCF8574 (inclusief het
`~knoppen &amp; vorigeKnoppen`-idioom en de 0xFF-valstrik), bitmaskers, het
I&sup2;C-LCD, motoren met transistor en H-brug, en serieel communiceren tussen
twee borden.

Het woord `interrupt` kwam repobreed precies twee keer voor, allebei op
[PCF8574.html](../Labo4/Reference/PCF8574.html), als een belofte: "Ze wordt pas
interessant als we het over interrupts hebben." Die belofte is deze ronde
ingelost met een echte link.

**Dit labo had niet de zwakste bron, maar wel de gevaarlijkste.** Labo 6 had een
bron die te weinig uitlegde; labo 7 heeft een bron die op twee plaatsen iets
opdraagt wat het bord doet vastlopen, en op &eacute;&eacute;n plaats een
rekenvoorbeeld geeft dat labo 5 tegenspreekt. Een student die de opgave correct
uitvoert, krijgt een dood bord en geen enkele aanwijzing waarom.

De ladder van de bron is niet bijgestuurd maar uitgebreid: acht oefeningen in
plaats van vijf. De drie nieuwe zitten alle drie v&oacute;&oacute;r de
PCF8574-reeks, want de bron sprong van "zet een LED aan" rechtstreeks naar
"gebruik de /INT-pin van een I/O-expander".

Alle sketches op de pagina's van dit labo zijn met de echte Arduino-compiler
gebouwd (`bash scripts/check-content.sh --compile`): 17 volledige programma's,
foutloos en zonder waarschuwingen.

Onderzocht en g&eacute;&eacute;n bevinding:

- **De pin-naar-interruptnummertabel van de Leonardo klopt.** Nagerekend tegen
  de 32u4-datasheet: pin 3 is INT0, pin 2 is INT1, pin 0 is INT2, pin 1 is INT3,
  pin 7 is INT6. De tabel in de bron is correct. Het probleem is niet dat ze
  fout is, maar dat ze het uitgangspunt van alle voorbeelden was (zie L7-04).
- **De bordentabel in de bron klopt ook**, inclusief de randgevallen (Zero
  behalve pin 4, de 101 die alleen op bepaalde pinnen CHANGE aankan). Overgenomen,
  ingekort tot de vier rijen die voor deze studenten relevant zijn.
- **Het bedradingsschema van basis oefening 2 klopt.** Na inzoomen: de motor
  hangt boven de transistor op een aparte voeding, de massa's zijn doorverbonden,
  en de twee knoppen zitten op pin 2 en pin 4 zoals het antwoord in de opgave
  zegt. Overgenomen als `img/interrupt-motor-met-noodstop-schema.png`.
- **De opmerking in de bron over de LED die blijft branden** ("we gaan er niets
  van merken omdat de led reeds brandt") is didactisch juist en goed gezien.
  Overgenomen in oefening 1.
- **De opsomming in de "Opgelet"-kader van de bron** (ISR is void, geen
  parameters, interrupts kunnen elkaar niet onderbreken, meerdere aanvragen van
  dezelfde bron tellen als &eacute;&eacute;n) is volledig correct en is de kern
  van [InterruptServiceRoutine.html](../Labo7/Reference/InterruptServiceRoutine.html)
  geworden.

---

## L7-01 &middot; OPDRACHT &middot; blokkeert &middot; opgelost

**Pagina:** `labo 7: basis oefening 3` in de bron (nu
[KnoppenOpDePCF8574.html](../Labo7/Exercises/KnoppenOpDePCF8574.html))

**Wat de student raakt:** de opgave zegt letterlijk *"Gebruik een interrupt, de
void loop() blijft volledig leeg!"*, terwijl de oefening vereist dat je de
PCF8574 over I&sup2;C uitleest. Die twee kunnen niet samen.

Nagerekend in de broncode van de AVR-core (`libraries/Wire/src/utility/twi.c`):
`twi_readFrom()` eindigt op `while(TWI_MRX == twi_state){ }` en die toestand
wordt uitsluitend veranderd door `ISR(TWI_vect)`. In een ISR staat de I-bit
uit, dus die vector kan niet lopen. Resultaat: een oneindige lus. De
timeout-ontsnapping die er in principe is, staat standaard uit
(`twi_timeout_us = 0ul`), dus ze wordt niet eens ge&euml;valueerd.

De student volgt de opgave letterlijk, drukt op een knop, en zijn bord is dood.
Geen foutmelding, geen compilerwaarschuwing, geen timeout. Alleen de resetknop.
En omdat de opgave zegt dat het z&oacute; moet, zoekt hij de fout bij zichzelf.

Extra wrang: de opdracht die het vlagpatroon w&eacute;l uitlegt, is **basis
oefening 4**. De oplossing staat dus &eacute;&eacute;n oefening n&aacute; de
oefening die eraan kapotgaat.

**Beslissing:** de eis "loop blijft leeg" is geschrapt en vervangen door het
vlagpatroon. De pagina benoemt expliciet dat de oorspronkelijke opgave niet kan,
en waarom, in plaats van dat stilletjes recht te trekken: het is precies het
soort fout dat je &eacute;&eacute;n keer wil zien uitgelegd. Het vlagpatroon
zelf is naar voren gehaald naar een eigen referentiepagina
([VolatileEnVlaggen.html](../Labo7/Reference/VolatileEnVlaggen.html)) en wordt
al vanaf oefening 5 gebruikt.

Bijkomend gedocumenteerd op
[InterruptServiceRoutine.html](../Labo7/Reference/InterruptServiceRoutine.html):
de voor de hand liggende "oplossing" `interrupts()` bovenaan de ISR. Die
w&eacute;rkt, en is daarom erger: de INT0-vlag staat meteen weer scherp, een
denderende knop gaat recursief de ISR in en loopt de 2 kB SRAM over. Een hangend
bord vind je; een overgelopen stack niet.

---

## L7-02 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** de hele bron (nu
[DenderenBijEenInterrupt.html](../Labo7/Reference/DenderenBijEenInterrupt.html))

**Wat de student raakt:** dendering wordt in het volledige bronmateriaal van
labo 7 geen enkele keer genoemd. Niet in de theorie, niet in de vijf opgaven,
niet in de handout.

Dat is geen detail dat je erbij mag denken. Bij pollen was dendering hinderlijk;
bij een interrupt is ze structureel, want de hardware mist per definitie geen
enkele flank, en dat is net waarom je hem gekozen hebt. Een mechanische knop
levert bij &eacute;&eacute;n druk vijf tot twintig dalende flanken, dus vijf tot
twintig ISR-oproepen.

De allereerste opgave van de bron ("een druk op de knop moet de led bedienen")
gedraagt zich daardoor op een echt bord zichtbaar grillig, en de student heeft
geen enkel aanknopingspunt: hij heeft nog nooit gehoord dat dit kan gebeuren in
deze context.

**Wat het extra verbergt:** de drukknop van TinkerCAD simuleert geen
contactdender. In de simulator werkt alles perfect. Het probleem verschijnt pas
op het labo, op hardware, bij code waarvan de student al bewezen heeft dat ze
werkt.

**Beslissing:** eigen referentiepagina, plus een eigen oefening
([DrukkenTellenZonderDender.html](../Labo7/Exercises/DrukkenTellenZonderDender.html),
volgorde 2) die de student de simpele versie eerst laat bouwen zodat hij het
gedrag ziet. De TinkerCAD-nuance staat er expliciet bij, want anders lijkt de
ontdendering dode code.

De vergrendeling gebruikt `millis()` in de ISR, en de pagina legt uit waarom dat
mag terwijl de klok tijdens een ISR stilstaat: je hebt de waarde v&aacute;n vlak
voor de onderbreking nodig, niet een klok die verderloopt. Ook het ene gat is
opgeschreven (verbreek-dender bij lang ingedrukt houden), met twee uitwegen,
in plaats van de oplossing als sluitend te verkopen.

---

## L7-03 &middot; BEGRIP &middot; hindert &middot; opgelost

**Pagina:** `labo 7: basis oefening 2` in de bron (nu
[MotorMetNoodstop.html](../Labo7/Exercises/MotorMetNoodstop.html))

**Wat de student raakt:** de opgave laat de basisweerstand berekenen met
Ic = 80 mA, hFE = 200 en Vbe = 0,7 V, en geeft als antwoord **10 k&Omega;**. Die
rekensom klopt: Ib = 0,4 mA, Rb = 4,3 / 0,0004 = 10 750 &Omega;.

Maar [DCMotorMetTransistor.html](../Labo5/Exercises/DCMotorMetTransistor.html)
in labo 5 doet dezelfde berekening en komt op **2,2 k&Omega;**, omdat het de hFE
bewust door vijf deelt (200 wordt 40) om zeker in saturatie te zitten. Stap 3
van dat stappenplan maakt die marge een uitdrukkelijke eis, en de checklist
controleert erop.

Dezelfde vraag, twee labo's, twee antwoorden die een factor 5 uit elkaar liggen.
De student die labo 5 goed gedaan heeft, krijgt hier te horen dat hij het fout
deed.

En het antwoord van labo 7 is bovendien het slechtste van de twee. Die hFE van
200 is een typische waarde bij &eacute;&eacute;n meetpunt; het minimum ligt veel
lager, en de datasheet specificeert Vce(sat) bij een geforceerde beta van 10.
Bij 0,4 mA basisstroom schakelt een exemplaar uit de doos niet voluit. In labo 5
werd er gedimd met PWM, en dan is een zachte transistor vooral inefficient. Hier
wordt er hard geschakeld, en dan is het de bedoeling van de hele schakeling.

**Beslissing:** 2,2 k&Omega;, met een uitklapbaar antwoord dat de berekening
h&eacute;rhaalt in plaats van ze opnieuw als open vraag te stellen, en met een
waarschuwingskader dat expliciet uitlegt waarom 10 k&Omega; rekenkundig klopt en
elektrisch niet. De bron is hier niet gevolgd, maar ook niet stil gecorrigeerd.

---

## L7-04 &middot; BEELD &middot; hindert &middot; opgelost

**Pagina:** de theoriepagina `Interrupts` in de bron (nu
[Interruptpinnen.html](../Labo7/Reference/Interruptpinnen.html))

**Wat de student raakt:** de bron schrijft *"We nemen voor onze voorbeelden de
Arduino Leonardo als basis"* en bouwt daar alles op: de tabel, het uitgewerkte
voorbeeld, en de zin "interrupt nummer 0 komt overeen met pin 3". De UNO staat
erbij als bijzaak.

Deze studenten werken met een UNO, in TinkerCAD en op het labo. De rest van de
cursus doet dat ook: `Labo4/Reference/PCF8574.html` behandelt de Leonardo al
uitdrukkelijk als "het bord waarmee sommige schema's getekend zijn".

Dat is niet alleen verwarrend, het botst inhoudelijk. **Op een Leonardo zijn pin
2 en pin 3 net SDA en SCL.** De hele tweede helft van dit labo hangt een PCF8574
aan de I&sup2;C-bus en de /INT-pin aan een interruptpin. Op een Leonardo kan dat
dus niet zoals het hier staat. Op een UNO zit I&sup2;C op A4/A5 en is er geen
probleem.

**Ook een echte val in de voorbeeldcode:** de bron declareert
`int buttonPin = 3;` met de commentaar "3 voor Leonardo, 2 voor Uno", en doet
daarna `pinMode(3, INPUT_PULLUP)` en `attachInterrupt(0, ...)`. De variabele
wordt nooit gebruikt. Een UNO-student die netjes `buttonPin` op 2 zet, verandert
niets aan zijn programma. Het werkt daarna nog steeds, maar per toeval: op een
UNO is interrupt 0 nu eenmaal pin 2.

**Beslissing:** de UNO is overal het uitgangspunt, en `digitalPinToInterrupt()`
wordt consequent gebruikt in plaats van ruwe nummers. De Leonardo-tabel is
b&eacute;waard, in een uitklapbare opmerking, omdat ze in de les gebruikt wordt.
Ze staat er nu met een reden bij: de twee borden hebben interrupt 0 op een
&aacute;ndere pin, en dat is precies het argument voor
`digitalPinToInterrupt()`. De SDA/SCL-botsing staat er expliciet bij.

---

## L7-05 &middot; SPRONG &middot; blokkeert &middot; opgelost

**Pagina:** de opgavenreeks van de bron (nu de volgorde van
[het dashboard](../Labo7/Exercises/dashboard.html))

**Wat de student raakt:** de bron heeft vijf oefeningen, en de sprong tussen de
eerste twee is enorm.

1. Knop op een interruptpin, LED aan. (Vijftien regels.)
2. Motor met transistor, twee knoppen, tien seconden draaitijd, noodstop, plus
   een basisweerstandberekening.
3. PCF8574 met /INT.
4. Idem met twee LEDs.
5. Idem met LEDs op de expander.

Drie van de vijf oefeningen gaan over de PCF8574. Tussen oefening 1 en oefening
3 zit geen enkele stap waarin de student het vlagpatroon, dendering of het
verschil tussen "de ISR doet het" en "de vlag doet het" tegenkomt op iets
eenvoudigers dan een I&sup2;C-expander.

**Beslissing:** drie oefeningen toegevoegd, alle drie v&oacute;&oacute;r de
PCF8574-reeks of erna als afsluiter, en alle drie bouwen ze op een schakeling
die de student al heeft staan.

| Nieuw | Wat het toevoegt | Haalt terug |
|---|---|---|
| 2. [Drukken tellen zonder dender](../Labo7/Exercises/DrukkenTellenZonderDender.html) | Dendering, `volatile`, atomair lezen | niets, staat op zichzelf |
| 3. [Noodstop op je looplicht](../Labo7/Exercises/LooplichtMetNoodstop.html) | ISR versus vlag, de ISR die een `delay()` doorsnijdt | labo 1 |
| 8. [Noodstop over de seri&euml;le lijn](../Labo7/Exercises/NoodstopOverDeSerieleLijn.html) | De grens van een interrupt: de ontvanger moet beschikbaar zijn | labo 6 |

Oefening 3 gebruikt exact dezelfde bedrading als
[Looplicht.html](../Labo1/Exercises/Looplicht.html) (vier LEDs, sinking, pin 3
t/m 6), zodat de student alleen een knop hoeft bij te steken. Dat is bewust: de
sinking-inversie is dan geen nieuwe hindernis maar herhaling.

---

## L7-06 &middot; BEGRIP &middot; hindert &middot; opgelost

**Pagina:** `labo 7: basis oefening 3` in de bron (nu
[KnoppenOpDePCF8574.html](../Labo7/Exercises/KnoppenOpDePCF8574.html))

**Wat de student raakt:** de bron vertelt dat /INT laag komt "als er een
verandering in de toestand van de pinnen is gedetecteerd", en verder niets. Twee
gevolgen daarvan blijven onvermeld, en ze zijn allebei goed voor een avond
zoeken.

**Ten eerste: /INT blijft laag tot je leest.** De expander laat de lijn pas los
bij een lees- of schrijfactie over I&sup2;C. Een programma dat de chip niet
uitleest, krijgt dus precies &eacute;&eacute;n dalende flank in zijn hele
levensduur en is daarna permanent doof. Dat verklaart meteen waarom L7-01 zo
verraderlijk is: de opgave die je bord doet hangen, zou z&oacute;nder die
Wire-lezing sowieso maar &eacute;&eacute;n keer gewerkt hebben.

Daaruit volgt ook een eis aan `setup()` die nergens staat: lees de expander
&eacute;&eacute;n keer uit **v&oacute;&oacute;r** je `attachInterrupt()`
oproept. Bij het opstarten staat /INT vaak al laag, en dan wacht je op een flank
die al gepasseerd is. Dit is de meest waarschijnlijke "het werkte &eacute;&eacute;n
keer en toen niet meer".

**Ten tweede: /INT meldt ook het loslaten.** Een naieve "schakel de LED om bij
elke melding" schakelt dus twee keer per druk om en lijkt helemaal niets te
doen. Labo 4 heeft daar al een idioom voor
(`~knoppen &amp; vorigeKnoppen`, in
[TellerMetI2CDrukknoppen.html](../Labo4/Exercises/TellerMetI2CDrukknoppen.html)),
maar de bron van labo 7 legt het verband niet.

**Beslissing:** alle drie de valkuilen staan expliciet op de pagina, met een
kopje per stuk, v&oacute;&oacute;r de checklist. Het idioom uit labo 4 wordt
letterlijk hergebruikt en er wordt naar de bronpagina gelinkt. De volgorde
"eerst de vlag neerhalen, dan lezen" is er als aparte regel bij gezet, want
andersom verlies je een verandering die tijdens het lezen binnenkomt en blijft
de lijn voorgoed laag.

---

## L7-07 &middot; BEGRIP &middot; hindert &middot; opgelost

**Pagina:** de theoriepagina `Interrupts` in de bron (geschrapt)

**Wat de student raakt:** de bronpagina sluit af met een voorbeeld op basis van
`#include <timerone.h>`. Drie problemen tegelijk:

- TimerOne is een third-party bibliotheek die niet standaard geinstalleerd is.
  Het voorbeeld compileert dus niet, en faalt `--compile`.
- De naam is bovendien fout gespeld (het bestand heet `TimerOne.h`), en de
  export heeft hem als HTML-tag geinterpreteerd, dus er staat letterlijk
  `<timerone.h></timerone.h>` in de bron.
- Het is een **timer**-interrupt, terwijl het hele labo, alle vijf de opgaven en
  de volledige handout over **pin**-interrupts gaan. Als afsluitend voorbeeld
  van "een programma waarin al deze principes aan bod komen" introduceert het
  dus een vierde soort ding dat verder nergens terugkomt.

Er zat wel iets waardevols in verstopt: de `noInterrupts()`/`interrupts()` rond
het lezen van een gedeelde `unsigned long`, met een goede uitleg in de
commentaar. Dat is de enige plek in de hele bron waar atomair lezen aan bod
komt, en het staat begraven onder een voorbeeld dat niemand kan uitvoeren.

**Beslissing:** het TimerOne-voorbeeld is geschrapt. Het atomaire lezen is
eruit gehaald en heeft een eigen sectie gekregen op
[VolatileEnVlaggen.html](../Labo7/Reference/VolatileEnVlaggen.html), met een
drukteller als voorbeeld in plaats van een timer, en met een concreet scenario
dat het laat landen (de teller gaat van 255 naar 256, de loop leest 511, een
getal dat nooit bestaan heeft). Oefening 2 gebruikt het meteen.

Timer-interrupts zijn niet vervangen door iets anders. Ze horen niet in dit
labo, en er half over beginnen is slechter dan er niet over beginnen.

---

## L7-08 &middot; OPDRACHT &middot; hindert &middot; opgelost

**Pagina:** `onderbreek de boel eens` in de bron (nu deels
[NoodstopOverDeSerieleLijn.html](../Labo7/Exercises/NoodstopOverDeSerieleLijn.html))

**Wat de student raakt:** deze contentpagina is een verouderde, afgeslankte
kopie van de dropbox-opdrachten, en spreekt ze op meerdere punten tegen:

- Er staan vier oefeningen op, waarvan er **twee "Oefening basis 1" heten**. De
  dropboxen hebben er vijf, correct genummerd.
- De tweede daarvan (twee Arduino's, knop met interrupt, LED op het andere bord)
  komt in de dropboxen helemaal niet voor.
- Die opgave vraagt de verbinding via **`Serial1`** te leggen, "= pinnen 0 en 1".
  De UNO heeft geen `Serial1`; dat is een Leonardo- of Mega-object. Op een UNO
  zit `Serial` op pin 0 en 1. Labo 6 doet dit al correct, over acht pagina's.
- De opgave over de PCF8574 spreekt over een verandering "in de toestand van de
  **uitgangen**". /INT reageert op de ingangen.

**Beslissing:** de pagina is als bron terzijde geschoven ten voordele van de
dropboxen, die rijker zijn en schema's hebben. Het idee van de tweeborden-opgave
is w&eacute;l overgenomen, als afsluitende oefening 8, met `Serial` in plaats van
`Serial1`.

Die oefening is meteen herwerkt tot iets dat meer doet dan labo 6 herhalen. Ze
laat de student ondervinden dat een interrupt bij de z&eacute;nder niets
oplevert zolang de ontv&aacute;nger in een `delay()` vastzit, en dwingt hem zijn
looplicht om te bouwen naar een `millis()`-wachtlus. Dat is de eerlijke grens
van het onderwerp, en het is een betere afsluiter dan nog een PCF8574-variant.

---

## L7-09 &middot; BEGRIP &middot; hindert &middot; opgelost

**Pagina:** de theoriepagina `Interrupts` in de bron (nu
[PollenEnInterrupts.html](../Labo7/Reference/PollenEnInterrupts.html))

**Wat de student raakt:** twee kleinere dingen op dezelfde pagina.

**De voorbeeldcode compileert niet.** Er staat twee keer `void loop` zonder
haakjes. Dat is een overtypfout, maar wel eentje die de student als eerste
tegenkomt en die hem doet twijfelen aan de rest.

Dezelfde voorbeelden doen `pinMode(inputPin, INPUT)` en testen dan op `LOW`. Dat
is een zwevende ingang. Labo 0 leert `INPUT_PULLUP` en heeft er een hele
referentiepagina over
([PullUpPullDown.html](../Labo0/Reference/PullUpPullDown.html)). De illustratie
erbij toont wel netjes een externe pull-up van 10 k&Omega;, dus de tekening en
de code zeggen niet hetzelfde.

**De definitie nodigt uit tot een misvatting.** De bron omschrijft een interrupt
als iets dat "na elke instructiecyclus even gaat checken of er soms een
interruptbron geactiveerd werd". Dat is als beschrijving van het
d&iacute;spatchmoment verdedigbaar, maar de formulering leest als "een interrupt
is gewoon heel snel pollen". En dan is het verschil met een `digitalRead()` in
je `loop()` alleen een kwestie van graad, terwijl het in werkelijkheid een
verschil in soort is: de flank wordt in hardware vastgehouden, ook als je
programma iets anders aan het doen was.

**Beslissing:** de fouten zijn rechtgezet. De definitie is herschreven zonder in
registers te duiken, met een opmerkingskader dat de misvatting expliciet
neerhaalt: "Een interrupt is geen heel snel pollen." De illustratie met de
externe pull-up is overgenomen, met een bijschrift dat zegt dat je die weerstand
met `INPUT_PULLUP` niet nodig hebt.

Het noodstopverhaal uit de handout van week 10 is de opening van de pagina
geworden, inclusief de vraag "hoe lang moet je die noodstop ingedrukt houden?".
Dat is het sterkste didactische moment in het hele bronmateriaal, en het stond
alleen in de slides, niet online.

---

## L7-10 &middot; BEELD &middot; blokkeert &middot; open

**Pagina:** [NoodstopOverDeSerieleLijn.html](../Labo7/Exercises/NoodstopOverDeSerieleLijn.html)

**Wat de student raakt:** oefening 8 is de enige van het labo met twee borden,
en heeft als enige geen schema uit de bron (de opgave stond alleen op de
verouderde contentpagina, zonder afbeelding). De bedrading staat wel in een
tabel, maar twee Arduino's met gekruiste Tx/Rx is precies het soort ding waar
een tekening onmisbaar is.

De vier oefeningen met een PCF8574 hebben hun schema uit de export
overgenomen, dus daar is dit geen probleem.

**Beslissing:** placeholder `TODO-noodstop-over-serieel-schema.png` in de
pagina, zoals de drie gelijkaardige gevallen in labo 6 (L6-11). Blijft als
niet-blokkerende waarschuwing in `check-content.sh` staan tot de tekening er is.

**Status: open.** Vraagt een TinkerCAD-screenshot, en dat kan alleen jij maken.
