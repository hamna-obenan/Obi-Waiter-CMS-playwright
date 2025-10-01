import { config } from "../../config/environments.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import signup from "../../Fixtures/sign up.json" assert { type: "json" };

/**
 * SignupPage POM Class
 * Handles signup form interactions and validations
 */
class SignupPage {
    constructor(page){
        this.page = page;   
        this.firstName = signup["First name"]
        this.lastName = signup["Last name"]
        this.Email = signup["Email"]
        this.CompanyName = signup["Company name"]
        this.Password = signup["Password"]
        this.ConfirmPassword = signup["Confirm password"]
    }
    async goto() {
        await this.page.goto(config.urls.base + '/signup');
    }
    async fillForm() {
        console.log(' Filling signup form...');
        await this.page.locator(locators["First name"]).fill(this.firstName);
        await this.page.locator(locators["Last name"]).fill(this.lastName);
        await this.page.locator(locators["Email"]).fill(this.Email);
        await this.page.locator(locators["Company name"]).fill(this.CompanyName);
        await this.page.locator(locators["Password"]).fill(this.Password);
        await this.page.locator(locators["Confirm password"]).fill(this.ConfirmPassword);
        console.log(' Signup form filled successfully');
    }

    async submit() {
        console.log(' Submitting signup form...');
        await this.page.locator(locators["signup-button"]).click();
        console.log(' Signup form submitted');
    }

    async completeSignup() {
        await this.fillForm();
        await this.submit();
    }
}
export default SignupPage;
