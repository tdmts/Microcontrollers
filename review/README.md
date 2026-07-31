# Didactische reviews

Eén ledger per labo, met de bevindingen uit de studentbril-review en wat er per bevinding
beslist is. Het protocol staat in `.claude/skills/orion-review/SKILL.md`; vraag Claude
gewoon om "labo N met een studentenbril te bekijken", dan volgt hij het.

> Naast deze ledgers staat in deze map ook [schrijfstijl.md](schrijfstijl.md), het register van
> de schrijfstijlrondes. Dat is een andere vraag: niet *leert een student hier iets van*, maar
> *klinkt deze tekst zoals de rest van de site*. De regel staat in
> [SCHRIJFSTIJL.md](../SCHRIJFSTIJL.md), het protocol in `.claude/skills/orion-style/SKILL.md`.

Wat deze bestanden bijhouden en waarom: een bevinding krijgt een **vast nummer** dat nooit
hergebruikt wordt, en een status. Verworpen bevindingen blijven staan **met hun reden**,
want dat is precies wat een volgende ronde belet om dezelfde discussie opnieuw te voeren.
De lezer krijgt de ledger nooit te zien, dus een bevinding die vanzelf opnieuw opduikt is
bewijs dat er echt iets zit, geen ruis.

| Ledger | Gelezen | Bevindingen | Nog open |
|---|---|---|---|
| [labo0.md](labo0.md) | 2 oefeningen, 14 referentiepagina's | 8 | 1 |
| [labo1.md](labo1.md) | 7 oefeningen (na de herstructurering van 2026-07-31: 6) | 8 | 1 |
| [labo2.md](labo2.md) | 10 oefeningen, 3 referentiepagina's | 7 | 1 |
| [labo3.md](labo3.md) | 6 oefeningen, 1 referentiepagina | 4 | 1 |
| [labo4.md](labo4.md) | 5 oefeningen, 3 referentiepagina's | 7 | 0 |
| [labo5.md](labo5.md) | 10 oefeningen (nu 9), 5 referentiepagina's | 13 | 1 |
| [labo6.md](labo6.md) | 6 oefeningen (nu 8), 1 referentiepagina (nu 4) | 13 | 1 |
| [labo7.md](labo7.md) | 5 oefeningen (nu 8), 1 referentiepagina (nu 5), + de handout van week 10 | 10 | 1 |

## Wat er nog openstaat

**Veertien tekeningen of foto's.** Die kan niemand anders maken dan jij, want er is hardware
of een screenshot voor nodig. Ze staan alle veertien als `TODO-`bestandsnaam in de pagina's,
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
| 5 | L293D met DC motor, herbedraad naar pin 3, 4 en 5 | L5-12 |
| 6 | Twee borden met drukknop links en LED rechts | L6-11 |
| 6 | Twee borden met potentiometer links en LED op een PWM-pin rechts | L6-11 |
| 6 | Twee borden met potentiometer links en I²C-LCD rechts | L6-11 |
| 7 | Twee borden met looplicht links en noodstopknop rechts | L7-10 |

**Eén uitgestelde beslissing.** L1-07: de twee dubbel-displayoefeningen van labo 1 tonen
het pinout van het TinkerCAD-sjabloon niet, waardoor hun oplossingen deels uit placeholders
bestaan. Bewust uitgesteld, niet verworpen.

## Het patroon dat in elk labo terugkwam

Vijf van de acht labo's hadden dezelfde zwaarste bevinding: **theorie die bestaat maar
onbereikbaar is**, en **oefeningen die meer dan één nieuw ding tegelijk binnenbrengen**.

- Labo 2 was het scherpst: nul van de tien oefeningen linkte naar een referentiepagina,
  terwijl de theorie er bijna één op één op aansloot.
- Labo 1 had helemaal geen `Reference/`-map, dus de uitleg over arrays zat in een oefening
  en die over multiplexing in een oplossingsspoiler.
- `map()` in labo 2 en arrays in labo 1 werden allebei drie oefeningen eerder gebruikt dan
  uitgelegd. In labo 4 gold hetzelfde voor bitbewerkingen, die nergens in de cursus stonden.
- In labo 5 werd half step als plaatje getoond en twee oefeningen later gevraagd, en
  vroeg de gevorderde oefening om hysteresis en draadbreukbeveiliging, twee begrippen die
  nergens in de cursus voorkomen.
- Labo 6 opende zijn theorie met "Serial kent meer dan alleen println(), read() en
  available()", terwijl `read()` en `available()` repobreed nul keer voorkwamen.

[Labo 3](labo3.md) is de tegenhanger en meteen het model: elke oefening voegt precies één
ding toe, en `Enkel7SegmentDisplay.html` linkt zijn theorie en zijn datasheet voor de
student aan de slag gaat. Bij een volgende ronde is de nuttigste vraag per oefening dus:
*wat is hier het ene nieuwe ding, en staat de uitleg ervoor op een plek waar de student ze
vindt zonder de oplossing open te klappen?*

## Wat labo 5, 6 en 7 daar apart in maakt

Dit zijn de drie labo's waar de review **echte technische fouten** vond in plaats van
didactische onhandigheden.

In [labo 5](labo5.md): een servo die volgens de tekst op een `~`-pin moest (L5-01), een
enable-pin waarop de gevraagde `analogWrite()` onmogelijk was (L5-02), en een stappenreeks
die niet overeenkwam met de tekening erboven (L5-04). Alle drie leveren ze een student met
correcte code een niet-werkende schakeling op.

In [labo 6](labo6.md): een theoriepagina die haar eigen oefening tegensprak over hoeveel
tekens `println()` verstuurt (L6-01), een hint die naar `Serial.find()` stuurde voor een
probleem dat `find()` per definitie niet kan oplossen (L6-02), en voorbeeldcode met een
multi-character constant die een compilerwaarschuwing geeft (L6-03). Hier zit de student
niet met een dode schakeling maar met een opgave die niet oplosbaar is zoals ze staat, wat
erger is: hij denkt dat het aan hem ligt.

Die vinden vraagt iets anders dan de studentbril: je moet de code en de schema's naast de
bewering leggen en narekenen. Bij een volgende import is dat een tweede vraag naast de
bestaande: *klopt wat hier staat eigenlijk wel, en zegt de tekening hetzelfde als de tekst?*

Labo 6 voegde daar een derde vraag aan toe die de moeite is om te herhalen: *kan je de
opgave zelf oplossen met de techniek die de hint aanraadt?* Bij L6-02 stond het antwoord
pas vast na het narekenen van wat `Serial.find()` met de datastroom doet, en dat is niet
iets wat je ziet door de opgave te lezen.

[Labo 7](labo7.md) trok die lijn door naar zijn uiterste. Daar draagt de opgave iets op
dat het bord doet **vastlopen** (L7-01: de PCF8574 uitlezen in een ISR, met `void loop()`
uitdrukkelijk leeg), en dat is met geen enkele hoeveelheid lezen te zien: het antwoord
stond in de broncode van de `Wire`-bibliotheek. Daarnaast sprak een rekenvoorbeeld labo 5
tegen met een factor 5 (L7-03), en ontbrak een heel onderwerp dat de eerste oefening al
onbruikbaar maakt op echte hardware (L7-02: dendering).

Dat laatste levert een vierde vraag op, en het is de gemeenste van de vier: *werkt dit ook
buiten TinkerCAD?* De simulator vlakt precies die dingen af waar dit labo over gaat. Hij
simuleert geen contactdender, dus L7-02 is er onzichtbaar. Een student die alles in de
simulator afwerkt, komt met werkende code op het labo en ziet ze daar stukgaan. Bij een
volgend labo dat dicht bij de hardware zit, is dat de eerste vraag om te stellen.
