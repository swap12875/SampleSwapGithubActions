const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 2,
  workers: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 15000,
    baseURL: 'http://localhost:9000',
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
