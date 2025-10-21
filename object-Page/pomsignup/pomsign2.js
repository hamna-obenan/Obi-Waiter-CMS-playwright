import locators from "../../Fixtures/locators.json" assert { type: "json" };
import signup from "../../Fixtures/sign up.json";
import { config } from '../../config/environments.js';

export default class PomSign2 {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(config.urls.signup);
  }

  async fill(data) {
    await this.page.locator(locators["First name"]).fill(data["First name"]);
    await this.page.locator(locators["Last name"]).fill(data["Last name"]);
    await this.page.locator(locators["Email"]).fill(data["Email"]);
    await this.page.locator(locators["Company name"]).fill(data["Company name"]);
    await this.page.locator(locators["Password"]).fill(data["Password"]);
    await this.page.locator(locators["Confirm password"]).fill(data["Confirm password"]);
  }

  async submit() {
    await this.page.locator(locators["signup-button"]).click();
  }

  async signupWithFixture({ companyNameOverride } = {}) {
    const data = {
      ...signup,
      ...(companyNameOverride ? { "Company name": companyNameOverride } : {}),
    };
    await this.fill(data);
    await this.submit();
  }
}
