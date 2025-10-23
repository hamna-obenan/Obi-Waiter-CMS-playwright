/**
 * Login Failure Test - Wrong Password
 * Tests login failure with correct email but invalid password
 */
import { test, expect } from "@playwright/test";
import PomLogin from "../../object-Page/pomlogin/pomlogin1.js";
import login from "../../Fixtures/login.json" assert { type: "json" };

test("Login fails with correct email but wrong password (TC1003)", async ({ page }) => {
  const loginPage = new PomLogin(page);

  // Step 1: Navigate to the login page
  await loginPage.goto();
  
  // Assert: Verify we are on the login page
  await expect(page).toHaveURL(/.*login/);
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

  // Step 2: Fill in correct email but wrong password
  await loginPage.fillForm(login["TC1003"].Email, login["TC1003"].Password);
  
  // Assert: Verify form fields are filled
  await expect(page.getByRole('textbox', { name: 'Email' })).not.toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).not.toBeEmpty();

  // Step 3: Click the sign-in button
  // Since signinButton() is missing, call the sign-in button directly here.
  await page.getByRole('button', { name: /sign in/i }).click();

  // Assert: Still on login page (no navigation)
  await expect(page).toHaveURL(/.*login/);

  // Assert: Wrong credentials error message is visible
  const errorMsg = page.getByText("auth.WRONG_CREDENTIALS");
  await expect(errorMsg).toBeVisible({ timeout: 5000 });
  await expect(errorMsg).toHaveText("auth.WRONG_CREDENTIALS");
  
  // Assert: Login form is still visible (user can retry)
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  
  console.log('✅ Login failure test completed - wrong password verified');
});