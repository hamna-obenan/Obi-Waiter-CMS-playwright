import { test, expect } from '@playwright/test';
import login from '../../Fixtures/login.json' assert { type: "json" };
import { performLogin } from '../../utils/login-helper.js';
import CreateCategoryCompanyPOM from '../../object-Page/Categories/createcategorycomapnypom.js';
import locators from '../../Fixtures/locators.json' assert {type : "json"};
import dealManagment from '../../Fixtures/deal-managment.json' assert { type: "json" };

test("Amount Off Deal", async ({ page }) => {
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
    await page.getByText("Amount off").click();
    // Assertion: Check that "Amount off" is now selected as the deal type
    await expect(page.locator(locators["deal-type-name"])).toHaveValue(/Amount off/i);
    console.log("Deal type selected");

    //add deal name
    await page.locator(locators["deal-name"]).click();
    await page.locator(locators["deal-name"]).fill(dealManagment["amountoff-deal-name"]);
    // Assertion: Check if the value has been filled correctly
    await expect(page.locator(locators["deal-name"])).toHaveValue(dealManagment["amountoff-deal-name"]);
    console.log("deal name entered");
    //select the image
    await page.getByText("Choose Image").click();
    const dealImageInput = page.locator('input[type="file"]').first();
    await dealImageInput.setInputFiles('Fixtures/pictures/amountoff.png');
    await page.waitForSelector('img[alt="logo"], img[alt="Deal Image"], [data-testid="preview-image"]', { timeout: 10000 });
    // Wait for the upload button to be visible before clicking (for reliability)
    await page.waitForSelector(locators["upload-button"], { timeout: 10000 });
    await page.locator(locators["upload-button"]).nth(1).click();
    console.log("image upload successfully");   
    //Amount off detailed 
    await page.locator(locators["quantity-and-price"]).click();
    await page.locator(locators["quantity-and-price"]).fill(dealManagment["amountoff-discount"]);
    // Assertion: Check if the value has been filled correctly
    await expect(page.locator(locators["quantity-and-price"])).toHaveValue(dealManagment["amountoff-discount"]);
    //click on the save button
    await page.locator(locators["save-button"]).click();
    await expect(page.locator("//div[@role='alert']")).toContainText("Deal created successfully");

});