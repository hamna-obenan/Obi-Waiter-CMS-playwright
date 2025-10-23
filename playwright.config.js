// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { config } from './config/environments.js';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: false,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/results.json' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }],
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: config.urls.base,
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video for all tests */
    video: 'on',
    
    /* Global timeout for each action */
    actionTimeout: 10000,
    
    /* Global timeout for navigation */
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    // All Tests - Run all test files
    {
      name: 'all-tests',
      testMatch: '**/*.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: config.urls.base,
      },
    },
  ],

  /* Global setup and teardown */
  // globalSetup: './config/global-setup.js',
  // globalTeardown: './config/global-teardown.js',

  /* Run your local dev server before starting the tests */
  // webServer: config.app.environment === 'development' ? {
  //   command: 'npm run dev',
  //   url: config.urls.base,
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120000,
  // } : undefined,

  /* Test timeout */
  timeout: 60000,
  
  /* Expect timeout */
  expect: {
    timeout: 10000,
  },

  /* Output directory for test results */
  outputDir: 'test-results/',
  
  /* Maximum failures before stopping */
  maxFailures: process.env.CI ? 10 : undefined,
});