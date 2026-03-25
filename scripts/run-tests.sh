#!/usr/bin/env bash
# ClaimIt — unified test runner
# Usage: bash scripts/run-tests.sh
# Exit 0 = all pass, exit 1 = failures found
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# ── 1. Ensure server-only mock exists (tsx can't import real package w/o node_modules) ──
SERVER_ONLY_DIR="node_modules/server-only"
if [ ! -f "$SERVER_ONLY_DIR/index.js" ]; then
  mkdir -p "$SERVER_ONLY_DIR"
  echo '// test mock' > "$SERVER_ONLY_DIR/index.js"
  echo '{"name":"server-only","version":"0.0.1","main":"index.js"}' > "$SERVER_ONLY_DIR/package.json"
fi

# ── 2. Run all test files ────────────────────────────────────────────────────
FAILURES=0

run_suite() {
  local file="$1"
  echo ""
  echo "▶  Running: $file"
  if npx tsx "$file"; then
    echo "✓  $file passed"
  else
    echo "✗  $file FAILED"
    FAILURES=$((FAILURES + 1))
  fi
}

# Primary QC suite
run_suite "scripts/qc.ts"

# Auto-discover additional suites in scripts/tests/ (add more files there to scale)
if [ -d "scripts/tests" ]; then
  for f in scripts/tests/*.ts; do
    [ -f "$f" ] && run_suite "$f"
  done
fi

# ── 3. Summary ───────────────────────────────────────────────────────────────
echo ""
echo "════════════════════════════════════════"
if [ "$FAILURES" -eq 0 ]; then
  echo "✓  All test suites passed"
  exit 0
else
  echo "✗  $FAILURES suite(s) failed — commit blocked"
  exit 1
fi
