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
   | `difficulty` | 1, 2 of 3 |
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
- Hints in een uitklapbaar blok, zodat wie het zelf wil proberen niet meteen het antwoord ziet.
- Enkel echt kritische waarschuwingen als waarschuwing markeren, anders vervlakt het effect.

## Niet doen

- `orion.css` of `orion.js` lokaal kopiëren of aanpassen: die staan extern op
  `https://tdmts.github.io/OrionContent/` en elke pagina linkt die absolute URL.
  [template.html](template.html) toont wel alle beschikbare componenten, maar kopieer er niet de
  `<head>` uit (die verwijst naar een lokale kopie die hier niet bestaat).
- De gedeelde JS in de repo-root per map dupliceren. Eén bestand, elke pagina linkt ernaar met een
  relatief pad.
