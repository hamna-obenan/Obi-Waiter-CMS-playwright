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

  // Create category using POM methods
  console.log('🏗️ Creating category using POM methods...');
  
  // Get the image path from Categories.json
  const imagePath = path.join(__dirname, '../../Fixtures/pictures', categories["category-comapny-image"]);
  console.log(`📸 Using image: ${imagePath}`);
  
  await categoryPOM.createCategory(categories["category-company-name"], imagePath);

  // Verify category was created successfully
  await categoryPOM.verifyCategoryCreation(categories["category-company-name"]);

  console.log('✅ Category company test completed successfully');
});
