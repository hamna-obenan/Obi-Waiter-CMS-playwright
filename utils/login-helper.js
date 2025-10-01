import { expect } from "@playwright/test";
import LoginPage from "../object-Page/pomlogin/pomlogin1.js";
import locators from "../Fixtures/locators.json" assert { type: "json" };

/**
 * Reusable Login Helper Function
 * Handles complete login process with error checking
 * @param {Page} page - Playwright page object
 * @param {string} email - User email
 * @param {string} password - User password
 */
export async function performLogin(page, email, password) {
  // Navigate to login page
  await page.goto("https://develop.d20aue3nu6xt33.amplifyapp.com/login");
  await expect(page).toHaveURL(/.*login/);
  
  // Perform login
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);
  await page.locator(locators["signin-button"]).click();
  await page.waitForLoadState('networkidle');
  
  // Check for login errors
  const loginError = await page.locator('text="Internal server error", text="Wrong credentials", text="User not found"').count();
  if (loginError > 0) {
    const errorText = await page.locator('text="Internal server error", text="Wrong credentials", text="User not found"').textContent();
    throw new Error(`Login failed: ${errorText}`);
  }

  // Wait for successful navigation away from login page
  await page.waitForFunction(() => !window.location.href.includes('/login'), { timeout: 15000 });
  console.log('✅ Login completed successfully');
}
