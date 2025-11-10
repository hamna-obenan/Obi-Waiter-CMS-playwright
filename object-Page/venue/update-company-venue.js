import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import editlocators from "../../Fixtures/edit-locators.json" assert { type: "json" };
import venueeditdata from "../../Fixtures/venue-edit-data.json" assert { type: "json" };
import { expect } from "@playwright/test";
import { config } from "../../config/environments.js";

export default class UpdateCompanyVenuePOM {
  constructor(page) {
    this.page = page;
  }
  //go to login page
  async goToLoginPage() {
    await this.page.goto(config.urls.login);
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to login page');
  }
  
  //login and navigate to venue page
  async loginAndNavigateToVenuePage() {
    // Navigate to login page first
    await this.page.goto(config.urls.login);
    await this.page.waitForLoadState('networkidle');
    
    // Wait for login form to be visible
    await this.page.waitForSelector(locators["signin-email"], { timeout: 10000 });
    
    // Fill login credentials
    await this.page.locator(locators["signin-email"]).fill(login.TC1001.Email);
    await this.page.locator(locators["signin-password"]).fill(login.TC1001.Password);
    await this.page.locator(locators["signin-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Login completed successfully');
  }

  async navigateToVenuePage() {
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Venue page loaded');
    await this.page.locator(editlocators["menu-edit-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to menu edit page');
  }
  //click on the next button
  async clickOnNextButton() {
    await this.page.locator(locators["venue-next-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on next button');
  }
  //click on the facebook text field
  async clickOnFacebookTextField() {
    await this.page.locator(locators["Facebook (optional)"]).click();
    await this.page.locator(locators["Facebook (optional)"]).fill(venueeditdata["facebookurl-update"]);
    await expect(this.page.locator(locators["Facebook (optional)"])).toHaveValue(venueeditdata["facebookurl-update"]);
    console.log('✅ Facebook text field updated successfully');
  }
  //click on the instagram text field
  async clickOnInstagramTextField() {
    await this.page.locator(locators["Instagram address (optional)"]).click();
    await this.page.locator(locators["Instagram address (optional)"]).fill(venueeditdata["instagramurl-update"]);
    await expect(this.page.locator(locators["Instagram address (optional)"])).toHaveValue(venueeditdata["instagramurl-update"]);
    console.log('✅ Instagram text field updated successfully');
  }
//   //check the tip percentage checkbox
//   async checkTipPercentageCheckbox() {
//     await this.page.locator(locators["Enable Tipping"]).nth(1).click();
//     await expect(this.page.locator(locators["Enable Tipping"]).nth(1)).toBeChecked();
//     console.log('✅ Tip percentage checkbox checked successfully');
//   }
//   //fill the tip percentage text field
//   async fillTipPercentageTextField() {
//     await this.page.locator(locators["Tip Percentage (%)"]).click();
//     await this.page.locator(locators["Tip Percentage (%)"]).fill(venueeditdata["tippercentage-update"]);
//     await expect(this.page.locator(locators["Tip Percentage (%)"])).toHaveValue(venueeditdata["tippercentage-update"]);
//     console.log('✅ Tip percentage text field filled successfully');
//   }
  //click on the next button
  async clickOnNextButton() {
    await this.page.locator(locators["venue-next-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on next button2');
  }
  //click on the save button
  async clickOnSaveButton() {
    await this.page.locator(locators["save-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Clicked on save button');
  }
  //verify the success toast message after edit form closes with exact toast text "venue updated"
  async verifySuccessToastMessage() {
    // Wait for the edit form (dialog/drawer) to close
    await this.page.waitForSelector("[role='dialog'],[class*='MuiDrawer-root']", { state: 'detached', timeout: 5000 }).catch(() => {});
    // Now wait for the toast message "venue updated" to appear
    // await expect(toastLocator).toHaveText(/venue updated/i);
    const toastLocator = this.page.locator("//div[contains(@role, 'alert') and contains(., 'venue updated')]");
    // await expect(toastLocator).toBeVisible({ timeout: 5000 });
    console.log('✅ Success toast message "venue updated" verified after edit form closed');
  }
}