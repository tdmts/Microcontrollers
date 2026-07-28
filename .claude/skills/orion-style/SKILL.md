---
name: orion-style
description: Bring one lab's existing prose in line with SCHRIJFSTIJL.md - strip the performed writing (closing punchlines, rhetorical tricolons, stock lead openers, decorative diminutives, filler adverbs, Netherlandic word choice) while protecting everything didactic. Use when the user wants the writing style of existing pages fixed, asks to "herschrijf labo N volgens de schrijfstijl", "pas de schrijfstijl toe", "doe de stijl van labo N", or wants the next lab in the style pass.
---

# Apply the house writing style to one lab

[`SCHRIJFSTIJL.md`](../../../SCHRIJFSTIJL.md) in the repo root is the rule. **Read it
in full before touching anything** - this skill is the procedure, that file is the
content, and it is the single source of truth. Fifteen patterns: 1 to 11 about
ornament, 12 and 13 about word choice, 14 and 15 added later (both ornament).

They apply everywhere a student reads, including headings, box titles, checklist
lines, spoiler labels, `alt`, `figcaption` and the manifest `name`/`blurb`, and not to
the repo's own documentation. Two consequences are easy to get backwards: the
verbless test of pattern 5 is **body text only** (a heading is a noun phrase by
nature), while the negation ban of pattern 6 is **stricter** in a heading, where no
`geen` or `niet` may appear at all.

One lab per pass, in course order. Labo 0 first, then 1, 2, and so on, with the
`TestN/` folders last. The pass **rewrites** rather than proposes, because the rules
are already agreed and most of the edits are mechanical; anything genuinely doubtful
is held back for the user instead (see "What to hold back" below). `git diff` is the
review surface, so keep the diff readable and never mix a style pass with anything
else.

## What this is not

- **Not `orion-check`.** Broken links, manifests, page wiring, hotlinked images,
  K&R braces, em-dashes: that is `scripts/check-content.sh`, and it still has to be
  green when you are done.
- **Not `orion-review`.** Whether a student can actually learn from the page is a
  didactic question with its own protocol and its own ledgers in `review/laboN.md`.
  This pass never adds an explanation, never reorders a page, never splits an
  exercise. If you notice a didactic gap, write it in the ledger under "Voor
  orion-review" and move on.
- **Not a proofreading pass.** Comma splices, spelling and agreement errors are not
  style. Collect them, list them in the closing report and the ledger, and leave them
  in the file, so the diff of a style pass holds one kind of change. This is a change
  from how labo 0 to 4 were done, where such fixes rode along.
- **Not a content edit.** No new facts, no new claims, no changed numbers. Rewriting
  "een pin kan maar een kleine stroom leveren" into "een pin mag maximaal 40 mA
  leveren" is out of scope even when the number is right, because a style pass that
  quietly changes what the page teaches cannot be reviewed from a diff.

## The two ways this goes wrong

**Over-correcting.** The imported labo 1 and 2 prose ("Maak een teller op 1 display
die doorlopend telt van 0 tot en met 9." and nothing else) trips almost none of the
thirteen patterns and is still bad writing, because it explains nothing. Terser is
not the goal. `SCHRIJFSTIJL.md` opens with a "Wat blijft" section for exactly this
reason: the *why*, the callbacks to earlier labs, the concrete examples, the
cross-links, the je-vorm and the box titles that say something are all protected. If
a page ends up shorter *and* thinner, you have done the wrong thing.

**Flagging what is actually correct.** Every word list in this repo was measured
before it was written, and two plausible entries were dropped as a result: `best` in
"neem daarvoor best een weerstand" is Belgian Dutch rather than Northern, and `hoor`
in "bij een echte motor hoor je dat" is the verb. `pootjes` is what the outer legs of
a potentiometer are called in this course's own original text. So when you think you
have found a new instance of a pattern, **grep the repo before you act on it**: check
how the word is used elsewhere and whether it is the established term. If it turns out
to be a real gap in a list, add it to `scripts/check-content.sh` in the same pass and
say so.

## Process

### 1. Pick the lab

If the user did not name one, take the first lab in course order that
`review/schrijfstijl.md` does not record as `klaar`. Say which lab you picked and how
many pages it has.

One lab is deliberately a whole pass. Reading a dozen pages in full and rewriting
their prose fills a context window; two labs in one session means the second one gets
skimmed, which is exactly the failure this skill exists to prevent.

### 2. Get the mechanical findings

```bash
bash scripts/check-content.sh --audit
```

Filter the output to the lab you are working on. Five of the fifteen patterns are
greppable and will appear here: stock `lead` opener (9), decorative diminutive (11),
Netherlandic word choice (12), filler adverb (13), and the `u`-vorm. Treat this as a
floor, not a list: it is roughly a third of what a pass finds.

The `NOORD_NL` list runs one way only. A Belgicism is not a finding: pattern 12 now
prefers the Belgian word to the Netherlandic one, and only spoken-register words
(`deftig`, `een pak beter`) go.

### 3. Read every page of the lab in full

The other eight patterns need a reader. Read in the student's order, exercises by
their `order` in [`exercises.js`](../../../exercises.js) and then the reference topics
from [`reference.js`](../../../reference.js), so that repetition across pages becomes
visible. The stock `lead` opener and the closing punchline are only recognisable as
tics when you have seen the fourth one.

Read the whole page including `alt` text, `figcaption`s and box titles. Six of the
seven `lijstje`s on `ProgrammaUploaden.html` were in body text and the seventh was in
an `alt` attribute; a pass that only reads paragraphs leaves those behind.

### 4. Rewrite, in one edit per passage

Apply everything that is clear. Keep each edit small enough that the diff shows the
sentence that changed rather than a rewritten block, so the user can read the pass
without re-reading the page.

Prose only. Never touch, in this pass:

- **Code blocks.** Not the code, not the comments. Compiling is a separate concern and
  a style pass has no business risking it.
- **Markup and structure.** No new sections, no changed nesting, no removed figures.
- **Heading `id`s.** Other pages and the reference hub link to them.
- **`<h1>` and `<title>`.** Rule 6 of the content check governs those, and the
  manifest `name` has to keep matching.
- **Table data.** A cell's wording may be tightened; what it asserts may not change.
- **The `Indienen` section.** Fixed boilerplate, `<p>Sla je oefening op.</p>`.
- **The source language.** Everything stays Dutch.

Imported Brightspace prose is treated like any other page: the whole site should read
as one voice regardless of who wrote which part. Style only, though. The structure and
the content of those pages are not yours to change here.

### 5. Hold back what is doubtful

This is the part the user asked for explicitly, so be generous with it. Hold back
rather than decide when:

- the fix would **change or add meaning**, however slightly;
- the word may be the **established term** for a component and the repo does not
  settle it;
- the passage is a **judgement call between two readings** and you cannot tell which
  the author meant;
- fixing it properly needs **a fact you do not have** (a current, a pin number, what
  a screenshot shows);
- the pattern is real but the page **deviates on purpose** and an `audit-skip` marker
  with a reason is the better answer.

Hold-backs go in the ledger and in the closing report, quoted with their file and a
one-line question. Do not bury them: a list of five concrete questions is worth more
than fifty applied edits the user cannot check.

### 6. Verify

```bash
bash scripts/check-content.sh          # must print check-content: OK
bash scripts/check-content.sh --audit  # this lab should be clean, or carry audit-skips
```

`--compile` is not needed, because a style pass does not touch code. If it did, that
was a mistake in step 4.

Then re-read your own diff (`git diff Labo N/`) against the "Wat blijft" list. The
question is not "is every pattern gone" but "does this page still explain as much as
it did".

### 7. Record the pass

Update [`review/schrijfstijl.md`](../../../review/schrijfstijl.md): the lab's row in
the table, the pages touched, the hold-backs with their status, and any word added to
a list in `scripts/check-content.sh`. That file is how the next pass knows where to
start and what was already decided.

## The ledger

`review/schrijfstijl.md`, one section per lab. It is deliberately thinner than the
`orion-review` ledgers: those keep a permanent numbered finding per issue because
their findings are judgement calls that get relitigated, whereas here the rule
document already *is* the decision. What this ledger holds is progress, hold-backs,
and the words that were added to a list.

A deviation that is deliberate does not go in the ledger at all. It goes in the page,
as `<!-- audit-skip: verkleinwoord -->` with the reason next to it, so the decision
lives where the deviation does. Valid names for the style rules are `lead-opener`,
`u-vorm`, `verkleinwoord`, `noord-nederlands` and `vulwoord`.

## Report format

Close the pass with, in this order:

1. **Per page, one line** on what changed, grouped by pattern rather than by page when
   the same fix repeats (`lijstje -> lijst, 7 keer op ProgrammaUploaden.html`).
2. **The hold-backs**, quoted, with the question for the user.
3. **Anything added to a word list** in `scripts/check-content.sh`, with what you
   measured before adding it.
4. **The check output**, verbatim, and what the audit still reports for this lab.
5. **Which lab is next.**

Keep it short. The diff is the deliverable; the report is the map to it.
