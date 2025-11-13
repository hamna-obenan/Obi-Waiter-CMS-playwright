import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };
import { config } from '../../config/environments.js';
import { performLogin } from '../../utils/login-helper.js';
import login from '../../Fixtures/login.json' assert { type: "json" };


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
        await this.page.locator(locators["created-menu"]).nth(6).click();
    }
    
}