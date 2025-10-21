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

  /**
   * click on the price dropdown
   */
  async clickOnPriceDropdown() {
    await this.page.locator(locators["price-dropdown"]).nth(1).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on price dropdown');
  }
  async clickOnPriceDropdown2() {
    await this.page.locator(locators["price-dropdown-2"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on price dropdown2');
  }

  async clickOnEnterCustomPrice2() {
    await this.page.locator(locators["enter-custom-price-2"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on enter custom price2');
  }
}
