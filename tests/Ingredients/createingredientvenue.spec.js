import { test, expect } from "@playwright/test";
import IngredientsVenuePOM from "../../object-Page/Ingredients/ingredientsvenue.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import ingredients from "../../Fixtures/Ingredients.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

/**
 * Venue Level Ingredient Creation Test Suite
 * Tests ingredient creation flow for venue level
 * Flow: Login → Venue → Menu → Category → Ingredient → New Ingredient → Create → Venue
 */
test.describe("Ingredient Management - Venue Level", () => {
  
  // Helper function to create venue ingredient
  async function createVenueIngredient(page, ingredientData, ingredientName) {
    const ingredientsVenuePOM = new IngredientsVenuePOM(page);
    
    // Login
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    await expect(page.locator(locators["click-on-the-created-venue"])).toBeVisible();
    
    // Navigate to ingredients page
    await ingredientsVenuePOM.navigateToVenuePage();
    await expect(page.locator('text=Venue')).toBeVisible();
    
    await ingredientsVenuePOM.navigateToMenuPage();
    await expect(page.locator('text=Select menu')).toBeVisible();
    
    await ingredientsVenuePOM.navigateToCategoryPage();
    await expect(page).toHaveURL(/.*categories.*/);
    
    await ingredientsVenuePOM.navigateToIngredientsPage();
    await expect(page).toHaveURL(/.*ingredients.*/);
    
    // Create ingredient
    await ingredientsVenuePOM.clickAddNewIngredient();
    await expect(page.locator(locators["create-button"])).toBeVisible();
    
    await ingredientsVenuePOM.clickCreateButton();
    await expect(page.locator(locators["venue-button"])).toBeVisible();
    
    await ingredientsVenuePOM.clickVenueButton();
    await expect(page.locator(locators["ingredient-name"])).toBeVisible();
    
    await ingredientsVenuePOM.verifyIngredientForm();
    
    // Fill form
    const inStock = ingredientData["in stock"];
    const hasAllergen = ingredientData["ingredient-allergen"] === "yes";
    
    await ingredientsVenuePOM.fillIngredientName(ingredientName);
    await ingredientsVenuePOM.setStockStatus(inStock === "yes");
    await ingredientsVenuePOM.setAllergenStatus(hasAllergen);
    
    // Verify form data
    await expect(page.locator(locators["ingredient-name"])).toHaveValue(ingredientName);
    await expect(page.locator(locators["ingredient-instock-checkbox"])).toBeChecked();
    
    if (hasAllergen) {
      await expect(page.locator(locators["ingredient-allergen-checkbox"])).toBeChecked();
    } else {
      await expect(page.locator(locators["ingredient-allergen-checkbox"])).not.toBeChecked();
    }
    
    // Save ingredient
    await ingredientsVenuePOM.saveIngredient();
    await page.waitForLoadState('networkidle');
    
    // Verify ingredient was saved
    const currentUrl = page.url();
    if (currentUrl.includes('/ingredients')) {
      try {
        await expect(page.locator(`text=${ingredientName}`)).toBeVisible({ timeout: 3000 });
      } catch (error) {
        // Try pagination if ingredient not found on current page
        const page2Button = page.locator('button:has-text("2")');
        const nextPageButton = page.locator('button:has-text("Go to next page")');
        
        try {
          await page2Button.click({ timeout: 5000 });
          await page.waitForLoadState('networkidle');
        } catch (error) {
          await nextPageButton.click({ timeout: 5000 });
          await page.waitForLoadState('networkidle');
        }
        
        await expect(page.locator(`text=${ingredientName}`)).toBeVisible();
      }
    }
    
    await page.pause();
  }

  test("Create Ingredient Venue - Grilled chicken", async ({ page }) => {
    test.setTimeout(120000);
    const ingredientData = ingredients.ingredients[0];
    const ingredientName = ingredientData["ingredient-name 1"];
    await createVenueIngredient(page, ingredientData, ingredientName);
  });

  test("Create Ingredient Venue - Tomato slices", async ({ page }) => {
    test.setTimeout(120000);
    const ingredientData = ingredients.ingredients[2];
    const ingredientName = ingredientData["ingredient-name 3"];
    await createVenueIngredient(page, ingredientData, ingredientName);
  });

  test("Create Ingredient Venue - Onion", async ({ page }) => {
    test.setTimeout(120000);
    const ingredientData = ingredients.ingredients[4];
    const ingredientName = ingredientData["ingredient-name 5"];
    await createVenueIngredient(page, ingredientData, ingredientName);
  });

  test("Create Ingredient Venue - Pickles", async ({ page }) => {
    test.setTimeout(120000);
    const ingredientData = ingredients.ingredients[6];
    const ingredientName = ingredientData["ingredient-name 7"];
    await createVenueIngredient(page, ingredientData, ingredientName);
  });

  test("Create Ingredient Venue - Butter", async ({ page }) => {
    test.setTimeout(120000);
    const ingredientData = ingredients.ingredients[8];
    const ingredientName = ingredientData["ingredient-name 9"];
    await createVenueIngredient(page, ingredientData, ingredientName);
  });

  test("Create Ingredient Venue - Ketchup", async ({ page }) => {
    test.setTimeout(120000);
    const ingredientData = ingredients.ingredients[10];
    const ingredientName = ingredientData["ingredient-name 11"];
    await createVenueIngredient(page, ingredientData, ingredientName);
  });

  test("Create Ingredient Venue - Jalapeños", async ({ page }) => {
    test.setTimeout(120000);
    const ingredientData = ingredients.ingredients[12];
    const ingredientName = ingredientData["ingredient-name 13"];
    await createVenueIngredient(page, ingredientData, ingredientName);
  });

  test("Create Ingredient Venue - Salt & pepper", async ({ page }) => {
    test.setTimeout(120000);
    const ingredientData = ingredients.ingredients[14];
    const ingredientName = ingredientData["ingredient-name 15"];
    await createVenueIngredient(page, ingredientData, ingredientName);
  });

  test("Create Ingredient Venue - Cheese", async ({ page }) => {
    test.setTimeout(120000);
    const ingredientData = ingredients.ingredients[16];
    const ingredientName = ingredientData["ingredient-name 17"];
    await createVenueIngredient(page, ingredientData, ingredientName);
  });
});
