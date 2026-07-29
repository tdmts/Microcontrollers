# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static HTML course site (Dutch, "je"-vorm) for an Arduino/microcontrollers course. Pages are
authored to the **Orion styleguide** and deployed via **GitHub Pages** at
`https://tdmts.github.io/Microcontrollers/`. Each page is then iframed into a Brightspace/Orion topic
using [pasteInOrion.html](pasteInOrion.html) (edit only the iframe `src` per topic).

> **The only file ever uploaded to Orion is [pasteInOrion.html](pasteInOrion.html).** Every other
> page in this repo is served from GitHub Pages, never uploaded. Inside `pasteInOrion.html` the
> iframe `src` must point at a GitHub-hosted HTML page (a `https://tdmts.github.io/Microcontrollers/...`
> URL), not a local file — that hosted page is what Orion embeds.

There is **no build system, package manager, linter, or test suite**. You edit HTML/CSS/JS directly.
To preview, open a page in a browser or push to GitHub Pages. Note: some behavior only works over
`http(s)://`, not a `file://`-opened page — e.g. YouTube embeds need `referrerpolicy` (error 153
otherwise) and the cross-tab dashboard sync relies on same-origin `localStorage`.

## Content check (the one automated guardrail)

[`scripts/check-content.sh`](scripts/check-content.sh) is the single "is this repo publishable"
check. Run `bash scripts/check-content.sh` before finishing any content edit; a `Stop` hook in
[`.claude/settings.json`](.claude/settings.json) also runs it automatically (`--hook` mode, blocking)
so a session cannot end while a violation exists. Treat a green check as part of "done". It covers,
in order:

1. **Links and assets resolve** — every relative `href`/`src` must point at a real file that is
   tracked by git with the exact same casing (GitHub Pages is case-sensitive and serves only tracked
   files, so a case typo or an uncommitted image works locally and 404s in production). Assets named
   `TODO-*` are reported as non-blocking warnings, for artwork that is planned but not drawn yet.
2. **Manifests match the filesystem** — every `exercises.js` / `reference.js` `href` resolves, sits
   under its own lab folder, and has a unique `id` and `order`; every entry carries every field the
   engines read (`name`, `difficulty`, `time`, `blurb` for exercises, `name` + `blurb` for reference
   topics, all non-empty, since a missing field renders a blank card rather than an error);
   `difficulty` is 1, 2 or 3, because `dashboard.js` maps `DIFFICULTY_LABELS` for those three only and
   any other value leaves the label empty, which drops the entire pepper badge from the card;
   every page under `LaboN/Exercises/` or `LaboN/Reference/` is listed in the matching manifest (an
   unlisted page earns no XP and is unreachable). This is the rule that otherwise fails *silently*:
   a mismatched basename makes checklist sync no-op with no error anywhere.
3. **Page wiring** — every page links the hosted `orion.css`/`orion.js`; every exercise page carries
   `back-link.js` + `exercises.js` and every reference topic carries `back-link.js` + `reference.js`,
   because `back-link.js` builds its "volgende"-link out of that manifest and without it the page
   renders perfectly with the link silently absent; a page with a `.checklist` additionally carries
   `checklist-sync.js` and calls `initChecklistSync` for *its own* lab; a `.solution-container`
   carries `solution-reveal.js`; `dashboard.html` and `reference.html` call `initDashboard` /
   `initReferenceHub` for their own lab (and the hub links `reference.js`, or it renders empty); and
   any page in a `LaboN/` folder whose `laboN` block does not exist yet in the manifest is flagged
   (adding a lab folder before its manifest block renders an empty dashboard, silently). Init calls
   are matched with either quote style.
4. **Asset hygiene** — no Brightspace `/content/enforced/` hotlinks, no remote `<img src="http...">`
   (self-host in `img/`), no remote document links (`href` ending in `.pdf`/`.zip`/`.docx`/`.pptx`/
   `.xlsx` — self-host in `datasheets/`, since a vendor PDF URL dies mid-semester exactly like a
   hotlinked image), and every YouTube embed carries `referrerpolicy` (error 153 without it).
5. **Code style** — **K&R braces** in Arduino/C++ code (the house style is Allman: opening `{` on
   its own line; data initializers `= { ... }` are exempt) and **em-dashes** (`&mdash;` or `—`)
   anywhere in prose.
6. **Exercise names say what the student builds** — an `exercises.js` `name`, or a page `<h1>`/
   `<title>`, may not be a generic slot label like "Gevorderde oefening 2", "Basis oefening 3" or
   "Oefening 1". Those tell a student nothing about the task, read as a placeholder, and stop meaning
   anything as soon as the `order` changes. Name it after the thing it makes ("Ledbar met
   potentiometer"). A label *without* a number is fine, since it describes the format rather than a
   slot: `Begeleide oefening` in labo 0 passes deliberately.

`template.html` and `pasteInOrion.html` are exempt from 1, 3 and 4 by design (the styleguide links a
local `orion.css` and uses placehold.co demo images; the Orion wrapper is not an Orion-styled page).
Section 5 still applies to them, because their code samples set the house style for everything
copied out of them.

`bash scripts/check-content.sh --audit` adds an advisory pass over the house conventions the check
proper stays out of: every code block must be `code-wrapper language-cpp linenumbers show-language`
(uniform everywhere, sketch or theory snippet alike), every content page needs a `lead`, images
belong in a `figure` (table cells excluded), exercise pages need `indienen` and `oplossing` sections,
the `indienen` section must be the standard `<p>Sla je oefening op.</p>` and nothing else (a hosted
page is not the dropbox, so anything about handing in belongs in Brightspace; imported content drags
that wording along), and a manifest `checklistDriven` flag must agree with the page's own markup. It
also carries the six greppable rules out of [`SCHRIJFSTIJL.md`](SCHRIJFSTIJL.md): a `lead` that opens
on a stock formula ("Hier lees je", "Op deze pagina zie je"), which is a tell precisely because every
page uses the same one; the `u`-vorm, which `CONTRIBUTING.md` has always ruled out but nothing
enforced; a diminutive dressing up a technical part ("het zwarte blokje", "draadjes", "zo eentje");
Netherlandic word choice in a course for Flemish students (`kun je` where the repo says `kan je` 101
times, `flink`, `prima`, `eventjes`); filler adverbs (`netjes`, 19 uses and nearly all padding); and
`LED` in capitals where the house spelling is `led`.

That last one is spelling rather than ornament, and it is the only rule here that has to reason about
where in the file it is looking. `LED` belongs in code: in labo 6 the
string `"LED"` is the protocol key between the pc and the Arduino (`WriteLine("LED:1")`). Those all
sit inside a `<pre>`, which a line-based grep cannot see, so the match is filtered the other way
round: the line must carry a prose tag and must not be the `<pre ...><code>` opening line, where labo
6 happens to put its `if (sleutel == "LED")`. Code lines carry no tag and drop out. It errs toward
missing a violation rather than inventing one, which is the right way round for an advisory rule, and
`<!-- audit-skip: led-spelling -->` is there for the day a page spells out Light Emitting Diode.

A seventh rule, `identifier-taal`, is the mirror image of that one and is about code rather than
prose. **Identifiers are Dutch, and a compound puts the head noun last**: `ledPin`, `knopPin`,
`potPin`, `ontdenderTijd`. That is the ordinary Dutch closed compound ("de ledpin") in camelCase and
the English word order at the same time, which is why those names came through the July 2026
conversion untouched while `pinLed`, `pinButton` and `pinPotentiometer` did not. The reasoning is in
[`CONTRIBUTING.md`](CONTRIBUTING.md): the Arduino API supplies the English vocabulary that actually
transfers, and the names an author picks are bench words the assignment already uses, so keeping them
Dutch removes a translation step in a course where working memory is the scarce resource. Datasheet
labels (`pinDS`, `pinSHCP`, `in1Pin`, `segA`) and the API's own parameter names are the exceptions,
the latter recorded with `<!-- audit-skip: identifier-taal -->` in
[`Labo2/Reference/map.html`](Labo2/Reference/map.html). Because an identifier lives in a `<pre>`, the
filter is inverted: the line must **not** carry a prose tag. Matching `<p` alone would have excluded
`<pre ...><code>`, which is exactly where a sketch's first constant sits, so the paragraph tag is
matched as `<p>` or `<p ` and `<pre ` slips past. The word list holds compounds only &mdash; bare
`value` and `state` are the likelier slip but are also `value="0"` in an attribute and `.value` in
the shift-register widget's JavaScript, and an advisory rule that cries wolf is worse than one that
occasionally misses.

The other five are word lists rather than clever patterns, and the reason is worth keeping. The obvious
`-je`/`-tje` suffix regex for diminutives also catches "haakjes", "netjes", "oranje" and "vrije", and
cannot tell decoration from the established term for a component: `pootjes` is what the outer legs of
a potentiometer are called in this course's own original text, so no technical term is ever listed.
The regional list was measured before it was written, which is how two plausible entries got dropped:
`best` in "neem daarvoor best een weerstand" is Belgian rather than Northern, and `hoor` is the verb
*horen* in "bij een echte motor hoor je dat". The target is standard Dutch as written in Flanders, so
that list will never ask for a Belgicism like "vijs" or "kuisen" either. Advisory throughout, because
the remaining patterns (a punchline, a rhetorical tricolon) are not something a grep can see, and a
style pass that half-blocks would be worse than one that never does. **It never affects the exit
code** and never runs in CI or the hook, so a stylistic deviation cannot block anyone.

`bash scripts/check-content.sh --compile` adds rule 7, the one rule that does not read the HTML: it
extracts every code block that is a whole program (has both `setup()` and `loop()`), undoes the HTML
escaping, and hands each one to the real Arduino compiler with `--warnings all`. It **does** affect
the exit code, because code that does not build is breakage rather than style. Warnings coming from
inside a library are filtered out, so only findings about this repo's own code are reported; a
missing library (`Servo.h`) is reported as a gap in *your* toolchain and does not fail. It needs
`arduino-cli` plus the `arduino:avr` core, and says so and carries on when either is absent. It takes
minutes rather than ~2s, so it is opt-in, refuses to combine with `--hook`, and never runs in CI:
reach for it after an import, or whenever you touch a sketch. **The fork-free constraint below does
not apply to this mode** &mdash; spawning a compiler per sketch is the entire job. A page whose code is
deliberately wrong records that with `<!-- compile-skip: reason -->` (page-level, reason required
next to it); [`Labo0/Reference/Iteraties.html`](Labo0/Reference/Iteraties.html) is the reason it
exists, since two of its examples demonstrate a bug and the compiler warning is the lesson.

Two things about the extraction itself, both learned the hard way. **A block is recognised whether or
not it carries a `<code>` tag** &mdash; glued (`<pre class="..."><code>`), on its own line, or absent
altogether, closing at `</code></pre>` or a bare `</pre>`. An earlier version matched only the glued
form, so a block written the other way never ended: it swallowed the rest of the page and its final
chunk, carrying no delimiter, was dropped by the reader. That hid **28 blocks across 18 pages, 27 of
them whole sketches**, while the check reported green &mdash; a quarter of the repo silently unverified.
Hence the second half: **an unclosed block is now a reported error**, not a silent skip. The house
form is still the glued one and every page uses it, but the extractor no longer depends on that.

A block containing `???` is a fill-in-the-blank skeleton for the student, not a program, so it is
skipped &mdash; and listed, like every other skip. This is deliberately **per block, not per page**:
[`Labo2/Exercises/TemperatuursensorTMP36.html`](Labo2/Exercises/TemperatuursensorTMP36.html) has both
an *Opgave* full of `???` and a real *Oplossing*, and a page-level skip would stop checking exactly
the sketch most worth compiling. Filling the blanks in to make it build would hand over the answer.

A page can record that a deviation is deliberate with `<!-- audit-skip: oplossing -->` (comma-separate
several; valid rules are `lead`, `figure`, `indienen`, `oplossing`, `code-class`,
`checklist-driven`, `lead-opener`, `u-vorm`, `verkleinwoord`, `noord-nederlands`, `vulwoord`,
`led-spelling`, `identifier-taal`). Skipped deviations are still listed, under "Deviations recorded in the page
itself", just not as findings, and an unrecognised rule name is reported rather than silently
ignoring nothing. Put the reason in a comment next to the marker: see
[`Labo0/Exercises/BegeleideOefening.html`](Labo0/Exercises/BegeleideOefening.html), a guided
walkthrough whose solutions sit inline per step, so a closing Oplossing section would duplicate them.
Reach for this only when the page type genuinely differs, not to quiet a page you haven't fixed yet.

`bash scripts/check-content.sh --fix` repairs the mechanical violations first and then reports the
rest: em-dashes, K&R braces that end a line, a missing `referrerpolicy`, an init call naming the
wrong lab, a manifest `href` with the wrong casing, a reference topic that never loads
`reference.js` (the tag has exactly one place to go, right above `back-link.js`, with the same
relative prefix), and assets that exist but were never staged.
It deliberately does *not* touch anything needing words (a missing `blurb`) or a decision (which lab
an orphan page belongs to, what to name a downloaded image). It wants a clean tree so `git diff`
shows exactly what it changed (`--force` overrides), and it refuses to combine with `--hook`, since
rewriting files at session end without anyone reading the diff is exactly the wrong moment.

The same script runs in CI ([`.github/workflows/check-content.yml`](.github/workflows/check-content.yml))
on every push and pull request, so it also covers edits made outside a Claude Code session (this repo
has a second author). [`CONTRIBUTING.md`](CONTRIBUTING.md) is the human-facing version of these
rules, written in Dutch for that coworker: **when a rule changes, update the script, CLAUDE.md and
CONTRIBUTING.md together.** [`.gitattributes`](.gitattributes) normalizes line endings (and pins
`*.sh` to LF, since a CRLF script fails on the Linux CI runner).

Keep the script fork-free (one `grep` per rule over
the whole file list, bash string ops for the rest): a per-file `grep` loop made it 48s, past the
hook timeout, versus ~2s now.

## Layout

- `LaboN/Exercises/` — one HTML page per exercise, plus that lab's `dashboard.html` (progress/XP view).
- `LaboN/Reference/` — theory pages, plus `reference.html` (the non-linear reference hub).
- `TestN/` — evaluation-moment material, a different animal from a lab: a flat folder holding
  `overview.html` (the hub, and the only page pasted into Orion for that test),
  `AlgemeneInformatie.html` (timing, allowed resources, what to bring),
  `PraktischeVoorbeeldtest.html` (a practical practice test) and `TheoretischeVoorbeeldtest.html`
  (theory questions). Apart from the hub, a page's filename is the PascalCase form of its own
  `<h1>`/`<title>`, and the two practice tests are named as a matched pair off the *praktische
  test* / *theoretische test* wording that `AlgemeneInformatie.html` establishes — keep that
  vocabulary rather than introducing *praktijkgedeelte* or *quiz* alongside it.
  **No manifest, no XP, no checklist sync** — the hub's three links are
  hardcoded `<a href>`s. That is deliberate: `check-content.sh` scopes its manifest rules to
  `labo[0-9]+` keys, so a `testN` block in `reference.js` would render fine but be validated by
  nothing, whereas plain links in the HTML are covered by rule 1 (resolve, tracked, exact case).
  Pages here are one level deep, so shared scripts are `../back-link.js`, not `../../`.
- Repo-root shared JS/CSS — the **single source of truth**, referenced by every page via relative
  paths (`../../back-link.js` etc). Do not fork per-folder copies.
- `img/` — the one shared image folder. Self-host images here (descriptive filenames), never hotlink
  Brightspace-authenticated content (`/content/enforced/...`) — those paths break each academic year.
- `datasheets/` — the same idea for documents: component datasheets and other PDFs a page links to,
  self-hosted with descriptive filenames (`74hc595.pdf`, not `74HC_HCT595-datasheet.9581058.pdf`).
  `scripts/import-brightspace.py` fills this folder automatically, see below. Lecture slides stay on
  Brightspace; they are course-internal and large (the export's biggest is 200 MB, past GitHub's
  100 MB per-file hard limit).

## Two style/script origins (don't confuse them)

1. **Orion styleguide** — `orion.css` / `orion.js`, hosted externally at
   `https://tdmts.github.io/OrionContent/`. Every real page links these absolute URLs. This provides
   all the visual components (info-boxes, code-wrapper, steps, spoilers, tables, etc).
   [template.html](template.html) is the component/styleguide reference — but it links a *local*
   `orion.css`/`orion.js` that does **not** exist in this repo, so don't copy its `<head>`; use the
   hosted CDN URLs.
2. **This repo's shared JS** — the progress/navigation engines below, referenced by relative path.

## Shared engines and their data manifests

Two JS manifests are the single source of truth for all content lists; add new exercises/topics
there, not in the per-page HTML:

- [exercises.js](exercises.js) → `window.LAB_EXERCISES.laboN` — every lab's exercise list. Read by
  both the lab dashboard and each exercise page's checklist sync. Ordering is driven by each entry's
  `order` number (not array position). `href` basename **must** match the page's filename
  (case-insensitive) or checklist sync silently no-ops.
- [reference.js](reference.js) → `window.LAB_REFERENCE.laboN` — every lab's reference topics, grouped
  into categories (shown in full, ordered by array position). A topic `href` is normally a bare
  filename next to `reference.html`, but it may also reach out of the lab folder to a document, as
  the **Datasheets** category in labo 2 and labo 3 does (`../../datasheets/74hc595.pdf`). The engine
  renders it as an ordinary card that opens in a new tab (see `reference-dashboard.js` below) and the
  content check resolves it like any other relative href, so a datasheet that is missing, misspelled
  or unstaged fails the check the same way a page would.

Engines (all IIFEs exposing one `window.*` init function):

- [dashboard.js](dashboard.js) `initDashboard(LAB_EXERCISES.laboN)` — renders the XP/badge dashboard
  from the manifest. Toggles for non-`checklistDriven` exercises; reads `checklistDriven` ones from
  `localStorage`. Confetti/celebration on completion.
- [checklist-sync.js](checklist-sync.js) `initChecklistSync(LAB_EXERCISES.laboN)` — on an exercise
  page, auto-detects the current exercise by filename, persists each checkbox, and marks the exercise
  "done" only when **all** boxes are checked. Fires a one-time celebration on the completing tick.
- [reference-dashboard.js](reference-dashboard.js) `initReferenceHub('laboN')` — renders the
  reference hub from `LAB_REFERENCE`. Pure navigation, no progress. A topic whose `href` is a
  document (`.pdf`, `.zip`, `.docx`, `.pptx`, `.xlsx`) gets `target="_blank" rel="noopener"`; a
  topic pointing at a page does not. The hub is iframed into Orion, so a PDF in the same tab would
  render inside that narrow frame. The card itself looks identical either way, and the decision is
  made from the `href`, so a new datasheet needs nothing beyond its `reference.js` entry.
- [back-link.js](back-link.js) — self-running, no init. Injects the nav row above the `<h1>` and at
  the bottom: "← Terug naar ..." on the left, "Volgende: ..." on the right. **Back** targets the
  previous page (trusted same-origin `.html` referrer) when known, else the lab dashboard, else the
  reference hub for pages under `Reference/`. No-ops on `dashboard.html`. A page under `TestN/` is
  the exception: it always targets that folder's `overview.html` and ignores the referrer, so the
  exit is identical wherever the student came from, and it no-ops on `overview.html` itself the same
  way it does on `dashboard.html`.
  **Forward** is the next entry in the page's own lab manifest: `exercises.js` sorted by `order`
  (the same comparator as `dashboard.js`, so "volgende" and the dashboard order cannot drift apart),
  or `reference.js` flattened in array order, categories then topics. On the last entry it points at
  the dashboard / the hub ("Terug naar dashboard →") rather than leaving a dead end, and is dropped
  altogether when the back link already points at that same page (no referrer), since two mirrored
  links to one URL read as a bug. Document
  topics (the `.pdf` datasheets) are skipped: a PDF carries no nav of its own and the hub opens
  documents in a new tab on purpose. No forward link on `dashboard.html`, `reference.html` or under
  `TestN/`. Everything runs on `DOMContentLoaded`, so the manifest `<script>` may sit on either side
  of this one. **This is why an exercise page must load `exercises.js` and a reference topic must
  load `reference.js`** — without it the page renders perfectly and only the forward link vanishes,
  so rule 3 of the content check asserts the include.
- [solution-reveal.js](solution-reveal.js) — one-way "Toon oplossing" reveal for `.solution-container`.

## localStorage progress model (no backend)

Self-reported, browser-local only. Key scheme (must match across engines):

- `msDashboard:{labId}:{exerciseId}` — the exercise "done" flag (`'1'`).
- `msDashboard:{labId}:{exerciseId}:item:{index}` — per-checkbox state for checklist-driven pages.

The dashboard listens for cross-tab `storage` events, so ticking a checklist in one tab updates an
open dashboard in another. Because both read/write the same keys, checklist pages need no changes to
dashboard read logic.

## The checklist-driven page pattern

An exercise page whose lab has a `laboN` key in `exercises.js` gets a **live** checklist
(`.info-box.evaluation` → `.checklist` with `<input type="checkbox">`), plus, before `</body>`:
`back-link.js`, `exercises.js`, `checklist-sync.js`, `solution-reveal.js`, then
`initChecklistSync(LAB_EXERCISES.laboN)`. See [Labo1/Exercises/Looplicht.html](Labo1/Exercises/Looplicht.html)
for the canonical example. Every new exercise must also get a matching entry in `exercises.js`.

A reference topic is the shorter version of the same idea: `reference.js` then `back-link.js` before
`</body>`, no init call, no checklist. See [Labo1/Reference/Arrays.html](Labo1/Reference/Arrays.html).

## Didactic review (the guardrail no script can be)

`check-content.sh` answers *is this page wired correctly*. It cannot answer *would a
student who knows nothing actually learn this*, and that question has its own protocol:
the **orion-review** skill (`.claude/skills/orion-review/`). One lab per pass, read in the
honest student order (exercises by `order`, reference pages only when the exercise sends
you there), with the prior-knowledge baseline rebuilt from the manifests of labo 0..N-1.
It reports four kinds of finding only (`BEGRIP`, `SPRONG`, `OPDRACHT`, `BEELD`), never
technical correctness and never anything the script already covers. It also stays out of tone and
phrasing, which belong to [`SCHRIJFSTIJL.md`](SCHRIJFSTIJL.md); the exception is phrasing that is what
makes an assignment ambiguous, and that is an `OPDRACHT`.

The pass ends in an interview, not in edits: every finding gets two or three concrete fix
options, and the user decides. **The decisions live in [`review/labo4.md`](review/labo4.md)
and friends**, one committed ledger per lab, with a permanent id per finding and a status
of `open` / `aanvaard` / `opgelost` / `verworpen`. A rejected finding keeps its reason
forever, because that is what stops the next pass from relitigating it. The reader is
never shown the ledger, so a finding that resurfaces on its own is evidence rather than
noise; reconciliation happens afterwards.

## Authoring conventions

### Prose style

[`SCHRIJFSTIJL.md`](SCHRIJFSTIJL.md) is the single source of truth for how the Dutch prose reads, in
Dutch because its before/after pairs *are* Dutch prose and the second author has to be able to read
it. `CONTRIBUTING.md` and the `orion-convert` skill point at it rather than restating the list.

The short version: **keep the didactics, drop the theatre.** The pages written from labo 5 onward (and
labo 0's theory pages) explain well but read manufactured, because nearly every paragraph builds
toward a pointe and closes on a line meant to land. Seventeen patterns are named there: patterns 1 to 11
are about ornament (the closing punchline, the rhetorical tricolon, the rhetorical question as a
transition, the colon-as-pointe, the stock `lead` opener and the decorative diminutive do the most
damage), 12 and 13 are about word choice, namely Netherlandic vocabulary in a course for Flemish
students and filler adverbs, and 14 (the wink in parentheses) and 15 (decorative metaphor) were added
later. The numbers are fixed even though the grouping no longer runs in order, because the ledgers in
`review/` cite them.

**16 and 17 sit a level above the rest**: they are about the shape of a paragraph rather than a
sentence, which is why every individual sentence survives the other fifteen and the page still reads
written. 16 (*stel vast, beoordeel niet*) is the habit of stating a fact and then telling the reader
how bad or important it is, in three forms: the ranking ("Dit is de gevaarlijkste van de drie"), the
announcement ("Twee dingen zijn de moeite om apart te bekijken") and the closing appraisal. Unlike
pattern 1 the fix is usually a move rather than a deletion: the weight goes into the statement. 17
(*bekend materiaal krijgt minder plaats*) is the flip side of the callback rule: explaining
everything to the same depth is itself performance, so what an earlier lab already taught gets one
line and a reference. Both carry the same brake as 15 &mdash; a pass may only compress what an earlier
lab demonstrably covers, otherwise the paragraph goes on the question list.

Three rules cut across all seventeen. They apply **everywhere a student reads** (body text, headings and
box titles, the `lead`, checklist lines, spoiler labels, `alt`, `figcaption`, and `name`/`blurb` in the
manifests) and **not** to the repo's own documentation. Language errors are **out of scope**: a comma
splice is not style, so a pass collects them and puts them to the user rather than fixing them in the
same diff. And a heading may never open on, or contain, a `geen` or `niet`, while a verbless heading
("Het probleem", "In code") is perfectly fine, because the verbless test of pattern 5 applies to body
text only.
What stays is everything didactic: the *why* in plain
declarative sentences, the callback to prior labs stated as fact, concrete examples in the main clause
instead of in parentheses, the cross-links, the je-vorm, and box titles that say something.

The failure mode to avoid is over-correcting. The imported labo 1 and 2 prose ("Maak een teller op 1
display...") is exactly as dry as asked for and explains nothing, which is what `orion-review` exists
to fix. Terser is not the goal; unperformed is.

Six of those rules are greppable and live in `--audit` (see the content check above); the sixth is the
spelling rule `led` rather than `LED`, which the document carries alongside the em-dash ban because it
is not one of the seventeen patterns. The rest is a
reading judgement, so [`Labo0/Reference/WatIsEenMicrocontroller.html`](Labo0/Reference/WatIsEenMicrocontroller.html)
is kept as the worked specimen: it had eleven of the thirteen and was rewritten against the document.

Bringing the *existing* pages in line is a separate, ongoing job with its own protocol: the
**orion-style** skill (`.claude/skills/orion-style/`). One lab per pass, in course order, rewriting
rather than proposing (the rules are already agreed, `git diff` is the review surface) but holding
back anything that would change meaning or needs a fact, as a short list of questions. Progress and
those hold-backs live in [`review/schrijfstijl.md`](review/schrijfstijl.md). Imported Brightspace
prose is treated like any other page, style only. Do not confuse this with `orion-review`: that pass
answers whether a student learns anything and never touches phrasing, this one only touches phrasing
and never adds an explanation.

### Bulk import from Brightspace

Moving a whole course over one topic at a time, by hand, is not the intended workflow.
[`scripts/import-brightspace.py`](scripts/import-brightspace.py) takes a Brightspace course export
zip (Course Admin → Import/Export/Copy Components → *Export Components*, course files included) and
stages every content topic as raw HTML in `_incoming/` (gitignored), one file per topic, numbered in
course order, with the module, title, order and original path in an `imported-from-brightspace`
header comment. It also copies every referenced course image into `img/` and rewrites the
`/content/enforced/...` srcs to `../../img/...`, deduplicating against images already in the repo, so
the hotlink rule is satisfied before conversion even starts. `--dry-run` reports without writing;
`--img-dir`/`--img-prefix` override the destinations.

**Documents get the same treatment into `datasheets/`** (`--doc-dir`/`--doc-prefix`), by both routes
they arrive: a datasheet hanging in the module tree as a topic of its own (it has no page to convert,
but the file is worth keeping) and a `.pdf`/`.zip` linked from inside a page (the `href` is rewritten
to `../../datasheets/...`). Naming comes from the Brightspace title with D2L's numeric id stripped,
never from the page that linked it, since one datasheet is usually shared across labs. Dedup is by
content hash, so re-importing a lab reuses a datasheet already in the repo *even if you renamed it*.
`DOC_EXTS` is deliberately just `.pdf`/`.zip`: slides and office documents are course-internal, so
they stay on Brightspace and are reported as skipped rather than staged. `MAX_DOC_BYTES` (25 MB)
catches anything that would bloat the repo. Anything genuinely remote (a vendor URL rather than a
Brightspace path) is left alone and listed as unresolved, for `check-content.sh` rule 4 to flag and a
human to decide on.

It reads the package's `imsmanifest.xml` for the module tree and ordering, falling back to a plain
scan for `.html` entries if there is none. Image refs it cannot find in the package (a genuinely
external hotlink, a dead link that was already broken in Brightspace) are left untouched and listed,
both on stdout and in the page header, for `check-content.sh` to catch later.

Staging is all it does: **`_incoming/` is never published.** Each staged file still goes through
orion-convert to become a real page under `LaboN/`, gets its `exercises.js` / `reference.js` entry,
and the images need `git add` before the check accepts them. `_incoming/WORKLIST.md` is the
per-topic to-do list for that pass. Python rather than bash because it parses zip and XML; it is an
authoring tool, never part of CI or the hook, so the fork-free constraint on `check-content.sh`
does not apply to it.

Use the **orion-convert** skill (`.claude/skills/orion-convert/`) when turning raw content into a lab
page — it encodes the full component-mapping rules, the checklist/QR conventions, heading-id
slugging, and the Brightspace-image self-hosting rule. Key points it enforces: keep the source
language (don't translate), map to Orion components only on unambiguous matches (default to plain
`<p>`/`<ul>`), and never add the QR auto-grading widget unless the user confirms a real assignment.

### Exporting a lab to PDF

[`scripts/export-pdf.py`](scripts/export-pdf.py) turns one lab into a single printable PDF
(`python scripts/export-pdf.py 6`, or `--all`), for the students who work on paper and for an
examination copy. The **orion-pdf** skill (`.claude/skills/orion-pdf/`) is the entry point; both are
authoring tools, so like the importer they never run in CI or the hook and the fork-free constraint
does not apply.

The ordering is the manifests', not the filesystem's: reference topics category by category in
`reference.js` array order, then exercises sorted by `order` with the same comparator as
`dashboard.js` and `back-link.js`, so the printed order cannot drift from the dashboard. Each page is
then made static — scripts stripped, solutions and spoilers and accordions forced open by print CSS
(orion.css has no `@media print` of its own), checkboxes given a visible border because a native
checkbox prints as empty white, iframes replaced by the link they embed, a page-local widget replaced
by a note. Ids are namespaced with the section slug: `id="het-schema"` occurs on five pages of one
lab, and in a merged document every link to it would otherwise land on the first. Links that resolve
to a page in the same bundle become internal jumps, the rest become absolute
`tdmts.github.io` URLs; images become absolute `file:` URLs so the bundle can be printed from
anywhere. Everything not embedded (a datasheet, a `TODO-*` drawing that isn't drawn yet, a dead
relative href, a widget) is reported per lab after the run.

Output goes to `_export/` (gitignored, like `_incoming/`) — a PDF is derived material, so it is
regenerated rather than committed. Printing is done by headless Chrome or Edge, discovered from the
usual install paths, `$CHROME` or `--chrome`; `--html-only` skips that step entirely and leaves the
bundled HTML to open in a browser. Two things it deliberately does not do: it has **no manifest to
read for `TestN/`** (those hubs are hardcoded links by design, see Layout above), and `--no-solutions`
is the only content variant, since anything else belongs in the page rather than in the exporter.

The manifests are parsed with a small JS-literal scanner rather than a regex that swaps quote
characters: half the blurbs contain an apostrophe (`twee Arduino's`), and the naive conversion breaks
on exactly those entries.

**The printed page uses its full width, and the trap there is not the page margin.** orion.css
imports Bootstrap, which caps `.container` at `max-width: 540px` from the sm breakpoint up; a printed
A4 lays out at roughly 697px, so the text sat in a 540px column with about 75px of white on each side
*on top of* the 13mm margin. `PRINT_CSS` overrides that cap and its gutter padding, and the margins
are 12mm left and right (enough to bind or staple), which takes the column from ~143mm to ~186mm.
Tables, code blocks and info-boxes were the ones breaking lines while there was white beside them.
Any future print stylesheet in this repo starts by killing that `max-width`; check the result by
screenshotting the bundle at a 697px window width, which is the actual print layout width.
