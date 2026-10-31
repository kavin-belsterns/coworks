#!/bin/sh
# Fail when a branch changes more than 400 lines against a base. POSIX sh.
# Usage: pr-size-check.sh [base]   (default base: origin/main, then main)
# Counts insertions plus deletions from 'git diff --numstat <base>...HEAD'.

limit=400
base="$1"
if [ -z "$base" ]; then
  if git rev-parse --verify origin/main >/dev/null 2>&1; then base=origin/main
  else base=main
  fi
fi

if ! git rev-parse --verify "$base" >/dev/null 2>&1; then
  echo "pr-size-check: base '$base' not found. Pass a base: pr-size-check.sh <base>" >&2
  exit 1
fi

total=$(git diff --numstat "$base"...HEAD | awk '$1 != "-" { s += $1 + $2 } END { print s + 0 }')
echo "Changed lines vs $base: $total (limit $limit)"
git diff --stat "$base"...HEAD | tail -n 1

if [ "$total" -gt "$limit" ]; then
  echo "pr-size-check FAILED: $total lines is over the $limit line cap. Split the pull request." >&2
  exit 1
fi
echo "pr-size-check passed."
exit 0
