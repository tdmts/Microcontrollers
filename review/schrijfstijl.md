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
| Labo 2 | 14 | 0 | **klaar** |
| Labo 3 | 7 | 0 | **klaar** |
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

| Wat | Waar | De vraag |
|---|---|---|
| De ik-vorm in de vragenlijsten | `PotentiometerUitlezen.html` ("met welke waarde moet ik de gelezen waarde vermenigvuldigen") en `LedDimmen.html` ("wanneer ik de waarde 128 gebruik") | `men` is overal naar de je-vorm gegaan, maar in deze twee titels staat `ik`. Dat is de student die de vraag stelt, en dat leest niet fout. Blijft `ik` staan, of gaat de hele vragenlijst naar de je-vorm? |
| "Twee grensgevallen om het gevoel te krijgen" | `Spanningsdeler.html`, kadertitel | Het kader beschrijft er drie: R2 veel groter, R2 veel kleiner, en de twee gelijk. "Twee" naar "drie" zetten verandert wat de titel beweert, en dat valt buiten een stijlronde. |
| `je wilt` | `map.html` (2x, `lead` en parameterlijst) en `Labo0/Reference/pinMode.html` (1x) | Dezelfde vorm als `kun je`: drie keer `je wilt` tegenover tientallen keren `je wil`. Het staat niet in SCHRIJFSTIJL.md 12 en is standaardtaal, dus het is hier blijven staan. Als het mee moet, is het een repo-brede ingreep zoals `LED` naar `led`, ook op een pagina die al klaar is. |

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

| Wat | Waar | De vraag |
|---|---|---|
| `<strong>TLDR:</strong>` | `Dubbel7SegmentDisplay.html`, boven het kader "Waarom werkt dat?" | Enige voorkomen in de hele repo. Het is geen van de dertien patronen, maar het is wel internetjargon in een cursustekst, en de dubbele punt erna is de aankondigingsvorm uit patroon 4. Mag dit "Kort gezegd:" worden, of is de informele toon hier bedoeld? |
| "terwijl je maar drie pinnen van je Arduino <strong>opoffert</strong>" | `Schuifregister.html`, `lead` | Blijven staan of `gebruikt` worden? `opoffert` zegt iets extra (drie pinnen die je kwijt bent), maar het is ook het enige beeldende werkwoord in een verder feitelijke lead. Eén voorkomen in de repo. |
| Kop "Stijgende flank?" | `Enkel7SegmentDisplay.html`, `<h3>` boven `risingEdge()` | Een vraagteken in een kop. Ongemoeid gelaten omdat de kop het onderwerp noemt en niet als retorische overgang leest (patroon 3), maar het is dezelfde oordeelsvraag als de dubbele punt in een kop uit de labo 1-ronde. |

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
