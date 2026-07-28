# Schrijfstijlrondes

De regel staat in [SCHRIJFSTIJL.md](../SCHRIJFSTIJL.md), het protocol in
`.claude/skills/orion-style/SKILL.md`. Vraag Claude om "de schrijfstijl van labo N toe te
passen", dan volgt hij het. Eén labo per doorloop, in cursusorde.

Dit register is met opzet dunner dan de ledgers in deze map voor de didactische review. Daar
krijgt elke bevinding een vast nummer, omdat het beslissingen zijn die anders elke ronde
opnieuw besproken worden. Hier is het regeldocument zelf de beslissing, dus wat hier bijgehouden
wordt is alleen: hoe ver we staan, wat er teruggehouden is voor jou, en welke woorden er aan een
lijst in `scripts/check-content.sh` toegevoegd zijn.

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
| Labo 1 | 11 | 3 | open |
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

### Twijfelgevallen

| Wat | Waar | De vraag |
|---|---|---|
| "een <strong>stukje</strong> code" | `FunctiesParameters.html` (`lead`) en de blurb in `reference.js`; tien keer over negen pagina's in de hele repo | Verkleinwoord als opsmuk (11) of gewoon de vaste uitdrukking? "een stuk code" bestaat, maar "een stukje code" is in het Nederlands zo ingeburgerd dat het eerder klinkt als "een klein programma" dan als versiering. Niet aangeraakt, en niet aan `DIMINUTIVES` toegevoegd, omdat het in negen pagina's staat en de beslissing dus voor de hele repo geldt. |
| De knipoog `&#128521;` | `BegeleideOefening.html`, stap 9, na "ruim boven de veilige grens" | Enige emoji in de hele cursus. Geen van de dertien patronen dekt dit, maar het is wel opvoering. Weglaten of houden? |
| "Nog een denkoefening." / "Opnieuw eerst zelf redeneren." | `BegeleideOefening.html`, stappen 6 en 9 | Korte zinnen (5), maar ze zijn de vaste aankondiging van elk denkstapje en dus functioneel in plaats van effectbejag. Laten staan. |
| De wij-vorm in de geïmporteerde tekst | `Iteraties.html`, `PullUpPullDown.html`, `pinMode.html` | `men` is overal naar de je-vorm gegaan, want dat is formeel. `we` is blijven staan ("we kunnen deze redenering voortzetten", "wanneer we deze knop bekrachtigen"), omdat de hele repo die inclusieve wij-vorm gebruikt. Wil je die ook naar de je-vorm, dan is dat een aparte, veel grotere doorloop. |
| Kop "Terug" met als inhoud "Niets" | `pinMode.html`, onder Syntax/Parameters | Dat is een vertaling van "Returns" uit de Arduino-documentatie en leest nu als "terugkeren". "Geeft terug" of "Retourneert" zou kloppen. Niet aangeraakt omdat het een kop is en de betekenis verandert. |
| Belgicismen | `Iteraties.html` | "op het eerste zicht" en "verderzetten" zijn wél gecorrigeerd naar de standaardtaalvormen, omdat SCHRIJFSTIJL.md 12 expliciet standaardtaal vraagt en geen gewestelijke woordkeuze. Ze zijn minder gemarkeerd dan "vijs" of "kuisen", dus zeg het als je ze liever laat staan. |

## Voor orion-review

Didactische dingen die tijdens een stijldoorloop opvielen horen hier, niet in de pagina. Nog niets.
