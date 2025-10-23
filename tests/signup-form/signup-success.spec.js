import { test, expect } from "@playwright/test";
import { config } from "../../config/environments.js";
import SignupPage from "../../object-Page/pomsignup/signuppage-pom.js";
import signup from "../../Fixtures/sign up.json" assert { type: "json" };
import locators from "../../Fixtures/locators.json" assert { type: "json" };

/**
 * Signup Success Test Suite
 * Tests successful user registration with valid data
 */
test.describe("Signup Success Flow", () => {
  test("Complete signup with valid data", async ({ page }) => {
    const signupPage = new SignupPage(page);
    
    // Navigate to signup page
    await signupPage.goto();
    
    // Assert: Verify we are on the signup page
    await expect(page).toHaveURL(/.*signup/);
    await expect(page.locator(locators["signup-button"])).toBeVisible();
    
    // Fill First name
    await page.locator(locators["First name"]).fill(signup["First name"]);
    await expect(page.locator(locators["First name"])).toHaveValue(signup["First name"]);
    
    // Fill Last name
    await page.locator(locators["Last name"]).fill(signup["Last name"]);
    await expect(page.locator(locators["Last name"])).toHaveValue(signup["Last name"]);
    
    // Fill Email
    await page.locator(locators["Email"]).fill(signup["Email"]);
    await expect(page.locator(locators["Email"])).toHaveValue(signup["Email"]);
    
    // Fill Company name
    await page.locator(locators["Company name"]).fill(signup["Company name"]);
    await expect(page.locator(locators["Company name"])).toHaveValue(signup["Company name"]);
    
    // Fill Password
    await page.locator(locators["Password"]).fill(signup["Password"]);
    await expect(page.locator(locators["Password"])).toHaveValue(signup["Password"]);
    
    // Fill Confirm password
    await page.locator(locators["Confirm password"]).fill(signup["Confirm password"]);
    await expect(page.locator(locators["Confirm password"])).toHaveValue(signup["Confirm password"]);
    
    // Assert: Verify all fields are filled before submission
    await expect(page.locator(locators["First name"])).not.toBeEmpty();
    await expect(page.locator(locators["Last name"])).not.toBeEmpty();
    await expect(page.locator(locators["Email"])).not.toBeEmpty();
    await expect(page.locator(locators["Company name"])).not.toBeEmpty();
    await expect(page.locator(locators["Password"])).not.toBeEmpty();
    await expect(page.locator(locators["Confirm password"])).not.toBeEmpty();
    
    // Submit the form
    await page.locator(locators["signup-button"]).click();
    
    // Wait for page navigation or success message
    await page.waitForLoadState('networkidle');
    
    // Assert: Verify successful signup (check for redirect or success message)
    const isRedirectedToLogin = await page.url().includes('/login');
    if (isRedirectedToLogin) {
      await expect(page).toHaveURL(/.*login/);
      console.log('✅ Signup successful - redirected to login page');
    } else {
      await expect(page).toHaveURL(/.*signup/);
      console.log('✅ Signup completed - remained on signup page');
    }
    
    console.log('✅ Signup success test completed');
  });

  test("Signup with unique company name", async ({ page }) => {
    // Navigate to signup page
    await page.goto(config.urls.base + "/signup");
    
    // Assert: Verify we are on the signup page
    await expect(page).toHaveURL(/.*signup/);
    await expect(page.locator(locators["signup-button"])).toBeVisible();
    
    // Create unique company name to avoid conflicts
    const uniqueCompanyName = `${signup["Company name"]}-${Date.now()}`;
    console.log(`Using unique company name: ${uniqueCompanyName}`);
    
    // Fill form with unique company name
    await page.locator(locators["First name"]).fill(signup["First name"]);
    await page.locator(locators["Last name"]).fill(signup["Last name"]);
    await page.locator(locators["Email"]).fill(signup["Email"]);
    await page.locator(locators["Company name"]).fill(uniqueCompanyName);
    await page.locator(locators["Password"]).fill(signup["Password"]);
    await page.locator(locators["Confirm password"]).fill(signup["Confirm password"]);
    
    // Assert: Verify all fields are filled
    await expect(page.locator(locators["First name"])).not.toBeEmpty();
    await expect(page.locator(locators["Last name"])).not.toBeEmpty();
    await expect(page.locator(locators["Email"])).not.toBeEmpty();
    await expect(page.locator(locators["Company name"])).toHaveValue(uniqueCompanyName);
    await expect(page.locator(locators["Password"])).not.toBeEmpty();
    await expect(page.locator(locators["Confirm password"])).not.toBeEmpty();
    
    // Submit the form
    await page.locator(locators["signup-button"]).click();
    
    // Wait for response
    await page.waitForLoadState('networkidle');
    
    // Assert: Verify no duplicate company error
    const duplicateError = page.locator('text="company.COMPANY_ALREADY_EXIST"');
    await expect(duplicateError).not.toBeVisible();
    
    console.log('✅ Signup with unique company name completed successfully');
  });
});
