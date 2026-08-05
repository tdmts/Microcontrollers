# Review labo 0 | studentbril

Laatste ronde: 2026-07-26. Gelezen: beide oefeningen in volgorde, en alle veertien
referentiepagina's.

Voorkennis waarvan deze ronde vertrekt: geen. Dit is het begin van de cursus, de student
weet niets.

Onderzocht en g&eacute;&eacute;n bevinding:

- **Alle elf anchor-links** vanuit de oefeningen naar een `#kopje` op een referentiepagina
  wijzen naar een bestaand `id`. De contentcheck controleert dat niet, dus dit is met de
  hand nagegaan.
- **De externe pull-up in stap 2 van de begeleide oefening** lijkt te botsen met de tip op
  [PullUpPullDown.html:96](../Labo0/Reference/PullUpPullDown.html#L96) dat `INPUT_PULLUP`
  de eenvoudigste oplossing is, maar diezelfde stap biedt `INPUT_PULLUP` uitdrukkelijk aan
  als alternatief. Zelf een weerstand plaatsen om te snappen wat hij doet, is een
  verdedigbare didactische keuze.

---

## L0-01 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina's:** [digitalReadDigitalWrite.html:17](../Labo0/Reference/digitalReadDigitalWrite.html#L17)
en [Selecties.html:22](../Labo0/Reference/Selecties.html#L22), tegenover
[BegeleideOefening stap 3](../Labo0/Exercises/BegeleideOefening.html#L60),
[PullUpPullDown.html:80](../Labo0/Reference/PullUpPullDown.html#L80) en
[Debuggen.html:34](../Labo0/Reference/Debuggen.html#L34)

**Wat de student raakt:** `digitalReadDigitalWrite.html` stelt als feit dat
`digitalRead()` je vertelt "of een knop is ingedrukt (**HIGH**) of niet (**LOW**)", met
een voorbeeld dat `pinMode(pinButton, INPUT)` gebruikt zonder enige pull-weerstand en dan
test op `HIGH`. `Selecties.html` doet hetzelfde. De rest van labo 0 leert het omgekeerde:
stap 3 van de begeleide oefening laat de student er expliciet over redeneren en besluit
"ingedrukt = 0", en stap 4 laat hem dat zelf meten. Stap 4 &egrave;n stap 10 linken
rechtstreeks naar `digitalReadDigitalWrite.html`, dus de oefening stuurt de student naar
de pagina die het tegenovergestelde beweert. Daar komt bij dat beide voorbeelden een knop
op kale `INPUT` zetten zonder pull-weerstand, precies de zwevende ingang waar
[PullUpPullDown.html:69](../Labo0/Reference/PullUpPullDown.html#L69) voor waarschuwt.

**Besluit (2026-07-26):** aanvaard, optie 'uitleggen dat het van de bedrading
afhangt'. Waarschuwingsbox op
[digitalReadDigitalWrite.html](../Labo0/Reference/digitalReadDigitalWrite.html) en een
opmerkingsbox op [Selecties.html](../Labo0/Reference/Selecties.html), allebei met een link
naar `PullUpPullDown.html`, en met de vermelding dat de pull-upvorm in dit vak het vaakst
voorkomt. De codevoorbeelden zijn blijven staan zoals afgesproken.

Twee kleine toevoegingen buiten de gekozen optie, omdat de box anders in tegenspraak stond
met de tekst er vlak boven: de definitieregel op digitalReadDigitalWrite.html is neutraal
gemaakt ('leest of de pin hoog of laag staat'), en de `pinMode`-regel in het voorbeeld
vermeldt nu dat er een externe pull-downweerstand bij hoort, zodat het geen zwevende
ingang meer lijkt.

**Status:** opgelost, 2026-07-26

---

## L0-02 &middot; BEGRIP &middot; blokkeert &middot; opgelost

**Pagina:** [pinMode.html:38](../Labo0/Reference/pinMode.html#L38)

**Wat de student raakt:** het voorbeeld op de pinMode-pagina zet de led als ingang en de
knop als uitgang:

```cpp
const int pinLed = 2;
const int pinButton = 3;
pinMode(pinLed, INPUT);
pinMode(pinButton, OUTPUT);
```

Dit is precies de pagina waar de student naartoe gestuurd wordt om input van output te
leren onderscheiden: het is een onderzoeksvraag in Blink, een checklistregel, en twee van
de links in de begeleide oefening.
[digitalReadDigitalWrite.html:25](../Labo0/Reference/digitalReadDigitalWrite.html#L25)
gebruikt dezelfde twee constanten w&eacute;l met de juiste modes, wat het verschil extra
verwarrend maakt voor wie beide pagina's leest.

**Besluit (2026-07-26):** aanvaard. `pinMode(pinLed, OUTPUT)` en
`pinMode(pinButton, INPUT)`, met een commentaar per regel dat zegt waarom.

**Status:** opgelost, 2026-07-26

---

## L0-03 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina:** [pinMode.html:61](../Labo0/Reference/pinMode.html#L61)

**Wat de student raakt:** de pinMode-pagina noemt 40 mA als wat een pin kan leveren, "wat
genoeg is om een led aan te sturen", zonder de nuance dat 20 mA de veilige waarde is.
[SourcenSinken.html:24](../Labo0/Reference/SourcenSinken.html#L24), de oplossing van
[Blink](../Labo0/Exercises/Blink.html) en stap 9 van de begeleide oefening houden alle
drie 20 mA aan als praktijkwaarde en 40 mA als absoluut maximum. Blink maakt er bovendien
een onderzoeksvraag &egrave;n een checklistregel van, dus de student zoekt dit getal echt
op en vindt twee antwoorden. Ook de weerstandswaarde loopt uiteen: pinMode.html:62 noemt
"100 of 220 Ohm" als standaard, terwijl stap 7 en 8 van de begeleide oefening 160 &Omega;
berekenen en de regel opleggen om altijd naar boven af te ronden.

**Besluit (2026-07-26):** aanvaard, pinMode.html gelijkgeschakeld: 20 mA als veilige
praktijkwaarde en 40 mA als absoluut maximum, met een verwijzing naar `SourcenSinken.html`
voor de volledige uitleg. De weerstandszin noemt nu 220 Ohm voor een led op 5 V, met een
verwijzing naar de nieuwe pagina uit L0-07.

**Status:** opgelost, 2026-07-26

---

## L0-04 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina:** [BegeleideOefening stap 11](../Labo0/Exercises/BegeleideOefening.html#L213)
tegenover [Debouncen.html:35](../Labo0/Reference/Debouncen.html#L35)

**Wat de student raakt:** stap 11 zet `delay(100)` onvoorwaardelijk vlak na
`digitalRead()`, met de instructie "Voeg die toe na het uitlezen van de knop". De pagina
waarnaar die stap linkt zet de delay b&iacute;nnen de `if`, dus pas nadat er een
verandering gedetecteerd is, en beschrijft het ook zo: "zodra een ander niveau
gedetecteerd is, een pauze in het pollen inlassen". Wie doorklikt ziet twee verschillende
plaatsingen zonder dat iemand zegt of dat uitmaakt. (Welke van de twee technisch de betere
is, valt buiten deze review.)

**Besluit (2026-07-26):** aanvaard, stap 11 gelijkgemaakt aan `Debouncen.html`: de
`delay` staat nu binnen de `if`, na wat er bij een druk moet gebeuren, en de begeleidende
zin zegt dat ook. De vier volgende stappen (12 t/m 15) dragen dezelfde `loop()` mee en zijn
mee aangepast, anders zou de walkthrough zichzelf tegenspreken.

**Status:** opgelost, 2026-07-26

---

## L0-05 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina:** [Blink.html:25](../Labo0/Exercises/Blink.html#L25)

**Wat de student raakt:** de allereerste oefening van de cursus stelt vier
onderzoeksvragen (poort, sourcing/sinking, pinModes, standaard pinMode) en zet ze alle
vier in de checklist, maar verwijst bij geen enkele vraag naar een pagina. De links staan
pas in de oplossing. Een student op dag &eacute;&eacute;n kent de reference-hub nog niet,
dus blijft er weinig over dan de spoiler opendoen. Daarbij komt dat
[HardEnSoftware.html](../Labo0/Reference/HardEnSoftware.html), de pagina die zegt welke
hardware je koopt en welke software je installeert, vanuit g&eacute;&eacute;n enkele
oefening gelinkt wordt, terwijl Blink meteen begint met "Open de Arduino IDE".

**Besluit (2026-07-26):** aanvaard, optie 'links bij de vragen én HardEnSoftware
bovenaan'. Elke onderzoeksvraag noemt nu de referentiepagina waar je begint te zoeken, en
bovenaan staat een zin naar [Hard- en software](../Labo0/Reference/HardEnSoftware.html)
voor wie zijn kit of IDE nog niet heeft. Daarmee is die pagina ook niet langer
onbereikbaar vanuit de oefeningen.

**Status:** opgelost, 2026-07-26

---

## L0-06 &middot; BEELD &middot; vertraagt &middot; open

**Pagina:** [BegeleideOefening stap 5](../Labo0/Exercises/BegeleideOefening.html#L131) en
[stap 10](../Labo0/Exercises/BegeleideOefening.html#L208)

**Wat de student raakt:** beide stappen tonen een `TODO-`afbeelding die nog niet bestaat:
de LED met voorschakelweerstand op het breadboard, en de volledige schakeling met knop en
LED. Dat zijn precies de twee momenten waarop een beginner van schema naar breadboard moet
stappen. De contentcheck meldt ze al als niet-blokkerende waarschuwing, dus dit is bekend,
maar vanuit de student gezien zijn het twee gaten in de belangrijkste beginnerspagina van
de cursus.

**Besluit (2026-07-26):** aanvaard als bevinding, maar bewust niet nu opgelost: de twee
foto's moeten nog gemaakt worden en dat kan alleen met de echte hardware erbij. De
`TODO-`bestandsnamen blijven staan, zodat `check-content.sh` ze bij elke run als
niet-blokkerende waarschuwing blijft melden.

**Bijgesteld (2026-08-05):** de veronderstelling dat dit hardware vraagt, klopt niet.
`pullup-breadboard-foto.png` en `pulldown-breadboard-foto.png`, waar labo 0 dit soort beeld
al gebruikt, zijn Tinkercad-renders en geen foto's; ze heten alleen zo. Beide gaten worden
dus ingevuld met een render in diezelfde stijl (`sourcing-led-breadboard.png` en
`breadboard-knop-en-led.png`), wat betekent dat ze zonder kit gemaakt kunnen worden. De
`alt`-teksten op beide pagina's staan al in hun definitieve vorm en het `TODO-`comment
ernaast beschrijft nu wat de render moet tonen. Alleen de bestandsnaam draagt nog de
`TODO-`prefix, want zonder die prefix is een ontbrekend beeld een blokkerende fout in
plaats van een waarschuwing.

**Status:** open, wacht op de twee renders

---

## L0-07 &middot; BEGRIP &middot; vertraagt &middot; opgelost

**Pagina:** [BegeleideOefening stap 7](../Labo0/Exercises/BegeleideOefening.html#L150)

**Wat de student raakt:** de zin "Met de <em>wet van Ohm</em> reken je de weerstand uit"
linkt naar [WiskundigeOperatoren.html](../Labo0/Reference/WiskundigeOperatoren.html). Die
pagina gaat over `+ - * / %`, `pow` en `sqrt` in Arduino-code en vermeldt de wet van Ohm
nergens. Wie klikt omdat hij die wet niet kent, komt uit bij programmeeroperatoren. Dit is
dezelfde pagina die in de review van labo 4 al naar boven kwam als de plek waar
bitbewerkingen hadden moeten staan (zie [labo4.md](labo4.md), L4-01).

**Besluit (2026-07-26):** aanvaard, nieuwe referentiepagina
[De wet van Ohm](../Labo0/Reference/WetVanOhm.html) met een entry in `reference.js` onder
'I/O & signalen', naast `SourcenSinken.html`. Ze behandelt de formule en haar drie vormen,
de eenhedenval met mA, het berekenen van de voorschakelweerstand, en waarom je naar boven
afrondt naar 220 Ohm. Stap 7 van de begeleide oefening en de OUTPUT-sectie van
`pinMode.html` linken er nu naartoe.

**Status:** opgelost, 2026-07-26

---

## L0-08 &middot; BEGRIP &middot; detail &middot; opgelost

**Pagina:** [Iteraties.html:48](../Labo0/Reference/Iteraties.html#L48)

**Wat de student raakt:** de vier voorbeelden op de iteratiepagina gebruiken
`Serial.begin(115200)`, terwijl overal elders in labo 0 en in de latere labo's 9600 staat.
Zowel [Debuggen.html:61](../Labo0/Reference/Debuggen.html#L61) als stap 4 van de begeleide
oefening waarschuwen uitdrukkelijk dat een afwijkende snelheid onleesbare tekens oplevert.
Wie een voorbeeld van deze pagina overneemt en zijn monitor op 9600 laat staan, krijgt
precies dat.

**Besluit (2026-07-26):** aanvaard, de vijf `Serial.begin(115200)` op
`Iteraties.html` staan nu op 9600, gelijk aan de rest van de cursus.

**Status:** opgelost, 2026-07-26

---

## L0-09 &middot; BEGRIP &middot; vertraagt &middot; opgelost

Niet uit een leesronde, maar uit een vraag van de lesgever op 2026-07-27. Hier
opgeschreven zodat een volgende ronde er niet opnieuw over valt.

**Pagina's:** heel labo 0, en [Debuggen.html:15](../Labo0/Reference/Debuggen.html#L15)

**Wat de student raakt:** de cursus definieerde nergens wat een microcontroller is. Het
woord kwam in de volledige inhoud &eacute;&eacute;n keer voor, op `Debuggen.html`, waar
het als bekend verondersteld werd ("Er is geen scherm of debugger zoals op een computer").
De enige ori&euml;ntatiepagina van labo 0 was
[HardEnSoftware.html](../Labo0/Reference/HardEnSoftware.html), en dat is een aankoop- en
installatielijst, geen begrip. Een vak dat *Microcontrollers* heet begon dus zonder te
zeggen wat dat ding is, terwijl een reeks regels die de student als losse feiten binnenkreeg
(de 20 mA per pin, de voorschakelweerstand, waarom `delay()` alles blokkeert, waarom de
seri&euml;le monitor je enige venster is) allemaal rechtstreeks uit dat ene begrip volgt.

**Besluit (2026-07-27):** aanvaard, nieuwe referentiepagina
[Wat is een microcontroller?](../Labo0/Reference/WatIsEenMicrocontroller.html) als eerste
topic onder 'Basisbegrippen', v&oacute;&oacute;r `HardEnSoftware`, met een verwijzing
bovenaan [Blink.html](../Labo0/Exercises/Blink.html) zodat ze niet onbereikbaar is (dezelfde
val als L0-05). Elk verschil met een pc krijgt een gevolg dat de student later tegenkomt en
linkt naar de pagina waar dat uitgewerkt staat; er staat bewust g&eacute;&eacute;n
specificatietabel op die de student nergens aan kan ophangen.

De vergelijking met een PLC staat er expliciet in, omdat deze studenten het jaar voordien al
Siemens LOGO's programmeerden en er verderop in de opleiding nog PLC's aan bod komen. De
cyclische verwerking van een LOGO is de vorm van `loop()`, en de afgeschermde klemmen van
een LOGO zijn precies wat een kale pin niet is. Zonder die voorkennis was dat vergelijken
van twee onbekenden geweest en had het niet op de pagina gehoord.

**Uitdrukkelijk verworpen (2026-07-27):** een bijhorende theorievraag in
[TheoretischeVoorbeeldtest.html](../Test1/TheoretischeVoorbeeldtest.html). Voorgesteld omdat
een conceptuele pagina zonder testaanwezigheid als vrijblijvend gelezen kan worden; de
lesgever wil de voorbeeldtest concreet houden. Niet opnieuw voorstellen.

**Status:** opgelost, 2026-07-27
