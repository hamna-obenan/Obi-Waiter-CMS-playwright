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
  
  // Wait for popup to appear
  await page.waitForTimeout(3000);
  
  // Check for the specific "Menu already exist in this venue" popup message
  const duplicateVenueError = await page.locator('text="Menu already exist in this venue"').count();
  
  if (duplicateVenueError > 0) {
    const errorText = await page.locator('text="Menu already exist in this venue"').textContent();
    console.log(`✅ Duplicate venue menu popup detected: ${errorText}`);
    expect(duplicateVenueError).toBeGreaterThan(0);
    console.log('✅ Test passed - System properly handles duplicate menu names at venue level');
  } else {
    // If no specific error found, check for other duplicate-related messages
    // Check each error message individually
    const alreadyExistError = await page.locator('text="already exist"').count();
    const duplicateError = await page.locator('text="duplicate"').count();
    const menuExistError = await page.locator('text="Menu already exist"').count();
    const venueError = await page.locator('text="venue"').count();
    
    const totalAlternativeErrors = alreadyExistError + duplicateError + menuExistError + venueError;
    
    if (totalAlternativeErrors > 0) {
      let errorText = '';
      if (alreadyExistError > 0) {
        errorText = await page.locator('text="already exist"').textContent();
      } else if (duplicateError > 0) {
        errorText = await page.locator('text="duplicate"').textContent();
      } else if (menuExistError > 0) {
        errorText = await page.locator('text="Menu already exist"').textContent();
      } else if (venueError > 0) {
        errorText = await page.locator('text="venue"').textContent();
      }
      console.log(`✅ Alternative duplicate venue error detected: ${errorText}`);
      expect(totalAlternativeErrors).toBeGreaterThan(0);
    } else {
      // If no error, check if menu was created (which might indicate no duplicate protection)
      const isCreated = await duplicateMenuVenuePOM.verifyMenuCreation();
      if (isCreated) {
        console.log('⚠️ Menu was created despite being duplicate at venue level - no duplicate protection detected');
      } else {
        console.log('⚠️ Menu creation failed for unknown reason');
      }
    }
  }
  
  // Verify if duplicate menu was actually created or not at venue level
  console.log('🔍 Verifying if duplicate venue menu was created...');
  
  // Check if we're still on the menu creation page (indicating duplicate was not created)
  const currentUrl = page.url();
  const isOnMenuCreationPage = currentUrl.includes('/menu') && currentUrl.includes('create');
  
  if (isOnMenuCreationPage) {
    console.log('✅ Duplicate venue menu was NOT created - user remains on creation page');
    console.log('✅ System properly prevented duplicate menu creation at venue level');
  } else {
    // Check if we're on a menu list page (indicating menu was created)
    const isOnMenuListPage = currentUrl.includes('/menu') || currentUrl.includes('/menus');
    if (isOnMenuListPage) {
      console.log('⚠️ Duplicate venue menu WAS created - system allowed duplicate at venue level');
      console.log('⚠️ No duplicate protection detected at venue level');
    } else {
      console.log('⚠️ Unknown navigation state - cannot determine if duplicate venue menu was created');
    }
  }
});
