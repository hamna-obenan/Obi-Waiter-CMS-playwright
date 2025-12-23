import { test, expect } from '@playwright/test';
import login from '../../Fixtures/login.json' assert { type: "json" };
import { performLogin } from '../../utils/login-helper.js';
import locators from '../../Fixtures/locators.json' assert {type : "json"};
import path from 'path';

test('test', async ({ page }) => {
  // Step 1: Perform login with test credentials
  await performLogin(page, login.TC1001.Email, login.TC1001.Password);
  // Assert: Verify that profile picture is visible after successful login
  await expect(page.locator(locators["profile-picture"])).toBeVisible();
  
  // Step 2: Click on profile picture to open user menu
  await page.locator(locators["profile-picture"]).click();
  // Assert: Verify that user management menu item is visible in the dropdown
  await expect(page.locator(locators["user-managment"])).toBeVisible();
  await page.waitForTimeout(2000);
  
  // Step 3: Navigate to User Management page
  await page.locator(locators["user-managment"]).click();
  await page.waitForTimeout(2000);
  await page.pause();

  // Step 4: Click on the Users tab
  // Assert: Verify that the user tab is visible before clicking
  await expect(page.locator(locators['user-tab'])).toBeVisible();
  await page.locator(locators['user-tab']).click();
  // Assert: Verify that the user tab is selected/active
  await expect(page.locator(locators['user-tab'])).toHaveAttribute('aria-selected', 'true');
  await page.waitForTimeout(2000);
  
  // Step 5: Click Add User button to open the user creation form
  // Assert: Verify that the add user button is visible before clicking
  await expect(page.locator(locators['add-user-button'])).toBeVisible();
  await page.locator(locators['add-user-button']).click();
  // Assert: Verify that the first name input field is visible in the form
  await expect(page.locator(locators['First name'])).toBeVisible();
  await page.waitForTimeout(2000);
  
  // Step 6: Fill in the First Name field
  await page.locator(locators['First name']).click();
  await page.waitForTimeout(2000);
  await page.locator(locators['First name']).fill('User');
  // Assert: Verify that the first name field contains the entered value
  await expect(page.locator(locators['First name'])).toHaveValue('User');
  await page.waitForTimeout(2000);
  
  // Step 7: Fill in the Last Name field
  // Assert: Verify that the last name field is visible before filling
  await expect(page.locator(locators['Last name'])).toBeVisible();
  await page.locator(locators['Last name']).click();
  await page.waitForTimeout(2000);
  await page.locator(locators['Last name']).fill('Admin');
  // Assert: Verify that the last name field contains the entered value
  await expect(page.locator(locators['Last name'])).toHaveValue('Admin');
  await page.waitForTimeout(2000);
  
  // Step 8: Fill in the Email field
  // Assert: Verify that the email field is visible before filling
  await expect(page.locator(locators['Email'])).toBeVisible();
  await page.locator(locators['Email']).click();
  await page.waitForTimeout(2000);
  await page.locator(locators['Email']).fill('hamna20@gmail.com');
  // Assert: Verify that the email field contains the entered value
  await expect(page.locator(locators['Email'])).toHaveValue('hamna20@gmail.com');
  await page.waitForTimeout(2000);
  
  // Step 9: Fill in the Password field
  // Assert: Verify that the password field is visible before filling
  await expect(page.locator(locators['Password'])).toBeVisible();
  await page.locator(locators['Password']).click();
  await page.waitForTimeout(2000);
  await page.locator(locators['Password']).fill('123456');
  // Assert: Verify that the password field contains the entered value
  await expect(page.locator(locators['Password'])).toHaveValue('123456');
  await page.waitForTimeout(2000);
  
  // Step 10: Select role from dropdown
  // Assert: Verify that the role dropdown is visible before clicking
  await expect(page.locator(locators['select-role-dropdown'])).toBeVisible();
  await page.locator(locators['select-role-dropdown']).click();
  await page.waitForTimeout(2000);
  await page.getByRole('option', { name: 'Super Admin' }).click();
  // Assert: Verify that the selected role "Super Admin" is displayed in the dropdown
  await expect(page.locator(locators['select-role-dropdown'])).toHaveValue('Super admin');
  await page.waitForTimeout(2000);
  
  // Step 11: Click Save button to create the user
  // Assert: Verify that the save button is visible and enabled before clicking
  await expect(page.locator(locators['save-button'])).toBeVisible();
  await expect(page.locator(locators['save-button'])).toBeEnabled();
  await page.waitForTimeout(5000);
  await page.locator(locators['save-button']).click({force:true});
  // Assert: Verify that success message "User created successfully" is displayed
//   await expect(page.locator('text=User created successfully')).toBeVisible();
await page.pause();

  await page.waitForTimeout(5000);
});