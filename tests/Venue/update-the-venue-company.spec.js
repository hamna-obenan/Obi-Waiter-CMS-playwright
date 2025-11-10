import { test, expect } from "@playwright/test";
import UpdateCompanyVenuePOM from "../../object-Page/venue/update-company-venue.js";
import editlocators from "../../Fixtures/edit-locators.json" assert { type: "json" };
import locators from "../../Fixtures/locators.json" assert { type: "json" };
test.describe("Update the venue company level", () => {
 test("Update the venue company", async ({ page }) => {
    test.setTimeout(120000);
    const updateCompanyVenuePOM = new UpdateCompanyVenuePOM(page);
    // Login
    await updateCompanyVenuePOM.loginAndNavigateToVenuePage();
    // Navigate to venue page
    await updateCompanyVenuePOM.navigateToVenuePage();
    // Click on the next button
    await updateCompanyVenuePOM.clickOnNextButton();
    await page.pause();
    // Click on the facebook text field
    await updateCompanyVenuePOM.clickOnFacebookTextField();
    // Click on the instagram text field1
    await updateCompanyVenuePOM.clickOnInstagramTextField();
    // // Check the tip percentage checkbox
    // await updateCompanyVenuePOM.checkTipPercentageCheckbox();
    // // Fill the tip percentage text field
    // await updateCompanyVenuePOM.fillTipPercentageTextField();
    // Click on the next button2
    await updateCompanyVenuePOM.clickOnNextButton();
    // Click on the save button
    await updateCompanyVenuePOM.clickOnSaveButton();
    // Verify the success toast message
    await updateCompanyVenuePOM.verifySuccessToastMessage();
  });
});