// Import Playwright test framework and expect for assertions
import { test, expect } from "@playwright/test";
// Import the Page Object Model for venue customization actions
import CustomizationVenuePOM from "../../object-Page/Customizations/createcustomizationvenuepom.js";
// Import JSON files containing locators, login credentials, and test data
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import customizations from "../../Fixtures/customization.json" assert { type: "json" };
// Import reusable login helper function
import { performLogin } from "../../utils/login-helper.js";

/**
 * Customization Creation Test Suite - Venue Level
 * Tests customization creation at venue level
 * Flow: Login → Venue → Menu → Customizations → Create → Venue
 */
test.describe("Customization Management - Venue Level", () => {
  
  test("Create Customization Venue - Cheese", async ({ page }) => {
    // Set timeout to 2 minutes for this test (customization creation takes time)
    test.setTimeout(120000);
    // Create an instance of the POM to use its helper methods
    const customizationVenuePOM = new CustomizationVenuePOM(page);
    
    // Get the second customization from JSON file (index 1 = "Cheese")
    const customizationData = customizations[1];
    const title = customizationData["customizationtitle2"] || customizationData["customization-title"];
    const isRequired = customizationData["required"] === "yes";
    
    // Login using the test user credentials from login.json
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    // ✅ Assertion: Verify we are not on the login page anymore
    await expect(page).not.toHaveURL(/\/login/);
    
    // ========== NAVIGATION SECTION ==========
    // Navigate from login page → venue page → menu page → customizations tab
    
    console.log('🏢 Step 1: Navigate to venue page');
    await customizationVenuePOM.navigateToVenuePage();
    
    console.log('📋 Step 2: Navigate to menu page');
    await customizationVenuePOM.navigateToMenuPage();
    console.log('✅ Successfully navigated to menu page');
    
    // Navigate to customizations tab
    console.log('📋 Step 3: Navigate to customizations tab');
    await page.goto('/customizations');
    await page.waitForLoadState('networkidle');
    await customizationVenuePOM.clickOnCustomizationsTab();
    
    // Click Add Customization button
    console.log('➕ Step 4: Click Add Customization button');
    await customizationVenuePOM.clickOnAddCustomizationButton();
    
    // Click Create button
    console.log('🔨 Step 5: Click Create button');
    await customizationVenuePOM.clickOnCreateButton();
    
    // Click Venue button
    console.log('🏢 Step 6: Click Venue button');
    await customizationVenuePOM.clickOnVenueButton();
    
    // Type customization name
    console.log('📝 Step 7: Type customization name');
    await page.locator(locators["customization-name"]).fill(title);
    // ✅ Assertion: Verify customization name is filled
    await expect(page.locator(locators["customization-name"])).toHaveValue(title);
    
    // Make this customization required or not based on data
    if (isRequired) {
      console.log('☑️ Step 8: Check the required checkbox');
      await customizationVenuePOM.clickOnRequiredCheckbox();
      // ✅ Assertion: Verify checkbox is checked
      await expect(page.locator(locators["is-required-checkbox"])).toBeChecked();
    }
    
    // ========== FIRST OPTION: CHEDDAR ==========
    // Add the first cheese option with custom price and tax
    
    console.log('📝 Step 9: Add cheddar in option box');
    await page.locator(locators["option-box"]).fill('cheddar');
    // ✅ Assertion: Verify option box has 'cheddar' value
    await expect(page.locator(locators["option-box"])).toHaveValue('cheddar');
    
    // --- Price Handling for Option 1 (Cheddar) ---
    console.log('💰 Step 10: Handle price dropdown');
    
    // Step 1: Click on the price dropdown to open it
    const priceField = page.locator(locators["price-dropdown"]).first();
    await priceField.click({force: true});
    await page.waitForTimeout(1000);
    // ✅ Assertion: Verify custom price option is visible
    await expect(page.locator(locators["pricedefault"])).toBeVisible();
    
    // Step 2: Select "Enter Custom Price" option from the dropdown
    await page.locator(locators["pricedefault"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected');
    
    // Step 3: Click on the custom price input field that appears
    const priceInput1 = page.locator(locators["enter-custom-price"]);
    await priceInput1.click();
    await page.waitForTimeout(500);
    // ✅ Assertion: Verify price input field is visible
    await expect(priceInput1).toBeVisible();
    
    // Step 4: Enter the price (from JSON - $2.00 for cheddar)
    await priceInput1.fill(customizationData["cheddar"]);
    console.log(`✅ Price added for cheddar: $${customizationData["cheddar"]}`);
    // ✅ Assertion: Verify price input has the correct value
    await expect(priceInput1).toHaveValue(customizationData["cheddar"]);
    
    // --- Tax Selection for Option 1 (Cheddar) ---
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
    
    // ========== SECOND OPTION: MOZZARELLA ==========
    // Click "Add More" button to add another cheese option
    
    console.log('➕ Step 12: Click Add More for second option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked');
    // ✅ Assertion: Verify second option box appeared
    const secondOptionBox = page.locator(locators["option-box1"]);
    await expect(secondOptionBox).toBeVisible();
    
    // Fill in the second option name
    console.log('📝 Step 13: Add second option - mozzarella');
    await secondOptionBox.fill('mozzarella');
    console.log('✅ Mozzarella added to second option box');
    // ✅ Assertion: Verify second option box has 'mozzarella' value
    await expect(secondOptionBox).toHaveValue('mozzarella');
    
    // --- Price Handling for Option 2 (Mozzarella) ---
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
    
    // Step 4: Enter the price (from JSON - $2.24 for mozzarella)
    await priceInput2Second.fill(customizationData["mozzarella"]);
    console.log(`✅ Price added for Mozzarella: $${customizationData["mozzarella"]}`);
    // ✅ Assertion: Verify price input has the correct value
    await expect(priceInput2Second).toHaveValue(customizationData["mozzarella"]);
    
    // --- Tax Selection for Option 2 (Mozzarella) ---
    console.log('🏷️ Step 15: Select tax type for second option');
    
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
    
    // ========== THIRD OPTION: PARMESAN ==========
    // Click "Add More" button to add the third cheese option
    
    console.log('➕ Step 16: Click Add More for third option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked for third option');
    // ✅ Assertion: Verify third option box appeared
    const thirdOptionBox = page.locator(locators["option-box2"]);
    await expect(thirdOptionBox).toBeVisible();
    
    // Fill in the third option name
    console.log('📝 Step 17: Add third option - parmesan');
    await thirdOptionBox.fill('parmesan');
    console.log('✅ Parmesan added to third option box');
    // ✅ Assertion: Verify third option box has 'parmesan' value
    await expect(thirdOptionBox).toHaveValue('parmesan');
    
    // --- Price Handling for Option 3 (Parmesan) ---
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
     
    // Step 4: Enter the price (from JSON - $3.24 for parmesan)
    await priceInput3.fill(customizationData["parmesan"]);
    console.log(`✅ Price added for Parmesan: $${customizationData["parmesan"]}`);
    // ✅ Assertion: Verify price input has the correct value
    await expect(priceInput3).toHaveValue(customizationData["parmesan"]);
     
    // --- Tax Selection for Option 3 (Parmesan) ---
    console.log('🏷️ Step 19: Select tax type for third option');
     
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
    // Click "Add More" button to add the fourth and final cheese option
    
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
         
   // Step 4: Enter the price (from JSON - $3.24 for mayonnaise)
   await priceInput4.fill(customizationData["mayonnaise"]);
   console.log(`✅ Price added for mayonnaise: $${customizationData["mayonnaise"]}`);
   // ✅ Assertion: Verify price input has the correct value
   await expect(priceInput4).toHaveValue(customizationData["mayonnaise"]);
         
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
    await customizationVenuePOM.clickOnSaveButton();
    console.log('✅ Customization saved successfully');
    // ✅ Assertion: Verify we are redirected to customizations list page after save
    await expect(page).toHaveURL(/\/customizations/);
    
    // Final success messages and page info
    console.log('✅ Form filled successfully with all four options and saved');
    console.log('📍 Final URL:', page.url());
  });
});
