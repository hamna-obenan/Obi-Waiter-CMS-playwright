import { test, expect } from '@playwright/test';
import login from '../../Fixtures/login.json' assert { type: "json" };
import { performLogin } from '../../utils/login-helper.js';
import locators from '../../Fixtures/locators.json' assert {type : "json"};

test('importing items', async ({ page }) => {
// Step 1: Perform login with test credentials
await performLogin(page, login.TC1001.Email, login.TC1001.Password);
//   click on the 2nd venue
await page.locator(locators['created-menu']).nth(4).click();
//click non the first menu
console.log('Navigating to first menu in venue');
await page.locator(locators['created-menu']).nth(2).click();
await expect(page.locator(locators['created-menu']).nth(2)).toBeVisible();
//click on the the tag tab
await page.locator(locators['ingredient-tab']).click();
//add tag
await page.locator(locators['add-ingredient-button']).click();
//import 
await page.locator(locators['import-button']).click();
//select ingredients
console.log('Selecting ingredients');
await page.locator(locators['check-box']).nth(6).check();
await expect(page.locator(locators['check-box']).nth(6)).toBeChecked();
//2nd item selection
console.log('Selecting second ingredients');
await page.locator(locators['check-box']).nth(8).check();
await expect(page.locator(locators['check-box']).nth(8)).toBeChecked();
//save
await page.locator(locators['save-button']).click();
});