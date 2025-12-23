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
// click on the item tab
console.log('Opening Item tab');
await page.locator(locators['Item-tab']).click();
await expect(page.locator(locators['Item-tab'])).toBeVisible();
//click on the add button
console.log('Clicking Add Item');
await page.locator(locators['add-item-button']).click();
await expect(page.locator(locators['add-item-button'])).toBeVisible();
//click on the import
console.log('Opening Import dialog');
await expect(page.locator(locators['import-button'])).toBeVisible();
await page.locator(locators['import-button']).click();

//click on the items

console.log('Selecting first item');
await page.locator(locators['check-box']).nth(2).uncheck();
await expect(page.locator(locators['check-box']).nth(2)).toBeChecked();
console.log('Mapping first item to Appetizer');
await page.locator(locators['import-category-dropdown']).nth(2).click();
await expect(page.locator(locators['import-category-dropdown']).nth(2)).toBeVisible();
await page.getByText('Appetizer').nth(2).click();
await expect(page.getByText('Appetizer').nth(2)).toBeVisible();
//2nd item selection
console.log('Selecting second item');
await page.locator(locators['check-box']).nth(3).check();
await expect(page.locator(locators['check-box']).nth(3)).toBeChecked();
console.log('Mapping second item to Appetizer');
await page.locator(locators['import-category-dropdown']).nth(3).click();
await expect(page.locator(locators['import-category-dropdown']).nth(3)).toBeVisible();
await page.getByText('Appetizer').nth(3).click();
await expect(page.getByText('Appetizer').nth(3)).toBeVisible();
//3rd item selected
console.log('Selecting third item');
await page.locator(locators['check-box']).nth(4).check();
await expect(page.locator(locators['check-box']).nth(4)).toBeChecked();
console.log('Mapping third item to Appetizer');
await page.locator(locators['import-category-dropdown']).nth(4).click();
await expect(page.locator(locators['import-category-dropdown']).nth(4)).toBeVisible();
await page.getByText('Appetizer').nth(4).click();
await expect(page.getByText('Appetizer').nth(4)).toBeVisible();
//save 
await page.locator(locators['save-button']).click();

});