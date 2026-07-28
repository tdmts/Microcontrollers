# Schrijfstijlrondes

De regel staat in [SCHRIJFSTIJL.md](../SCHRIJFSTIJL.md), het protocol in
`.claude/skills/orion-style/SKILL.md`. Vraag Claude om "de schrijfstijl van labo N toe te
passen", dan volgt hij het. Eén labo per doorloop, in cursusorde.

Dit register is met opzet dunner dan de ledgers in deze map voor de didactische review. Daar
krijgt elke bevinding een vast nummer, omdat het beslissingen zijn die anders elke ronde
opnieuw besproken worden. Hier is het regeldocument zelf de beslissing, dus wat hier bijgehouden
wordt is alleen: hoe ver we staan, wat er teruggehouden is voor jou, welke woorden er aan een
lijst in `scripts/check-content.sh` toegevoegd zijn, en welke ingrepen buiten één labo vielen.

**Een bewuste afwijking hoort hier niet.** Die gaat in de pagina zelf, als
`<!-- audit-skip: verkleinwoord -->` met de reden ernaast, zodat de beslissing staat waar de
afwijking staat. Geldige namen voor de stijlregels: `lead-opener`, `u-vorm`, `verkleinwoord`,
`noord-nederlands`, `vulwoord`.

De kolom "greppable" is wat `bash scripts/check-content.sh --audit` nu nog meldt voor dat labo.
Dat is ongeveer een derde van wat een doorloop vindt: de acht andere patronen hebben een lezer
nodig.

| Labo | Pagina's | Greppable open | Status |
|---|---|---|---|
| Labo 0 | 19 | 0 | **klaar** |
| Labo 1 | 11 | 0 | **klaar** |
| Labo 2 | 14 | 4 | open |
| Labo 3 | 7 | 3 | open |
| Labo 4 | 9 | 2 | open |
| Labo 5 | 14 | 14 | open |
| Labo 6 | 12 | 5 | open |
| Labo 7 | 13 | 28 | open |
| Test1 + Test2 | 6 | 1 | open |

De openstaande meldingen zitten scheef verdeeld: labo 5 en labo 7 zijn samen twee derde,
en dat zijn precies de labo's die het recentst geschreven zijn. Labo 1 tot 4 bestaan grotendeels
uit de oorspronkelijke cursustekst, die deze patronen veel minder heeft.

Labo 0 laat wel zien dat de greppable teller een vloer is en geen lijst: hij stond op 7 en de
doorloop vond er ongeveer dertig, verspreid over vijftien pagina's.

## Afgesproken bereik

- **Cursusorde**, labo 0 eerst, de `TestN/`-mappen laatst.
- **Herschrijven, niet voorleggen.** De regels liggen vast en de meeste ingrepen zijn
  mechanisch. `git diff` is de controle.
- **Twijfelgevallen worden wel voorgelegd**, per doorloop, onderaan het verslag en hieronder.
- **Geïmporteerde Brightspace-tekst wordt gelijk behandeld.** De site moet als één stem klinken,
  ongeacht wie wat schreef. Enkel stijl: de opbouw en de inhoud van die pagina's blijven.

## Labo 0

Klaar. Zeventien inhoudelijke pagina's plus `dashboard.html` en `reference.html`; die laatste twee
hebben alleen een boilerplate `lead` en zijn ongewijzigd gebleven.

| Pagina | Wat er veranderde |
|---|---|
| [WatIsEenMicrocontroller.html](../Labo0/Reference/WatIsEenMicrocontroller.html) | Volledig herschreven als ijkpunt voor het regeldocument: had elf van de dertien patronen. Later nog de tabeltitel ("Dezelfde vraag, drie soorten toestellen" was een aardigheidje) en "Dat is geen schrijffout" (patroon 1 in het klein). |
| [ProgrammaUploaden.html](../Labo0/Reference/ProgrammaUploaden.html) | Werkwoordloze slotzin weg, `lijstje` zeven keer naar `lijst` (ook in een `alt` en een `figcaption`), `lettertje` naar "de letter L", `lampje` naar "de voedingsled". Daarnaast drie taalfouten die buiten de dertien patronen vallen: "linkse knop", "ga je op zoek moeten gaan", en een enkelvoudig werkwoord bij een samengesteld onderwerp. |
| [Blink.html](../Labo0/Exercises/Blink.html) | `lijstje` naar `lijst`, vulwoord `nu eigenlijk` weg (13). |
| [BegeleideOefening.html](../Labo0/Exercises/BegeleideOefening.html) | "Tijd voor licht." weg (5), `netjes` en `heel even` weg (13), "Merk je hoe je dezelfde regels drie keer hebt gekopieerd?" naar een mededeling (3), en de slotzin van stap 15 zonder "Proficiat" (1). |
| [HardEnSoftware.html](../Labo0/Reference/HardEnSoftware.html) | `jullie` naar de je-vorm, en drie schrijffouten: `simulatie omgeving`, `e-mail adres`, een komma­splitsing bij de installatieoptie. |
| [SetupLoop.html](../Labo0/Reference/SetupLoop.html) | "MOET" in kapitalen naar "moet" (10). |
| [ConstantenVariabelenGegevenstypes.html](../Labo0/Reference/ConstantenVariabelenGegevenstypes.html) | `plaatsje` naar `plaats` (11), en "identiek hetzelfde" in de tabel naar "hetzelfde". |
| [WiskundigeOperatoren.html](../Labo0/Reference/WiskundigeOperatoren.html) | Kadertitel "Let op!" naar "Een deling hangt af van het gegevenstype". |
| [Selecties.html](../Labo0/Reference/Selecties.html) | Kadertitel "Opmerking" naar "Wat `analogRead()` teruggeeft". |
| [Iteraties.html](../Labo0/Reference/Iteraties.html) | `men` vijf keer naar de je-vorm, `Je kunt` naar `Je kan` (12), "Fouten zitten soms in kleine hoekjes." weg (1), kadertitels "Opgepast!" en "Stop alles" naar titels die zeggen waar het kader over gaat. Daarnaast twee belgicismen: "op het eerste zicht" naar "op het eerste gezicht" (2x) en "verderzetten" naar "voortzetten". |
| [FunctiesParameters.html](../Labo0/Reference/FunctiesParameters.html) | `kunt` naar `kan` (12), en "wanneer we de functie aanroepen" naar de je-vorm. |
| [pinMode.html](../Labo0/Reference/pinMode.html) | `lead` begon op "Op deze pagina behandelen we" (9), `men` vijf keer naar de je-vorm. |
| [digitalReadDigitalWrite.html](../Labo0/Reference/digitalReadDigitalWrite.html) | Niets. De pagina stond al goed. |
| [PullUpPullDown.html](../Labo0/Reference/PullUpPullDown.html) | `lead` begon op "In dit artikel gaan we" (9), `knopje` naar `knop` (11), `kun je` naar `kan je` (12), `men` drie keer naar de je-vorm, kadertitels "Tip" en "Opmerking" vervangen. |
| [SourcenSinken.html](../Labo0/Reference/SourcenSinken.html) | "Nog twee termen die wat verduidelijking verdienen." uit de `lead` (9), `uiteraard` weg (13), en de vetgedrukte slotzin over de stroomgrenzen ontvet, met het vet alleen nog op de waarden (10). |
| [WetVanOhm.html](../Labo0/Reference/WetVanOhm.html) | `lead` zonder de dubbele punt als aankondiging (4), "Een led is geen weerstand." naar wat een led wél doet (6), "en dat wil je niet" weg (1). |
| [Impedantie.html](../Labo0/Reference/Impedantie.html) | "Hier lees je" uit de `lead` (9), en twee ontkennende openingen weg: "Impedantie is geen ander soort onderdeel." en "Die twee woorden zijn geen etiket" (6). |
| [Debouncen.html](../Labo0/Reference/Debouncen.html) | "mechanisch ding" naar "mechanisch onderdeel", `kun je` naar `kan je` (12), `natuurlijk` weg (13), `héél` ontdaan van het klemtoonaccent (10), en vier schrijffouten in dezelfde alinea (`blokeert`, `debounce probleem`, "de uitvoeren van", een ontbrekende komma). |
| [Debuggen.html](../Labo0/Reference/Debuggen.html) | Kadertitel "Tip" naar "De baudrate moet aan beide kanten gelijk zijn". |

Woorden toegevoegd aan `scripts/check-content.sh`, alle drie eerst gemeten:

- `DIMINUTIVES`: `lijstje` (alle zeven voorkomens op `ProgrammaUploaden.html`) en `plaatsjes?`
  (één voorkomen, in de `lead` van `ConstantenVariabelenGegevenstypes.html`).
- `STOCK_LEAD`: `Op deze pagina (behandelen|bespreken) we` en `In dit artikel`. Twee voorkomens,
  allebei in labo 0, allebei nu weg. Het is dezelfde aankondiging als "Hier lees je", maar in de
  wij-vorm, en die ontbrak in de lijst.
- `NOORD_NL`: `kun je|je kunt` staat er nu als `[Kk]un je|[Jj]e kunt`. De lijst is bewust
  hoofdlettergevoelig, waardoor een zinsinitiaal "Je kunt" op `Iteraties.html` er al die tijd
  doorheen glipte. Alleen die ene extra treffer in de gecontroleerde pagina's.
- `DIMINUTIVES`: `stukjes?`, na de beslissing hieronder. Elf pagina's plus `reference.js`, en dus
  de eerste toevoeging die verder reikt dan het labo waarin ze gevonden werd.

### Twijfelgevallen

Alle zes zijn beslist. Ze blijven staan omdat een volgende doorloop ze anders opnieuw voorlegt.

| Wat | Waar | De beslissing |
|---|---|---|
| "een <strong>stukje</strong> code" | `FunctiesParameters.html` (`lead`) en de blurb in `reference.js`; `stukje` in het algemeen op elf pagina's | **Opsmuk.** Overal naar `stuk`, `stukken` of `delen`, en `stukjes?` toegevoegd aan `DIMINUTIVES`. De vraag ging over "stukje code", maar het woord stond ook in "een stukje geheugen", "een stukje veerend metaal" en "in drie stukjes", en die vallen onder dezelfde regel. Twee gevallen konden niet mechanisch: de tabeltitel "De stukjes ASCII die je hier nodig hebt" (`TekensEnGetallen.html`) werd "De ASCII-waarden die je hier nodig hebt", en de uitdrukking "stukje bij beetje" (`Strings.html`, `InterruptServiceRoutine.html`) werd "beetje bij beetje", omdat "stuk bij beetje" niet bestaat en de woordenlijst anders een vaste uitdrukking blijft melden. |
| De knipoog `&#128521;` | `BegeleideOefening.html`, stap 9, na "ruim boven de veilige grens" | **Weg.** Enige emoji in de hele cursus, en opvoering die geen van de dertien patronen toevallig niet dekte. |
| "Nog een denkoefening." / "Opnieuw eerst zelf redeneren." | `BegeleideOefening.html`, stappen 6 en 9 | **Blijft.** Korte zinnen (5), maar ze zijn de vaste aankondiging van elk denkstapje en dus functioneel in plaats van effectbejag. |
| De wij-vorm in de geïmporteerde tekst | `Iteraties.html`, `PullUpPullDown.html`, `pinMode.html` | **Blijft.** `men` is overal naar de je-vorm gegaan, want dat is formeel, maar `we` blijft staan ("we kunnen deze redenering voortzetten"), omdat de hele repo die inclusieve wij-vorm gebruikt. Ook naar de je-vorm gaan is een aparte, repo-brede doorloop en geen stijlronde per labo. |
| Kop "Terug" met als inhoud "Niets" | `pinMode.html`, onder Syntax/Parameters | **"Geeft terug".** De vertaling van "Returns" las als "terugkeren". De werkwoordsvorm sluit aan bij hoe `FunctiesParameters.html` over functies praat; "Retourneert" was het formelere alternatief. |
| Belgicismen | `Iteraties.html` | **Correcties blijven.** "op het eerste zicht" → "op het eerste gezicht" (2x) en "verderzetten" → "voortzetten", omdat SCHRIJFSTIJL.md 12 standaardtaal vraagt en geen gewestelijke woordkeuze. |

## Labo 1

Klaar. Acht oefeningen plus drie theoriepagina's; `dashboard.html` en `reference.html` hebben alleen
een boilerplate `lead` en zijn ongewijzigd gebleven. Twee pagina's bleven helemaal ongemoeid:
`Morsecode.html` en `7SegmentMetTeller.html` stonden al goed.

| Pagina | Wat er veranderde |
|---|---|
| [Looplicht.html](../Labo1/Exercises/Looplicht.html) | Alleen `led's` naar `leds` in de `lead`. De rest van de pagina stond goed. |
| [KnightRider.html](../Labo1/Exercises/KnightRider.html) | `led's` naar `leds`, en `"lichtpuntje"` naar `het licht` (11). Dat verkleinwoord stond bovendien tussen aanhalingstekens, wat het nog een graad opgesmukter maakte. |
| [RGBLed.html](../Labo1/Exercises/RGBLed.html) | "Die ga je niet zeven keer uitschrijven: je zet ze in een tabel" naar één bevestigende zin (4 en 6). |
| [AchtAnimatieOp7Segment.html](../Labo1/Exercises/AchtAnimatieOp7Segment.html) | `lead` begon op de werkwoordloze "Je eerste display." (5), `sketchje` naar "een korte sketch" (11), "is niets anders dan zeven leds" naar "is zeven leds" (6), en het vulwoord `echt` weg (13). |
| [VastGetalOpDubbel7Segment.html](../Labo1/Exercises/VastGetalOpDubbel7Segment.html) | De dubbele punt in de `lead` naar een punt (4), "Wat er nieuw bijkomt, is één ding." weg (1, pure spanningsopbouw waar de kop eronder het antwoord al geeft), "Daar draait de oplossing om." weg (1), "niet tegelijk, maar om beurten" naar "om beurten" (6), de dubbele punt in "het beeld staande houdt: stopt het" naar een punt (4), en de slotzin van het kader "Begin traag, dan snel" ingekort tot "Zo zie je waar de truc zit." (1). |
| [Dubbel7SegmentMetTeller.html](../Labo1/Exercises/Dubbel7SegmentMetTeller.html) | "Dat klinkt als één regel erbij, maar er zit een addertje onder het gras." weg (1): de kadertitel eronder noemt het addertje meteen bij naam. Verder `flitsje` naar `flits` (11) en "Die ken je: het is de `millis()`-aanpak uit Debouncen" naar de terugkoppeling als feit (4). |
| [Arrays.html](../Labo1/Reference/Arrays.html) | "Het grote verschil:" naar een gewone zin (4), "Hier komt de winst." weg (5, de alinea onder het codevoorbeeld zegt concreet wát de winst is), `eentje` naar "een waarde" (11), en een kommasplitsing bij de `sizeof`-truc. |
| [ZevenSegmentDisplay.html](../Labo1/Reference/ZevenSegmentDisplay.html) | "is niets meer dan zeven leds" naar "is zeven leds" (6), vulwoord `gewoon` weg (13), "Weet je niet welk type je hebt?" naar een gewone voorwaardelijke zin (3), "Dat hoeft niet: je kan" naar "Dat hoeft niet, want je kan" (4), en de slotzin onder de tabel ontdaan van de wending "Dat is precies ... maar dan zeven keer naast elkaar" (1). |
| [Multiplexing.html](../Labo1/Reference/Multiplexing.html) | `lead` had een kommasplitsing én een ontkennende opening (6), kop "De truc: te snel om te zien" naar "Te snel om te zien" (4), "niet tegelijk, maar om beurten" naar "om beurten" (6), vulwoord `gewoon` weg (13), en "Ruim genoeg." samengevoegd met de zin ervoor (5). |

Woorden toegevoegd aan `scripts/check-content.sh`:

- `DIMINUTIVES`: `flitsje`. Eén voorkomen in de hele repo, op `Dubbel7SegmentMetTeller.html`, en
  `flits` zegt precies hetzelfde. Geen vakterm.

Niet toegevoegd, hoewel het een verkleinwoord is: `addertje`. Dat is deel van de vaste uitdrukking
"een addertje onder het gras", en SCHRIJFSTIJL.md 11 zondert vaste uitdrukkingen uitdrukkelijk uit.
De zin ging hier weg om patroon 1, niet om het verkleinwoord.

### Twijfelgevallen

Alle vijf zijn beslist. Ze blijven staan omdat een volgende doorloop ze anders opnieuw voorlegt.

| Wat | Waar | De beslissing |
|---|---|---|
| `LED` in kapitalen | Repo-breed, 43 bestanden | **Overal naar `led` en `leds`.** Uitgevoerd als losse doorloop, zie hieronder. |
| "een addertje onder het gras" | `Labo2/Exercises/LedDimmenMetPotentiometer.html`, `Labo6/Exercises/DrukknopHierLedDaar.html` | **Overal weg**, en meteen gedaan in plaats van te wachten op de beurt van labo 2 en 6. In allebei was het een losse openingszin voor een alinea die het probleem daarna gewoon uitlegt, dus de zin kon zonder vervanging weg. Voor de rest zijn die twee pagina's ongemoeid gebleven. |
| "Dat is precies het onderscheid uit Sourcen en sinken, maar dan zeven keer naast elkaar." | `ZevenSegmentDisplay.html`, onder de tabel | **Strakker.** Nu "Het is hetzelfde onderscheid als in Sourcen en sinken, zeven keer naast elkaar." De terugkoppeling en het inhoudelijke "zeven keer naast elkaar" blijven, de opbouw naar de pointe (`precies` + `maar dan`) gaat weg. Een pointe mag, de opvoering eromheen niet. |
| Kop "De oplossing: multiplexing" | `VastGetalOpDubbel7Segment.html` | **Blijft.** Een dubbele punt in een kop gaat weg wanneer hij een pointe aankondigt ("De truc: te snel om te zien"), en blijft wanneer hij het onderwerp noemt. Dat vraagt per kop een oordeel en is dus niet greppable. |
| "Zo zie je met eigen ogen waar de truc zit, in plaats van meteen een werkend getal te hebben zonder te weten waarom." | `VastGetalOpDubbel7Segment.html`, kader "Begin traag, dan snel" | **Strakker.** Nu "Zo zie je waar de truc zit." Het waarom van traag beginnen blijft staan, "met eigen ogen" en de "in plaats van"-tegenstelling zijn opsmuk. |

## Repo-brede ingrepen

Dingen die uit een labo-doorloop komen maar niet binnen één labo op te lossen zijn. Ze staan hier
zodat een volgende doorloop ze niet opnieuw voorlegt.

### `LED` naar `led` (na labo 1)

400 vervangingen in 43 bestanden, inclusief `exercises.js`. `LED` en `LEDs` zijn in de lopende
tekst `led` en `leds` geworden, met een hoofdletter waar de zin of de cel begint (`<h1>Led
dimmen</h1>`, `<td>Led 4</td>`). `LED1` tot `LED4` in labo 4 zijn `Led 1` tot `Led 4` geworden, naar
het model van "Drukknop 1" in dezelfde tabel.

**Code is niet aangeraakt.** Alles binnen een `<pre>` is gebleven zoals het stond: de identifiers
`pinLED` (44x) en `blinkLED` (3x), maar ook de 60 keer dat `LED` in een commentaarregel of een
string staat. Dat laatste is een bewuste grens en geen vergetelheid. In labo 6 is `"LED"` de
sleutel van het protocol tussen de pc en de Arduino (`serialPort.WriteLine("LED:1")`,
`if (sleutel == "LED")`), dus daar is de kapitaal gegeven data en geen woordkeuze. En de rest van
de sketch mee verbouwen om alleen commentaar te herspellen levert een diff op waarin een echte
codewijziging niet meer opvalt.

`scripts/check-content.sh --audit` bewaakt dit sindsdien, als zesde tekstregel naast de vijf over
opsmuk, met `led-spelling` als naam voor een `audit-skip`. Hij meldt alleen `LED` op een regel met
prozaopmaak (`<p>`, `<li>`, `<td>`, een kop, een `alt`, een `name:` of `blurb:` in een manifest) en
laat alles binnen een `<pre>` staan, want een regelgewijze grep ziet geen blokgrenzen. Die filter
kant kiest bewust voor een gemiste melding boven een verzonnen melding. De regel staat ook in
[SCHRIJFSTIJL.md](../SCHRIJFSTIJL.md) en [CONTRIBUTING.md](../CONTRIBUTING.md).

## Voor orion-review

Didactische dingen die tijdens een stijldoorloop opvielen horen hier, niet in de pagina. Nog niets.
