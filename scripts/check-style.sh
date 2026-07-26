#!/usr/bin/env bash
# check-style.sh - verify course HTML follows the Orion style rules.
#
# Reports every offending file:line if any tracked .html contains a banned
# pattern:
#   1. K&R / same-line opening braces in code. Arduino/C++ code style is
#      Allman: the opening { of a function or control statement must sit on
#      its OWN line. Data initializers ("... = { ... }") are allowed.
#   2. Em-dashes (&mdash; or the literal "—") anywhere. They read as an
#      AI-tell; use a comma, colon, period, or "en"/"maar" instead.
#
# Usage:
#   bash scripts/check-style.sh          # human mode: findings + summary,
#                                         # exit 1 on violations, 0 when clean.
#   bash scripts/check-style.sh --hook    # hook mode: findings to stderr,
#                                         # exit 2 on violations (blocks the
#                                         # Stop hook), silent + 0 when clean.
set -uo pipefail

# Work from the repo root regardless of where the script is invoked.
cd "$(dirname "$0")/.." || exit 2

HOOK_MODE=0
[ "${1:-}" = "--hook" ] && HOOK_MODE=1

# Prefer git-tracked .html files; fall back to a filesystem walk.
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  mapfile -t files < <(git ls-files '*.html')
else
  mapfile -t files < <(find . -name '*.html' -not -path '*/node_modules/*')
fi

if [ "${#files[@]}" -eq 0 ]; then
  [ "$HOOK_MODE" -eq 1 ] || echo "check-style: no .html files found"
  exit 0
fi

report=""

# 1) Allman braces. Matches "){", ") {", "else{", "else {", "do{", "do {".
#    A data initializer ("= {") never matches: no ")" / "else" / "do" sits
#    immediately before the brace.
braces=$(grep -nE '\) ?\{|\belse ?\{|\bdo ?\{' "${files[@]}" || true)
if [ -n "$braces" ]; then
  report+="K&R brace(s) found - Arduino/C++ code must be Allman (opening { on its own line):"$'\n'
  report+="$braces"$'\n'
fi

# 2) Em-dashes.
dashes=$(grep -nE '&mdash;|—' "${files[@]}" || true)
if [ -n "$dashes" ]; then
  report+="Em-dash(es) found - replace with a comma, colon, period, or 'en'/'maar':"$'\n'
  report+="$dashes"$'\n'
fi

if [ -n "$report" ]; then
  printf '%s' "$report" >&2
  [ "$HOOK_MODE" -eq 1 ] && exit 2
  exit 1
fi

[ "$HOOK_MODE" -eq 1 ] || echo "check-style: OK (no K&R braces, no em-dashes in ${#files[@]} .html files)"
exit 0
