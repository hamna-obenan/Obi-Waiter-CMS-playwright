import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };

/**
 * Page Object Model for Duplicate Category Venue Creation
 * Handles duplicate category creation with venue selection to test error handling
 */
export default class DuplicateCategoryVenuePOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to categories page
   * Flow: Login → Navigate to Venue Page → Click Venue → Click Menu → Navigate to Categories Page
   */
  async navigateToCategoryPage() {
    await this.page.locator(locators["click-on-the-created-venue"]).first().click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(locators["created-menu"], { timeout: 10000 });
    await this.page.locator(locators["created-menu"]).nth(2).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.goto('/categories');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on New Category button
   */
  async clickNewCategoryButton() {
    await this.page.locator(locators["add-category-button"]).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickCreateButton() {
    await this.page.waitForSelector(locators["create-button"], { timeout: 10000 });
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickVenueButton() {
    await this.page.locator(locators["venue-button"]).click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillCategoryName(categoryName) {
    await this.page.locator(locators["category-name"]).fill(categoryName);
  }

  async selectMenuForCategory() {
    await this.page.locator(locators["select-menu-dropdown-category"]).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option').first().click();  }

  /**
   * Upload category image using existing locators
   * @param {string} imagePath - Path to the image file
   */
  async uploadCategoryImage(imagePath) {
    await this.page.getByText('Choose image').click();
    const fileInput = this.page.locator('[id="fileInput"]');
    await fileInput.setInputFiles(imagePath);
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Upload' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async saveCategory() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    // Don't wait for networkidle - popup disappears quickly
  }

  async verifyCategoryCreation(categoryName) {
    await expect(this.page.locator(`text=${categoryName}`)).toBeVisible();
  }

  /**
   * Complete duplicate category creation flow with venue selection
   * @param {string} categoryName - The name of the category
   * @param {string} imagePath - Path to the category image (optional)
   */
  async createCategory(categoryName, imagePath = null) {
    await this.clickNewCategoryButton();
    await this.clickCreateButton();
    await this.clickVenueButton();
    await this.fillCategoryName(categoryName);
    await this.selectMenuForCategory();
    
    // Upload image if provided
    if (imagePath) {
      await this.uploadCategoryImage(imagePath);
    }
    
    await this.saveCategory();
  }
}
