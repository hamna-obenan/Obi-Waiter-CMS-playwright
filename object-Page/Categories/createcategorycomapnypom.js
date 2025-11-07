import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };
/**
 * Page Object Model for Category Company Creation
 * Handles category creation with company selection, form filling, and navigation
 */
export default class CreateCategoryCompanyPOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to categories page
   * Flow: Login → Navigate to Venue Page → Click Venue → Click Menu → Navigate to Categories Page
   */
  async navigateToCategoryPage() {
    console.log('🏢 Selecting created venue...');
    await this.page.locator(locators["click-on-the-created-venue"]).first().click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Venue selected successfully');

    console.log('📋 Selecting created menu...');
    
    // Wait for menu elements to be visible
    await this.page.waitForSelector(locators["created-menu"], { timeout: 10000 });
    console.log('✅ Menu elements found');
    
    // Check how many menu elements are available
    const menuCount = await this.page.locator(locators["created-menu"]).count();
    console.log(`📊 Found ${menuCount} menu elements`);
    
    // Click on the third menu (index 2)
    await this.page.locator(locators["created-menu"]).nth(2).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ First menu clicked');
    
    // Now navigate to categories page
    console.log('🎯 Navigating to categories page...');
    await this.page.goto('/categories');
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Categories page loaded successfully');
  }

  /**
   * Click on New Category button
   */
  async clickNewCategoryButton() {
    console.log('➕ Clicking on New Category button...');
    await this.page.locator(locators["add-category-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ New Category button clicked successfully');
  }

  /**
   * Click Create button in the modal
   */
  async clickCreateButton() {
    console.log('🔨 Clicking Create button...');
    // Wait for the modal to be visible first
    await this.page.waitForSelector(locators["create-button"], { timeout: 10000 });
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Create button clicked successfully');
  }

  /**
   * Click Company button to select company scope
   */
  async clickCompanyButton() {
    console.log('🏢 Clicking Company button...');
    await this.page.locator(locators["company-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Company button clicked successfully');
  }

  /**
   * Fill category name
   * @param {string} categoryName - The name of the category
   */
  async fillCategoryName(categoryName) {
    console.log('📝 Filling category name...');
    await this.page.locator(locators["category-name"]).fill(categoryName);
    console.log(`✅ Category name filled: ${categoryName}`);
  }

  /**
   * Select menu for category
   */
  async selectMenuForCategory() {
    console.log('📋 Selecting menu for category...');
    await this.page.locator(locators["select-menu-dropdown"]).click();
    // Wait for dropdown options and select the first one
    await this.page.waitForTimeout(1000);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
    console.log('✅ Menu selected for category');
  }


    /**
   * Upload category image using existing locators
   * @param {string} imagePath - Path to the image file
   */
    async uploadCategoryImage(imagePath) {
      console.log('📸 Uploading category image...');
      
    // Click on the image upload area using a more reliable locator
    await this.page.getByText('Choose image').click();
      console.log('✅ Image upload area clicked');
      
      // Set the file input
      const fileInput = this.page.locator('[id="fileInput"]');
      await fileInput.setInputFiles(imagePath);
      console.log(`✅ Image file selected: ${imagePath}`);
      
      // Wait for image to load and crop interface to appear
      await this.page.waitForTimeout(2000);
      
      // Click upload button to finalize the image upload
      await this.page.getByRole('button', { name: 'Upload' }).click();
      console.log('✅ Upload button clicked to finalize image');

      // Wait for upload to complete
      await this.page.waitForLoadState('networkidle');
      console.log('✅ Category image uploaded successfully');
    }

    
    
  /**
   * Save the category
   */
  async saveCategory() {
    console.log('💾 Saving category...');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Category saved successfully');
  }


  /**
   * Complete category creation flow
   * @param {string} categoryName - The name of the category
   * @param {string} imagePath - Path to the category image (optional)
   */
  async createCategory(categoryName, imagePath = null) {
    await this.clickNewCategoryButton();
    await this.clickCreateButton();
    await this.clickCompanyButton();
    await this.fillCategoryName(categoryName);
    await this.selectMenuForCategory();
    
    // Upload image if provided
    if (imagePath) {
      await this.uploadCategoryImage(imagePath);
    }
    
    await this.saveCategory();
  }
}
