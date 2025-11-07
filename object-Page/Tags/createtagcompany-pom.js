import { expect } from "@playwright/test";
import locators from "../../Fixtures/locators.json" assert { type: "json" };

/**
 * Tag Company Page Object Model
 * Navigation: Login → Venue → Menu (nth 2) → Tags
 */
export default class TagCompanyPOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to venue page
   */
  async navigateToVenuePage() {
    await this.page.locator(locators["click-on-the-created-venue"]).first().click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to venue page');
  }

  /**
   * Navigate to menu page (click nth 2 menu)
   */
  async navigateToMenuPage() {
    // Wait for menu elements to be visible
    await this.page.waitForSelector(locators["created-menu"], { timeout: 10000 });
    
    // Click on the 2nd menu (nth 1 = 2nd element)
    const menuElement = this.page.locator(locators["created-menu"]).nth(2);
    await menuElement.waitFor({ state: 'visible', timeout: 10000 });
    await menuElement.click();
    
    // Wait for navigation to complete
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to menu page (clicked 2nd menu)');
  }
}
