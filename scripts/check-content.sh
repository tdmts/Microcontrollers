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
#   3. Page wiring (Orion CDN, checklist/solution/dashboard/hub script sets).
#   4. Asset hygiene (no Brightspace hotlinks, no remote images, YouTube
#      embeds carry referrerpolicy).
#   5. Code style (Allman braces, no em-dashes).
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
set -uo pipefail

cd "$(dirname "$0")/.." || exit 2

HOOK_MODE=0
[ "${1:-}" = "--hook" ] && HOOK_MODE=1

# Pages that deliberately break the rules below:
#   template.html     - the styleguide reference. Links a LOCAL orion.css and a
#                       qrcode.js that do not exist in this repo, shows the
#                       checklist markup without wiring it to an exercise, and
#                       uses placehold.co demo images.
#   pasteInOrion.html - the Orion iframe wrapper. Not an Orion-styled page.
EXEMPT_PAGES=" template.html pasteInOrion.html "

# The GitHub Pages base URL that exercises.js hrefs point at.
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

# exercises.js: one entry per line, hrefs are absolute Pages URLs.
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
    if [ -z "$order" ]; then
      err "exercises.js: $lab/$id has no order (the dashboard sorts on it)"
    else
      [ -n "${seen_order[$lab/$order]:-}" ] && err "exercises.js: $lab reuses order $order (ids '${seen_order[$lab/$order]}' and '$id')"
      seen_order["$lab/$order"]="$id"
    fi

    case "$href" in
      "$PAGES_BASE"*) target="${href#"$PAGES_BASE"}" ;;
      http*) err "exercises.js: $lab/$id href points outside the site ($href)"; continue ;;
      *) norm_path "$href"; target="$NP" ;;
    esac
    MANIFEST_PAGES["$target"]=1

    labdir="Labo${lab#labo}"
    case "$target" in
      "$labdir"/*) ;;
      *) err "exercises.js: $lab/$id href lives under ${target%%/*}/ instead of $labdir/" ;;
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
    case "${INIT_HUB[$f]:-}" in
      "$lab") ;;
      '') err "$f never calls initReferenceHub('$lab')" ;;
      *)  err "$f is in $lab but calls initReferenceHub('${INIT_HUB[$f]}')" ;;
    esac
  fi
done
take; wiring_errs="$TAKEN"

# ---------------------------------------------------- 4. asset hygiene

while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit  <- Brightspace hotlink, self-host it in img/"
done < <(grep -nE 'content/enforced' "${checked[@]}" 2>/dev/null)

while IFS= read -r hit; do
  [ -n "$hit" ] && err "$hit  <- remote image, download it into img/"
done < <(grep -nE '<img[^>]+src="https?://' "${checked[@]}" 2>/dev/null)

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

# ----------------------------------------------------------- reporting

report=""
[ -n "$link_errs" ]     && report+="Broken links or assets:"$'\n'"$link_errs"
[ -n "$manifest_errs" ] && report+="Manifest does not match the filesystem:"$'\n'"$manifest_errs"
[ -n "$wiring_errs" ]   && report+="Page wiring:"$'\n'"$wiring_errs"
[ -n "$asset_errs" ]    && report+="Asset hygiene:"$'\n'"$asset_errs"
[ -n "$style_errs" ]    && report+="$style_errs"

if [ -n "$report" ]; then
  printf '%s' "$report" >&2
  [ "$HOOK_MODE" -eq 1 ] && exit 2
  [ -n "$warnings" ] && printf 'Pending placeholders (not blocking):\n%s' "$warnings" >&2
  exit 1
fi

if [ "$HOOK_MODE" -eq 0 ]; then
  [ -n "$warnings" ] && printf 'Pending placeholders (not blocking):\n%s' "$warnings"
  echo "check-content: OK (${#files[@]} .html files: links, manifests, wiring, assets, style)"
fi
exit 0
