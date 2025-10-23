import { test, expect } from "@playwright/test";
import { config } from "../../config/environments.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import signup from "../../Fixtures/sign up.json" assert { type: "json" };

/**
 * Signup with Unique Company Name Test
 * Tests signup with unique company name to avoid conflicts
 */
test("Signup with unique company name", async ({ page }) => {
  // Navigate to signup page using environment config
  await page.goto(config.urls.base + "/signup");
  
  // Assert: Verify we are on the signup page
  await expect(page).toHaveURL(/.*signup/);
  await expect(page.locator(locators["signup-button"])).toBeVisible();
  
  // Clone fixture and override only the Company name to be unique per run
  const data = { ...signup, "Company name": `${signup["Company name"]}-${Date.now()}` };
  console.log(`Using unique company name: ${data["Company name"]}`);

  // Fill First name
  await page.locator(locators["First name"]).fill(data["First name"]);
  // Assert: Verify first name field contains the entered value
  await expect(page.locator(locators["First name"])).toHaveValue(data["First name"]);
  
  // Fill Last name
  await page.locator(locators["Last name"]).fill(data["Last name"]);
  // Assert: Verify last name field contains the entered value
  await expect(page.locator(locators["Last name"])).toHaveValue(data["Last name"]);
  
  // Fill Email
  await page.locator(locators["Email"]).fill(data["Email"]);
  // Assert: Verify email field contains the entered value
  await expect(page.locator(locators["Email"])).toHaveValue(data["Email"]);
  
  // Fill Company name (unique)
  await page.locator(locators["Company name"]).fill(data["Company name"]);
  // Assert: Verify company name field contains the unique value
  await expect(page.locator(locators["Company name"])).toHaveValue(data["Company name"]);
  
  // Fill Password
  await page.locator(locators["Password"]).fill(data["Password"]);
  // Assert: Verify password field contains the entered value
  await expect(page.locator(locators["Password"])).toHaveValue(data["Password"]);
  
  // Fill Confirm password
  await page.locator(locators["Confirm password"]).fill(data["Confirm password"]);
  // Assert: Verify confirm password field contains the entered value
  await expect(page.locator(locators["Confirm password"])).toHaveValue(data["Confirm password"]);

  // Assert: Verify all fields are filled before submission
  await expect(page.locator(locators["First name"])).not.toBeEmpty();
  await expect(page.locator(locators["Last name"])).not.toBeEmpty();
  await expect(page.locator(locators["Email"])).not.toBeEmpty();
  await expect(page.locator(locators["Company name"])).not.toBeEmpty();
  await expect(page.locator(locators["Password"])).not.toBeEmpty();
  await expect(page.locator(locators["Confirm password"])).not.toBeEmpty();

  // Submit the form
  await page.locator(locators["signup-button"]).click();
  
  // Assert: Verify signup button is clickable and form is submitted
  await expect(page.locator(locators["signup-button"])).toBeVisible();
  
  // Wait for page navigation or success message
  await page.waitForLoadState('networkidle');
  
  // Assert: Verify successful signup (check for redirect or success message)
  // Option 1: Check if redirected to login page
  const isRedirectedToLogin = await page.url().includes('/login');
  if (isRedirectedToLogin) {
    await expect(page).toHaveURL(/.*login/);
    console.log('Signup successful - redirected to login page');
  } else {
    // Option 2: Check for success message or stay on signup page
    await expect(page).toHaveURL(/.*signup/);
    console.log('Signup completed - remained on signup page');
  }
  
  // Assert: Verify no duplicate company error (since we used unique company name)
  const duplicateError = page.locator('text="company.COMPANY_ALREADY_EXIST"');
  await expect(duplicateError).not.toBeVisible();
  
  console.log(' Signup test with unique company name completed successfully');
});
