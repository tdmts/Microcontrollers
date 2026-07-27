# Review labo 6 | studentbril

Laatste ronde: 2026-07-27. Gelezen: de ene theoriepagina en de zes
dropboxopdrachten zoals ze uit de Brightspace-export kwamen, plus het
C#-project dat aan de laatste opdracht hing, en de manifests van labo 0 t/m 5
als basislijn. Deze ronde liep **samen met de import**, dus alle bevindingen
zijn meteen verwerkt in de pagina's die nu onder `Labo6/` staan.

Voorkennis waarvan deze ronde vertrekt: na labo 0 t/m 5 kent de student
setup/loop, variabelen en types, selecties, iteraties, functies met parameters,
arrays, `pinMode`, `digitalRead`/`digitalWrite`, `INPUT_PULLUP`, debouncen,
`analogRead`/`analogWrite`, PWM, `map()`, `millis()`, bibliotheken toevoegen,
I&sup2;C, de PCF8574, het I&sup2;C-LCD en motoren.

En op precies &eacute;&eacute;n punt weinig: **serieel**. Grep over de hele
cursus: `Serial.begin` en `Serial.println` staan in vijftien pagina's, maar
altijd als debug-uitvoer. `Serial.read`, `Serial.available`, `parseInt`, UART,
RX, TX: nul treffers, repobreed. De enige ankerpagina is
[Debuggen.html](../Labo0/Reference/Debuggen.html), en die behandelt serieel
uitsluitend als een eenrichtingskanaal naar je scherm. De bronpagina van dit
labo opende met "het Serial-object kent meer functies dan alleen println(),
read() en available()", terwijl twee van die drie nooit onderwezen waren.

**Dit labo had de zwakste bron van de zeven.** Drie technische fouten, drie
opdrachten zonder opdracht, en een ladder die van "plak deze code" in &eacute;&eacute;n
stap naar een LCD-weerstation en een C#-desktopapplicatie sprong. De volgorde
van de bron is niet bijgestuurd maar herbouwd: acht oefeningen in plaats van
zes, waarbij er per keer &eacute;&eacute;n nieuw idee bijkomt.

Alle sketches op de pagina's van dit labo zijn met de echte Arduino-compiler
gebouwd (`bash scripts/check-content.sh --compile`, een regel die tijdens deze
ronde ontstaan is): 14 volledige programma's, foutloos en zonder
waarschuwingen. Bevinding L6-03 is daarmee niet langer een redenering maar een
vaststelling, want de bronversie gaf er precies de voorspelde
`-Wmultichar`-waarschuwing bij.

Onderzocht en g&eacute;&eacute;n bevinding:

- **De bedradingsfoto van de bron klopt.** Bij het uitpakken leek het alsof Tx
  aan Tx hing. Na inzoomen op beide printranden: de groene draad loopt van pin 1
  links naar pin 0 rechts en de gele omgekeerd. Netjes gekruist, met de massa
  eronder. De foto is overgenomen als
  `img/twee-arduinos-serieel-verbonden.png`.
- **`delay(30000)` in de bron** was geen fout maar wel onwerkbaar in een labo:
  dertig seconden wachten op het volgende teken. Overal vervangen door een
  seconde of minder, zonder aparte bevinding.
- **De twee losse pagina's** `labo 6 oefeningen` en `labo 6 serieel
  communiceren` in de export zijn lege omhulsels van 1058 bytes zonder inhoud.
  Er gaat niets verloren door ze te laten liggen.

---

## L6-01 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** `serieel communiceren` in de bron (nu
[TekensEnGetallen.html](../Labo6/Reference/TekensEnGetallen.html))

**Wat de student raakt:** de bronpagina legde uit dat een getal als tekens over
de lijn gaat, en illustreerde dat met `Serial.println(100)`: "krijgen we aan de
andere kant van de lijn 3 karakters binnen". Dat klopt niet. `println` zet er
een `\r` en een `\n` achter, dus het zijn er vijf. Met `Serial.print(100)` waren
het er wel drie.

Dat is geen muggenzifterij, want basisoefening 2 van diezelfde bron bestaat
volledig om die twee extra tekens te leren kennen. De theorie sprak dus haar
eigen oefening tegen, op precies het punt dat de oefening wou aanleren. Een
student die de theorie gelooft, kan het antwoord op oefening 2 niet vinden.

**Besluit (2026-07-27):** aanvaard, optie 'rechtzetten met een tabel'. De
referentiepagina toont nu `print` en `println` naast elkaar met de bytes erbij
(49 48 48 tegenover 49 48 48 13 10) en zegt expliciet dat die laatste twee het
enige zijn waaraan de ontvanger ziet waar een boodschap ophoudt. Oefening 2
laat de student die vijf bytes zelf met `Serial.read()` tellen.

**Status:** opgelost, 2026-07-27

---

## L6-02 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** `labo 6: basis oefening 5` in de bron (nu
[BoodschappenMetEenSleutel.html](../Labo6/Exercises/BoodschappenMetEenSleutel.html)
en [WeerstationOpLcd.html](../Labo6/Exercises/WeerstationOpLcd.html))

**Wat de student raakt:** de opgave beschrijft drie sensoren die elk hun waarde
sturen, voorafgegaan door een letter C, W of H, op onvoorspelbare momenten. De
hint zegt: "Gebruik `Serial.find()` om het leven wat makkelijker te maken."

`Serial.find()` leest de datastroom en gooit alles weg tot het zijn doeltekst
tegenkomt. Zoek je dus naar `"C"`, dan vernietig je elke W- en H-boodschap die
ondertussen binnenkomt. En je weet op voorhand niet welke van de drie er als
volgende aankomt, want dat is nu net de opgave. **De voorgestelde techniek kan
het gestelde probleem niet oplossen.** Een student die de hint volgt, zit vast
en denkt dat het aan hem ligt.

De bron verergerde dat nog: de hint verwijst naar "de uitleg van dit labo" voor
wat `find()` doet, en die uitleg bestaat uit &eacute;&eacute;n zin in een
opmerkingsblok, zonder voorbeeld.

**Besluit (2026-07-27):** aanvaard, optie 'techniek vervangen, opdracht
behouden'. `Serial.find()` komt in dit labo niet meer voor. In de plaats staat
een boodschapsvorm `SLEUTEL:WAARDE` (`TEMP:20.5`, `WIND:124`, `HUMIDITY:55`):
lijn lezen, `indexOf(':')`, splitsen met `substring()`, en dan een `if` per
sleutel. Dat werkt ongeacht de volgorde, verliest niets, en is uitgeschreven op
[Strings.html](../Labo6/Reference/Strings.html). Beslissing van de gebruiker
tijdens het interview.

De opgave zelf is bewaard en gesplitst over twee oefeningen: eerst het
uiteenhalen met uitvoer naar de monitor, daarna hetzelfde op het LCD. Dat haalt
de grootste sprong uit het labo (zie L6-07).

**Status:** opgelost, 2026-07-27

---

## L6-03 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** `labo 6: basis oefening 6` in de bron (nu
[ArduinoAansturenVanafPc.html](../Labo6/Exercises/ArduinoAansturenVanafPc.html))

**Wat de student raakt:** de voorbeeldcode gebruikt
`Serial.readStringUntil('\r\n')`. Tussen enkele aanhalingstekens hoort
&eacute;&eacute;n teken, en hier staan er twee. In C++ heet dat een
multi-character constant: de compiler geeft een waarschuwing en de waarde is
implementatie-afhankelijk. Het werkt alleen omdat de afkapping toevallig op
`'\n'` uitkomt.

Elke checklist in deze cursus eindigt met "geen errors of warnings in de log".
De voorbeeldcode van de cursus zelf haalde die checklist niet, en een student
die de waarschuwing wel ziet, heeft geen enkele manier om te weten dat ze niet
van hem komt.

**Besluit (2026-07-27):** aanvaard, optie 'rechtzetten en uitleggen'. Overal
staat nu `readStringUntil('\n')` met een `trim()` erachter voor de overblijvende
`\r`. Op [BoodschappenLezen.html](../Labo6/Reference/BoodschappenLezen.html)
staat een waarschuwingsblok dat precies deze fout benoemt, want ze staat in
ontelbare voorbeelden op het internet.

**Status:** opgelost, 2026-07-27

---

## L6-04 &middot; OPDRACHT &middot; blokkeert &middot; opgelost

**Pagina's:** `labo 6: basis oefening 1`, `2` en `3` in de bron

**Wat de student raakt:** alle drie eindigen ze met "Klik op Voeg nieuwe
inzending toe (groene knop) en los de vragen op." Die vragen bestaan alleen in
het Brightspace-inzendformulier, niet in de tekst. Zoals ge&iuml;mporteerd zijn
het dus drie opeenvolgende pagina's zonder opdracht: plak deze code over, kijk
naar de uitvoer, klaar. De student bouwt niets, kiest niets en beslist niets.

Dit is dezelfde vorm als L5-06, en hier drie keer na elkaar.

**Besluit (2026-07-27):** aanvaard, optie 'samenvoegen en een echte opdracht
maken'. Beslissing van de gebruiker tijdens het interview, met de opdracht "ik
heb oefeningen nodig die betrouwbaar werken en makkelijk te begrijpen zijn".

De drie demo's zijn &eacute;&eacute;n oefening geworden
([GetalNaarTweedeArduino.html](../Labo6/Exercises/GetalNaarTweedeArduino.html)):
bouw de bedrading, krijg het werkend, en tel daarna zelf met `Serial.read()` de
vijf bytes die er echt over gaan. Het onderscheid print/println/read/parseInt
dat de bron over drie pagina's uitsmeerde, staat nu op
[TekensEnGetallen.html](../Labo6/Reference/TekensEnGetallen.html), waar een
student het terugvindt zonder een oefening open te klappen.

**Status:** opgelost, 2026-07-27

---

## L6-05 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** de hele bron

**Wat de student raakt:** nergens in de bron staat dat Rx en Tx op de UNO de
pinnen 0 en 1 zijn, en dat die gedeeld worden met de USB-poort. Twee gevolgen,
allebei praktisch:

- Op echte hardware mislukt het uploaden zolang er draden op pin 0 en 1 zitten.
  Dat is het klassieke uur zoeken naar een fout die er niet is.
- De student heeft vijf labo's lang pin 0 en 1 nooit gebruikt zonder ooit te
  horen waarom, en krijgt hier de kans om dat te begrijpen.

De bron zegt wel "we hebben genoeg aan 3 draden: Rx, Tx en GND" maar noemt geen
enkel pinnummer.

**Besluit (2026-07-27):** aanvaard, optie 'eigen sectie op de theoriepagina'.
[SerieelKanaal.html](../Labo6/Reference/SerieelKanaal.html) heeft een sectie
"Rx en Tx zijn pin 0 en pin 1" met het printopschrift erbij, en een
waarschuwingsblok over het conflict met de USB-kabel. Het labo draait in
TinkerCAD, waar dat conflict niet bestaat, dus het blok zegt er expliciet bij
dat je het toch moet onthouden voor de dag dat je dit op een echt bord bouwt.

**Status:** opgelost, 2026-07-27

---

## L6-06 &middot; SPRONG &middot; blokkeert &middot; opgelost

**Pagina:** `serieel communiceren` in de bron

**Wat de student raakt:** de theoriepagina begint met "het Serial-object kent
heel wat meer functies dan alleen maar println(), read() en available()". Na
labo 0 t/m 5 kent de student `Serial.begin()` en `Serial.print`/`println`, en
verder niets. `read()` en `available()` worden hier als bekend verondersteld
terwijl ze repobreed nul keer voorkomen. De pagina springt daarna meteen door
naar `parseInt()`, `parseFloat()` en `find()`.

De hele onderbouw ontbreekt: dat er een ontvangstbuffer is, dat je eerst kijkt
of er iets in zit, en dat lezen een byte uit die buffer weghaalt.

**Besluit (2026-07-27):** aanvaard, optie 'de ontbrekende laag als eigen
referentiepagina'.
[BoodschappenLezen.html](../Labo6/Reference/BoodschappenLezen.html) begint bij
de buffer van 64 bytes, dan `available()`, dan `read()` met wat je er echt uit
krijgt, en pas dan `readStringUntil()`. De eerste oefening van het labo gebruikt
alleen dat, met &eacute;&eacute;n bord en zonder tweede Arduino erbij.

`parseInt()` komt in het labo helemaal niet meer voor. Er stond eerst een sectie
op die pagina die uitlegde waar&oacute;m het je nullen geeft tussen je waarden,
als tegenhanger van basisoefening 3 uit de bron. Die is er op vraag van de
gebruiker (2026-07-27) weer uitgehaald: een student die `parseInt()` nooit ziet,
heeft ook geen uitleg nodig over waarom hij het niet gebruikt, en de pagina
wordt er alleen langer van. Wie het toch in een internetvoorbeeld tegenkomt,
komt er vanzelf mee terug.

**Status:** opgelost, 2026-07-27

---

## L6-07 &middot; SPRONG &middot; blokkeert &middot; opgelost

**Pagina's:** de zes bronoefeningen als reeks

**Wat de student raakt:** de ladder van de bron loopt zo: oefening 1, 2 en 3
zijn dezelfde tien regels code met telkens &eacute;&eacute;n instructie anders
en geen opdracht. Oefening 4 is de eerste echte taak. Oefening 5 vraagt in
&eacute;&eacute;n keer drie boodschapsoorten uit elkaar houden, framing
begrijpen, en dat op een LCD zetten. Oefening 6 vraagt een C#-desktopapplicatie,
de `String`-klasse en een COM-poort.

Van niets naar alles in twee stappen, met drie lege treden ervoor. Er zat ook
geen enkele oefening tussen die de brug legt van "Serial is iets wat ik naar
mijn scherm schrijf" naar "Serial is een kanaal met twee kanten".

**Besluit (2026-07-27):** aanvaard, optie 'de ladder herbouwen'. Beslissing van
de gebruiker tijdens het interview. Acht oefeningen, elk met &eacute;&eacute;n
nieuw idee:

| # | Oefening | Het ene nieuwe ding |
|---|---|---|
| 1 | LED schakelen vanuit de seri&euml;le monitor | Serial gaat naar binnen. E&eacute;n bord. |
| 2 | Een getal doorsturen naar een tweede Arduino | De tweede Arduino en de bedrading. |
| 3 | Een drukknop hier, een LED daar | Een opdracht sturen, en alleen bij verandering. |
| 4 | Een potentiometerwaarde doorsturen en dimmen | Een meting sturen, en hoe vaak dat mag. |
| 5 | Drie getallen doorsturen en optellen | Meerdere waarden na elkaar, en de ontsporing. |
| 6 | Drie soorten boodschappen uit elkaar houden | De sleutel die de ontsporing oplost. |
| 7 | Weerstation op het LCD | Het LCD uit labo 4 erbij. |
| 8 | De Arduino aansturen vanaf je pc | De pc als gesprekspartner. |

Oefening 5 en 6 zijn bewust een paar: oefening 5 laat de student de ontvanger
halverwege resetten en zelf zien dat de som daarna blijvend niet meer klopt.
Dat is de "Let op"-doos uit de bronpagina, omgezet in iets wat je meemaakt in
plaats van leest. Oefening 6 geeft er dan de oplossing voor.

**Status:** opgelost, 2026-07-27

---

## L6-08 &middot; OPDRACHT &middot; vertraagt &middot; opgelost

**Pagina:** `labo 6: basis oefening 4` in de bron (nu
[DrieGetallenOptellen.html](../Labo6/Exercises/DrieGetallenOptellen.html))

**Wat de student raakt:** "genereert drie willekeurige getallen met de random()
functie in het bereik van 0-1000 en stuurt deze door via het serieel kanaal".
Drie problemen in &eacute;&eacute;n zin:

- Er staat niet dat de drie getallen gescheiden moeten worden. Doet de student
  dat met `Serial.print()`, dan komt er `123456789` binnen en is de opgave
  onoplosbaar. Dat is niet iets waar hij zelf op komt, want de bron heeft hem
  nooit verteld waarom `println` bestaat (zie L6-01).
- `random(0, 1000)` geeft 0 tot en met 999, niet tot 1000. De opgave zegt "het
  bereik van 0-1000".
- Zonder `randomSeed()` geeft `random()` na elke reset exact dezelfde reeks. Een
  student die dat niet weet, denkt dat zijn programma stuk is.

**Besluit (2026-07-27):** aanvaard, optie 'de drie punten expliciet maken'. De
opgave zegt nu met zoveel woorden dat elk getal op zijn eigen lijn gaat en
waarom. Er staat een opmerkingsblok over de bovengrens die niet meedoet, en een
tipblok over `randomSeed()`, met de eerlijke aantekening dat een losse pin in
TinkerCAD soms toch elke keer dezelfde waarde geeft.

**Status:** opgelost, 2026-07-27

---

## L6-09 &middot; OPDRACHT &middot; vertraagt &middot; opgelost

**Pagina:** `labo 6: basis oefening 5` in de bron

**Wat de student raakt:** de opgave zegt "De sensoren zelf mag je voorstellen
door een potentiometer." E&eacute;n potentiometer voor drie sensoren, en er
staat niet op welke Arduino die dan hangt. De opgave beschrijft de binnenkomende
boodschappen alsof ze uit het niets komen, maar er staat nergens dat de student
de zendende kant ook zelf moet schrijven.

Verder: "De minimum waarde van deze sensor is -20&deg;C tot 60&deg;C" is geen
zin. Bedoeld is een bereik.

**Besluit (2026-07-27):** aanvaard, optie 'de opstelling uitschrijven'. De
opdracht zegt nu expliciet dat Arduino 1 voor weerstation speelt, de
potentiometer uitleest en die ene waarde afwisselend als temperatuur,
windrichting of vochtigheid doorstuurt, met `random()` voor de keuze en een
willekeurige wachttijd ertussen. De drie bereiken staan in een tabel met een
voorbeeldboodschap erbij.

**Status:** opgelost, 2026-07-27

---

## L6-10 &middot; OPDRACHT &middot; detail &middot; opgelost

**Pagina:** het C#-project bij `labo 6: basis oefening 6`

**Wat de student raakt:** het meegeleverde C#-programma stuurde `LED AAN`,
`LED UIT` en `SENSOR`. Dat is een vierde notatie naast wat de rest van het labo
doet, en de student moet dus twee manieren van boodschappen uit elkaar halen
leren voor &eacute;&eacute;n idee.

Daarbij twee echte gebreken in de C#-code:

- `serialPort.ReadLine()` met de standaard `NewLine` van `"\n"` laat de `\r` van
  `Serial.println()` aan het antwoord plakken. Er staat dan rommel op het label.
- `ReadLine()` heeft standaard geen timeout. Antwoordt de Arduino niet, dan
  hangt het venster voorgoed vast, en dat gebeurt gegarandeerd terwijl de
  student zijn sketch nog aan het schrijven is.

**Besluit (2026-07-27):** aanvaard, optie 'het C#-project meeaanpassen'.
Beslissing van de gebruiker tijdens het interview: de boodschappen worden
`LED:1`, `LED:0` en `SENSOR:?`, zodat de pc exact dezelfde taal spreekt als de
twee Arduino's uit oefening 6 en 7. `Form1.cs` kreeg ook
`serialPort.NewLine = "\r\n"` en `serialPort.ReadTimeout = 2000`. De knopteksten
in het venster blijven ongewijzigd, dus de schermafbeelding uit de bron klopt
nog.

Het project is opnieuw gebouwd uit de aangepaste bron en herverpakt zonder
`.vs/`, `obj/`, `.pdb` en `.suo`, met de werkende exe in `bin/Debug`. Het staat
als `datasheets/serieel-communiceren-csharp.zip` en hangt via een categorie
Downloads aan de referentiehub.

**Status:** opgelost, 2026-07-27

---

## L6-11 &middot; BEELD &middot; vertraagt &middot; open

**Pagina's:**
[DrukknopHierLedDaar.html](../Labo6/Exercises/DrukknopHierLedDaar.html),
[PotentiometerwaardeDoorsturen.html](../Labo6/Exercises/PotentiometerwaardeDoorsturen.html),
[WeerstationOpLcd.html](../Labo6/Exercises/WeerstationOpLcd.html)

**Wat de student raakt:** de bron had &eacute;&eacute;n bedradingsfoto, die van
de kale seri&euml;le verbinding. Zodra er een component bijkomt, moet de student
uit een tabel afleiden hoe de twee borden samen op het breadboard staan. Dat is
precies het soort ding dat in een tekening in twee seconden duidelijk is.

De basisverbinding zelf staat er wel, en die is voor oefening 2, 5 en 6
voldoende, want daar komt geen enkel component bij.

**Besluit (2026-07-27):** aanvaard, optie 'placeholder met beschrijvende alt'.
De drie schema's staan als `TODO-`bestandsnaam in de pagina's, dus
`scripts/check-content.sh` blijft ze melden tot ze er zijn:

| Wat | Bestand |
|---|---|
| Twee borden, drukknop op pin 2 links, LED op pin 3 rechts | `TODO-drukknop-hier-led-daar-schema.png` |
| Twee borden, potentiometer op A0 links, LED op PWM-pin 3 rechts | `TODO-potentiometer-doorsturen-schema.png` |
| Twee borden, potentiometer links, I&sup2;C-LCD op A4/A5 rechts | `TODO-weerstation-lcd-schema.png` |

**Status:** open, wacht op de screenshots uit TinkerCAD

---

## L6-12 &middot; BEELD &middot; detail &middot; opgelost

**Pagina's:** `labo 6: basis oefening 1` en `2` in de bron

**Wat de student raakt:** beide oefeningen eindigen met "verklaar voor jezelf de
uitvoer, rekening houdend met de ASCII tabel" en tonen daaronder een
afbeelding. Die twee afbeeldingen zijn **byte-identiek** (zelfde SHA1, 244867
bytes), en het is allebei geen schermafbeelding van de uitvoer maar een
volledige ASCII-tabel van 128 rijen, met het watermerk van lookuptables.com
erover.

Twee dingen dus. Er is nergens een beeld van wat er nu eigenlijk in die monitor
verschijnt, terwijl de opdracht daarover gaat. En de enige afbeelding die er wel
staat is een gewatermerkte tabel van een derde partij, die in een publieke repo
zetten geen goed idee is.

**Besluit (2026-07-27):** aanvaard, optie 'vervangen door een eigen tabel'. De
afbeelding is niet ge&iuml;mporteerd. In de plaats staat op
[TekensEnGetallen.html](../Labo6/Reference/TekensEnGetallen.html) een Orion-tabel
met alleen de rijen die in dit labo tellen: `'0'` tot `'9'`, `'A'`, `':'`, `\r`
en `\n`, met de regelmaat erbij dat de cijfers op een rij staan. Voor de
volledige tabel staat er een link naar asciitable.com. Dat leest sneller dan 128
rijen en er zit geen watermerk op.

De uitvoer zelf is een oefeningsstap geworden in plaats van een plaatje: de
student telt de vijf bytes zelf met `Serial.read()`, en het antwoord staat in de
oplossing.

**Status:** opgelost, 2026-07-27

---

## L6-13 &middot; OPDRACHT &middot; detail &middot; opgelost

**Pagina:** `labo 6: basis oefening 6` in de bron (nu
[ArduinoAansturenVanafPc.html](../Labo6/Exercises/ArduinoAansturenVanafPc.html))

**Wat de student raakt:** een reeks kleine dingen die samen een oefening
onuitvoerbaar maken:

- De voorbeeldcode is een losse `loop()` zonder `setup()`, zonder
  `Serial.begin()`, zonder `pinMode()`, en met `digitalWrite(3, HIGH)` waarbij
  3 nergens gedefinieerd staat.
- Er is een tak voor `LED AAN` en geen enkele voor `LED UIT`, terwijl de
  applicatie die knop wel heeft.
- Er staat nergens dat de seri&euml;le monitor dicht moet terwijl het
  C#-programma verbonden is. Dat is de eerste muur waar iedereen tegenaan loopt,
  want de COM-poort kan maar door &eacute;&eacute;n programma tegelijk geopend
  worden.
- Er staat nergens hoe je te weten komt welke COM-poort het is.
- Nergens staat dat dit een oefening op echte hardware is, terwijl de rest van
  het labo in TinkerCAD gebeurt en TinkerCAD geen COM-poort heeft.

**Besluit (2026-07-27):** aanvaard, optie 'aanvullen'. De pagina opent met een
waarschuwingsblok dat dit de enige oefening op echte hardware is en waarom. De
volledige sketch staat in de oplossing, met beide takken. Er is een tabel die
per knop zegt wat er verstuurd wordt en wat er terugverwacht wordt, een
waarschuwingsblok over de bezette COM-poort in beide richtingen (monitor en
uploaden), en een tip waar je het poortnummer vindt.

**Status:** opgelost, 2026-07-27
