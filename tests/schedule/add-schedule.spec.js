import { test, expect } from '@playwright/test';
import login from '../../Fixtures/login.json' assert { type: "json" };
import { performLogin } from '../../utils/login-helper.js';
import CreateCategoryCompanyPOM from '../../object-Page/Categories/createcategorycomapnypom.js';
import locators from '../../Fixtures/locators.json' assert {type : "json"};
import promo from '../../Fixtures/promo.json' assert { type: "json" };

test("Schedule", async ({ page }) => {
    //login with imported login file
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);

    //go to the category tab thought imported file category
    const createCategoryCompanyPOM = new CreateCategoryCompanyPOM(page);
    await createCategoryCompanyPOM.navigateToCategoryPage();
    //go to schedule
    await page.locator(locators['schedule']).click();
    //add new schedule
    await page.locator(locators['add-schedule-button']).click();
    //ope dropdown select item
    await page.locator(locators['select-item-dropdown']).click();
    //select item
    await page.getByText('Chicken Sandwich').click();
    // Assert selected value on the combobox input, not the adornment wrapper
    await expect(page.getByRole('combobox', { name: /Select Item/i })).toHaveValue(/Chicken Sandwich/i);
    //pick the starting date
    await page.locator('input[type="date"]').nth(0).click();
    //pick satrting date
    await page.keyboard.type(promo['start-date']);
    await expect(page.locator('input[type="date"]').nth(0)).toHaveValue(promo['start-date-verifi']);

    //select the start time
    await page.locator(locators['start-time']).click();
    await page.keyboard.type(promo['start-time']);
    await expect(page.locator(locators['start-time'])).toHaveValue(promo['start-time-verifi']);

    //select end date
    await page.locator('input[type="date"]').nth(1).click();
    await page.keyboard.type(promo['end-date']);
    await expect(page.locator('input[type="date"]').nth(1)).toHaveValue(promo['end-date-verifi']);
    //end time
    await page.locator(locators['end-time']).click();
    await page.keyboard.type(promo['end-time']);
    await expect(page.locator(locators['end-time'])).toHaveValue(promo['end-time-verifi']);




    await page.pause();
});