import { expect } from "@playwright/test";
import locators from "../../Fixtures/locators.json" assert { type: "json" };

/**
 * Customization Page Object Model
 * Simple navigation: Login → Venue → Menu → Stop
 */
export default class CustomizationPOM {
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
   * Navigate to menu page
   */
  async navigateToMenuPage() {
    await this.page.locator(locators["created-menu"]).nth(2).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to menu page (clicked 3rd menu)');
  }

  /**
   * Click on menu
   */
  async clickOnMenu() {
    await this.page.locator(locators["created-menu"]).nth(2).click();

    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on 3rd menu');
  }
}
