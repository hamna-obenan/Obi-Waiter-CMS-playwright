// Import Playwright test framework and expect for assertions
import { test, expect } from "@playwright/test";
// Import the Page Object Model for company customization actions
import CustomizationPOM from "../../object-Page/Customizations/customizationpom.js";
// Import JSON files containing locators, login credentials, and test data
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import customizations from "../../Fixtures/customization.json" assert { type: "json" };
// Import reusable login helper function
import { performLogin } from "../../utils/login-helper.js";
// Import URL verification data for assertions
import urlVerification from "../../Fixtures/url_verification.json" assert { type: "json" };

/**
 * Customization Creation Test Suite - Company Level
 * Tests customization creation at company level (applies to all venues)
 * Flow: Login → Venue → Menu → Customizations → Create → Company
 */
test.describe("Customization Management", () => {
  
  test("Create Customization Company - Sauces", async ({ page }) => {
    // Set timeout to 2 minutes for this test (customization creation takes time)
    test.setTimeout(120000);
    // Create an instance of the POM to use its helper methods
    const customizationPOM = new CustomizationPOM(page);
    
    // Get the first customization from JSON file (index 0 = "Sauces")
    const customizationData = customizations[0];
    const title = customizationData["customization-title"];
    const isRequired = customizationData["required"] === "yes";
    
    // Login using the test user credentials from login.json
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    // ✅ Assertion: Verify we are not on the login page anymore
    await expect(page).not.toHaveURL(/\/login/);
    
    // ========== NAVIGATION SECTION ==========
    // Navigate from login page → venue page → menu page → customizations tab
    
    console.log('🏢 Step 1: Navigate to venue page');
    await customizationPOM.navigateToVenuePage();
    // ✅ Assertion: Verify we navigated to venue page
    await expect(page).toHaveURL(urlVerification["verify-the-venue-navigated-url"]);
    
    console.log('📋 Step 2: Navigate to menu page');
    await customizationPOM.navigateToMenuPage();
    
    // Verify we landed on the menu page after navigation
    console.log('🔍 Verifying navigation to menu page...');
    console.log('✅ Successfully navigated to menu page');
    // ✅ Assertion: Verify we are on menu page
    await expect(page).toHaveURL(urlVerification["verify-the-menu-navigated-url"]);
    
    // Wait for all network requests to finish before proceeding
    await page.waitForLoadState('networkidle');
    
    // ========== CUSTOMIZATION SETUP SECTION ==========
    // Click through: Customization Tab → Add Customization → Create → Company Level
    
    console.log('⚙️ Step 3: Click on customization tab');
    await page.locator(locators["customization-tab"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked on customization tab');
    // ✅ Assertion: Verify we are on customizations page
    await expect(page).toHaveURL(urlVerification["verify-the-customizations-navigated-url"]);
    
    console.log('➕ Step 4: Click on Add Customization button');
    await page.locator(locators["add-customization-button"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Add Customization button');
    // ✅ Assertion: Verify Create button is visible
    await expect(page.locator(locators["create-button"])).toBeVisible();
    
    console.log('🔨 Step 5: Click on Create button');
    await page.locator(locators["create-button"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Create button');
    // ✅ Assertion: Verify Company button is visible
    await expect(page.locator(locators["company-button"])).toBeVisible();
    
    // Choose "Company" level (applies to all venues, not just one venue)
    console.log('🏢 Step 6: Click on Company button');
    await page.locator(locators["company-button"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Company button');
    // ✅ Assertion: Verify customization name field is visible
    await expect(page.locator(locators["customization-name"])).toBeVisible();
    
    // ========== CUSTOMIZATION DETAILS SECTION ==========
    // Fill in the customization name from test data (Sauces)
    
    console.log('📝 Step 7: Fill title field');
    await page.locator(locators["customization-name"]).fill(title);
    console.log(`✅ Title filled: ${title}`);
    // ✅ Assertion: Verify title field has the correct value
    await expect(page.locator(locators["customization-name"])).toHaveValue(title);
    
    // Make this customization required (customers must select a sauce)
    console.log('☑️ Step 8: Check the required checkbox');
    const checkbox = page.locator(locators["is-required-checkbox"]);
    await checkbox.check();
    console.log('✅ Required checkbox checked');
    // ✅ Assertion: Verify checkbox is checked
    await expect(checkbox).toBeChecked();
    
    // ========== FIRST OPTION: KETCHUP ==========
    // Add the first sauce option with custom price and tax
    
    console.log('📝 Step 9: Add ketchup in option box');
    await page.locator(locators["option-box"]).fill('ketchup');
    console.log('✅ Ketchup added to option box');
    // ✅ Assertion: Verify option box has 'ketchup' value
    await expect(page.locator(locators["option-box"])).toHaveValue('ketchup');
    
    // --- Price Handling for Option 1 (Ketchup) ---
    console.log('💰 Step 10: Handle price dropdown');
    
    // Step 1: Click on the price dropdown to open it
    const priceField = page.locator(locators["price-dropdown"]);
    await priceField.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Price field clicked - dropdown appeared');
    // ✅ Assertion: Verify custom price option is visible
    await expect(page.locator(locators["pricedefault"])).toBeVisible();
    
    // Step 2: Select "Enter Custom Price" option from the dropdown
    await page.locator(locators["pricedefault"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected');
    
    // Step 3: Click on the custom price input field that appears
    const priceInput2 = page.locator(locators["enter-custom-price"]);
    await priceInput2.click();
    await page.waitForTimeout(500);
    console.log('✅ Custom price input field clicked');
    // ✅ Assertion: Verify price input field is visible
    await expect(priceInput2).toBeVisible();
    
    // Step 4: Enter the price (hardcoded as $0.00 - free ketchup)
    await priceInput2.fill('0.00');
    console.log('✅ Price added for Chilli-sauce: $0.00');
    // ✅ Assertion: Verify price input has the correct value
    await expect(priceInput2).toHaveValue('0.00');
    
    // --- Tax Selection for Option 1 (Ketchup) ---
    console.log('🏷️ Step 11: Select tax type');
    
    // Click on tax dropdown to open it
    const taxDropdown = page.locator(locators["select-tax-dropdown"]).first();
    await taxDropdown.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Tax dropdown clicked - dropdown appeared');
    // ✅ Assertion: Verify Standard tax option is visible
    await expect(page.locator('text=Standard').first()).toBeVisible();
    
    // Select "Standard" tax option from the dropdown
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected');
    
    // ========== SECOND OPTION: CHILLI-SAUCE ==========
    // Click "Add More" button to add another sauce option
    
    console.log('➕ Step 12: Click Add More for second option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked');
    // ✅ Assertion: Verify second option box appeared
    const secondOptionBox = page.locator(locators["option-box1"]);
    await expect(secondOptionBox).toBeVisible();
    
    // Fill in the second option name
    console.log('📝 Step 13: Add second option - chilli-sauce');
    await secondOptionBox.fill('chilli-sauce');
    console.log('✅ Chilli-sauce added to second option box');
    // ✅ Assertion: Verify second option box has 'chilli-sauce' value
    await expect(secondOptionBox).toHaveValue('chilli-sauce');
    
    // --- Price Handling for Option 2 (Chilli-sauce) ---
    console.log('💰 Step 14: Handle price dropdown for second option');
    // Wait for the second price field to appear in the DOM
    await page.waitForTimeout(2000);
    
    // Step 1: Click on the second price dropdown to open it
    const priceField2 = page.locator(locators["price-dropdown-2"]);
    await priceField2.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Price field clicked - dropdown appeared');
    // ✅ Assertion: Verify custom price option is visible
    await expect(page.locator(locators["pricedefault"])).toBeVisible();
    
    // Step 2: Select "Enter Custom Price" option from the dropdown
    await page.locator(locators["pricedefault"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected');
    
    // Step 3: Click on the second custom price input field
    const priceInput2Second = page.locator(locators["enter-custom-price-2"]);
    await priceInput2Second.click();
    await page.waitForTimeout(500);
    console.log('✅ Custom price input field clicked');
    // ✅ Assertion: Verify second price input field is visible
    await expect(priceInput2Second).toBeVisible();
    
    // Step 4: Enter the price (hardcoded as $0.24 for chilli-sauce)
    await priceInput2Second.fill('0.24');
    console.log('✅ Price added for Chilli-sauce: $0.24');
    // ✅ Assertion: Verify price input has the correct value
    await expect(priceInput2Second).toHaveValue('0.24');
    
    // --- Tax Selection for Option 2 (Chilli-sauce) ---
    console.log('🏷️ Step 11: Select tax type');
    
    // Click on tax dropdown
    const taxDropdown2 = page.locator(locators["select-tax-dropdown-2"]).first();
    await taxDropdown2.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Tax dropdown clicked - dropdown appeared');
    // ✅ Assertion: Verify Standard tax option is visible
    await expect(page.locator('text=Standard').first()).toBeVisible();
    
    // Select "Standard" tax option
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected');
  
    // --- Additional Tax Selection (appears to be duplicate) ---
    console.log('🏷️ Step 15: Select tax type for second option');
    
    // Click on tax dropdown for second option (using .nth(1) to get the 2nd dropdown)
    const secondTaxDropdown = page.locator(locators["select-tax-dropdown"]).nth(1);
    await secondTaxDropdown.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Second tax dropdown clicked - dropdown appeared');
    // ✅ Assertion: Verify Standard tax option is visible
    await expect(page.locator('text=Standard').first()).toBeVisible();
    
    // Select "Standard" tax option for second option
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected for second option');
    
    // ========== THIRD OPTION: GARLIC-SAUCE ==========
    // Click "Add More" button to add the third sauce option
    
    console.log('➕ Step 16: Click Add More for third option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked for third option');
    // ✅ Assertion: Verify third option box appeared
    const thirdOptionBox = page.locator(locators["option-box2"]);
    await expect(thirdOptionBox).toBeVisible();
    
    // Fill in the third option name
    console.log('📝 Step 17: Add third option - garlic-sauce');
    await thirdOptionBox.fill('garlic-sauce');
    console.log('✅ Garlic-sauce added to third option box');
    // ✅ Assertion: Verify third option box has 'garlic-sauce' value
    await expect(thirdOptionBox).toHaveValue('garlic-sauce');
    
    // --- Price Handling for Option 3 (Garlic-sauce) ---
    console.log('💰 Step 18: Handle price dropdown for third option');
    // Wait for the third price field to appear in the DOM
    await page.waitForTimeout(2000);
    
    // Step 1: Click on the third price dropdown to open it
    const priceField3 = page.locator(locators["price-dropdown-3"]);
    await priceField3.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Price field clicked - dropdown appeared');
    // ✅ Assertion: Verify custom price option is visible
    await expect(page.locator(locators["pricedefault"])).toBeVisible();
     
    // Step 2: Select "Enter Custom Price" option from the dropdown
    await page.locator(locators["pricedefault"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected');
     
    // Step 3: Click on the third custom price input field
    const priceInput3 = page.locator(locators["enter-custom-price-3"]);
    await priceInput3.click();
    await page.waitForTimeout(500);
    console.log('✅ Custom price input field clicked');
    // ✅ Assertion: Verify third price input field is visible
    await expect(priceInput3).toBeVisible();
     
    // Step 4: Enter the price (hardcoded as $0.24 for garlic-sauce)
    await priceInput3.fill('0.24');
    console.log('✅ Price added for Chilli-sauce: $0.24');
    // ✅ Assertion: Verify price input has the correct value
    await expect(priceInput3).toHaveValue('0.24');
     
    // --- Tax Selection for Option 3 (Garlic-sauce) ---
    console.log('🏷️ Step 11: Select tax type');
     
    // Click on tax dropdown
    const taxDropdown3 = page.locator(locators["select-tax-dropdown-3"]).first();
    await taxDropdown3.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Tax dropdown clicked - dropdown appeared');
    // ✅ Assertion: Verify Standard tax option is visible
    await expect(page.locator('text=Standard').first()).toBeVisible();
     
    // Select "Standard" tax option
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected');
   
    // --- Additional Tax Selection (appears to be duplicate) ---
    console.log('🏷️ Step 15: Select tax type for second option');
     
    // Click on tax dropdown for second option
    const secondTaxDropdown3 = page.locator(locators["select-tax-dropdown"]).nth(1);
    await secondTaxDropdown3.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Second tax dropdown clicked - dropdown appeared');
    // ✅ Assertion: Verify Standard tax option is visible
    await expect(page.locator('text=Standard').first()).toBeVisible();
     
    // Select "Standard" tax option for second option
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected for second option');
    
    // ========== FOURTH OPTION: MAYONNAISE ==========
    // Click "Add More" button to add the fourth and final sauce option
    
    console.log('➕ Step 20: Click Add More for fourth option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked for fourth option');
    // ✅ Assertion: Verify fourth option box appeared
    const fourthOptionBox = page.locator(locators["option-box3"]);
    await expect(fourthOptionBox).toBeVisible();
    
    // Fill in the fourth option name
    console.log('📝 Step 21: Add fourth option - mayonnaise');
    await fourthOptionBox.fill('mayonnaise');
    console.log('✅ Mayonnaise added to fourth option box');
    // ✅ Assertion: Verify fourth option box has 'mayonnaise' value
    await expect(fourthOptionBox).toHaveValue('mayonnaise');
    
   // --- Price Handling for Option 4 (Mayonnaise) ---
   console.log('💰 Step 22: Handle price dropdown for fourth option');
   // Wait for the fourth price field to appear in the DOM
   await page.waitForTimeout(2000);
   
   // Step 1: Click on the fourth price dropdown to open it
   const priceField4 = page.locator(locators["price-dropdown-4"]);
   await priceField4.click({force: true});
   await page.waitForTimeout(1000);
   console.log('✅ Price field clicked - dropdown appeared');
   // ✅ Assertion: Verify custom price option is visible
   await expect(page.locator(locators["pricedefault"])).toBeVisible();
         
   // Step 2: Select "Enter Custom Price" option from the dropdown
   await page.locator(locators["pricedefault"]).click();
   await page.waitForTimeout(1000);
   console.log('✅ Custom price option selected');
         
   // Step 3: Click on the fourth custom price input field
   const priceInput4 = page.locator(locators["enter-custom-price-4"]);
   await priceInput4.click();
   await page.waitForTimeout(500);
   console.log('✅ Custom price input field clicked');
   // ✅ Assertion: Verify fourth price input field is visible
   await expect(priceInput4).toBeVisible();
         
   // Step 4: Enter the price (hardcoded as $0.24 for mayonnaise)
   await priceInput4.fill('0.24');
   console.log('✅ Price added for mayonnaise: $0.24');
   // ✅ Assertion: Verify price input has the correct value
   await expect(priceInput4).toHaveValue('0.24');
         
   // --- Tax Selection for Option 4 (Mayonnaise) ---
   console.log('🏷️ Step 23: Select tax type for fourth option');
         
   // Click on tax dropdown
   const taxDropdown4 = page.locator(locators["select-tax-dropdown-4"]).first();
   await taxDropdown4.click({force: true});
   await page.waitForTimeout(1000);
   console.log('✅ Tax dropdown clicked - dropdown appeared');
   // ✅ Assertion: Verify Standard tax option is visible
   await expect(page.locator('text=Standard').first()).toBeVisible();
         
   // Select "Standard" tax option
   await page.locator('text=Standard').first().click();
   console.log('✅ Standard tax selected');
       
   // --- Additional Tax Selection (appears to be duplicate) ---
   console.log('🏷️ Step 24: Select tax type for fourth option');
         
   // Click on tax dropdown for second option (using .nth(1) to get the 2nd dropdown)
   const secondTaxDropdown4 = page.locator(locators["select-tax-dropdown"]).nth(1);
   await secondTaxDropdown4.click({force: true});
   await page.waitForTimeout(1000);
   console.log('✅ Second tax dropdown clicked - dropdown appeared');
   // ✅ Assertion: Verify Standard tax option is visible
   await expect(page.locator('text=Standard').first()).toBeVisible();
         
   // Select "Standard" tax option for fourth option
   await page.locator('text=Standard').first().click();
   console.log('✅ Standard tax selected for fourth option');
    
    // ========== SAVE CUSTOMIZATION ==========
    // Click the "Save" button to save all the customization data
    
    console.log('💾 Step 24: Save the customization');
    await page.locator(locators["save-button"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Customization saved successfully');
    // ✅ Assertion: Verify we are redirected to customizations list page after save
    await expect(page).toHaveURL(/\/customizations/);
    
    // Final success messages and page info
    console.log('✅ Form filled successfully with all four options and saved');
    console.log('📍 Final URL:', page.url());
    
    // Pause the test for manual inspection (can be removed for automated runs)
    await page.pause();
  });
});