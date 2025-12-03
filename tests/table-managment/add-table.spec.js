import { test, expect } from "@playwright/test";
import TableManagementPOM from "../../object-Page/Table managment/generate-qr-code.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import urlVerification from "../../Fixtures/url_verification.json" assert { type: "json" };
import CreateCategoryCompanyPOM from "../../object-Page/Categories/createcategorycomapnypom.js";
import { TIMEOUT } from "dns";
//  bug in image we add .reload to fix the test flow line number 26
test("Add first table: first time flow should redirect to generate QR code", async ({ page }) => {
//   await test.step("Login with valid venue credentials", async () => {
    // Step 1: Login with valid venue credentials
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    // await page.waitForLoadState("networkidle");
//   });
//  await page.pause();
  // Step 2: Wait for page to fully load after login
  await page.waitForTimeout(7000);
  await page.pause();
  
  // Step 3: Navigate to Categories page (prerequisite: need to select venue and menu first)
  const createCategoryCompanyPOM = new CreateCategoryCompanyPOM(page);
  await createCategoryCompanyPOM.navigateToCategoryPage();
  
  // Step 4: Verify we successfully navigated to Categories page
  await expect(page).toHaveURL(urlVerification["verify-the-categories-navigated-url"]);

  // Step 5: Navigate to Table Management page
  const tableManagementPOM = new TableManagementPOM(page);
  await tableManagementPOM.openTableManagementTab();
  
  
  // Step 6: Verify we successfully navigated to Table Management page
  await expect(page).toHaveURL(urlVerification["verify-the-table-management-navigated-url"]);

//   await page.reload();
  // Step 7: Click on "New Table" button to open the table creation form
    await page.locator(locators["new-table-button"]).click();
    
    // Step 8: Enter table name (e.g., "A2")
    await page.locator(locators["table-name"]).fill("A2");
    
    // Step 9: Enter table capacity (e.g., "02")
    await page.locator(locators["table-capacity"]).fill("02");
    
    // Step 10: Click on "Generate QR Code" button to generate QR code for the table
    await page.locator(locators["generate-QR-code-button"]).click();
    
    // Step 11: Click on "Save" button to save the table
    await page.locator(locators["save-button"]).click();
    
    // Step 12: Verify success message appears (currently commented out)
    // await expect(page.locator("//div[@role='alert']//*[normalize-space()='Table created successfully']")).toBeVisible();
});