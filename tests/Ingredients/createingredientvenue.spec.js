import { test, expect } from "@playwright/test";
import IngredientsVenuePOM from "../../object-Page/Ingredients/ingredientsvenue.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import ingredients from "../../Fixtures/Ingredients.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

// Create all venue ingredients using IngredientsVenuePOM
test("Ingredient Management - Venue Level - Create All Ingredients", async ({ page }) => {
  test.setTimeout(300000); // Increased timeout for multiple ingredients
  
  const ingredientsVenuePOM = new IngredientsVenuePOM(page);
  
  // Filter ingredients based on the names shown in the image + Butter
  const ingredientNames = ["Tomato slices", "Onion", "Pickles", "Jalapeños", "Cheese", "Salt & pepper", "Grilled chicken", "Ketchup", "Butter"];
  
  // Get all ingredients that match the names from the JSON file
  const filteredIngredients = [];
  for (let i = 0; i < ingredients.ingredients.length; i++) {
    const number = i + 1;
    const name = ingredients.ingredients[i][`ingredient-name ${number}`];
    if (ingredientNames.includes(name)) {
      filteredIngredients.push({ index: i, number: number, data: ingredients.ingredients[i], name: name });
    }
  }

  const totalIngredients = filteredIngredients.length;

  // Step 1: Login
  console.log('🔐 Step 1: Performing login...');
  await performLogin(page, login.TC1001.Email, login.TC1001.Password);
  await expect(page.locator(locators["click-on-the-created-venue"]).first()).toBeVisible();
  await page.locator(locators["click-on-the-created-venue"]).first().click();
  console.log('✅ Login completed successfully');

  // Step 2: Navigate to ingredients page (once for all ingredients)
  console.log('📋 Step 2: Navigating to ingredients page...');
  await expect(page.locator(locators["created-menu"]).nth(2)).toBeVisible();
  await page.locator(locators["created-menu"]).nth(2).click();
  await ingredientsVenuePOM.navigateToIngredientsPage();
  await expect(page).toHaveURL(/ingredients/);
  console.log('✅ Navigated to ingredients page');

  // Step 3: Loop through all ingredients and create them
  console.log(`🏭 Step 3: Creating ${totalIngredients} ingredients...`);
  
  for (let idx = 0; idx < filteredIngredients.length; idx++) {
    const { number, data, name } = filteredIngredients[idx];
    
    console.log(`\n🏷️ Creating ingredient ${idx + 1}/${totalIngredients}: ${name}`);
    
    // Click Add Ingredient, Create, Venue using locators from locators.json
    await page.locator(locators["add-ingredient-button"]).click();
    await expect(page.locator(locators["create-button"])).toBeVisible();
    await page.locator(locators["create-button"]).click();
    await expect(page.locator(locators["venue-button"])).toBeVisible();
    await page.locator(locators["venue-button"]).click();

    // Wait for form and verify using POM
    await ingredientsVenuePOM.verifyIngredientForm();

    // Fill in form details using POM
    await ingredientsVenuePOM.fillIngredientName(name);
    const inStock = data["in stock"] === "yes";
    const hasAllergen = data["ingredient-allergen"] === "yes";
    await ingredientsVenuePOM.setStockStatus(inStock);
    await ingredientsVenuePOM.setAllergenStatus(hasAllergen);

    // Verify form values
    await expect(page.locator(locators["ingredient-name"])).toHaveValue(name);
    if (inStock) {
      await expect(page.locator(locators["ingredient-instock-checkbox"])).toBeChecked();
    }
    if (hasAllergen) {
      await expect(page.locator(locators["ingredient-allergen-checkbox"])).toBeChecked();
    } else {
      await expect(page.locator(locators["ingredient-allergen-checkbox"])).not.toBeChecked();
    }

    // Save ingredient
    await ingredientsVenuePOM.saveIngredient();
    await page.waitForLoadState('networkidle');
  }

  console.log(`\n🎉 All ${totalIngredients} ingredients created successfully!`);
});
