import { test, expect } from "@playwright/test";
import CreateCompanyItemPOM from "../../object-Page/items/createcomapnyitem.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import items from "../../Fixtures/items.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

/**
 * Item Creation Test Suite - Company Level
 * Tests company item creation flow
 * Flow: Login → Venue → Click Created Venue → Navigate to Menu → Click Created Menu → Navigate to Category → Click Items from Header
 */
test.describe("Item Management - Company Level", () => {
  
  test("Create Company Item", async ({ page }) => {
    test.setTimeout(120000);
    const createCompanyItemPOM = new CreateCompanyItemPOM(page);
    
    // Login
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    console.log('✅ Login completed successfully');

    // Assert: Verify we're on the venue page
    await expect(page).toHaveURL(locators["verify-the-venue-navigated-url"]);
    console.log('✅ Verified: On venue page');
    
    // Click on created venue (this takes us to venue page)
    console.log('🏢 Step 1: Click on created venue');
    await createCompanyItemPOM.navigateToVenuePage();
    
    // Navigate to menu page
    console.log('📋 Step 2: Navigate to menu page');
    await createCompanyItemPOM.navigateToMenuPage();
    console.log('✅ Navigated to menu page');

        

    // Navigate to categories tab
    console.log('📂 Step 3: Navigate to categories tab');
    await createCompanyItemPOM.navigateTocategoriesPage();
    console.log('✅ Navigated to categories tab');
    
    // Assert: Verify we're on the categories page
    await expect(page).toHaveURL(locators["verify-the-categories-navigated-url"]);
    console.log('✅ Verified: Successfully navigated to categories page');
      
    // Navigate to items tab from header
    console.log('🍽️ Step 5: Navigate to items tab from header');
    await createCompanyItemPOM.navigateToItemsTab();
      
    // Assert: Verify we're on the items page
    await expect(page).toHaveURL(locators["verify-the-items-navigated-url"]);
    console.log('✅ Verified: Successfully navigated to items page');
      
    // Click on Add Item button
    console.log('➕ Step 6: Click on Add Item button');
    await createCompanyItemPOM.clickAddItemButton();

    //assertion for verify the create button clicked successfully
    await expect(page.locator(locators["create-button"])).toBeVisible();
    console.log('✅ Verified: Create button visible');

    //click on the create button
    console.log('🔨 Step 7: Click on the create button');
    await createCompanyItemPOM.clickCreateButton();
      
    //assertion for verify the company button clicked successfully
    await expect(page.locator(locators["company-button"])).toBeVisible();
    console.log('✅ Verified: Company button visible');
      
    //click on the company button
    console.log('🏢 Step 8: Click on the company button');
    await createCompanyItemPOM.clickCompanyButton();


      
    // Assert: Verify item creation form is ready
    await expect(page.locator(locators["item-name"])).toBeVisible();
    console.log('✅ Verified: Item creation form is ready');
      
    // Create company item using data from items.json
    const itemData = items[0]; // Use first item from the JSON file
      
    console.log('🍽️ Starting company item creation process...');
    await createCompanyItemPOM.createCompanyItem(itemData);
      
    //click on the item name
    await createCompanyItemPOM.fillItemName(itemData["item-name 1"]);
     
    //   //click on the in stock
    await createCompanyItemPOM.selectTheStatus('In Stock');
   

    //select the menu from dropdown
    await createCompanyItemPOM.selectMenu(itemData["menu"]);

    //assertion for verify the menu selected successfully
    await expect(page.locator(locators["select-menu-dropdown"])).toHaveValue(itemData["Menu 1"]);
    await page.pause();

    
    
  });
});
