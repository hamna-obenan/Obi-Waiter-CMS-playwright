import { test, expect } from '@playwright/test';
import login from '../../Fixtures/login.json' assert { type: "json" };
import { performLogin } from '../../utils/login-helper.js';
import CreateCategoryCompanyPOM from '../../object-Page/Categories/createcategorycomapnypom';
import locators from '../../Fixtures/locators.json' assert {type : "json"};
import dealManagment from '../../Fixtures/deal-managment.json' assert { type: "json" };

test("Flat Percentage Off Deal", async ({ page }) => {
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
    await page.locator(locators["new-deal-button"]).click()
    //add deal name
    await page.locator(locators["deal-name"]).click();
    await page.locator(locators["deal-name"]).fill(dealManagment["percentage-off-deal-name"]);
    // Upload deal image from Fixtures/pictures/percentage-off.png
    // Click on the "Choose Image" text element to open the file picker
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

    //percentage discount detail
    //click on the discount number box
    await page.locator(locators["quantity-and-price"]).nth(0).click();
    await page.locator(locators["quantity-and-price"]).nth(0).fill(dealManagment["discount-percentage"]);
    // Assert the discount percentage value has been filled correctly
    await page.waitForTimeout(300); // brief pause to allow value to settle in field
    await expect(page.locator(locators["quantity-and-price"]).nth(0)).toHaveValue(dealManagment["discount-percentage"]);
    console.log("Discount value entered");
    //add min order price
    await page.locator(locators["quantity-and-price"]).nth(1).click();
    await page.locator(locators["quantity-and-price"]).nth(1).fill(dealManagment["minimum-order-percentage"]);
    // Assert the minimum order percentage value has been filled correctly
    await page.waitForTimeout(300); // brief pause to allow value to settle in field
    await expect(page.locator(locators["quantity-and-price"]).nth(1)).toHaveValue(dealManagment["minimum-order-percentage"]);
    console.log("Minimum Order price entered");

    //write a function to enter the time 
    const to24HourFormat = (timeString) => {
        const match = timeString.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!match) return timeString;
        let [_, hours, minutes, meridiem] = match;
        let hrs = parseInt(hours, 10);
        if (meridiem.toUpperCase() === 'AM') {
            hrs = hrs === 12 ? 0 : hrs;
        } else {
            hrs = hrs === 12 ? 12 : hrs + 12;
        }
        return `${hrs.toString().padStart(2, '0')}:${minutes}`;
    };
    //enter start time
    await page.locator(locators["start-time"]).click();
    const startTime24h = to24HourFormat(dealManagment["start-time-percentage"]);
    await page.locator(locators["start-time"]).fill(startTime24h);
    // Assert the start time value has been filled correctly
    await page.waitForTimeout(300); // brief pause to allow value to settle in field
    await expect(page.locator(locators["start-time"])).toHaveValue(startTime24h);
    
    // Convert and enter the end time in 24-hour format
    const endTime24h = to24HourFormat(dealManagment["end-time-percentage"]);
    await page.locator(locators["end-time"]).click();
    await page.locator(locators["end-time"]).fill(endTime24h);
    // Assert the end time value has been filled correctly
    await page.waitForTimeout(300); // brief pause to allow value to settle in field
    await expect(page.locator(locators["end-time"])).toHaveValue(endTime24h);

    //click on the first user only 
    await page.locator(locators["deal-active-checkbox"]).nth(8).click();
    // Assert that the checkbox is checked after clicking
    await expect(page.locator(locators["deal-active-checkbox"]).nth(8)).toBeChecked();
    //click on the save button 
    await page.locator(locators["save-button"]).click();
    // Assert that save was successful by checking for the presence of a success toast or confirmation UI element
    // Adjust the selector/message as per your app's actual feedback element on save success
    await expect(page.locator("//div[@role='alert']")).toContainText("Deal created successfully");
    console.log("Deal save successfully");


    await page.pause();

});