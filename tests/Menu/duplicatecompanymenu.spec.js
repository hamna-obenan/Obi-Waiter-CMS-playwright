//duplicate menu creaate successfully



import { test, expect } from "@playwright/test";
import DuplicateCompanyMenuPOM from "../../object-Page/menu/duplicatecompanymenu.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import menu from "../../Fixtures/menu.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 
 * Duplicate Company Menu Test Suite
 * Tests duplicate menu creation with same name and data: Login → Select Venue → Add Menu → Create → Company → Fill Data
 * This test verifies that the system properly handles duplicate menu names and shows appropriate error messages
 */
test("Create Duplicate Company Menu - Same Name and Data", async ({ page }) => {
  // Set longer timeout for this test
  test.setTimeout(120000); // 2 minutes
  const duplicateCompanyMenuPOM = new DuplicateCompanyMenuPOM(page);
  
  // Login Process - Using reusable login function
  await performLogin(page, login.TC1001.Email, login.TC1001.Password);

  // Navigate to Create Menu with correct flow: Select Venue → Add Menu → Create → Company → Fill Data
  console.log('🎯 Creating duplicate menu with same data...');
  await duplicateCompanyMenuPOM.navigateToCreateMenu();

  const minNum = 1;
  const maxNum = 1000;
  const randomNumber = await duplicateCompanyMenuPOM.getRandomIntInclusive(minNum, maxNum);
  const menuName = menu['menu-name'];
  console.log('✅ Menu name generated successfully: ' + menuName);
await page.pause();

  // Fill menu name with same data as original test using locators
  console.log('📝 Filling menu name with duplicate data...');
  await page.locator(locators["click-on-the-menu-name"]).fill(menuName);
  await expect(page.locator(locators["click-on-the-menu-name"])).toHaveValue(menuName);
  console.log('✅ Duplicate menu name filled');

  // Upload menu image with same data as original test
  const imagePath = path.join(__dirname, '../../Fixtures/pictures/' + menu['menu-image']);
  await duplicateCompanyMenuPOM.uploadMenuImage(imagePath, 'Duplicate Menu image');

  // Save the menu and expect duplicate error
  console.log('💾 Attempting to save duplicate menu...');
  await duplicateCompanyMenuPOM.saveMenu();
  
  // Verify duplicate menu error handling
  console.log('🔍 Checking for "Master menu already exist" popup...');
  
  // // Wait for popup to appear
  // await page.waitForTimeout(3000);
  
  // Check for the specific "Master menu already exist" popup message
  const duplicateError = await page.locator(locators["duplicate-menu-alert"]).isVisible();
  
  // Assert that the popup is visible and log success message
  expect(duplicateError).toBe(true);
  if (duplicateError) {
    console.log('✅ popup detected');
  }
 
});
