# Review labo 5 | studentbril

Laatste ronde: 2026-07-27. Gelezen: de vijf theoriepagina's en alle tien de
oefeningen zoals ze uit de Brightspace-export kwamen, plus de manifests van labo
0 t/m 4 als basislijn. Deze ronde liep **samen met de import**, dus de meeste
bevindingen zijn meteen mee verwerkt in de pagina's die nu onder `Labo5/` staan.

Voorkennis waarvan deze ronde vertrekt: na labo 0 t/m 4 kent de student
setup/loop, variabelen en types, selecties, iteraties, functies met parameters,
arrays (ook tweedimensionaal), `pinMode`, `digitalRead`/`digitalWrite`, pull-up
en pull-down, `INPUT_PULLUP`, sourcen en sinken, debouncen, flankdetectie,
seri&euml;le debug-uitvoer, de wet van Ohm, `analogRead`/`analogWrite`, PWM,
`map()`, `millis()`, de spanningsdeler, de LDR, bibliotheken toevoegen, I&sup2;C,
de PCF8574 en het I&sup2;C-LCD.

**Dit labo had de meeste echte fouten van alle vijf.** Niet didactische
onhandigheden maar drie dingen die technisch niet klopten (L5-01, L5-02, L5-04),
waarvan er twee een student met werkende code toch een niet-werkende schakeling
opleveren. Daar staat tegenover dat de opbouw servo &rarr; DC met transistor &rarr;
DC met H-brug &rarr; stappenmotor op zich uitstekend is: elke motorsoort brengt
precies &eacute;&eacute;n nieuw stuk elektronica binnen. Wat ontbrak was de
theorie eronder, niet de volgorde.

Onderzocht en g&eacute;&eacute;n bevinding:

- **De 40 mA per pin** die de bron overal aanhaalt is de absolute grens uit de
  datasheet en niet de aanbevolen 20 mA. De hele cursus rekent al met 40 mA, dus
  dat is zo gebleven, met de nuance "en zelfs dat is een grens waar je liever ver
  onder blijft" erbij op [DCMotor.html](../Labo5/Reference/DCMotor.html).
- **De datasheet heet P2N2222A en de tekst spreekt van 2N2222.** Dat is geen
  fout: TinkerCAD modelleert de 2N2222 en de P2N2222A is dezelfde transistor in
  een andere behuizing. De referentie-entry noemt nu allebei.
- **Het LCD in de gevorderde oefening** komt uit labo 4 en is daar netjes
  ingevoerd, inclusief het adres en `LiquidCrystal_I2C`. Geen sprong.

---

## L5-01 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** `Servo` in de bron (nu [Servo.html](../Labo5/Reference/Servo.html))

**Wat de student raakt:** de bronpagina zei "je moet een servo motor dus altijd
aansluiten op een pin met een **~** symbool", met in de voorbeeldcode de
commentaar `//moet op een PWM pin!`. Dat klopt niet. De Servo-bibliotheek
genereert de pulsen zelf via een timer en werkt op elke digitale pin. De pagina
sprak zichzelf bovendien tegen: ze vermeldde correct dat een servo 20 tot 50 Hz
wil, terwijl `analogWrite()` op ongeveer 490 Hz werkt. Een student die dit
gelooft, denkt dat hij vier van de zes PWM-pinnen kwijt is, en leert het
verkeerde model van wat PWM is.

Het gevaarlijke is dat het omgekeerde w&eacute;l waar is en nergens stond: zodra
er een servo actief is, werkt `analogWrite()` niet meer op pin 9 en pin 10.

**Besluit (2026-07-27):** aanvaard, optie 'rechtzetten in de pagina'. De
referentiepagina zegt nu expliciet dat elke digitale pin werkt, legt uit
waar&oacute;m de `~`-redenering niet opgaat, en waarschuwt wel voor het echte
neveneffect op pin 9 en 10. Er staat een aparte waarschuwingsbox die het verschil
tussen het servosignaal en `analogWrite()` uitlegt.

**Status:** opgelost, 2026-07-27

---

## L5-02 &middot; OPDRACHT &middot; blokkeert &middot; opgelost

**Pagina:** `labo 5: basis oefening 3a` in de bron (nu
[DraairichtingMetL293.html](../Labo5/Exercises/DraairichtingMetL293.html) en
[SnelheidEnRichtingMetL293.html](../Labo5/Exercises/SnelheidEnRichtingMetL293.html))

**Wat de student raakt:** de voorbeeldcode zette `const int pin12Enable = 13;`,
en het schema bedraadde de enable van de L293 ook echt op pin 13. Onderaan
dezelfde pagina stond: "Maak een betere versie van het programma met behulp van
**analogWrite** waarbij de snelheid van de motor geregeld wordt." Pin 13 is geen
PWM-pin op de UNO. De voor de hand liggende oplossing, PWM op de enable, is met
die bedrading dus onmogelijk.

Het ergste eraan is dat het stil faalt. `analogWrite()` op pin 13 compileert en
gedraagt zich als `digitalWrite()`: alles vanaf 128 is voluit, alles eronder is
stil. De student ziet geen fout, alleen een motor die niet wil dimmen.

**Besluit (2026-07-27):** aanvaard, optie 'pinnen goed zetten vanaf de eerste
oefening'. De enable staat nu op **pin 3**, 1A op 4 en 2A op 5. De eerste
oefening legt in een tipbox uit waarom de enable meteen op een `~`-pin komt, ook
al heeft ze die daar zelf nog niet nodig, zodat er straks geen draad verlegd moet
worden. De tweede oefening heeft een waarschuwingsbox over precies deze stille
fout. Zie L5-12 voor het schema dat daarbij hoort.

**Status:** opgelost, 2026-07-27

---

## L5-03 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** `Transistor en DC motor` in de bron (nu
[TransistorAlsSchakelaar.html](../Labo5/Reference/TransistorAlsSchakelaar.html))

**Wat de student raakt:** op het schema van de transistorschakeling staat een
**vrijloopdiode** over de motor, en die is ook echt nodig. In de tekst komt het
woord diode niet &eacute;&eacute;n keer voor. De pagina behandelt basis,
collector, emitter, Vbe, hFE, saturatie en de berekening van Rb, en stapt over
het enige onderdeel heen dat er staat om te voorkomen dat de transistor sneuvelt.

De student neemt het schema over zonder te weten wat dat component doet, en laat
het weg zodra hij zelf iets bouwt. In TinkerCAD merkt hij daar niets van, want de
simulator modelleert de spanningspiek van een uitschakelende spoel niet. Op een
echt breadboard is het het verschil tussen een schakeling die blijft werken en
een transistor die stukgaat.

**Besluit (2026-07-27):** aanvaard, optie 'eigen sectie op de referentiepagina'.
Er staat nu een sectie *De vrijloopdiode* die uitlegt waarom een spoel zijn
stroom niet laat ophouden, wat er dan met de transistor gebeurt en waarom de
diode omgekeerd staat. De oefening
[DCMotorMetTransistor.html](../Labo5/Exercises/DCMotorMetTransistor.html) heeft
een waarschuwingsbox die naar die sectie verwijst en een checklistregel. Op
[HBrug.html](../Labo5/Reference/HBrug.html) staat er een pendant bij: bij de
L293**D** zitten die diodes al in het IC, en dat is waar de D voor staat.

**Status:** opgelost, 2026-07-27

---

## L5-04 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** `Stappenmotoren` in de bron (nu
[Stappenmotor.html](../Labo5/Reference/Stappenmotor.html))

**Wat de student raakt:** de voorbeeldcode op de theoriepagina bekrachtigde
`pinMotor1` t/m `pinMotor4` in die volgorde. Het diagram er vlak boven toont een
rotor die per stap een kwartslag verder draait: spoel A, spoel B, spoel A
omgekeerd, spoel B omgekeerd. Hangen de vier pinnen op 1A, 2A, 3A en 4A van een
L293, dan is de codevolgorde A+, A-, B+, B-, en dat is niet dezelfde reeks. De
rotor springt dan van 0 naar 180 naar 90 graden: hij trilt in plaats van te
draaien.

De code en de tekening spraken elkaar dus tegen, en de pagina zei er enkel bij:
"Bekijk eens de code en probeer te snappen wat er gebeurt." Er stond ook geen
`pinMode`, geen declaratie en geen `waitTime`, dus het fragment was niet te
compileren en de student kon het niet nakijken door het uit te proberen.

**Besluit (2026-07-27):** aanvaard, optie 'expliciete stappentabel'. De
referentiepagina heeft nu een tabel die per stap zegt welke van de vier
Arduino-pinnen hoog staat en welke spoel dat is, met een aansluittabel erboven
die vastlegt welke pin aan welke spoel hangt. Er staat een waarschuwingsbox bij
met de titel *De volgorde is A, B, A, B en niet A, A, B, B*, die precies deze
fout beschrijft en zegt waaraan je ze in de simulatie herkent. De code is
vervangen door een tweedimensionale array met een volledige `zetStap()`-functie.

**Status:** opgelost, 2026-07-27

---

## L5-05 &middot; SPRONG &middot; blokkeert &middot; opgelost

**Pagina's:** `Stappenmotoren` tegenover `labo 5: basis oefening 7` in de bron

**Wat de student raakt:** de theoriepagina toonde half step als een afbeelding
met het onderschrift "One phase, half step", en verder niets. Geen tabel, geen
uitleg van wat er anders is, geen zin erover in de lopende tekst. Oefening 7
vroeg vervolgens: "Gebruik een tweede schuifschakelaar om te schakelen tussen
full-step en half-step." De student moest dus een aansturing implementeren
waarvan hij alleen een plaatje had gezien.

**Besluit (2026-07-27):** aanvaard, optie 'half step een eigen sectie geven'.
[Stappenmotor.html](../Labo5/Reference/Stappenmotor.html) heeft nu een sectie
*Half step* met de volledige tabel van acht stappen, de uitleg dat je twee
spoelen tegelijk bekrachtigt om de rotor ertussenin te zetten, en een tipbox die
laat zien dat stap 1, 3, 5 en 7 samen de full-steptabel zijn. Die laatste
observatie is meteen de sleutel tot de oefening: &eacute;&eacute;n tabel van acht
rijen volstaat, en full step is dezelfde tabel met stappen van twee.

**Status:** opgelost, 2026-07-27

---

## L5-06 &middot; OPDRACHT &middot; blokkeert &middot; opgelost

**Pagina:** `labo 5: basis oefening 3b` in de bron (nu
[DCMotorMetL298N.html](../Labo5/Exercises/DCMotorMetL298N.html))

**Wat de student raakt:** deze "oefening" bevatte geen opdracht. Ze bestond uit
&eacute;&eacute;n zin ("Zelfde oefening als basis oefening 3a maar deze keer met
de L298N"), een vergelijkingstabel tussen de L293 en de L298, drie foto's van de
bedrading en een uitleg over de misleidende 12V-klem. Er stond geen vraag in,
geen checklist, en geen indienen-sectie, terwijl elke andere oefening van het
labo die wel had. Als staat in Brightspace stond ze wel als opdracht ingesteld.

Het was dus in feite referentiemateriaal over de L298N, dat toevallig in de
oefeningenmap hing.

**Besluit (2026-07-27):** aanvaard, optie 'een echte opdracht van maken'.
Bespoken met de opdrachtgever, die de oefening als aparte oefening wou behouden.
De pagina vraagt nu expliciet om de vorige schakeling opnieuw te bouwen op een
L298N-module met ongewijzigde code, en motiveert waarom dat een re&euml;le
opdracht is: je krijgt later zelden een nieuw schema, je krijgt een datasheet.
De vergelijkingstabel L293D/L298N is mee verhuisd naar
[HBrug.html](../Labo5/Reference/HBrug.html), waar ze thuishoort, en de oefening
verwijst ernaar. De checklist vraagt onder meer of de student de vertaling tussen
beide pinbenamingen kan uitleggen.

**Status:** opgelost, 2026-07-27

---

## L5-07 &middot; OPDRACHT &middot; vertraagt &middot; opgelost

**Pagina:** `labo 5: basis oefening 3a` in de bron

**Wat de student raakt:** deze ene pagina bevatte twee opdrachten. Eerst de
drempelversie (links onder 512, rechts erboven), dan een ingebouwde vraag over
waarom die code slecht is, en dan als slotzin: "Maak een betere versie van het
programma met behulp van **analogWrite** waarbij de snelheid van de motor
geregeld wordt." Dat tweede stuk is een andere oefening met een ander concept,
verstopt in de laatste regel van de eerste.

**Besluit (2026-07-27):** aanvaard, gesplitst in twee oefeningen.
[DraairichtingMetL293.html](../Labo5/Exercises/DraairichtingMetL293.html) doet de
richting, [SnelheidEnRichtingMetL293.html](../Labo5/Exercises/SnelheidEnRichtingMetL293.html)
doet snelheid plus zacht omkeren. De vraag over de 10000 toeren staat nu bovenaan
de tweede oefening, waar ze dient als motivatie in plaats van als losse
bedenking, met een uitgebreider antwoord dat ook de elektrische kant (de motor
die even als generator werkt) noemt.

**Status:** opgelost, 2026-07-27

---

## L5-08 &middot; OPDRACHT &middot; vertraagt &middot; opgelost

**Pagina's:** `labo 5: basis oefening 5` en `labo 5: basis oefening 8` in de bron

**Wat de student raakt:** oefening 5 was "Voorzie een schuifschakelaar die de
richting van bewegen van de stappenmotor instelt." Oefening 8 was "Vervang de
schuifschakelaar die de richting regelt door een drukknop." Twee oefeningen voor
&eacute;&eacute;n concept, waarbij de tweede de eerste letterlijk ongedaan maakt.
Al het nieuwe zit in de tweede: flankdetectie en ontdenderen.

**Besluit (2026-07-27):** aanvaard, samengevoegd. Beslist in overleg met de
opdrachtgever ("fold 5 into 8"). De schuifschakelaarversie staat nu als tipbox in
[StappenmotorRichtingMetDrukknop.html](../Labo5/Exercises/StappenmotorRichtingMetDrukknop.html),
als tussenstap voor wie vastloopt: bouw het eerst met een schakelaar zodat je
weet of het probleem in de knop of in je richtinglogica zit. De demonstratievideo
van de schuifschakelaarversie is vervallen, die van de drukknop is behouden.

**Status:** opgelost, 2026-07-27

---

## L5-09 &middot; OPDRACHT &middot; detail &middot; opgelost

**Pagina:** `labo 5: basis oefening 6` in de bron

**Wat de student raakt:** "Gebruik op A0 een potentiometer om de snelheid van de
stappenmotor te regelen." Dat is een `analogRead` en een `map()` naar de
wachttijd, allebei uit labo 2, toegepast op een schakeling die al staat. Er komt
geen nieuw idee bij. Als aparte oefening met eigen XP staat ze op gelijke voet
met bijvoorbeeld het half-stepverhaal, dat wel iets nieuws vraagt.

**Besluit (2026-07-27):** aanvaard, opgenomen als *Uitbreiding* in
[StappenmotorInFullStep.html](../Labo5/Exercises/StappenmotorInFullStep.html),
met een eigen checklistregel en de bijhorende video. De tekst legt er wel bij uit
waarom je bij een stappenmotor de snelheid niet met PWM regelt maar met de
wachttijd, plus wat er gebeurt als je te snel gaat (stappen overslaan). Dat is
het enige stukje inhoud dat de oefening had, en het is dus niet verloren.

**Let op:** dit is de enige structuurbeslissing die niet expliciet met de
opdrachtgever is afgetoetst. Het mandaat was "minder is meer, elke oefening moet
een concept binnenbrengen". Wil je deze toch terug als aparte oefening, dan is
dat een kwestie van de sectie *Uitbreiding* naar een eigen pagina tillen en een
`order` bijschuiven.

**Status:** opgelost, 2026-07-27

---

## L5-10 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** `labo 5: gevorderde oefening 1` in de bron (nu
[RolluikMetLdrEnEindeloopschakelaars.html](../Labo5/Exercises/RolluikMetLdrEnEindeloopschakelaars.html))

**Wat de student raakt:** de opdracht vroeg "Voorzie ook een **hysteresis** zodat
bij halve duisternis de rolluiken niet beginnen oscilleren." Het woord hysteresis
komt nergens anders in de cursus voor, en de opdracht legt niet uit wat het is,
alleen waar het goed voor is. Wie het niet kent, kan het ook niet opzoeken zonder
op zoekresultaten over magnetisme uit te komen.

**Besluit (2026-07-27):** aanvaard, optie 'uitleggen op de oefeningpagina zelf'.
Er staat nu een sectie *Hysteresis: waarom &eacute;&eacute;n drempel niet
volstaat*, die eerst het probleem uitspeelt (499, 501, 498, en het luik gaat de
hele avond op en neer), dan de twee drempels met de dode zone ertussen in een
tabel zet, en afsluit met de thermostaat als bekend voorbeeld. Geen aparte
referentiepagina, omdat het begrip in dit labo maar op &eacute;&eacute;n plaats
nodig is. Het idee wordt wel al voorbereid in de oplossing van
[SnelheidEnRichtingMetL293.html](../Labo5/Exercises/SnelheidEnRichtingMetL293.html),
waar een opmerkingsbox de dode zone rond het midden van de potentiometer
aanhaalt en vooruitwijst naar deze oefening.

**Status:** opgelost, 2026-07-27

---

## L5-11 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** `labo 5: gevorderde oefening 1` in de bron

**Wat de student raakt:** "Denk ook na over **beveiliging van de drukknoppen**,
zodat er geen gevaarlijke situatie ontstaat wanneer een knop kapot gaat, of een
draad breekt." Dit is het beste idee van de hele opdracht, en tegelijk het enige
waar de student geen enkel aanknopingspunt voor krijgt. Draadbreukbeveiliging is
geen programmeerprobleem: je lost het op door een verbreekcontact te gebruiken in
plaats van een maakcontact, en dat is een keuze in de bedrading. Een student die
alleen naar zijn code kijkt, komt daar nooit op.

**Besluit (2026-07-27):** aanvaard, optie 'uitleggen met de tabel erbij'. De
pagina heeft nu een sectie *Wat als een knop stukgaat?* die begint met de vraag
als spoiler (wat gaat er mis?), het kernpunt benoemt dat een gebroken draad er
voor je programma identiek uitziet als een niet-ingedrukte knop, en dan met een
tabel van drie situaties het verschil tussen maak- en verbreekcontact toont. Er
staat een waarschuwing bij dat dit je logica omkeert. De oplossing gebruikt
`INPUT_PULLUP` met verbreekcontacten, en de checklist vraagt om in de simulatie
een draad los te trekken en te controleren dat de motor dan stopt.

**Status:** opgelost, 2026-07-27

---

## L5-12 &middot; BEELD &middot; vertraagt &middot; open

**Pagina:** [DraairichtingMetL293.html](../Labo5/Exercises/DraairichtingMetL293.html)

**Wat de student raakt:** door L5-02 klopt het originele TinkerCAD-schema niet
meer. Daarop hangt de enable van de L293D op pin 13, en de tekst gebruikt nu pin
3, 4 en 5. Een schema dat andere pinnen toont dan de tekst is erger dan geen
schema, dus staat er voorlopig `TODO-l293d-dc-motor-schema.png`.

Het gaat om **&eacute;&eacute;n screenshot**, dat op twee pagina's dienst doet
(de richtingoefening en de snelheidsoefening delen dezelfde schakeling). De
oorspronkelijke TinkerCAD-tekening hoeft alleen herbedraad te worden: enable van
13 naar 3, 1A van 11 naar 4, 2A van 10 naar 5. De rest blijft.

Het schema van de H-brug-referentiepagina met dezelfde oude bedrading is niet
overgenomen; die pagina toont nu de pinout met de pinfunctietabel, wat voor een
referentiepagina toch nuttiger is.

**Besluit (2026-07-27):** open. Dit is het enige dat nog van jou moet komen.

**Status:** open

---

## L5-13 &middot; OPDRACHT &middot; detail &middot; opgelost

**Pagina's:** meerdere bronpagina's

**Wat de student raakt:** een reeks kleine dingen die samen laten zien dat de
bron een tijd niet meer nagelezen is:

- `labo 5: basis oefening 8` had als titel op de pagina zelf **"Basis oefening
  9"**. Er bestaat geen oefening 9.
- De theoriepagina `Stappenmotoren` had als `<h1>` het woord **"Inleiding"**.
- Het codeblok op de servopagina was **stuk**: er stonden letterlijk
  `<servo.h>`-tags door de sketch heen en de indentatie bestond uit
  `&nbsp;`-tekens. De begeleidende tekst beschreef bovendien "twee lussen" met
  "een variabele pos", terwijl de code zes losse `write()`-aanroepen deed en `i`
  gebruikte.
- Alle tien de oefeningen heetten "basis oefening N" of "gevorderde oefening 1",
  wat regel 6 van `check-content.sh` sowieso blokkeert.
- De pagina `DC motor` bevatte een **hotlink naar een productfoto van Farnell**,
  precies het soort link dat regel 4 verbiedt omdat hij midden in het semester
  kan sneuvelen.

**Besluit (2026-07-27):** aanvaard, alles rechtgezet bij de conversie. Elke
oefening heeft een naam die zegt wat je bouwt, de servocode is herschreven als
twee werkende sketches (vaste hoeken en sweep) met de tekst eromheen
overeenkomstig, en de Farnell-hotlink is geschrapt in plaats van
overgenomen. Er stond al een bruikbare TinkerCAD-afbeelding op die pagina.

**Status:** opgelost, 2026-07-27
