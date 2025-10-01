import { config } from "../../config/environments.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import signup from "../../Fixtures/sign up.json" assert { type: "json" };
import { expect } from "@playwright/test";

/**
 * PomSign1 POM Class
 * Handles signup validation flows and error scenarios
 */
export default class PomSign1 {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(config.urls.base + "/signup");
  }

  async fillFromFixture() {
    console.log(' Filling signup form from fixture data...');
    await this.page.locator(locators["First name"]).fill(signup["First name"]);
    await this.page.locator(locators["Last name"]).fill(signup["Last name"]);
    await this.page.locator(locators["Email"]).fill(signup["Email"]);
    await this.page.locator(locators["Company name"]).fill(signup["Company name"]);
    await this.page.locator(locators["Password"]).fill(signup["Password"]);
    await this.page.locator(locators["Confirm password"]).fill(signup["Confirm password"]);
    console.log(' Signup form filled from fixture data');
  }

  async submit() {
    console.log(' Submitting signup form...');
    await this.page.locator(locators["signup-button"]).click();
    console.log(' Signup form submitted');
  }

  // Convenience: fill and submit with one call
  async signupWithFixture() {
    console.log(' Starting complete signup flow...');
    await this.fillFromFixture();
    await this.submit();
    console.log(' Complete signup flow finished');
  }

  // Assertion helper: expect duplicate/exists error to appear
  async expectDuplicateError() {
    console.log(' Checking for duplicate company error...');
    // Use a robust regex match; adjust to the exact text your app shows if needed
    const err = this.page.getByText(/already|exists|taken|registered/i);
    await expect(err).toBeVisible();
    console.log(' Duplicate company error verified');
  }
}
