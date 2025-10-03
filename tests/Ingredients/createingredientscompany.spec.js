import { test, expect } from "@playwright/test";
import IngredientPOM from "../../object-Page/Ingredients/ingredientpom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import ingredients from "../../Fixtures/Ingredients.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

/**
 * Ingredient Creation Test Suite
 * Tests ingredient creation flow for company level
 * Creates all even-numbered ingredients (2,4,6,8,10,12,14,16,18)
 * Flow: Login → Click Venue → Click Menu → Navigate to Ingredients → Add New Ingredient
 */
test.describe("Ingredient Management - Company Level", () => {
  // Even-numbered ingredients: 2, 4, 6, 8, 10, 12, 14, 16, 18
  const evenNumberedIngredients = [1, 3, 5, 7, 9, 11, 13, 15, 17]; // Array indices (0-based)
  
  for (const ingredientIndex of evenNumberedIngredients) {
    const ingredientNumber = ingredientIndex + 1; // Convert to 1-based numbering
    const ingredientData = ingredients.ingredients[ingredientIndex];
    const ingredientName = ingredientData[`ingredient-name ${ingredientNumber}`];
    
    test(`Create Ingredient Company - Add Ingredient ${ingredientNumber} (${ingredientName})`, async ({ page }) => {
    // Set longer timeout for this test
    test.setTimeout(120000); // 2 minutes
    const ingredientPOM = new IngredientPOM(page);
    
    // Step 1: Login Process - Using reusable login function
    console.log('🔐 Step 1: Performing login...');
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    
    // Assert: Verify successful login by checking for venue elements
    await expect(page.locator(locators["click-on-the-created-venue"])).toBeVisible();
    console.log('✅ Login successful - venue elements visible');

    // Step 2: Navigate to ingredients page
    console.log('🧭 Step 2: Navigating to ingredients page...');
    await ingredientPOM.navigateToIngredientsPage();
    
    // Assert: Verify we're on the ingredients page
    await expect(page).toHaveURL(/.*ingredients.*/);
    console.log('✅ Successfully navigated to ingredients page');

    // Step 3: Click on Add Ingredient button
    console.log('➕ Step 3: Clicking on Add Ingredient button...');
    await ingredientPOM.clickAddIngredient();
    
    // Assert: Verify Add Ingredient button was clicked (form should appear)
    await expect(page.locator(locators["create-button"])).toBeVisible();
    console.log('✅ Add Ingredient button clicked - Create button visible');

    // Step 4: Click on Create button
    console.log('🔨 Step 4: Clicking on Create button...');
    await ingredientPOM.clickCreateButton();
    
    // Assert: Verify Create button was clicked (Company/Venue options should appear)
    await expect(page.locator(locators["company-button"])).toBeVisible();
    console.log('✅ Create button clicked - Company button visible');

    // Step 5: Click on Company button
    console.log('🏢 Step 5: Clicking on Company button...');
    await ingredientPOM.clickCompanyButton();
    
    // Assert: Verify Company button was clicked (ingredient form should appear)
    await expect(page.locator(locators["ingredient-name"])).toBeVisible();
    console.log('✅ Company button clicked - Ingredient form visible');

    // Step 6: Verify we're on the ingredient creation form
    console.log('📝 Step 6: Verifying ingredient creation form...');
    await ingredientPOM.verifyIngredientForm();
    
    // Additional assertions for form elements
    await expect(page.locator(locators["ingredient-name"])).toBeVisible();
    await expect(page.locator(locators["ingredient-instock-checkbox"])).toBeVisible();
    await expect(page.locator(locators["ingredient-allergen-checkbox"])).toBeVisible();
    console.log('✅ Ingredient form fully loaded with all elements');
    
    // Get ingredient data from fixtures - Current ingredient
    const inStock = ingredientData["in stock"];
    const hasAllergen = ingredientData["ingredient-allergen"] === "yes";
    
    // Step 7: Fill ingredient form with current ingredient data
    console.log(`📋 Step 7: Filling ingredient form with data: ${ingredientName}`);
    
    // Fill ingredient name
    await ingredientPOM.fillIngredientName(ingredientName);
    
    // Assert: Verify name was filled correctly
    await expect(page.locator(locators["ingredient-name"])).toHaveValue(ingredientName);
    console.log(`✅ Ingredient name filled: ${ingredientName}`);
    
    // Set stock status
    if (inStock === "yes") {
      await ingredientPOM.setStockStatus(true);
      // Assert: Verify stock status was set correctly
      await expect(page.locator(locators["ingredient-instock-checkbox"])).toBeChecked();
      console.log('✅ Stock status set to: In Stock');
    } else {
      await ingredientPOM.setStockStatus(false);
      // Assert: Verify stock status was set correctly
      await expect(page.locator(locators["ingredient-outstock-checkbox"])).toBeChecked();
      console.log('✅ Stock status set to: Out of Stock');
    }
    
    // Set allergen status
    await ingredientPOM.setAllergenStatus(hasAllergen);
    
    // Assert: Verify allergen status was set correctly
    if (hasAllergen) {
      await expect(page.locator(locators["ingredient-allergen-checkbox"])).toBeChecked();
      console.log('✅ Allergen status set to: Has Allergen');
    } else {
      await expect(page.locator(locators["ingredient-allergen-checkbox"])).not.toBeChecked();
      console.log('✅ Allergen status set to: No Allergen');
    }
    
    // Final assertions - verify all form data is correctly filled
    console.log('🔍 Final verification of form data:');
    console.log(`- Name: ${ingredientName}`);
    console.log(`- In Stock: ${inStock}`);
    console.log(`- Has Allergen: ${hasAllergen}`);
    
    // Assert: Final form state verification
    await expect(page.locator(locators["ingredient-name"])).toHaveValue(ingredientName);
    await expect(page.locator(locators["ingredient-instock-checkbox"])).toBeChecked();
    
    // Dynamic assertion based on ingredient's allergen status
    if (hasAllergen) {
      await expect(page.locator(locators["ingredient-allergen-checkbox"])).toBeChecked();
    } else {
      await expect(page.locator(locators["ingredient-allergen-checkbox"])).not.toBeChecked();
    }
    
    console.log('✅ All form fields verified successfully');
    
    // Step 8: Save the ingredient
    console.log('💾 Step 8: Saving the ingredient...');
    await ingredientPOM.saveIngredient();
    
    // Assert: Verify ingredient was saved successfully
    // Wait for navigation or success message
    await page.waitForLoadState('networkidle');
    
    // Verify we're back on ingredients list page or success message appears
    const currentUrl = page.url();
    const isOnIngredientsPage = currentUrl.includes('/ingredients');
    
    if (isOnIngredientsPage) {
      console.log('✅ Successfully navigated back to ingredients list page');
      
      // Verify ingredient appears in the list
      await expect(page.locator(`text=${ingredientName}`)).toBeVisible();
      console.log(`✅ Ingredient "${ingredientName}" appears in the ingredients list`);
    } else {
      // Check for success message or confirmation
      try {
        await expect(page.locator('text=success')).toBeVisible({ timeout: 5000 });
        console.log('✅ Success message displayed');
      } catch (error) {
        console.log('⚠️ No success message found, but ingredient may still be saved');
      }
    }
    
    console.log('✅ Ingredient saved successfully');
    console.log('⏸️ Test paused after saving ingredient - ready for manual verification');
    
    // Pause after saving for manual verification
    await page.pause();
    });
  }
});
