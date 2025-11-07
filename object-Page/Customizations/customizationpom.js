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
    // ✅ Assertion: Verify we navigated to venue page
    await expect(this.page).toHaveURL(/venue/);
    await this.page.locator(locators["click-on-the-created-venue"]).first().click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to venue page');
  }

  /**
   * Navigate to menu page
   */
  async navigateToMenuPage() {
    // ✅ Assertion: Verify we navigated to menu page
    await expect(this.page).toHaveURL(/menu/);
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
  //click on the customization tab
  async clickOnCustomizationTab() {
    await expect(this.page).toHaveURL(/customizations/);
    await this.page.locator(locators["customization-tab"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on customization tab');
  }

  //click on the add customization button
  async clickOnAddCustomizationButton() {
    await expect(this.page).toHaveURL(/customizations/);
    await this.page.locator(locators["add-customization-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on add customization button');
  }

  //click on the create button
  async clickOnCreateButton() {
    await expect(this.page).toHaveURL(/customizations/);
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on create button');
  }

  //click on the company level button
  async clickOnCompanyButton() {
    await expect(this.page).toHaveURL(/customizations/);
    await this.page.locator(locators["company-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on company button');
  }
  //type the customization name
  async typeCustomizationName(customizationName) {
    await expect(this.page).toHaveURL(/customizations/);
    await this.page.locator(locators["customization-name"]).fill(customizationName);
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Customization name filled');
  }
  //click on the required checkbox
  async clickOnRequiredCheckbox() {
    await expect(this.page).toHaveURL(/customizations/);
    await this.page.locator(locators["is-required-checkbox"]).check();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Required checkbox clicked');
  }
  //type the option box
  async typeOptionBox(optionBox) {
    await expect(this.page).toHaveURL(/customizations/);
    await this.page.locator(locators["option-box"]).fill(optionBox);
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Option box filled');
  }
  //click on the price dropdown
  async clickOnPriceDropdown() {
    await expect(this.page).toHaveURL(/customizations/);
    await this.page.locator(locators["price-dropdown"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Price dropdown clicked');
  }
  //click on the enter custom price button
  async clickOnEnterCustomPriceButton() {
    await expect(this.page).toHaveURL(/customizations/);
    await this.page.locator(locators["enter-custom-price"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Enter custom price button clicked');
  }


  // Click on the save button (robust version)
  async clickOnSaveButton() {
    // Find the Save button by its visible label
    const saveButton = this.page.locator(locators["save-button"]);
    // Wait to be visible and enabled
    await saveButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(saveButton).toBeEnabled();

    // Click and wait for navigation to customizations list page
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      saveButton.click()
    ]);
    console.log('✅ Save button clicked');
  }
}
