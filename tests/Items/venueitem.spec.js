import { test, expect } from "@playwright/test";
import CreateVenueItemPOM from "../../object-Page/itemspom/venueitemcreate.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import items from "../../Fixtures/items.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

/**
 * Venue Level Item Creation Test Suite
 */
test.describe("Item Venue - Venue Level", () => {
  
  test("Create Venue Item", async ({ page }) => {
    test.setTimeout(120000);
    const createVenueItemPOM = new CreateVenueItemPOM(page);

   // Login
   await performLogin(page, login.TC1001.Email, login.TC1001.Password);
   await expect(page.locator('text=Select venue')).toBeVisible();
   // after login land at venue page
   await expect(page.locator(locators["click-on-the-created-venue"])).toBeVisible();
   

   
   // After clicking the created venue, land at the menu page, then click on the menu
   await createVenueItemPOM.navigateToVenuePage(); // Clicks on the created venue
   // Expect to be on the menu page where we can see the menu to click
   await expect(page.locator('text=Select menu')).toBeVisible();
   // Now click on the menu (proceed to menu page by clicking the 2nd menu)
   await createVenueItemPOM.navigateToMenuPage();
    
   // After clicking the menu, land at the categories page
    await createVenueItemPOM.navigateTocategoriesPage();
    // Verify that you landed at the category page
    await expect(page).toHaveURL(locators["verify-the-categories-navigated-url"]);

   
  });
});