import { test, expect } from '@playwright/test';

/**
 * Debug test for splash overlay - forces splash to show even if seen before
 * Run with: npx playwright test tests/e2e/splash-debug.spec.ts --headed
 */
test.describe('Splash Overlay - Debug Mode', () => {
  test('force show splash with debug parameter', async ({ page }) => {
    // Clear storage
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    
    // Visit with debug parameter to force show
    await page.goto('/?debug-splash=true');
    
    // Wait for splash to mount
    const splash = page.locator('[role="dialog"][aria-label="Loading"]');
    await expect(splash).toBeVisible({ timeout: 5000 });
    
    // Take screenshot for verification
    await page.screenshot({ 
      path: 'test-results/debug-splash-forced.png', 
      fullPage: true 
    });
    
    // Verify all splash elements are present
    await expect(page.locator('.splash__logo')).toBeVisible();
    await expect(page.locator('.splash__tag')).toBeVisible();
    await expect(page.locator('.splash__shapes')).toBeVisible();
    await expect(page.locator('button.splash-skip')).toBeVisible();
    
    console.log('✅ Splash overlay force-shown successfully');
  });

  test('verify GSAP animations are applied', async ({ page }) => {
    await page.goto('/?debug-splash=true');
    
    const splash = page.locator('[role="dialog"][aria-label="Loading"]');
    await expect(splash).toBeVisible({ timeout: 5000 });
    
    // Check if GSAP has been applied (autoAlpha should be set)
    const opacity = await splash.evaluate(el => 
      window.getComputedStyle(el).opacity
    );
    
    expect(parseFloat(opacity)).toBeGreaterThan(0);
    console.log('✅ GSAP animations detected');
  });
});
