import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };

/**
 * Page Object Model for Ingredient Management
 * Handles ingredient creation, navigation, and form interactions
 */
export default class IngredientPOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to ingredients page
   * Flow: Login → Navigate to Venue Page → Click Venue → Click Menu → Navigate to Ingredients Page
   */
  async navigateToIngredientsPage() {
    // Click on the created venue
    // Click on the "Ingredients" option from the navigation bar using locator from locator.json
    await this.page.locator(locators["ingredient-tab"]).click();
    await this.page.waitForLoadState('networkidle');
    
    // Wait for and click on the created menu
    await this.page.waitForSelector(locators["created-menu"], { timeout: 10000 });
    await this.page.locator(locators["created-menu"]).nth(2).click();
    await this.page.waitForLoadState('networkidle');
    
    // Navigate to ingredients page
    await this.page.goto('/ingredients');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on the "Add Ingredient" button
   */
  async clickAddIngredient() {
    await this.page.locator(locators["add-ingredient-button"]).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on "Create" button
   */
  async clickCreateButton() {
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on "Company" button
   */
  async clickCompanyButton() {
    await this.page.locator(locators["company-button"]).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify that we're on the ingredient creation form
   */
  async verifyIngredientForm() {
    // Wait for the ingredient form to be visible
    await this.page.waitForSelector(locators["ingredient-name"], { timeout: 10000 });
    
    // Verify form elements are present
    await expect(this.page.locator(locators["ingredient-name"])).toBeVisible();
    await expect(this.page.locator(locators["ingredient-instock-checkbox"])).toBeVisible();
    await expect(this.page.locator(locators["ingredient-allergen-checkbox"])).toBeVisible();
    
    console.log('✅ Successfully navigated to ingredient creation form');
  }

  /**
   * Fill ingredient name
   * @param {string} ingredientName - The name of the ingredient
   */
  async fillIngredientName(ingredientName) {
    await this.page.locator(locators["ingredient-name"]).fill(ingredientName);
  }

  /**
   * Set stock status
   * @param {boolean} inStock - Whether the ingredient is in stock
   */
  async setStockStatus(inStock) {
    if (inStock) {
      await this.page.locator(locators["ingredient-instock-checkbox"]).click();
    } else {
      await this.page.locator(locators["ingredient-outstock-checkbox"]).click();
    }
  }

  /**
   * Set allergen status
   * @param {boolean} hasAllergen - Whether the ingredient has allergens
   */
  async setAllergenStatus(hasAllergen) {
    const checkbox = this.page.locator(locators["ingredient-allergen-checkbox"]);
    const isChecked = await checkbox.isChecked();
    
    if (hasAllergen && !isChecked) {
      await checkbox.check();
    } else if (!hasAllergen && isChecked) {
      await checkbox.uncheck();
    }
  }


  

  /**
   * Save the ingredient
   */
  async saveIngredient() {
    // Wait for save button to be visible and clickable
    await this.page.waitForSelector('button:has-text("Save")', { timeout: 10000 });
    
    // Click the save button
    await this.page.locator('button:has-text("Save")').click();
    
    // Wait for save operation to complete
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Complete ingredient creation flow
   * @param {string} ingredientName - The name of the ingredient
   * @param {string} description - The description of the ingredient
   * @param {boolean} hasAllergen - Whether the ingredient has allergens
   * @param {boolean} inStock - Whether the ingredient is in stock
   * @param {string} imagePath - Path to the image file (optional)
   */
  async createIngredient(ingredientName, description, hasAllergen = false, inStock = true, imagePath = null) {
    await this.fillIngredientName(ingredientName);
    await this.fillIngredientDescription(description);
    await this.setStockStatus(inStock);
    await this.setAllergenStatus(hasAllergen);
    
    if (imagePath) {
      await this.uploadIngredientImage(imagePath);
    }
    
    await this.saveIngredient();
  }

  /**
   * Create ingredient from data object
   * @param {Object} ingredientData - Ingredient data object
   * @param {string} ingredientNumber - The ingredient number (e.g., "2", "4", "6")
   */
  async createIngredientFromData(ingredientData, ingredientNumber) {
    const ingredientName = ingredientData[`ingredient-name ${ingredientNumber}`];
    const inStock = ingredientData["in stock"] === "yes";
    const hasAllergen = ingredientData["ingredient-allergen"] === "yes";
    
    console.log(`Creating ingredient: ${ingredientName}`);
    console.log(`- In Stock: ${inStock}`);
    console.log(`- Has Allergen: ${hasAllergen}`);
    
    await this.fillIngredientName(ingredientName);
    await this.setStockStatus(inStock);
    await this.setAllergenStatus(hasAllergen);
    
    return {
      name: ingredientName,
      inStock: inStock,
      hasAllergen: hasAllergen
    };
  }

  /**
   * Verify ingredient creation
   * @param {string} ingredientName - The name of the ingredient to verify
   */
  async verifyIngredientCreation(ingredientName) {
    await expect(this.page.locator(`text=${ingredientName}`)).toBeVisible();
  }

  /**
   * Navigate back to ingredients list for next ingredient creation
   */
  async navigateBackToIngredientsList() {
    // Wait for any save operations to complete
    await this.page.waitForLoadState('networkidle');
    
    // Check if we're already on ingredients page
    const currentUrl = this.page.url();
    if (currentUrl.includes('/ingredients')) {
      console.log('✅ Already on ingredients page');
      return;
    }
    
    // Navigate back to ingredients page
    await this.page.goto('/ingredients');
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated back to ingredients list');
  }

  /**
   * Complete flow for creating multiple ingredients
   * @param {Object} ingredientData - Ingredient data object
   * @param {string} ingredientNumber - The ingredient number
   */
  async createMultipleIngredient(ingredientData, ingredientNumber) {
    // Navigate to ingredients page
    await this.navigateToIngredientsPage();
    
    // Click Add Ingredient
    await this.clickAddIngredient();
    
    // Click Create
    await this.clickCreateButton();
    
    // Click Company
    await this.clickCompanyButton();
    
    // Verify form
    await this.verifyIngredientForm();
    
    // Create ingredient from data
    const ingredientInfo = await this.createIngredientFromData(ingredientData, ingredientNumber);
    
    // Save ingredient
    await this.saveIngredient();
    
    // Verify creation
    await this.verifyIngredientCreation(ingredientInfo.name);
    
    return ingredientInfo;
  }
}
