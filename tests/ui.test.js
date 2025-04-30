const { test, expect } = require('@playwright/test');

test.describe('Authentication Flow', () => {
  test('should allow signup and login', async ({ page }) => {
    // Go to signup page
    await page.goto('http://localhost:3000/signup');
    
    // Fill signup form
    await page.fill('input[name="username"]', 'testuser' + Date.now());
    await page.fill('input[name="email"]', 'test' + Date.now() + '@example.com');
    await page.fill('input[name="password"]', 'password123');
    
    // Submit signup form
    await page.click('button[type="submit"]');
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*\/login/);
    
    // Fill login form
    await page.fill('input[name="username"]', 'testuser' + Date.now());
    await page.fill('input[name="password"]', 'password123');
    
    // Submit login form
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    // Should see welcome message
    await expect(page.locator('h1')).toContainText('Welcome');
  });
});
