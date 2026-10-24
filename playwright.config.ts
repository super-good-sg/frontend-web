import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  expect: {
    // SIE-100: tolerance for the design-reference visual-diff checks in
    // e2e/visual-regression.spec.ts. 2% is a starting point — revisit if it
    // proves too loose (lets real drift through) or too tight (flakes on
    // font antialiasing).
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
