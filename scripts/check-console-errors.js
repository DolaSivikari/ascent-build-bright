/**
 * Console Error Check Script
 * Runs headless browser to detect runtime errors on first meaningful paint
 * Used in CI/CD to prevent deployment of broken builds
 */

import puppeteer from 'puppeteer';

async function checkConsoleErrors() {
  let browser;
  
  try {
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    const errors = [];
    const warnings = [];
    
    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });
    
    // Capture page errors
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    // Navigate to the site
    console.log('🔍 Loading site...');
    await page.goto('http://localhost:8080', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait for first meaningful paint
    await page.waitForTimeout(3000);
    
    await browser.close();
    
    // Report results
    if (errors.length > 0) {
      console.error('\n❌ Console errors detected:');
      errors.forEach(err => console.error(`  - ${err}`));
      console.error(`\nTotal errors: ${errors.length}`);
      process.exit(1);
    } else {
      console.log('✅ No console errors detected');
      
      if (warnings.length > 0) {
        console.warn(`\n⚠️  Warnings found (${warnings.length}):`);
        warnings.slice(0, 5).forEach(warn => console.warn(`  - ${warn}`));
        if (warnings.length > 5) {
          console.warn(`  ... and ${warnings.length - 5} more warnings`);
        }
      }
      
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

checkConsoleErrors();
