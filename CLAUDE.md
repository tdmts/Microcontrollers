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
   every page under `LaboN/Exercises/` or `LaboN/Reference/` is listed in the matching manifest (an
   unlisted page earns no XP and is unreachable). This is the rule that otherwise fails *silently*:
   a mismatched basename makes checklist sync no-op with no error anywhere.
3. **Page wiring** — every page links the hosted `orion.css`/`orion.js`; a page with a `.checklist`
   carries `back-link.js`, `exercises.js`, `checklist-sync.js` and calls `initChecklistSync` for
   *its own* lab; a `.solution-container` carries `solution-reveal.js`; `dashboard.html` and
   `reference.html` call `initDashboard` / `initReferenceHub` for their own lab; and any page in a
   `LaboN/` folder whose `laboN` block does not exist yet in the manifest is flagged (adding a lab
   folder before its manifest block renders an empty dashboard, silently). Init calls are matched
   with either quote style.
4. **Asset hygiene** — no Brightspace `/content/enforced/` hotlinks, no remote `<img src="http...">`
   (self-host in `img/`), and every YouTube embed carries `referrerpolicy` (error 153 without it).
5. **Code style** — **K&R braces** in Arduino/C++ code (the house style is Allman: opening `{` on
   its own line; data initializers `= { ... }` are exempt) and **em-dashes** (`&mdash;` or `—`)
   anywhere in prose.

`template.html` and `pasteInOrion.html` are exempt from 1, 3 and 4 by design (the styleguide links a
local `orion.css` and uses placehold.co demo images; the Orion wrapper is not an Orion-styled page).
Section 5 still applies to them, because their code samples set the house style for everything
copied out of them.

`bash scripts/check-content.sh --audit` adds an advisory pass over the house conventions the check
proper stays out of: every code block must be `code-wrapper language-cpp linenumbers show-language`
(uniform everywhere, sketch or theory snippet alike), every content page needs a `lead`, images
belong in a `figure` (table cells excluded), exercise pages need `indienen` and `oplossing` sections,
and a manifest `checklistDriven` flag must agree with the page's own markup. **It never affects the
exit code** and never runs in CI or the hook, so a stylistic deviation cannot block anyone.

`bash scripts/check-content.sh --fix` repairs the mechanical violations first and then reports the
rest: em-dashes, K&R braces that end a line, a missing `referrerpolicy`, an init call naming the
wrong lab, a manifest `href` with the wrong casing, and assets that exist but were never staged.
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
- Repo-root shared JS/CSS — the **single source of truth**, referenced by every page via relative
  paths (`../../back-link.js` etc). Do not fork per-folder copies.
- `img/` — the one shared asset folder. Self-host images here (descriptive filenames), never hotlink
  Brightspace-authenticated content (`/content/enforced/...`) — those paths break each academic year.

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
  into categories (shown in full, ordered by array position).

Engines (all IIFEs exposing one `window.*` init function):

- [dashboard.js](dashboard.js) `initDashboard(LAB_EXERCISES.laboN)` — renders the XP/badge dashboard
  from the manifest. Toggles for non-`checklistDriven` exercises; reads `checklistDriven` ones from
  `localStorage`. Confetti/celebration on completion.
- [checklist-sync.js](checklist-sync.js) `initChecklistSync(LAB_EXERCISES.laboN)` — on an exercise
  page, auto-detects the current exercise by filename, persists each checkbox, and marks the exercise
  "done" only when **all** boxes are checked. Fires a one-time celebration on the completing tick.
- [reference-dashboard.js](reference-dashboard.js) `initReferenceHub('laboN')` — renders the
  reference hub from `LAB_REFERENCE`. Pure navigation, no progress.
- [back-link.js](back-link.js) — self-running, no init. Injects a "← Terug naar ..." link above the
  `<h1>` and at the bottom. Targets the previous page (trusted same-origin `.html` referrer) when
  known, else the lab dashboard, else the reference hub for pages under `Reference/`. No-ops on
  `dashboard.html`.
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

## Authoring conventions

Use the **orion-convert** skill (`.claude/skills/orion-convert/`) when turning raw content into a lab
page — it encodes the full component-mapping rules, the checklist/QR conventions, heading-id
slugging, and the Brightspace-image self-hosting rule. Key points it enforces: keep the source
language (don't translate), map to Orion components only on unambiguous matches (default to plain
`<p>`/`<ul>`), and never add the QR auto-grading widget unless the user confirms a real assignment.
