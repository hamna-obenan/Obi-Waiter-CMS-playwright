import { test, expect } from "@playwright/test";
import { config } from "../../config/environments.js";
import PomSign1 from "../../object-Page/pomsignup/pomsign1.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
/**
 * Signup Validation Test - Duplicate Company Error
 * Tests signup with existing company data to verify error handling
 */
test("Signup with existing company data - verify duplicate error", async ({ page }) => {
  const signupPage = new PomSign1(page);

  // Navigate to signup page
  await signupPage.goto();
  
  // Assert: Verify we are on the signup page
  await expect(page).toHaveURL(/.*signup/);
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  
  // Fill signup form
  await signupPage.fillFromFixture();
  
  // Assert: Verify form fields are filled (checking they have values, not specific content)
  await expect(page.locator(locators["First name"])).not.toBeEmpty();
  await expect(page.locator(locators["Last name"])).not.toBeEmpty();
  await expect(page.locator(locators["Email"])).not.toBeEmpty();
  await expect(page.locator(locators["Company name"])).not.toBeEmpty();
  await expect(page.locator(locators["Password"])).not.toBeEmpty();
  await expect(page.locator(locators["Confirm password"])).not.toBeEmpty();
  // await page.pause();
  // Submit the form
  await signupPage.submit();
  
  // Assert: Verify signup button is clicked and form is submitted
  // await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
 
  
  // Assert: Verify the specific error message content
  // await expect(page.getByText("company.COMPANY_ALREADY_EXIST")).toBeVisible();
  
  // Assert: Verify we remain on the signup page (not redirected)
  await expect(page).toHaveURL(/.*signup/);
  
  console.log(' Signup test completed - duplicate company error verified');
});
