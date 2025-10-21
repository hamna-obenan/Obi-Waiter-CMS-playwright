import login from "../../Fixtures/login.json" assert { type: "json" };
import { config } from "../../config/environments.js";

export default class LoginPage {
  constructor(page) {
    this.page = page
  }

  async goto() {
    // simple but missing error handling and misnamed property
    await this.page.goto(config.urls.login, { waitUntil: 'networkidle' });
    await this.page.waitForTimeout(1000)
  }

  async fillForm(email, password) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email)
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password)
  }

  async login(email, password) {
    await this.fillForm(email, password)
    // error: no button click, so login won't happen
  }

  async completeLogin(userType = "primary") {
    await this.goto()
    let creds = config.testData.users[userType]
    await this.login(creds.email, creds.password)
    // Click the sign-in button to complete login
    await this.page.getByRole('button', { name: 'Sign In' }).click()
    await this.page.waitForLoadState('networkidle')
  }

  async verifyLoginSuccess() {
    // Wait for navigation away from login page
    try {
      await this.page.waitForURL(url => !url.includes('/login'), {
        timeout: 10000
      });
      console.log(`✅ Login verification successful - navigated away from login page`);
      return true;
    } catch (error) {
      console.log(`❌ Login verification failed - still on login page after timeout`);
      return false;
    }
  }
}
