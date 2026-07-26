---
name: orion-check
description: Check this course repo for broken links, manifest mismatches, missing page wiring, hotlinked images, code-style violations and house-style drift, and repair what can be repaired automatically. Use whenever the user wants to verify the repo, clean up inconsistencies, review a coworker's contribution, or asks "is everything still ok", "check the repo", "fix the inconsistencies", "tidy up the pages".
---

# Check and tidy the course repo

The sibling of `orion-convert`: that one writes a page, this one verifies the
whole repo. Everything here is [`scripts/check-content.sh`](../../../scripts/check-content.sh),
which is the single source of truth for what "correct" means in this repo. Do
not reimplement its rules or grep for them by hand.

**The user does not remember these commands and does not need to. That is
what this skill is for: he asks for the outcome, you pick the mode.** Never
answer with only "run this command"; run it and act on what it says.

## The three modes

| Mode | Command | Effect |
|---|---|---|
| Verify | `bash scripts/check-content.sh` | Reports breakage. Exit 1 if anything is wrong. |
| Repair | `bash scripts/check-content.sh --fix` | Fixes the mechanical violations first, then reports the rest. Rewrites files. |
| Tidy | `bash scripts/check-content.sh --audit` | Adds an advisory house-style pass. Never fails. |

Modes combine: `--fix --audit` repairs and then reports everything, which is
the right call for "clean up this repo".

## Process

1. **Run the plain check first**, always, whatever the user asked. It is fast
   (about 2 seconds) and it tells you which of the modes below is worth using.
2. **If it reports breakage**, offer or apply `--fix`. It repairs em-dashes,
   K&R braces that end a line, a missing `referrerpolicy`, an init call naming
   the wrong lab, a manifest `href` with the wrong casing, and assets that
   exist but were never staged. It needs a clean working tree (`--force`
   overrides), so commit or stash first, and show the resulting `git diff`
   rather than just claiming success.
3. **Fix the rest by hand.** What `--fix` deliberately leaves: a missing
   `blurb`/`difficulty`/`time` (needs the user's words), an unregistered page
   (needs a decision about `order` and lab), a remote image (download it into
   `img/`, name it descriptively, `git add` it, repoint the `src`).
4. **Run `--audit` when tidying**, not on every task. It reports house-style
   drift: code blocks that are not `language-cpp linenumbers show-language`, a
   page without a `lead`, an image outside a `figure`, an exercise without an
   `indienen` or `oplossing` section, a `checklistDriven` flag disagreeing with
   the page's markup.
5. **Before silencing an audit finding, check whether the page is right and
   the rule is wrong.** A genuinely different page type records the deviation
   in the page itself with `<!-- audit-skip: <rule> -->` plus a comment saying
   why (see `Labo0/Exercises/BegeleideOefening.html`, a guided walkthrough
   whose solutions sit inline per step). Never add a marker just to make a
   finding go away.
6. **Report in plain language**: what was broken, what you repaired, what is
   left and why it needs a human. Do not paste raw script output as the
   answer.

## What already runs without anyone asking

Say this when the user worries about forgetting: the plain check runs
automatically as a blocking `Stop` hook at the end of every Claude Code
session, and in GitHub Actions on every push and pull request. Only `--fix`
and `--audit` are manual, which is what this skill exists to cover.

## Reviewing a coworker's contribution

This repo has a second author who edits by hand, without Claude Code. For
"look at what he pushed": `git pull`, run the plain check, then `--fix`,
review the diff, then `--audit` for the stylistic leftovers. His guide is
[`CONTRIBUTING.md`](../../../CONTRIBUTING.md), in Dutch. Rules live in
[`CLAUDE.md`](../../../CLAUDE.md); when one changes, update the script,
CLAUDE.md and CONTRIBUTING.md together.
