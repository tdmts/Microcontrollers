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
Dat is ongeveer een derde van wat een doorloop vindt: de twaalf andere patronen hebben een lezer
nodig.

**klaar betekent klaar onder de vijftien patronen van toen.** Patroon 16 en 17 kwamen er op 28 juli
2026 bij, na de doorloop van labo 7, en die kijken naar de alinea in plaats van naar de zin. Elk labo
hieronder heeft daarvoor nog een tweede, smalle doorloop nodig. Zie de sectie onderaan.

| Labo | Pagina's | Greppable open | Status |
|---|---|---|---|
| Labo 0 | 19 | 0 | **klaar** |
| Labo 1 | 11 | 0 | **klaar** |
| Labo 2 | 14 | 0 | **klaar** |
| Labo 3 | 7 | 0 | **klaar** |
| Labo 4 | 9 | 0 | **klaar** |
| Labo 5 | 14 | 0 | **klaar** |
| Labo 6 | 12 | 0 | **klaar** |
| Labo 7 | 15 | 0 | **klaar** |
| Test1 + Test2 + Test3 | 9 | 1 | open |

De openstaande meldingen zitten scheef verdeeld: labo 5 en labo 7 zijn samen twee derde,
en dat zijn precies de labo's die het recentst geschreven zijn. Labo 1 tot 4 bestaan grotendeels
uit de oorspronkelijke cursustekst, die deze patronen veel minder heeft.

Labo 0 laat wel zien dat de greppable teller een vloer is en geen lijst: hij stond op 7 en de
doorloop vond er ongeveer dertig, verspreid over vijftien pagina's.

De teller van labo 5 stond sinds de doorloop van labo 4 op 16 en niet meer op 14. Dat was geen
achteruitgang: `stapjes?` is tijdens de doorloop van labo 3 aan `DIMINUTIVES` toegevoegd en sloeg
twee keer aan in labo 5, wat toen wel in de tekst maar niet in deze tabel terechtkwam.

## Afgesproken bereik

- **Cursusorde**, labo 0 eerst, de `TestN/`-mappen laatst.
- **Herschrijven, niet voorleggen.** De regels liggen vast en de meeste ingrepen zijn
  mechanisch. `git diff` is de controle.
- **Twijfelgevallen worden wel voorgelegd**, per doorloop, onderaan het verslag en hieronder.
- **Geïmporteerde Brightspace-tekst wordt gelijk behandeld.** De site moet als één stem klinken,
  ongeacht wie wat schreef. Enkel stijl: de opbouw en de inhoud van die pagina's blijven.
- **Taalfouten vallen erbuiten** (sinds 28 juli 2026). Een kommasplitsing of een spelfout wordt
  verzameld en apart voorgelegd, niet meegenomen in dezelfde diff. In labo 0 tot 4 gebeurde dat nog
  wel; die correcties blijven staan.

## Herziening van 28 juli 2026

SCHRIJFSTIJL.md liet op vijftien plaatsen een oordeel over dat het zelf niet uitsprak, en negen
daarvan botsten met elkaar of met een eerdere beslissing. Alles is in één gesprek beslist en staat nu
in het regeldocument zelf. Wat hier hoort is enkel wat het voor dit register betekent.

| Beslissing | Gevolg voor de doorlopen |
|---|---|
| Bereik: overal waar een student meeleest | Koppen, kadertitels, checklistregels, spoilerlabels, `alt`, `figcaption` en manifest-blurbs vallen uitdrukkelijk onder de patronen. De doorlopen deden dit al, nu staat het er. |
| Patroon 5 toetst op de persoonsvorm, en alleen in lopende tekst | De labo 0-uitzondering voor "Nog een denkoefening." vervalt. Die zin krijgt een werkwoord in plaats van een vrijstelling, zodat de toets mechanisch blijft. |
| Patroon 6 zonder uitzondering, en strenger in koppen | Geen `geen` of `niet` in een kop, ook niet middenin. 14 koppen in de repo voldoen niet. |
| Patroon 10 tot op woordniveau | Ook vetgedrukte deelzinnen worden ontvet. Dat beslist de openstaande vraag van labo 4. |
| Patroon 12 keert om: liever een Belgicisme dan een Hollandisme | De grens ligt tussen schrijftaal en spreektaal. Twee correcties uit labo 0 worden herroepen, twee ingrepen blijven. Zie hieronder. |
| Patroon 13 zonder woordenlijst in het document | De lijst leeft in `FILLERS`. `gewoon` en `precies` komen er nooit in. |
| Patroon 14: geen terzijde als knipoog | Beslist de openstaande vraag van labo 4 over "(ja, er zijn er ook slechte)". `TLDR:` in labo 3 blijft: dat is register, geen knipoog. |
| Patroon 15: beeldspraak alleen waar het gewone woord ontbreekt | Een beeld gaat enkel weg wanneer het letterlijke woord al op de pagina staat. Vraagt het een feit, dan is het een vraag en geen ingreep. |
| `men` én `we` naar de je-vorm | De labo 0-beslissing dat `we` blijft, is herroepen. Repo-breed, nog niet uitgevoerd. |
| Taalfouten buiten de ronde | Zie hierboven. |
| De regels gelden niet voor de documentatie van de repo | SCHRIJFSTIJL.md, CONTRIBUTING.md, CLAUDE.md en dit register mogen werkwoordloze en ontkennende titels houden. |
| `dashboard.html` en `reference.html` doen wel mee | Zestien overzichten met dezelfde boilerplate-`lead` krijgen elk een eigen lead. Ze staan in elke labotabel hierboven als "ongewijzigd gebleven". |

### Herroepen

| Wat | Waar | Nu |
|---|---|---|
| "op het eerste zicht" → "op het eerste gezicht" (2x) en "verderzetten" → "voortzetten" | `Labo0/Reference/Iteraties.html` | **Terugdraaien.** Allebei gewone Vlaamse schrijftaal, en patroon 12 kiest die nu boven de noordelijke vorm. |
| `deftig` → `goed` | `Labo4/Exercises/LedsAansturen.html`, `VolloperMetDrukknoppen.html` | **Blijft weg.** "Een led deftig doen branden" is spreektaal, en dat is de grens die de nieuwe regel trekt. |
| "een pak beter/meer" → "veel" | Labo 5 | **Blijft.** Zelfde grond als `deftig`. De twee voorkomens in labo 7 gaan mee weg wanneer dat labo aan de beurt komt. |
| `we` blijft staan | Labo 0 | **Herroepen.** Gaat alsnog naar de je-vorm, repo-breed. |
| "Nog een denkoefening." blijft | `Labo0/Exercises/BegeleideOefening.html` | **Herroepen.** Wordt "Denk hier eerst zelf na." De functie blijft, de uitzondering verdwijnt. |

### Achterstand

Uit te voeren in één opruimronde over de afgewerkte labo's, of labo per labo mee te nemen. De
doorloop van labo 6 heeft het deel dat in dat labo viel meegenomen: de twee leads van
`dashboard.html` en `reference.html`, en de vier `we`-vormen.

- Koppen met `geen` of `niet` in labo 2, 4 en 5. Die van labo 7 zijn gedaan: de parallelreeks op
  [InterruptServiceRoutine.html](../Labo7/Reference/InterruptServiceRoutine.html) is parallel
  gebleven, zie hieronder.
- De vetgedrukte deelzinnen op [PCF8574.html](../Labo4/Reference/PCF8574.html).
- Drie koppen die als pointe gebouwd zijn: "Het gevaar zit in het bitpatroon, niet in de draad"
  ([LedsAansturen.html](../Labo4/Exercises/LedsAansturen.html), meteen ook een ontkenning),
  "De volgorde is het hele punt" ([StappenmotorInFullStep.html](../Labo5/Exercises/StappenmotorInFullStep.html)),
  en de dubbeling tussen titel en eerste zin op
  [VolloperMetDrukknoppen.html](../Labo4/Exercises/VolloperMetDrukknoppen.html).
- Het terzijde "(ja, er zijn er ook slechte)" op [Bibliotheken.html](../Labo4/Reference/Bibliotheken.html).
- Het beletselteken in het spoilerlabel op
  [SnelheidEnRichtingMetL293.html](../Labo5/Exercises/SnelheidEnRichtingMetL293.html).
- De rolluikzin op [RolluikMetLdrEnEindeloopschakelaars.html](../Labo5/Exercises/RolluikMetLdrEnEindeloopschakelaars.html):
  geen beeld meer, maar wat de eindeloopschakelaar doet.
- 11 leads op de dashboards en de referentiehubs. Die van labo 6 en labo 7 zijn gedaan, en
  `Labo0/Exercises/dashboard.html` op 5 augustus 2026. De theoriehub van labo 0 is bewust blijven
  staan: die gaat mee wanneer labo 2 tot 5 samen aan de beurt komen.
- `we` naar de je-vorm, repo-breed. Labo 6 (vier voorkomens), labo 7 (&eacute;&eacute;n in lopende
  tekst) en labo 0 (27 voorkomens in tien bestanden, 5 augustus 2026) zijn gedaan. Blijft: labo 1
  tot 5.

## Labo 0

Klaar. Zeventien inhoudelijke pagina's plus `dashboard.html` en `reference.html`.

**Nalezing van 5 augustus 2026**, waarmee de achterstand voor dit labo weggewerkt is:

- De twee herroepen Belgicismen zijn teruggedraaid op
  [Iteraties.html](../Labo0/Reference/Iteraties.html): "op het eerste gezicht" terug naar "op het
  eerste zicht" (2x) en "voortzetten" terug naar "verderzetten".
- `we` naar de je-vorm, 27 voorkomens in tien bestanden. Het zwaarst in
  [PullUpPullDown.html](../Labo0/Reference/PullUpPullDown.html) (7) en
  [Iteraties.html](../Labo0/Reference/Iteraties.html) (8), waar de meeste zinnen herbouwd moesten
  worden in plaats van dat er een woord verwisseld kon worden.
- De aansporing bij een verborgen antwoord staat nu op alle vier de denkstappen van
  [BegeleideOefening.html](../Labo0/Exercises/BegeleideOefening.html) in dezelfde vorm, "Denk hier
  eerst zelf na.", de zin die SCHRIJFSTIJL.md zelf als voorbeeld geeft. Dat betreft meer dan de twee
  werkwoordloze gevallen die hier als achterstand genoteerd stonden: stap 3 had een derde variant
  ("Voor je iets uittest: probeer eerst zelf te redeneren.") en stap 8 had er helemaal geen. De
  aansporing behouden in plaats van schrappen is beslist op grond van zeven vindplaatsen in labo 1
  tot 7, die het patroon repo-breed vastleggen.
- [dashboard.html](../Labo0/Exercises/dashboard.html) heeft een eigen `lead` gekregen, in de vorm van
  labo 6 en 7. De theoriehub houdt bewust zijn stock-opener tot labo 2 tot 5 aan de beurt komen.

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

**Bijgewerkt 2026-07-31.** Labo 1 is herstructureerd (zie [labo1.md](labo1.md)): zes oefeningen
plus vier theoriepagina's. `AchtAnimatieOp7Segment.html`, `7SegmentMetTeller.html`,
`VastGetalOpDubbel7Segment.html` en `Dubbel7SegmentMetTeller.html` zijn opgegaan in
`TellerOp7SegmentDisplay.html` en `TellerOpDubbel7SegmentDisplay.html`. De rijen hieronder blijven
staan als verantwoording van wat er destijds veranderd is; de beslissingen zijn meegenomen naar de
nieuwe pagina's, inclusief de twee twijfelgevallen over `VastGetalOpDubbel7Segment.html`. Nieuw
sinds die ronde en meteen meegenomen: `VermogenSchakelen.html` (kop "Een relais of een transistor?"
naar de stellende vorm (3), kadertitel "Waarom is de gemeten collectorstroom 40 mA en niet de
berekende 43,5 mA?" naar een stelling zonder `niet` (3 en 6), en drie keer `we` naar de je-vorm),
de `reference.html`-lead die nu zegt waarover het labo gaat, en drie greppable resten die de audit
meldde: `kun je`/`kunt` in `Looplicht.html` en `KnightRider.html` (12).

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

## Labo 2

Klaar. Tien oefeningen plus vier theoriepagina's; `dashboard.html` en `reference.html` hebben alleen
een boilerplate `lead` en zijn ongewijzigd gebleven. Geen enkele pagina bleef helemaal ongemoeid,
maar op de meeste ging het om één zin.

Dit labo is voor het grootste deel geïmporteerde cursustekst, en dat is te zien aan wát er veranderde:
de opvoering zit hier bijna niet in de opgaven maar in de stukken die er later bij geschreven zijn
(de TMP36-vergelijking tussen `map()` en een eigen formule, `Spanningsdeler.html`), terwijl de
geïmporteerde delen vooral de `men`-vorm en de Noord-Nederlandse woordkeuze meebrachten.

| Pagina | Wat er veranderde |
|---|---|
| [PotentiometerUitlezen.html](../Labo2/Exercises/PotentiometerUitlezen.html) | `men` twee keer naar de je-vorm in de vragen, vulwoord `gewoon` weg uit "is trouwens gewoon een spanningsdeler" (13), en "Let wel: als je dit doet, moet je het resultaat opslaan in" naar "Sla het resultaat wel op in" (4). |
| [LedDimmen.html](../Labo2/Exercises/LedDimmen.html) | `men` drie keer naar de je-vorm, en "men past een trucje toe door de pulsbreedte aan te passen" naar "dat is een truc met de pulsbreedte" (11). |
| [LedDimmenMetPotentiometer.html](../Labo2/Exercises/LedDimmenMetPotentiometer.html) | "Niets verplicht je om het uitvoerbereik oplopend te schrijven" naar "Je mag het uitvoerbereik ook aflopend schrijven" (6), en de dubbele punt erna naar een nevenschikking (4). |
| [DimmerMetSchakelaar.html](../Labo2/Exercises/DimmerMetSchakelaar.html) | Kadertitel "Tip" naar "Met INPUT_PULLUP heb je geen externe weerstand nodig", "De dimmer zelf blijft ongewijzigd:" naar een punt (4), en vulwoord `gewoon` weg (13). |
| [LdrLichtmeting.html](../Labo2/Exercises/LdrLichtmeting.html) | "Meet gerust eerst even af wat je binnenkrijgt" naar "Meet eerst wat je binnenkrijgt" (13, drie verzachters op één werkwoord). |
| [NachtlampMetTijd.html](../Labo2/Exercises/NachtlampMetTijd.html) | Kadertitel "Tip: gebruik geen delay()" naar "Gebruik geen delay()", en de dubbele punt in "blokkeer je je hele programma: tijdens die 10 seconden" naar een punt (4). |
| [TemperatuursensorTMP36.html](../Labo2/Exercises/TemperatuursensorTMP36.html) | De zwaarste pagina van het labo. Kadertitel "En daar loopt het meteen mis" naar "map() rekent met gehele getallen" (1), "De uitkomst is onbruikbaar." samengevoegd met de zin ervoor (5), twee dubbele punten als aankondiging weg (4), "en het loont om ze allebei even te bekijken" weg (1), "dat is precies het soort code waar later fouten in sluipen" naar "daar sluipen makkelijk fouten in" (1), "Dat betekent niet dat map() slecht is" naar "map() blijft wel bruikbaar" (6), de vetgedrukte vuistregelzin ontvet (10), en `heel makkelijk` en `gewoon` weg (13). |
| [TemperatuursensorLM35.html](../Labo2/Exercises/TemperatuursensorLM35.html) | Twee dubbele punten als aankondiging naar een punt (4), en "Precies daarom" naar "Daarom" (10). |
| [TemperatuurindicatorMetRGBLed.html](../Labo2/Exercises/TemperatuurindicatorMetRGBLed.html) | "of de temperatuur onder de 30 zit: dat weet je dan al" naar "..., want dat weet je dan al" (4). |
| [ThermometerOp7Segment.html](../Labo2/Exercises/ThermometerOp7Segment.html) | Dubbele punt naar een punt (4) en vulwoord `even` weg (13), allebei in dezelfde zin van de oplossing. |
| [analogRead.html](../Labo2/Reference/analogRead.html) | `kunt` naar `kan` (12). |
| [analogWrite.html](../Labo2/Reference/analogWrite.html) | `kun je` twee keer naar `kan je` (12), kadertitel "Belangrijk" naar "PWM werkt alleen op de pinnen met een ~", en het uitroepteken uit "Niet alle pinnen ondersteunen PWM!" (10, meteen ook een ontkennende opening, 6). |
| [map.html](../Labo2/Reference/map.html) | `kun je` naar `kan je` in de `lead` (12). |
| [Spanningsdeler.html](../Labo2/Reference/Spanningsdeler.html) | "Dat klinkt onnozel, maar" uit de `lead` (10), "is niets anders dan een spanningsdeler" naar "is een spanningsdeler" (6), `netjes` weg (13), `meetstapjes` naar `meetstappen` (11), kadertitel "De vuistregel" naar "Kies rond het midden van je sensorbereik", twee dubbele punten naar een punt (4), `gewoon` en `precies` weg (13), en "voor elk van hen" naar "voor elk ervan". |

Woorden toegevoegd aan `scripts/check-content.sh`, allebei eerst gemeten:

- `DIMINUTIVES`: `meetstapjes?`. Eén voorkomen in de hele repo, op `Spanningsdeler.html`, en
  `meetstappen` zegt hetzelfde. Geen vakterm: de datasheets en de ADC-uitleg spreken van stappen.
- `NOORD_NL`: `[Jj]e kunt` is `kunt` geworden. Het onderwerp staat niet altijd naast het werkwoord
  ("een waarde die je in je programma kunt gebruiken" op `analogRead.html`), waardoor die zin er al
  die tijd doorheen glipte. `kunt` los is veilig: de Vlaamse standaardvorm is in al die posities
  `kan`, en `kunt u` blijft aan de u-vormregel. Eén extra treffer in de gecontroleerde pagina's, nu weg.

Niet toegevoegd, hoewel het erop lijkt: `gewoon`. Dat staat 101 keer in de repo en betekent meestal
iets ("een gewone digitale uitgang"), en het commentaar bij `FILLERS` zondert het daarom
uitdrukkelijk uit. De vier keer dat het hier wegging, was het vulling; op één plaats
(`Spanningsdeler.html`, "Hang je de LDR gewoon tussen 5 V en een analoge ingang") betekende het
"zonder meer" en is het `rechtstreeks` geworden in plaats van geschrapt.

### Twijfelgevallen

Alle drie zijn beslist. Ze blijven staan omdat een volgende doorloop ze anders opnieuw voorlegt.

| Wat | Waar | Beslissing |
|---|---|---|
| De ik-vorm in de vragenlijsten | `PotentiometerUitlezen.html` ("met welke waarde moet ik de gelezen waarde vermenigvuldigen") en `LedDimmen.html` ("wanneer ik de waarde 128 gebruik") | **Naar de je-vorm.** De rest van de vragenlijst staat er al in, en één `ik` ertussen leest als een restant van de bron. In `LedDimmen.html` verschuift `gebruik` mee naar `gebruikt`. |
| "Twee grensgevallen om het gevoel te krijgen" | `Spanningsdeler.html`, kadertitel | **"Drie grensgevallen".** Het kader beschrijft er drie, dus het getal is gecorrigeerd. De staart "om het gevoel te krijgen" ging mee weg: die klinkt Noord-Nederlands en zegt niets dat de kadertekst niet al zegt. |
| `je wilt` | `map.html` en `Labo0/Reference/pinMode.html` | **Repo-breed naar `je wil`, met een regel erbij.** Doorgeschoven naar *Repo-brede ingrepen* hieronder, want het raakt ook labo 0, dat al klaar was. |

## Labo 3

Klaar. Zes oefeningen plus één theoriepagina; `dashboard.html` en `reference.html` hebben alleen een
boilerplate `lead` en zijn ongewijzigd gebleven. Elke pagina is aangeraakt, maar meestal voor één of
twee zinnen.

Dit labo valt op door wát er te doen was. De opgaven zijn geïmporteerde cursustekst en die stond
grotendeels goed; bijna alle opvoering zat in de kaders en de oplossingsteksten die er later bij
geschreven zijn, en dan vooral in de dubbele punt als aankondiging (patroon 4), die vijf keer
terugkwam. Zeven kadertitels waren in orde en zeiden al iets, drie niet.

| Pagina | Wat er veranderde |
|---|---|
| [Enkel7SegmentDisplay.html](../Labo3/Exercises/Enkel7SegmentDisplay.html) | Vulwoord `eigenlijk` weg (13), kadertitel "Let op: pas aan op basis van je eigen display" naar "Pas de patronen aan op basis van je eigen display", en de dubbele punt in "Let op de volgorde in `toonPatroon()`:" naar een punt (4). Daarnaast "Gezien we 7 segmenten aansturen" naar "Aangezien", met de ontbrekende komma erbij. |
| [Dubbel7SegmentDisplay.html](../Labo3/Exercises/Dubbel7SegmentDisplay.html) | "zonder ook maar één extra pin" uit de `lead` naar "zonder extra pinnen" (10); de zusteroefening `Looplicht16Bit.html` zegt hetzelfde al zonder nadruk. "Maar wat als je bijvoorbeeld meerdere displays wil aansturen?" naar een voorwaardelijke zin (3), `gewoon` twee keer weg (13), kadertitel "Let op: staan je cijfers omgewisseld?" naar de vraag alleen, en de dubbele punt in "vervangen door die ene array:" naar "want" (4). |
| [Looplicht8Bit.html](../Labo3/Exercises/Looplicht8Bit.html) | `gewoon` en `precies` weg (13), de vetgedrukte zin "**Probeer dit eens zelf uit...**" ontvet (10), en `mini versie` twee keer aaneengeschreven als `miniversie`, plus een ontbrekende komma. |
| [Looplicht16Bit.html](../Labo3/Exercises/Looplicht16Bit.html) | `eigenlijk` uit de kadertitel, `netjes` en `heel` weg (13), "met één verschil: `aantalLeds` staat nu op 16" naar een bijzin (4, meteen ook `exact` weg), en de dubbele punt bij de `delay()` naar een punt (4). |
| [LedbarMetPotentiometer.html](../Labo3/Exercises/LedbarMetPotentiometer.html) | "is niets anders dan acht leds in één behuizing, netjes op een rij" naar "is acht leds op een rij in één behuizing" (6 en 13), kadertitel `stapjes` naar `stappen` (11), de dubbele punt en `precies` uit "Kijk eens goed naar de tabel: elk bereik is precies even breed" (4, 13), en "Eén berekening volstaat." samengevoegd met de zin ervoor (5). In de oplossing "Dat is de hele tabel in één regel." weg (1). |
| [LichtpatronenUitEenArray.html](../Labo3/Exercises/LichtpatronenUitEenArray.html) | Alleen de kadertitel "Universeel betekent: geen vaste getallen" naar "Universeel betekent dat er geen vaste getallen in je code staan" (4). Dat is exact de vorm uit het regeldocument ("Serieel betekent: achter elkaar"). De rest van de pagina stond goed. |
| [Schuifregister.html](../Labo3/Reference/Schuifregister.html) | Kadertitel "Opmerking" naar "Het schuifregister en het storage register staan los van elkaar", "Dat is precies waarom je geen tussenliggende rommel ziet flikkeren" naar een nevenschikking (1, 13), "merk je de volgorde:" naar een punt (4), `klein functietje` naar `functie` (11), en het `shiftOut()`-kader: de titel "En dan vind je `shiftOut()`, en vraag je je af waarom je dit allemaal zelf doet" naar "Waarom je `shiftOut()` hier niet gebruikt", "Terecht." weg (5) en de slotzin "`shiftOut()` verbergt precies dat." naar voren gehaald als mededeling (1). |

Woorden toegevoegd aan `scripts/check-content.sh`, eerst gemeten:

- `DIMINUTIVES`: `stapjes?`. Vier voorkomens in de repo, verdeeld over drie pagina's: de kadertitel
  hier, en in labo 5 "één stapje voorbij 512" (2x, `SnelheidEnRichtingMetL293.html`) en "kleine
  stapjes van 1 graad" (`Servo.html`). Geen vakterm, en de repo zegt het overal elders met `stap`:
  de stappenmotor zet stappen en de ADC meet in stappen. `meetstapjes?` blijft apart in de lijst
  staan, want `\b` laat `stapjes?` niet aanslaan binnen `meetstapjes`. De twee treffers in labo 5
  blijven open tot dat labo aan de beurt is.

Niet toegevoegd, hoewel het een verkleinwoord is: `rommeltje` stond al in de lijst, maar `rommel`
zelf niet, en dat is terecht. "Tussenliggende rommel" hier is hetzelfde `rommel` als in labo 6 en 7
("er komt vroeg of laat rommel binnen op een seriële lijn", "meet je willekeurige rommel"), dus het
is gevestigd vocabulaire van deze repo en geen opsmuk.

### Twijfelgevallen

Alle drie zijn beslist. Ze blijven staan omdat een volgende doorloop ze anders opnieuw voorlegt.

| Wat | Waar | Beslissing |
|---|---|---|
| `<strong>TLDR:</strong>` | `Dubbel7SegmentDisplay.html`, boven het kader "Waarom werkt dat?" | **Blijft.** De informele toon is hier bedoeld. Het enige voorkomen in de repo, het is geen van de dertien patronen, en de dubbele punt erna kondigt een samenvatting aan en geen pointe. Niet opnieuw voorleggen. |
| "terwijl je maar drie pinnen van je Arduino <strong>opoffert</strong>" | `Schuifregister.html`, `lead` | **Naar `gebruikt`.** De lead is verder feitelijk, en één beeldend werkwoord erin valt op als opsmuk. Dat de pinnen bezet blijven, staat verderop op de pagina toch al. |
| Kop "Stijgende flank?" | `Enkel7SegmentDisplay.html`, `<h3>` boven `risingEdge()` | **Naar "Wat is een stijgende flank?".** Een half fragment met een vraagteken leest als een aarzeling; een hele vraag stelt de vraag die de paragraaf erna beantwoordt. De vraagvorm zelf blijft dus, en dit is geen patroon 3: de kop is geen overgang maar een onderwerp. |

## Labo 4

Klaar. Vijf oefeningen plus vier theoriepagina's; `dashboard.html` en `reference.html` hebben alleen
een boilerplate `lead` en zijn ongewijzigd gebleven. Eén pagina bleef helemaal ongemoeid:
`I2CAdres.html` stond al goed.

Twee dingen vallen op aan dit labo. Het eerste is de dubbele punt als aankondiging (patroon 4): die
kwam vijf keer terug, altijd in dezelfde vorm, namelijk een bewering gevolgd door de reden ervan
("Je kan dus niet één led apart aansturen: je schrijft altijd het hele patroon"). Elke keer was `want`
of een komma het antwoord. Het tweede is `PCF8574.html`, waar vijf hele zinnen vetgedrukt stonden.
Dat is patroon 10 in zijn duidelijkste vorm: vet hoort op een term of een waarde, niet op een zin.
De vetgedrukte losse woorden op diezelfde pagina (**0x20**, **A2, A1 en A0**, **quasi-bidirectioneel**)
zijn dus gebleven.

| Pagina | Wat er veranderde |
|---|---|
| [LedsAansturen.html](../Labo4/Exercises/LedsAansturen.html) | `deftig` naar `goed` (zie hieronder), vulwoord `gewoon` weg (13), "maar dan geldt er een voorwaarde:" naar een gewone bijzin (4), "Onthoud dus vooral het verband:" weg voor de zin die daarna toch het verband geeft (4), en de dubbele punt in "niet één led apart aansturen: je schrijft altijd het hele patroon" naar `want` (4). |
| [DrukknoppenInlezen.html](../Labo4/Exercises/DrukknoppenInlezen.html) | Vulwoorden `eigenlijk` en `gewoon` weg (13), en de dubbele punt bij de ontdendering naar `want` (4). |
| [TekstOpI2CLcd.html](../Labo4/Exercises/TekstOpI2CLcd.html) | Eén dubbele punt naar `want` (4). De rest van de pagina stond goed. |
| [VolloperMetDrukknoppen.html](../Labo4/Exercises/VolloperMetDrukknoppen.html) | De zwaarste pagina van het labo. "Het is geen slecht idee om ... te plaatsen" naar "Plaats best een weerstand ..." (6), `eentje` twee keer naar "de ene / de andere" (11), kadertitel "Geen deftige oplossing" naar "Werkt, maar volledig sequentieel" (zie hieronder, en meteen patroon 6), "Het mag duidelijk zijn dat dit al een veel betere oplossing is" naar de bewering zelf, "Je hebt alles wat je nodig hebt:" weg voor de opsomming die daarna toch volgt (4), en de vulwoorden `even` (2x), `eigenlijk` en `precies` weg (13). |
| [TellerMetI2CDrukknoppen.html](../Labo4/Exercises/TellerMetI2CDrukknoppen.html) | Vulwoorden `netjes` (in een checklistregel) en `gewoon` weg (13). |
| [Bits.html](../Labo4/Reference/Bits.html) | De dubbele punt in de `lead` naar `want` (4), "en dat is geen toeval" weg (1), "compileert vaak gewoon, en dan zoek je lang" naar een mededeling over de fout (1), "waardoor je programma denkt dat je tientallen keren per seconde drukt" naar "registreert" (7), "Een laatste patroon dat je tegenkomt:" naar een gewone zin (4), vulwoord `natuurlijk` weg (13), en een kommasplitsing bij de drie schrijfwijzen. |
| [Bibliotheken.html](../Labo4/Reference/Bibliotheken.html) | Alleen het vulwoord `natuurlijk` (13). |
| [PCF8574.html](../Labo4/Reference/PCF8574.html) | Vijf hele zinnen ontvet (10), "Dat is geen keuze die je zelf maakt: ..." naar "Je kiest die pinnen niet zelf, want ..." (4 en 6), en de vulwoorden `uiteraard` en `gewoon` weg (13). |
| [I2CAdres.html](../Labo4/Reference/I2CAdres.html) | Niets. De pagina stond al goed. |

Woorden toegevoegd aan `scripts/check-content.sh`, allebei eerst gemeten:

- `FILLERS`: `uiteraard` en `natuurlijk`. Samen drie voorkomens in de hele repo, alle drie in labo 4
  en alle drie pure vulling, dus de lijst staat na deze doorloop repo-breed op nul. `uiteraard`
  wordt in SCHRIJFSTIJL.md 13 met naam genoemd. De `\b` aan beide kanten is wat `natuurlijk` veilig
  maakt: het bijvoeglijke `natuurlijke` slaat niet aan.

Niet toegevoegd, hoewel SCHRIJFSTIJL.md 13 het in dezelfde alinea noemt: `eigenlijk`. Van de acht
resterende voorkomens zijn er vier het bijvoeglijk naamwoord ("de eigenlijke werking",
"de eigenlijke ontdendering"), en drie staan in een echte vraag aan de student ("Hoeveel stroom kan
een pin van de Arduino eigenlijk leveren?", "Welke spanning meet je eigenlijk?"), waar het de vraag
als terzijde markeert in plaats van vulling te zijn. Eén ervan staat bovendien in labo 0, dat al op
klaar staat. De lijst zou dus vooral niet-bevindingen melden.

### Twijfelgevallen

| Wat | Waar | Beslissing |
|---|---|---|
| `deftig` | `LedsAansturen.html` ("een led deftig doen branden") en de kadertitel "Geen deftige oplossing" op `VolloperMetDrukknoppen.html` | **Weg, allebei.** Dit is de spiegel van patroon 12: geen Noord-Nederlands woord, maar Belgische spreektaal voor "behoorlijk", en SCHRIJFSTIJL.md 12 vraagt uitdrukkelijk standaardtaal en geen gewestelijke woordkeuze. Twee voorkomens in de hele repo, allebei in labo 4. Niet aan `NOORD_NL` toegevoegd, want die lijst meldt "reads as Netherlandic" en dat is hier het omgekeerde; voor Belgicismen is er geen lijst, net zoals bij "op het eerste zicht" in labo 0. |
| De vetgedrukte deelzinnen | `PCF8574.html`, o.a. "**Per PCF8574 krijg je 8 extra I/O-lijnen**" en "**P0 tot en met P7 zijn de 8 extra I/O-aansluitingen**" | **Blijven, voorlopig.** Alleen de vijf hele zinnen zijn ontvet. Deze markeren een feit midden in een zin en staan dichter bij "vet om een waarde te markeren" dan bij "vet om een zin te laten landen". Zie de vraag hieronder. |

Voorgelegd, en alle vier beslist in de herziening van 28 juli 2026: het terzijde gaat weg (patroon
14), de twee pointe-koppen worden herschreven tot ze hun onderwerp noemen, en de vetgedrukte
deelzinnen gaan er ook uit (patroon 10 tot op woordniveau). Ze staan in de achterstand hierboven; de
vragen blijven staan omdat ze tonen waar het regeldocument tekortschoot.

| Wat | Waar | De vraag |
|---|---|---|
| "Elke goede bibliotheek (ja, er zijn er ook slechte) bevat een aantal voorbeeldprogramma's." | `Bibliotheken.html` | Het terzijde is een knipoog, en geen van de dertien patronen dekt het. In labo 0 ging de enige emoji van de cursus weg om dezelfde reden. Weg, of blijft dit de stem van de auteur? |
| Kadertitel "Het gevaar zit in het bitpatroon, niet in de draad" | `LedsAansturen.html` | De titel zegt iets, en kadertitels die iets zeggen zijn beschermd. Maar hij is als tegenstelling gebouwd, wat leest als een pointe. Vervangen door iets als "Hoe je een pin bedraadt, bepaalt welke bit je stuurt"? |
| Kadertitel "Reken op een gebruiker die rare dingen doet" boven "Ga er altijd van uit dat een gebruiker domme dingen gaat doen." | `VolloperMetDrukknoppen.html` | Titel en eerste zin zeggen hetzelfde, met twee verschillende woorden voor de gebruiker. Eén van de twee schrappen, of de zin laten beginnen bij het geval zelf ("Een gebruiker kan bijvoorbeeld beide knoppen tegelijk indrukken")? |
| De vetgedrukte deelzinnen | `PCF8574.html` | Ook ontvetten, of is de grens bij hele zinnen de juiste? |

## Labo 5

Klaar. Negen oefeningen plus vijf theoriepagina's; `dashboard.html` en `reference.html` hebben alleen
een boilerplate `lead` en zijn ongewijzigd gebleven. Geen enkele pagina bleef ongemoeid, en dat was te
verwachten: labo 5 is samen met labo 7 het recentst geschreven, en dus het zwaarst opgevoerd. Zestien
greppable meldingen, en de doorloop vond er ongeveer honderd.

Eén patroon overheerst zo sterk dat het het labo tekent: de **dubbele punt als aankondiging**
(patroon 4) kwam meer dan dertig keer terug, op elke pagina, altijd in dezelfde vorm van een bewering
gevolgd door haar reden ("Met een transistor los je dat op: een kleine stroom uit je pin schakelt een
veel grotere"). `want`, een punt of een bijzin was telkens het antwoord. Daarna volgen de slotzin die
moet blijven hangen (patroon 1) en `gewoon`/`precies` als vulling (patroon 13), elk zo'n vijftien keer.

Twee zinnen uit dit labo staan met naam in SCHRIJFSTIJL.md als voorbeeld en zijn nu weg: de `lead` van
`Stappenmotor.html` ("Een stappenmotor draait niet vanzelf rond.", patroon 6, letterlijk het "Na" van
het regeldocument overgenomen) en de eindaanslagzin op `RolluikMetLdrEnEindeloopschakelaars.html`
(patroon 1).

| Pagina | Wat er veranderde |
|---|---|
| [ServoMetPotentiometer.html](../Labo5/Exercises/ServoMetPotentiometer.html) | Vulwoorden `eigenlijk`, `gewoon`, `precies` en `even` weg (13), de dubbele punt bij de pinkeuze naar `want` (4), de werkwoordloze "Wel het omgekeerde onthouden:" naar een gewone zin, en "Die `delay(15)` is geen opvulling." weg voor de zin die daarna toch uitlegt wat er zonder gebeurt (6). |
| [DCMotorMetTransistor.html](../Labo5/Exercises/DCMotorMetTransistor.html) | "Van stilstand tot voluit, en alles ertussen." uit de `lead` samengevoegd (5), drie dubbele punten naar `want` of een punt (4), `flink` naar `ruim` (12), "Dat hoort zo." samengevoegd met de zin ervoor (5), en de vulwoorden `gewoon` en `precies` weg (13). |
| [DraairichtingMetL293.html](../Labo5/Exercises/DraairichtingMetL293.html) | "Eén knop, twee richtingen." uit de `lead` (5), de dubbele punt bij de transistor naar `want` (4), `eentje` naar "Pin 3 heeft een `~`" (11), en "en de `if` leest als een zin" weg (1). |
| [SnelheidEnRichtingMetL293.html](../Labo5/Exercises/SnelheidEnRichtingMetL293.html) | De `lead` begon op "Je vorige programma werkt, en toch deugt het niet." (1), wat de kop eronder toch al vraagt. Verder "Je H-brug krijgt die rekening." naar een mededeling (1), `stapje` twee keer naar `stap` (11), "Niet op 1A of 2A:" naar wat die twee wél doen (4 en 6), `vrolijk` bij de compiler weg (7), en `gewoon` en `precies` weg (13). |
| [DCMotorMetL298N.html](../Labo5/Exercises/DCMotorMetL298N.html) | `hobbymotortje` naar `hobbymotor` (11, zie hieronder), drie dubbele punten naar een punt (4), "want een H-brug is een H-brug" weg (1), een kommasplitsing bij het pinnummer, en `gewoon`, `precies` en `eentje` weg (11, 13). |
| [StappenmotorInFullStep.html](../Labo5/Exercises/StappenmotorInFullStep.html) | `netjes` twee keer weg, ook in een checklistregel (13), drie dubbele punten naar een punt (4), "Dat gaat hier niet met PWM." naar wat snelheid bij een stappenmotor wél is (6), de kadertitel "Te snel is echt te snel" naar "Te snel draaien laat de motor stappen overslaan" (10), "en gebeurt er van alles behalve wat je bedoelde" naar een mededeling (1), en "is de rest van het programma bijna leeg" weg (1). |
| [StappenmotorInHalfStep.html](../Labo5/Exercises/StappenmotorInHalfStep.html) | Zes dubbele punten naar `want` of een punt (4), `eentje` naar "een stand" (11), `netjes` uit het hintlabel en `gewoon` uit de tekst (13), en "Eenvoudiger:" naar een hele zin (4). |
| [StappenmotorRichtingMetDrukknop.html](../Labo5/Exercises/StappenmotorRichtingMetDrukknop.html) | De `lead` eindigde op een tegenstelling met dubbele punt en kommasplitsing ("hij meldt niet ..., hij meldt ...", 1 en 4), de kadertitel "Werkt het niet meteen? Bouw het in twee stappen" naar de mededeling alleen (3), de kadertitel "Die `delay()` is eigenlijk al te veel" naar "Met `millis()` mis je geen enkele druk" (13), `rustig` en `gewoon` weg (7, 13), en "dat ziet er precies uit als "hij doet soms niets"" naar een gewone vergelijking (13). |
| [RolluikMetLdrEnEindeloopschakelaars.html](../Labo5/Exercises/RolluikMetLdrEnEindeloopschakelaars.html) | "is een rolluik dat je één keer bouwt" naar "gaat stuk" (1, zie de vraag hieronder), `eentje` twee keer naar "zo'n schakelaar" (11), "Precies zoals de drukknop ..." en "Precies wat je wil." als werkwoordloze zinnen weg of samengevoegd (5), "Exact hetzelfde principe, en exact dezelfde reden." weg (5 en 10), vier dubbele punten naar een punt of `want` (4), en `vrolijk` en `rustig` weg (7). |
| [Servo.html](../Labo5/Reference/Servo.html) | `duwtje` naar "wanneer je tegen de as duwt" en `stapjes` naar `stappen` (11), "Je zou het verwachten, maar het klopt niet." weg (1), "ook maar één servo" naar "één servo" (10, zoals "zonder ook maar één extra pin" in labo 3), de kadertitel "Twee voedingen? Verbind de massa's!" naar "Twee voedingen delen hun massa" (3 en 10), en `letterlijk` en `perfect` als nadruk weg (13). |
| [DCMotor.html](../Labo5/Reference/DCMotor.html) | `prima` naar "zonder problemen" (12), "een pak meer" naar "veel meer" (zie hieronder), de dubbele punt in de `lead` naar een punt (4), "Wat hij *niet* weet, is waar hij staat." naar wat hij wél doet (6), "Dat hoef je niet te gokken." naar "Meet het, in plaats van te gokken." (6), en `gewoon` weg (13). |
| [TransistorAlsSchakelaar.html](../Labo5/Reference/TransistorAlsSchakelaar.html) | De zwaarste pagina van het labo. Zeven dubbele punten naar `want` of een punt (4), "De vraag is dus: hoe groot moet ze zijn?" weg (3), "En hier komt de stap die je niet mag overslaan." weg (1), "die staat daar niet toevallig" en "Dat is trouwens geen toeval" weg (1), "Dat is te krap." samengevoegd (5), `flink` naar `ruim` (12), `eentje` naar "een weg" en `tikje` naar `iets` (11), `pootjes` naar `aansluitingen` (11, zie hieronder), `streepje` naar `streep` zoals de rest van de repo het zegt, en `gewoon`, `precies` en `rustig` weg (13). |
| [HBrug.html](../Labo5/Reference/HBrug.html) | "in plaats van met je vingers" weg (1), "zonder ook maar één draad te verleggen" naar "zonder een draad te verleggen" (10), "De reden is eenvoudig:" weg voor de reden zelf (4), "Je gaat geen H-brug uit losse transistoren bouwen:" naar wat je wél doet (6), vier andere dubbele punten naar een punt of `want` (4), "is een dure manier om een motor te slopen" naar "dan maak je hem stuk" (1), en `netjes`, `gewoon` en `precies` weg (13). |
| [Stappenmotor.html](../Labo5/Reference/Stappenmotor.html) | De `lead` is het "Na"-voorbeeld van patroon 6 uit SCHRIJFSTIJL.md geworden. Verder "Twee spoelen, twee bruggen, en dat is precies wat er in één L293D zit." naar een mededeling (1), "Anti-parallel wil zeggen: naast elkaar, maar omgekeerd." naar een hele zin (4, exact de vorm uit het regeldocument), vijf andere dubbele punten (4), `lusje` naar `lus` en `netjes` weg (11, 13), "een pak beter" naar "veel beter" en "maakt de volgende oefeningen bijna gratis" weg (1), "Meer moet dat niet zijn." weg (5), een kommasplitsing bij de trillende rotor, en `gewoon` en `precies` weg (13). |
| [reference.js](../reference.js) | De blurb van *De DC motor* had dezelfde dubbele punt als de `lead` van die pagina (4). |

Woorden toegevoegd aan `scripts/check-content.sh`: **geen**. `flink`, `prima`, `netjes`, `eentje`,
`stapje` en `duwtje` stonden er al en vingen precies de zestien meldingen die er stonden. Twee dingen
zijn wel gemeten en bewust niet toegevoegd:

- `hobbymotortje` (`DCMotorMetL298N.html`) glipte door `DIMINUTIVES` omdat `motortje` daar met `\b`
  aan beide kanten staat en de samenstelling dus niet aanslaat. Na deze doorloop staat de repo op nul
  samenstellingen met een verkleinwoord erin (gemeten op `motortje`, `lampje`, `knopje`, `blokje`,
  `schermpje` en `draadje`), dus er is niets om te vangen. De `\b` oprekken tot `\w*motortje` zou een
  regel toevoegen die vandaag nergens iets meldt.
- `een pak` als versterker. Twee voorkomens hier, twee in labo 7 (`Interruptpinnen.html`,
  `VolatileEnVlaggen.html`). Die van labo 5 zijn `veel` geworden; die van labo 7 blijven staan tot dat
  labo aan de beurt is, tenzij je hieronder anders beslist. Niet in `NOORD_NL` gezet, want het is
  Belgische spreektaal en die lijst meldt het omgekeerde, net zoals bij `deftig` in labo 4.

### Twijfelgevallen

| Wat | Waar | Beslissing |
|---|---|---|
| `pootjes` bij een transistor | `TransistorAlsSchakelaar.html` ("Een NPN-transistor heeft drie pootjes") | **Naar `aansluitingen`.** SCHRIJFSTIJL.md 11 beschermt `pootjes` als vakterm, maar dat gaat over de buitenste pootjes van een potentiometer, en het ijkpunt `WatIsEenMicrocontroller.html` zette "een rij pootjes" om naar "een rij aansluitingen". Gemeten: de vijf overblijvende `pootjes` in de repo slaan allemaal op een potentiometer. Bovendien heten ze op deze pagina zelf al "aansluitingen", in de kop en in de tabel erboven. |
| `streepje` | `TransistorAlsSchakelaar.html` | **Naar `streep`.** De oefening en het kader op dezelfde pagina zeggen allebei al "met de streep naar de plus". Consistentie, geen nieuwe regel. |

Voorgelegd, en alle vier beslist in de herziening van 28 juli 2026: de rolluikzin wordt herschreven
zonder beeld, tot wat de eindeloopschakelaar doet (patroon 15, en het feit dat ik niet had is dan
niet meer nodig); "een pak" blijft weg als spreektaal, ook in labo 7; het beletselteken in het
spoilerlabel gaat weg; en de kop "De volgorde is het hele punt" noemt voortaan zijn onderwerp.

| Wat | Waar | De vraag |
|---|---|---|
| "Een rolluik dat aan volle snelheid tegen zijn eindaanslag knalt, **gaat stuk**." | `RolluikMetLdrEnEindeloopschakelaars.html` | De oude slotzin ("is een rolluik dat je één keer bouwt") staat in SCHRIJFSTIJL.md als voorbeeld van patroon 1 en moest dus weg. Wat er nu staat is mijn parafrase van wat die zin impliceerde. Klopt "gaat stuk", of is het preciezer om te zeggen wát er stukgaat (de aanslag, de tandwielkast, de motor)? Dat is een feit dat ik niet heb. |
| "een pak beter / een pak meer" | Labo 5 (gedaan), `Labo7/Reference/Interruptpinnen.html` en `VolatileEnVlaggen.html` (nog niet) | Belgische spreektaal, dezelfde categorie als `deftig` in labo 4. In labo 5 naar `veel`. Meteen repo-breed doortrekken naar labo 7, of wachten tot dat labo aan de beurt is? |
| "Toon antwoord: waarom is die code slecht? Stel je een motor voor die aan 10000 toeren draait..." | `SnelheidEnRichtingMetL293.html`, label van de spoilerknop | Blijven staan. Het label stelt een echte vraag aan de student (patroon 3 laat die toe) maar eindigt op een beletselteken dat spanning opbouwt. De andere spoilerknoppen in dit labo zeggen gewoon waar het antwoord over gaat. Het beletselteken schrappen, of is de aanzet hier didactisch bedoeld? |
| Kop "De volgorde is het hele punt" | `StappenmotorInFullStep.html` | Blijven staan. De kop zegt iets, en dat is beschermd, maar hij is gebouwd als een pointe in plaats van als een onderwerp. Vervangen door "De volgorde van de stappen", of is de nadruk hier terecht, gezien het kader eronder net die fout behandelt? |

## Labo 6

Klaar. Acht oefeningen plus vier theoriepagina's; `dashboard.html` en `reference.html` hebben deze
keer wél een eigen `lead` gekregen, want dat is de eerste doorloop sinds de herziening van 28 juli
2026 die dat vraagt. Geen enkele pagina bleef ongemoeid.

Twee patronen tekenen dit labo. De **dubbele punt als aankondiging** (patroon 4) kwam ruim twintig
keer terug, altijd als een bewering gevolgd door haar reden ("Aan Arduino 2 hangt niets: die schrijft
alleen naar zijn eigen monitor"), en `want` of een punt was telkens het antwoord. Daarnaast staan
hier zeven **kadertitels met een ontkenning**, veel meer dan in eender welk ander labo: dit labo legt
graag uit wat er misgaat, en zette dat in de titel.

Drie zinnen uit dit labo staan met naam in SCHRIJFSTIJL.md als voorbeeld en zijn nu weg: "Serieel
betekent: achter elkaar." (patroon 4, de `lead` van `SerieelKanaal.html`, letterlijk het "Na" van het
regeldocument overgenomen), "Verbind je Tx met Tx, dan zitten twee zenders tegen elkaar te roepen en
luistert er niemand." (patroon 1, dezelfde pagina) en "Over een seriële lijn gaan geen getallen."
(patroon 6, de `lead` van `TekensEnGetallen.html`).

| Pagina | Wat er veranderde |
|---|---|
| [LedSchakelenVanuitDeMonitor.html](../Labo6/Exercises/LedSchakelenVanuitDeMonitor.html) | Het klemtoonaccent uit "náár de Arduino" (10), "Niets nieuws: één led ..." naar wat je wél nodig hebt (4 en 6), kadertitel "Vergeet de trim() niet" naar "Roep trim() op voor je vergelijkt" (6 in een kop), "zonder ook maar één foutmelding" naar "zonder foutmelding" (10), "De `else` onderaan is geen versiering." omgedraaid naar de reden zelf (6), en `gewoon` (3x) en `even` weg (13). |
| [GetalNaarTweedeArduino.html](../Labo6/Exercises/GetalNaarTweedeArduino.html) | Kadertitel "Kruisen, niet recht doorverbinden" naar "De draden gaan gekruist" (6 in een kop), de roepende zenders eruit (1 en 7, zie hierboven), "Er verandert verrassend weinig: ..." naar een bijzin (4), "Nu leest Arduino 2 geen lijn meer, maar ..." naar wat hij wél leest (6), "Dat is ook het punt: zenden is het gemakkelijke deel" naar een mededeling (4), "het is niet omdat iets in een monitor staat, dat ..." naar de bewering zelf (4 en 6), en `Precies die twee` naar `Die twee` (10). |
| [DrukknopHierLedDaar.html](../Labo6/Exercises/DrukknopHierLedDaar.html) | De `lead` eindigde op de werkwoordloze "Alleen de seriële lijn." na een ontkenning (5 en 6), "Dat is precies wat serieel communiceren in de praktijk zo bruikbaar maakt." weg (1), twee klemtoonaccenten ("veránder", "dóór", 10), kadertitel "De lijn is niet oneindig snel" naar "De lijn heeft een beperkte snelheid" (6 in een kop), en de slotzin "Dat is de kracht van een afspraak over wat er op de lijn staat." weg (1). |
| [PotentiometerwaardeDoorsturen.html](../Labo6/Exercises/PotentiometerwaardeDoorsturen.html) | "en dat is iets anders: ..." naar een punt, met het accent uit "hóé vaak" (4 en 10), en `gewoon` weg plus "daar gaan we er iets aan doen" naar de je-vorm (13). |
| [DrieGetallenOptellen.html](../Labo6/Exercises/DrieGetallenOptellen.html) | "duikt er een nieuw probleem op: ..." naar `want` (4), "In de volgende lossen we het op" naar de je-vorm, "`random()` is niet echt willekeurig: ..." naar wat het wél doet (4 en 6), kadertitel "random(0, 1000) geeft geen 1000" naar "De bovengrens van random() valt erbuiten" (6 in een kop), "Dat is precies het probleem waar de volgende oefening een antwoord op geeft." weg (1, de inleiding zegt het al), "En dat is meteen de zwakke plek." naar de bewering zelf (1), en `gewoon` (2x), `eigenlijk`, `exact` en `letterlijk` weg (13). |
| [BoodschappenMetEenSleutel.html](../Labo6/Exercises/BoodschappenMetEenSleutel.html) | `perfect` als nadruk weg uit de `lead` (13), "liep vast op één punt: ..." naar `want` (4), "We spreken af dat ..." naar de je-vorm, "Aan Arduino 2 hangt niets: ..." omgedraaid (4), kadertitel "Vang op wat je niet verwacht" naar "Controleer eerst wat er binnenkomt" (6 in een kop), "Dát is wat je met een sleutel wint." weg (1 en 10), en de slotalinea van de oplossing zonder "Het mooie aan ..." en zonder de tegenstelling op het einde (1 en 4). |
| [WeerstationOpLcd.html](../Labo6/Exercises/WeerstationOpLcd.html) | `schermpje` naar `scherm` (11), "Arduino 1 verandert niet." naar "blijft zoals hij was" (6), kadertitel "Een LCD wist zichzelf niet" naar "Wis het scherm voor je nieuwe tekst zet" (6 in een kop), "en kan je hem dus ook maar één keer vergeten" weg (1), "Dat hoeft ook niet: ..." naar `want` (4), het accent uit "wél nodig" (10), en `gewoon` (2x) en `even` weg (13). |
| [ArduinoAansturenVanafPc.html](../Labo6/Exercises/ArduinoAansturenVanafPc.html) | De `lead` begon zijn tweede zin op een ontkenning zonder werkwoord (5 en 6), "Er is niets dat je tegenhoudt om dat zelf te doen." naar "en dat kan je zelf ook" (6), kadertitel "Twee programma's kunnen niet samen aan dezelfde poort" naar "De COM-poort is voor één programma tegelijk" (6 in een kop), "Dat is ook het punt: ..." naar `want` (4), "Wil je verder gaan: ..." naar een gewone bijzin (4), kadertitel "Twee details in het C#-programma die het waard zijn" naar "Drie details in het C#-programma" (het kader beschrijft er drie, zie hieronder), en `uiteindelijk` en `gewoon` weg (13). |
| [SerieelKanaal.html](../Labo6/Reference/SerieelKanaal.html) | De `lead` is het "Na"-voorbeeld van patroon 4 uit SCHRIJFSTIJL.md geworden. Verder "Wat je toen niet zag: ..." naar de bewering zelf (4 en 6), de roepende zenders eruit (1 en 7), "zijn Rx en Tx geen aparte connectoren: het zijn gewoon ..." naar wat ze wél zijn (4, 6, 13), "Dat is meteen de reden waarom ..." naar `Daarom` (1), kadertitel "vecht pin 0 en 1 met je USB-kabel" naar "deelt je USB-kabel pin 0 en 1" (15), "kost het je anders een uur zoeken" weg (1), "de ontvanger weet niet uit zichzelf ...: hij gaat er gewoon van uit" naar wat hij wél doet (4, 6, 13), de werkwoordloze "Precies hetzelfde als wanneer ..." samengevoegd (5), en "Dat is geen fout, dat is handig: ..." naar "Dat is handig, want ..." (4 en 6). |
| [TekensEnGetallen.html](../Labo6/Reference/TekensEnGetallen.html) | De `lead` opende op de ontkenning uit SCHRIJFSTIJL.md 6 en dreigde daarna ("begrijp je nooit waarom"). Verder "Precies wat je verwacht: honderd, in bits." naar een hele zin (4 en 5), "dan komt er geen enkele byte 01100100 binnen" naar de drie die er wél komen (6), kadertitel "Het teken '1' is niet het getal 1" naar "Het teken '1' heeft de waarde 49" (6 in een kop), "lijken een detail, maar ze zijn het niet" weg (8), "is er geen mens die daar nog 12, 13 en 17 uit haalt" naar een mededeling (1), "Doe je het niet, dan raak je vroeg of laat het spoor bijster." weg (8), en "dat we in dit labo gebruiken" in een tabelcel naar de je-vorm. |
| [BoodschappenLezen.html](../Labo6/Reference/BoodschappenLezen.html) | "Binnenkomende bytes blijven niet hangen tot jij er tijd voor hebt: ..." naar wat er wél gebeurt (4 en 6), "want de bytes wachten op je" naar "blijven in de buffer staan" (7, exact het voorbeeld uit SCHRIJFSTIJL.md 13), "Veel handiger: ..." naar een hele zin (4 en 5), "De `trim()` is geen overbodige luxe." naar "is nodig" (6), kadertitel "Gebruik altijd het teken '\n', nooit "\r\n"" naar "Geef readStringUntil() één teken" (6 in een kop), de dubbele punt uit de `lead` (4), en `netjes` weg (13). |
| [Strings.html](../Labo6/Reference/Strings.html) | `eentje` naar `een` en `functietje` naar `functie` (11), "dat is geen typfout maar de naam van het type" naar de bewering zelf (6), kadertitel "Een punt, geen komma" naar "toFloat() verwacht een decimale punt" (6 in een kop), "In dit labo spreken we af ..." naar de je-vorm, "Waarom die `if (scheiding > 0)`?" naar een mededeling (3), "daarom doen we het hier niet: ..." naar een punt en de je-vorm (4), zes andere dubbele punten (4), twee klemtoonaccenten ("vrágen", "dáárna", 10), "zonder ook maar één foutmelding" naar "zonder foutmelding" (10), en `gewoon` (4x) en `netjes` weg (13). |
| [dashboard.html](../Labo6/Exercises/dashboard.html) en [reference.html](../Labo6/Reference/reference.html) | Allebei een eigen `lead` in plaats van de boilerplate (9). Het uitroepteken op het dashboard ging mee weg (10). |
| [exercises.js](../exercises.js) en [reference.js](../reference.js) | De blurb van *Drie soorten boodschappen uit elkaar houden* eindigde op "je ontvanger raakt nooit meer in de war" (1 en 7); die van *Het seriële kanaal* op pinnen die "met je USB-kabel vechten" (15), zoals de kadertitel op die pagina. |

Woorden toegevoegd aan `scripts/check-content.sh`: **geen**. `schermpje`, `eentje`, `functietje` en
`netjes` stonden er al en vingen precies de vijf meldingen die er stonden.

### Twee dingen die geen stijl zijn

Allebei komen ze uit de repo-brede doorloop `LED` → `led` van na labo 1, die in de lopende tekst geen
onderscheid kon maken tussen het woord *led* en de protocolsleutel `LED` van dit labo. Ze zijn hier
rechtgezet, want de pagina's spraken hun eigen code tegen.

- `Strings.html` zei "Hoofdletters tellen mee, dus `"led"` is niet hetzelfde als `"led"`". De eerste
  is weer `"LED"`, zoals in het codevoorbeeld eronder (`if (sleutel == "LED")`). Ook
  `sleutel.equals("led")` in dezelfde alinea is weer `equals("LED")`.
- De sleutel van het pc-protocol stond op vijf plaatsen in lopende tekst als `led:1` / `led:0`,
  terwijl het meegeleverde C#-project `WriteLine("LED:1")` stuurt en de sketch op `"LED"` vergelijkt.
  Rechtgezet op `ArduinoAansturenVanafPc.html` (tabel en opgave), `BoodschappenLezen.html` en
  `Strings.html`.

### Taalfout, blijven staan

Volgens het bereik sinds 28 juli 2026 gaat een taalfout niet mee in de diff van een stijlronde.

- "Waarom zenden zonder pauze mis loopt" (`PotentiometerwaardeDoorsturen.html`, kadertitel):
  `misloopt` is één woord.

### Twijfelgevallen

| Wat | Waar | Beslissing |
|---|---|---|
| Kadertitel "Twee details in het C#-programma die het waard zijn" | `ArduinoAansturenVanafPc.html` | **"Drie details in het C#-programma".** De staart was opsmuk, en het kader beschrijft er drie (`DtrEnable`, `NewLine`, `ReadTimeout`). Zelfde ingreep als "Twee grensgevallen" → "Drie grensgevallen" in labo 2. |
| Kop "Het recept: SLEUTEL:WAARDE" | `Strings.html` | **"SLEUTEL:WAARDE uit elkaar halen".** Eerst bleef die kop staan: de dubbele punt noemde hier het onderwerp en kondigde geen pointe aan, dezelfde afweging als "De oplossing: multiplexing" in labo 1. Op 28 juli 2026 alsnog herzien, niet om de dubbele punt maar om het woord: `recept` is beeldspraak (15) voor een stuk code, en het staat nergens anders in de cursus. Overal weg, ook in de blurb in `reference.js`, in `BoodschappenMetEenSleutel.html` ("de aanpak die je hier gaat toepassen") en in vraag 3 van `Test3/TheoretischeVoorbeeldtest.html`. Vergelijk "Het recept:" in `NoodstopOverDeSerieleLijn.html`, dat in labo 7 al sneuvelde. |
| `pootjes` van de potentiometer | `PotentiometerwaardeDoorsturen.html` | **Blijft.** SCHRIJFSTIJL.md 11 beschermt dit als de vakterm voor de buitenste aansluitingen van een potentiometer, en dat is precies het gebruik hier. |

Voorgelegd, en alle drie meteen beslist en uitgevoerd. De rode draad in de drie beslissingen: het
letterlijke woord hoefde niet verzonnen te worden, het stond telkens al elders op de pagina, en dan
is het volgens patroon 15 een stijlingreep en geen inhoudelijke wijziging.

| Wat | Waar | De beslissing |
|---|---|---|
| "`serialPort.ReadTimeout = 2000;` is je **vangnet**." | `ArduinoAansturenVanafPc.html` | **"begrenst hoelang C# op een antwoord wacht".** Beeldspraak (15). "Beveiliging tegen een Arduino die niet antwoordt" was het alternatief, maar dat herhaalt de zin erna letterlijk; wat de regel dóét stond nog nergens. |
| "de veiligste weg is om `String` helemaal **links te laten liggen**" | `Strings.html` | **"dan laat je `String` beter achterwege".** Vaste uitdrukking, maar wel een beeld (15), en de zin was met "de veiligste weg is om" bovendien omslachtig. |
| "Ergens tussen twintig en vijftig keer per seconde **voelt goed**." | `PotentiometerwaardeDoorsturen.html` | **"is ruim genoeg".** Geen van de vijftien patronen, maar de oplossing en het codecommentaar op dezelfde pagina zeggen allebei al "ruim genoeg" en "ruim binnen wat de lijn aankan". Nu kiest het labo een zendfrequentie op dezelfde grond als het ze verantwoordt. |

## Labo 7

Klaar. Acht oefeningen plus vijf theoriepagina's, en `dashboard.html` en `reference.html` met een
eigen `lead` in plaats van de boilerplate. Geen enkele pagina bleef ongemoeid. Samen met labo 5 is
dit het recentst geschreven labo, en dat is te zien: 28 greppable meldingen, en de doorloop vond er
ruim honderdvijftig.

Drie patronen tekenen dit labo. Het **klemtoonaccent** (patroon 10) stond er dertig keer, veel meer
dan in eender welk ander labo: `k&aacute;n`, `m&oacute;&eacute;t`, `w&aacute;&aacute;rom`,
`r&eacute;&aacute;geert`, `bl&iacute;jft`. Alles is weg, behalve `&eacute;&eacute;n` en
`v&oacute;&oacute;r`, waar het accent spelling is en geen nadruk. Daarnaast de **dubbele punt als
aankondiging** (patroon 4), ruim veertig keer, en de **slotzin die moet blijven hangen** (patroon 1),
waarvan er twee dezelfde levensles waren ("Weten w&aacute;&aacute;rom je iets doet, bepaalt of je het
de volgende keer nog moet doen." op `DrukkenTellenZonderDender.html` en `LedsOpDeExpander.html`).

Vier zinnen uit dit labo staan met naam in SCHRIJFSTIJL.md als voorbeeld en zijn nu weg, alle vier op
de theoriepagina's: "Nu zet je er &eacute;&eacute;n regel bij. Eentje maar." (patroon 5,
`PollenEnInterrupts.html`), "Waarom? Omdat de compiler slim is, en die slimheid hier tegen je werkt."
en "denkt hij: die verandert hier toch nergens" (patroon 3 en 7, `VolatileEnVlaggen.html`), en
"Vergeet je `volatile`, dan compileert alles netjes." plus "Regel: elke variabele ... Zonder
uitzondering." (patroon 13, 4 en 5, dezelfde pagina). Ook "Het bericht wacht netjes in zijn
ontvangstbuffer" op `NoodstopOverDeSerieleLijn.html` is het "Na" van patroon 13 geworden.

| Pagina | Wat er veranderde |
|---|---|
| [LedAanMetEenInterrupt.html](../Labo7/Exercises/LedAanMetEenInterrupt.html) | De dubbele punt uit de `lead` (4), "Zes labo's lang stond alles ..." naar de terugkoppeling als feit, vier klemtoonaccenten (10), kadertitels "Probeer dit eens, het is de hele les van deze oefening", "Waarom FALLING en niet RISING?" en "Er staan geen haakjes achter ledAan" naar titels die hun onderwerp noemen (1 en 6 in een kop), "Dat is geen fout, dat is precies wat je geschreven hebt: ..." omgedraaid (4, 6, 13), `netjes` en `gerust` weg (13), en de slotzin "Dat is er dan nog eentje die je zelf kan oplossen." weg (1 en 11). |
| [DrukkenTellenZonderDender.html](../Labo7/Exercises/DrukkenTellenZonderDender.html) | De `lead` bouwde op via "Klinkt eenvoudig." naar valkuilen die je "blijven achtervolgen" (5, 7), kadertitel "Print niet vanuit je ISR" naar "Het printen hoort in je loop()" (6 in een kop), "Waarom TinkerCAD hier liegt" naar "Een echte knop stuitert bij elke druk" (7), "De drukknop in TinkerCAD is perfect: ..." (4, 13), "Waarom laatsteDruk geen bescherming nodig heeft" en "En als je nu 200 keer per seconde moet kunnen tellen?" naar hun onderwerp (3 en 6 in een kop), "De vuistregel blijft: ..." (4), `netjes`, `gewoon` en een klemtoonaccent weg (10, 13), een checklistregel zonder "Je monitor wordt niet overspoeld" (4, 15), en de slotzin over w&aacute;&aacute;rom je iets doet weg (1). |
| [LooplichtMetNoodstop.html](../Labo7/Exercises/LooplichtMetNoodstop.html) | "Dit is de oefening waarin de kernles van dit labo op zijn plaats valt." uit de `lead` (1, 15), "Netjes kort, precies zoals het hoort." samengevoegd (5, 13), `looplichtje` en `lusje` naar `looplicht` en `lus` (11), `zinnetje` naar `zin` (11) met drie klemtoonaccenten (10), "Een noodstop die "straks" stopt, is geen noodstop." weg (1), `doodleuk` bij de `loop()` weg (7), "Onschuldig." tot een zin gemaakt (5), de kadertitel "Waarom noodstop geen noInterrupts() nodig heeft" naar "Waarom &eacute;&eacute;n byte altijd volledig gelezen wordt" (6 in een kop), en "Een noodstop hoeft niet elegant te zijn, hij moet werken." weg (1). |
| [MotorMetNoodstop.html](../Labo7/Exercises/MotorMetNoodstop.html) | "De noodstop. Altijd." samengevoegd (5), "Dat is geen regeltje uit dit vak, ... waarvoor te laat gelijkstaat aan te laat." naar het criterium zelf (1, 4, 6, 11), `flink` naar `ruim` en de wij-vorm naar de je-vorm (12), kadertitels "Reken niet met de hFE uit de datasheet zelf", "De startknop is tien seconden lang doof", "Het kan netter, en dat is een keuze" en "Had het ook anders gekund?" naar titels die hun onderwerp noemen (3, 6 in een kop, 15), "Dat is geen bug." weg (6), drie klemtoonaccenten (10), `precies` twee keer weg (13), en de slotzin over "een noodstop die werkt <em>en</em> het meldt" weg (1). |
| [KnoppenOpDePCF8574.html](../Labo7/Exercises/KnoppenOpDePCF8574.html) | "Vanaf nu belt hij jou op. En je botst meteen op de scherpste regel van dit labo." uit de `lead` naar wat die regel is (1, 7), `zinnetje` naar `zin` en `streepje` naar `streep` (11, zoals in labo 5), kop "Valkuil 1: je mag de expander niet uitlezen in je ISR" naar "de expander uitlezen hoort in je loop()" en kadertitel "Je hebt die weerstand niet nodig" naar "De pull-up zit al in je Arduino" (6 in een kop), "ze zijn alle drie het soort waar je een halve avond op kan zoeken" ingekort (1), "Geen foutmelding, geen timeout: gewoon een dood bord." naar een mededeling (4, 5, 13), "En nee, je lost dit niet op ..." zonder de aanspreking (14), vier andere dubbele punten (4), "en lijkt hij dood" naar "en zie je er niets van" (7), en `gewoon` en `precies` weg (13). |
| [VierKnoppenTweeLeds.html](../Labo7/Exercises/VierKnoppenTweeLeds.html) | "Tijd om te leren welke knop welke is." uit de `lead` (5), `eentje` naar `&eacute;&eacute;n` (11), de dubbele punt bij de interruptpin naar `want` (4), kadertitels "Test op netIngedrukt, niet op knoppen" en "Waarom de test niet == B00000001 is" naar hun onderwerp (6 in een kop), en "Dat lijkt haarkloverij tot je twee knoppen tegelijk aanraakt" naar wat er dan gebeurt (1). |
| [LedsOpDeExpander.html](../Labo7/Exercises/LedsOpDeExpander.html) | `flinke` naar `grote` (12), `chipje` naar `chip` en `eentje` naar "een bus" (11), drie klemtoonaccenten (10), kadertitels "Neem hier 470 &Omega; of 1 k&Omega;, geen 220 &Omega;", "Dat maakt deze oefening op &eacute;&eacute;n punt makkelijker", "Die i + 4 is de hele oefening" en "Waar is de vlag eigenlijk nog goed voor?" naar titels die hun onderwerp noemen (1, 3, 6 in een kop, 13), "je loopt er gegarandeerd in" weg (1), de tweede levensles weg (1, zie hierboven), "Geen vorigeKnoppen, geen flankdetectie, geen ontdendering: ... en meer moet dat niet zijn" naar een mededeling (4, 5), `platleggen` naar "laag zetten" en `ademruimte` naar "ruimte overhoudt" (15), "Kort, en volstrekt onleesbaar" tot een zin gemaakt (5), en `exact`, `gewoon` en `precies` weg (13). |
| [NoodstopOverDeSerieleLijn.html](../Labo7/Exercises/NoodstopOverDeSerieleLijn.html) | De vechtende kruisdraden eruit (15, zoals in labo 6), koppen "De eerste valkuil: niet zenden vanuit je ISR" en "De tweede valkuil: en dan komt hij toch te laat aan" naar hun onderwerp (6 in een kop), kadertitels "Je interrupt heeft je hier niets opgeleverd" en "Kon Arduino 1 dan zelf geen interrupt gebruiken?" idem, "Het bericht wacht netjes in zijn ontvangstbuffer" naar het "Na" van patroon 13, "Zit de ontvanger vast, dan sta je nergens." weg (1), "Precies zoals bij de expander." samengevoegd (5, 10), "Het recept:" weg (4), zeven klemtoonaccenten (10), `eentje` twee keer, "of er post is" naar "of er iets binnengekomen is" en "doof te maken" naar "te missen" (7, 11, 15), `perfect` weg (13), en de slotzin over "het werkt meestal" naar "het werkt altijd op tijd" weg (1). |
| [PollenEnInterrupts.html](../Labo7/Reference/PollenEnInterrupts.html) | De `lead` opende op "Zes labo's lang" en op "Hier zie je waar die manier van werken stukloopt" (9), met `prima` (12) en een klemtoonaccent (10). Verder "Eentje maar." weg (5, het voorbeeld uit het regeldocument), "Die manier van werken heeft een naam:" (4), kop "Een noodstop die niet stopt" naar "Een noodstop die tien seconden te laat komt" en kadertitel "Een interrupt is geen "heel snel pollen"" naar wat hij w&eacute;l doet (6 in een kop), "Dat is geen noodstop. Dat is een suggestie." naar "Zo'n noodstop is onbruikbaar." (1, 6), "Het probleem is niet dat je code fout is." omgedraaid (6), "Niet afgewerkt, niet netjes afgerond: middenin gepauzeerd." naar een zin (4, 5, 13), `zinnetje` en `woordje` naar `zin` en `woord` (11), `perfect` en `gewoon` weg (13), en de kop "En nu?" naar "Verder lezen" (3). |
| [Interruptpinnen.html](../Labo7/Reference/Interruptpinnen.html) | De dubbele punt uit de `lead` (4), "hoe graag je het ook wil" weg (14), kadertitel "Een verkeerde pin geeft geen foutmelding" naar "Op een verkeerde pin gebeurt er nooit iets" (6 in een kop), "De hardware in de chip kent je pinnummers niet." omgedraaid (6), "Het voordeel is meer dan cosmetisch:" weg (4, 10), "een pak minder logisch" naar "veel minder logisch" en de wij-vorm naar de je-vorm, "zonder ook maar &eacute;&eacute;n waarschuwing" naar "zonder waarschuwing" en "Dat is precies waarom" naar "Daarom" (10), "En nog iets om in je achterhoofd te houden:" weg (4), twee andere dubbele punten (4), een klemtoonaccent (10), en "En nu?" naar "Verder lezen" (3). |
| [InterruptServiceRoutine.html](../Labo7/Reference/InterruptServiceRoutine.html) | De drie parallelle koppen "Geen delay()", "Geen Wire, dus geen I&sup2;C" en "Geen Serial.print()" naar "delay() blijft hangen", "Wire hangt je bord op" en "Serial vertraagt alles" (6 in een kop). De parallellie blijft, en het is nu exact de formulering van de blurb in `reference.js`. Verder de kadertitel "Nee, je lost dit niet op met interrupts() bovenaan je ISR" naar "Waarom interrupts() in je ISR gevaarlijk is" (6, 14), de vetgedrukte deelzinnen "alle andere interrupts staan ook uit" en "geen enkele I&sup2;C-opdracht in een ISR" ontvet (10), "Je bord is dood" naar "Je bord hangt" (15), de vraagvorm "zet ik ze toch gewoon weer aan ...?" naar een mededeling (3), "Dat werkt. En daarom is het gevaarlijk." samengevoegd (5), "De oplossing is niet de interrupts aanzetten." omgedraaid (4, 6), "je probeert het, het lijkt te werken, en je gelooft de waarschuwing niet meer" ingekort (2), `prima` naar `kan` en `heel even` naar `kort` (12, 13), en `gewoon`, `precies` en "oneindig veel" weg (10, 13). |
| [VolatileEnVlaggen.html](../Labo7/Reference/VolatileEnVlaggen.html) | De zwaarste pagina van het labo, en de pagina waar het regeldocument zijn voorbeelden vandaan haalde. "Hier lees je" uit de `lead` (9), "Waarom? Omdat de compiler slim is" naar het "Na" van patroon 3, "denkt hij: die verandert hier toch nergens" naar het "Na" van patroon 7, "Vergeet je volatile, dan compileert alles netjes" naar het "Na" van patroon 13, "Regel: ... Zonder uitzondering." naar &eacute;&eacute;n zin (4, 5), "Het idee:" weg (4), kadertitels "Je krijgt hier geen waarschuwing over" en "Raak je zo geen drukken kwijt?" naar hun onderwerp (6 in een kop), "een pak beter" naar "veel beter" en `eventjes` naar `kort` (12), "gesloopt" naar "stukgemaakt" en `razendsnel` weg (10, 15), "Niet 255, niet 256, maar ..." ingekort (2), `stiekem` bij het optellen weg (7), en "En nu?" naar "Verder lezen" (3). |
| [DenderenBijEenInterrupt.html](../Labo7/Reference/DenderenBijEenInterrupt.html) | `rommeltje` naar `rommel` in een `figcaption` (11), "maakt hij niet netjes &eacute;&eacute;n keer contact: ..." naar wat hij w&eacute;l doet (4, 6, 13), "Het idee:" weg (4), "Dat is precies wat je wil: de goedkoopst mogelijke manier" naar &eacute;&eacute;n zin (4, 13), "Goeie vraag, want" weg (14), "De drukknop in TinkerCAD is perfect:" (4, 13), "Snel gefikst" naar "Dat is snel gedaan" (5), twee klemtoonaccenten (10), en drie andere dubbele punten (4). |
| [dashboard.html](../Labo7/Exercises/dashboard.html) en [reference.html](../Labo7/Reference/reference.html) | Allebei een eigen `lead` in plaats van de boilerplate (9). Het uitroepteken op het dashboard ging mee weg (10). |
| [exercises.js](../exercises.js) en [reference.js](../reference.js) | De blurb van *Een led die aangaat zonder loop* eindigde op "Vanaf nu wacht je niet meer, je wordt geroepen" (1, 4); die van *Noodstop op je looplicht* op een noodknop "die dwars door een delay heen snijdt" plus "De les van dit labo in &eacute;&eacute;n sketch." (5, 15). In `reference.js` de blurb van *Van pollen naar interrupts* (10, 13) en die van de PCF8574-datasheet (4). |

Woorden toegevoegd aan `scripts/check-content.sh`: **geen**. De achttien meldingen kwamen allemaal uit
woorden die er al stonden. Twee dingen zijn wel gemeten en bewust niet toegevoegd:

- Het klemtoonaccent (`k&aacute;n`, `w&eacute;l`, `m&iacute;st`). Dertig voorkomens in labo 7 en nul
  in de rest van de repo na deze doorloop, dus een regel erop zou vandaag nergens iets melden. Een
  grep zou bovendien `&eacute;&eacute;n` en `v&oacute;&oacute;r` moeten uitzonderen, waar het accent
  spelling is, en dat is precies het soort filter dat volgens CLAUDE.md fout gaat.
- `perfect` als versterker ("de drukknop in TinkerCAD is perfect", "ook al is de knop zelf perfect").
  Vier voorkomens hier, allemaal weg, maar het woord betekent elders in de repo gewoon wat het zegt.

### Twijfelgevallen

| Wat | Waar | Beslissing |
|---|---|---|
| De drie "Geen ..."-koppen | `InterruptServiceRoutine.html` | **Herschreven met behoud van de parallellie.** De achterstandslijst hield er rekening mee dat de reeks haar parallellie zou verliezen; dat hoefde niet, want de blurb in `reference.js` gaf de drie werkwoorden al ("blijft hangen", "hangt je bord op", "vertraagt alles"). |
| Kadertitel "In TinkerCAD zie je hier niets van" | `DenderenBijEenInterrupt.html` | **Blijft.** Patroon 6 verbiedt in koppen `geen` en `niet`, en dit is geen van beide: de kop noemt zijn onderwerp (de simulator) en de zin loopt. Op `DrukkenTellenZonderDender.html`, waar hetzelfde kader over de knop gaat in plaats van over TinkerCAD, is het w&eacute;l "Een echte knop stuitert bij elke druk" geworden. |
| Kop "En nu?" | Drie theoriepagina's | **Naar "Verder lezen".** Een vraag als kop mag (labo 3, "Wat is een stijgende flank?"), maar dan als onderwerp van wat eronder staat. "En nu?" is een overgang, en dat is patroon 3. Het enige voorkomen in de repo, dus er is niets om consistent mee te blijven. |

### Taalfouten, blijven staan

Volgens het bereik sinds 28 juli 2026 gaat een taalfout niet mee in de diff van een stijlronde.

- `wel&eacute;&eacute;rste` (`VierKnoppenTweeLeds.html`, onder de maskertabel): "want je ziet meteen
  wel&eacute;&eacute;rste bit je bedoelt". Dat is geen woord, en ik kan niet raden wat er stond
  ("welk", "welke", "het hoeveelste"). Het klemtoonaccent erin zou onder patroon 10 vallen, maar
  wegnemen laat een even onleesbaar `weleerste` staan, dus de hele zin wacht op jou.
- "Waar je dit labo op neerkomt" (`NoodstopOverDeSerieleLijn.html`, kadertitel): het onderwerp is
  *dit labo* en niet *je*, dus "Waar dit labo op neerkomt".
- Kommasplitsing in "De bovenste vier bits van `knoppen` zijn geen ingangen, daar lees je terug wat
  je er zelf op gezet hebt" (`LedsOpDeExpander.html`).

### E&eacute;n melding die blijft staan

`DrukkenTellenZonderDender.html` draagt `<!-- audit-skip: vulwoord -->`. De `heel even` die `--audit`
daar meldt, staat in een **codecommentaar** ("Dus: heel even niet storen, kopie maken, klaar"), en een
stijlronde raakt geen code aan, ook geen commentaar. De woordenlijsten van `--audit` zijn regelgewijs
en zien geen `<pre>`-grenzen, dus alleen een `audit-skip` kan dit stilleggen. Dit is de eerste keer
in acht doorlopen dat dat nodig was.

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

### `je wilt` naar `je wil` (na labo 2)

Vier vervangingen in twee bestanden: `Labo2/Reference/map.html` (3x, twee in de `lead` en één in de
parameterlijst) en `Labo0/Reference/pinMode.html` (1x). Daartegenover stond `je wil` al twintig keer,
verspreid over de hele repo, dus dit was even goed een consistentiekwestie als een regionale.

Het is repo-breed gedaan en niet binnen labo 2, want `pinMode.html` hoort bij labo 0 en dat stond al
op **klaar**. Dezelfde afweging als bij `LED` naar `led`.

`wilt` staat sindsdien los in `NOORD_NL`, niet als `je wilt`, om exact de reden waarom `je kunt`
eerder al `kunt` werd: het onderwerp staat niet altijd naast het werkwoord. "Wanneer je bijvoorbeeld
een sensorwaarde wilt omzetten" in de `lead` van `map.html` zat er met vier woorden tussen, en de
tweewoordsvorm ving die niet. `wilt u` blijft aan de u-vormregel, zodat niets dubbel gemeld wordt.

## Patroon 16 en 17, toegevoegd op 28 juli 2026

Tom las de net geschreven Test3-pagina's en zei dat de tekst "fake" klonk en opviel als door een AI
geschreven, zonder er de vinger op te kunnen leggen. Terecht: elke zin afzonderlijk overleefde de
vijftien patronen. Wat het deed, zat in de vorm van de alinea, en daar keek geen enkele regel naar.

Vier tells zijn benoemd. Twee ervan zijn nu patroon 16 (*stel vast, beoordeel niet*) en 17 (*bekend
materiaal krijgt minder plaats*), met de oplossingsuitleg van
[Test3/PraktischeVoorbeeldtest.html](../Test3/PraktischeVoorbeeldtest.html) als proefstuk: die is
onder één regel herschreven, voorgelegd, en goedgekeurd. Dat is meteen het ijkpunt voor deze twee,
zoals `WatIsEenMicrocontroller.html` dat is voor de eerste dertien.

De derde tell is **de te evenwichtige zin**: het symmetrische contrastpaar ("te veel basisstroom is
zelden een probleem, te weinig wel"). Die staat er tientallen keren en klinkt samen geslepen, maar
elk paar apart is gewoon goed Nederlands en het onderscheid met een nuttige tegenstelling is niet
scherp te krijgen. Geen regel van gemaakt, met opzet. Komt hij terug, dan is dat het bewijs dat hij
er een verdient.

De vierde is **de afwezige auteur**: nergens een ik, een jaartal of een ervaring, alle stelligheid is
algemene waarheid. Dat is geen stijlregel maar een gat dat alleen Tom kan vullen, want ik weet niet
wat hij vorig jaar zag misgaan. **Openstaande vraag aan hem:** wil hij op de plaatsen waar het telt
een eigen zin leveren, dan zetten we die erin.

Labo 0 tot en met 7 staan hierboven op **klaar**, maar dat is klaar onder vijftien patronen. Ze
hebben nog een tweede, veel smallere doorloop nodig die alleen naar 16 en 17 kijkt en alinea's leest
in plaats van zinnen. Dat is een aparte ronde en geen heropening van de rest.

## Voor orion-review

Didactische dingen die tijdens een stijldoorloop opvielen horen hier, niet in de pagina. Nog niets.
