---
name: orion-convert
description: Convert raw content (messy HTML export, plain text/Markdown, or an existing lab page) into this repo's Orion-template page format, matching the conventions used across Labo*/ pages. Use whenever the user wants to turn some source content into a proper lab/course HTML page, restyle an old page, or asks to "convert this to the template".
---

# Orion template conversion

Converts arbitrary source content into a clean HTML page that follows this
repo's Orion styleguide conventions (see [`template.html`](../../../template.html)
for the full component reference; [`Labo1/Exercises/Morsecode.html`](../../../Labo1/Exercises/Morsecode.html) /
[`Labo1/Exercises/Looplicht.html`](../../../Labo1/Exercises/Looplicht.html) /
[`Labo1/Exercises/KnightRider.html`](../../../Labo1/Exercises/KnightRider.html) for real,
correctly-converted examples of the checklist-driven pattern used when the
target lab has an entry in the shared `exercises.js` manifest — see
Checklist / QR block below).

**The output must pass [`scripts/check-content.sh`](../../../scripts/check-content.sh).**
That script is the repo's one automated guardrail (links, manifest
consistency, page wiring, asset hygiene, code style) and it also runs in CI on
every push. Running it is step 9 of the Process below, and a green result is
part of "done" for this skill.

## Inputs this skill handles

- Raw/messy HTML (e.g. pasted from Brightspace or CKEditor, like the original
  `Labo1/Exercises/Looplicht.html` before conversion)
- Plain text or Markdown
- An existing lab page that needs to be migrated/restyled to current
  conventions

If none of these is clearly what the user gave you, ask them to paste the
content or point at a file before proceeding.

**If the source is a whole Brightspace course rather than one page, don't make
the user paste it topic by topic.** Ask for a course export zip (Course Admin →
Import/Export/Copy Components → Export Components, with course files included)
and run `python scripts/import-brightspace.py <export.zip>` on it. That stages
every topic as raw HTML in `_incoming/`, with the module, title and order in a
header comment, and self-hosts the course images into `img/` with the
`/content/enforced/` srcs already rewritten. Then run this skill per staged
file, working down `_incoming/WORKLIST.md`.

## Process

1. **Read the source.** If it's a file path, read it. If it's inline text,
   use it directly.
2. **Read `template.html`** to refresh which components exist and their exact
   markup, unless you already have it in context this session.
3. **Detect the input language** and keep the output in that same language
   (do not translate). Set `<html lang="...">` accordingly (`nl` or `en` etc).
4. **Build the page** using the skeleton and component rules below.
5. **Ask the user** which `LaboN/` folder (or other location) and filename
   the output should go to — don't guess. Suggest a sensible default (e.g.
   derived from the `<h1>`) but always confirm.
6. **Check whether the target lab has an entry in the root `exercises.js`
   manifest** (`window.LAB_EXERCISES.laboN`). If it does, this page
   participates in the checklist-driven pattern: build the live checkbox
   checklist, add an entry for this exercise under that lab's key in
   `exercises.js`, and include the `checklist-sync.js` scripts (see
   Checklist / QR block below). If that lab has no entry in the manifest
   yet, fall back to a static checklist instead.
6a. **Every exercise page** (checklist-driven or static fallback alike, as
   long as it isn't `dashboard.html` itself) gets the shared
   `back-link.js` include right before `</body>` -- see Back link below.
   It self-injects a "Terug naar dashboard" link, no init call needed.
7. **If the target file already exists**, ask for a plain yes/no confirmation
   before overwriting it. No diff needed — just confirm intent.
8. **After writing**, summarize in plain text: which components you used,
   any placeholder values that still need to be filled in (see Evaluation
   block below), any `exercises.js` entry you added, and any source `src=`
   paths/URLs the user should double check.
9. **Run the content check and fix what it reports:**

   ```bash
   bash scripts/check-content.sh
   ```

   It catches exactly the mistakes this skill is most likely to make: an
   `href` whose basename or casing does not match the file, a manifest entry
   missing `blurb`/`difficulty`/`time`, a forgotten script include, an
   `initChecklistSync` pointing at the wrong lab, an image that was never
   `git add`ed, a YouTube embed without `referrerpolicy`, a K&R brace, an
   em-dash. Fix every finding and re-run until it prints `check-content: OK`.
   Don't hand the page back while it is red: the same script runs in CI, so a
   red result here is a red X on the user's next push.

## Exercise pages vs. reference (theory) pages

Two kinds of page live under `LaboN/`, and they differ:

- **Exercise pages** (`LaboN/Exercises/`) — a task the student builds. These get
  the checklist (see Checklist / QR block), sync to the lab `dashboard.html`, and
  are registered in `exercises.js`. Everything above assumes this case.
- **Reference (theory) pages** (`LaboN/Reference/`) — quick-reference topics the
  student consults while working (e.g. `analogRead.html`). These are **not**
  exercises, so:
  - **No checklist and no QR widget.** They aren't a task, so nothing to
    self-evaluate.
  - **Register in `reference.js`, not `exercises.js`** — add the topic under that
    lab's `laboN` key (`window.LAB_REFERENCE.laboN`), inside the appropriate
    category (`{ id, name, href, blurb }`; `id` lowercase-no-spaces, `href`
    basename matching the filename, `blurb` a one-line summary). Create the
    `laboN` block if it doesn't exist yet.
  - **A datasheet belongs on the hub too.** If the lab has one in `datasheets/`,
    list it in a category named `Datasheets` with an `href` that reaches out of
    the lab folder (`../../datasheets/74hc595.pdf`) and a `blurb` naming the
    chapters that matter for this lab. See labo 2 and labo 3 in
    [`reference.js`](../../../reference.js). The manifest entry is all it needs:
    `reference-dashboard.js` recognises a document `href` and opens it in a new
    tab by itself, so don't hand-write a `target` anywhere.
  - **The reference hub is named `reference.html`** (never `index.html`) and calls
    `initReferenceHub('laboN')`. Mirror an existing hub such as
    [`Labo0/Reference/reference.html`](../../../Labo0/Reference/reference.html) —
    it also links `reference-dashboard.css` and `reference-dashboard.js`.
  - **`back-link.js` is still included** right before `</body>`, same as exercise
    pages. It self-targets the reference hub for pages under `Reference/`.

## Base page skeleton

Always use the hosted CDN for CSS/JS (this is what actually-deployed lab
pages use — `template.html` itself points at a local `orion.css` that does
not exist in this repo, so don't copy that part of it):

```html
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{Titel}</title>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="https://tdmts.github.io/OrionContent/orion.css">
    <script src="https://tdmts.github.io/OrionContent/orion.js"></script>
</head>
<body>
<div class="container">
    <h1>{Titel}</h1>
    <p class="lead">{Korte samenvatting/opdracht in 1-2 zinnen}</p>

    <h2 id="{slug}">{Sectietitel}</h2>
    {...content...}
</div>
</body>
</html>
```

- `<title>` and `<h1>` both get the page's main topic/title.
- The first paragraph after `<h1>` always gets `class="lead"` if the source
  has an introductory/summary sentence (this is standard structure, not one
  of the "special components" below).

## Heading IDs

Every `<h2>` gets a slugified `id`: lowercase, spaces → hyphens, strip
punctuation and diacritics (e.g. "Wiskunde Formules" → `wiskunde-formules`,
matching `template.html`'s own ids). Do **not** add ids to `<h3>`/`<h4>`.

## Component mapping — conservative by default

Only reach for a special component when the source content is an
**unambiguous** match. When in doubt, keep it as a plain paragraph/list
instead of forcing it into a component. Never use the Ants Feature
(`.ants-zone`) or STL viewer unless the user explicitly asks for it or the
source explicitly references an `.stl` file.

| Source pattern | Component | Notes |
|---|---|---|
| Paragraph explicitly prefixed "Let op:"/"Waarschuwing:"/"Belangrijk:" (or EN "Warning:"/"Important:") | `.info-box` + `.info-title.warning` | Keep the label text, don't invent one |
| Paragraph explicitly prefixed "Tip:" | `.info-box` + `.info-title.tip` | |
| Paragraph explicitly prefixed "Opmerking:" (EN "Note:") | `.info-box` + `.info-title.remark` | |
| General context/explanation with no label but clearly a callout in the source (e.g. was already in a highlighted/bordered box) | `.info-box` (no title) | |
| `<pre>`/`<code>` blocks, fenced ```code``` blocks, or text that is unmistakably source code | `<pre class="code-wrapper language-cpp linenumbers show-language">` | Always these exact classes, see Code blocks below |
| `<table>` or Markdown table syntax | `.table-responsive` wrapping `.table.table-striped.table-bordered.align-middle` | Add `<caption>` only if source has a table title |
| Command-line transcript (lines with a shell prompt like `$` or `user@host:~$`) | `.terminal-window` with `.term-line`/`.term-prompt`/`.term-cmd`/`.term-out` | Only when source is clearly a terminal session, not just any code |
| Config file listing explicitly marked with changed/new lines | `.config-window` with `.conf-line.mod`/`.conf-line.new` | Only when the distinction between changed/new is explicit in source |
| Numbered steps explicitly labeled "Stap 1/Stap 2/..." or "Step 1/Step 2/..." | `.steps-container` with `.step-item[data-title]` | Not just any ordered list — must be explicit multi-step walkthrough |
| Explicit FAQ / Q&A pairs, a reasoning question whose answer should stay hidden, a hint, a worked calculation, or optional/expandable extra info ("meer weten?", "spoiler", "optioneel") | `.accordion-container` with `.accordion-item` | The `<div class="title">` says what is behind the click, never "Toon antwoord"; a hint opens with `Hint:`. **`.spoiler-container` is retired** — never emit one. Only *the* solution gets a `.solution-container`, see below |
| LaTeX-style math (`$...$` or `$$...$$`) | `.math-tex` | Inline for `$...$` paragraphs, block `<div class="math-tex">` for `$$...$$` |
| Image | `<figure class="figure w-100 text-center figure-zoom"><img ...></figure>` inside `<div class="my-4">` | Default for all images — this is standard structure, keep original `src` as-is |
| YouTube URL or `<iframe>` embed | `.video-container` wrapping `.ratio.ratio-16x9` iframe | Convert bare iframes (like the old Looplicht.html) into this wrapper. Match YouTube's current official embed attributes on the iframe: `frameborder="0"`, `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"`, and `referrerpolicy="strict-origin-when-cross-origin"` (required — without it YouTube throws error 153, "Fout bij configuratie van videospeler"; note this only takes effect over `http(s)://`, not a `file://`-opened page, so it won't visibly fix things when testing by double-clicking the file). Keep the video's own `src` exactly as given — don't invent a `?si=...` tracking param. Per current convention (see Looplicht.html/KnightRider.html), when the video is the exercise's main explainer it sits directly under the `lead` paragraph with **no own `<h2>`**, followed by `<hr>` before the next section — don't force a "Video" heading unless there's enough surrounding explanatory content to justify a section of its own |
| Local video file, explicitly a short looping/demo clip | `<video autoplay loop muted playsinline>` | Only add autoplay/loop/muted when source implies a decorative loop; otherwise use plain `<video controls>` |
| Everything else | Plain `<p>`, `<ul>`/`<ol>`, `<strong>`, `<a>` | Default — don't force a component |

## Code blocks

- **Every code block on every page uses the same three classes:**
  ```html
  <pre class="code-wrapper language-cpp linenumbers show-language">
  ```
  `language-cpp` regardless of whether the block is an Arduino sketch, a
  snippet on a theory page or a single declaration, and `linenumbers` always
  on. The house rule is uniformity: a block should read identically in a
  reference topic and in a solution. `bash scripts/check-content.sh --audit`
  reports any block that deviates.
- Preserve `<code>` inline for short inline code references (e.g.
  `<code>&lt;h3&gt;</code>`).

## Submission ("indienen") claims

These pages are static content (served from GitHub Pages and iframed into
Brightspace via [`pasteInOrion.html`](../../../pasteInOrion.html), the only
file ever uploaded to Orion), not the actual assignment dropbox. Source content sometimes carries over
submission language that was only accurate in its original context (e.g.
"Dien je oefening in op deze opdracht. Bij het indienen krijg je onmiddellijk
de oplossing te zien.") — implying you submit *here* and get an *immediate
solution reveal*.

**The Indienen section is fixed boilerplate, not something you compose from the
source.** It is exactly these two lines, and every exercise page in the repo
uses them verbatim:

```html
    <h2 id="indienen">Indienen</h2>
    <p>Sla je oefening op.</p>
```

Drop everything else the source says about submitting. That includes the
file-format advice ("sla je oefening op in een .ino of een tekstbestand
(.txt)"), which reads like harmless prep advice but belongs to the Brightspace
dropbox rather than the hosted page. Rewording it per page is drift: check
[`Labo2/Exercises/LedDimmen.html`](../../../Labo2/Exercises/LedDimmen.html)
and match it character for character. The evaluation checklist follows directly
after this block.

## Checklist / QR block

These pages are plain static HTML with no live binding to a real Brightspace
assignment — students genuinely cannot "indienen" (submit) through the page
itself. So treat the checklist and the QR widget as two separate things:

- **Checklist — always, on every exercise page:** any page that describes a
  task/opdracht for the student to build or program (i.e. basically every
  `LaboN/` page this skill produces) gets an evaluation checklist block as
  the **second-to-last section in `.container`** (only the Oplossing block
  below comes after it), regardless of whether the source text
  mentions grading/submission/indienen at all. Don't gate this on keywords —
  it's part of the standard page structure now, same as the `<h1>`/lead
  paragraph. Skip it only for pages that clearly aren't a student exercise
  (e.g. `template.html` itself, a pure reference/index page). It's framed as
  **self-evaluation**, not a formal evaluation being executed on/by the page.
  There are two variants — pick based on step 6 of the Process above:

  - **Checklist-driven (default whenever the target lab has a `laboN` key
    in the root `exercises.js`)** — a live, per-student checklist that
    syncs to the lab's `dashboard.html` (XP/badges) via `localStorage`. See
    [`Labo1/Exercises/Looplicht.html`](../../../Labo1/Exercises/Looplicht.html) for the
    canonical example:
    ```html
    <div class="info-box evaluation">
        <div class="info-title evaluation">Checklist</div>
        <p>Overloop volgende checklist om je oefening zelf te evalueren:</p>
        <ul class="checklist">
            <li><label><input type="checkbox" class="form-check-input me-2"> {item 1}</label></li>
            <li><label><input type="checkbox" class="form-check-input me-2"> {item 2}</label></li>
        </ul>
    </div>
    ```
    Then, right before `</body>` (**relative paths**, so the page also works
    when opened locally — no page in this repo uses absolute URLs for the
    shared scripts; from `LaboN/Exercises/` or `LaboN/Reference/` that is
    `../../`):
    ```html
    <script src="../../back-link.js"></script>
    <script src="../../exercises.js"></script>
    <script src="../../checklist-sync.js"></script>
    <script>
        initChecklistSync(LAB_EXERCISES.laboN);
    </script>
    ```
    And add an entry for this exercise under `LAB_EXERCISES.laboN.exercises`
    in the root [`exercises.js`](../../../exercises.js) (the single source
    of truth, shared across all labs, read by both every lab's dashboard
    and each exercise page's sync script). **Every field below is required**
    (the content check fails on a missing one, and the dashboard renders a
    blank card rather than an error):

    | field | value |
    |---|---|
    | `id` | lowercase, no spaces, unique within the lab |
    | `order` | next unused number, scoped to that lab |
    | `name` | matches the `<h1>`, and says what the student builds (see below) |
    | `href` | the bare filename, `{file}.html`, next to that lab's `dashboard.html` |
    | `difficulty` | 1, 2 or 3 |
    | `time` | rough estimate, e.g. `'~20 min'` |
    | `blurb` | one sentence for the dashboard card |
    | `checklistDriven` | `true` for this pattern |

    **Do not carry a generic source title through.** Brightspace names most
    exercises "labo 5: basis oefening 3" or "gevorderde oefening 1"; there are
    over thirty such topics still to import. That is a slot number, not a name:
    it tells a student nothing, and it goes stale the moment `order` changes.
    Name the exercise after the thing it makes, and use the same string for the
    `<h1>`, the `<title>`, the `name`, and as the basis for the filename and
    `id`:

    | source title | use instead |
    |---|---|
    | labo 3: gevorderde oefening 1 | Ledbar met potentiometer |
    | labo 3: gevorderde oefening 2 | Lichtpatronen uit een array |
    | labo 2: gevorderde oefening 2 | Thermometer op 7-segment display |

    "Gevorderd" is expressed by `difficulty: 3`, never in the title. A label
    with no number is fine when it describes the *format* rather than a slot
    ("Begeleide oefening"). `check-content.sh` rule 6 blocks the generic form,
    so getting this wrong fails the check rather than reaching a student.

    `checklist-sync.js` matches the current page to a manifest entry by
    comparing filenames, so the `href`'s basename must match the output
    filename **exactly, including casing** (the sync itself is
    case-insensitive, but GitHub Pages is not: a casing mismatch resolves on
    Windows and 404s once deployed).
  - **Static fallback (target lab has no key in `exercises.js` yet)** —
    plain text, no inputs, no scripts:
    ```html
    <div class="info-box evaluation">
        <p class="info-title evaluation">Checklist</p>
        <p>Overloop volgende checklist om je oefening zelf te evalueren:</p>
        <ul>
            <li>{item 1}</li>
            <li>{item 2}</li>
        </ul>
    </div>
    ```
    Still add the `back-link.js` include (see Back link below) right before
    `</body>` even in this fallback case — it doesn't depend on the
    manifest.

  In both variants:
  - Title text is `Checklist` (not "Evaluatie" — the class stays
    `info-title evaluation` for styling, only the visible text changes).
  - Intro line reads like "Overloop volgende checklist om je oefening zelf
    te evalueren:", not "Controleer volgende punten voor je de evaluatie
    laat uitvoeren" (that phrasing implies someone/something else executes
    an evaluation).
  - Checklist items are tailored to the exercise's actual functional
    requirements (e.g. "Frequentie is 1Hz", "Geen errors of warnings in de
    log"). Don't add a "saved as .ino/.txt" bookkeeping item — file format
    isn't a self-evaluation criterion (see below).
  - If the exercise's requirements aren't obvious from the source, ask the
    user what the key functional criteria are rather than inventing vague
    checklist items.
- **QR widget (opt-in only):** the `<div id="qrcode" ...>` plus the
  `window.qrData` script and `qrcode.js` include actually wire the page into
  a real Orion/Ans assignment for auto-grading. Do **not** add these unless
  the user explicitly confirms this specific page is tied to a real
  Brightspace assignment and gives (or asks you to placeholder-and-flag) the
  real IDs. Never add the QR widget silently just because grading keywords
  were detected.

## Solution block (Oplossing)

**Every exercise page gets an Oplossing section** — same rule as the checklist:
it's part of the standard page structure, not gated on whether the source
provides a solution. **Reference (theory) pages never get one** (they aren't a
task to solve). Place it as the **last section inside `.container`, directly
after the checklist `.info-box.evaluation`**, and add the
`solution-reveal.js` include to the script list before `</body>`.

**This is the only place a `.solution-container` may appear**, and rule 7 of
`check-content.sh` blocks on it: the reveal is one-way (the button is gone for
good once clicked), which suits a solution and ruins a reasoning question. So a
`.solution-container` has to sit under an `<h2>` whose id starts with
`oplossing`, and everything a student may want to close again — a hint, a
question with a hidden answer, a worked calculation, even a full sketch for a
sub-assignment halfway down the page — is an `.accordion-item`. A page that ends
up with no `.solution-container` at all also drops the `solution-reveal.js`
include, or the same rule flags the leftover. See
[`Labo1/Exercises/Looplicht.html`](../../../Labo1/Exercises/Looplicht.html) for the
canonical example.

Markup:

```html
<h2 id="oplossing">Oplossing</h2>
<div class="solution-container">
    <button type="button" class="btn-spoiler solution-reveal-btn">Toon oplossing</button>

    <div class="spoiler-content solution-content">
        <p>{1-2 zinnen die de aanpak uitleggen: welke instructies, waarom}</p>
        <pre class="code-wrapper language-cpp linenumbers show-language">
{volledige, werkende sketch}
        </pre>
    </div>
</div>
```

And add `solution-reveal.js` to the includes (after `checklist-sync.js`):

```html
<script src="../../back-link.js"></script>
<script src="../../exercises.js"></script>
<script src="../../checklist-sync.js"></script>
<script src="../../solution-reveal.js"></script>
<script>
    initChecklistSync(LAB_EXERCISES.laboN);
</script>
```

The solution is **almost never present in the source**, so you write it. Give
a complete, working sketch (not a fragment) plus a short explanation of the
approach. Because you authored it, **flag in your final summary that the
solution is yours to sanity-check** — especially concrete pin numbers, wiring
assumptions, and baud rates, which you can only guess from the exercise. If
the correct approach is genuinely ambiguous, ask the user rather than inventing
a plausible-but-wrong sketch.

### Code style (all Arduino/C++ code on the page)

**This applies to every code block on the page, not just the solution** — the
solution sketch, any skeleton/"Voorbeeldcode" the student completes, and any
inline example must all follow the same style so pages read as one system:

- **Dutch identifiers and Dutch comments** (`potWaarde`, `helderheid`,
  `ledPin`), matching the Dutch je-vorm course voice. Not English names.
- **camelCase** for variables and pin/config constants (`ledPin`, not
  `LED_PIN`). `ALL_CAPS` stays for symbolic hardware constants
  (`SEGMENT_AAN`, `KORT`, `DIGIT_TIENTALLEN`); don't rewrite those (renaming
  `SEGMENT_AAN` would even collide with the local `segmentAan` variable).
- **`const int` for pins and fixed values** (`const int ledPin = 3;`), not
  `#define` and not `const byte`. Type-safe and debuggable.
- **Assign pins from the lowest usable number up.** A plain digital output
  starts at 2, and anything needing `analogWrite()` starts at the lowest PWM
  pin, which is **3** on the UNO and Leonardo (PWM: 3, 5, 6, 9, 10, 11). Don't
  reach for a higher pin just because a datasheet or tutorial used one.
  Consecutive exercises in a lab usually build on the same breadboard, so keep
  a component on the same pin across a chain of exercises unless the exercise
  genuinely rewires it: a student following labo 2 from the dimmer to the
  nachtlamp should never have to move a wire the text didn't ask them to move.
- **Allman braces**: the opening `{` of `setup()`, `loop()`, `if`, `for`,
  `while`, etc. goes on its **own line**, aligned with the statement. This
  includes short bodies (no `if (x) { ... }` on one line). Data initializers
  (`const int pins[] = {2, 3, 4};`, 2-D pattern arrays) keep their `{` on the
  same line as the `=`; Allman is only for control-flow/function braces.
  ```arduino
  void loop()
  {
    for (int i = 0; i < 4; i++)
    {
      analogWrite(ledPin, i);
    }
  }
  ```
- **2-space indentation** (Arduino IDE default).
- Comments are Dutch, short, and explain *why* where it isn't obvious
  (`// herschaal naar 0..255`), not restating the obvious.

## Prose style

[`SCHRIJFSTIJL.md`](../../../SCHRIJFSTIJL.md) in the repo root is the full rule,
in Dutch, with a before/after pair per pattern. Read it when you are writing a
whole page. The working summary:

**Keep the didactics.** The *why* behind each step, in plain declarative
sentences. The callback to what the student can already do, stated as fact ("Je
gebruikte `analogRead()` al in labo 2"), not as build-up. Concrete examples in
the main clause rather than in parentheses. The cross-links to the Reference
pages. The je-vorm, warm and informal. Box titles that say something ("De
Arduino is niet de microcontroller") instead of "Belangrijk". Full sketches.

**Drop the theatre.** Eleven patterns, all of them ways of performing a paragraph
instead of writing one (12 and 13 below are about word choice rather than
ornament):

1. No closing line meant to land. End on the last sentence that carries
   information ("...en luistert er niemand" ends a box on applause, not on
   content).
2. No rhetorical tricolon. Three parallel *claims* as a figure ("omdat...,
   omdat..., en omdat..."). A list of three concrete things is fine.
3. No rhetorical question as a transition ("Waarom?", "Wat gebeurt er dan?").
   State the claim. A real question *to* the student, in an assignment, is fine.
4. No colon announcing a pointe ("Serieel betekent: achter elkaar", "Het idee:",
   "Regel:"). A colon before a list, table or code block is just punctuation.
5. No short sentence for effect ("Eentje maar.", "Zonder uitzondering.").
6. No opening on a negation ("Een stappenmotor draait niet vanzelf rond").
   Start from what the thing *is*.
7. No machines with intentions ("de compiler denkt:", "twee zenders die tegen
   elkaar roepen").
8. No obligatory counterweight. Add the nuance only where the student has to
   make that call themselves.
9. No stock `lead` opener ("Hier lees je...", "Op deze pagina zie je...", "Hier
   zie je waar..."). Vary the opening per page; `--audit` flags the known ones.
10. No theatrical emphasis. Bold and italics mark a **term**, a pin name or a
    component, not a sentence you want to hit.
11. No diminutive dressing up a part ("het zwarte blokje", "draadjes waar je in
    kan steken", "in je wasmachine zit er zo eentje"). Name the thing: chip,
    draden, zo'n chip. The exception is real and matters: a diminutive that *is*
    the established term stays, so the outer **pootjes** of a potentiometer and a
    **rekstrookje** are correct Dutch for those parts, and fixed expressions
    ("tussen haakjes", "een beetje") are not diminutives in function. The test is
    whether a plain word exists that says the same thing. There is a linguistic
    reason this pattern grates here specifically: Netherlandic Dutch uses
    softening diminutives far more freely than Belgian Dutch, so a Flemish reader
    hears affectation where a Dutch one hears friendliness.

**Word choice, for a Flemish audience:**

12. **Write standard Dutch as written in Flanders.** `kan je` / `je kan`, not
    `kun je` / `je kunt` (the repo already says the Flemish form 101 times
    against 6). Also `flink` -> ruim/stevig, `prima` -> goed/zonder problemen,
    `eventjes` -> even/kort, and no `hartstikke`, `gaaf`, `nou ja`.
    **Two traps.** The goal is standard language, *not* Belgicisms: "je neemt
    best een weerstand van 10 kΩ" is correct Belgian Dutch and stays, while
    "vijs" or "kuisen" are not what this asks for. And some words only look
    Northern: `netjes` is ordinary Dutch used in Flanders too (its problem is 13),
    `best` in "je neemt best" is Belgian rather than Northern, and `hoor` in "bij
    een echte motor hoor je dat" is just the verb. Measure before you add a word
    to any list.
13. **No filler adverbs.** "Vergeet je `volatile`, dan compileert alles netjes"
    says the same without the last word, and "het bericht wacht netjes in zijn
    ontvangstbuffer" also turns the buffer into a well-behaved creature (11's
    sibling, and pattern 7). Watch `netjes` and `heel even`; look twice at
    `eigenlijk` and `uiteraard`. `letterlijk` in "`digitalWrite()` zet letterlijk
    5 V op een pin" earns its place and stays.

And still: **never use em-dashes** (`—` or `&mdash;`) anywhere in
student-facing prose. Rewrite the sentence with a comma, a colon, a period, or a
word like "en"/"maar" instead. This applies to all body text, callouts,
accordion answers, and solution explanations, and it is the one prose rule the
content check actually enforces.

The over-correction is the real risk here. The imported labo 1 and 2 prose
("Maak een teller op 1 display die doorlopend telt van 0 tot en met 9." and
nothing else) trips almost none of these thirteen and is bad writing anyway,
because it explains nothing. Unperformed, not terse.
[`Labo0/Reference/WatIsEenMicrocontroller.html`](../../../Labo0/Reference/WatIsEenMicrocontroller.html)
is the worked specimen: it had eleven of the thirteen and was rewritten against the
document, so it shows what the target actually reads like.

## Back link

Every `LaboN/` exercise page lives in the same folder as that lab's
`dashboard.html`, so getting back there is just one shared, self-running
script — no manifest lookup, no per-page href to get right:

```html
<script src="../../back-link.js"></script>
```

It injects a "← Terug naar ..." link above the `<h1>` and at the bottom,
targeting the previous page when that is known (a trusted same-origin `.html`
referrer), else the lab dashboard, else the reference hub for pages under
`Reference/`. It no-ops on `dashboard.html` itself. Add this include on every
exercise and reference page (see Checklist / QR block above for exactly where
it goes relative to the other script includes).

Don't over-specify how/where students save their work — "Sla je oefening
op." is enough. Don't invent or carry over specific file extensions (.ino,
.txt, ...) unless the source is explicit that the format matters for a
concrete reason (e.g. an upload form only accepts one extension).

## Media

**Every image this repo serves is self-hosted in the shared repo-root `img/`
folder. No exceptions, no asking first.** A remote `<img src="http...">` is a
content-check failure, and a hotlink rots: the other site can move, rename or
delete the file, and the page silently loses its illustration mid-semester.

So for **any** `<img>` whose source is an external URL:

1. Download it into repo-root `img/` with a descriptive filename
   (`servo-aansluiting.png`, not `image.847213.png`). If the host blocks the
   download, retry with a browser `User-Agent`; some CDNs return an HTML
   challenge page to a bare `curl`, which is easy to mistake for the image.
2. Point the `<img src>` at it with a relative path from the page's folder,
   e.g. `../../img/servo-aansluiting.png`.
3. `git add` the file. An image that exists locally but is untracked is
   invisible on GitHub Pages, and the content check flags it.

Keep local relative `src`/`href` values exactly as given, wrap them in the
correct component markup per the table above, and mention every `src` path in
your final summary so the user can verify it resolves in the final location.

**Brightspace-hosted images need an extra step.** A source `<img src>`
pointing at Brightspace's authenticated content store (relative paths under
`/content/enforced/<course>-<academic-year-code>/...` or a
`chamilo-downloads.hogent.be/...DocumentDownloader...` link) must **not** be
kept as-is: the path bakes in that year's course/academic-year code and will
break the following academic year, and it may also require an active
Brightspace login to resolve at all. Instead:

1. Ask the user for a working absolute URL to the image (a signed
   `chamilo-downloads.hogent.be` download link works without login; a bare
   `/content/enforced/...` path does not — it needs the domain). If they
   don't have one, ask them to save the image from their logged-in browser
   and give you the local file path instead.
2. Fetch/copy it into the shared **repo-root `img/`** folder (this repo's
   single shared asset folder — same pattern as the shared root
   `exercises.js`/`back-link.js`, see the `single-source-of-truth`
   preference), with a descriptive filename (e.g. `rgbled-schema.png`, not
   the original `image.<id>.png`).
3. Point the `<img src>` at it with a relative path from the page's folder,
   e.g. `../../img/rgbled-schema.png`, and `git add` it.

The extra step is only the *asking*: a Brightspace path can't simply be
downloaded, so you need the user to supply a working URL or a local file.
Every other external image is downloaded without asking, per the rule at the
top of this section.
