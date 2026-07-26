# Didactische reviews

Eén ledger per labo, met de bevindingen uit de studentbril-review en wat er per bevinding
beslist is. Het protocol staat in `.claude/skills/orion-review/SKILL.md`; vraag Claude
gewoon om "labo N met een studentenbril te bekijken", dan volgt hij het.

Wat deze bestanden bijhouden en waarom: een bevinding krijgt een **vast nummer** dat nooit
hergebruikt wordt, en een status. Verworpen bevindingen blijven staan **met hun reden**,
want dat is precies wat een volgende ronde belet om dezelfde discussie opnieuw te voeren.
De lezer krijgt de ledger nooit te zien, dus een bevinding die vanzelf opnieuw opduikt is
bewijs dat er echt iets zit, geen ruis.

| Ledger | Gelezen | Bevindingen | Nog open |
|---|---|---|---|
| [labo0.md](labo0.md) | 2 oefeningen, 14 referentiepagina's | 8 | 1 |
| [labo1.md](labo1.md) | 7 oefeningen (nu 8) | 8 | 2 |
| [labo2.md](labo2.md) | 10 oefeningen, 3 referentiepagina's | 7 | 1 |
| [labo3.md](labo3.md) | 6 oefeningen, 1 referentiepagina | 4 | 1 |
| [labo4.md](labo4.md) | 5 oefeningen, 3 referentiepagina's | 7 | 0 |

## Wat er nog openstaat

**Negen tekeningen of foto's.** Die kan niemand anders maken dan jij, want er is hardware
of een screenshot voor nodig. Ze staan alle negen als `TODO-`bestandsnaam in de pagina's,
dus `scripts/check-content.sh` blijft ze bij elke run melden als niet-blokkerende
waarschuwing. Verdwijnt zo'n regel uit de uitvoer, dan is die tekening er.

| Labo | Wat | Bevinding |
|---|---|---|
| 0 | LED met voorschakelweerstand op het breadboard | L0-06 |
| 0 | Volledige schakeling met knop en LED | L0-06 |
| 1 | Schema van het looplicht (sinking) | L1-05 |
| 1 | Schema van de knight rider (sourcing, omgekeerd bedraad) | L1-05 |
| 2 | Aansluitschema van de potentiometer | L2-05 |
| 2 | LED met weerstand op een PWM-pin | L2-05 |
| 2 | LDR-spanningsdeler met de LED | L2-05 |
| 2 | TMP36 met RGB-LED | L2-05 |
| 3 | Pinout of foto van de ledbar | L3-04 |

**Eén uitgestelde beslissing.** L1-07: de twee dubbel-displayoefeningen van labo 1 tonen
het pinout van het TinkerCAD-sjabloon niet, waardoor hun oplossingen deels uit placeholders
bestaan. Bewust uitgesteld, niet verworpen.

## Het patroon dat in elk labo terugkwam

Drie van de vijf labo's hadden dezelfde zwaarste bevinding: **theorie die bestaat maar
onbereikbaar is**, en **oefeningen die meer dan één nieuw ding tegelijk binnenbrengen**.

- Labo 2 was het scherpst: nul van de tien oefeningen linkte naar een referentiepagina,
  terwijl de theorie er bijna één op één op aansloot.
- Labo 1 had helemaal geen `Reference/`-map, dus de uitleg over arrays zat in een oefening
  en die over multiplexing in een oplossingsspoiler.
- `map()` in labo 2 en arrays in labo 1 werden allebei drie oefeningen eerder gebruikt dan
  uitgelegd. In labo 4 gold hetzelfde voor bitbewerkingen, die nergens in de cursus stonden.

[Labo 3](labo3.md) is de tegenhanger en meteen het model: elke oefening voegt precies één
ding toe, en `Enkel7SegmentDisplay.html` linkt zijn theorie en zijn datasheet voor de
student aan de slag gaat. Bij een volgende ronde is de nuttigste vraag per oefening dus:
*wat is hier het ene nieuwe ding, en staat de uitleg ervoor op een plek waar de student ze
vindt zonder de oplossing open te klappen?*
