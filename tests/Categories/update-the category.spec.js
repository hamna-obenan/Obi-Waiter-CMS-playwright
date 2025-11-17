import { test, expect } from "@playwright/test";
import UpdateTheCategory from "../../object-Page/Categories/update-the-category.js";
test("Update the category", async ({ page }) => {
    test.setTimeout(120000);
    const updateTheCategory = new UpdateTheCategory(page);
    // Login
    await updateTheCategory.login();
    //click on the created venue
    await updateTheCategory.clickOnCreatedVenue();
    // await page.pause();
    //click on the created menu
    await updateTheCategory.clickOnCreatedMenu();
    //edit the category
    await updateTheCategory.editTheCategory();
    //click on the save button
    await updateTheCategory.clickOnSaveButton();
});