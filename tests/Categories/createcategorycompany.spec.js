import { test, expect } from "@playwright/test";
import CreateCategoryCompanyPOM from "../../object-Page/Categories/createcategorycomapnypom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import categories from "../../Fixtures/Categories.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Category Company Creation Test Suite
 * Tests category creation flow: Login → Select Venue → Select Menu → Create Category
 */
test("Create Category Company - Complete Flow", async ({ page }) => {
  // Set longer timeout for this test
  test.setTimeout(120000); // 2 minutes
  const categoryPOM = new CreateCategoryCompanyPOM(page);
  
  // Login Process - Using reusable login function
  await performLogin(page, login.TC1001.Email, login.TC1001.Password);

  // Navigate to category page
  console.log('🎯 Navigating to category page...');
  await categoryPOM.navigateToCategoryPage();

  // Click on the first menu
  console.log('📋 Clicking on the first menu...');
  await page.locator(locators["created-menu"]).first().click();
  await page.waitForLoadState('networkidle');
  console.log('✅ First menu selected successfully');

  // Click Add Category
  console.log('➕ Adding new category...');
  await categoryPOM.clickAddCategory();

  // Fill category name using data from Categories.json
  console.log('📝 Filling category name...');
  await categoryPOM.fillCategoryName(categories["category-name"]);
  console.log('✅ Category name filled');

  // Fill category description using data from Categories.json
  console.log('📝 Filling category description...');
  await categoryPOM.fillCategoryDescription(categories["category-description"]);
  console.log('✅ Category description filled');

  // Upload category image using data from Categories.json
  const imagePath = path.join(__dirname, '../../Fixtures/pictures/' + categories["category-image"]);
  await categoryPOM.uploadCategoryImage(imagePath, 'Category image');

  // Save the category
  await categoryPOM.saveCategory();
  
  // Verify category creation
  const isCreated = await categoryPOM.verifyCategoryCreation();
  expect(isCreated).toBe(true);
  
  console.log('✅ Category company test completed successfully');
});
