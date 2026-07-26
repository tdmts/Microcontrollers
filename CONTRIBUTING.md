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
een `href` met verkeerde hoofdletters, en afbeeldingen die je vergat toe te voegen aan git. Wat het
niet kan verzinnen (een ontbrekende `blurb` bijvoorbeeld) blijft gewoon in de lijst staan.

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

Geldige regels: `lead`, `figure`, `indienen`, `oplossing`, `code-class`, `checklist-driven`
(meerdere mag, gescheiden door komma's). De afwijking blijft zichtbaar in de output, maar telt niet
meer mee als opmerking. Gebruik dit enkel wanneer het soort pagina echt anders is, niet om iets stil
te maken dat je nog moet opkuisen.

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

Wat het script niet doet: er een echte pagina van maken. Elk bestand in `_incoming/` moet je nog
omzetten naar de Orion-opmaak en in `exercises.js` of `reference.js` zetten. `_incoming/WORKLIST.md`
is je takenlijst. Vergeet `git add img/` niet, het controlescript aanvaardt enkel afbeeldingen die
in git zitten.

## Huisregels

Deze worden automatisch afgedwongen:

- **Allman-accolades** in Arduino/C++-code: de openende `{` staat op zijn eigen regel.
  Data-initialisatie (`= { ... }`) mag wel op één regel.
- **Geen em-dashes** in tekst. Gebruik een komma, dubbele punt, punt, of "en"/"maar".
- **Afbeeldingen zelf hosten** in de gedeelde map `img/`, met een beschrijvende bestandsnaam.
  Nooit rechtstreeks linken naar een externe site of naar Brightspace-content
  (`/content/enforced/...`): die paden breken elk academiejaar.
- **YouTube-embeds** hebben `referrerpolicy` nodig, anders krijg je error 153.

Deze niet, maar hou ze toch aan:

- **Schrijf in het Nederlands, in de je-vorm**, warm en niet formeel.
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
