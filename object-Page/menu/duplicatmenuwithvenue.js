import { expect } from '@playwright/test';

/**
 * Page Object Model for Duplicate Menu with Venue Testing
 * Handles duplicate menu creation with venue selection, form filling, and image uploads
 */
export default class DuplicateMenuWithVenuePOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Create Menu page with venue flow: Select Venue → Add Menu → Create → Venue → Fill Form
   */
  async navigateToCreateMenuWithVenue() {
    // Step 1: Select the venue first
    await this.selectVenue();
    
    // Step 2: Click on Add Menu
    await this.page.locator('[class="MuiBox-root css-8iv4v0"]').click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Add Menu');
    
    // Step 3: Click on Create
    await this.page.getByRole('button', { name: 'Create' }).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Create');
    
    // Step 4: Click on Venue (instead of Company)
    await this.page.getByRole('button', { name: 'Venue' }).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Venue');
    
    console.log('✅ Navigated to Create Menu page with venue flow');
  }

  /**
   * Select the added venue
   */
  async selectVenue() {
    console.log('🏢 Selecting venue...');
    // Wait for venue list to load
    await this.page.waitForTimeout(2000);
    
    // Click on the created venue using the locator from locators.json
    await this.page.getByRole('link', { name: 'logo logo' }).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Venue selected');
  }

  /**
   * Fill menu name only
   * @param {string} menuName - Menu name from fixture
   */
  async fillMenuName(menuName) {
    console.log('📝 Filling menu name...');
    await this.page.getByRole('textbox', { name: 'Menu name' }).fill(menuName);
    await expect(this.page.getByRole('textbox', { name: 'Menu name' })).toHaveValue(menuName);
    console.log('✅ Menu name filled');
  }

  /**
   * Upload menu image with custom cropping
   * @param {string} imagePath - Path to the image file
   * @param {string} imageName - Name of the image for logging
   */
  async uploadMenuImage(imagePath, imageName) {
    console.log(`📸 Uploading ${imageName}...`);
    
    // Click on Choose image button
    await this.page.getByText('Choose image').click();
    
    // Set input files
    await this.page.setInputFiles('input[type="file"]', imagePath);
    console.log('✅ Image file selected');
    
    // Wait for image to be visible
    await this.page.waitForTimeout(2000);
    await expect(this.page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
    console.log('✅ Image visible');
  
    // Click upload button
    await this.page.getByRole('button', { name: 'Upload' }).click();
    
    // Wait for upload to complete
    try {
      await this.page.waitForFunction(() => {
        const uploadModal = document.querySelector('[role="dialog"], .MuiDialog-root, .MuiModal-root');
        return !uploadModal || uploadModal.style.display === 'none';
      }, { timeout: 15000 });
      console.log(`✅ ${imageName} uploaded successfully`);
    } catch (error) {
      console.log(`⚠️ Upload timeout for ${imageName}, continuing...`);
    }
  }


  /**
   * Save the menu
   */
  async saveMenu() {
    console.log('💾 Saving menu...');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(3000);
    console.log('✅ Menu save button clicked');
  }

 
  
}
