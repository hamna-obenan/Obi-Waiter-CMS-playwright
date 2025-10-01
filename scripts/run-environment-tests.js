#!/usr/bin/env node
// Environment-Specific Test Runner
// Supports different environments and test types with POM integration

import { execSync } from 'child_process';
import { config } from '../config/environments.js';

const args = process.argv.slice(2);
const environment = args[0] || 'development';
const testType = args[1] || 'all';

// Set environment
process.env.NODE_ENV = environment;

console.log(`🚀 Running ${testType} tests for ${environment} environment`);
console.log(`🌍 Environment: ${config.app.environment}`);
console.log(`🔗 Base URL: ${config.urls.base}`);
console.log(`🔗 Login URL: ${config.urls.login}`);
console.log(`🔗 Venue URL: ${config.urls.venue}`);
console.log(`⏱️ Timeout: ${config.playwright.timeout}ms`);
console.log(`🔄 Retries: ${config.playwright.retries}`);
console.log(`👥 Workers: ${config.playwright.workers}`);

// Test execution commands with environment integration
const testCommands = {
  smoke: `npx playwright test --project=smoke-chromium --base-url=${config.urls.base}`,
  regression: `npx playwright test --project=regression-chromium --base-url=${config.urls.base}`,
  mobile: `npx playwright test --project=mobile-chrome --base-url=${config.urls.base}`,
  api: `npx playwright test --project=api-tests --base-url=${config.urls.api}`,
  visual: `npx playwright test --project=visual-tests --base-url=${config.urls.base}`,
  venue: `npx playwright test tests/Venue/ --base-url=${config.urls.base}`,
  login: `npx playwright test tests/login/ --base-url=${config.urls.base}`,
  all: `npx playwright test --base-url=${config.urls.base}`,
  'all-browsers': `npx playwright test --project=regression-chromium --project=regression-firefox --project=regression-webkit --base-url=${config.urls.base}`,
};

// Get the command to execute
const command = testCommands[testType];

if (!command) {
  console.error(`❌ Unknown test type: ${testType}`);
  console.log('Available test types: smoke, regression, mobile, api, visual, venue, login, all, all-browsers');
  process.exit(1);
}

// Environment-specific options
const envOptions = {
  development: {
    headless: false,
    video: true,
    screenshot: true,
    trace: true,
  },
  staging: {
    headless: true,
    video: true,
    screenshot: true,
    trace: true,
  },
  production: {
    headless: true,
    video: false,
    screenshot: true,
    trace: true,
  },
};

const options = envOptions[environment] || envOptions.development;

// Build final command with environment options
const finalCommand = `${command} --headed=${!options.headless} --video=${options.video} --screenshot=${options.screenshot} --trace=${options.trace}`;

try {
  console.log(`📋 Executing: ${finalCommand}`);
  console.log(`🔧 Environment options:`, options);
  
  // Execute the test command
  execSync(finalCommand, { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: environment,
      PLAYWRIGHT_BASE_URL: config.urls.base,
      PLAYWRIGHT_API_URL: config.urls.api,
      PLAYWRIGHT_LOGIN_URL: config.urls.login,
      PLAYWRIGHT_VENUE_URL: config.urls.venue,
    }
  });
  
  console.log('✅ Tests completed successfully');
  
  // Generate reports
  console.log('📊 Generating test reports...');
  execSync('npx playwright show-report', { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Tests failed:', error.message);
  
  // Generate failure reports
  console.log('📊 Generating failure reports...');
  try {
    execSync('npx playwright show-report', { stdio: 'inherit' });
  } catch (reportError) {
    console.error('❌ Report generation failed:', reportError.message);
  }
  
  process.exit(1);
}
