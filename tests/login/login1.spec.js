/**
 * Login Success Test - Valid Credentials
 * Tests successful login with valid email and password
 */
import { test, expect } from "@playwright/test";
import PomLogin from "../../object-Page/pomlogin/pomlogin1.js";
import login from "../../Fixtures/login.json" assert { type: "json" };

test("Login with valid credentials (TC1001)", async ({ page }) => {
  const loginPage = new PomLogin(page);
  
  // Step 1: Navigate to the login page
  await loginPage.goto();
  
  // Assert: Verify we are on the login page
  await expect(page).toHaveURL(/.*login/);
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  
  // Step 2: Fill in email and password from fixtures
  await loginPage.loginById("TC1001");
  
  // Assert: Verify form fields are filled
  await expect(page.getByRole('textbox', { name: 'Email' })).not.toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).not.toBeEmpty();
  
  // Step 3: Click the sign-in button
  await loginPage.signinButton();
  
  // Assert: Verify successful login (redirected away from login page)
  await expect(page).not.toHaveURL(/.*login/);
  
  // Assert: Verify we are on the dashboard or main page
  await page.waitForLoadState('networkidle');
  
  console.log('✅ Login test completed successfully - valid credentials');
});
