import { test, expect } from "@playwright/test";
import MenuPOM from "../../object-Page/menu/menupom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import menu from "../../Fixtures/menu.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Menu Creation Test Suite
 * Tests menu creation with correct flow: Login → Select Venue → Add Menu → Create → Company → Fill Data
 * Includes name and image upload
 */
test("Create Menu - Name and Image Upload", async ({ page }) => {
  // Set longer timeout for this test
  test.setTimeout(120000); // 2 minutes
  const menuPOM = new MenuPOM(page);
  
  // Login Process - Using reusable login function
  await performLogin(page, login.TC1001.Email, login.TC1001.Password);

  // Navigate to Create Menu with correct flow: Select Venue → Add Menu → Create → Company → Fill Data
  console.log('🎯 Creating menu with correct flow...');
  await menuPOM.navigateToCreateMenu();

  // Fill menu name
  console.log('📝 Filling menu name...');
  await page.locator(locators["click-on-the-menu-name"]).fill(menu['menu-name']);
  await expect(page.locator(locators["click-on-the-menu-name"])).toHaveValue(menu['menu-name']);
  console.log('✅ Menu name filled');

  // Upload menu image
  const imagePath = path.join(__dirname, '../../Fixtures/pictures/' + menu['menu-image']);
 

  await menuPOM.uploadMenuImage(imagePath, 'Menu image');

  // Save the menu
  await menuPOM.saveMenu();
  
  // Verify menu creation
  const isCreated = await menuPOM.verifyMenuCreation();
  expect(isCreated).toBe(true);
});