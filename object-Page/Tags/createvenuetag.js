import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };

/**
 * Page Object Model for Venue Tag Creation
 * Handles venue tag creation, navigation, and form interactions
 */
export default class CreateVenueTagPOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to venue page
   */
  async navigateToVenuePage() {
    await this.page.locator(locators["click-on-the-created-venue"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to venue page');
  }

  /**
   * Navigate to menu page (clicks on 2nd menu)
   */
  async navigateToMenuPage() {
    // Click on the 2nd menu using the provided locator
    await this.page.getByRole('link', { name: 'logo' }).nth(1).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to menu page (clicked 2nd menu)');
  }

  /**
   * Navigate to tags tab
   */
  async navigateToTagsTab() {
    // Wait for the tags tab to be available before clicking
    await this.page.waitForSelector(locators["tag-tab"], { timeout: 10000 });
    await this.page.locator(locators["tag-tab"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to tags tab');
  }

  /**
   * Click Add Tag button
   */
  async clickAddTagButton() {
    await this.page.locator(locators["create-tag-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Add Tag button clicked');
  }

  /**
   * Click Create button
   */
  async clickCreateButton() {
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Create button clicked');
  }

  /**
   * Click Venue button (instead of Company)
   */
  async clickVenueButton() {
    await this.page.getByRole('button', { name: 'Venue' }).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Venue button clicked');
  }

  /**
   * Fill tag name field
   * @param {string} tagName - The tag name to fill
   */
  async fillTagName(tagName) {
    await this.page.locator(locators["tag-name"]).click();
    await this.page.locator(locators["tag-name"]).fill(tagName);
    await expect(this.page.locator(locators["tag-name"])).toHaveValue(tagName);
    console.log(`✅ Tag name filled: ${tagName}`);
  }

  /**
   * Fill display name field
   * @param {string} displayName - The display name to fill
   */
  async fillDisplayName(displayName) {
    if (displayName && displayName.trim() !== '') {
      await this.page.locator(locators["display-name"]).click();
      await this.page.locator(locators["display-name"]).fill(displayName);
      await expect(this.page.locator(locators["display-name"])).toHaveValue(displayName);
      console.log(`✅ Display name filled: ${displayName}`);
    }
  }

  /**
   * Select tag icon by index
   * @param {number} iconIndex - The icon index to select (1-based)
   */
  async selectTagIcon(iconIndex) {
    const iconSelector = locators[`tag-${iconIndex}`];
    await this.page.waitForSelector(iconSelector, { timeout: 10000 });
    await this.page.locator(iconSelector).click();
    console.log(`✅ Tag icon ${iconIndex} selected`);
  }

  /**
   * Save the tag
   */
  async saveTag() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Tag saved successfully');
  }

  /**
   * Create a complete venue tag
   * @param {Object} tagData - Tag data object
   * @param {number} tagIndex - Tag index for icon selection
   */
  async createVenueTag(tagData, tagIndex) {
    const tagName = tagData[`tag-name ${tagIndex + 1}`];
    const displayName = tagData[`display-name ${tagIndex + 1}`];
    
    console.log(`🏷️ Creating venue tag: ${tagName}`);
    
    // Fill tag name
    await this.fillTagName(tagName);
    
    // Fill display name if provided
    if (displayName && displayName.trim() !== '') {
      await this.fillDisplayName(displayName);
    }
    
    // Select tag icon
    await this.selectTagIcon(tagIndex + 1);
    
    // Save tag
    await this.saveTag();
    
    console.log(`✅ Venue tag "${tagName}" created successfully`);
  }

  /**
   * Create multiple venue tags
   * @param {Array} tagIndices - Array of tag indices to create
   * @param {Array} tagsData - Array of tag data
   */
  async createMultipleVenueTags(tagIndices, tagsData) {
    for (let i = 0; i < tagIndices.length; i++) {
      const tagIndex = tagIndices[i];
      const tagData = tagsData[tagIndex];
      
      console.log(`\n🏷️ Creating venue tag ${i + 1}/${tagIndices.length}`);
      
      // Click on Add Tag button (only for subsequent tags)
      if (i > 0) {
        await this.clickAddTagButton();
        await this.clickCreateButton();
        await this.clickVenueButton();
      }
      
      // Create the tag
      await this.createVenueTag(tagData, tagIndex);
    }
    
    console.log('\n🎉 All venue tags created successfully!');
  }

  /**
   * Check if tag creation was successful
   * @param {string} tagName - The tag name to verify
   */
  async verifyTagCreated(tagName) {
    // Wait for success message or redirect
    await this.page.waitForLoadState('networkidle');
    
    // Check if we're back on the tags list page
    const isOnTagsPage = this.page.url().includes('/tags');
    if (isOnTagsPage) {
      console.log(`✅ Tag "${tagName}" creation verified - on tags page`);
      return true;
    }
    
    console.log(`⚠️ Tag "${tagName}" creation status unclear`);
    return false;
  }
}
