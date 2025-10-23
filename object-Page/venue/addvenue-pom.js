import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import venue from "../../Fixtures/Venue.json" assert { type: "json" };
import { config } from "../../config/environments.js";
import path from "node:path";

/**
 * Page Object Model for Venue Duplication Testing
 * Handles venue creation, duplication validation, and error checking
 */
export default class VenueDuplicationPOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Add Venue page
   */
  async navigateToAddVenue() {
    await this.page.locator("//*[@data-testid='AddSharpIcon']/following-sibling::p[normalize-space()='Add']").click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to Add Venue page');
  }
}