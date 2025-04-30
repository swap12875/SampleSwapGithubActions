const { defineConfig } = require('@playwright/test');

// Determine if we're running in CI
const CI = Boolean(process.env.CI);

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 2,
  workers: 1,
  use: {
    headless: true,
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    viewport: { width: 1280, height: 720 },
    video: CI ? 'retain-on-failure' : 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 15000,
    baseURL: 'http://localhost:9000',
    trace: CI ? 'retain-on-failure' : 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ],
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
});
