import { test, expect } from '@playwright/test';
import login from '../../Fixtures/login.json' assert { type: "json" };
import { performLogin } from '../../utils/login-helper.js';
import locators from '../../Fixtures/locators.json' assert {type : "json"};

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
  // Assert: Verify that role tab is visible on the User Management page
  await expect(page.locator(locators["role-tab"])).toBeVisible();
  await page.waitForTimeout(2000);
  
  // Step 4: Click on the Roles tab
  await page.locator(locators["role-tab"]).click();
  // Assert: Verify that the role tab is selected/active
  await expect(page.locator(locators["role-tab"])).toHaveAttribute('aria-selected', 'true');
  await page.waitForTimeout(2000);
  
  // Step 5: Click Add Role button to open the role creation form
  await page.locator(locators['add-role-button']).click();
  // Assert: Verify that the role name input field is visible in the form
  await expect(page.locator(locators["role-name"])).toBeVisible();
  await page.waitForTimeout(2000);
  
  // Step 6: Click on the role name input field to focus it
  await page.locator(locators["role-name"]).click();
  // Assert: Verify that the role name field is focused and ready for input
  await expect(page.locator(locators["role-name"])).toBeFocused();
  await page.waitForTimeout(2000);
  
  // Step 7: Enter role name "Super admin" in the input field
  await page.locator(locators["role-name"]).fill('Super admin');
  // Assert: Verify that the role name field contains the entered value
  await expect(page.locator(locators["role-name"])).toHaveValue('Super admin');
  await page.waitForTimeout(2000);
  
  // Step 8: Click the "Select all" checkbox to select all role permissions
  await page.locator(locators["select-all-role"]).click();
  // Assert: Verify that the "Select all" checkbox is checked
  await expect(page.locator(locators["select-all-role"])).toBeChecked();
  await page.waitForTimeout(2000);
  
  // Step 9: Click Save button to create the role
  await page.getByRole('button', { name: 'Save' }).click();
  // Assert: Verify that success message "Role created successfully" is displayed
  await expect(page.locator('text=Role created successfully')).toBeVisible();
});