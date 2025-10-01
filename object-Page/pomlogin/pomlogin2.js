// POM dedicated for tests/login/login2.spec.js (negative: wrong email, correct password)
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };

export default class PomLogin2 {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://develop.d20aue3nu6xt33.amplifyapp.com/login");
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
