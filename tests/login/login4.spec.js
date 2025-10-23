/**
 * Login Failure Test - Both Email and Password Wrong
 * Tests login failure with invalid email and invalid password
 */
import { test, expect } from "@playwright/test";
import PomLogin from "../../object-Page/pomlogin/pomlogin1.js";
import login from "../../Fixtures/login.json" assert { type: "json" };

test("Login fails with wrong email and wrong password (TC1004)", async ({ page }) => {
  const loginPage = new PomLogin(page);

  // Step 1: Navigate to the login page
  await loginPage.goto();
  
  // Assert: Verify we are on the login page
  await expect(page).toHaveURL(/.*login/);
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

  // Step 2: Fill in wrong email and wrong password
  await loginPage.fillForm(login["TC1004"].Email, login["TC1004"].Password);
  
  // Assert: Verify form fields are filled
  await expect(page.getByRole('textbox', { name: 'Email' })).not.toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).not.toBeEmpty();

  // Step 3: Click the sign-in button
  // Since signinButton() is missing, call the sign-in button directly here.
  await page.getByRole('button', { name: /sign in/i }).click();

  // Assert: Still on login page (no navigation)
  await expect(page).toHaveURL(/.*login/);

  // Assert: User not found error message is visible
  const errorMsg = page.getByText("user.USER_NOT_FOUND");
  // await expect(errorMsg).toBeVisible({ timeout: 5000 });
  await expect(errorMsg).toHaveText("user.USER_NOT_FOUND");
  
  // Assert: Login form is still visible (user can retry)
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  
  console.log('✅ Login failure test completed - both credentials wrong verified');
});