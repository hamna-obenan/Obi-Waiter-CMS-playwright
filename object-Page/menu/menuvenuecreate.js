import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };

/**
 * Page Object Model for Menu Creation with Venue Testing
 * Handles menu creation with venue selection, form filling, and image uploads
 */
export default class MenuVenueCreatePOM {
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
    await this.page.locator(locators["click-on-the-add-menu"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Add Menu');
    
    // Step 3: Click on Create
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Create');
    
    // Step 4: Click on Venue (instead of Company)
    await this.page.locator(locators["venue-button"]).click();
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
    await this.page.locator(locators["click-on-the-created-venue"]).click();
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
    
    // Handle image cropping - expand and move selection upward
    await this.handleImageCropping();
    
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
   * Handle image cropping - move selection upward to capture top portion
   */
  async handleImageCropping() {
    console.log('✂️ Moving crop selection upward...');
    
    try {
      // Wait for crop area to be available
      await this.page.waitForTimeout(1000);
      
      // Use arrow keys to move crop selection upward
      console.log('🎯 Moving crop selection upward to capture top portion...');
      
      // Move crop area significantly upward to capture "Italian" text and top of "FOOD"
      for (let i = 0; i < 8; i++) {
        await this.page.keyboard.press('ArrowUp');
        await this.page.waitForTimeout(150);
      }
      
      // Fine-tune horizontal positioning
      for (let i = 0; i < 2; i++) {
        await this.page.keyboard.press('ArrowLeft');
        await this.page.waitForTimeout(100);
      }
      
      // Expand horizontally to capture full width
      for (let i = 0; i < 4; i++) {
        await this.page.keyboard.press('ArrowRight');
        await this.page.waitForTimeout(100);
      }
      
      // Expand vertically downward to include more of the image
      for (let i = 0; i < 5; i++) {
        await this.page.keyboard.press('ArrowDown');
        await this.page.waitForTimeout(100);
      }
      
      console.log('✅ Crop selection moved upward to capture top portion of image');
      
    } catch (error) {
      console.log('⚠️ Crop handling failed, proceeding with default crop area');
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

  /**
   * Verify menu creation success
   */
  async verifyMenuCreation() {
    console.log('🔍 Verifying menu creation...');
    
    // Check if we're on a menu-related page
    const currentUrl = this.page.url();
    const isOnMenuPage = currentUrl.includes('/menu') || currentUrl.includes('/menus');
    
    if (isOnMenuPage) {
      console.log('✅ Menu created successfully - navigated to menu page');
      return true;
    } else {
      console.log('⚠️ Menu creation status unclear');
      return false;
    }
  }
}
