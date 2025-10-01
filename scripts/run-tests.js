#!/usr/bin/env node
// Test Runner Script for Obi-Waiter CMS
// Supports different environments and test types

import { execSync } from 'child_process';
import { config } from '../config/environments.js';

const args = process.argv.slice(2);
const environment = args[0] || 'development';
const testType = args[1] || 'all';

// Set environment
process.env.NODE_ENV = environment;

console.log(`🚀 Running ${testType} tests for ${environment} environment`);
console.log(`Base URL: ${config.urls.base}`);
console.log(`API URL: ${config.urls.api}`);

// Test execution commands
const testCommands = {
  smoke: 'npx playwright test --project=smoke-chromium',
  regression: 'npx playwright test --project=regression-chromium',
  mobile: 'npx playwright test --project=mobile-chrome',
  api: 'npx playwright test --project=api-tests',
  visual: 'npx playwright test --project=visual-tests',
  all: 'npx playwright test',
  'all-browsers': 'npx playwright test --project=regression-chromium --project=regression-firefox --project=regression-webkit',
};

// Get the command to execute
const command = testCommands[testType];

if (!command) {
  console.error(`❌ Unknown test type: ${testType}`);
  console.log('Available test types: smoke, regression, mobile, api, visual, all, all-browsers');
  process.exit(1);
}

try {
  console.log(`📋 Executing: ${command}`);
  
  // Execute the test command
  execSync(command, { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: environment }
  });
  
  console.log('✅ Tests completed successfully');
  
} catch (error) {
  console.error('❌ Tests failed:', error.message);
  process.exit(1);
}
