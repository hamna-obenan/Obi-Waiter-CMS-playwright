import { test, expect } from '@playwright/test';
import login from '../../Fixtures/login.json' assert { type: "json" };
import { performLogin } from '../../utils/login-helper.js';
import locators from '../../Fixtures/locators.json' assert {type : "json"};

test('test', async ({ page }) => {
// Step 1: Perform login with test credentials
await performLogin(page, login.TC1001.Email, login.TC1001.Password);
//   click on the 2nd venue
await page.locator(locators['created-menu']).nth(4).click();
// click on the add button
await page.locator(locators['click-on-the-add-menu']).click();
await expect(page.locator(locators['import-button'])).toBeVisible(); // Assert import button visible

//click on the import button
await page.locator(locators['import-button']).click();
await expect(page.locator(locators['check-box']).nth(0)).toBeVisible(); // Assert menu to import visible

//select the menu to import
await page.locator(locators['check-box']).nth(0).check();
await expect(page.locator(locators['check-box']).nth(0)).toBeChecked(); // Assert menu is checked
//click on the save button
await page.locator(locators['save-button']).click();

});