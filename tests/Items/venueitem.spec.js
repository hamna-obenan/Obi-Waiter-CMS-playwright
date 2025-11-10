import { test, expect } from "@playwright/test";
import CreateVenueItemPOM from "../../object-Page/items/venueitemcreate.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import items from "../../Fixtures/items.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import urlVerification from "../../Fixtures/url_verification.json" assert { type: "json" };
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
   

   
   // After clicking the created venue, land at the menu page, then click on the menu

   await createVenueItemPOM.navigateToVenuePage(); // Clicks on the created venue

   // Expect to be on the menu page where we can see the menu to click
   await expect(page.locator('text=Select menu')).toBeVisible();

   // Now click on the menu (proceed to menu page by clicking the 2nd menu)
   await createVenueItemPOM.navigateToMenuPage();
    
   // After clicking the menu, land at the categories page
    await createVenueItemPOM.navigateTocategoriesPage();

    // Verify that you landed at the category page
    await expect(page).toHaveURL(urlVerification["verify-the-categories-navigated-url"]);

    //click on the item tab
    await createVenueItemPOM.navigateToItemsTab();

    // Assert that the Items tab content is visible (for example, check for the presence of "Add Item" button)
    await expect(page.locator(locators["add-item-button"])).toBeVisible();

    //click on the add item button
    await createVenueItemPOM.clickAddItemButton();

    // Assert that the "Create" button/modal or the "Item Name" field is visible after clicking Add Item
    await expect(page.locator(locators["create-button"])).toBeVisible();
    await page.locator(locators["create-button"]).click();

    //click on the venue button
    await expect(page.locator(locators["venue-button"])).toBeVisible();
    await createVenueItemPOM.clickVenueButton();

    // click on the item name field
    await expect(page.locator(locators["item-name"])).toBeVisible();
    await createVenueItemPOM.fillItemName(items[1]["item-name2"]);

    // click on the instock dropdown
    await expect(page.locator(locators["instock-dropdown"])).toBeVisible();
    await createVenueItemPOM.selectTheStatus(items[1]["instock2"]);

    // click on the menu dropdown
    await createVenueItemPOM.selectMenu(items[1]["Italian"]);
    // await page.pause();

    // click on the category dropdown
    await expect(page.locator(locators["select-category-dropdown"])).toBeVisible();
    await createVenueItemPOM.selectItemCategory(items[1]["category"]);

    //describe the description field
    await expect(page.locator(locators["description-box-item"])).toBeVisible();
    await createVenueItemPOM.fillItemDescription(items[1]["description2"]);

    // Click on the price text box to open dropdown and fill the price
    await createVenueItemPOM.enterItemPrice(items[1]["price1"]);

    // Assertion: Verify that the price input field has the correct value
    await expect(page.locator(locators["enter-custom-price"])).toHaveValue(items[1]["price1"]);

    // fill the price description
    await createVenueItemPOM.fillItemPriceDescription(items[1]["pricedescription"]);

    // Assertion: Verify that the price description input has the correct value
    await expect(page.locator(locators["price-discription"])).toHaveValue(items[1]["pricedescription"]);

    // select the tax
    await createVenueItemPOM.selectItemTax(items[1]["tax1"]);    
    

    const taxOption = await page.getByRole('combobox', { name: 'Select tax' }).inputValue();
    console.log(taxOption);
    // Assertion: Verify that the correct tax option is selected
    await expect(taxOption).toBe(items[1]["tax1"]);


    // Assertion: Verify that the add extra button is visible
    await expect(page.locator(locators["add-extra"])).toBeVisible();

   // select the default price
    await createVenueItemPOM.selectDefaultPrice(items[1]["default"]);
    //assertion to verify the default price checkbox is checked
    await expect(page.locator(locators["pricedefaultcheckbox"])).toBeChecked();
    console.log('✅ Default price selected successfully');
    
    // click on the add extra
    await createVenueItemPOM.clickOnAddExtra();
    await expect(page.locator(locators["add-extra"])).toBeVisible();
    console.log('✅ Add extra button clicked successfully');

    // fill second price (custom price)
    await createVenueItemPOM.fillSecondPrice(items[1]["venue2ndprice"]);
    //assertion to verify the second price input field has the correct value
    await expect(page.locator(locators["enter-custom-price-2"])).toHaveValue(items[1]["venue2ndprice"]);
    console.log('✅ Second price filled successfully');

    // fill second price description
    await createVenueItemPOM.fillSecondPriceDescription(items[1]["pricedescription2venue"]);
    // Assertion: Verify that the price description 2 input field has the correct value
    await expect(page.locator(locators["price-discription-2"])).toHaveValue(items[1]["pricedescription2venue"]);
    console.log('✅ Second price description filled successfully');
    // fill second price tax
    await createVenueItemPOM.fillSecondPriceTax(items[1]["tax3"]);
    // Assertion: Verify that the second tax dropdown has the correct value
    await expect(page.locator(locators["select-tax-dropdown-2"])).toHaveValue(items[1]["tax3"]);
    console.log('✅ Second price tax filled successfully');


    //upload cover image
    await createVenueItemPOM.uploadItemImage(items[1]["item-image2"]);
    console.log('✅ Cover image uploaded successfully');

    // select the cuisine from dropdown
    await createVenueItemPOM.selectItemCuisine(items[1]["cuisine"]);
    //assertion to verify the cuisine selected successfully
    await expect(page.locator(locators["select-cuisine-dropdown"])).toBeVisible();

    // await page.pause();
    // select the serve people text box
    await createVenueItemPOM.selectServePeople(items[1]["servedPeople2"]);
    //assertion to verify the serve people selected successfully
    await expect(page.locator(locators["serve-people"])).toBeVisible();

    // select the ingredients from dropdown
    // Use POM if possible for ingredient selection
    // Build the array of ingredients from the JSON file (items[1])
    const venueIngredients = [
      items[1]["ingredient1"],
      items[1]["ingredient2"],
      items[1]["ingredient3"],
      items[1]["ingredient4"],
      items[1]["ingredient5"],
      items[1]["ingredient6"],
      items[1]["ingredient7"],
      items[1]["ingredient8"],
      items[1]["ingredient9"],
      items[1]["ingredient10"],
      items[1]["ingredient11"],
      items[1]["ingredient12"],
      items[1]["ingredient13"],
      items[1]["ingredient14"],
      items[1]["ingredient15"]
    ];



    // Use the POM method (which expects an array and handles dropdown/checking)
    await createVenueItemPOM.selectItemIngredients(venueIngredients);

    // Assertion: verify the select-ingredients dropdown is visible (as per locators)
    await expect(page.locator(locators["select-ingredients"])).toBeVisible();

    // Select the ingredients as mandatory (even positions) or optional (odd positions) according to company-level logic
    // for venue-level ingredient data (from items[1])
    for (let i = 0; i < 15; i++) {
      // Build the dynamic ingredient isRequired select id, which starts with index 0
      const ingredientIsRequiredSelector = `[id="mui-component-select-ingredients.${i}.isRequired"]`;
      await page.locator(ingredientIsRequiredSelector).click();

      // Even index (i+1 is even): Mandatory, Odd: Optional
      const roleName = ((i + 1) % 2 === 0) ? 'Mandatory' : 'Optional';

      await page.getByRole('option', { name: roleName, exact: true }).click();

    }


    // mark tag
    await createVenueItemPOM.selectItemTags(items[1]["markItemAs2"]);
    //assertion to verify the tags selected successfully
    await expect(page.locator(locators["item-tag"])).toBeVisible();
    // close the tag drop down
    await page.getByText('Mark item as').click();
    

    // add customizations using the POM method
    await createVenueItemPOM.selectItemCustomizations([items[1]["addCustomizations"]]);
    // assertion to verify the customizations dropdown is visible
    await expect(page.locator(locators["select-customizations"])).toBeVisible();
    //close the customization drop down
    await page.getByText('Add Customizations').click();

    // stock count
    await createVenueItemPOM.fillStockCount(items[1]["stockCount"]);
    //assertion to verify the stock count filled successfully
    await expect(page.locator(locators["stock-count"])).toBeVisible(items[1]["stockCount"]);

    // click on the generate button
    await createVenueItemPOM.clickOnGenerateButton("Generate");
    //assertion to verify the generate button clicked successfully
    await expect(page.locator(locators["item-details-genrate-button"])).toBeVisible();
    await page.waitForTimeout(5000)

    //click on the save button
    await createVenueItemPOM.saveItem("Save")
    //assertion
    
   // await page.pause();


  });
});