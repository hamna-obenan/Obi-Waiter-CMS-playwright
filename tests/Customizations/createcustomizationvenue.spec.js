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
//import url verification json file
import urlVerification from "../../Fixtures/url_verification.json" assert { type: "json" };

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
    const title = customizationData["customization-title"];
    const isRequired = customizationData["required"] === "yes";
    
    // Login using the test user credentials from login.json
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    // ✅ Assertion: Verify we are not on the login page anymore
    await expect(page).toHaveURL(urlVerification["verify-the-venue-navigated-url"]);
    
    // ========== NAVIGATION SECTION ==========
    // Navigate from login page → venue page → menu page → customizations tab
    
    console.log('🏢 Step 1: Navigate to venue page');
    await customizationVenuePOM.navigateToVenuePage();
    // ✅ Assertion: Verify we navigated to venue page
    await expect(page).toHaveURL(urlVerification["verify-the-menu-navigated-url"]);

    
    console.log('📋 Step 2: Navigate to menu page');
    await customizationVenuePOM.navigateToMenuPage();
    
    // Verify we landed on the menu page after navigation
    console.log('🔍 Verifying navigation to menu page...');
    console.log('✅ Successfully navigated to menu page');
    // ✅ Assertion: Verify we are on menu page
    await expect(page).toHaveURL(urlVerification["verify-the-menu-navigated-url"]);
    
    // Wait for all network requests to finish before proceeding
    await page.waitForLoadState('networkidle');
    
    // ========== CUSTOMIZATION SETUP SECTION ==========
    // Click through: Customization Tab → Add Customization → Create → Venue Level
    
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
    // ✅ Assertion: Verify Company and Venue buttons are visible
    await expect(page.locator(locators["venue-button"])).toBeVisible();
    
    // Choose "Venue" level (not "Company" level) for this customization
    console.log('🏢 Step 6: Click on Venue button');
    await page.locator(locators["venue-button"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Venue button');
    // ✅ Assertion: Verify customization name field is visible
    await expect(page.locator(locators["customization-name"])).toBeVisible();
    
    // ========== CUSTOMIZATION DETAILS SECTION ==========
    // Fill in the customization name (hardcoded as "Cheese")
    
    console.log('📝 Step 7: Fill title field');
    await page.locator(locators["customization-name"]).fill("Cheese");
    console.log(`✅ Title filled: ${title}`);
    // ✅ Assertion: Verify title field has the correct value
    await expect(page.locator(locators["customization-name"])).toHaveValue("Cheese");

    

    // ========== FIRST OPTION: CHEDDAR ==========
    // Add the first cheese option with custom price and tax
    
    console.log('📝 Step 9: Add cheddar in option box');
    await page.locator(locators["option-box"]).fill('cheddar');
    console.log('✅ Cheddar added to option box');
    // ✅ Assertion: Verify option box has 'cheddar' value
    await expect(page.locator(locators["option-box"])).toHaveValue('cheddar');

    
    // --- Price Handling for Option 1 (Cheddar) ---
    console.log('💰 Step 9: Handle price dropdown');
    
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
    const priceInput = page.locator(locators["enter-custom-price"]);
    await priceInput.click();
    await page.waitForTimeout(500);
    console.log('✅ Custom price input field clicked');
    // ✅ Assertion: Verify price input field is visible
    await expect(priceInput).toBeVisible();
    
    // Step 4: Enter the cheddar price from test data JSON file
    const cheddarPrice = customizationData["cheddar"];
    await priceInput.fill(cheddarPrice);
    console.log(`✅ Price added for cheddar: $${cheddarPrice}`);
    // ✅ Assertion: Verify price input has the correct value
    await expect(priceInput).toHaveValue(cheddarPrice);
    
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
    

   // --- Make This Customization Required ---
   // Check the "required" checkbox so customers must select this customization
   console.log('☑️ Step 10: Check the required checkbox');
   const checkbox = page.locator(locators["is-required-checkbox"]).first();
   await checkbox.check();
   console.log('✅ Required checkbox checked');  
   // ✅ Assertion: Verify checkbox is checked
   await expect(checkbox).toBeChecked();
    
    // ========== SECOND OPTION: MOZZARELLA ==========
    // Click "Add More" button to add another cheese option
    
    console.log('➕ Step 11: Click Add More for second option');
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
    
    // Step 4: Enter the mozzarella price from test data JSON file
    const mozzarellaPrice = customizationData["mozzarella"];
    await priceInput2Second.fill(mozzarellaPrice);
    console.log(`✅ Price added for mozzarella: $${mozzarellaPrice}`);
    // ✅ Assertion: Verify mozzarella price input has the correct value
    await expect(priceInput2Second).toHaveValue(mozzarellaPrice);
    
    // --- Tax Selection for Option 2 (Mozzarella) ---
    console.log('🏷️ Step 15: Select tax type for second option');
    
    // Click on tax dropdown for second option (using .nth(1) to get the 2nd dropdown)
    const secondTaxDropdown = page.locator(locators["select-tax-dropdown"]).nth(1);
    await secondTaxDropdown.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Second tax dropdown clicked - dropdown appeared');
    // ✅ Assertion: Verify Standard tax option is visible
    await expect(page.locator('text=Standard').first()).toBeVisible();
    
    // Select "Standard" tax option for mozzarella
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
    
    // Step 4: Enter the parmesan price from test data JSON file
    const parmesanPrice = customizationData["parmesan"];
    await priceInput3.fill(parmesanPrice);
    console.log(`✅ Price added for parmesan: $${parmesanPrice}`);
    // ✅ Assertion: Verify parmesan price input has the correct value
    await expect(priceInput3).toHaveValue(parmesanPrice);
    
    // --- Tax Selection for Option 3 (Parmesan) ---
    console.log('🏷️ Step 19: Select tax type for third option');
    const thirdTaxDropdown = page.locator(locators["select-tax-dropdown"]).nth(1);
    await thirdTaxDropdown.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Third tax dropdown clicked - dropdown appeared');
    // ✅ Assertion: Verify Standard tax option is visible
    await expect(page.locator('text=Standard').first()).toBeVisible();
    
    // Select "Standard" tax option for parmesan
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected for third option');
    
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
    
    // Step 4: Enter the mayonnaise price from test data JSON file
    const mayonnaisePrice = customizationData["mayonnaise"];
    await priceInput4.fill(mayonnaisePrice);
    console.log(`✅ Price added for mayonnaise: $${mayonnaisePrice}`);
    // ✅ Assertion: Verify mayonnaise price input has the correct value
    await expect(priceInput4).toHaveValue(mayonnaisePrice);
    
    // --- Tax Selection for Option 4 (Mayonnaise) ---
    console.log('🏷️ Step 23: Select tax type for fourth option');
    // Use .nth(3) to get the 4th tax dropdown
    const fourthTaxDropdown = page.locator(locators["select-tax-dropdown"]).nth(3);
    await fourthTaxDropdown.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Fourth tax dropdown clicked - dropdown appeared');
    // ✅ Assertion: Verify Standard tax option is visible
    await expect(page.locator('text=Standard').first()).toBeVisible();
    
    // Select "Standard" tax option for mayonnaise
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected for fourth option');
    
    // ========== SAVE CUSTOMIZATION ==========
    // Click the "Save" button to save all the customization data
    
    console.log('💾 Step 24: Save the customization');
    await page.locator(locators["save-button"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Customization saved successfully');
    // ✅ Assertion: Verify we are redirected to customizations list page after save
    await expect(page).toHaveURL(urlVerification["verify-the-customizations-navigated-url"]);
    
    // Final success messages and page info
    console.log('✅ Form filled successfully with all four options and saved');
    console.log('📍 Final URL:', page.url());
    
    // Pause the test for manual inspection (can be removed for automated runs)
    await page.pause();
  });
});
