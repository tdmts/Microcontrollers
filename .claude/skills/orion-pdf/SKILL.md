---
name: orion-pdf
description: Export one lab (or all of them) to a single printable PDF, in the order the manifests define, with solutions expanded and the interactive parts made static. Use when the user wants a lab on paper, asks "kan ik dit labo afdrukken", "exporteer labo N naar pdf", "maak er een pdf van", wants a student handout without solutions, or a printable copy for an exam moment.
---

# Export a lab to PDF

Everything here is [`scripts/export-pdf.py`](../../../scripts/export-pdf.py). Do
not build a PDF by hand, and do not print pages one at a time: the ordering,
the static rewriting and the link handling all live in that script, and a
hand-made bundle drifts from the manifests the first time an `order` changes.

```
python scripts/export-pdf.py 6            # -> _export/Labo6.pdf
python scripts/export-pdf.py 0 1 2
python scripts/export-pdf.py --all
```

## What it produces

One PDF per lab: cover, table of contents, then the reference topics
(`reference.js`, category by category in array order) followed by the exercises
(`exercises.js`, sorted by `order`, the same comparator the dashboard uses).
Each page is stripped of its scripts and made static: solutions and spoilers
open, accordions expanded, checkboxes printed as empty boxes, YouTube embeds
replaced by a visible link, a JS widget replaced by a note pointing at the site.
Ids are namespaced per section, so links between pages of the same lab become
internal jumps and everything else becomes a `tdmts.github.io` URL. Datasheet
entries are listed in the TOC as *los document*, never inlined.

It prints through headless Chrome or Edge, found automatically (else `--chrome
PATH` or `$CHROME`), and writes only into `_export/` (gitignored). The PDF is
derived material: regenerate it, never edit it, and never commit it.

## Options worth knowing

- `--no-solutions` &mdash; student handout; drops each `.solution-container`
  together with its own `Oplossing` heading.
- `--exercises-first` &mdash; exercises before the reference section.
- `--page-numbers` &mdash; Chrome's own header/footer (date, title, page number).
  Off by default because that footer also prints the temp path of the bundle.
- `--html-only` / `--keep-html` &mdash; keep the bundled HTML, to inspect in a
  browser before or after printing.
- `--out DIR` &mdash; somewhere other than `_export`.

## Reading the report

Every deviation between the PDF and the live page is printed after the export
and is meant to be read, not dismissed:

- `los document` &mdash; a `.pdf`/`.zip` reference entry, listed but not embedded.
- `afbeelding ontbreekt` &mdash; almost always a planned `TODO-*` drawing; the PDF
  shows a box with the alt text. Same gap `check-content.sh` reports as a warning.
- `link niet gevonden` &mdash; a relative href resolving to nothing. That is a real
  fault in the page, so fix it there (run `bash scripts/check-content.sh`), not here.
- `interactief onderdeel` &mdash; a page-local widget that cannot print.

## Scope

Labs only. A `TestN/` folder has no manifest by design (see CLAUDE.md), so the
script has no ordering to read there; exporting a test would mean parsing
`overview.html`, and nobody has needed it yet. Say so rather than improvising it.
