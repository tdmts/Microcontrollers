# Werken in deze repo

Korte handleiding voor wie hier lesmateriaal toevoegt. (Deze repo bevat verder ook
[CLAUDE.md](CLAUDE.md), maar dat bestand is geschreven voor Claude Code, niet voor jou.)

## Wat dit is

Een statische HTML-cursussite, gedeployed via GitHub Pages op
`https://tdmts.github.io/Microcontrollers/`. Er is **geen build, geen npm, geen framework**: je
bewerkt HTML, CSS en JS rechtstreeks. Om te previewen open je de pagina in je browser of push je
naar GitHub Pages.

Elke pagina wordt in Brightspace/Orion in een iframe getoond via
[pasteInOrion.html](pasteInOrion.html). **Dat is het enige bestand dat ooit in Orion geplakt wordt**;
al de rest wordt van GitHub Pages geserveerd. Per Orion-topic pas je enkel de `src` van de iframe aan.

## De enige regel die je moet onthouden

Voor je pusht:

```bash
bash scripts/check-content.sh
```

Dat commando controleert de hele repo: kapotte links, pagina's die niet in de manifests staan,
ontbrekende `<script>`-tags, gehotlinkte afbeeldingen, en de codestijl. Het draait ook automatisch
in GitHub Actions bij elke push, dus een rode X op je commit betekent dat een van die zaken stuk is.
De output vertelt telkens welk bestand en welke regel.

Waarom een script en geen afspraak op papier: bijna alles wat hier misgaat, mislukt **stil**. Een
verkeerde bestandsnaam in `exercises.js` geeft geen foutmelding, de checklist slaat gewoon niets
meer op.

### Het meeste laat je vanzelf herstellen

```bash
bash scripts/check-content.sh --fix
```

Dit herstelt zelf wat maar één juist antwoord heeft: em-dashes, accolades die op de verkeerde regel
staan, een ontbrekende `referrerpolicy`, een `initChecklistSync` die naar het verkeerde labo wijst,
een `href` met verkeerde hoofdletters, een referentiepagina die `reference.js` niet inlaadt, en
afbeeldingen die je vergat toe te voegen aan git. Wat het niet kan verzinnen (een ontbrekende
`blurb` bijvoorbeeld) blijft gewoon in de lijst staan.

Het script herschrijft je bestanden, dus het vraagt een propere werkmap: commit of stash eerst, en
bekijk daarna met `git diff` wat het precies veranderd heeft voor je commit.

### Huisstijl nakijken (vrijblijvend)

```bash
bash scripts/check-content.sh --audit
```

Dit laat zien waar een pagina wel werkt maar er anders uitziet dan de rest: een codeblok zonder
`linenumbers`, een pagina zonder `lead`, een afbeelding zonder `figure`, een oefening zonder
`indienen`- of `oplossing`-sectie. **Dit blokkeert nooit iets**, het draait niet in CI, en je mag het
gerust negeren. Handig als je eens wil opruimen.

Er zitten ook vijf opmerkingen over de tekst zelf bij, de enige vijf uit
[SCHRIJFSTIJL.md](SCHRIJFSTIJL.md) die een script kan zien:

- Een **`lead` die met een standaardformule begint** ("Hier lees je...", "Op deze pagina zie je...").
  Zo'n opening is niet fout, maar hij staat op zoveel pagina's dat de volgende lead voorspelbaar
  wordt. Begin liever bij het onderwerp zelf.
- De **u-vorm** (`u kunt`, `uw`). Deze pagina's staan in de je-vorm.
- Een **verkleinwoord dat een onderdeel gezellig maakt** (`het zwarte blokje`, `draadjes`,
  `zit er zo eentje`). Dit werkt met een vaste woordenlijst en niet met een `-je`-regel, want die
  pakt ook `haakjes`, `netjes` en `oranje`, en kan een vakterm niet van opsmuk onderscheiden. Er
  staat dus met opzet geen enkele vakterm in: de buitenste **pootjes** van een potentiometer heten
  zo, en `rekstrookje` is gewoon de naam van het onderdeel. Vind je een woord dat er nog bij hoort,
  dan mag je het toevoegen.
- **Noord-Nederlandse woordkeuze** (`kun je`, `je kunt`, `flink`, `prima`, `eventjes`). Onze
  studenten zijn Vlaams, en de repo is dat al bijna overal: `kan je` en `je kan` staan er 101 keer
  tegen 6 keer `kun je`. Let op twee dingen. Het doel is standaardtaal zoals ze in Vlaanderen
  geschreven wordt, **geen Belgicismen**: "je neemt best een weerstand van 10 k&Omega;" blijft
  staan, "vijs" en "kuisen" horen er niet. En sommige woorden lijken alleen Noord-Nederlands:
  `netjes` is gewoon Nederlands, en `best` in "je neemt best" is juist Belgisch.
- **Vulwoorden** (`netjes`, `heel even`). "Vergeet je `volatile`, dan compileert alles netjes" zegt
  precies hetzelfde zonder dat laatste woord.

De rest van dat document (geen punchline op het einde van een kader, geen retorische drieslag, geen
retorische vraag als overgang) kan geen `grep` zien, en blijft dus leeswerk. Dat leeswerk gebeurt
labo per labo; hoe ver we staan, staat in [review/schrijfstijl.md](review/schrijfstijl.md). Vraag
Claude om "de schrijfstijl van labo N toe te passen" en hij volgt dat protocol: hij herschrijft
meteen en legt enkel de twijfelgevallen aan je voor.

Eén daarvan verdient wat uitleg: de **Indienen-sectie is vaste tekst**, exact deze twee regels:

```html
<h2 id="indienen">Indienen</h2>
<p>Sla je oefening op.</p>
```

Studenten dienen in via Brightspace, niet via deze pagina's. Alles wat de oorspronkelijke tekst
zegt over indienen ("dien in op deze opdracht", "sla op als .ino of .txt") laat je dus weg. Dat
soort zinnen sluipt vanzelf mee binnen wanneer je content uit Brightspace overneemt.

Wijkt een pagina bewust af? Zet dat dan in de pagina zelf, met een korte uitleg ernaast:

```html
<!-- audit-skip: oplossing -->
```

Geldige regels: `lead`, `figure`, `indienen`, `oplossing`, `code-class`, `checklist-driven`,
`lead-opener`, `u-vorm`, `verkleinwoord`, `noord-nederlands`, `vulwoord` (meerdere mag, gescheiden
door komma's). De afwijking blijft zichtbaar in de output, maar telt niet
meer mee als opmerking. Gebruik dit enkel wanneer het soort pagina echt anders is, niet om iets stil
te maken dat je nog moet opkuisen.

### Compileert de code op je pagina wel? (na een import)

```bash
bash scripts/check-content.sh --compile
```

Alle controles hierboven lezen je HTML. Geen enkele kan je zeggen of de code op de pagina eigenlijk
wel bouwt. Deze wel: hij haalt elke volledige sketch van je pagina's (alles met een `setup()` én een
`loop()`) en geeft ze aan de echte Arduino-compiler, met alle waarschuwingen aan.

Je hebt er [arduino-cli](https://arduino.github.io/arduino-cli/) voor nodig, plus de board core:

```bash
arduino-cli core install arduino:avr
```

Ontbreekt een van de twee, dan zegt het script dat en gaat het gewoon verder. Ontbreekt een
bibliotheek (`Servo.h`, `LiquidCrystal_I2C.h`), dan meldt het welke en telt die sketch niet mee als
fout: dat ligt aan jouw computer, niet aan de pagina.

**Dit duurt een paar minuten** in plaats van de twee seconden van de gewone controle, dus het draait
niet in de Stop-hook en niet in CI. Draai het wanneer je code aangeraakt hebt, typisch na een import.
Waarschuwingen uit een bibliotheek worden weggefilterd, je ziet alleen wat over jouw eigen code gaat.

Staat er met opzet foute code op je pagina, bijvoorbeeld om te tonen wat er misgaat? Zet dat dan in
de pagina zelf, met de reden ernaast:

```html
<!-- compile-skip: toont met opzet een oneindige lus -->
```

[Labo0/Reference/Iteraties.html](Labo0/Reference/Iteraties.html) is precies daarom gemarkeerd: twee
voorbeelden daar bevatten met opzet een fout, dus de waarschuwing van de compiler ís de les. De
markering geldt voor de hele pagina en blijft zichtbaar in de output.

Staat er `???` in een codeblok, dan is dat een invuloefening voor de student en geen programma. Zo'n
blok wordt overgeslagen (en netjes vermeld in de output). Dat gebeurt **per blok, niet per pagina**:
[Labo2/Exercises/TemperatuursensorTMP36.html](Labo2/Exercises/TemperatuursensorTMP36.html) heeft een
*Opgave* vol `???` én een echte *Oplossing*, en die oplossing wil je juist wél gecontroleerd zien.
Vul de `???` dus niet in om de compiler tevreden te stellen: dan geef je het antwoord weg.

### Hoe je een codeblok schrijft

De huisvorm is `<code>` tegen de openingstag aan, en `</code></pre>` tegen de laatste regel code:

```html
<pre class="code-wrapper language-cpp linenumbers show-language"><code>void setup()
{
  pinMode(3, OUTPUT);
}</code></pre>
```

Schrijf je het anders (`<code>` op een eigen regel, of helemaal geen `<code>`), dan werkt de
controle nog steeds: die herkent alle drie de vormen. Dat was ooit níet zo, en dat kostte ons 28
blokken over 18 pagina's die nooit gecompileerd werden terwijl de controle groen bleef. Vergeet je
`</pre>`, dan krijg je nu een foutmelding in plaats van stilte.

## Een oefening toevoegen

1. **Kopieer een bestaande oefening** als vertrekpunt, bijvoorbeeld
   [Labo1/Exercises/Looplicht.html](Labo1/Exercises/Looplicht.html). Zet ze in `LaboN/Exercises/`.
2. **Registreer ze in [exercises.js](exercises.js)**, in het blok van het juiste labo. Alle velden
   zijn verplicht:

   | veld | betekenis |
   | --- | --- |
   | `id` | unieke sleutel binnen het labo, kleine letters. Wordt gebruikt in `localStorage`, dus achteraf wijzigen wist de voortgang van studenten. |
   | `order` | volgorde op het dashboard. Uniek binnen het labo. De volgorde in de array doet er niet toe. |
   | `name` | titel op de dashboardkaart |
   | `href` | volledige `https://tdmts.github.io/Microcontrollers/...` URL. De bestandsnaam moet exact overeenkomen met je HTML-bestand, ook qua hoofdletters. |
   | `difficulty` | 1, 2 of 3. Enkel die drie: bij een andere waarde verdwijnen de pepertjes volledig van de kaart, zonder foutmelding. Het script controleert dit. |
   | `time` | ruwe schatting, bijvoorbeeld `'~20 min'` |
   | `blurb` | een zin die op de kaart komt |
   | `checklistDriven` | `true` als de pagina een checklist heeft (zie hieronder) |

3. **Behoud het checklistpatroon** onderaan de pagina: een `.info-box.evaluation` met een
   `.checklist` vol `<input type="checkbox">`, en net voor `</body>` deze vier scripts plus de
   init-oproep:

   ```html
   <script src="../../back-link.js"></script>
   <script src="../../exercises.js"></script>
   <script src="../../checklist-sync.js"></script>
   <script src="../../solution-reveal.js"></script>
   <script>
       initChecklistSync(LAB_EXERCISES.labo2);
   </script>
   ```

   De oefening telt pas als "gedaan" wanneer **alle** vakjes aangevinkt zijn.

## Een referentiepagina toevoegen

Zet het bestand in `LaboN/Reference/` en voeg een entry toe in [reference.js](reference.js), in de
juiste categorie. `href` is hier gewoon de bestandsnaam. `name` en `blurb` zijn verplicht.
Referentiepagina's houden geen voortgang bij, ze zijn puur navigatie.

Net voor `</body>` horen deze twee scripts:

```html
<script src="../../reference.js"></script>
<script src="../../back-link.js"></script>
```

`back-link.js` heeft `reference.js` nodig om te weten welk onderwerp na dit onderwerp komt (zie
hieronder). Vergeet je die eerste regel, dan ziet de pagina er perfect uit en verdwijnt enkel de
"Volgende"-link, zonder foutmelding. Het script controleert dit daarom, en `--fix` zet de regel er
zelf bij.

## Terug- en volgende-links

`back-link.js` zet zelf een navigatierij boven en onder elke pagina: links "Terug naar ...", rechts
"Volgende: ...". Je hoeft er niets voor op te roepen, het script leest alles uit het pad en uit het
manifest van dat labo.

De volgorde komt uit de manifests, niet uit de pagina:

- **oefeningen**: het `order`-nummer in `exercises.js`, dezelfde volgorde als de kaarten op het
  dashboard. Verander je een `order`, dan verschuift de "Volgende"-link mee.
- **referentiepagina's**: de volgorde waarin ze in `reference.js` staan, categorie na categorie.
  Wil je een andere leesvolgorde, verplaats dan de entries.

Op het laatste item wijst de link terug naar het dashboard of naar het overzicht, zodat een student
nooit op een dood spoor eindigt. Wijst de terug-link links toevallig al naar diezelfde pagina, dan
valt de "Volgende" gewoon weg: twee keer dezelfde link naast elkaar leest als een fout. Datasheets
(PDF's) staan niet in de rij: die openen in een nieuw tabblad en dragen zelf geen navigatie.

Geen "Volgende"-link krijgen: `dashboard.html`, `reference.html` (dat zijn de overzichten zelf) en
alles onder `TestN/` (daar bepaalt `overview.html` de volgorde met gewone links).

## Een volledig nieuw labo toevoegen

Je hebt nodig: de map `LaboN/Exercises/` met een `dashboard.html`, eventueel `LaboN/Reference/` met
een `reference.html`, en **een `laboN`-blok in `exercises.js` en/of `reference.js`**. Vergeet dat
blok niet: zonder blok rendert het dashboard een lege pagina zonder enige foutmelding. Het script
controleert dit.

## Veel pagina's tegelijk uit Brightspace halen

Kopieer niet elke oefening apart over. Exporteer het vak in één keer: Course Admin →
Import/Export/Copy Components → *Export Components*, met "include course files" aangevinkt. Draai
daarna op de zip die je downloadt:

```
python scripts/import-brightspace.py export.zip
```

Dat zet elk topic als ruwe HTML in `_incoming/` (staat in `.gitignore`, wordt dus nooit
gepubliceerd), genummerd in de volgorde van het vak, met de module en de titel bovenaan in een
commentaarblok. Alle afbeeldingen uit het vak komen meteen in `img/` terecht en de
`/content/enforced/...`-paden worden vervangen door `../../img/...`, dus die huisregel is al in orde.
`--dry-run` toont enkel wat er zou gebeuren.

Datasheets krijgen dezelfde behandeling naar `datasheets/`, of ze nu als apart topic in de
modulestructuur hangen of vanuit een pagina gelinkt worden. Ze worden genoemd naar hun titel in
Brightspace (`74hc-hct595-datasheet.pdf`), zonder het nummer dat D2L eraan plakt. Hernoem gerust
korter. Lesslides (`.pptx`) blijven bewust op Brightspace staan, en alles boven 25 MB wordt
overgeslagen met een melding. Importeer je een labo twee keer, dan wordt een datasheet die er al
staat herkend aan zijn inhoud en niet nog eens gekopieerd, ook niet als jij hem intussen hernoemd
hebt.

Wat het script niet doet: er een echte pagina van maken. Elk bestand in `_incoming/` moet je nog
omzetten naar de Orion-opmaak en in `exercises.js` of `reference.js` zetten. `_incoming/WORKLIST.md`
is je takenlijst, met onderaan een lijstje van de datasheets die erbij gekomen zijn. Vergeet
`git add img/ datasheets/` niet, het controlescript aanvaardt enkel bestanden die in git zitten.

## Huisregels

Deze worden automatisch afgedwongen:

- **Allman-accolades** in Arduino/C++-code: de openende `{` staat op zijn eigen regel.
  Data-initialisatie (`= { ... }`) mag wel op één regel.
- **Geen em-dashes** in tekst. Gebruik een komma, dubbele punt, punt, of "en"/"maar".
- **Afbeeldingen zelf hosten** in de gedeelde map `img/`, met een beschrijvende bestandsnaam.
  Nooit rechtstreeks linken naar een externe site of naar Brightspace-content
  (`/content/enforced/...`): die paden breken elk academiejaar.
- **Documenten zelf hosten** in de gedeelde map `datasheets/`, ook met een beschrijvende
  bestandsnaam (`74hc595.pdf`, niet `74HC_HCT595-datasheet.9581058.pdf`). Zelfde reden als bij
  afbeeldingen: een link naar de site van de fabrikant sterft midden in het semester. Geldt voor
  `.pdf`, `.zip`, `.docx`, `.pptx` en `.xlsx`. Lesslides horen hier **niet** thuis, die blijven op
  Brightspace staan. Zet de datasheets van een labo ook in een categorie **Datasheets** in
  `reference.js`, dan staan ze op de referentiepagina van dat labo. Zo'n `href` wijst uit de
  labomap weg (`../../datasheets/74hc595.pdf`), dat mag hier. Meer moet je niet doen: de
  referentiepagina ziet zelf dat het om een document gaat en opent het in een nieuw tabblad, want
  in het Orion-kader zelf zou een PDF veel te smal openen.
- **YouTube-embeds** hebben `referrerpolicy` nodig, anders krijg je error 153.
- **Noem een oefening naar wat de student maakt**, niet "Gevorderde oefening 2" of "Oefening 1".
  Zo'n naam zegt niets over de opdracht en klopt niet meer zodra je de volgorde wijzigt. Dus
  "Ledbar met potentiometer" in plaats van "Gevorderde oefening 1". Dit geldt zowel voor `name` in
  `exercises.js` als voor de `<h1>` en `<title>` van de pagina, en die drie horen hetzelfde te zijn.
  Een naam zonder nummer mag wel, die beschrijft de vorm en niet een plaats in een rij: "Begeleide
  oefening" in labo 0 blijft dus staan. Is een oefening moeilijker dan de rest? Dat druk je uit met
  `difficulty: 3`, niet met het woord "gevorderde" in de titel.

Deze niet, maar hou ze toch aan:

- **Schrijf in het Nederlands, in de je-vorm**, warm en niet formeel, maar zonder retoriek.
  [SCHRIJFSTIJL.md](SCHRIJFSTIJL.md) staat er helemaal over: kort gezegd leg je uit waarom iets zo
  is, in gewone mededelende zinnen, en laat je de opsmuk weg. Geen slotzin die moet blijven hangen,
  geen drie parallelle stellingen op een rij, geen retorische vraag als overgang, en geen
  verkleinwoorden om een onderdeel gezellig te maken (het is een chip, geen blokje). Schrijf
  standaardtaal zoals ze in Vlaanderen geschreven wordt, dus `kan je` en niet `kun je`, maar zonder
  in Belgicismen te vervallen. Let op de omgekeerde fout: dit is geen vraag om korter of karig te
  schrijven, de uitleg blijft.
- **Volledige sketches** in de oplossing, geen fragmenten.
- **Pinnummers van laag naar hoog.** Een gewone digitale uitgang begint bij 2, iets met
  `analogWrite()` bij de laagste PWM-pin, dus **3** (PWM op UNO en Leonardo: 3, 5, 6, 9, 10, 11).
  Bouwen opeenvolgende oefeningen op dezelfde schakeling verder, hou een component dan op dezelfde
  pin: een student mag geen draad moeten verleggen die de opgave niet vraagt.
- Hints in een uitklapbaar blok, zodat wie het zelf wil proberen niet meteen het antwoord ziet.
- Enkel echt kritische waarschuwingen als waarschuwing markeren, anders vervlakt het effect.

## Niet doen

- `orion.css` of `orion.js` lokaal kopiëren of aanpassen: die staan extern op
  `https://tdmts.github.io/OrionContent/` en elke pagina linkt die absolute URL.
  [template.html](template.html) toont wel alle beschikbare componenten, maar kopieer er niet de
  `<head>` uit (die verwijst naar een lokale kopie die hier niet bestaat).
- De gedeelde JS in de repo-root per map dupliceren. Eén bestand, elke pagina linkt ernaar met een
  relatief pad.
