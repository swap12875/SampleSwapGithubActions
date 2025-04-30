const { test, expect } = require('@playwright/test');

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure the page is ready
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should allow signup and login', async ({ page }) => {
    // Go to signup page
    await page.goto('/signup');
    await page.waitForLoadState('networkidle');

    // Generate unique username
    const username = `testuser_${Date.now()}`;
    const email = `test_${Date.now()}@example.com`;
    const password = 'password123';

    // Fill signup form
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="email"]', email);
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
