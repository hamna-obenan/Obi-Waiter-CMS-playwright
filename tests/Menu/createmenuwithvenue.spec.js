import { test, expect } from "@playwright/test";
import MenuVenueCreatePOM from "../../object-Page/menu/menuvenuecreate.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import menu from "../../Fixtures/menu.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Menu Creation with Venue Test Suite
 * Tests menu creation with venue selection: Login → Select Venue → Add Menu → Create → Venue → Fill Data
 * Includes name and image upload
 */
test("Create Menu with Venue - Name and Image Upload", async ({ page }) => {
  // Set longer timeout for this test
  test.setTimeout(120000); // 2 minutes
  const menuVenuePOM = new MenuVenueCreatePOM(page);
  
  // Login Process - Using reusable login function
  await performLogin(page, login.TC1001.Email, login.TC1001.Password);

  // Navigate to Create Menu with venue flow: Select Venue → Add Menu → Create → Venue → Fill Data
  console.log('🎯 Creating menu with venue selection...');
  await menuVenuePOM.navigateToCreateMenuWithVenue();

  // Fill menu name using venue-specific data
  console.log('📝 Filling menu name...');
  await page.locator(locators["click-on-the-menu-name"]).fill(menu['menuwithvenue-name']);
  await expect(page.locator(locators["click-on-the-menu-name"])).toHaveValue(menu['menuwithvenue-name']);
  console.log('✅ Menu name filled');

  // Upload menu image using venue-specific data
  const imagePath = path.join(__dirname, '../../Fixtures/pictures/' + menu['menuwithvenue-image']);
  await menuVenuePOM.uploadMenuImage(imagePath, 'Menu with venue image');

  // Save the menu
  await menuVenuePOM.saveMenu();
  
  // Verify menu creation
  const isCreated = await menuVenuePOM.verifyMenuCreation();
  expect(isCreated).toBe(true);
});
