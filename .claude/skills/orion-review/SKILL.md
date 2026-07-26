---
name: orion-review
description: Review one lab's teaching quality through the eyes of a student who knows nothing yet. Finds unexplained jargon, missing intermediate steps, ambiguous assignments and explanations that need a picture, then interviews the user per finding and records the decision in a durable ledger. Use when the user wants to judge whether the course material actually teaches, asks "review labo N as a student", "is dit duidelijk genoeg", "kijk hier eens naar met een studentenbril", or wants to revisit an earlier review.
---

# Review a lab as a student

The third axis of this repo. `orion-check` asks *is this page wired correctly*,
`orion-convert` asks *how do I build this page*, and this one asks the only
question neither can: **would a student who knows nothing actually learn this?**

Nothing here is automatable, so nothing here is a script. It is a reading
protocol plus a place to write down what was decided, so that a judgement made
today still counts next month.

**The user does not remember command names. He asks for the outcome ("kijk eens
naar labo 2"), you run the protocol.**

## What this reviews, and what it deliberately does not

Four kinds of finding, and only these four. Each gets a code, because a finding
is referred to by code months later.

| Code | Finding | The student's experience |
|---|---|---|
| `BEGRIP` | A term or concept is used before, or without, being explained anywhere the student can reach. | "Wat is sinking?" |
| `SPRONG` | An exercise assumes much more than the one before it. A missing intermediate step. | "Van dit naar dat? Hoe dan?" |
| `OPDRACHT` | The assignment is ambiguous. Which pins, which behaviour, when am I done? A checklist that asks something the assignment never mentioned. | "Wat moet ik nu precies bouwen?" |
| `BEELD` | The explanation cannot be followed without a drawing, or the schematic exists only inside a video. | "Ik zie niet hoe ik dit moet aansluiten." |

**Out of scope, on purpose:**

- **Technical and factual correctness.** Whether the explanation is right about
  the hardware, whether the solution code compiles, whether the timing is
  accurate. The user reviews that himself. If the reviewing agent happens to
  doubt a fact, it may note it under a separate heading, but it is never a
  finding and never enters the ledger.
- **Everything `scripts/check-content.sh` already covers**: broken links,
  manifest entries, page wiring, hotlinked images, K&R braces, em-dashes,
  house-style drift. Run `orion-check` for that. A review finding that a
  script could have caught is a wasted finding.
- **Spelling, tone, and phrasing** unless the phrasing is what makes the
  assignment ambiguous, in which case it is an `OPDRACHT`.

## Severity

Three levels, and they mean something specific about the student:

- **blokkeert** — the student cannot continue without guessing or asking.
- **vertraagt** — the student gets there, but loses time to something the page
  could have told them.
- **detail** — a real improvement, no one is stuck.

## The shape that keeps showing up

Three rounds in, the heaviest finding has been the same shape every time: **one exercise
carrying several new ideas at once, with the theory for them somewhere else or nowhere.**
Labo 4's first exercise stacked address hunting, pull-ups, bit masking and edge detection.
Labo 1's counter exercise introduced the display, the two-dimensional array and the counter
together. Labo 0's contradictions all sat on pages a single exercise linked to for three
different things.

The fix has been the same shape too: unbundle. Split the exercise so each one adds exactly
one thing, and move the concept onto a reference page that the exercise needing it links to
*before* the student opens the solution. Labo 1's 7-segment sequence was rebuilt that way,
which is why it now has four exercises where it had three.

So when reading, ask of every exercise: *what is the one new thing here?* If the answer is
a list, that is a `SPRONG`, even when nothing on the page is wrong. And when a concept only
appears inside a solution spoiler, that is a `BEGRIP`, because the student who is trying not
to peek is exactly the one who needs it.

## Process

### 1. Pick the lab and check who is reading

One lab per pass. If the user did not name one, ask; suggest the lab most
recently added or edited (`git log --name-only -20`).

**Then check whether you wrote or converted this lab in this same session.** If
you did, say so. Your eyes are not fresh for content you just authored, and the
subagent in step 3 exists precisely to solve that. It still works, but the
finding "this is obvious" is untrustworthy coming from the author.

### 2. Build the prior-knowledge baseline

The student arriving at labo N has done labo 0 through N-1. Establish what that
means, cheaply and accurately, from the manifests rather than by re-reading the
whole course:

- [`reference.js`](../../../reference.js) — every reference topic of labo 0..N-1,
  by `name` and `blurb`. This is the list of things the student can be assumed
  to have a page for.
- [`exercises.js`](../../../exercises.js) — every exercise of labo 0..N-1, by
  `name` and `blurb`. This is what the student has actually built.

That list is the baseline. Anything the lab under review uses that is not on it,
and not explained on the page itself, is a `BEGRIP` candidate. Open an earlier
reference page only to settle a specific finding, never to read ahead.

### 3. Read with fresh eyes

Being surprised is the entire instrument, so the reading has to happen somewhere
that has not already absorbed the lab. In order of preference:

1. **A session that has not touched this lab.** If the current one has only read
   manifests and other labs, it is clean enough. Say which it is.
2. **A subagent** (`general-purpose`, `run_in_background: false`) — but only if
   the user is happy with subagents, and never for content that same agent just
   wrote. Give it the persona, the baseline from step 2, the four codes and
   severities, the reading order below and the output format, and tell it
   explicitly to **read every page in full rather than skim** and that it is
   **read-only: it must not edit any file**.
3. **A fresh Claude Code session** that opens with this skill and nothing else.
   Slower for the user, but the cleanest reader there is, and the right call
   when the lab was authored in the current session.

Whichever it is, **one reader for the whole lab**, not one per page: the reader
has to carry "what I have learned so far in this lab" from exercise to exercise,
and that carried state is what makes `SPRONG` detectable at all.

**The reader never sees the ledger.** Someone who knows which findings were
rejected before is no longer naive, and a finding resurfacing on its own is
useful signal. Reconciliation happens afterwards, in step 4.

**The reading order is the honest student path**, not the author's:

1. The lab dashboard (`LaboN/Exercises/dashboard.html`) and the exercise list
   in `exercises.js`, sorted by `order`. That is what the student sees first.
2. Each exercise in `order`, top to bottom, as a student would: try to
   understand the assignment, then imagine building it, then read the solution.
3. **Reference pages only when the exercise sends you there, or when you hit a
   term you cannot resolve.** If the student would have to guess that a
   reference page exists, that is itself the finding. Do not read the reference
   hub up front.
4. Afterwards, the reference pages of this lab that were never reached. Judge
   those standalone: is this clear on its own, and would a student ever find it?

### 4. Reconcile against the ledger

Read `review/laboN.md` if it exists (see Ledger below). For every finding the
agent returned:

- **Already `opgelost` or `aanvaard`** — drop it, unless the agent hit it again
  in a page that was supposedly fixed, in which case the fix did not land and
  that is worth saying.
- **Previously `verworpen`** — do not silently drop it, and do not re-ask it as
  if it were new. Report it as *"opnieuw opgedoken, eerder verworpen omdat ..."*.
  A naive reader tripping over the same thing twice is evidence, not noise; the
  user may want to revisit, and it is his call, not yours.
- **New** — carry it into the interview.

### 5. Interview, do not fix

Report the surviving findings grouped by severity, compactly: the page, what the
student hits, and why it stops them. Anchor each to `file:line`.

Then interview with `AskUserQuestion`, **blokkeert first, then vertraagt**, at
most four findings per call, so the user answers in short rounds rather than one
overwhelming form. Bundle the `detail` findings into a single question rather
than asking about each.

Per finding, offer **two or three concrete fixes plus "verwerpen"**, not an open
question. Concrete means the actual edit: "een zin toevoegen aan de lead die
zegt dat het een sinking-schakeling is", "een link naar
[SourcenSinken.html](../../../Labo0/Reference/SourcenSinken.html) in de opdracht",
"een schema tekenen en in `img/` zetten". A fix that needs artwork that does not
exist yet is a legitimate option: the convention for that is a `TODO-*` filename,
which `check-content.sh` reports as a warning rather than an error.

**Change nothing before the user has chosen.** The point of the pass is his
judgement, not yours.

### 6. Write the ledger, then apply what was accepted

Update `review/laboN.md` with every finding and its outcome, *including the
rejected ones with the reason* — that is what stops the next pass from
relitigating them.

Then make the accepted edits, and run `bash scripts/check-content.sh` (via
`orion-check`) before calling it done.

## The ledger

One file per lab, `review/laboN.md`, committed. Dutch, because the second author
reads it too.

```markdown
# Review labo 4 — studentbril

Laatste ronde: 2026-07-26. Gelezen: alle 5 oefeningen, 3 referentiepagina's.

## L4-01 · BEGRIP · blokkeert · open
**Pagina:** [DrukknoppenInlezen.html:31](../Labo4/Exercises/DrukknoppenInlezen.html#L31)
**Wat de student raakt:** "..."
**Status:** open
```

Rules that make it work months later:

- **The id is permanent.** `L4-01` stays `L4-01` even after it is fixed. Never
  renumber; a new finding takes the next free number.
- **Status is one of** `open`, `aanvaard` (decided, not yet edited, with what was
  decided), `opgelost` (with the date), `verworpen` (with the reason, always).
- **A rejected finding keeps its reason forever.** Without the reason the entry
  is worthless, because the next pass cannot tell a considered decision from an
  oversight.
- Findings stay in the file after they are solved. The file is the history of
  the lab's teaching quality, not a to-do list.

## Running this on more than one lab

Repeat the pass, one lab at a time, in ascending order if the goal is the whole
course. Do not batch labs into one agent: the prior-knowledge baseline differs
per lab, and an agent that has already read labo 3 cannot be naive about labo 4.

Between passes, the baseline grows on its own, because step 2 rebuilds it from
the manifests every time. Nothing to maintain.
