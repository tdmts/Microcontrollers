---
name: orion-convert
description: Convert raw content (messy HTML export, plain text/Markdown, or an existing lab page) into this repo's Orion-template page format, matching the conventions used across Labo*/ pages. Use whenever the user wants to turn some source content into a proper lab/course HTML page, restyle an old page, or asks to "convert this to the template".
---

# Orion template conversion

Converts arbitrary source content into a clean HTML page that follows this
repo's Orion styleguide conventions (see [`template.html`](../../../template.html)
for the full component reference; [`Labo1/Morsecode.html`](../../../Labo1/Morsecode.html)
for a real, correctly-converted example with a static checklist; and
[`Labo1/Looplicht.html`](../../../Labo1/Looplicht.html) /
[`Labo1/KnightRider.html`](../../../Labo1/KnightRider.html) for the
checklist-driven pattern used when the target lab has an entry in the
shared `exercises.js` manifest — see Checklist / QR block below).

## Inputs this skill handles

- Raw/messy HTML (e.g. pasted from Brightspace or CKEditor, like the original
  `Labo1/Looplicht.html` before conversion)
- Plain text or Markdown
- An existing lab page that needs to be migrated/restyled to current
  conventions

If none of these is clearly what the user gave you, ask them to paste the
content or point at a file before proceeding.

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
7. **If the target file already exists**, ask for a plain yes/no confirmation
   before overwriting it. No diff needed — just confirm intent.
8. **After writing**, summarize in plain text: which components you used,
   any placeholder values that still need to be filled in (see Evaluation
   block below), any `exercises.js` entry you added, and any source `src=`
   paths/URLs the user should double check.

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
| `<pre>`/`<code>` blocks, fenced ```code``` blocks, or text that is unmistakably source code | `<pre class="code-wrapper language-X linenumbers show-language">` | See Code blocks below |
| `<table>` or Markdown table syntax | `.table-responsive` wrapping `.table.table-striped.table-bordered.align-middle` | Add `<caption>` only if source has a table title |
| Command-line transcript (lines with a shell prompt like `$` or `user@host:~$`) | `.terminal-window` with `.term-line`/`.term-prompt`/`.term-cmd`/`.term-out` | Only when source is clearly a terminal session, not just any code |
| Config file listing explicitly marked with changed/new lines | `.config-window` with `.conf-line.mod`/`.conf-line.new` | Only when the distinction between changed/new is explicit in source |
| Numbered steps explicitly labeled "Stap 1/Stap 2/..." or "Step 1/Step 2/..." | `.steps-container` with `.step-item[data-title]` | Not just any ordered list — must be explicit multi-step walkthrough |
| Explicit FAQ / Q&A pairs | `.accordion-container` with `.accordion-item` | |
| Source explicitly indicates optional/expandable extra info ("meer weten?", "spoiler", "optioneel") | `.spoiler-container` | |
| LaTeX-style math (`$...$` or `$$...$$`) | `.math-tex` | Inline for `$...$` paragraphs, block `<div class="math-tex">` for `$$...$$` |
| Image | `<figure class="figure w-100 text-center figure-zoom"><img ...></figure>` inside `<div class="my-4">` | Default for all images — this is standard structure, keep original `src` as-is |
| YouTube URL or `<iframe>` embed | `.video-container` wrapping `.ratio.ratio-16x9` iframe | Convert bare iframes (like the old Looplicht.html) into this wrapper. Match YouTube's current official embed attributes on the iframe: `frameborder="0"`, `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"`, and `referrerpolicy="strict-origin-when-cross-origin"` (required — without it YouTube throws error 153, "Fout bij configuratie van videospeler"; note this only takes effect over `http(s)://`, not a `file://`-opened page, so it won't visibly fix things when testing by double-clicking the file). Keep the video's own `src` exactly as given — don't invent a `?si=...` tracking param. Per current convention (see Looplicht.html/KnightRider.html), when the video is the exercise's main explainer it sits directly under the `lead` paragraph with **no own `<h2>`**, followed by `<hr>` before the next section — don't force a "Video" heading unless there's enough surrounding explanatory content to justify a section of its own |
| Local video file, explicitly a short looping/demo clip | `<video autoplay loop muted playsinline>` | Only add autoplay/loop/muted when source implies a decorative loop; otherwise use plain `<video controls>` |
| Everything else | Plain `<p>`, `<ul>`/`<ol>`, `<strong>`, `<a>` | Default — don't force a component |

## Code blocks

- Auto-detect the language from context/content and set
  `language-{arduino|sql|cpp|python|...}`.
- Default to `linenumbers show-language` classes on.
- Preserve `<code>` inline for short inline code references (e.g.
  `<code>&lt;h3&gt;</code>`).

## Submission ("indienen") claims

These pages are static content (iframed into Brightspace via `index.html`),
not the actual assignment dropbox. Source content sometimes carries over
submission language that was only accurate in its original context (e.g.
"Dien je oefening in op deze opdracht. Bij het indienen krijg je onmiddellijk
de oplossing te zien.") — implying you submit *here* and get an *immediate
solution reveal*. Drop sentences making that specific claim entirely; don't
reword or relocate them. Keep unrelated prep instructions from the same
section (e.g. "sla je oefening op als .ino of .txt bestand") since those
aren't submission claims, just advice.

## Checklist / QR block

These pages are plain static HTML with no live binding to a real Brightspace
assignment — students genuinely cannot "indienen" (submit) through the page
itself. So treat the checklist and the QR widget as two separate things:

- **Checklist — always, on every exercise page:** any page that describes a
  task/opdracht for the student to build or program (i.e. basically every
  `LaboN/` page this skill produces) gets an evaluation checklist block as
  the **last thing in `.container`**, regardless of whether the source text
  mentions grading/submission/indienen at all. Don't gate this on keywords —
  it's part of the standard page structure now, same as the `<h1>`/lead
  paragraph. Skip it only for pages that clearly aren't a student exercise
  (e.g. `template.html` itself, a pure reference/index page). It's framed as
  **self-evaluation**, not a formal evaluation being executed on/by the page.
  There are two variants — pick based on step 6 of the Process above:

  - **Checklist-driven (default whenever the target lab has a `laboN` key
    in the root `exercises.js`)** — a live, per-student checklist that
    syncs to the lab's `dashboard.html` (XP/badges) via `localStorage`. See
    [`Labo1/Looplicht.html`](../../../Labo1/Looplicht.html) for the
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
    Then, right before `</body>`:
    ```html
    <script src="https://tdmts.github.io/Microcontrollers/exercises.js"></script>
    <script src="https://tdmts.github.io/Microcontrollers/checklist-sync.js"></script>
    <script>
        initChecklistSync(LAB_EXERCISES.laboN);
    </script>
    ```
    And add an entry for this exercise under `LAB_EXERCISES.laboN.exercises`
    in the root [`exercises.js`](../../../exercises.js) (the single source
    of truth, shared across all labs, read by both every lab's dashboard
    and each exercise page's sync script) — give it a lowercase-no-spaces
    `id`, the next unused `order` number (scoped to that lab), `name`
    matching the `<h1>`, the page's own `href` under
    `https://tdmts.github.io/Microcontrollers/LaboN/{file}`, and
    `checklistDriven: true`. `checklist-sync.js` matches the current page to
    a manifest entry by comparing filenames, so the `href`'s basename must
    exactly match the output filename (case-insensitive) or the checklist
    silently won't sync.
  - **Static fallback (target lab has no key in `exercises.js` yet)** —
    plain text, no inputs, no scripts. See
    [`Labo1/Morsecode.html`](../../../Labo1/Morsecode.html)'s pattern:
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

Don't over-specify how/where students save their work — "Sla je oefening
op." is enough. Don't invent or carry over specific file extensions (.ino,
.txt, ...) unless the source is explicit that the format matters for a
concrete reason (e.g. an upload form only accepts one extension).

## Media

Keep original `src`/`href` values exactly as given (local relative paths or
external URLs) — this skill does not copy or manage asset files. Just wrap
them in the correct component markup per the table above, and mention any
`src` paths in your final summary so the user can verify they resolve
correctly in the final location.
