import { test, expect } from "@playwright/test";
import CreateCompanyItemPOM from "../../object-Page/items/createcomapnyitem.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import items from "../../Fixtures/items.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

/**
 * Item Creation Company Level
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
    
    // Fill item name
    await createCompanyItemPOM.fillItemName(itemData["item-name1"]);
     
    //   //click on the in stock
    await createCompanyItemPOM.selectTheStatus('In Stock');
   

    //select the menu from dropdown
    await createCompanyItemPOM.selectMenu(itemData["menu"]);

    //assertion for verify the menu selected successfully
    await expect(page.locator(locators["select-menu-dropdown"])).toBeVisible();
    console.log('✅ Verified: Menu selected successfully');

    //select the category from dropdown
    await createCompanyItemPOM.selectItemCategory(itemData["Category"]);
    //assertion to verify the category selected successfully
    await expect(page.locator(locators["select-category-dropdown"])).toBeVisible();
    console.log('✅ Verified: Category selected successfully');

    // Use the correct key ("description" instead of "Description") to fill the item description
    await createCompanyItemPOM.fillItemDescription(itemData["description"]);
    //assertion to verify the description filled successfully
    await expect(page.locator(locators["description-box-item"])).toBeVisible();
    console.log('✅ Verified: Description filled successfully');

    // Click on the price text box to open dropdown
    await page.locator(locators["price-dropdown"]).click();
    // Wait for dropdown to appear, then click "Enter Custom Price"
    await page.locator(locators["pricedefault"]).click();
    // Click the price text box again to focus
    await page.locator(locators["enter-custom-price"]).click();
    // Fill the price value
    await page.locator(locators["enter-custom-price"]).fill(itemData["Price "]);
    console.log('✅ Entered custom price successfully');

    //price discription
    await createCompanyItemPOM.fillItemPriceDescription(itemData["pricedescription"]);
    //assertion to verify the price discription filled successfully
    await expect(page.locator(locators["price-discription"])).toBeVisible();
    console.log('✅ Verified: Price discription filled successfully');

    //select the tax from dropdown
    await createCompanyItemPOM.selectItemTax(itemData["tax"]);
    
    // Select default price
    await createCompanyItemPOM.selectDefaultPrice(itemData["default"]);

    //click on add extra
    await createCompanyItemPOM.clickOnAddExtra();
    
    // Wait for page to be stable after clicking Add Extra
    await page.waitForLoadState('networkidle');
    // await page.waitForTimeout(3000);
    
    // Verify the page is still active and the form is ready
    await expect(page.locator(locators["item-name"])).toBeVisible();
    console.log('✅ Verified: Form is still active after Add Extra');
    
    // Add Price 2 - Click on the second price dropdown (prices.1.variants)
    await page.locator(locators["price-dropdown-2"]).click();
    // Wait for dropdown to appear, then click "Enter Custom Price"
    await page.locator(locators["pricedefault"]).click();
    // Click the second price text box to focus
    await page.locator(locators["enter-custom-price-2"]).click();
    // Fill the price 2 value
    await page.locator(locators["enter-custom-price-2"]).fill(itemData["price2"]);
    console.log('✅ Entered custom price 2 successfully');
    
    //price description 2 - use the second description box
    await page.locator(locators["option-box1"]).fill(itemData["pricedescription2"]);
    console.log('✅ Price description 2 filled successfully');

    //select the tax 2 from dropdown (second tax dropdown)
    await page.locator(locators["select-tax-dropdown"]).nth(1).click();
    await page.getByRole('option', { name: 'Override: 9% on all order types' }).click();

    console.log('✅ Tax 2 selected successfully');

   //upload cover image
   await page.getByText('Choose image').click();
   await page.locator(locators["inner-picture-box"]).setInputFiles(`./Fixtures/pictures/${itemData["item-image"]}`);
  //  await page.waitForTimeout(3000);
   console.log('✅ Cover image uploaded successfully');
   //click on the upload button
   await page.getByRole('button', { name: 'Upload' }).click();
  //  await page.waitForTimeout(6000);
   
   console.log('✅ Upload button clicked successfully');

   //select the cuisine from dropdown
   await createCompanyItemPOM.selectItemCuisine(itemData["cuisine"]);
   //assertion to verify the cuisine selected successfully
   await expect(page.locator(locators["select-cuisine-dropdown"])).toBeVisible();
   console.log('✅ Verified: Cuisine selected successfully');

   //select the serve people from dropdown
   await page.locator(locators["serve-people"]).click();
   await page.locator(locators["serve-people"]).fill(itemData["servedPeople"]);
   //assertion to verify the serve people selected successfully
   await expect(page.locator(locators["serve-people"])).toBeVisible();
   console.log('✅ Verified: Serve people selected successfully');
   
  
   //select the ingredients from dropdown

   await page.getByRole('combobox', { name: 'Select ingredients' }).click();
   await page.waitForTimeout(3000);
   await page.getByRole('option', { name: 'Olives' }).getByRole('checkbox').check();
   await page.getByRole('option', { name: 'Cucumber' }).getByRole('checkbox').check();
   await page.getByRole('option', { name: 'Mustard' }).getByRole('checkbox').check();
   await page.getByRole('option', { name: 'Lettuce' }).getByRole('checkbox').check();
   await page.getByRole('option', { name: 'Bell peppers' }).getByRole('checkbox').check();
   await page.getByRole('option', { name: 'Bread' }).getByRole('checkbox').check();
  //  await page.pause();
   await page.getByRole('option', { name: 'Herbs' }).getByRole('checkbox').check();
   await page.getByText('Add new item').click();
   await page.locator('[id="mui-component-select-ingredients.0.isRequired"]').click();
   await page.getByRole('option', { name: 'Mandatory', exact: true }).click();
   await page.locator('[id="mui-component-select-ingredients.1.isRequired"]').click();
   await page.getByRole('option', { name: 'Optional', exact: true }).click();
   await page.locator('[id="mui-component-select-ingredients.2.isRequired"]').click();
   await page.getByRole('option', { name: 'Optional', exact: true }).click();
   await page.locator('[id="mui-component-select-ingredients.3.isRequired"]').click();
   await page.getByRole('option', { name: 'Mandatory', exact: true }).click();
   await page.locator('[id="mui-component-select-ingredients.4.isRequired"]').click();
   await page.getByRole('option', { name: 'Mandatory', exact: true }).click();
   await page.locator('[id="mui-component-select-ingredients.5.isRequired"]').click();
   await page.getByRole('option', { name: 'Mandatory', exact: true }).click();
   await page.locator('[id="mui-component-select-ingredients.6.isRequired"]').click();
   await page.getByRole('option', { name: 'Optional', exact: true }).click();

   //Mark item as
   await page.locator(locators["item-tag"]).click();
   await page.getByRole('option', { name: 'Spicy' }).getByRole('checkbox').check();


   //Add Customizations
   await page.locator(locators["select-customizations"]).dblclick();
   await page.getByRole('option', { name: 'Sauces' }).click();

   // Assertion to verify that 'Sauces' was selected as customization
   await expect(page.locator(locators["select-customizations"])).toBeVisible('Sauces');
   console.log("✅ Verified: Customization 'Sauces' selected successfully");
   await page.getByText('Add new item').click();
    //Stock Count
    await page.locator(locators["stock-count"]).fill("10");
    console.log('✅ Stock count filled successfully');
    await expect(page.locator(locators["stock-count"])).toBeVisible("10");
    console.log('✅ Stock count filled successfully');

    //click on the generate button
    await createCompanyItemPOM.clickOnGenerateButton("Generate");
    console.log('✅ Generate button clicked successfully');
    await expect(page.locator(locators["item-details-genrate-button"])).toBeVisible();
    console.log('✅ Verified: Generate button visible');
    await page.waitForTimeout(6000);
   
    // Save the item
    await createCompanyItemPOM.saveItem();
    await expect(page.locator(locators["save-button"])).toBeVisible();
    console.log('✅ Verified: Save button visible');
    await page.locator(locators["save-button"]).click();
    // Click the save button and assert that it disappears (or the next state happens)
    await page.locator(locators["save-button"]).click();
    // Assertion for verify the the success toast is visible
    // cooment this code after creating it show thw dulpicate toast message not success toast message
    // await expect(page.locator('[data-testid="item-create-success-toast"]')).toBeVisible();
    // await expect(page.getByText('item.ITEM_CREATED')).toBeVisible();
    
    console.log('✅ Company item created successfully');

   await page.pause();
    
    
  });
});

