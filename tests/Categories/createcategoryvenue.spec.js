import { test, expect } from "@playwright/test";
import CreateCategoryVenuePOM from "../../object-Page/Categories/createcategoryvenue.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import categories from "../../Fixtures/Categories.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Category Venue Creation Test Suite
 * Tests category creation with venue selection: Login → Select Venue → Select Menu → Create Category
 * Uses venue button instead of company button
 */
test("Create Category Venue - Complete Flow", async ({ page }) => {
  // Set longer timeout for this test
  test.setTimeout(120000); // 2 minutes
  const categoryPOM = new CreateCategoryVenuePOM(page);
  
  // Login Process - Using reusable login function
  await performLogin(page, login.TC1001.Email, login.TC1001.Password);

  // Navigate to category page
  console.log('🎯 Navigating to category page...');
  await categoryPOM.navigateToCategoryPage();

  // Create category using POM methods with venue selection
  console.log('🏗️ Creating category with venue selection...');
  
  // Get the image path from Categories.json for venue category
  const imagePath = path.join(__dirname, '../../Fixtures/pictures', categories["category-venue-image"]);
  console.log(`📸 Using image: ${imagePath}`);
  
  // Create category with venue data
  await categoryPOM.createCategory(categories["category-venue-name"], imagePath);

  // Verify category was created successfully
  await categoryPOM.verifyCategoryCreation(categories["category-venue-name"]);

  console.log('✅ Category venue test completed successfully');
});
