import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };
import { config } from '../../config/environments.js';
import { performLogin } from '../../utils/login-helper.js';
import login from '../../Fixtures/login.json' assert { type: "json" };
import categories from '../../Fixtures/Categories.json' assert { type: "json" };



export default class UpdateTheCategory {
    constructor(page) {
        this.page = page;
    }
    
    
    async login() {
        //goto the login page
        await this.page.goto(config.urls.login);
        await performLogin(this.page, login.TC1001.Email, login.TC1001.Password);
    }
    //click on the created venue
    async clickOnCreatedVenue() {
        await this.page.locator(locators["click-on-the-created-venue"]).first().click();
    }
    //click on the created menu
    async clickOnCreatedMenu() {
        //assert for cick on the created menu
        await this.page.waitForSelector(locators["created-menu"], { state: 'visible', timeout: 10000 });
        await this.page.locator(locators["created-menu"]).nth(2).click();
    }
    //edit the category
    async editTheCategory() {
        await this.page.waitForTimeout(2000);
        await this.page.locator(locators["edit-icon"]).nth(2).click();
        // Import Categories json
        await this.page.locator(locators["category-name"]).fill(categories["updated-category-name"]);
        //assert the updated category name
        await expect(this.page.locator(locators["category-name"])).toHaveValue(categories["updated-category-name"]);
    }
    //click on the save button
    async clickOnSaveButton() {
        await this.page.locator(locators["save-button"]).click();
        await this.page.waitForTimeout(2000);
        //assert the success toast message
        await expect(this.page.getByText('category.CATEGORY_UPDATED_SUCCESSFULLY', { exact: false })).toBeVisible();
    }
}