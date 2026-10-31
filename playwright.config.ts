import { defineConfig, devices } from '@playwright/test';

// Source: https://playwright.dev/docs/test-configuration
// Mobile device: https://playwright.dev/docs/emulation
export default defineConfig({
  testDir: 'tests',
  testMatch: /(e2e|a11y)\/.*\.spec\.ts/,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  // Key placement for expect.toHaveScreenshot in config: UNVERIFIED in report 06.
  expect: { toHaveScreenshot: { maxDiffPixels: 100 } },
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-iphone-13', use: { ...devices['iPhone 13'] } },
    {
      name: 'tablet-768',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
    },
  ],
  // Test the production build (Next.js Playwright guide).
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
