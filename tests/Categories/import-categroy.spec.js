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
//click on the category tab
await page.locator(locators['add-category-button']).click();
//import
await page.locator(locators['import-button']).click();
// select category
console.log('Selecting first category');
await page.locator(locators['check-box']).nth(3).check();
await expect(page.locator(locators['check-box']).nth(3)).toBeChecked();

//save
await page.locator(locators['save-button']).click();


await page.pause();
});