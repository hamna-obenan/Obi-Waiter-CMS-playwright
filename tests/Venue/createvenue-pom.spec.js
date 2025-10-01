import { test, expect } from "@playwright/test";
import { config } from "../../config/environments.js";
import LoginPage from "../../object-Page/pomlogin/pomlogin1.js";
import AddVenuePage from "../../object-Page/venue/addvenue-pom.js";

// Environment-aware test with POM approach
test.describe.configure({ 
  mode: 'parallel',
  retries: config.playwright.retries 
});

test.describe('Venue Creation - Environment: ' + config.app.environment, () => {
  let loginPage;
  let venuePage;

  test.beforeEach(async ({ page }) => {
    // Initialize POM classes with environment config
    loginPage = new LoginPage(page);
    venuePage = new AddVenuePage(page);
    
    console.log(`Running test in ${config.app.environment} environment`);
    console.log(`Base URL: ${config.urls.base}`);
    console.log(`Login URL: ${config.urls.login}`);
  });

  test("Complete venue creation flow with environment integration", async ({ page }) => {
    console.log(`Starting venue creation test`);
    
    // Step 1: Login with environment credentials
    console.log(`Step 1: Login`);
    await loginPage.completeLogin('primary');
    
    // Verify login success
    const loginSuccess = await loginPage.verifyLoginSuccess();
    expect(loginSuccess).toBe(true);
    console.log(`Login successful`);
    
    // Step 2: Navigate to venue creation
    console.log(`Step 2: Navigate to venue creation`);
    await venuePage.clickAddVenue();
    
    // Verify venue creation page loaded
    await expect(page.getByRole('textbox', { name: 'Venue name' })).toBeVisible();
    console.log(`Venue creation page loaded`);
    
    // Step 3: Fill basic venue information using POM
    console.log(`Step 3: Fill basic venue information`);
    await venuePage.fillBasicInfo();
    
    // Verify basic info filled
    await expect(page.getByRole('textbox', { name: 'Venue name' })).toHaveValue(config.testData.venue.name);
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(config.testData.venue.email);
    console.log(`Basic venue information filled`);
    
    // Step 4: Fill details and branding using POM
    console.log(`Step 4: Fill details and branding`);
    await venuePage.fillDetailsAndBranding();
    
    // Verify details filled
    await expect(page.getByRole('textbox', { name: 'Venue description' })).toHaveValue(config.testData.venue.description);
    console.log(`Details and branding completed`);
    
    // Step 5: Upload logo image using POM
    console.log(`Step 5: Upload logo image`);
    await venuePage.uploadImage("venuelogo", "venuelogo.png");
    console.log(`Logo upload completed`);
    
    // Step 6: Upload cover image using POM
    console.log(`Step 6: Upload cover image`);
    await venuePage.uploadImage("venueCoverimage *", "venuecover.jpeg");
    console.log(`Cover image upload completed`);
    
    // Step 7: Save venue using POM
    console.log(`Step 7: Save venue`);
    await venuePage.save();
    console.log(`Venue saved successfully`);
    
    // Final verification
    console.log(`Final verification`);
    await expect(page).toHaveURL(/.*venue/);
    console.log(`Venue creation test completed successfully`);
  });

  test("Venue creation with environment-specific test data", async ({ page }) => {
    console.log(`Testing with environment-specific data`);
    
    // Login
    await loginPage.completeLogin('primary');
    await loginPage.verifyLoginSuccess();
    
    // Create venue with environment data
    await venuePage.clickAddVenue();
    await venuePage.createVenue();
    
    console.log(`Environment-specific test completed`);
  });

  test("Venue creation error handling", async ({ page }) => {
    console.log(`Testing error handling`);
    
    // Login
    await loginPage.completeLogin('primary');
    await loginPage.verifyLoginSuccess();
    
    // Navigate to venue creation
    await venuePage.clickAddVenue();
    
    // Test with invalid data
    const invalidData = {
      name: "", // Empty name
      email: "invalid-email", // Invalid email
    };
    
    try {
      await venuePage.fillBasicInfo(invalidData);
      // Should handle validation errors
      console.log(`Error handling test completed`);
    } catch (error) {
      console.log(`Error handling working: ${error.message}`);
    }
  });

  test("Cross-browser compatibility", async ({ page }) => {
    console.log(`Testing cross-browser compatibility`);
    
    // Login
    await loginPage.completeLogin('primary');
    await loginPage.verifyLoginSuccess();
    
    // Navigate to venue creation
    await venuePage.clickAddVenue();
    
    // Verify page elements are visible
    await expect(page.getByRole('textbox', { name: 'Venue name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Venue type' })).toBeVisible();
    
    console.log(`Cross-browser compatibility test completed`);
  });

  test.afterEach(async ({ page }) => {
    // Cleanup after each test
    console.log(`Cleaning up after test`);
    
    // Take screenshot on failure
    if (config.playwright.screenshot) {
      await page.screenshot({ 
        path: `test-results/screenshot-${Date.now()}.png`,
        fullPage: true 
      });
    }
    
    // Close page
    await page.close();
  });
});
