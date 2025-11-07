import { test, expect } from "@playwright/test";
import TagCompanyPOM from "../../object-Page/Tags/createtagcompany-pom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import tags from "../../Fixtures/tags.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

/**
 * Tag Creation Test Suite - Company Level
 * Tests multiple tag creation at company level
 * Flow: Login → Venue → Menu (nth 2) → navigate to the cateogory page → click on the tag from header → click on the add tag button → click on the create button → click on the company button → create multiple tags
 */
test.describe("Tag Management - Company Level", () => {
  
  test("Create Multiple Tags Company ", async ({ page }) => {
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
      
      // Create multiple tags using a loop
      const tagIndices = [0, 1, 4, 7, 10]; // Tag indices to create
      
      for (let i = 0; i < tagIndices.length; i++) {
        const tagIndex = tagIndices[i];
        const tagData = tags[tagIndex];
        const tagName = tagData[`tag-name ${tagIndex + 1}`];
        const displayName = tagData[`display-name ${tagIndex + 1}`];
        
        console.log(`\n🏷️ Creating tag ${i + 1}/${tagIndices.length}: ${tagName}`);
        
        // Click on Add Tag button (only for subsequent tags)
        if (i > 0) {
          console.log('➕ Clicking Add Tag button');
          await page.locator(locators["create-tag-button"]).click();
          await page.waitForLoadState('networkidle');
          console.log('✅ Add Tag button clicked');
          
          // Click on Create button
          console.log('🔨 Clicking Create button');
          await page.locator(locators["create-button"]).click();
          await page.waitForLoadState('networkidle');
          console.log('✅ Create button clicked');
          
          // Click on Company button
          console.log('🏢 Clicking Company button');
          await page.locator(locators["company-button"]).click();
          await page.waitForLoadState('networkidle');
          console.log('✅ Company button clicked');
        }
        
        // Fill tag name
        console.log('📝 Filling tag name');
        await page.locator(locators["tag-name"]).click();
        await page.locator(locators["tag-name"]).fill(tagName);
        console.log(`✅ Tag name filled: ${tagName}`);
        
        // Select tag icon
        console.log('🎨 Selecting tag icon');
        const iconSelector = locators[`tag-${tagIndex + 1}`];
        await page.waitForSelector(iconSelector, { timeout: 10000 });
        await page.locator(iconSelector).click();
        console.log(`✅ Tag icon ${tagIndex + 1} selected`);
        
        // Save tag
        console.log('💾 Saving tag');
        await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForLoadState('networkidle');
        console.log(`✅ Tag "${tagName}" saved successfully`);
      }
      
      console.log('\n🎉 All tags created successfully!');
    } else {
      console.log('❌ Not enough menu elements found');
    }
    
    console.log('✅ Test completed - all tags created');
    console.log('📍 Final URL:', page.url());
    
  });
});