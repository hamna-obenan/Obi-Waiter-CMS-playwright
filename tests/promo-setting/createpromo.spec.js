import { test, expect } from '@playwright/test';
import login from '../../Fixtures/login.json' assert { type: "json" };
import { performLogin } from '../../utils/login-helper.js';
import CreateCategoryCompanyPOM from '../../object-Page/Categories/createcategorycomapnypom.js';
import locators from '../../Fixtures/locators.json' assert {type : "json"};
import promo from '../../Fixtures/promo.json' assert { type: "json" };
test("Combo Deal", async ({ page }) => {
    //login with imported login file
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);

    //go to the category tab thought imported file category
    const createCategoryCompanyPOM = new CreateCategoryCompanyPOM(page);
    await createCategoryCompanyPOM.navigateToCategoryPage();
    //click on the promo 
    await page.locator(locators['Promo-setting']).click();
    //click on the add button
    await page.locator(locators["click-add-venue-button"]).click();
    //add title name 
    await page.locator(locators['promo-name']).click();
    //fill promo name
    await page.locator(locators['promo-name']).fill(promo['promo-name']);
    await expect(page.locator(locators['promo-name'])).toHaveValue(promo['promo-name']);
    //add promo discription
    await page.locator(locators['promo-discription']).click();
    //fill the discription
    await page.locator(locators['promo-discription']).fill(promo['promo-discription']);
    await expect(page.locator(locators['promo-discription'])).toHaveValue(promo['promo-discription']);

    //add image
    //select the image
    await page.getByText("Choose Image").click();
    const dealImageInput = page.locator('input[type="file"]').first();
    await dealImageInput.setInputFiles('Fixtures/pictures/percentage-off.png');
    console.log("image uploaded");
    // Assertion: Check if the image preview (img or placeholder) is now visible/updated
    await page.waitForSelector('img[alt="logo"], img[alt="Deal Image"], [data-testid="preview-image"]', { timeout: 10000 });
    await expect(page.locator('img[alt="logo"], img[alt="Deal Image"], [data-testid="preview-image"]').first()).toBeVisible();
    // Wait for the upload button to be visible before clicking (for reliability)
    await page.waitForSelector(locators["upload-button"], { timeout: 10000 });
    await page.locator(locators["upload-button"]).nth(1).click();
    console.log("image upload successfully");
    //add target item
    await page.locator(locators['select-target-item']).click();
    //select the item
    await page.getByRole('option', { name: 'Special Plater' }).click();
    await expect(page.locator(locators['select-target-item'])).toHaveText(/Special Plater/i);
    //pick the starting date
    await page.locator('input[type="date"]').nth(0).click();
    //pick satrting date
    await page.keyboard.type(promo['start-date']);
    await expect(page.locator('input[type="date"]').nth(0)).toHaveValue(promo['start-date-verifi']);
    
    //pick end time
    await page.locator(locators['select-date']).nth(1).click();
    //pick satrting date
    await page.keyboard.type(promo['end-date']);
    await expect(page.locator(locators['select-date']).nth(1)).toHaveValue(promo['end-date-verifi']);
    await page.locator(locators['save-button']).click();
});