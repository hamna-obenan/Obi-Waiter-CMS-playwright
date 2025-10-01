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
   * Navigate to category creation page
   * Flow: Login → Select Venue → Select Menu → Navigate to Category Page
   */
  async navigateToCategoryPage() {
    console.log('🏢 Selecting created venue...');
    await this.page.locator(locators["click-on-the-created-venue"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Venue selected successfully');

    console.log('📋 Selecting created menu...');
    
    // Wait for menu elements to be visible
    await this.page.waitForSelector(locators["created-menu"], { timeout: 10000 });
    console.log('✅ Menu elements found');
    
    // Check how many menu elements are available
    const menuCount = await this.page.locator(locators["created-menu"]).count();
    console.log(`📊 Found ${menuCount} menu elements`);
    
    // Click on the first menu
    await this.page.locator(locators["created-menu"]).first().click();
    console.log('✅ First menu clicked');
  }
}
