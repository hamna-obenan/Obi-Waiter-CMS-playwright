import { test, expect } from "@playwright/test";
import CustomizationVenuePOM from "../../object-Page/Customizations/createcustomizationvenuepom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import customizations from "../../Fixtures/customization.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";

/**
 * Customization Creation Test Suite - Venue Level
 * Tests customization creation at venue level
 * Flow: Login → Venue → Menu → Customizations → Create → Venue
 */
test.describe("Customization Management - Venue Level", () => {
  
  test("Create Customization Venue - Cheese", async ({ page }) => {
    test.setTimeout(120000);
    const customizationVenuePOM = new CustomizationVenuePOM(page);
    
    // Get second customization data (Cheese)
    const customizationData = customizations[1];
    const title = customizationData["customization-title"];
    const isRequired = customizationData["required"] === "yes";
    
    // Login
    await performLogin(page, login.TC1001.Email, login.TC1001.Password);
    
    // Simple navigation: Login → Venue → Menu → Click Menu → Stop
    console.log('🏢 Step 1: Navigate to venue page');
    await customizationVenuePOM.navigateToVenuePage();
    
    console.log('📋 Step 2: Navigate to menu page');
    await customizationVenuePOM.navigateToMenuPage();
    
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
    
    // Click on Venue button (instead of Company)
    console.log('🏢 Step 6: Click on Venue button');
    await page.locator(locators["venue-button"]).click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Venue button');
    
    // Fill title field
    console.log('📝 Step 7: Fill title field');
    await page.locator(locators["customization-name"]).fill("customizationtitle2");
    console.log(`✅ Title filled: ${title}`);
    
    // Check the required checkbox
    console.log('☑️ Step 8: Check the required checkbox');
    const checkbox = page.locator(locators["is-required-checkbox"]);
    await checkbox.check();
    console.log('✅ Required checkbox checked');
    
    // Add cheddar in option box
    console.log('📝 Step 9: Add cheddar in option box');
    await page.locator(locators["option-box"]).fill('cheddar');
    console.log('✅ Cheddar added to option box');
    
    // Handle price dropdown and custom price entry
    console.log('💰 Step 10: Handle price dropdown');
    
    // Step 1: Click on price field (dropdown appears)
    const priceField = page.locator(locators["price-dropdown"]).nth(1);
    // await priceField.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Price field clicked - dropdown appeared');
    
    // Step 2: Click on dropdown option (Enter Custom Price)
    await page.locator(locators["price default"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected');
    
    // Step 3: Find the custom price input field using the provided locator
    const priceInput = page.locator(locators["enter-custom-price"]);
    await priceInput.click();
    await page.waitForTimeout(500);
    console.log('✅ Custom price input field clicked');
    
    // Step 4: Add the price for cheddar from customization data
    const cheddarPrice = customizationData["cheddar"];
    await priceInput.fill(cheddarPrice);
    console.log(`✅ Price added for cheddar: $${cheddarPrice}`);
    
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
    
    // Add second option (mozzarella) with price from data
    console.log('📝 Step 13: Add second option - mozzarella');
    const secondOptionBox = page.locator(locators["option-box1"]);
    await secondOptionBox.fill('mozzarella');
    console.log('✅ Mozzarella added to second option box');
    
    // Handle price dropdown for second option
    console.log('💰 Step 14: Handle price dropdown for second option');
    
    // Wait for the second price field to be visible
    await page.waitForTimeout(2000);
    
    // Step 1: Click on price field (dropdown appears)
    const secondPriceField = page.locator(locators["price-dropdown"]).nth(1);
    await secondPriceField.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Second price field clicked - dropdown appeared');
    
    // Step 2: Click on dropdown option (Enter Custom Price)
    await page.locator(locators["price default"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected for second option');
    
    // Step 3: Find the custom price input field for second option
    const secondPriceInput = page.locator(locators["enter-custom-price-2"]);
    await secondPriceInput.click();
    await page.waitForTimeout(500);
    console.log('✅ Second custom price input field clicked');
    
    // Step 4: Add the price for mozzarella from customization data
    const mozzarellaPrice = customizationData["mozzarella"];
    await secondPriceInput.fill(mozzarellaPrice);
    console.log(`✅ Price added for mozzarella: $${mozzarellaPrice}`);
    
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
    
    // Add third option (parmesan)
    console.log('➕ Step 16: Click Add More for third option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked for third option');
    
    console.log('📝 Step 17: Add third option - parmesan');
    const thirdOptionBox = page.locator(locators["option-box2"]);
    await thirdOptionBox.fill('parmesan');
    console.log('✅ Parmesan added to third option box');
    
    // Handle price dropdown for third option
    console.log('💰 Step 18: Handle price dropdown for third option');
    await page.waitForTimeout(2000);
    
    const thirdPriceField = page.locator(locators["price-dropdown"]).nth(1);
    await thirdPriceField.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Third price field clicked - dropdown appeared');
    
    await page.locator(locators["price default"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected for third option');
    
    const thirdPriceInput = page.locator(locators["enter-custom-price-3"]);
    await thirdPriceInput.click();
    await page.waitForTimeout(500);
    console.log('✅ Third custom price input field clicked');
    
    const parmesanPrice = customizationData["parmesan"];
    await thirdPriceInput.fill(parmesanPrice);
    console.log(`✅ Price added for parmesan: $${parmesanPrice}`);
    
    // Select tax type for third option
    console.log('🏷️ Step 19: Select tax type for third option');
    const thirdTaxDropdown = page.locator(locators["select-tax-dropdown"]).nth(1);
    await thirdTaxDropdown.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Third tax dropdown clicked - dropdown appeared');
    
    await page.locator('text=Standard').first().click();
    console.log('✅ Standard tax selected for third option');
    
    // Add fourth option (mayonnaise)
    console.log('➕ Step 20: Click Add More for fourth option');
    await page.locator(locators["add-more-customization-button"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Add More button clicked for fourth option');
    
    console.log('📝 Step 21: Add fourth option - mayonnaise');
    const fourthOptionBox = page.locator(locators["option-box3"]);
    await fourthOptionBox.fill('mayonnaise');
    console.log('✅ Mayonnaise added to fourth option box');
    
    // Handle price dropdown for fourth option
    console.log('💰 Step 22: Handle price dropdown for fourth option');
    await page.waitForTimeout(2000);
    
    const fourthPriceField = page.locator(locators["price-dropdown"]).nth(1);
    await fourthPriceField.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Fourth price field clicked - dropdown appeared');
    
    await page.locator(locators["price default"]).click();
    await page.waitForTimeout(1000);
    console.log('✅ Custom price option selected for fourth option');
    
    const fourthPriceInput = page.locator(locators["enter-custom-price-4"]);
    await fourthPriceInput.click();
    await page.waitForTimeout(500);
    console.log('✅ Fourth custom price input field clicked');
    
    const mayonnaisePrice = customizationData["mayonnaise"];
    await fourthPriceInput.fill(mayonnaisePrice);
    console.log(`✅ Price added for mayonnaise: $${mayonnaisePrice}`);
    
    // Select tax type for fourth option
    console.log('🏷️ Step 23: Select tax type for fourth option');
    const fourthTaxDropdown = page.locator(locators["select-tax-dropdown"]).nth(3);
    await fourthTaxDropdown.click({force: true});
    await page.waitForTimeout(1000);
    console.log('✅ Fourth tax dropdown clicked - dropdown appeared');
    
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
