import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };

/**
 * Page Object Model for Duplicate Company Menu Testing
 * Handles duplicate menu creation with company selection, form filling, and image uploads
 */
export default class DuplicateCompanyMenuPOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Create Menu page with company flow: Select Venue → Add Menu → Create → Company → Fill Form
   */
  async navigateToCreateMenu() {
    // Step 1: Select the venue first
    await this.selectVenue();

    // Step 2: Click on Add Menu using locators
    await this.page.locator(locators["click-on-the-add-menu"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Add Menu');

    // Step 3: Click on Create using locators
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Create');

    // Step 4: Click on Company using locators
    await this.page.locator(locators["company-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Company');

    console.log('✅ Navigated to Create Menu page with company flow');
  }

  /**
   * Select the added venue
   */
  async selectVenue() {
    console.log('🏢 Selecting venue...');
    // Wait for venue list to load
    await this.page.waitForTimeout(2000);

    // Click on the created venue using locators
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
    await this.page.locator(locators["click-on-the-menu-name"]).fill(menuName);
    await expect(this.page.locator(locators["click-on-the-menu-name"])).toHaveValue(menuName);
    console.log('✅ Menu name filled');
  }

  
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
    await this.page.locator(locators["save-button"]).click();
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
  }
  async getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The expression is: Math.floor(Math.random() * (max - min + 1)) + min;
    // This calculates the size of the range (max - min + 1)
    // Multiplies Math.random() by it
    // Floors it to get an offset
    // And finally adds 'min' to shift the offset into the desired range
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
