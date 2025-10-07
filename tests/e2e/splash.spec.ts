import { test, expect } from '@playwright/test';

test.describe('Splash Overlay', () => {
  test.beforeEach(async ({ context }) => {
    // Clear localStorage before each test to simulate first visit
    await context.clearCookies();
    await context.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('splash overlay appears on first visit and can be skipped', async ({ page }) => {
    // Take initial screenshot
    await page.goto('/');
    await page.screenshot({ path: 'test-results/01-splash-initial.png', fullPage: true });
    
    // Wait for splash to mount
    const splash = page.locator('[role="dialog"][aria-label="Loading"]');
    await expect(splash).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'test-results/02-splash-visible.png', fullPage: true });
    
    // Verify logo and content are visible
    await expect(page.locator('.splash__logo')).toBeVisible();
    await expect(page.locator('.splash__tag')).toBeVisible();
    
    // Click skip intro button
    const skipButton = page.locator('button.splash-skip');
    await expect(skipButton).toBeVisible();
    await page.screenshot({ path: 'test-results/03-before-skip.png', fullPage: true });
    await skipButton.click();
    
    // Confirm splash is hidden
    await expect(splash).toBeHidden({ timeout: 3000 });
    await page.screenshot({ path: 'test-results/04-after-skip.png', fullPage: true });
    
    // Confirm main content becomes visible
    await expect(page.locator('header')).toBeVisible();
    
    // Capture console logs
    const logs: string[] = [];
    page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));
    console.log('Console logs:', logs);
  });

  test('splash does not appear on return visit', async ({ page }) => {
    // First visit - let splash complete
    await page.goto('/');
    const splash = page.locator('[role="dialog"][aria-label="Loading"]');
    await expect(splash).toBeVisible({ timeout: 5000 });
    
    // Skip the splash
    await page.locator('button.splash-skip').click();
    await expect(splash).toBeHidden({ timeout: 3000 });
    
    // Verify localStorage was set
    const storageValue = await page.evaluate(() => localStorage.getItem('ascent_splash_seen_v1'));
    expect(storageValue).toBe('1');
    
    // Navigate away and back
    await page.goto('/about');
    await page.goto('/');
    
    // Splash should not appear
    await expect(splash).not.toBeVisible({ timeout: 2000 });
    await page.screenshot({ path: 'test-results/05-return-visit.png', fullPage: true });
  });

  test('skip button is keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    const skipButton = page.locator('button.splash-skip');
    await expect(skipButton).toBeVisible({ timeout: 5000 });
    
    // Focus should be on skip button
    await expect(skipButton).toBeFocused();
    
    // Press Enter to skip
    await page.keyboard.press('Enter');
    
    const splash = page.locator('[role="dialog"][aria-label="Loading"]');
    await expect(splash).toBeHidden({ timeout: 3000 });
  });
});
