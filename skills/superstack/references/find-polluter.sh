#!/usr/bin/env bash
#
# find-polluter.sh — isolate the test that leaks unwanted state.
#
# When a test suite only fails "in combination" because one test creates a
# stray file/dir, a .git, a global, or other shared state, run each test file
# one at a time and watch for a sentinel artifact appearing. The first file
# that makes the sentinel appear is the polluter.
#
# Usage:
#   ./find-polluter.sh <sentinel_path> <test_glob>
#
# Examples:
#   ./find-polluter.sh '.git'           'src/**/*.test.ts'
#   ./find-polluter.sh 'tmp/leaked.db'  'tests/**/*.spec.js'
#
# Notes:
#   - Adapt the TEST_CMD line below to your project's per-file test runner.
#   - The script ignores each test's pass/fail on purpose: it only cares about
#     side effects, so a failing/erroring test is still checked for pollution.
#   - It checks the sentinel BEFORE each file too, so pre-existing pollution is
#     not mis-attributed to an innocent test.

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <sentinel_path> <test_glob>" >&2
  echo "  e.g. $0 '.git' 'src/**/*.test.ts'" >&2
  exit 1
fi

SENTINEL="$1"
TEST_GLOB="$2"

# --- Adapt this to your project's SINGLE-FILE test command ----------------
# This MUST run exactly one test file, or the per-file isolation breaks and the
# sentinel will trip on the first file and mis-blame it. The `--` forwards the
# path to the underlying runner (required on npm < 7; harmless on npm >= 7).
#   JS/TS (vitest):  run_test_file() { npx vitest run "$1" >/dev/null 2>&1 || true; }
#   JS/TS (jest):    run_test_file() { npx jest "$1"       >/dev/null 2>&1 || true; }
#   npm script:      run_test_file() { npm test -- "$1"    >/dev/null 2>&1 || true; }
#   Python (pytest): run_test_file() { python -m pytest "$1" >/dev/null 2>&1 || true; }
#   Go:              run_test_file() { go test "$1"        >/dev/null 2>&1 || true; }
run_test_file() { npm test -- "$1" > /dev/null 2>&1 || true; }
# --------------------------------------------------------------------------

# shellcheck disable=SC2207
FILES=($(find . -path "./$TEST_GLOB" 2>/dev/null | sort))
if [ "${#FILES[@]}" -eq 0 ]; then
  # Fall back to shell glob if find's -path pattern matched nothing.
  shopt -s globstar nullglob 2>/dev/null || true
  FILES=($TEST_GLOB)
fi

# Keep only entries that are real files (guards against an unexpanded literal
# glob slipping through if nullglob couldn't be enabled).
_real=()
for _f in "${FILES[@]}"; do [ -f "$_f" ] && _real+=("$_f"); done
FILES=("${_real[@]}")

TOTAL="${#FILES[@]}"
if [ "$TOTAL" -eq 0 ]; then
  echo "No test files matched: $TEST_GLOB" >&2
  exit 1
fi

echo "Scanning $TOTAL test files for a polluter that creates: $SENTINEL"
echo

i=0
for f in "${FILES[@]}"; do
  i=$((i + 1))

  # Pre-existing pollution? Don't blame this file for it.
  if [ -e "$SENTINEL" ]; then
    echo "⚠️  [$i/$TOTAL] Sentinel already exists before running: $f (skipping)"
    continue
  fi

  echo "[$i/$TOTAL] $f"
  run_test_file "$f"

  if [ -e "$SENTINEL" ]; then
    echo
    echo "🎯 FOUND POLLUTER!"
    echo "   File:     $f"
    echo "   Created:  $SENTINEL"
    ls -la "$SENTINEL" 2>/dev/null || true
    echo
    echo "Next steps:"
    echo "   - Re-run just this file:  (your runner) $f"
    echo "   - Inspect the artifact:   ls -la \"$SENTINEL\" ; cat \"$SENTINEL\""
    echo "   - Trace the write to its source (see debugging-techniques.md → root-cause tracing)."
    exit 1
  fi
done

echo
echo "✅ No polluter found — all $TOTAL files ran without creating $SENTINEL."
exit 0
