import { expect } from "@playwright/test";
import locators from "../../Fixtures/locators.json" assert { type: "json" };

/**
 * Customization Venue Page Object Model
 * Simple navigation: Login → Venue → Menu → Stop
 */
export default class CustomizationVenuePOM {
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
  //click on the customizations tab
  async clickOnCustomizationsTab() {
    await this.page.locator(locators["customization-tab"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on customizations tab');
  }
  //click on the add customization button
  async clickOnAddCustomizationButton() {
    await this.page.locator(locators["add-customization-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on add customization button');
  }
  //click on the create button
  async clickOnCreateButton() {
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on create button');
  }
  //click on the venue button
  async clickOnVenueButton() {
    await this.page.locator(locators["venue-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on venue button');
  }
  //click on the customization name field
  async clickOnCustomizationNameField() {
    await this.page.locator(locators["customization-name"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on customization name field');
  }
  //click on the required checkbox
  async clickOnRequiredCheckbox() {
    await this.page.locator(locators["is-required-checkbox"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on required checkbox');
  }
  //click on the option box
  async clickOnOptionBox() {
    await this.page.locator(locators["option-box"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on option box');
  }
  /**
   * click on the price dropdown
   */
  async clickOnPriceDropdown() {
    await this.page.locator(locators["price-dropdown"]).nth(1).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on price dropdown');
  }
  //click on the save button
  async clickOnSaveButton() {
    await this.page.locator(locators["save-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on save button');
  }

}
