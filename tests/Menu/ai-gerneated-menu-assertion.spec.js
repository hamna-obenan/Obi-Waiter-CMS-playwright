import { test, expect } from "@playwright/test";

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
  

   // verify the category names
   await aiGenratedMenuAssertions.verifyCategoryNames();
   console.log('✅ Category names verified successfully');

   // verify the starters category items
   await aiGenratedMenuAssertions.verifyStatersCategoryItems();
   console.log('✅ Starters category items verified successfully');

});