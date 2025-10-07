import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };

/**
 * Page Object Model for Venue Level Ingredient Management
 * Handles venue-level ingredient creation, navigation, and form interactions
 * Flow: Login → Venue → Menu → Category → Ingredient → New Ingredient → Create → Venue
 */
export default class IngredientsVenuePOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to venue page
   * Flow: Login → Navigate to Venue Page
   */
  async navigateToVenuePage() {
    // Click on the created venue
    await this.page.locator(locators["click-on-the-created-venue"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to venue page');
  }

  /**
   * Navigate to menu page from venue
   * Flow: Venue → Menu
   */
  async navigateToMenuPage() {
    // Wait for and click on the created menu
    await this.page.waitForSelector(locators["created-menu"], { timeout: 10000 });
    await this.page.locator(locators["created-menu"]).nth(2).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to menu page');
  }

  /**
   * Navigate to category page from menu
   * Flow: Menu → Category
   */
  async navigateToCategoryPage() {
    await this.page.goto('/categories');
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to category page');
  }

  /**
   * Navigate to ingredients page from category
   * Flow: Category → Ingredients
   */
  async navigateToIngredientsPage() {
    await this.page.goto('/ingredients');
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to ingredients page');
  }

  /**
   * Click on "Add New Ingredient" button
   */
  async clickAddNewIngredient() {
    await this.page.locator(locators["add-ingredient-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked Add New Ingredient button');
  }

  /**
   * Click on "Create" button
   */
  async clickCreateButton() {
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked Create button');
  }

  /**
   * Click on "Venue" button
   */
  async clickVenueButton() {
    await this.page.locator(locators["venue-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked Venue button');
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
    console.log('✅ Ingredient saved successfully');
  }

  /**
   * Create ingredient from data object
   * @param {Object} ingredientData - Ingredient data object
   * @param {string} ingredientNumber - The ingredient number (e.g., "1", "3", "5")
   */
  async createIngredientFromData(ingredientData, ingredientNumber) {
    const ingredientName = ingredientData[`ingredient-name ${ingredientNumber}`];
    const inStock = ingredientData["in stock"] === "yes";
    const hasAllergen = ingredientData["ingredient-allergen"] === "yes";
    
    console.log(`Creating venue ingredient: ${ingredientName}`);
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
    console.log(`✅ Ingredient "${ingredientName}" verified in ingredients list`);
  }

  /**
   * Complete flow for creating venue-level ingredient
   * @param {Object} ingredientData - Ingredient data object
   * @param {string} ingredientNumber - The ingredient number
   */
  async createVenueIngredient(ingredientData, ingredientNumber) {
    // Navigate through the complete flow
    await this.navigateToVenuePage();
    await this.navigateToMenuPage();
    await this.navigateToCategoryPage();
    await this.navigateToIngredientsPage();
    
    // Click Add New Ingredient
    await this.clickAddNewIngredient();
    
    // Click Create
    await this.clickCreateButton();
    
    // Click Venue
    await this.clickVenueButton();
    
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
