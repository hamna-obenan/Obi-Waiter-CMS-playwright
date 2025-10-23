import { test, expect } from "@playwright/test";
import DuplicateMenuWithVenuePOM from "../../object-Page/menu/duplicatmenuwithvenue.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import menu from "../../Fixtures/menu.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Duplicate Menu with Venue Test Suite
 * Tests duplicate menu creation with venue selection: Login → Select Venue → Add Menu → Create → Venue → Fill Data
 * This test verifies that the system properly handles duplicate menu names at venue level and shows appropriate error messages
 */
test("Create Duplicate Menu with Venue - Same Name and Data", async ({ page }) => {
  // Set longer timeout for this test
  test.setTimeout(120000); // 2 minutes
  const duplicateMenuVenuePOM = new DuplicateMenuWithVenuePOM(page);
  
  // Login Process - Using reusable login function
  await performLogin(page, login.TC1001.Email, login.TC1001.Password);

  // Navigate to Create Menu with venue flow: Select Venue → Add Menu → Create → Venue → Fill Data
  console.log('🎯 Creating duplicate menu with venue selection...');
  await duplicateMenuVenuePOM.navigateToCreateMenuWithVenue();

  // Fill menu name using venue-specific data (same as original venue menu)
  console.log('📝 Filling menu name with duplicate venue data...');
  await page.locator(locators["click-on-the-menu-name"]).fill(menu['menuwithvenue-name']);
  await expect(page.locator(locators["click-on-the-menu-name"])).toHaveValue(menu['menuwithvenue-name']);
  console.log('✅ Duplicate venue menu name filled');

  // Upload menu image using venue-specific data
  const imagePath = path.join(__dirname, '../../Fixtures/pictures/' + menu['menuwithvenue-image']);
  await duplicateMenuVenuePOM.uploadMenuImage(imagePath, 'Duplicate Venue Menu image');

  // Save the menu and expect duplicate error
  console.log('💾 Attempting to save duplicate venue menu...');
  await duplicateMenuVenuePOM.saveMenu();
  
  // Verify duplicate menu error handling at venue level
  console.log('🔍 Checking for "Menu already exist in this venue" popup...');
  
  // Check for the specific "Menu already exist in this venue" popup message
  await expect(page.locator(locators["duplicate-menu-alert-venue"])).toHaveText('Menu already exist in this venue');
   console.log('✅ popup detected');
});
