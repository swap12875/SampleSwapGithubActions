const { test, expect } = require('@playwright/test');

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure the page is ready
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Authentication Flow › should allow signup and login', async ({ page }) => {
    // Enable console logging
    page.on('console', msg => console.log('BROWSER:', msg.text()));
    // Add debug logging
    console.log('Starting test...');
    // Navigate to signup page with explicit wait
    console.log('Navigating to signup page...');
    await page.goto('/signup');
    await page.waitForLoadState('networkidle');
    
    // Debug: Log page content
    const content = await page.content();
    console.log('Page URL:', page.url());
    console.log('Page Content:', content);
    
    // Debug: Check if form elements exist
    const hasUsername = await page.$('input[name="username"]');
    const hasEmail = await page.$('input[name="email"]');
    const hasPassword = await page.$('input[name="password"]');
    console.log('Form elements present:', { hasUsername, hasEmail, hasPassword });
    
    // Log page content for debugging
    console.log('Page content:', await page.content());
    console.log('Current URL:', page.url());
    await page.waitForLoadState('networkidle');

    // Generate unique username
    const username = `testuser_${Date.now()}`;
    const email = `test_${Date.now()}@example.com`;
    const password = 'password123';

    // Fill signup form with explicit waits
    console.log('Filling signup form...');
    await page.waitForSelector('input[name="username"]', { state: 'visible', timeout: 30000 });
    await page.fill('input[name="username"]', username);
    
    await page.waitForSelector('input[name="email"]', { state: 'visible', timeout: 30000 });
    await page.fill('input[name="email"]', email);
    
    await page.waitForSelector('input[name="password"]', { state: 'visible', timeout: 30000 });
    await page.fill('input[name="password"]', password);

    // Submit signup form and wait for navigation
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button[type="submit"]')
    ]);

    // Verify redirect to login page
    await expect(page).toHaveURL(/\/login$/);

    // Fill login form
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);

    // Submit login form and wait for navigation
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button[type="submit"]')
    ]);

    // Verify redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard$/);
  });
});
