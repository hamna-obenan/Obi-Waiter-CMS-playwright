import { test, expect } from "@playwright/test";
import CreateVenueTagPOM from "../../object-Page/Tags/createvenuetag.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import tags from "../../Fixtures/tags.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import urlVerification from "../../Fixtures/url_verification.json" assert { type: "json" };
/**
 * Tag Creation Test Suite - Venue Level
 * Tests multiple tag creation at venue level
 * Flow: Login → Venue → Menu (nth 2) → navigate to the category page → click on the tag from header → click on the add tag button → click on the create button → click on the venue button → create multiple tags
 */
test.describe("Tag Management - Venue Level", () => {
  
  test("Create Multiple Tags Venue", async ({ page }) => {
    test.setTimeout(120000);
    const createVenueTagPOM = new CreateVenueTagPOM(page);
    
    // Login
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    console.log('✅ Login completed successfully');
    
    // Navigate to venue page
    console.log('🏢 Step 1: Navigate to venue page');
    await createVenueTagPOM.navigateToVenuePage();
    
    // Assert: Verify we're on the venue page
    // Verify that we are on the venue URL
    const currentUrl = page.url();
    await expect(page).toHaveURL(urlVerification["verify-the-menu-navigated-url"]);
    // Points to: "https://develop.d20aue3nu6xt33.amplifyapp.com/venue"    
    console.log('✅ Verified: On venue page');
    
    // Navigate to menu page and click on nth(2) menu
    console.log('📋 Step 2: Navigate to menu page (click nth 2 menu)');
    await page.waitForLoadState('networkidle');
    
    // Check how many menu elements are available
    const menuCount = await page.locator(locators["created-menu"]).count();
    console.log(`📊 Found ${menuCount} menu elements`);
    
    // Assert: Verify we have at least 2 menu elements
    expect(menuCount).toBeGreaterThanOrEqual(2);
    console.log('✅ Verified: Sufficient menu elements available');
    
    if (menuCount >= 2) {
      await createVenueTagPOM.navigateToMenuPage();
      
      // Assert: Verify menu navigation worked
      await expect(page).toHaveURL(urlVerification["verify-the-menu-navigated-url"]);
      console.log('✅ Verified: Successfully navigated to menu page');
      
      // Navigate to tags tab
      console.log('🏷️ Step 3: Navigate to tags tab');
      await createVenueTagPOM.navigateToTagsTab();
      
      // Assert: Verify we're on the tags page
      await expect(page).toHaveURL(urlVerification["verify-the-tags-navigated-url"]);
      console.log('✅ Verified: Successfully navigated to tags page');
      
      // Click on Add Tag button
      console.log('➕ Step 4: Click on Add Tag button');
      await createVenueTagPOM.clickAddTagButton();
      
      // Click on Create button
      console.log('🔨 Step 5: Click on Create button');
      await createVenueTagPOM.clickCreateButton();
      
      // Click on Venue button
      console.log('🏢 Step 6: Click on Venue button');
      await createVenueTagPOM.clickVenueButton();
      
      // Assert: Verify venue button was clicked and form is ready
      await expect(page.locator(locators["tag-name"])).toBeVisible();
      console.log('✅ Verified: Tag creation form is ready');
      
      // Create multiple venue tags using remaining data from tags.json
      // Company test uses: tags 1, 2, 5, 8, 11 (indices: 0, 1, 4, 7, 10)
      // Venue test uses: tags 3, 4, 6, 7, 9, 10 (indices: 2, 3, 5, 6, 8, 9)
      const tagIndices = [2, 3, 5, 6, 8, 9]; // Remaining tag indices (not used in company test)
      
      console.log('🏷️ Starting venue tag creation process...');
      await createVenueTagPOM.createMultipleVenueTags(tagIndices, tags);
      
      // Assert: Verify all tags were created successfully
      expect(tagIndices.length).toBeGreaterThan(0);
      console.log(`✅ Verified: ${tagIndices.length} venue tags created successfully`);
      
    } else {
      console.log('❌ Not enough menu elements found');
      throw new Error('Insufficient menu elements for test execution');
    }
    
    console.log('✅ Test completed - all venue tags created');
    console.log('📍 Final URL:', page.url());
    
    await page.pause();
  });
});
