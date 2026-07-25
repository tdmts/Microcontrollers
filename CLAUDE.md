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
