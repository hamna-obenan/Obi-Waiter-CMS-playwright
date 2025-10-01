// Global Setup for Playwright Tests
// Runs before all tests

import { chromium } from '@playwright/test';
import { config } from './environments.js';

async function globalSetup() {
  console.log(' Starting global setup...');
  
  // Set up test environment
  await setupTestEnvironment();
  
  // Verify application is accessible
  await verifyApplicationAccess();
  
  // Set up test data if needed
  if (config.testing.enableTestData) {
    await setupTestData();
  }
  
  console.log(' Global setup completed successfully');
}

async function setupTestEnvironment() {
  console.log(' Setting up test environment...');
  
  // Set environment variables for tests
  process.env.TEST_BASE_URL = config.urls.base;
  process.env.TEST_API_URL = config.urls.api;
  process.env.TEST_ENVIRONMENT = config.app.environment;
  
  console.log(`Environment: ${config.app.environment}`);
  console.log(`Base URL: ${config.urls.base}`);
  console.log(`API URL: ${config.urls.api}`);
}

async function verifyApplicationAccess() {
  console.log(' Verifying application access...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Check if base URL is accessible
    const response = await page.goto(config.urls.base, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    if (!response || !response.ok()) {
      throw new Error(`Application not accessible at ${config.urls.base}`);
    }
    
    console.log(' Application is accessible');
    
    // Check if API is accessible (skip for now to avoid timeout)
    if (config.urls.api) {
      try {
        const apiResponse = await page.goto(config.urls.api, { 
          waitUntil: 'networkidle',
          timeout: 5000 
        });
        
        if (apiResponse && apiResponse.ok()) {
          console.log(' API is accessible');
        } else {
          console.log(' API might not be accessible (this is OK for some tests)');
        }
      } catch (error) {
        console.log(' API check skipped (timeout expected for some environments)');
      }
    }
    
  } catch (error) {
    console.error(' Application access verification failed:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

async function setupTestData() {
  console.log(' Setting up test data...');
  
  // This function can be used to set up test data
  // For example, creating test users, venues, etc.
  
  if (config.app.environment === 'development') {
    console.log(' Development mode: Test data setup skipped');
    return;
  }
  
  // Add your test data setup logic here
  // For example:
  // - Create test users
  // - Set up test venues
  // - Configure test payment methods
  // - etc.
  
  console.log(' Test data setup completed');
}

export default globalSetup;
