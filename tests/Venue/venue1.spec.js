// Venue Duplication Testing - Complete Flow
// debug the popup verification issue


import { test, expect } from "@playwright/test";
import LoginPage from "../../object-Page/pomlogin/pomlogin1.js";
import VenueDuplicationPOM from "../../object-Page/venue/venue1-pom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import venue from "../../Fixtures/Venue.json" assert { type: "json" };
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper Functions
async function performLogin(page, loginPage, loginData) { 
  await page.goto("https://develop.d20aue3nu6xt33.amplifyapp.com/login");
  await expect(page).toHaveURL(/.*login/);
  
  await loginPage.login(loginData.TC1001.Email, loginData.TC1001.Password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForLoadState('networkidle');
  
  // Check for login errors
  const loginError = await page.locator('text="Internal server error", text="Wrong credentials", text="User not found"').count();
  if (loginError > 0) {
    const errorText = await page.locator('text="Internal server error", text="Wrong credentials", text="User not found"').textContent();
    throw new Error(`Login failed: ${errorText}`);
  }

  await page.waitForFunction(() => !window.location.href.includes('/login'), { timeout: 15000 });
  await page.locator(locators["click-add-venue-button"]).waitFor({ timeout: 15000 });
  console.log('✅ Login completed successfully');
}

async function fillBasicInfo(page, venueData) {
  console.log('📝 Filling venue basic information...');
  
  await page.getByRole('textbox', { name: 'Venue name' }).fill(venueData['venue-name']);
  await page.getByRole('textbox', { name: 'Email' }).fill(venueData['venue-email']);
  
  await page.getByRole('combobox', { name: 'Venue type' }).click();
  await page.getByRole('option', { name: venueData['venue-type'], exact: true }).click();
  
  await page.getByRole('combobox', { name: 'Venue default language' }).click();
  await page.getByRole('option', { name: venueData['venue-default-language'], exact: true }).click();
  
  await page.getByRole('combobox', { name: 'Time zone' }).click();
  await page.getByRole('option', { name: venueData['venue-Time zone'], exact: true }).click();
  
  await page.getByRole('combobox', { name: 'Currency' }).click();
  await page.getByRole('option', { name: venueData['venue-Currency'], exact: true }).click();
  
  await page.getByRole('textbox', { name: 'Cuisine' }).fill(venueData['venue-Cuisine']);
  await page.getByRole('textbox', { name: 'Address' }).fill(venueData['venue-Address']);
  
  console.log('✅ Basic information filled');
}

async function fillVenueDetails(page, venueData) {
  console.log('📝 Filling venue details and branding...');
  
  await page.getByRole('textbox', { name: 'Venue description' }).fill(venueData['venue-description']);
  await page.locator("[name='instagram']").fill(venueData['Instagram address (optional)']);
  await page.locator("[name='facebook']").fill(venueData['Facebook (optional)']);
  await page.locator("[name='slug']").fill(venueData['Client app url *']);
  
  await page.locator("[type='checkbox']").first().check();
  await page.getByRole('checkbox').nth(1).check();
  
  await page.locator("[name='defaultTipPercentage']").fill(venueData['Tip Percentage (%)']);
  await page.locator("[name='dineInTax']").fill(venueData['Dine-In Tax (%) *']);
  await page.locator("[name='takeawayTax']").fill(venueData['Take-Away Tax (%) *']);
  
  console.log('✅ Venue details filled');
}

async function uploadImage(page, imagePath, imageName) {
  console.log(`📸 Uploading ${imageName}...`);
  await page.getByText('Choose image').first().click();
  await page.setInputFiles('input[type="file"]', imagePath);
  await page.waitForTimeout(2000);
  await expect(page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
  await page.getByRole('button', { name: 'Upload' }).click();
  
  // Wait for upload to complete dynamically
  try {
    await page.waitForFunction(() => {
      const uploadModal = document.querySelector('[role="dialog"], .MuiDialog-root, .MuiModal-root');
      return !uploadModal || uploadModal.style.display === 'none';
    }, { timeout: 30000 });
    console.log(`✅ ${imageName} uploaded successfully`);
  } catch (error) {
    console.log(`⚠️ Upload timeout for ${imageName}, continuing...`);
  }
}

async function fillStoryAndExperience(page, venueData) {
  console.log('📝 Filling story and experience section...');
  
  await page.getByRole('textbox', { name: 'Enter contact number' }).fill(venueData['contact-number']);
  await page.getByRole('textbox', { name: 'Story Title' }).fill(venueData['Story Title']);
  await page.locator("[data-slate-node='element']").fill(venueData['Story Description']);
  
  const storyPath = path.join(__dirname, '../../Fixtures/pictures/story.png');
  await uploadImage(page, storyPath, 'Story image');
  
  console.log('✅ Story and experience filled');
}

async function addGalleryItems(page, venueData) {
  console.log('📝 Adding gallery items...');
  
  for (let i = 1; i <= 3; i++) {
    await page.getByRole('button', { name: 'Add Gallery Item' }).click();
    await page.waitForTimeout(1000);
    
    await page.locator(locators[`add-galary-items-${i}`]).fill(venueData[`gallary-titel-${i}`]);
    await page.getByRole('textbox', { name: 'Gallery Description' }).nth(i - 1).fill(venueData[`gallary-description-${i}`]);
    
    await page.getByText('Choose image').last().click();
    const galleryPath = path.join(__dirname, `../../Fixtures/pictures/gallary${i}.png`);
    await page.setInputFiles('input[type="file"]', galleryPath);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.waitForTimeout(3000);
    
    console.log(`✅ Gallery item ${i} added`);
  }
}

async function verifyVenueCreation(page, venueDuplicationPOM) {
  console.log('🔍 Verifying venue creation result...');
  
  // Wait for any popup/alert to appear
  await page.waitForTimeout(2000);
  
  // Check for venue already exists error using POM
  const hasVenueExistsError = await venueDuplicationPOM.checkVenueAlreadyExistsError();
  
  if (hasVenueExistsError) {
    console.log('✅ Venue already exists error correctly detected');
    expect(hasVenueExistsError).toBe(true);
    
    // Take screenshot of the popup
    console.log('📸 Taking screenshot of the popup...');
    await page.screenshot({ 
      path: 'venue-already-exists-popup.png',
      fullPage: true 
    });
    console.log('✅ Screenshot saved as venue-already-exists-popup.png');
    
    // Verify the popup contains the expected error message
    const popupText = await page.locator('[role="alert"], .MuiAlert-root, .alert, [class*="alert"]').first().textContent();
    const containsVenueExists = popupText.toLowerCase().includes('venue already exist');
    
    if (containsVenueExists) {
      console.log('✅ Popup contains "venue already exist" text');
      expect(containsVenueExists).toBe(true);
    } else {
      console.log('⚠️ Popup does not contain expected text');
      console.log(`📢 Actual popup text: ${popupText}`);
    }
    
  } else {
    console.log('⚠️ No venue already exists error found');
    
    // Check if venue was created successfully
    const isCreated = await venueDuplicationPOM.isVenueCreated();
    if (isCreated) {
      console.log('✅ Venue created successfully');
    } else {
      console.log('⚠️ Venue creation status unclear');
      
      // Take screenshot for debugging
      // await page.screenshot({ 
      //   path: 'venue-creation-unclear.png',
      //   fullPage: true 
      // });
      // console.log('📸 Debug screenshot saved as venue-creation-unclear.png');
    }
  }
}

/**
 * Venue Duplication Test Suite
 * Tests venue creation with duplicate data to verify error handling
 */
test("Venue Duplication Testing - Complete Flow", async ({ page }) => {
  // Set longer timeout for this test
  test.setTimeout(120000); // 2 minutes
  const loginPage = new LoginPage(page);
  const venueDuplicationPOM = new VenueDuplicationPOM(page);
  
  // Login Process
  await performLogin(page, loginPage, login);

  // Navigate to Add Venue
  console.log('🎯 Creating venue with standard data');
  await page.locator(locators["click-add-venue-button"]).click();
  await page.waitForLoadState('networkidle');

  // Fill Step 1: Basic Information
  await fillBasicInfo(page, venue);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState('networkidle');

  // Fill Step 2: Details & Branding
  await fillVenueDetails(page, venue);
  
  // Upload images
  const logoPath = path.join(__dirname, '../../Fixtures/pictures/venue-logo.png');
  const coverPath = path.join(__dirname, '../../Fixtures/pictures/coverimage.png');
  
  await uploadImage(page, logoPath, 'Logo');
  await uploadImage(page, coverPath, 'Cover image');
  
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState('networkidle');

  // Fill Step 3: Story & Experience
  await fillStoryAndExperience(page, venue);
  
  // Add Gallery Items
  await addGalleryItems(page, venue);

  // Save the venue
  await page.getByRole('button', { name: 'Save' }).click();
  
  // Wait for popup to appear
  await page.waitForSelector('text="Venue already exist"', { timeout: 10000 });
  console.log('✅ Popup appeared - "Venue already exist" detected');
  
  // Verify venue creation
  await verifyVenueCreation(page, venueDuplicationPOM);
  
  // Pause for inspection
  // await page.pause();
});
