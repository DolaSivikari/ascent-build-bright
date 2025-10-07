#!/bin/bash

# Test Splash Overlay - Verification Script
# Usage: bash scripts/test-splash.sh [production|local]

TARGET=${1:-local}

if [ "$TARGET" = "production" ]; then
  BASE_URL="https://ascent-build-bright.lovable.app"
  echo "🌐 Testing PRODUCTION: $BASE_URL"
else
  BASE_URL="http://localhost:5173"
  echo "🏠 Testing LOCAL: $BASE_URL"
fi

# Create test results directory
mkdir -p test-results

echo "📋 Running Playwright E2E tests..."
PLAYWRIGHT_TEST_BASE_URL=$BASE_URL npx playwright test tests/e2e/splash.spec.ts --reporter=list

echo ""
echo "🐛 Running debug tests (force-show splash)..."
PLAYWRIGHT_TEST_BASE_URL=$BASE_URL npx playwright test tests/e2e/splash-debug.spec.ts --headed --reporter=list

echo ""
echo "📊 Test Results:"
echo "  - Screenshots: test-results/*.png"
echo "  - HTML Report: test-results/index.html"
echo ""
echo "🔍 To manually test the splash overlay:"
echo "  1. Open: ${BASE_URL}/?debug-splash=true"
echo "  2. Clear localStorage: localStorage.removeItem('ascent_splash_seen_v1')"
echo "  3. Refresh the page"
echo ""
echo "✅ All tests completed!"
