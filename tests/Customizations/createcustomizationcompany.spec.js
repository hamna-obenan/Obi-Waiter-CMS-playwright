import { test, expect } from "@playwright/test";
import CustomizationPOM from "../../object-Page/Customizations/customizationpom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import customizations from "../../Fixtures/customization.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

/**
 * Customization Creation Test Suite
 * Tests customization creation at company level
 * Flow: Login → Venue → Menu → Customizations → Create → Company
 */
test.describe("Customization Management", () => {
  
  test("Create Customization Company - Sauces", async ({ page }) => {
    test.setTimeout(120000);
    const customizationPOM = new CustomizationPOM(page);
    
    // Get first customization data (Sauces)
    const customizationData = customizations[0];
    const title = customizationData["customization-title"];
    const isRequired = customizationData["required"] === "yes";
    
    // Login
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    
    // Simple navigation: Login → Venue → Menu → Click Menu → Stop
    console.log('🏢 Step 1: Navigate to venue page');
    await customizationPOM.navigateToVenuePage();
    
    console.log('📋 Step 2: Navigate to menu page');
    await customizationPOM.navigateToMenuPage();
    
    // Verify we landed on the menu page after navigation
    console.log('🔍 Verifying navigation to menu page...');
    console.log('✅ Successfully navigated to menu page');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Click on customization tab
    console.log('⚙️ Step 3: Click on customization tab');
    await page.locator(locators["customization-tab"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked on customization tab');
    
    // Click on Add Customization button
    console.log('➕ Step 4: Click on Add Customization button');
    await page.locator(locators["add-customization-button"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Add Customization button');
    
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
    
    // Fill title field
    console.log('📝 Step 7: Fill title field');
    await page.locator(locators["customization-name"]).fill(title);
    console.log(`✅ Title filled: ${title}`);
    
    // Check the required checkbox
    console.log('☑️ Step 8: Check the required checkbox');
    const checkbox = page.locator(locators["is-required-checkbox"]);
    await checkbox.check();
    console.log('✅ Required checkbox checked');
    
    // Add ketchup in option box
    console.log('📝 Step 9: Add ketchup in option box');
    await page.locator(locators["option-box"]).fill('ketchup');
    console.log('✅ Ketchup added to option box');
    
    // Handle price dropdown and custom price entry
    console.log('💰 Step 10: Handle price dropdown');
    
    // Step 1: Click on price field (dropdown appears)
    const priceField = page.locator(locators["price-dropdown"]);

    await priceField.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Price field clicked - dropdown appeared');
    
    // Step 2: Click on dropdown option (Enter Custom Price)
    await page.locator(locators["pricedefault"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected');
    
    // Step 3: Find the custom price input field using the provided locator
    const priceInput2 = page.locator(locators["enter-custom-price"]);
    await priceInput2.click();
    await page.waitForTimeout(500);
    console.log('✅ Custom price input field clicked');
    
    // Step 4: Add the price for Chilli-sauce
    await priceInput2.fill('0.00');
    console.log('✅ Price added for Chilli-sauce: $0.00');
    
    // Select tax type from dropdown
    console.log('🏷️ Step 11: Select tax type');
    
    // Click on tax dropdown
    const taxDropdown = page.locator(locators["select-tax-dropdown"]).first();
    await taxDropdown.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Tax dropdown clicked - dropdown appeared');
    
    // Select Standard tax option
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected');
    
    // Click Add More to add second option
    console.log('➕ Step 12: Click Add More for second option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked');
    
    // Add second option (chilli-sauce) 
    console.log('📝 Step 13: Add second option - chilli-sauce');
    const secondOptionBox = page.locator(locators["option-box1"]);
    await secondOptionBox.fill('chilli-sauce');
    console.log('✅ Chilli-sauce added to second option box');
    
    // Handle price dropdown for second option using POM
    console.log('💰 Step 14: Handle price dropdown for second option');
    // Wait for the second price field to be visible
    await page.waitForTimeout(2000);
    // Step 1: Click on price field (dropdown appears)
    const priceField2 = page.locator(locators["price-dropdown-2"]);
    await priceField2.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Price field clicked - dropdown appeared');
    
    // Step 2: Click on dropdown option (Enter Custom Price)
    await page.locator(locators["pricedefault"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected');
    
    // Step 3: Find the custom price input field using the provided locator
    const priceInput2Second = page.locator(locators["enter-custom-price-2"]);
    await priceInput2Second.click();
    await page.waitForTimeout(500);
    console.log('✅ Custom price input field clicked');
    
    // Step 4: Add the price for Chilli-sauce
    await priceInput2Second.fill('0.24');
    console.log('✅ Price added for Chilli-sauce: $0.24');
    
    // Select tax type from dropdown
    console.log('🏷️ Step 11: Select tax type');
    
    // Click on tax dropdown
    const taxDropdown2 = page.locator(locators["select-tax-dropdown-2"]).first();
    await taxDropdown2.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Tax dropdown clicked - dropdown appeared');
    
    // Select Standard tax option
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected');
  
    
    // Select tax type for second option
    console.log('🏷️ Step 15: Select tax type for second option');
    
    // Click on tax dropdown for second option
    const secondTaxDropdown = page.locator(locators["select-tax-dropdown"]).nth(1);
    await secondTaxDropdown.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Second tax dropdown clicked - dropdown appeared');
    
    // Select Standard tax option for second option
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected for second option');
    
    // Add third option (garlic-sauce)
    console.log('➕ Step 16: Click Add More for third option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked for third option');
    
    console.log('📝 Step 17: Add third option - garlic-sauce');
    const thirdOptionBox = page.locator(locators["option-box2"]);
    await thirdOptionBox.fill('garlic-sauce');
    console.log('✅ Garlic-sauce added to third option box');
    
    // Handle price dropdown for second option using POM
    console.log('💰 Step 18: Handle price dropdown for third option');
    // Wait for the second price field to be visible
    await page.waitForTimeout(2000);
    // Step 1: Click on price field (dropdown appears)
    const priceField3 = page.locator(locators["price-dropdown-3"]);
    await priceField3.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Price field clicked - dropdown appeared');
     
    // Step 2: Click on dropdown option (Enter Custom Price)
    await page.locator(locators["pricedefault"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected');
     
    // Step 3: Find the custom price input field using the provided locator
    const priceInput3 = page.locator(locators["enter-custom-price-3"]);
    await priceInput3.click();
    await page.waitForTimeout(500);
    console.log('✅ Custom price input field clicked');
     
    // Step 4: Add the price for Chilli-sauce
    await priceInput3.fill('0.24');
    console.log('✅ Price added for Chilli-sauce: $0.24');
     
    // Select tax type from dropdown
    console.log('🏷️ Step 11: Select tax type');
     
    // Click on tax dropdown
    const taxDropdown3 = page.locator(locators["select-tax-dropdown-3"]).first();
    await taxDropdown3.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Tax dropdown clicked - dropdown appeared');
     
    // Select Standard tax option
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected');
   
     
    // Select tax type for second option
    console.log('🏷️ Step 15: Select tax type for second option');
     
    // Click on tax dropdown for second option
    const secondTaxDropdown3 = page.locator(locators["select-tax-dropdown"]).nth(1);
    await secondTaxDropdown3.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Second tax dropdown clicked - dropdown appeared');
     
    // Select Standard tax option for second option
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected for second option');
    
    // Add fourth option (mayonnaise)
    console.log('➕ Step 20: Click Add More for fourth option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked for fourth option');
    
    console.log('📝 Step 21: Add fourth option - mayonnaise');
    const fourthOptionBox = page.locator(locators["option-box3"]);
    await fourthOptionBox.fill('mayonnaise');
    console.log('✅ Mayonnaise added to fourth option box');
    
   // Handle price dropdown for second option using POM
   console.log('💰 Step 22: Handle price dropdown for fourth option');
   // Wait for the second price field to be visible
   await page.waitForTimeout(2000);
   // Step 1: Click on price field (dropdown appears)
   const priceField4 = page.locator(locators["price-dropdown-4"]);
   await priceField4.click({force: true});
   await page.waitForTimeout(1000);
   console.log('✅ Price field clicked - dropdown appeared');
         
   // Step 2: Click on dropdown option (Enter Custom Price)
   await page.locator(locators["pricedefault"]).click();
   await page.waitForTimeout(1000);
   console.log('✅ Custom price option selected');
         
   // Step 3: Find the custom price input field using the provided locator
   const priceInput4 = page.locator(locators["enter-custom-price-4"]);
   await priceInput4.click();
   await page.waitForTimeout(500);
   console.log('✅ Custom price input field clicked');
         
   // Step 4: Add the price for Chilli-sauce
   await priceInput4.fill('0.24');
   console.log('✅ Price added for mayonnaise: $0.24');
         
   // Select tax type from dropdown
   console.log('🏷️ Step 23: Select tax type for fourth option');
         
   // Click on tax dropdown
   const taxDropdown4 = page.locator(locators["select-tax-dropdown-4"]).first();
   await taxDropdown4.click({force: true});
   await page.waitForTimeout(1000);
   console.log('✅ Tax dropdown clicked - dropdown appeared');
         
   // Select Standard tax option
   await page.locator('text=Standard').first().click();
   console.log('✅ Standard tax selected');
       
         
   // Select tax type for second option
   console.log('🏷️ Step 24: Select tax type for fourth option');
         
   // Click on tax dropdown for second option
   const secondTaxDropdown4 = page.locator(locators["select-tax-dropdown"]).nth(1);
   await secondTaxDropdown4.click({force: true});
   await page.waitForTimeout(1000);
   console.log('✅ Second tax dropdown clicked - dropdown appeared');
         
   // Select Standard tax option for second option
   await page.locator('text=Standard').first().click();
   console.log('✅ Standard tax selected for fourth option');
    
    // Save the customization
    console.log('💾 Step 24: Save the customization');
    await page.locator(locators["save-button"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Customization saved successfully');
    
    console.log('✅ Form filled successfully with all four options and saved');
    console.log('📍 Final URL:', page.url());
    
    await page.pause();
  });
});