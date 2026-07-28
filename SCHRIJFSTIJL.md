# Schrijfstijl

Hoe het proza op deze pagina's klinkt. Dit is de enige plek waar die regels staan:
[CLAUDE.md](CLAUDE.md), [CONTRIBUTING.md](CONTRIBUTING.md) en de `orion-convert`-skill verwijzen
hierheen in plaats van de lijst te herhalen.

Het gaat hier **alleen over de vorm van de tekst**. Wat een pagina moet uitleggen is een didactische
vraag en hoort bij de `orion-review`-skill; of een pagina correct aan elkaar hangt is een technische
vraag en hoort bij `scripts/check-content.sh`.

De aanleiding: de tekst die vanaf labo 5 en op de theoriepagina's van labo 0 geschreven is, legt
inhoudelijk goed uit, maar leest kunstmatig. Niet omdat er te veel of te weinig staat, maar omdat
bijna elke alinea *opgevoerd* wordt: ze bouwt op naar een pointe, en eindigt op een zin die moet
blijven hangen. Tien keer per pagina voelt dat als reclame in plaats van als uitleg.

De oorspronkelijke cursustekst (labo 1 en labo 2, uit de Brightspace-export) doet dat niet, maar
schiet door naar de andere kant: "Maak een teller op 1 display die doorlopend telt van 0 tot en met
9" en verder niets. Geen waarom, geen verband met wat de student al kan. **Dit document vraagt niet
om daarnaar terug te gaan.** Het vraagt om de uitleg te houden en de opvoering te schrappen.

## Wat blijft

Lees dit eerst. Alles hieronder gaat over vorm, en niets ervan is een excuus om korter of karig te
schrijven.

- **Het waarom** achter elke stap, in gewone mededelende zinnen. Een student die niet weet waarom
  een weerstand in serie staat, heeft aan de opdracht alleen niets.
- **De terugkoppeling** naar wat de student al kan, maar als feit en niet als opbouw.
  Dus "Je gebruikte `analogRead()` al in labo 2" in plaats van "Twee labo's lang heb je...".
- **Concrete voorbeelden.** Die horen in de hoofdzin, niet tussen haakjes. Als een wasmachine het
  beste voorbeeld is, dan is de wasmachine belangrijk genoeg voor een eigen zin.
- **De kruislinks** naar de theoriepagina's, waar de student het kan nalezen.
- **De je-vorm**, warm en niet formeel. De warmte komt uit de je-vorm en uit het uitleggen van het
  waarom, niet uit ritme of woordkeuze.
- **Kadertitels die iets zeggen** ("De Arduino is niet de microcontroller") in plaats van
  "Belangrijk". Dat is winst tegenover de oorspronkelijke tekst en dat blijft.
- **Volledige sketches** in de oplossing, geen fragmenten.

## Wat eruit gaat

Dertien patronen, elk met een echt voorbeeld uit deze repo. Geen enkel patroon is op zich fout: het
probleem is dat ze allemaal samen, op elke pagina, van uitleg een voordracht maken. De eerste elf gaan
over opsmuk, de laatste twee over woordkeuze.

### 1. Geen slotzin die moet blijven hangen

Eindig op de laatste zin die iets vertelt, niet op een zin die iets doet.

> **Voor:** Hier schrijf jij het met `digitalRead()` en `digitalWrite()`, en bewaakt niemand iets.
>
> **Na:** Hier doe je dat zelf met `digitalRead()` en `digitalWrite()`, en de cyclustijd wordt niet
> bewaakt.

Andere voorbeelden van hetzelfde: "Een rolluik dat aan volle snelheid tegen zijn eindaanslag knalt,
is een rolluik dat je één keer bouwt." en "Verbind je Tx met Tx, dan zitten twee zenders tegen
elkaar te roepen en luistert er niemand."

### 2. Geen retorische drieslag

Drie parallelle **stellingen** als betoogfiguur.

> **Voor:** Omdat je in echte code programmeert in plaats van in functieblokken, omdat de chip een
> paar euro kost en in het product zelf past, en omdat jij bepaalt wat er aan de pinnen hangt.
>
> **Na:** Zo'n chip kost een paar euro en is klein genoeg om in het product zelf te zitten. Je
> programmeert hem in C++ in plaats van in functieblokken, en je bepaalt zelf wat er aan elke pin
> hangt.

Een opsomming van drie concrete dingen ("je afstandsbediening, je wasmachine en je fietscomputer")
mag wel. Dat is een lijst en geen figuur.

### 3. Geen retorische vraag als overgang

Zet de bewering neer.

> **Voor:** Waarom? Omdat de compiler slim is, en die slimheid hier tegen je werkt.
>
> **Na:** De reden zit in de compiler, die de variabele in de processor bijhoudt in plaats van hem
> telkens opnieuw uit het geheugen te halen.

Een echte vraag **aan** de student mag natuurlijk wel, want daar hoort een antwoord bij:
"Wordt hier gebruik gemaakt van sourcing of sinking?"

### 4. Geen dubbele punt als aankondiging van een pointe

> **Voor:** Serieel betekent: achter elkaar.
>
> **Na:** Serieel betekent dat de bits achter elkaar over één draad gaan.

Ook zo: "Het idee: je ISR doet niets anders dan..." en "Regel: elke variabele die je in een ISR
aanraakt, krijgt `volatile`." Een dubbele punt voor een opsomming, een tabel of een codevoorbeeld is
gewoon interpunctie en blijft.

### 5. Geen korte zin voor het effect

> **Voor:** Nu zet je er één regel bij. Eentje maar.
>
> **Na:** Nu zet je er één regel bij.

Ook zo: "Zonder uitzondering.", "Een pin is dat allemaal niet.", "Eén kern." Voeg ze samen met de
zin ervoor of laat ze weg.

### 6. Geen ontkennende opening

Begin bij wat het ding wél is, niet bij wat het niet is.

> **Voor:** Een stappenmotor draait niet vanzelf rond. Hij zet één stap per keer.
>
> **Na:** Een stappenmotor zet één stap per keer, en alleen wanneer je de spoelen in de juiste
> volgorde bekrachtigt.

Ook zo: "Over een seriële lijn gaan geen getallen." en "Impedantie is geen ander soort onderdeel."

### 7. Geen bemenste machines

> **Voor:** Wanneer de compiler ziet dat je steeds dezelfde variabele uitleest, denkt hij: die
> verandert hier toch nergens.
>
> **Na:** Wanneer de compiler ziet dat je steeds dezelfde variabele uitleest, houdt hij die waarde
> bij in de processor omdat er in je `loop()` niets aan verandert.

### 8. Geen verplichte tegenhanger

Niet elke bewering hoeft haar nuance mee. Zet die er alleen bij wanneer de student de afweging echt
zelf moet maken, en dan als informatie en niet als evenwicht.

> **Voor:** ... en omdat jij bepaalt wat er aan de pinnen hangt. Een PLC blijft de betere keuze in
> een industriële omgeving, waar vermogen geschakeld wordt.
>
> **Na:** Voor industriële toepassingen waar vermogen geschakeld wordt, gebruik je een PLC.

### 9. Geen vaste openingsformule

"Hier lees je...", "Op deze pagina zie je...", "Hier zie je waar die manier van werken stukloopt..."
staat vandaag in de `lead` van bijna elke pagina. Elke lead die op dezelfde manier begint, maakt de
volgende voorspelbaar. Zeg waar de pagina over gaat in de vorm die bij díe pagina past, en soms is
dat gewoon de eerste feitelijke zin van het onderwerp.

`scripts/check-content.sh --audit` meldt de bekende stockopeningen, vrijblijvend.

### 10. Geen theatrale nadruk

Vet en cursief zijn om een **term**, een pinnaam of een componentnaam te markeren, niet om een zin
te laten landen.

> **Voor:** **Elke byte telt.** Die 2 kB werkgeheugen en 32 kB programmageheugen zijn geen
> schrijffouten.
>
> **Na:** De ATmega328P heeft **2 kB** werkgeheugen en **32 kB** programmageheugen. Dat is geen
> schrijffout.

### 11. Geen verkleinwoorden als opsmuk

Een verkleinwoord dat een technisch onderdeel gezellig moet maken, klinkt aanstellerig. Noem het ding
bij zijn naam.

> **Voor:** Op een Arduino Uno is de microcontroller het langwerpige zwarte blokje met een rij
> pootjes langs beide kanten.
>
> **Na:** Op een Arduino Uno is de microcontroller de langwerpige zwarte chip met een rij
> aansluitingen langs beide kanten.

Ook zo: "aansluitingen waar je draadjes in kan steken" (draden), "een klein schermpje met knoppen"
(scherm), "in je wasmachine zit er zo eentje" (zit zo'n chip), en verder `chipje`, `lampje`,
`knopje`, `lusje`, `regeltje`, `sketchje`, `functietje`, `motortje`, `looplichtje`.

De uitzondering, en die is echt: **een verkleinwoord dat de gangbare vakterm is, blijft.** De
buitenste **pootjes** van een potentiometer heten zo, `rekstrookje` is de Nederlandse naam van het
onderdeel, en een `ezelsbruggetje` heet niet anders. Ook vaste uitdrukkingen ("tussen haakjes", "een
beetje") zijn geen opsmuk. De vraag is niet of er een verkleinvorm staat, maar of er een gewoon woord
bestaat dat hetzelfde zegt.

Dat deze vorm juist hier stoort, heeft trouwens een taalkundige grond. Het Nederlands van Nederland
gebruikt verkleinwoorden veel vrijer als verzachter dan het Nederlands van Vlaanderen ("een vraagje",
"een momentje", "een kopje"). Wie in Vlaanderen lesgeeft, leest die vorm dus sneller als aanstellerij
dan als vriendelijkheid. Zie ook patroon 12.

`scripts/check-content.sh --audit` kent een lijst van de woorden die vrijwel altijd opsmuk zijn. Die
lijst is opzettelijk kort en mag groeien; er staat geen enkele vakterm in.

### 12. Belgisch-Nederlands, geen Noord-Nederlandse woordkeuze

De studenten zijn Vlaams, en de cursus is dat ook. Schrijf dus **standaardtaal zoals ze in Vlaanderen
geschreven wordt**, en vermijd woorden die typisch Noord-Nederlands aanvoelen.

> **Voor:** Met `map()` kun je een waarde van het ene bereik omzetten naar een ander.
>
> **Na:** Met `map()` kan je een waarde van het ene bereik omzetten naar een ander.

De repo is hier al bijna consequent: `kan je` en `je kan` staan er samen 101 keer, `kun je` en
`je kunt` zes keer, verspreid over vier pagina's. Dat laatste is dus even goed een
consistentieprobleem als een regionale kwestie, en het staat vooral in tekst die uit een Nederlandse
bron is overgenomen. Hetzelfde geldt voor `wilt`, dat er vier keer stond tegenover twintig keer
`je wil`.

Let bij `kunt` en `wilt` op waar het onderwerp staat. In "een waarde die je in je programma kunt
gebruiken" en "wanneer je bijvoorbeeld een sensorwaarde wilt omzetten" staat er van alles tussen `je`
en het werkwoord, en toch is het dezelfde vorm. De Vlaamse standaardvorm is `kan` en `wil`, waar het
onderwerp ook staat.

Wat er verder in de lijst staat: `flink` (deel ze flink door) wordt `ruim` of `stevig`, `prima`
(dat werkt prima) wordt `goed` of `zonder problemen`, en `eventjes` wordt `even` of `kort`. Verder
preventief `hartstikke`, `gaaf`, `lekker` als versterker, en `hoor` of `nou` als toevoegsel aan het
einde van een zin.

**Twee waarschuwingen, en dit is waar zo'n regel misgaat.**

Ten eerste: het doel is standaardtaal, **geen Belgicismen**. "Neem daarvoor best een weerstand van
10 k&Omega;" is goed Belgisch Nederlands en blijft staan; "vijs" in plaats van schroef, of "kuisen"
in plaats van schoonmaken, is dat niet. Vlaamser schrijven betekent niet gewestelijker schrijven.

Ten tweede: er zijn woorden die alleen Noord-Nederlands *lijken*. `netjes` is gewoon Nederlands en
wordt in Vlaanderen even goed gebruikt, dus dat is geen regionale fout (het is er wel vaak een van
patroon 13). `best` in "je neemt best" is Belgisch en niet Noord-Nederlands. En `hoor` is in
"bij een echte motor hoor je dat" simpelweg het werkwoord horen. Meet voor je een woord aan de lijst
toevoegt of het in deze repo wel is wat je denkt dat het is.

### 13. Geen vulwoorden

Een bijwoord dat niets toevoegt aan de zin, laat je weg. Dit werd zichtbaar bij het meten van
patroon 12: `netjes` staat negentien keer in de repo, bijna altijd als vulling.

> **Voor:** Vergeet je `volatile`, dan compileert alles netjes.
>
> **Na:** Vergeet je `volatile`, dan compileert alles.

> **Voor:** Het bericht wacht netjes in zijn ontvangstbuffer.
>
> **Na:** Het bericht blijft in de ontvangstbuffer staan.

Die tweede laat goed zien waarom dit meer is dan een woord te veel: "wacht netjes" maakt van de
buffer een braaf wezen, en dat is patroon 7. Let ook op `heel even` (een verzachter op een
verzachter), en kijk met dezelfde blik naar `eigenlijk` en `uiteraard`. `letterlijk` in
"`digitalWrite()` zet letterlijk 5 V op een pin" blijft, want daar betekent het echt iets.

### Spelling: `led`, niet `LED`

Dit is geen patroon, want er is niets opgesmukt aan een kapitaal. Het is een spellingafspraak, en ze
staat hier omdat ze anders nergens staat: in de lopende tekst schrijf je `led` en `leds`, met een
hoofdletter alleen waar een zin of een titel begint.

> **Voor:** Laat vier LEDs vollopen vanaf de kant van de ingedrukte knop.
>
> **Na:** Laat vier leds vollopen vanaf de kant van de ingedrukte knop.

In code blijft alles zoals het is. `pinLED` is een naam die de student overtypt, en in labo 6 is
`"LED"` de sleutel van het protocol tussen de pc en de Arduino (`serialPort.WriteLine("LED:1")`),
dus daar is de kapitaal gegeven. `scripts/check-content.sh --audit` meldt daarom alleen `LED` in een
regel met prozaopmaak en laat alles binnen een `<pre>` met rust.

Schrijft een pagina de afkorting ooit voluit, dan blijft `LED` staan in "LED staat voor Light
Emitting Diode" en zet je er `<!-- audit-skip: led-spelling -->` bij. Vandaag doet geen enkele
pagina dat.

### En, nog steeds: geen em-dashes

Geen `—` en geen `&mdash;`, nergens in de tekst. Gebruik een komma, een dubbele punt, een punt of
"en"/"maar". Dit is de enige stijlregel die de check echt afdwingt, en
`scripts/check-content.sh --fix` repareert ze.

## De proef

Bij twijfel over een alinea, drie vragen:

1. **Zou ik dit zo tegen een student zeggen die naast me zit?** Een pointe die je aan een tafel niet
   uitspreekt, hoort ook niet op de pagina.
2. **Wat gebeurt er als ik de laatste zin schrap?** Verdwijnt er informatie, dan hoort ze er. Voelt
   de alinea alleen minder af, dan was het een slotzin uit patroon 1.
3. **Staat het interessantste stuk in de hoofdzin?** Als je beste voorbeeld tussen haakjes of achter
   een dubbele punt staat, staat het op de verkeerde plaats.

[Labo0/Reference/WatIsEenMicrocontroller.html](Labo0/Reference/WatIsEenMicrocontroller.html) is het
ijkpunt: die pagina is volledig volgens dit document herschreven en had eerder elf van de dertien
patronen (12 en 13 stonden er niet in, die pagina gebruikte al "kan je" en geen vulwoorden). Leg de
twee versies naast elkaar als je wil zien wat dit in de praktijk betekent.
