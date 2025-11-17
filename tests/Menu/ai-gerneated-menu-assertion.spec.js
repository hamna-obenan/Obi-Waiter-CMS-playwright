import { test, expect } from "@playwright/test";
import categories from "../../Fixtures/Categories.json" assert { type: "json" };
import AiGenratedMenuAssertions from "../../object-Page/menu/ai-genrated-menu-assertions.js";
test("AI Genrated Menu Assertions to verify is the menu data is correct", async ({ page }) => {
   const aiGenratedMenuAssertions = new AiGenratedMenuAssertions(page);
   //login 
   await aiGenratedMenuAssertions.login();
   console.log('✅ Login completed successfully');

   // click on the first venue 
   await aiGenratedMenuAssertions.clickOnVenue();
   console.log('✅ Clicked on created Venue');

   // click on the created menu
   await aiGenratedMenuAssertions.clickOnCreatedMenu();
   console.log('✅ Clicked on Created Menu');
  
   await page.pause();
   // verify the category names
   await aiGenratedMenuAssertions.verifyCategoryNames();
   console.log('✅ Category names verified successfully');

   // verify the starters category items
   await aiGenratedMenuAssertions.verifyStatersCategoryItems();
   
   // Fix the click problem by evaluating the XPath and then clicking the category
   const startersCategoryXpath = await aiGenratedMenuAssertions.getCategorySelectXpath(categories["category-name"][0]);
   await page.locator(`xpath=${startersCategoryXpath}`).click();
   console.log('✅ Starters category items verified successfully');
   await page.waitForTimeout(2000);
   
   // Verify menu items with their prices in column blocks
   const startersItems = [
      { itemName: 'GREEK SALAD', price: '(€5)' },
      { itemName: 'TORTILLA ESPAÑOLA', price: '(€4.5)' },
      { itemName: 'OLIVAS RELLENAS', price: '(€4)' },
      { itemName: 'VERDURAS CON OLIVADA', price: '(€6.5)' },
      { itemName: 'LASAGNE', price: '(€3)' }
   ];
   
   await aiGenratedMenuAssertions.verifyMenuItemsWithPrices(startersItems);
   console.log('✅ Starters category items with prices verified successfully');


});
