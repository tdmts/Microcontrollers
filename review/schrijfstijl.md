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
| Labo 4 | 9 | 0 | **klaar** |
| Labo 5 | 14 | 0 | **klaar** |
| Labo 6 | 12 | 5 | open |
| Labo 7 | 13 | 28 | open |
| Test1 + Test2 | 6 | 1 | open |

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

Voorgelegd, nog te beslissen:

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

Voorgelegd, nog te beslissen:

| Wat | Waar | De vraag |
|---|---|---|
| "Een rolluik dat aan volle snelheid tegen zijn eindaanslag knalt, **gaat stuk**." | `RolluikMetLdrEnEindeloopschakelaars.html` | De oude slotzin ("is een rolluik dat je één keer bouwt") staat in SCHRIJFSTIJL.md als voorbeeld van patroon 1 en moest dus weg. Wat er nu staat is mijn parafrase van wat die zin impliceerde. Klopt "gaat stuk", of is het preciezer om te zeggen wát er stukgaat (de aanslag, de tandwielkast, de motor)? Dat is een feit dat ik niet heb. |
| "een pak beter / een pak meer" | Labo 5 (gedaan), `Labo7/Reference/Interruptpinnen.html` en `VolatileEnVlaggen.html` (nog niet) | Belgische spreektaal, dezelfde categorie als `deftig` in labo 4. In labo 5 naar `veel`. Meteen repo-breed doortrekken naar labo 7, of wachten tot dat labo aan de beurt is? |
| "Toon antwoord: waarom is die code slecht? Stel je een motor voor die aan 10000 toeren draait..." | `SnelheidEnRichtingMetL293.html`, label van de spoilerknop | Blijven staan. Het label stelt een echte vraag aan de student (patroon 3 laat die toe) maar eindigt op een beletselteken dat spanning opbouwt. De andere spoilerknoppen in dit labo zeggen gewoon waar het antwoord over gaat. Het beletselteken schrappen, of is de aanzet hier didactisch bedoeld? |
| Kop "De volgorde is het hele punt" | `StappenmotorInFullStep.html` | Blijven staan. De kop zegt iets, en dat is beschermd, maar hij is gebouwd als een pointe in plaats van als een onderwerp. Vervangen door "De volgorde van de stappen", of is de nadruk hier terecht, gezien het kader eronder net die fout behandelt? |

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

## Voor orion-review

Didactische dingen die tijdens een stijldoorloop opvielen horen hier, niet in de pagina. Nog niets.
