// POM dedicated for tests/login/login3.spec.js (negative: correct email, wrong password)
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import { config } from '../../config/environments.js';

export default class PomLogin3 {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(config.urls.login);
  }

  async login(email, password) {
    await this.page.locator(locators["signin-email"]).fill(email);
    await this.page.locator(locators["signin-password"]).fill(password);
  }

  async loginById(testId) {
    const creds = login[testId];
    if (!creds) {
      throw new Error(`No credentials found in login.json for id: ${testId}`);
    }
    const { Email, Password } = creds;
    await this.login(Email, Password);
  }

  async signinButton() {
    await this.page.locator(locators["signin-button"]).click();
  }
}
