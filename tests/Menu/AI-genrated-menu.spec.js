import { test, expect } from "@playwright/test";
import AiGenratedMenu from "../../object-Page/menu/Ai-genrated-menu.js";
test("AI Genrated Menu", async ({ page }) => {
   const aiGenratedMenu = new AiGenratedMenu(page);
   //login 
   await aiGenratedMenu.login();
   console.log('✅ Login completed successfully');

   // click on the first venue 
   await aiGenratedMenu.clickOnVenue();
   console.log('✅ Clicked on created Venue');

   // click on the ai genrated menu button
   await aiGenratedMenu.clickOnAiGenratedMenuButton();
   console.log('✅ Clicked on AI Genrated Menu Button');
   await page.pause();

   // upload a menu picture in AI genrated menu box
   await aiGenratedMenu.uploadMenuPicture();
   console.log('✅ Menu picture uploaded successfully');

});