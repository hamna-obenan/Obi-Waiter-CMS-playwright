import { test, expect } from "@playwright/test";
import path from "path";
import TableManagementPOM from "../../object-Page/Table managment/generate-qr-code.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import urlVerification from "../../Fixtures/url_verification.json" assert { type: "json" };
import CreateCategoryCompanyPOM from "../../object-Page/Categories/createcategorycomapnypom.js";

test("Add first table: first time flow should redirect to generate QR code", async ({ page }) => {
  await test.step("Login with valid venue credentials", async () => {
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    await page.waitForLoadState('networkidle');
  });

  // Use venue POM to land on a menu (prerequisite before table management navigation)
  const createCategoryCompanyPOM = new CreateCategoryCompanyPOM(page);
  await createCategoryCompanyPOM.navigateToCategoryPage();
  await expect(page).toHaveURL(urlVerification["verify-the-categories-navigated-url"]);
  console.log('✅ Clicked on created Venue and then menu');

  // Open table management tab through dedicated POM helper
  const tableManagementPOM = new TableManagementPOM(page);
  await tableManagementPOM.openTableManagementTab();
  await expect(page).toHaveURL(/table-management/);
  console.log('✅ Clicked on table management button');

  // Start first table flow
  await page.locator(locators["new-table-button"]).click();
  await expect(page.locator(locators["new-table-button"])).toBeHidden();

  console.log('✅ Clicked on new table button');

  // Upload QR logo via hidden file input tied to the button label
  const logoInput = page.locator('input[type="file"]').first();
  const logoPath = path.resolve(process.cwd(), "Fixtures/pictures/venue-logo.png");
  await logoInput.setInputFiles(logoPath);
  console.log('✅ Uploaded logo image');
  //fill the foreground color
  await page.locator(locators["foreground-color-QR-code"]).click();
  await page.waitForTimeout(3000);

  await page.locator('input[placeholder="Foreground Color"][type="color"]').evaluate(
    (el, value) => {
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    },
    '#008679'
  );


  await expect(page.locator(locators["foreground-color-QR-code"])).toHaveValue("#008679");
  console.log('✅ Filled foreground color with light blue');
  //fill the background color
  await page.locator(locators["background-color-QR-code"]).click();
  await page.locator('input[placeholder="Foreground Color"][type="color"]').evaluate(
    (el, value) => {
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    },
    '#000000'
  );
  console.log('✅ Filled background color');

  await page.pause();

//   //fill the QR code header text
//   await page.locator(locators["qr-code-header-text"]).fill("Please Check In");
//   console.log('✅ Filled QR code header text');
//   //fill the QR code subtext
//   await page.locator(locators["qr-code-subtext"]).fill("Scan to see the menu");
//   console.log('✅ Filled QR code subtext');
//   //click on the generate button
//   await page.locator(locators["generate-button"]).click();
//   console.log('✅ Clicked on generate button');
//   //verify the QR code is generated
//   await expect(page.locator(locators["qr-code-image"])).toBeVisible();
});