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
await page.locator(locators['tag-tab']).click();
//add tag
await page.locator(locators['create-tag-button']).click();
//import 
await page.locator(locators['import-button']).click();

// select tags
console.log('Selecting first tag');
await page.locator(locators['check-box']).nth(2).check();
await expect(page.locator(locators['check-box']).nth(2)).toBeChecked();
//2nd item selection
console.log('Selecting second tag');
await page.locator(locators['check-box']).nth(3).check();
await expect(page.locator(locators['check-box']).nth(3)).toBeChecked();
//3rd item selected
console.log('Selecting third tag');
await page.locator(locators['check-box']).nth(4).check();
await expect(page.locator(locators['check-box']).nth(4)).toBeChecked();

//save
await page.locator(locators['save-button']).click();

await page.pause();
});