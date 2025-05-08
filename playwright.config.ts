import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

const PORT = process.env.PORT || 3000;

const baseURL =
  process.env.PLAYWRIGHT_TEST_BASE_URL || `http://127.0.0.1:${PORT}`;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: path.join(__dirname, "e2e"),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retry-with-trace",

    extraHTTPHeaders: {
      "x-vercel-skip-toolbar": "1",
    },
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "setup",
    //   testMatch: /.*\.setup\.ts/,
    // },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  ...(!process.env.CI && {
    webServer: {
      command: "npm run dev",
      url: baseURL,
      timeout: 120 * 1000,
      reuseExistingServer: true,
      ignoreHTTPSErrors: true,
      stdout: "ignore",
      stderr: "pipe",
    },
  }),
});
