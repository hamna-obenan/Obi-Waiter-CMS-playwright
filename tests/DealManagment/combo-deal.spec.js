import { test, expect } from '@playwright/test';
import login from '../../Fixtures/login.json' assert { type: "json" };
import { performLogin } from '../../utils/login-helper.js';
import CreateCategoryCompanyPOM from '../../object-Page/Categories/createcategorycomapnypom.js';
import locators from '../../Fixtures/locators.json' assert {type : "json"};
import dealManagment from '../../Fixtures/deal-managment.json' assert { type: "json" };

test("Combo Deal", async ({ page }) => {
    //login with imported login file
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);

    //go to the category tab thought imported file category
    const createCategoryCompanyPOM = new CreateCategoryCompanyPOM(page);
    await createCategoryCompanyPOM.navigateToCategoryPage();
    // go to Deals managment 
    await page.locator('a[href="/deal-management"]').click();
    console.log("Land at the Deal MAnagment tab")
    await page.waitForLoadState('networkidle');
    //click on new button to create new deal
    await page.locator(locators["new-deal-button"]).click();
    console.log("clicked on the add button");

    //select the deal type
    await page.locator(locators["deal-type-name"]).click();
    await page.getByText("Combo Deal").click();
    // Assertion: Check that "Combo Deal" is now selected as the deal type
    await expect(page.locator(locators["deal-type-name"])).toHaveValue(/Combo Deal/i);
    console.log("Deal type selected");
    //select the image
    await page.getByText("Choose Image").click();
    const dealImageInput = page.locator('input[type="file"]').first();
    await dealImageInput.setInputFiles('Fixtures/pictures/percentage-off.png');
    console.log("image uploaded");
    // Assertion: Check if the image preview (img or placeholder) is now visible/updated
    // Adjust selector if UI shows img or similar after upload
    await page.waitForSelector('img[alt="logo"], img[alt="Deal Image"], [data-testid="preview-image"]', { timeout: 10000 });
    // Wait for the upload button to be visible before clicking (for reliability)
    await page.waitForSelector(locators["upload-button"], { timeout: 10000 });
    await page.locator(locators["upload-button"]).nth(1).click();
    console.log("image upload successfully");
    //add the combo deal details 
    await page.locator(locators["quantity-and-price"]).nth(0).click();
    await page.locator(locators["quantity-and-price"]).nth(0).fill(dealManagment["discount-percentage"]);
    //asssertion
    await page.waitForTimeout(300); // brief pause to allow value to settle in field
    await expect(page.locator(locators["quantity-and-price"]).nth(0)).toHaveValue(dealManagment["discount-percentage"]);
    console.log("Discount value entered");
    await page.pause();
    //select item drop down
    await page.locator(locators["select-item-dropdown"]).nth(0).click();
    await page.getByText("Special Plater").click();
    // Assertion: Check that "Combo Deal" is now selected as the deal type
    await expect(page.locator(locators["deal-type-name"])).toHaveValue(/Special Plater/i);
    console.log("Item selected");

    //select the price
    await page.locator(locators["select-price-1"]).click();
    await page.locator(locators["select-price-1"]).fill(dealManagment["combo-deal-price1"]);
    //select the quantity
    await page.locator(locators["quantity-and-price"]).nth(1).click();
    await page.locator(locators["quantity-and-price"]).nth(1).fill(dealManagment["combo-quantity1"]);

    //select the item 2
    await page.locator(locators["select-item-dropdown"]).nth(1).click();
    await page.getByText("SChicken Sandwich").click();
    await expect(page.locator(locators["deal-type-name"])).toHaveValue(/Chicken Sandwich/i);

    //select the price 20
    await page.locator(locators["select-price-2"]).click();
    await page.locator(locators["select-price-2"]).fill(dealManagment["combo-deal-price2"]);
    //select the quantity
    await page.locator(locators["quantity-and-price"]).nth(2).click();
    await page.locator(locators["quantity-and-price"]).nth(2).fill(dealManagment["combo-quantity2"]);

    await page.pause();
 




});