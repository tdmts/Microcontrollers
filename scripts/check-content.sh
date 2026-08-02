#!/usr/bin/env bash
# check-content.sh - the single "is this repo publishable" check.
#
# Replaces the old check-style.sh (its two style rules are section 5 below).
# Everything here targets a failure mode that is SILENT in the browser: a
# broken relative path, a manifest entry that no longer matches a filename,
# a page that forgot a script tag. None of these throw a visible error, they
# just quietly stop working for students.
#
# Sections:
#   1. Local links and assets resolve (and are tracked by git, exact case).
#   2. Manifest <-> filesystem consistency (exercises.js, reference.js).
#   3. Page wiring (Orion CDN, nav/checklist/solution/dashboard/hub script sets).
#   4. Asset hygiene (no Brightspace hotlinks, no remote images, no remote
#      documents, YouTube embeds carry referrerpolicy).
#   5. Code style (Allman braces, no em-dashes).
#   6. Exercise names say what the student builds, not "Gevorderde oefening 2".
#
# Placeholder assets named "TODO-*" are reported as warnings, never errors,
# so planned-but-missing artwork does not block a commit.
#
# Performance note: spawning a process is expensive under Git Bash on Windows,
# so this script runs ONE grep per rule over the whole file list and does all
# per-file work with bash string operations. Keep it that way: a grep inside a
# per-file loop pushed an earlier version to 48s, past the Stop hook timeout.
#
# Usage:
#   bash scripts/check-content.sh          # human mode: findings + summary,
#                                          # exit 1 on errors, 0 when clean.
#   bash scripts/check-content.sh --hook   # hook mode: errors to stderr,
#                                          # exit 2 on errors (blocks Stop),
#                                          # silent + 0 when clean.
#   bash scripts/check-content.sh --audit  # also report house-style drift
#                                          # (code block classes, missing
#                                          # lead, unwrapped images, missing
#                                          # sections, checklistDriven vs
#                                          # markup). Advisory: it never
#                                          # changes the exit code, and it
#                                          # cannot be combined with --hook.
#   bash scripts/check-content.sh --compile
#                                          # hand every complete sketch on the
#                                          # pages to the real Arduino compiler
#                                          # and report errors and warnings.
#                                          # Needs arduino-cli plus the
#                                          # arduino:avr core; says so and
#                                          # carries on when they are missing.
#                                          # Takes minutes, so it is opt-in and
#                                          # cannot be combined with --hook.
#   bash scripts/check-content.sh --fix    # repair the mechanical violations
#                                          # first, then report the rest.
#                                          # Wants a clean tree so "git diff"
#                                          # shows exactly what it changed;
#                                          # add --force to override. Cannot
#                                          # be combined with --hook.
#
# What --fix repairs: em-dashes, K&R braces that end a line, a missing
# referrerpolicy, an init call naming the wrong lab, a manifest href with the
# wrong casing or written as a full Pages URL, and assets that exist but were
# never staged. What it leaves
# alone: anything needing words (a missing blurb) or a decision (which lab an
# orphan page belongs to, what to call a downloaded image).
set -uo pipefail

cd "$(dirname "$0")/.." || exit 2

HOOK_MODE=0
FIX_MODE=0
FORCE=0
AUDIT=0
COMPILE=0
for arg in "$@"; do
  case "$arg" in
    --hook)    HOOK_MODE=1 ;;
    --fix)     FIX_MODE=1 ;;
    --force)   FORCE=1 ;;
    --audit)   AUDIT=1 ;;
    --compile) COMPILE=1 ;;
    *) echo "check-content: unknown option '$arg'" >&2; exit 2 ;;
  esac
done

if [ "$AUDIT" -eq 1 ] && [ "$HOOK_MODE" -eq 1 ]; then
  echo "check-content: --audit is advisory and cannot be combined with --hook" >&2
  exit 2
fi

# Compiling every sketch takes minutes. Doing that at session end, on every
# stop, would make the hook unusable.
if [ "$COMPILE" -eq 1 ] && [ "$HOOK_MODE" -eq 1 ]; then
  echo "check-content: --compile takes minutes and cannot be combined with --hook" >&2
  exit 2
fi

# Never repair from the hook: that would rewrite files at session end without
# anyone looking at the diff.
if [ "$FIX_MODE" -eq 1 ] && [ "$HOOK_MODE" -eq 1 ]; then
  echo "check-content: --fix cannot be combined with --hook" >&2
  exit 2
fi

# Pages that deliberately break the rules below:
#   template.html     - the styleguide reference. Links a LOCAL orion.css and a
#                       qrcode.js that do not exist in this repo, shows the
#                       checklist markup without wiring it to an exercise, and
#                       uses placehold.co demo images.
#   pasteInOrion.html - the Orion iframe wrapper. Not an Orion-styled page.
EXEMPT_PAGES=" template.html pasteInOrion.html "

# The GitHub Pages base URL. A manifest href may never start with it: the
# dashboard renders the href verbatim, so an absolute card link throws a local
# preview onto the live site on the first click. exercises.js used to be written
# this way, hence the repair in --fix.
PAGES_BASE="https://tdmts.github.io/Microcontrollers/"

# Manifest values are single-quoted today, but accept either quote style so a
# stray double quote cannot make an entry invisible to the parser below.
Q="[\"']"
NOTQ="[^\"']"

errors=""
warnings=""
err()  { errors+="  $1"$'\n'; }
warn() { warnings+="  $1"$'\n'; }
# Drain $errors into $TAKEN. A command substitution would run in a subshell
# and lose the reset, so this hands the value over through a global.
take() { TAKEN="$errors"; errors=""; }
TAKEN=""

# ---------------------------------------------------------------- inventory

HAVE_GIT=0
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  HAVE_GIT=1
  mapfile -t files < <(git ls-files '*.html')
else
  mapfile -t files < <(find . -name '*.html' -not -path '*/node_modules/*' | sed 's|^\./||')
fi

if [ "${#files[@]}" -eq 0 ]; then
  [ "$HOOK_MODE" -eq 1 ] || echo "check-content: no .html files found"
  exit 0
fi

# Real course pages only. Sections 1, 3 and 4 skip the exempt pages; section 5
# still checks every file, because the styleguide code samples set the house
# style for everything copied out of them.
checked=()
for f in "${files[@]}"; do
  [[ "$EXEMPT_PAGES" == *" ${f##*/} "* ]] || checked+=("$f")
done

# Every path git knows about, for exact-case + tracked lookups. GitHub Pages
# serves only tracked files and is case-sensitive; Windows is neither, so a
# case typo or an uncommitted image works locally and 404s in production.
declare -A TRACKED=()
declare -A TRACKED_LC=()
if [ "$HAVE_GIT" -eq 1 ]; then
  while IFS= read -r p; do
    TRACKED["$p"]=1
    TRACKED_LC["${p,,}"]="$p"
  done < <(git ls-files)
fi

# Collapse "a/b/../c" and "./" into a clean repo-relative path, into $NP.
# Sets a global rather than printing: a command substitution here would fork
# once per link, which is the slow path on Windows.
NP=""
norm_path() {
  local seg out=() s
  local IFS='/'
  read -ra seg <<< "$1"
  for s in "${seg[@]}"; do
    case "$s" in
      ''|'.') ;;
      '..') [ "${#out[@]}" -gt 0 ] && unset 'out[-1]' ;;
      *) out+=("$s") ;;
    esac
  done
  NP="${out[*]:-}"
}

# Classify a repo-relative path into $CT: ok | placeholder | untracked |
# case:<real path> | missing. Also fork-free, same reason.
CT=""
classify_target() {
  local t="$1" actual
  case "${t##*/}" in
    TODO-*) CT='placeholder'; return ;;
  esac
  if [ "$HAVE_GIT" -eq 1 ]; then
    [ -n "${TRACKED[$t]:-}" ] && { CT='ok'; return; }
    actual="${TRACKED_LC[${t,,}]:-}"
    [ -n "$actual" ] && { CT="case:$actual"; return; }
    [ -e "$t" ] && { CT='untracked'; return; }
    CT='missing'; return
  fi
  [ -e "$t" ] && CT='ok' || CT='missing'
}

# One grep for the whole file list; fills an associative array with the files
# that matched. $1 = array name, $2 = extended regex.
mark() {
  local -n _arr="$1"
  local p
  while IFS= read -r p; do
    [ -n "$p" ] && _arr["$p"]=1
  done < <(grep -lE "$2" "${checked[@]}" 2>/dev/null)
}

# ------------------------------------------------------------ fix mode
#
# Repairs only the violations with exactly one correct answer. Anything
# needing a human sentence (a missing blurb) or a judgement call (which page
# an orphan belongs to, what an image should be called) is left to the report
# below. Runs before the checks, so the report shows what is still wrong.

FIXED=""
fixed() { FIXED+="  $1"$'\n'; }

# Run a rewrite over one file and record it only if the file actually changed.
rewrite() {
  local f="$1" label="$2"; shift 2
  local tmp
  tmp="$(mktemp)" || return 0
  cp "$f" "$tmp"
  "$@" "$f"
  cmp -s "$tmp" "$f" || fixed "$f: $label"
  rm -f "$tmp"
}

do_fix() {
  local f hit call want have mf sub href target new_href key

  # Em-dash to comma. The check bans them outright, and a comma is the
  # substitution that always reads correctly in Dutch; a colon or "en"/"maar"
  # may read better, which is why the diff is meant to be reviewed.
  while IFS= read -r f; do
    # [ \t] rather than \s again: a greedy \s* would swallow the line break
    # when an em-dash sits at the end of a line and join the paragraph.
    [ -n "$f" ] && rewrite "$f" "em-dash -> comma" \
      perl -pi -e 's/[ \t]*(?:&mdash;|—)[ \t]*/, /g'
  done < <(grep -lE '&mdash;|—' "${checked[@]}" 2>/dev/null)

  # K&R to Allman, but only where the brace ends the line. A collapsed body
  # like "if (x) { doe(); }" needs a human to decide where the lines break.
  while IFS= read -r f; do
    # Trailing whitespace is matched as [ \t] rather than \s: a greedy \s*$
    # eats the newline itself, which glues the following statement onto the
    # new brace line. The \r is captured and re-emitted on both lines, since
    # a Windows working copy has CRLF endings and dropping one would leave
    # the file mixed.
    [ -n "$f" ] && rewrite "$f" "Allman braces" \
      perl -pi -e 's/^([ \t]*)(\S.*?)[ \t]*\{[ \t]*(\r?)$/$1$2$3\n$1\{$3/ if /(\)|\belse\b|\bdo\b)[ \t]*\{[ \t]*\r?$/'
  done < <(grep -lE '\) ?\{|\belse ?\{|\bdo ?\{' "${checked[@]}" 2>/dev/null)

  # referrerpolicy on YouTube embeds that lack it.
  while IFS= read -r f; do
    [ -n "$f" ] && rewrite "$f" "referrerpolicy on YouTube embed" \
      perl -pi -e 'if (m{youtube(?:-nocookie)?\.com/embed} && !/referrerpolicy/) { s/\s*allowfullscreen/ referrerpolicy="strict-origin-when-cross-origin" allowfullscreen/ or s{></iframe>}{ referrerpolicy="strict-origin-when-cross-origin"></iframe>} }'
  done < <(grep -lE 'youtube(-nocookie)?\.com/embed' "${checked[@]}" 2>/dev/null)

  # An init call naming a different lab than the folder it sits in.
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"; call="${hit#*:}"
    [[ "$f" =~ ^Labo([0-9]+)/ ]] || continue
    want="labo${BASH_REMATCH[1]}"
    [[ "$call" =~ (labo[0-9]+) ]] || continue
    have="${BASH_REMATCH[1]}"
    [ "$have" = "$want" ] && continue
    rewrite "$f" "init call -> $want" \
      sed -i "s/LAB_EXERCISES\.$have/LAB_EXERCISES.$want/g; s/initReferenceHub('$have')/initReferenceHub('$want')/g; s/initReferenceHub(\"$have\")/initReferenceHub(\"$want\")/g"
  done < <(grep -oHE "init(ChecklistSync|Dashboard)\(LAB_EXERCISES\.labo[0-9]+\)|initReferenceHub\([\"']labo[0-9]+[\"']\)" "${checked[@]}" 2>/dev/null)

  # A reference topic that never loads reference.js. back-link.js reads the
  # topic order out of it to build the forward link, and the tag always goes in
  # exactly one place, right above back-link.js, with the same relative prefix.
  for f in "${checked[@]}"; do
    case "$f" in Labo*/Reference/*) ;; *) continue ;; esac
    [ "${f##*/}" = "reference.html" ] && continue
    grep -qE 'src="[^"]*reference\.js"' "$f" && continue
    # Slurped, so s/// without /g hits the first back-link.js tag only. The line
    # ending is captured and re-emitted rather than assumed, so a CRLF working
    # copy does not end up with one stray LF line.
    rewrite "$f" "reference.js include" \
      perl -0777 -pi -e 's{([ \t]*)(<script src="([^"]*)back-link\.js"></script>)(\r?\n)}{$1<script src="$3reference.js"></script>$4$1$2$4}'
  done

  # An exercises.js href written as a full Pages URL. The dashboard prints the
  # href straight into the card, so every click in a local preview leaves for
  # the live site. The bare filename works in both places; run before the
  # casing repair below, which expects that form.
  if [ -f exercises.js ] && grep -q "href: '$PAGES_BASE" exercises.js; then
    rewrite exercises.js "Pages URLs -> bare filenames" \
      sed -i -E "s@href: '${PAGES_BASE}Labo[0-9]+/Exercises/@href: '@g"
  fi

  # A manifest href whose casing does not match the file on disk.
  for mf in exercises.js reference.js; do
    [ -f "$mf" ] || continue
    case "$mf" in exercises.js) sub="exercises" ;; *) sub="reference" ;; esac
    while IFS= read -r href; do
      [ -z "$href" ] && continue
      href="${href#*\'}"; href="${href%\'}"
      case "$href" in
        http*|/*) continue ;;
      esac
      # A manifest href is a bare filename, so find which lab owns it. Matched
      # through the tracked-path map rather than with -e, which would be
      # case-blind on Windows and case-strict on the CI runner. Only the folder
      # comes from that lookup: the filename keeps the manifest's own spelling,
      # or classify_target below would be handed the tracked path it is meant
      # to compare against and report every href as correct.
      target=""
      for key in "${!TRACKED_LC[@]}"; do
        case "$key" in
          labo*/"$sub"/"${href,,}") target="${TRACKED_LC[$key]%/*}/$href"; break ;;
        esac
      done
      [ -n "$target" ] || continue
      classify_target "$target"
      case "$CT" in
        case:*)
          new_href="${CT##*/}"
          rewrite "$mf" "href case -> ${CT#case:}" sed -i "s|$href|$new_href|g"
          ;;
      esac
    done < <(grep -oE "href: '[^']+'" "$mf" 2>/dev/null)
  done

  # Assets a page references that exist on disk but were never staged.
  local -a to_stage=()
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"; href="${hit#*:}"
    href="${href#*\"}"; href="${href%\"}"
    case "$href" in
      http:*|https:*|//*|'#'*|mailto:*|tel:*|data:*|javascript:*) continue ;;
    esac
    href="${href%%#*}"; href="${href%%\?*}"
    [ -z "$href" ] && continue
    if [[ "$f" == */* ]]; then target="${f%/*}"; else target="."; fi
    norm_path "$target/$href"
    classify_target "$NP"
    [ "$CT" = "untracked" ] && to_stage+=("$NP")
  done < <(grep -oHE '(href|src)="[^"]*"' "${checked[@]}" 2>/dev/null)
  if [ "${#to_stage[@]}" -gt 0 ] && [ "$HAVE_GIT" -eq 1 ]; then
    git add -- "${to_stage[@]}" 2>/dev/null && for target in "${to_stage[@]}"; do
      fixed "$target: staged (was untracked)"
    done
  fi
}

if [ "$FIX_MODE" -eq 1 ]; then
  # --fix rewrites files in place. A clean tree keeps "git diff" a readable
  # record of exactly what it changed.
  # Untracked files do not count as dirty: staging them is one of the repairs.
  if [ "$HAVE_GIT" -eq 1 ] && [ "$FORCE" -eq 0 ] && [ -n "$(git status --porcelain --untracked-files=no)" ]; then
    echo "check-content: --fix rewrites files, so it wants a clean tree to keep 'git diff' reviewable." >&2
    echo "               Commit or stash your changes first, or re-run with --force." >&2
    exit 2
  fi
  do_fix
  # Staging changed what git tracks, so rebuild the lookup before checking.
  if [ "$HAVE_GIT" -eq 1 ]; then
    TRACKED=(); TRACKED_LC=()
    while IFS= read -r p; do
      TRACKED["$p"]=1
      TRACKED_LC["${p,,}"]="$p"
    done < <(git ls-files)
  fi
fi

# ------------------------------------- 1. local links and assets resolve

while IFS= read -r hit; do
  [ -z "$hit" ] && continue
  f="${hit%%:*}"; ref="${hit#*:}"
  ref="${ref#*\"}"; ref="${ref%\"}"
  case "$ref" in
    http:*|https:*|//*|'#'*|mailto:*|tel:*|data:*|javascript:*) continue ;;
  esac
  ref="${ref%%#*}"; ref="${ref%%\?*}"
  [ -z "$ref" ] && continue
  if [[ "$f" == */* ]]; then dir="${f%/*}"; else dir="."; fi
  norm_path "$dir/$ref"
  classify_target "$NP"
  case "$CT" in
    ok) ;;
    placeholder) warn "$f -> $ref (placeholder asset, not added yet)" ;;
    untracked)   err "$f -> $ref (exists locally but is NOT tracked by git, will 404 on Pages)" ;;
    case:*)      err "$f -> $ref (wrong case, the tracked file is ${CT#case:})" ;;
    missing)     err "$f -> $ref (no such file)" ;;
  esac
done < <(grep -oHE '(href|src)="[^"]*"' "${checked[@]}" 2>/dev/null)
take; link_errs="$TAKEN"

# ------------------------------- 2. manifest <-> filesystem consistency

declare -A MANIFEST_PAGES=()
declare -A EX_LABS=()
declare -A REF_LABS=()
declare -A DRIVEN=()   # pages the manifest marks checklistDriven, for --audit

# A dashboard card renders blank rather than erroring when a field is absent,
# so every field the engines read is required. checklistDriven is deliberately
# optional: the dashboard falls back to a manual toggle without it.
EX_FIELDS="name difficulty time blurb"
REF_FIELDS="name blurb"

# Report any of $2 (space separated) that $1 does not set to a non-empty value.
require_fields() {
  local line="$1" want="$2" where="$3" field
  for field in $want; do
    if [[ "$line" =~ (^|[^A-Za-z])$field:[[:space:]]*$Q($NOTQ*)$Q ]]; then
      [ -n "${BASH_REMATCH[2]}" ] || err "$where has an empty $field"
    elif [[ "$line" =~ (^|[^A-Za-z])$field:[[:space:]]*([0-9]+) ]]; then
      : # numeric field, e.g. difficulty
    else
      err "$where is missing $field"
    fi
  done
}

# exercises.js: one entry per line, hrefs are bare filenames inside
# LaboN/Exercises/ (same rule as reference.js, and the same reason: the
# dashboard card and the checklist page both sit in that folder).
if [ -f exercises.js ]; then
  lab=""
  declare -A seen_id=() seen_order=()
  while IFS= read -r line; do
    if [[ "$line" =~ ^[[:space:]]*(labo[0-9]+):[[:space:]]*\{ ]]; then
      lab="${BASH_REMATCH[1]}"
      EX_LABS["$lab"]=1
      continue
    fi
    [ -z "$lab" ] && continue
    if [[ "$line" =~ labId:[[:space:]]*$Q($NOTQ+)$Q ]] && [ "${BASH_REMATCH[1]}" != "$lab" ]; then
      err "exercises.js: block '$lab' has labId '${BASH_REMATCH[1]}' (must match the key)"
    fi
    [[ "$line" =~ (^|[^b])id:[[:space:]]*$Q($NOTQ+)$Q ]] && id="${BASH_REMATCH[2]}" || continue
    [[ "$line" =~ href:[[:space:]]*$Q($NOTQ+)$Q ]] && href="${BASH_REMATCH[1]}" || continue
    order=""
    [[ "$line" =~ order:[[:space:]]*([0-9]+) ]] && order="${BASH_REMATCH[1]}"

    [ -n "${seen_id[$lab/$id]:-}" ] && err "exercises.js: $lab has duplicate id '$id'"
    seen_id["$lab/$id"]=1
    require_fields "$line" "$EX_FIELDS" "exercises.js: $lab/$id"
    # dashboard.js maps DIFFICULTY_LABELS for 1..3 only. Any other value leaves
    # diffLabel empty, and the card then drops the whole pepper badge instead of
    # erroring: the same silent-blank-card failure as a missing field.
    if [[ "$line" =~ difficulty:[[:space:]]*([0-9]+) ]]; then
      diff_val="${BASH_REMATCH[1]}"
      if [ "$diff_val" -lt 1 ] || [ "$diff_val" -gt 3 ]; then
        err "exercises.js: $lab/$id has difficulty $diff_val (dashboard.js renders 1-3; anything else hides the badge)"
      fi
    fi
    if [ -z "$order" ]; then
      err "exercises.js: $lab/$id has no order (the dashboard sorts on it)"
    else
      [ -n "${seen_order[$lab/$order]:-}" ] && err "exercises.js: $lab reuses order $order (ids '${seen_order[$lab/$order]}' and '$id')"
      seen_order["$lab/$order"]="$id"
    fi

    labdir="Labo${lab#labo}"
    case "$href" in
      "$PAGES_BASE"*) err "exercises.js: $lab/$id href is a full Pages URL ($href); the dashboard renders it verbatim, so a local preview jumps to the live site. Use the bare filename."; continue ;;
      http*|/*) err "exercises.js: $lab/$id href points outside the site ($href)"; continue ;;
    esac
    norm_path "$labdir/Exercises/$href"
    target="$NP"
    MANIFEST_PAGES["$target"]=1
    [[ "$line" == *"checklistDriven: true"* ]] && DRIVEN["$target"]=1

    case "$target" in
      "$labdir"/Exercises/*) ;;
      *) err "exercises.js: $lab/$id href reaches out to $target instead of staying in $labdir/Exercises/" ;;
    esac

    classify_target "$target"
    case "$CT" in
      ok|placeholder) ;;
      case:*)    err "exercises.js: $lab/$id href has wrong case, the tracked file is ${CT#case:}" ;;
      untracked) err "exercises.js: $lab/$id href '$target' is not tracked by git" ;;
      missing)   err "exercises.js: $lab/$id href '$target' does not exist (checklist sync silently no-ops)" ;;
    esac
  done < exercises.js
fi

# reference.js: hrefs are bare filenames inside LaboN/Reference/.
if [ -f reference.js ]; then
  lab=""
  declare -A seen_ref=()
  while IFS= read -r line; do
    if [[ "$line" =~ ^[[:space:]]*(labo[0-9]+):[[:space:]]*\{ ]]; then
      lab="${BASH_REMATCH[1]}"
      REF_LABS["$lab"]=1
      continue
    fi
    [ -z "$lab" ] && continue
    if [[ "$line" =~ labId:[[:space:]]*$Q($NOTQ+)$Q ]] && [ "${BASH_REMATCH[1]}" != "$lab" ]; then
      err "reference.js: block '$lab' has labId '${BASH_REMATCH[1]}' (must match the key)"
    fi
    [[ "$line" =~ (^|[^b])id:[[:space:]]*$Q($NOTQ+)$Q ]] && id="${BASH_REMATCH[2]}" || continue
    [[ "$line" =~ href:[[:space:]]*$Q($NOTQ+)$Q ]] && href="${BASH_REMATCH[1]}" || continue

    # A topic id is a localStorage key as well as a manifest key: back-link.js
    # writes msDashboard:$lab:theory:$id when the page is opened. Two topics
    # sharing an id would share one "gelezen" tick, silently.
    [ -n "${seen_ref[$lab/$id]:-}" ] && err "reference.js: $lab has duplicate id '$id'"
    seen_ref["$lab/$id"]=1
    require_fields "$line" "$REF_FIELDS" "reference.js: $lab/$id"

    labdir="Labo${lab#labo}"
    norm_path "$labdir/Reference/$href"
    target="$NP"
    MANIFEST_PAGES["$target"]=1
    classify_target "$target"
    case "$CT" in
      ok|placeholder) ;;
      case:*)    err "reference.js: $lab/$id href has wrong case, the tracked file is ${CT#case:}" ;;
      untracked) err "reference.js: $lab/$id href '$target' is not tracked by git" ;;
      missing)   err "reference.js: $lab/$id href '$target' does not exist" ;;
    esac
  done < reference.js
fi

# Orphans: a page nobody lists earns no XP and is unreachable from the hub.
for f in "${files[@]}"; do
  base="${f##*/}"
  case "$f" in
    Labo*/Exercises/*)
      [ "$base" = "dashboard.html" ] && continue
      [ -n "${MANIFEST_PAGES[$f]:-}" ] || err "$f is not listed in exercises.js (no XP, unreachable from the dashboard)"
      ;;
    Labo*/Reference/*)
      [ "$base" = "reference.html" ] && continue
      [ -n "${MANIFEST_PAGES[$f]:-}" ] || err "$f is not listed in reference.js (unreachable from the reference hub)"
      ;;
  esac
done
take; manifest_errs="$TAKEN"

# ------------------------------------------------------- 3. page wiring

declare -A HAS_CSS=() HAS_JS=() HAS_CHECKLIST=() HAS_BACKLINK=() HAS_EXERCISES=()
declare -A HAS_SYNC=() HAS_SOLUTION=() HAS_REVEAL=() HAS_DASHJS=() HAS_HUBJS=()
declare -A HAS_REFJS=()
mark HAS_CSS       'OrionContent/orion\.css'
mark HAS_JS        'OrionContent/orion\.js'
mark HAS_CHECKLIST 'class="checklist"'
mark HAS_BACKLINK  'back-link\.js'
mark HAS_EXERCISES 'exercises\.js'
mark HAS_SYNC      'checklist-sync\.js'
mark HAS_SOLUTION  'solution-container'
mark HAS_REVEAL    'solution-reveal\.js'
mark HAS_DASHJS    'src="[^"]*dashboard\.js"'
mark HAS_HUBJS     'reference-dashboard\.js'
# Anchored on src="..." so reference-dashboard.js does not count as the manifest.
mark HAS_REFJS     'src="[^"]*reference\.js"'

# Which lab each init call names, so a copy-pasted page pointing at the wrong
# lab manifest is caught (it would silently track progress under the wrong key).
declare -A INIT_SYNC=() INIT_DASH=() INIT_HUB=()
while IFS= read -r hit; do
  [ -z "$hit" ] && continue
  f="${hit%%:*}"; call="${hit#*:}"
  [[ "$call" =~ (labo[0-9]+) ]] || continue
  case "$call" in
    initChecklistSync*) INIT_SYNC["$f"]="${BASH_REMATCH[1]}" ;;
    initDashboard*)     INIT_DASH["$f"]="${BASH_REMATCH[1]}" ;;
    initReferenceHub*)  INIT_HUB["$f"]="${BASH_REMATCH[1]}" ;;
  esac
done < <(grep -oHE "init(ChecklistSync|Dashboard)\(LAB_EXERCISES\.labo[0-9]+\)|initReferenceHub\([\"']labo[0-9]+[\"']\)" "${checked[@]}" 2>/dev/null)

for f in "${checked[@]}"; do
  base="${f##*/}"
  lab=""
  [[ "$f" =~ ^Labo([0-9]+)/ ]] && lab="labo${BASH_REMATCH[1]}"

  [ -n "${HAS_CSS[$f]:-}" ] || err "$f does not link the hosted orion.css"
  [ -n "${HAS_JS[$f]:-}" ]  || err "$f does not link the hosted orion.js"

  # A brand new lab whose pages reference a manifest block nobody added yet:
  # the engines read undefined and render an empty page, with no error.
  if [ -n "$lab" ]; then
    case "$f" in
      Labo*/Exercises/*)
        [ -n "${EX_LABS[$lab]:-}" ] || err "$f belongs to $lab, which has no block in exercises.js yet"
        ;;
      Labo*/Reference/*)
        [ -n "${REF_LABS[$lab]:-}" ] || err "$f belongs to $lab, which has no block in reference.js yet"
        ;;
    esac
  fi

  # back-link.js renders both the way back and the way forward, and it reads the
  # order out of the lab's manifest. Drop that manifest and the page still looks
  # perfect, only the "volgende" link quietly disappears: the same silent failure
  # as a mismatched manifest basename, so it gets the same treatment.
  case "$f" in
    Labo*/Exercises/*)
      if [ "$base" != "dashboard.html" ]; then
        [ -n "${HAS_BACKLINK[$f]:-}" ]  || err "$f is an exercise but is missing back-link.js"
        [ -n "${HAS_EXERCISES[$f]:-}" ] || err "$f is an exercise but is missing exercises.js (back-link.js needs it for the forward link, which otherwise vanishes silently)"
      fi
      ;;
    Labo*/Reference/*)
      if [ "$base" != "reference.html" ]; then
        [ -n "${HAS_BACKLINK[$f]:-}" ] || err "$f is a reference topic but is missing back-link.js"
        [ -n "${HAS_REFJS[$f]:-}" ]    || err "$f is a reference topic but is missing reference.js (back-link.js needs it for the forward link, which otherwise vanishes silently)"
      fi
      ;;
  esac

  if [ -n "${HAS_CHECKLIST[$f]:-}" ]; then
    [ -n "${HAS_BACKLINK[$f]:-}" ]  || err "$f has a checklist but is missing back-link.js"
    [ -n "${HAS_EXERCISES[$f]:-}" ] || err "$f has a checklist but is missing exercises.js"
    [ -n "${HAS_SYNC[$f]:-}" ]      || err "$f has a checklist but is missing checklist-sync.js"
    if [ -n "$lab" ]; then
      case "${INIT_SYNC[$f]:-}" in
        "$lab") ;;
        '') err "$f has a checklist but never calls initChecklistSync(LAB_EXERCISES.$lab)" ;;
        *)  err "$f is in $lab but calls initChecklistSync(LAB_EXERCISES.${INIT_SYNC[$f]})" ;;
      esac
    fi
  fi

  if [ -n "${HAS_SOLUTION[$f]:-}" ] && [ -z "${HAS_REVEAL[$f]:-}" ]; then
    err "$f has a solution-container but is missing solution-reveal.js"
  fi

  if [ "$base" = "dashboard.html" ] && [ -n "$lab" ]; then
    [ -n "${HAS_DASHJS[$f]:-}" ] || err "$f is missing dashboard.js"
    case "${INIT_DASH[$f]:-}" in
      "$lab") ;;
      '') err "$f never calls initDashboard(LAB_EXERCISES.$lab)" ;;
      *)  err "$f is in $lab but calls initDashboard(LAB_EXERCISES.${INIT_DASH[$f]})" ;;
    esac
  fi

  if [ "$base" = "reference.html" ] && [ -n "$lab" ]; then
    [ -n "${HAS_HUBJS[$f]:-}" ] || err "$f is missing reference-dashboard.js"
    [ -n "${HAS_REFJS[$f]:-}" ] || err "$f is missing reference.js (the hub renders empty without it)"
    case "${INIT_HUB[$f]:-}" in
      "$lab") ;;
      '') err "$f never calls initReferenceHub('$lab')" ;;
      *)  err "$f is in $lab but calls initReferenceHub('${INIT_HUB[$f]}')" ;;
    esac
  fi
done
take; wiring_errs="$TAKEN"

# ------------------------------------------- style audit (--audit only)
#
# House conventions rather than breakage: a page that trips these still works
# perfectly, it just doesn't look like its neighbours. Advisory by design, so
# it never fails CI and never blocks your coworker over a stylistic call. Run
# it when you feel like tidying, not on every push.

audit_notes=""
note() { audit_notes+="  $1"$'\n'; }

if [ "$AUDIT" -eq 1 ]; then
  # A page can record that a deviation is deliberate:
  #     <!-- audit-skip: oplossing -->
  #     <!-- audit-skip: lead, figure -->
  # The deviation is then listed as skipped rather than as a finding, so the
  # decision lives in the file that deviates and the audit output can reach
  # zero. An audit nobody can silence is an audit nobody reads.
  VALID_SKIPS=" lead figure indienen oplossing code-class checklist-driven lead-opener u-vorm verkleinwoord noord-nederlands vulwoord led-spelling identifier-taal "
  declare -A SKIP=()
  skip_notes=""
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"; body="${hit#*:}"
    body="${body#*audit-skip:}"; body="${body%%-->*}"; body="${body//,/ }"
    for rule in $body; do
      if [[ "$VALID_SKIPS" == *" $rule "* ]]; then
        SKIP["$f:$rule"]=1
        skip_notes+="  $f ($rule)"$'\n'
      else
        # A typo here would silently disable nothing, which is exactly the
        # kind of quiet no-op this whole script exists to prevent.
        note "$f: unknown audit-skip rule '$rule' (valid:$VALID_SKIPS)"
      fi
    done
  done < <(grep -oHE '<!--[[:space:]]*audit-skip:[^>]*-->' "${checked[@]}" 2>/dev/null)

  skipped() { [ -n "${SKIP[$1:$2]:-}" ]; }

  declare -A HAS_LEAD=() HAS_INDIENEN=() HAS_OPLOSSING=() HAS_STD_INDIENEN=()
  mark HAS_LEAD      'class="lead"'
  mark HAS_INDIENEN  '<h2[^>]*id="indienen"'
  mark HAS_OPLOSSING '<h2[^>]*id="oplossing"'
  # The Indienen block is fixed boilerplate. A hosted page is not the dropbox,
  # so the only thing it can honestly tell a student is to save their work;
  # anything about handing in belongs to the Brightspace assignment. Imported
  # content carries that wording over, and per-page rewordings of one sentence
  # are pure drift.
  mark HAS_STD_INDIENEN '<p>Sla je oefening op\.</p>'

  # Every code block is language-cpp with line numbers and the language badge,
  # everywhere, so blocks read the same on a theory page and in a solution.
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"; cls="${hit#*:}"
    skipped "$f" code-class && continue
    cls="${cls#class=\"}"; cls="${cls%\"}"
    case "$cls" in
      *language-cpp*) ;;
      *) note "$f: code block is '$cls' (house style is language-cpp)"; continue ;;
    esac
    [[ "$cls" == *linenumbers* ]]   || note "$f: code block without linenumbers"
    [[ "$cls" == *show-language* ]] || note "$f: code block without show-language"
  done < <(grep -oHE 'class="code-wrapper[^"]*"' "${checked[@]}" 2>/dev/null)

  # The four rules out of SCHRIJFSTIJL.md's thirteen patterns that a grep can
  # see: 9, 11, 12 and 13 below. The other nine (a closing punchline, a
  # rhetorical tricolon, a colon announcing a pointe) need a reader, which is
  # exactly why these four are advisory: a style pass that blocks on the
  # mechanical third would give the rest an authority they never earned. The
  # u-vorm and the led spelling that follow are not patterns at all, but they
  # are greppable and they live in the same document.

  # Patroon 9: the lead announcing itself on a stock formula. Any single one of
  # these is fine; the tell is that they are all the same one, so every lead
  # telegraphs the next. Matched over the whole line rather than the first text
  # run, since the formula lands in the lead's last sentence and an inline
  # <code> before it would otherwise hide it. Deliberately narrow: it takes
  # "Hier lees je" but not "In deze oefening bouw je", which describes the task
  # instead of announcing the page.
  # The "we"-forms were added by the labo 0 style pass: "Op deze pagina
  # behandelen we" and "In dit artikel gaan we" are the same announcement in the
  # first person plural, and both stood in a labo 0 lead.
  STOCK_LEAD='Hier lees je|Hier zie je|Hier ontdek je|Hieronder lees je|Hieronder zie je|Op deze pagina (lees|zie|ontdek|vind|leer) je|Op deze pagina (behandelen|bespreken) we|In dit artikel'
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"
    skipped "$f" lead-opener && continue
    note "$f: lead opens on a stock formula, vary it (SCHRIJFSTIJL.md 9)"
  done < <(grep -lE "class=\"lead\">.*($STOCK_LEAD)" "${checked[@]}" 2>/dev/null)

  # Patroon 11: a diminutive dressing up a technical part ("het zwarte blokje",
  # "draadjes", "zo eentje") reads as affected. An explicit word list rather
  # than a -je/-tje suffix regex, which is the obvious implementation and the
  # wrong one: it also hits "haakjes", "netjes", "eventjes", "oranje" and
  # "vrije", none of which are diminutives in function, and it cannot tell a
  # decoration from the established term for a component. So the list holds
  # only words that have a plain equivalent, and deliberately leaves out the
  # vocabulary this course already uses: "pootjes" (the outer legs of a
  # potentiometer, in the original author's own text), "rekstrookje",
  # "ezelsbruggetje". It may grow; it may never gain a technical term.
  DIMINUTIVES='eentje|blokjes?|chipje|draadjes?|schermpje|lampje|knopje|lusje|regeltje|sketchje|functietje|woordje|zinnetje|looplichtje|lichtpuntje|lettertje|motortje|rommeltje|duwtje|trucje|lijstjes?|plaatsjes?|stukjes?|flitsje|meetstapjes?|stapjes?'
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"; w="${hit##*:}"
    skipped "$f" verkleinwoord && continue
    note "$f: '$w' is a diminutive dressing up a part, name the thing (SCHRIJFSTIJL.md 11)"
  done < <(grep -ohHE "\b($DIMINUTIVES)\b" "${checked[@]}" 2>/dev/null | sort -u)

  # Patroon 12: Netherlandic word choice in a course written for Flemish
  # students. "kan je" and "je kan" appear 101 times against 6 for "kun je" and
  # "je kunt", so this is a consistency rule as much as a regional one, and the
  # Northern forms sit almost entirely in text taken over from a Dutch source.
  #
  # Two words were measured and deliberately left OUT, because a plausible list
  # is not the same as a correct one. "best" in "neem daarvoor best een
  # weerstand" is Belgian Dutch, not Northern, so flagging it would push the
  # text the wrong way. "hoor" is the verb horen in "bij een echte motor hoor je
  # dat", so the sentence particle cannot be matched without the verb. Same
  # reason "netjes" is not here: it is ordinary Dutch used in Flanders too, and
  # its real problem is patroon 13 below. The list also stays clear of
  # Belgicisms: the target is standard Dutch as written in Flanders, so it will
  # never ask for "vijs" or "kuisen".
  # "kunt u" is left to the u-vorm rule below rather than reported twice.
  # "Kun je" is spelled out with both cases rather than matched
  # case-insensitively: the rest of the list must stay case-sensitive, and a
  # sentence-initial "Kun je" would slip past the lowercase-only form.
  # "kunt" and "wilt" stand alone rather than as "je kunt" / "je wilt", because
  # the subject is not always next to the verb: "een waarde die je in je
  # programma kunt gebruiken" on analogRead.html and "wanneer je bijvoorbeeld
  # een sensorwaarde wilt omzetten" on map.html both sat between the two and
  # went unreported for that reason. The Flemish standard form is "kan" / "wil"
  # in every one of those positions. "wilt u" is left to the u-vorm rule below.
  NOORD_NL='[Kk]un je|kunt|wilt|flinke?|prima|eventjes|hartstikke|gaaf|nou ja'
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"; w="${hit##*:}"
    skipped "$f" noord-nederlands && continue
    note "$f: '$w' reads as Netherlandic, use the Flemish form (SCHRIJFSTIJL.md 12)"
  done < <(grep -ohHE "\b($NOORD_NL)\b" "${checked[@]}" 2>/dev/null | sort -u)

  # Patroon 13: an adverb that adds nothing. Narrow on purpose. "gewoon" occurs
  # 101 times and usually means something ("een gewone digitale uitgang"), and
  # "letterlijk" earns its place in "digitalWrite() zet letterlijk 5 V op een
  # pin", so neither is listed. "netjes" is the real tic at 19 uses, nearly all
  # padding, and in "het bericht wacht netjes in zijn ontvangstbuffer" it also
  # turns the buffer into a well-behaved creature, which is patroon 7.
  # "uiteraard" and "natuurlijk" were added after the labo 4 pass emptied them:
  # three uses in the whole repo, all three pure padding. The \b on both ends is
  # what makes them safe, since it never matches the adjective "natuurlijke".
  # "eigenlijk" is named in the same paragraph of SCHRIJFSTIJL.md but stays out:
  # of the eight remaining uses, four are the adjective and three are a genuine
  # aside in a question to the student ("Hoeveel stroom kan een pin eigenlijk
  # leveren?"), so the list would report mostly non-findings.
  FILLERS='netjes|heel even|uiteraard|natuurlijk'
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"; w="${hit##*:}"
    skipped "$f" vulwoord && continue
    note "$f: '$w' is padding, drop it (SCHRIJFSTIJL.md 13)"
  done < <(grep -ohHE "\b($FILLERS)\b" "${checked[@]}" 2>/dev/null | sort -u)

  # Spelling, not ornament, and the first rule here that is not one of the
  # thirteen patterns. The house spelling is "led" and "leds"; the capitals were
  # in 43 files until the labo 1 pass lowercased 400 of them, and a rule is the
  # only thing that keeps them from creeping back in one page at a time.
  #
  # The hard part is that LED belongs in code. "pinLED" and "blinkLED" are
  # identifiers, and in labo 6 the string "LED" is the protocol key between the
  # pc and the Arduino ("LED:1"), so there the capitals are data. Those all sit
  # inside a <pre>, but a line-based grep cannot see block boundaries, so the
  # match is filtered the other way round: the line must carry a prose tag, and
  # must not be the <pre ...><code> opening line, where labo 6 happens to put
  # its `if (sleutel == "LED")`. Code lines carry no tag and drop out. That
  # errs toward missing a violation rather than inventing one, which is the
  # right way round for an advisory rule.
  #
  # Advisory like the rest, and here that matters more than usual: "LED" is
  # correct the day a page spells out Light Emitting Diode. No page does today,
  # and when one does it records `<!-- audit-skip: led-spelling -->` rather than
  # losing the acronym.
  LED_TARGETS=("${checked[@]}")
  [ -f exercises.js ] && LED_TARGETS+=(exercises.js)
  [ -f reference.js ] && LED_TARGETS+=(reference.js)
  declare -A LED_SEEN=()
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"; text="${hit#*:}"; text="${text#*:}"
    [ -n "${LED_SEEN[$f]:-}" ] && continue
    case "$text" in *'<pre'*|*'<code>'*) continue ;; esac
    case "$text" in
      *'<p'*|*'<li'*|*'<td'*|*'<th'*|*'<h1'*|*'<h2'*|*'<h3'*|*'<title>'*|\
      *'<caption>'*|*'<figcaption'*|*'alt="'*|*'name:'*|*'blurb:'*) ;;
      *) continue ;;
    esac
    LED_SEEN["$f"]=1
    skipped "$f" led-spelling && continue
    note "$f: 'LED' in the prose, the house spelling is 'led' (SCHRIJFSTIJL.md, spelling)"
  done < <(grep -nE '\bLEDs?\b' "${LED_TARGETS[@]}" 2>/dev/null)

  # Identifiers are Dutch, and a compound puts the head noun last: ledPin,
  # knopPin, potPin. That is correct Dutch (a closed compound, "de ledpin") and
  # correct English at the same time, which is why those names survived the
  # conversion untouched while pinLed and pinButton did not.
  #
  # This is the mirror image of the led-spelling rule above: there the match had
  # to carry a prose tag, here it must not, because an identifier lives in a
  # <pre>. The word list is deliberately made of compounds only. Bare `value`
  # and `state` are the likelier slip, but they are also `value="0"` in an
  # attribute and `.value` in the shift-register widget's JavaScript, and an
  # advisory rule that cries wolf is worse than one that misses a case.
  #
  # The Arduino API keeps its own English names: Labo2/Reference/map.html
  # documents map(value, fromLow, ...) and records an audit-skip for it, and
  # Labo0's Blink exercise is the IDE's example sketch, not a house identifier.
  ID_WORDS='pinLed|pinLED|pinButton|pinPot|pinPotentiometer|pinSensor|pinAnalogIn'
  ID_WORDS="$ID_WORDS"'|pinNoodstop|pinDigitSelect|valuePotentiometer|potValue|ledValue'
  ID_WORDS="$ID_WORDS"'|delayValue|buttonState|lastReading|currentMillis|previousMillis'
  ID_WORDS="$ID_WORDS"'|risingEdge|brightness|isEnabled|fullStep|halfStep|blinkLed|voltage'
  declare -A ID_SEEN=()
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"; text="${hit#*:}"; text="${text#*:}"
    [ -n "${ID_SEEN[$f]:-}" ] && continue
    # `<p` would also match `<pre`, and the <pre ...><code> opening line is
    # exactly where a sketch's first identifier sits, so the paragraph tag is
    # matched with its delimiter and `<pre ` slips past.
    case "$text" in
      *'<p>'*|*'<p '*|*'<li'*|*'<td'*|*'<th'*|*'<h1'*|*'<h2'*|*'<h3'*|*'<title>'*|\
      *'<caption>'*|*'<figcaption'*|*'alt="'*) continue ;;
    esac
    ID_SEEN["$f"]=1
    skipped "$f" identifier-taal && continue
    note "$hit  <- Engelse identifier, de huisregel is Nederlands met het hoofdwoord achteraan (ledPin, knopPin)"
  done < <(grep -nE "(^|[^A-Za-z0-9_.])($ID_WORDS)\b" "${checked[@]}" 2>/dev/null)

  # The je-vorm has been a house rule since the first commit and nothing ever
  # checked it. Imported content is where it slips in. Advisory rather than
  # blocking because "u" is a legal Dutch word in other positions and a false
  # positive must never be able to stop a commit.
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    f="${hit%%:*}"
    skipped "$f" u-vorm && continue
    note "$hit  <- u-vorm, these pages are in the je-vorm"
  done < <(grep -nE '\b([Uu]w|[Uu] (kunt|kan|moet|hebt|zult|krijgt|ziet|maakt))\b' "${checked[@]}" 2>/dev/null)

  for f in "${checked[@]}"; do
    base="${f##*/}"
    case "$f" in
      Labo*/Exercises/*|Labo*/Reference/*) ;;
      *) continue ;;
    esac
    [ "$base" = "dashboard.html" ] && continue
    [ "$base" = "reference.html" ] && continue

    [ -n "${HAS_LEAD[$f]:-}" ] || skipped "$f" lead \
      || note "$f: no <p class=\"lead\"> under the <h1>"

    # Heuristic: more <img> than <figure> means at least one bare image.
    # Images inside a table cell are excluded, since a comparison table puts
    # them in <td> deliberately and wrapping those in a figure would be wrong.
    # grep -c already prints 0 when nothing matches, it just exits 1.
    imgs=$(grep -c '<img' "$f" 2>/dev/null || true)
    cells=$(grep -cE '<t[dh][ >].*<img' "$f" 2>/dev/null || true)
    figs=$(grep -c '<figure' "$f" 2>/dev/null || true)
    [ "$(( imgs - cells ))" -gt "$figs" ] && ! skipped "$f" figure \
      && note "$f: $(( imgs - cells )) <img> outside a table but only $figs <figure> (images belong in a figure wrapper)"

    case "$f" in
      Labo*/Exercises/*)
        if skipped "$f" indienen; then
          :
        elif [ -z "${HAS_INDIENEN[$f]:-}" ]; then
          note "$f: no <h2 id=\"indienen\"> section"
        elif [ -z "${HAS_STD_INDIENEN[$f]:-}" ]; then
          note "$f: Indienen section is not the standard '<p>Sla je oefening op.</p>'"
        fi
        [ -n "${HAS_OPLOSSING[$f]:-}" ] || skipped "$f" oplossing \
          || note "$f: no <h2 id=\"oplossing\"> section"
        # The manifest flag and the page's own markup must tell the same story:
        # a mismatch means the dashboard reads progress the page never writes.
        if skipped "$f" checklist-driven; then
          :
        elif [ -n "${DRIVEN[$f]:-}" ]; then
          [ -n "${HAS_CHECKLIST[$f]:-}" ] || note "$f: manifest says checklistDriven but the page has no .checklist"
          [ -n "${HAS_SYNC[$f]:-}" ]      || note "$f: manifest says checklistDriven but the page never loads checklist-sync.js"
        elif [ -n "${MANIFEST_PAGES[$f]:-}" ] && [ -n "${HAS_CHECKLIST[$f]:-}" ]; then
          note "$f: page has a live .checklist but the manifest entry is not checklistDriven"
        fi
        ;;
    esac
  done
fi

# ---------------------------------------------------- 4. asset hygiene

while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit  <- Brightspace hotlink, self-host it in img/"
done < <(grep -nE 'content/enforced' "${checked[@]}" 2>/dev/null)

while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit  <- remote image, download it into img/"
done < <(grep -nE '<img[^>]+src="https?://' "${checked[@]}" 2>/dev/null)

# Documents rot the same way images do: the vendor moves the PDF and the link
# dies mid-semester. Self-host them in datasheets/ instead.
while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit  <- remote document, download it into datasheets/"
done < <(grep -nE 'href="https?://[^"]+\.(pdf|zip|docx?|pptx?|xlsx?)"' "${checked[@]}" 2>/dev/null)

while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit  <- YouTube embed without referrerpolicy (error 153)"
done < <(grep -nE 'youtube(-nocookie)?\.com/embed' "${checked[@]}" 2>/dev/null | grep -v 'referrerpolicy')
take; asset_errs="$TAKEN"

# ------------------------------------------------------- 5. code style

style_errs=""
# Allman braces. Matches "){", ") {", "else{", "else {", "do{", "do {".
# A data initializer ("= {") never matches: no ")" / "else" / "do" sits
# immediately before the brace.
while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit"
done < <(grep -nE '\) ?\{|\belse ?\{|\bdo ?\{' "${files[@]}" 2>/dev/null)
take; v="$TAKEN"
[ -n "$v" ] && style_errs+="K&R brace(s) - Arduino/C++ code must be Allman (opening { on its own line):"$'\n'"$v"

while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit"
done < <(grep -nE '&mdash;|—' "${files[@]}" 2>/dev/null)
take; v="$TAKEN"
[ -n "$v" ] && style_errs+="Em-dash(es) - replace with a comma, colon, period, or 'en'/'maar':"$'\n'"$v"

# --------------------------------------------------------- 6. exercise names

# "Gevorderde oefening 2" tells a student nothing about what they are about to
# build, reads as a placeholder, and stops meaning anything the moment the
# ordering changes. Name an exercise after the thing it makes. A label without a
# number ("Begeleide oefening") is fine: that describes the format, not a slot.
naming_errs=""
NAME_RE='(gevorderde|basis|extra|bonus|laatste)?[[:space:]]*oefening[[:space:]]*[0-9]'

while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit"
done < <(grep -niE "name: '[^']*$NAME_RE" exercises.js 2>/dev/null)
take; v="$TAKEN"
[ -n "$v" ] && naming_errs+="Generic exercise name in exercises.js - name it after what the student builds:"$'\n'"$v"

while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit"
done < <(grep -niE "<(h1|title)>[^<]*$NAME_RE" "${checked[@]}" 2>/dev/null)
take; v="$TAKEN"
[ -n "$v" ] && naming_errs+="Generic page title - the <h1> and <title> should say what the exercise builds:"$'\n'"$v"

# ------------------------------------------- 7. sketches compile (--compile)
#
# Every rule above reads the HTML. None of them can tell you whether the code
# on the page actually builds. This one hands each complete sketch to the real
# Arduino compiler, which is the only thing that can say for certain.
#
# Opt-in, and deliberately so. It takes minutes rather than the ~2s the rest of
# the script needs, and it wants arduino-cli plus a board core installed, which
# the CI runner does not have. So it never runs from the Stop hook and never in
# CI: you run it when you touch code, typically after an import.
#
# The fork-free rule that governs the rest of this script does not apply here.
# This mode spawns a compiler per sketch by definition; that is the whole job.
#
# The extractor below accepts a code block with <code> glued to the opening tag,
# on its own line, or missing entirely. It used to insist on the glued form, so
# a block written any other way never terminated: it ran to end of file and its
# last chunk, carrying no delimiter, was silently discarded by "read -d". That
# hid 28 blocks across 18 pages, 27 of them whole sketches, while this check
# reported green. An unclosed block is therefore an error now, not a skip.

compile_errs=""
compile_notes=""
extract_errs=""

if [ "$COMPILE" -eq 1 ]; then
  if ! command -v arduino-cli >/dev/null 2>&1; then
    compile_notes+="  arduino-cli not found, so no sketch could be verified."$'\n'
    compile_notes+="  Install it from https://arduino.github.io/arduino-cli/ and run:"$'\n'
    compile_notes+="    arduino-cli core install arduino:avr"$'\n'
  elif ! arduino-cli core list 2>/dev/null | grep -q '^arduino:avr'; then
    compile_notes+="  The arduino:avr core is missing, so no sketch could be verified."$'\n'
    compile_notes+="    arduino-cli core install arduino:avr"$'\n'
  else
    # A page can record that its code is meant to misbehave:
    #     <!-- compile-skip: toont met opzet een oneindige lus -->
    # Iteraties.html is the reason this exists: two of its examples are there
    # precisely to show a bug, so the compiler warning is the lesson, not a
    # defect. Skipped pages stay listed below, never silently ignored.
    declare -A CSKIP=()
    while IFS= read -r hit; do
      [ -z "$hit" ] && continue
      f="${hit%%:*}"; why="${hit#*compile-skip:}"; why="${why%%-->*}"
      CSKIP["$f"]=1
      compile_notes+="  $f (skipped:${why%"${why##*[![:space:]]}"})"$'\n'
    done < <(grep -oHE '<!--[[:space:]]*compile-skip:[^>]*-->' "${checked[@]}" 2>/dev/null)

    CTMP="$(mktemp -d)"
    trap 'rm -rf "$CTMP"' EXIT
    n_ok=0; n_skipped=0

    for f in "${checked[@]}"; do
      [ -n "${CSKIP[$f]:-}" ] && continue

      # Split the page into its code blocks, undo the HTML escaping, and keep
      # the ones that are a whole program rather than a fragment.
      #
      # The extraction runs into a file rather than straight into the loop, so
      # that a structural complaint from awk (an unclosed block) is visible.
      # Piped into "while read" it would be lost with the exit status.
      if ! awk '
        # A block opens at <pre class="code-wrapper ...">. The <code> that
        # usually follows may be glued to that tag, sit on its own line, or be
        # missing altogether, and the close is </code></pre> or a bare </pre>.
        # Accepting only the glued shape silently dropped every other one: the
        # block never ended, so it swallowed the rest of the page and its final
        # chunk, carrying no delimiter, was discarded by the reader below.
        !inblk && /<pre class="code-wrapper/ {
          inblk = 1; openline = NR; atstart = 1
          sub(/.*<pre class="code-wrapper[^>]*>/, "")
          sub(/^[[:space:]]*<code>/, "")
          if ($0 == "") next
        }
        inblk {
          if (atstart) {
            atstart = 0
            if ($0 ~ /^[[:space:]]*<code>[[:space:]]*$/) next
          }
          if ($0 ~ /^[[:space:]]*<\/code>[[:space:]]*$/) next
          if (index($0, "</pre>")) {
            sub(/[[:space:]]*(<\/code>)?[[:space:]]*<\/pre>.*/, "")
            if ($0 != "") printf "%s\n", $0
            printf "\002"
            inblk = 0
            next
          }
          printf "%s\n", $0
        }
        # An unclosed block is reported rather than dropped. Emitting the
        # delimiter hands what there is to the compiler as well, so the page is
        # never quietly skipped: this is the exact failure that hid 28 sketches.
        END {
          if (inblk) {
            printf "\002"
            print FILENAME ": code block opened at line " openline \
                  " is never closed (no </pre>)" > "/dev/stderr"
            exit 3
          }
        }
      ' "$f" 2>"$CTMP/awk.err" \
        | sed -e 's/&lt;/</g' -e 's/&gt;/>/g' -e 's/&quot;/"/g' \
              -e "s/&#39;/'/g" -e 's/&amp;/\&/g' > "$CTMP/blocks"; then
        while IFS= read -r line; do
          [ -n "$line" ] && extract_errs+="  $line"$'\n'
        done < "$CTMP/awk.err"
      fi

      i=0
      while IFS= read -r -d $'\002' block; do
        i=$((i + 1))
        case "$block" in
          *"void setup()"*"void loop()"*) ;;
          *) continue ;;
        esac

        # A block holding ??? is a fill-in-the-blank skeleton for the student,
        # not a program: the Opgave on TemperatuursensorTMP36 is the canonical
        # one. It cannot compile by construction, and filling the blanks in
        # would hand over the answer the exercise is asking for. So it is
        # skipped per BLOCK rather than per page, because the same page's
        # Oplossing is a real sketch and is exactly what you want compiled.
        # Listed below like every other skip, never silently dropped.
        case "$block" in
          *'???'*)
            compile_notes+="  $f (code block $i): fill-in skeleton (???), nothing to compile"$'\n'
            n_skipped=$((n_skipped + 1))
            continue ;;
        esac

        name="s$(printf '%s' "$f" | tr -c 'A-Za-z0-9' '_')_$i"
        mkdir -p "$CTMP/$name"
        printf '%s' "$block" > "$CTMP/$name/$name.ino"

        if out=$(arduino-cli compile -b arduino:avr:uno --warnings all "$CTMP/$name" 2>&1); then
          # Warnings from inside a library are not this repo's problem, so keep
          # only the ones pointing at the extracted sketch itself.
          w=$(printf '%s' "$out" | grep "warning:" | grep -F "$name.ino" | sed 's/.*warning:/warning:/' | sort -u)
          if [ -n "$w" ]; then
            while IFS= read -r line; do
              [ -n "$line" ] && err "$f (code block $i): $line"
            done <<< "$w"
          fi
          n_ok=$((n_ok + 1))
        elif printf '%s' "$out" | grep -qE "\.h: No such file or directory"; then
          # A missing library is a gap in this machine's toolchain, not a fault
          # in the page. Say which one, and do not fail over it.
          lib=$(printf '%s' "$out" | grep -oE "[A-Za-z0-9_]+\.h: No such file" | head -1)
          compile_notes+="  $f (code block $i): cannot verify, ${lib% No such file} is not installed"$'\n'
          n_skipped=$((n_skipped + 1))
        else
          while IFS= read -r line; do
            [ -n "$line" ] && err "$f (code block $i): ${line##*error: }"
          done <<< "$(printf '%s' "$out" | grep "error:" | head -3)"
        fi
      done < "$CTMP/blocks"
    done

    take; v="$TAKEN"
    [ -n "$v" ] && compile_errs+="Sketch does not compile cleanly:"$'\n'"$v"
    [ -n "$extract_errs" ] && compile_errs+="Code block is never closed, so the compiler only saw part of it:"$'\n'"$extract_errs"
    compile_notes+="  $n_ok sketches compiled clean"
    [ "$n_skipped" -gt 0 ] && compile_notes+=", $n_skipped could not be verified"
    compile_notes+=$'\n'
  fi
fi

# ----------------------------------------------------------- reporting

report=""
[ -n "$link_errs" ]     && report+="Broken links or assets:"$'\n'"$link_errs"
[ -n "$manifest_errs" ] && report+="Manifest does not match the filesystem:"$'\n'"$manifest_errs"
[ -n "$wiring_errs" ]   && report+="Page wiring:"$'\n'"$wiring_errs"
[ -n "$asset_errs" ]    && report+="Asset hygiene:"$'\n'"$asset_errs"
[ -n "$style_errs" ]    && report+="$style_errs"
[ -n "$naming_errs" ]   && report+="$naming_errs"
[ -n "$compile_errs" ]  && report+="$compile_errs"

if [ -n "$FIXED" ]; then
  printf 'Fixed automatically (review with "git diff"):\n%s' "$FIXED"
fi

# Advisory: printed to stdout and never allowed to affect the exit code.
if [ -n "$audit_notes" ]; then
  printf 'Style audit (advisory, does not fail):\n%s\n' "$audit_notes"
fi
# Deliberate deviations stay visible, just not as findings.
if [ -n "${skip_notes:-}" ]; then
  printf 'Deviations recorded in the page itself (audit-skip):\n%s\n' "$skip_notes"
fi
if [ -n "$compile_notes" ]; then
  printf 'Sketch compilation:\n%s\n' "$compile_notes"
fi

if [ -n "$report" ]; then
  [ -n "$FIXED" ] && printf '\nStill needs a human:\n'
  printf '%s' "$report" >&2
  # Nobody has to remember the flags: the moment they would help, say so.
  [ "$FIX_MODE" -eq 0 ] && printf '\nMany of these repair themselves: bash scripts/check-content.sh --fix\n' >&2
  [ "$HOOK_MODE" -eq 1 ] && exit 2
  [ -n "$warnings" ] && printf 'Pending placeholders (not blocking):\n%s' "$warnings" >&2
  exit 1
fi

if [ "$HOOK_MODE" -eq 0 ]; then
  [ -n "$warnings" ] && printf 'Pending placeholders (not blocking):\n%s' "$warnings"
  echo "check-content: OK (${#files[@]} .html files: links, manifests, wiring, assets, style)"
  [ "$AUDIT" -eq 0 ] && echo "                 (--audit also reports house-style drift, --fix repairs the mechanical ones)"
  [ "$COMPILE" -eq 0 ] && echo "                 (--compile builds every sketch on the pages with the real Arduino compiler)"
fi
exit 0
