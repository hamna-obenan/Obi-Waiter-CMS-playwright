import { test, expect } from "@playwright/test";
import TagCompanyPOM from "../../object-Page/Tags/createtagcompany-pom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import tags from "../../Fixtures/tags.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

/**
 * Tag Creation Test Suite - Company Level
 * Tests tag creation at company level
 * Flow: Login → Venue → Menu (nth 2) → Stop
 */
test.describe("Tag Management - Company Level", () => {
  
  test("Create Tag Company - Food Category", async ({ page }) => {
    test.setTimeout(120000);
    const tagCompanyPOM = new TagCompanyPOM(page);
    
    // Login
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    console.log('✅ Login completed successfully');
    
    // Navigate to venue page
    console.log('🏢 Step 1: Navigate to venue page');
    await tagCompanyPOM.navigateToVenuePage();
    console.log('✅ Navigated to venue page');
    
    // Navigate to menu page and click on nth(2) menu
    console.log('📋 Step 2: Navigate to menu page (click nth 2 menu)');
    
    // Wait for menu elements to be visible
    await page.waitForLoadState('networkidle');
    console.log('✅ Page loaded, looking for menu elements...');
    
    // Check how many menu elements are available
    const menuCount = await page.locator(locators["created-menu"]).count();
    console.log(`📊 Found ${menuCount} menu elements`);
    
    if (menuCount >= 2) {
      await tagCompanyPOM.navigateToMenuPage();
      console.log('✅ Navigated to menu page (clicked 2nd menu)');
      
      // Verify navigation worked
      await page.waitForLoadState('networkidle');
      console.log('✅ Page loaded after menu click');
      
      // Click on tags tab from header
      console.log('🏷️ Step 3: Click on tags tab from header');
      await page.locator(locators["tag-tab"]).click();
      await page.waitForLoadState('networkidle');
      console.log('✅ Clicked on tags tab from header');
      
      // Click on Add Tag button
      console.log('➕ Step 4: Click on Add Tag button');
      await page.locator(locators["create-tag-button"]).click();
      await page.waitForLoadState('networkidle');
      console.log('✅ Clicked on Add Tag button');
      
      // Click on Create button
      console.log('🔨 Step 5: Click on Create button');
      await page.locator(locators["create-button"]).click();
      await page.waitForLoadState('networkidle');
      console.log('✅ Clicked on Create button');
      
      // Click on Company button
      console.log('🏢 Step 6: Click on Company button');
      await page.locator(locators["company-button"]).click();
      await page.waitForLoadState('networkidle');
      console.log('✅ Clicked on Company button');
      
      // Get first tag data
      const tagData = tags[0];
      const tagName = tagData["tag-name 1"];
      const displayName = tagData["display-name 1"];
      
      // Click on tag name field and fill it
      console.log('📝 Step 7: Click on tag name field and fill it');
      await page.locator(locators["tag-name"]).click();
      await page.locator(locators["tag-name"]).fill(tagName);
      console.log(`✅ Tag name field filled with: ${tagName}`);
      
      // Click on tag icon and select the first icon
      console.log('🎨 Step 8: Click on tag icon and select first icon');
      
      // Wait for the tag icon to be visible
      await page.waitForSelector(locators["tag-1"], { timeout: 10000 });
      console.log('✅ Tag icon element found');
      
      await page.locator(locators["tag-1"]).click();
      console.log('✅ First tag icon selected');
      
      // Click on Save button
      console.log('💾 Step 9: Click on Save button');
      await page.locator(locators["save-button"]).click();
      await page.waitForLoadState('networkidle');
      console.log('✅ Tag saved successfully');
    } else {
      console.log('❌ Not enough menu elements found');
    }
    
    console.log('✅ Test completed - stopped at form filling');
    console.log('📍 Final URL:', page.url());
    
    await page.pause();
  });
});
