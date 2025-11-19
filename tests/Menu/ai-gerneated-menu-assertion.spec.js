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
  
   // await page.pause();
   // verify the category names
   await aiGenratedMenuAssertions.verifyCategoryNames();
   console.log('✅ Category names verified successfully');

   // verify the starters category items
   await aiGenratedMenuAssertions.verifyStatersCategoryItems();
   
   // // Verify menu items with their prices in column blocks using getByText
   // await expect(page.getByText('GREEK SALAD', { exact: true })).toBeVisible();
   // await expect(page.getByText('€5', { exact: false })).toBeVisible();
   // console.log('✅ GREEK SALAD with €5 verified');
      
   // await expect(page.getByText('TORTILLA ESPAÑOLA', { exact: true })).toBeVisible();
   // await expect(page.getByText('€4.5', { exact: false })).toBeVisible();
   // console.log('✅ TORTILLA ESPAÑOLA with €4.5 verified');
      
   // await expect(page.getByText('OLIVAS RELLENAS', { exact: true })).toBeVisible();
   // await expect(page.getByText('€4', { exact: false })).toBeVisible();
   // console.log('✅ OLIVAS RELLENAS with €4 verified');
      
   // await expect(page.getByText('VERDURAS CON OLIVADA', { exact: true })).toBeVisible();
   // await expect(page.getByText('€6.5', { exact: false })).toBeVisible();
   // console.log('✅ VERDURAS CON OLIVADA with €6.5 verified');
      
   // await expect(page.getByText('LASAGNE', { exact: true })).toBeVisible();
   // await expect(page.getByText('€3', { exact: false })).toBeVisible();
   // console.log('✅ LASAGNE with €3 verified');
      
   // console.log('✅ All starters category items with prices verified successfully');

});
