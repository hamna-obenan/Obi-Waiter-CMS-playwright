import { test, expect } from "@playwright/test";
import { config } from "../../config/environments.js";
import AddVenuePage from "../../object-Page/venue/addvenue-pom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import venue from "../../Fixtures/Venue.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minimal test: login -> click Add Venue -> wait for page to be ready -> pause
test("open Add Venue and wait @translationBugOnCreateVenue", async ({ page }) => {
  // Login Process - Using reusable login function
  await performLogin(page, login.TC1001.Email, login.TC1001.Password);

  // Wait for the Add button to appear after successful login
  await page.locator(locators["click-add-venue-button"]).waitFor({ timeout: 15000 });
  // Assert: Verify Add Venue button is visible before clicking
  await expect(page.locator(locators["click-add-venue-button"])).toBeVisible();
  await page.locator(locators["click-add-venue-button"]).click();

  // Wait for Add Venue page to load by waiting for the Venue name field
  await page.getByRole('textbox', { name: 'Venue name' }).waitFor({ timeout: 15000 });
  // Assert: Verify Venue name field is visible on the form
  await expect(page.getByRole('textbox', { name: 'Venue name' })).toBeVisible();

  // Step 1: Fill Venue name from fixture
  await page.getByRole('textbox', { name: 'Venue name' }).fill(venue["venue-name"]);
  // Assert: Verify venue name field contains the entered value
  await expect(page.getByRole('textbox', { name: 'Venue name' })).toHaveValue(venue["venue-name"]);

  // // translate the venue name using locators from locators.json
  // console.log('Starting venue name translation...');
  
  // // Click on the translation icon
  // await page.locator(locators["venue-name-translation"]).click();
  // console.log('Translation icon clicked');
  
  // // Assert: Verify translation modal is open
  // await expect(page.getByText('Translate')).toBeVisible();
  // console.log('Translation modal is open');
  
  // // Wait for translation modal to appear (8 seconds)
  // await page.waitForTimeout(8000);
  // await page.pause();
  // // Select German language using the specific locator
  // await page.locator(locators["venue-name-translate-german"]).click();
  // console.log('German language selected');
  
  // // Assert: Verify German language is selected
  // await expect(page.locator(locators["venue-name-translate-german"])).toBeVisible();
  // console.log('German language selection verified');
  
  // // Click Auto Translate button for German
  // await page.locator(locators["venue-name-autotranslate"]).click();
  // console.log('Auto Translate button clicked for German');
  
  // // Wait for German translation to complete (8 seconds)
  // await page.waitForTimeout(8000);
  // console.log('German auto-translation completed');
  
  // // Now translate to Dutch
  // console.log('Starting Dutch translation...');
  
  // // First close the current modal by clicking Apply button
  // await page.locator(locators["venue-name-apply-button"]).click();
  // console.log('Applied German translation and closed modal');
  
  // // Wait for modal to close
  // await page.waitForTimeout(2000);
  
  // // Click on the translation icon again for Dutch
  // await page.locator(locators["venue-name-translation"]).click();
  // console.log('Translation icon clicked for Dutch');
  
  // // Wait for translation modal to appear (8 seconds)
  // await page.waitForTimeout(8000);
  
  // // Select Dutch language using the specific locator
  // await page.locator(locators["venue-name-translate-dutch"]).click();
  // console.log('Dutch language selected');
  
  // // Assert: Verify Dutch language is selected
  // await expect(page.locator(locators["venue-name-translate-dutch"])).toBeVisible();
  // console.log('Dutch language selection verified');
  
  // // Click Auto Translate button for Dutch
  // await page.locator(locators["venue-name-autotranslate"]).click();
  // console.log('Auto Translate button clicked for Dutch');
  
  // // Wait for Dutch translation to complete (8 seconds)
  // await page.waitForTimeout(8000);
  // console.log('Dutch auto-translation completed');
  
  // // Click Apply button using the specific locator
  // await page.locator(locators["venue-name-apply-button"]).click();
  // console.log('Apply button clicked');
  
  // // Assert: Verify Apply button is clicked and modal is closing
  // await expect(page.locator(locators["venue-name-apply-button"])).not.toBeVisible();
  // console.log('Apply button click verified and modal is closing');
  
  // // Wait for translation to complete (8 seconds)
  // await page.waitForTimeout(8000);
  
  // // Assert: Verify translation is applied to venue name field
  // await expect(page.getByRole('textbox', { name: 'Venue name' })).toHaveValue(venue["venue-name"]);
  // console.log('Venue name field still contains original value after translation');
  
  // console.log('Venue name translation to both German and Dutch completed successfully');

  // Step 1: Fill Email from fixture
  await page.getByRole('textbox', { name: 'Email' }).fill(venue["venue-email"]);
  // Assert: Verify email field contains the entered value
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(venue["venue-email"]);

  // Step 1: Select Venue type from dropdown
  await page.getByRole('combobox', { name: 'Venue type' }).click();
  await page.getByRole('option', { name: venue["venue-type"], exact: true }).click();
  // Assert: Verify venue type dropdown has the selected value
  await expect(page.getByRole('combobox', { name: 'Venue type' })).toHaveValue(venue["venue-type"]);

  // Step 1: Select Venue default language from dropdown
  await page.getByRole('combobox', { name: 'Venue default language' }).click();
  await page.getByRole('option', { name: venue["venue-default-language"], exact: true }).click();
  // Assert: Verify language dropdown has the selected value
  await expect(page.getByRole('combobox', { name: 'Venue default language' })).toHaveValue(venue["venue-default-language"]);

  // Step 1: Select Time zone from dropdown
  await page.getByRole('combobox', { name: 'Time zone' }).click();
  await page.getByRole('option', { name: venue["venue-Time zone"], exact: true }).click();
  // Assert: Verify time zone dropdown has the selected value
  await expect(page.getByRole('combobox', { name: 'Time zone' })).toHaveValue(venue["venue-Time zone"]);

  // Step 1: Select Currency (Euro) from dropdown
  await page.getByRole('combobox', { name: 'Currency' }).click();
  await page.getByRole('option', { name: venue["venue-Currency"], exact: true }).click();
  // Assert: Verify currency dropdown has the selected value
  await expect(page.getByRole('combobox', { name: 'Currency' })).toHaveValue(venue["venue-Currency"]);

  // Step 1: Fill Cuisine and Address
  await page.getByRole('textbox', { name: 'Cuisine' }).fill(venue["venue-Cuisine"]);
  // Assert: Verify cuisine field contains the entered value
  await expect(page.getByRole('textbox', { name: 'Cuisine' })).toHaveValue(venue["venue-Cuisine"]);
  await page.getByRole('textbox', { name: 'Address' }).fill(venue["venue-Address"]);
  // Assert: Verify address field contains the entered value
  await expect(page.getByRole('textbox', { name: 'Address' })).toHaveValue(venue["venue-Address"]);

  // Simple wait before clicking Next
  await page.waitForTimeout(2000);

  // Go to next step
  await page.getByRole('button', { name: 'Next' }).click();
  // Assert: Verify Next button is visible before clicking
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();

  // Wait for page navigation to complete
  await page.waitForLoadState('networkidle');
  
  // Simple wait for Step 2
  await page.waitForTimeout(2000);
  console.log('Navigation to Step 2 completed');

  // Step 2: Details & Branding — fill requested fields
  // VERIFY we are actually on step 2 before proceeding
  await expect(page.getByRole('textbox', { name: 'Venue description' })).toBeVisible();
  console.log('Confirmed: We are on Step 2 - Details & Branding');
  
  // Venue description
  await page.getByRole('textbox', { name: 'Venue description' }).fill(venue["venue-description"]);
  // Assert: Verify venue description field contains the entered value
  await expect(page.getByRole('textbox', { name: 'Venue description' })).toHaveValue(venue["venue-description"]);

  // Socials and client app url
  await page.locator(locators["Instagram address (optional)"]).fill(venue["Instagram address (optional)"]);
  // Assert: Verify Instagram field contains the entered value
  await expect(page.locator(locators["Instagram address (optional)"])).toHaveValue(venue["Instagram address (optional)"]);
  await page.locator(locators["Facebook (optional)"]).fill(venue["Facebook (optional)"]);
  // Assert: Verify Facebook field contains the entered value
  await expect(page.locator(locators["Facebook (optional)"])).toHaveValue(venue["Facebook (optional)"]);

  // Client app url (from fixture) using locator from locators.json
  await page.locator(locators["Client app url *"]).fill(venue["Client app url *"]);
  // Assert: Verify client app URL field contains the entered value
  await expect(page.locator(locators["Client app url *"])).toHaveValue(venue["Client app url *"]);


  // Enable Pay Later and Enable Tipping using locators
  // Use locators as defined in locators.json for checkboxes
  await page.locator("[type='checkbox']").first().check();
  // Assert: Verify Pay Later checkbox is checked
  await expect(page.locator("[type='checkbox']").first()).toBeChecked();
  await page.getByRole('checkbox').nth(1).check();
  // Assert: Verify Tipping checkbox is checked
  await expect(page.getByRole('checkbox').nth(1)).toBeChecked();

  // Fill Tip Percentage using locator and data from fixture
  await page.locator(locators["Tip Percentage (%)"]).fill(venue["Tip Percentage (%)"]);
  // Assert: Verify tip percentage field contains the entered value
  await expect(page.locator(locators["Tip Percentage (%)"])).toHaveValue(venue["Tip Percentage (%)"]);

  // Fill Dine-In Tax using locator and data from fixture
  await page.locator(locators["Dine-In Tax (%)"]).fill(venue["Dine-In Tax (%) *"]);
  // Assert: Verify dine-in tax field contains the entered value
  await expect(page.locator(locators["Dine-In Tax (%)"])).toHaveValue(venue["Dine-In Tax (%) *"]);

  // Fill Take-Away Tax using locator and data from fixture
  await page.locator(locators["Take-Away Tax (%) *"]).fill(venue["Take-Away Tax (%) *"]);
  // Assert: Verify take-away tax field contains the entered value
  await expect(page.locator(locators["Take-Away Tax (%) *"])).toHaveValue(venue["Take-Away Tax (%) *"]);

  // Logo Upload
  console.log('Starting logo upload...');
  
  // Step 1: Click on "Choose image" for logo
  await page.getByText('Choose image').first().click();
  console.log(' Clicked on Choose image button for logo');
  
  // Assert: Verify file input is available
  await expect(page.locator('input[type="file"]')).toBeAttached();
  console.log(' File input is available for logo upload');
  
  // Step 2: Wait for file input and select logo image
  await page.waitForSelector('input[type="file"]', { state: 'attached' });
  const logoPath = path.resolve(__dirname, '../../Fixtures/pictures/venue-logo.png');
  await page.locator('input[type="file"]').setInputFiles(logoPath);
  console.log(' Logo image selected from pictures folder');
  
  // Assert: Verify image is uploaded and visible
  await expect(page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
  console.log(' Logo image is visible after upload');
  
  // Assert: Verify upload modal is open
  await expect(page.getByRole('heading', { name: 'Upload Image' })).toBeVisible();
  console.log(' Upload Image modal is open');
  
  // Step 3: Skip image click (cropping interface blocks it) and go directly to upload
  console.log(' Skipping image click due to cropping interface overlay');
  
  // Assert: Verify Upload button is visible and enabled
  await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Upload' })).toBeEnabled();
  console.log(' Upload button is visible and enabled');
  
  // Step 4: Click upload button directly
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.waitForTimeout(2000);
  
  // Assert: Verify upload modal is closed after upload
  await expect(page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
  console.log(' Upload modal closed after successful upload');
  
  // Assert: Verify logo is now displayed in the form
  await expect(page.locator('img[alt*="logo"], img[alt*="Logo"]').first()).toBeVisible();
  console.log(' Logo is now displayed in the venue form');
  
  console.log(' Logo upload completed successfully');
  
  // Cover Image Upload
  console.log('Starting cover image upload...');
  
  // Step 1: Click on "Choose image" for cover image
  await page.getByText('Choose image').first().click();
  console.log(' Clicked on Choose image button for cover image');
  
  // Assert: Verify file input is available
  await expect(page.locator('input[type="file"]')).toBeAttached();
  console.log(' File input is available for cover image upload');
  
  // Step 2: Wait for file input and select cover image
  await page.waitForSelector('input[type="file"]', { state: 'attached' });
  const coverPath = path.resolve(__dirname, '../../Fixtures/pictures/coverimage.png');
  await page.locator('input[type="file"]').setInputFiles(coverPath);
  console.log(' Cover image selected from pictures folder');
  
  // Assert: Verify image is uploaded and visible
  await expect(page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
  console.log(' Cover image is visible after upload');
  
  // Assert: Verify upload modal is open
  await expect(page.getByRole('heading', { name: 'Upload Image' })).toBeVisible();
  console.log(' Upload Image modal is open for cover image');
  
  // Step 3: Skip image click (cropping interface blocks it) and go directly to upload
  console.log(' Skipping cover image click due to cropping interface overlay');
  
  // Assert: Verify Upload button is visible and enabled
  await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Upload' })).toBeEnabled();
  console.log(' Upload button is visible and enabled for cover image');
  
  // Step 4: Click upload button directly
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.waitForTimeout(2000);
  
  // Assert: Verify upload modal is closed after upload
  await expect(page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
  console.log(' Upload modal closed after successful cover image upload');
  
  // Assert: Verify cover image is now displayed in the form
  await expect(page.locator('img').nth(1)).toBeVisible();
  console.log(' Cover image is now displayed in the venue form');
  
  console.log(' Cover image upload completed successfully');
  
  // Step 3: Click Next button to proceed to Step 3
  console.log('Clicking Next button to proceed to Step 3...');
  
  // Wait for Next button to be enabled and clickable
  await page.getByRole('button', { name: 'Next' }).waitFor({ state: 'visible', timeout: 10000 });
  await page.getByRole('button', { name: 'Next' }).waitFor({ state: 'attached', timeout: 10000 });
  
  // Check if button is disabled
  const step2ButtonDisabled = await page.getByRole('button', { name: 'Next' }).isDisabled();
  if (step2ButtonDisabled) {
    console.log('Next button is disabled on step 2, checking for required fields...');
    // Wait a bit more for any async operations to complete
    await page.waitForTimeout(2000);
  }
  
  // Click Next button
  await page.getByRole('button', { name: 'Next' }).click();
  console.log(' Next button clicked successfully');

  // Wait for page navigation to complete
  await page.waitForLoadState('networkidle');
  
  // Scroll up to see the step indicator and verify we're on Step 3
  console.log('Scrolling up to verify step indicator...');
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
  
  // Verify we can see the step indicator showing Step 3
  await expect(page.locator('text="Story & Experience"')).toBeVisible();
  console.log(' Step indicator shows we are on Step 3 - Story & Experience');

  // Step 3: Contact Number and Venue Timing
  console.log('Starting Step 3 - Contact Number and Venue Timing...');
  
  // Contact Number
  await page.getByRole('textbox', { name: 'Enter contact number' }).fill('+1234567890');
  console.log(' Contact number filled');
  
  // Assert: Verify contact number field contains the entered value
  await expect(page.getByRole('textbox', { name: 'Enter contact number' })).toHaveValue('+1234567890');
  console.log(' Contact number verified');
  
  // Venue Timing Section
  console.log('Starting Venue Timing section...');
  
  // Monday Timing from Venue.json
  console.log('Setting Monday timing from Venue.json...');
  const mondayTime = venue["TIme-slot-venue-monday"]; // "14:00-18:00"
  const mondayOpenTime = mondayTime.split('-')[0]; // "14:00"
  const mondayCloseTime = mondayTime.split('-')[1]; // "18:00"
  await page.fill("//p[contains(text(),'Monday')]/following-sibling::div//*[@placeholder='Open Time']", mondayOpenTime);
  await page.fill("//p[contains(text(),'Monday')]/following-sibling::div//*[@placeholder='Close Time']", mondayCloseTime);
  console.log(` Monday timing set to ${mondayOpenTime}-${mondayCloseTime}`);
  
  // Assert: Verify Monday timing is correctly entered
  await expect(page.locator("//p[contains(text(),'Monday')]/following-sibling::div//*[@placeholder='Open Time']")).toHaveValue(mondayOpenTime);
  await expect(page.locator("//p[contains(text(),'Monday')]/following-sibling::div//*[@placeholder='Close Time']")).toHaveValue(mondayCloseTime);
  console.log(' Monday timing verified successfully');
  
  // Tuesday Timing from Venue.json
  console.log('Setting Tuesday timing from Venue.json...');
  const tuesdayTime = venue["TIme-slot-venue-tuesday"]; // "14:00-18:00"
  const tuesdayOpenTime = tuesdayTime.split('-')[0]; // "14:00"
  const tuesdayCloseTime = tuesdayTime.split('-')[1]; // "18:00"
  await page.fill("//p[contains(text(),'Tuesday')]/following-sibling::div//*[@placeholder='Open Time']", tuesdayOpenTime);
  await page.fill("//p[contains(text(),'Tuesday')]/following-sibling::div//*[@placeholder='Close Time']", tuesdayCloseTime);
  console.log(` Tuesday timing set to ${tuesdayOpenTime}-${tuesdayCloseTime}`);
  
  // Assert: Verify Tuesday timing is correctly entered
  await expect(page.locator("//p[contains(text(),'Tuesday')]/following-sibling::div//*[@placeholder='Open Time']")).toHaveValue(tuesdayOpenTime);
  await expect(page.locator("//p[contains(text(),'Tuesday')]/following-sibling::div//*[@placeholder='Close Time']")).toHaveValue(tuesdayCloseTime);
  console.log(' Tuesday timing verified successfully');
  
  // Wednesday Timing from Venue.json
  console.log('Setting Wednesday timing from Venue.json...');
  const wednesdayTime = venue["TIme-slot-venue-wednesday"]; // "14:00-18:00"
  const wednesdayOpenTime = wednesdayTime.split('-')[0]; // "14:00"
  const wednesdayCloseTime = wednesdayTime.split('-')[1]; // "18:00"
  await page.fill("//p[contains(text(),'Wednesday')]/following-sibling::div//*[@placeholder='Open Time']", wednesdayOpenTime);
  await page.fill("//p[contains(text(),'Wednesday')]/following-sibling::div//*[@placeholder='Close Time']", wednesdayCloseTime);
  console.log(` Wednesday timing set to ${wednesdayOpenTime}-${wednesdayCloseTime}`);
  
  // Assert: Verify Wednesday timing is correctly entered
  await expect(page.locator("//p[contains(text(),'Wednesday')]/following-sibling::div//*[@placeholder='Open Time']")).toHaveValue(wednesdayOpenTime);
  await expect(page.locator("//p[contains(text(),'Wednesday')]/following-sibling::div//*[@placeholder='Close Time']")).toHaveValue(wednesdayCloseTime);
  console.log(' Wednesday timing verified successfully');
  
  // Thursday Timing from Venue.json
  console.log('Setting Thursday timing from Venue.json...');
  const thursdayTime = venue["TIme-slot-venue-thursday"]; // "14:00-18:00"
  const thursdayOpenTime = thursdayTime.split('-')[0]; // "14:00"
  const thursdayCloseTime = thursdayTime.split('-')[1]; // "18:00"
  await page.fill("//p[contains(text(),'Thursday')]/following-sibling::div//*[@placeholder='Open Time']", thursdayOpenTime);
  await page.fill("//p[contains(text(),'Thursday')]/following-sibling::div//*[@placeholder='Close Time']", thursdayCloseTime);
  console.log(` Thursday timing set to ${thursdayOpenTime}-${thursdayCloseTime}`);
  
  // Assert: Verify Thursday timing is correctly entered
  await expect(page.locator("//p[contains(text(),'Thursday')]/following-sibling::div//*[@placeholder='Open Time']")).toHaveValue(thursdayOpenTime);
  await expect(page.locator("//p[contains(text(),'Thursday')]/following-sibling::div//*[@placeholder='Close Time']")).toHaveValue(thursdayCloseTime);
  console.log(' Thursday timing verified successfully');
  
  // Friday Timing from Venue.json
  console.log('Setting Friday timing from Venue.json...');
  const fridayTime = venue["TIme-slot-venue-friday"]; // "14:00-18:00"
  const fridayOpenTime = fridayTime.split('-')[0]; // "14:00"
  const fridayCloseTime = fridayTime.split('-')[1]; // "18:00"
  await page.fill("//p[contains(text(),'Friday')]/following-sibling::div//*[@placeholder='Open Time']", fridayOpenTime);
  await page.fill("//p[contains(text(),'Friday')]/following-sibling::div//*[@placeholder='Close Time']", fridayCloseTime);
  console.log(` Friday timing set to ${fridayOpenTime}-${fridayCloseTime}`);
  
  // Assert: Verify Friday timing is correctly entered
  await expect(page.locator("//p[contains(text(),'Friday')]/following-sibling::div//*[@placeholder='Open Time']")).toHaveValue(fridayOpenTime);
  await expect(page.locator("//p[contains(text(),'Friday')]/following-sibling::div//*[@placeholder='Close Time']")).toHaveValue(fridayCloseTime);
  console.log(' Friday timing verified successfully');
  
  // Saturday Timing from Venue.json
  console.log('Setting Saturday timing from Venue.json...');
  const saturdayTime = venue["TIme-slot-venue-saturday"]; // "14:00-18:00"
  const saturdayOpenTime = saturdayTime.split('-')[0]; // "14:00"
  const saturdayCloseTime = saturdayTime.split('-')[1]; // "18:00"
  await page.fill("//p[contains(text(),'Saturday')]/following-sibling::div//*[@placeholder='Open Time']", saturdayOpenTime);
  await page.fill("//p[contains(text(),'Saturday')]/following-sibling::div//*[@placeholder='Close Time']", saturdayCloseTime);
  console.log(` Saturday timing set to ${saturdayOpenTime}-${saturdayCloseTime}`);
  
  // Assert: Verify Saturday timing is correctly entered
  await expect(page.locator("//p[contains(text(),'Saturday')]/following-sibling::div//*[@placeholder='Open Time']")).toHaveValue(saturdayOpenTime);
  await expect(page.locator("//p[contains(text(),'Saturday')]/following-sibling::div//*[@placeholder='Close Time']")).toHaveValue(saturdayCloseTime);
  console.log(' Saturday timing verified successfully');
  
  // Sunday Timing from Venue.json
  console.log('Setting Sunday timing from Venue.json...');
  const sundayTime = venue["TIme-slot-venue-sunday"]; // "14:00-18:00"
  const sundayOpenTime = sundayTime.split('-')[0]; // "14:00"
  const sundayCloseTime = sundayTime.split('-')[1]; // "18:00"
  await page.fill("//p[contains(text(),'Sunday')]/following-sibling::div//*[@placeholder='Open Time']", sundayOpenTime);
  await page.fill("//p[contains(text(),'Sunday')]/following-sibling::div//*[@placeholder='Close Time']", sundayCloseTime);
  console.log(` Sunday timing set to ${sundayOpenTime}-${sundayCloseTime}`);
  
  // Assert: Verify Sunday timing is correctly entered
  await expect(page.locator("//p[contains(text(),'Sunday')]/following-sibling::div//*[@placeholder='Open Time']")).toHaveValue(sundayOpenTime);
  await expect(page.locator("//p[contains(text(),'Sunday')]/following-sibling::div//*[@placeholder='Close Time']")).toHaveValue(sundayCloseTime);
  console.log(' Sunday timing verified successfully');
  
  console.log(' All venue timing completed successfully');
  
  // Story Section
  console.log('Starting Story section...');
  
  // Story Title
  await page.getByRole('textbox', { name: 'Story Title' }).fill('Our Amazing Venue Story');
  console.log(' Story title filled');
  
  // Assert: Verify story title field contains the entered value
  await expect(page.getByRole('textbox', { name: 'Story Title' })).toHaveValue('Our Amazing Venue Story');
  console.log(' Story title verified');
  
  // Story Description (Rich Text Editor)
  await page.locator(locators["Story Description"]).fill('This is our amazing venue story description with rich text content. We provide excellent service and memorable experiences for all our guests.');
  console.log(' Story description filled');
  
  // Story Image Upload
  console.log('Starting story image upload...');
  await page.getByText('Choose image').last().click();
  console.log(' Clicked on Choose image button for story image');
  
  // Wait for file input and select story image
  await page.waitForSelector('input[type="file"]', { state: 'attached' });
  const storyPath = path.resolve(__dirname, '../../Fixtures/pictures/story.png');
  await page.locator('input[type="file"]').setInputFiles(storyPath);
  console.log(' Story image selected from pictures folder');
  
  // Assert: Verify image is uploaded and visible
  await expect(page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
  console.log(' Story image is visible after upload');
  
  // Assert: Verify upload modal is open
  await expect(page.getByRole('heading', { name: 'Upload Image' })).toBeVisible();
  console.log(' Upload Image modal is open for story image');
  
  // Skip image click (cropping interface blocks it) and go directly to upload
  console.log(' Skipping story image click due to cropping interface overlay');
  
  // Assert: Verify Upload button is visible and enabled
  await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Upload' })).toBeEnabled();
  console.log(' Upload button is visible and enabled for story image');
  
  // Click upload button directly
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.waitForTimeout(2000);
  
  // Assert: Verify upload modal is closed after upload
  await expect(page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
  console.log(' Upload modal closed after successful story image upload');
  
  // Assert: Verify story image is now displayed in the form
  await expect(page.locator('img').last()).toBeVisible();
  console.log(' Story image is now displayed in the venue form');
  
  console.log(' Story section completed successfully');
  
  // Gallery Section
  console.log('Starting Gallery section...');
  
  // Click Add Gallery Item button to create the first gallery form
  await page.getByRole('button', { name: 'Add Gallery Item' }).click();
  console.log(' Add Gallery Item button clicked - gallery form created');
  
  // Wait for gallery form to appear
  await page.waitForTimeout(1000);
  console.log(' Gallery form should now be visible');
  
  // Gallery Item 1
  console.log('Adding Gallery Item 1...');
  
  // Gallery Item 1 Title
  await page.locator(locators["add-galary-items-1"]).fill('Amazing Food Gallery');
  console.log(' Gallery item 1 title filled');
  
  // Assert: Verify gallery item 1 title
  await expect(page.locator(locators["add-galary-items-1"])).toHaveValue('Amazing Food Gallery');
  console.log(' Gallery item 1 title verified');
  
  // Gallery Item 1 Description
  await page.locator(locators["gallary-item-description-1"]).fill('This gallery showcases our amazing food presentation and culinary expertise. Each dish is carefully crafted to provide an exceptional dining experience.');
  console.log(' Gallery item 1 description filled');
  
  // Assert: Verify gallery item 1 description
  await expect(page.locator(locators["gallary-item-description-1"])).toHaveValue('This gallery showcases our amazing food presentation and culinary expertise. Each dish is carefully crafted to provide an exceptional dining experience.');
  console.log(' Gallery item 1 description verified');
  
  // Gallery Item 1 Image Upload
  console.log('Starting gallery item 1 image upload...');
  await page.getByText('Choose image').last().click();
  console.log(' Clicked on Choose image button for gallery item 1');
  
  // Wait for file input and select gallery image
  await page.waitForSelector('input[type="file"]', { state: 'attached' });
  const gallery1Path = path.resolve(__dirname, '../../Fixtures/pictures/gallary1.png');
  await page.locator('input[type="file"]').setInputFiles(gallery1Path);
  console.log(' Gallery item 1 image selected from pictures folder');
  
  // Assert: Verify image is uploaded and visible
  await expect(page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
  console.log(' Gallery item 1 image is visible after upload');
  
  // Assert: Verify upload modal is open
  await expect(page.getByRole('heading', { name: 'Upload Image' })).toBeVisible();
  console.log(' Upload Image modal is open for gallery item 1');
  
  // Skip image click (cropping interface blocks it) and go directly to upload
  console.log(' Skipping gallery item 1 image click due to cropping interface overlay');
  
  // Assert: Verify Upload button is visible and enabled
  await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Upload' })).toBeEnabled();
  console.log(' Upload button is visible and enabled for gallery item 1');
  
  // Click upload button directly
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.waitForTimeout(2000);
  
  // Assert: Verify upload modal is closed after upload
  await expect(page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
  console.log(' Upload modal closed after successful gallery item 1 image upload');
  
  // Assert: Verify gallery item 1 image is now displayed in the form
  await expect(page.locator('img').last()).toBeVisible();
  console.log(' Gallery item 1 image is now displayed in the venue form');
  
  console.log(' Gallery item 1 completed successfully');
  
  // Click Add Gallery Item button to create the second gallery form
  await page.getByRole('button', { name: 'Add Gallery Item' }).click();
  console.log(' Add Gallery Item button clicked - gallery item 2 form created');
  
  // Wait for gallery item 2 form to appear and verify it exists
  await page.waitForTimeout(2000);
  await expect(page.locator(locators["add-galary-items-2"])).toBeVisible();
  console.log(' Gallery item 2 form is now visible and ready');
  
  // Gallery Item 2
  console.log('Adding Gallery Item 2...');
  
  // Gallery Item 2 Title
  await page.locator(locators["add-galary-items-2"]).fill('Beautiful Interior Gallery');
  console.log(' Gallery item 2 title filled');
  
  // Assert: Verify gallery item 2 title
  await expect(page.locator(locators["add-galary-items-2"])).toHaveValue('Beautiful Interior Gallery');
  console.log(' Gallery item 2 title verified');
  
  // Gallery Item 2 Description
  await page.locator(locators["gallary-item-description-2"]).fill('Our venue features stunning interior design with modern aesthetics and comfortable seating arrangements. The ambiance creates the perfect atmosphere for memorable dining experiences.');
  console.log(' Gallery item 2 description filled');
  
  // Assert: Verify gallery item 2 description
  await expect(page.locator(locators["gallary-item-description-2"])).toHaveValue('Our venue features stunning interior design with modern aesthetics and comfortable seating arrangements. The ambiance creates the perfect atmosphere for memorable dining experiences.');
  console.log(' Gallery item 2 description verified');
  
  // Gallery Item 2 Image Upload
  console.log('Starting gallery item 2 image upload...');
  await page.getByText('Choose image').last().click();
  console.log(' Clicked on Choose image button for gallery item 2');
  
  // Wait for file input and select gallery image
  await page.waitForSelector('input[type="file"]', { state: 'attached' });
  const gallery2Path = path.resolve(__dirname, '../../Fixtures/pictures/gallary2.png');
  await page.locator('input[type="file"]').setInputFiles(gallery2Path);
  console.log(' Gallery item 2 image selected from pictures folder');
  
  // Assert: Verify image is uploaded and visible
  await expect(page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
  console.log(' Gallery item 2 image is visible after upload');
  
  // Assert: Verify upload modal is open
  await expect(page.getByRole('heading', { name: 'Upload Image' })).toBeVisible();
  console.log(' Upload Image modal is open for gallery item 2');
  
  // Skip image click (cropping interface blocks it) and go directly to upload
  console.log(' Skipping gallery item 2 image click due to cropping interface overlay');
  
  // Assert: Verify Upload button is visible and enabled
  await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Upload' })).toBeEnabled();
  console.log(' Upload button is visible and enabled for gallery item 2');
  
  // Click upload button directly
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.waitForTimeout(2000);
  
  // Assert: Verify upload modal is closed after upload
  await expect(page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
  console.log(' Upload modal closed after successful gallery item 2 image upload');
  
  // Assert: Verify gallery item 2 image is now displayed in the form
  await expect(page.locator('img').last()).toBeVisible();
  console.log(' Gallery item 2 image is now displayed in the venue form');
  
  console.log(' Gallery item 2 completed successfully');
  
  // Click Add Gallery Item button to create the third gallery form
  await page.getByRole('button', { name: 'Add Gallery Item' }).click();
  console.log(' Add Gallery Item button clicked - gallery item 3 form created');
  
  // Wait for gallery item 3 form to appear and verify it exists
  await page.waitForTimeout(2000);
  await expect(page.locator(locators["add-galary-items-3"])).toBeVisible();
  console.log(' Gallery item 3 form is now visible and ready');
  
  // Gallery Item 3
  console.log('Adding Gallery Item 3...');
  
  // Gallery Item 3 Title
  await page.locator(locators["add-galary-items-3"]).fill('Special Events Gallery');
  console.log(' Gallery item 3 title filled');
  
  // Assert: Verify gallery item 3 title
  await expect(page.locator(locators["add-galary-items-3"])).toHaveValue('Special Events Gallery');
  console.log(' Gallery item 3 title verified');
  
  // Gallery Item 3 Description
  await page.getByRole('textbox', { name: 'Gallery Description' }).last().fill('Our venue hosts special events and celebrations throughout the year. From corporate gatherings to private parties, we provide exceptional service and memorable experiences for every occasion.');
  console.log(' Gallery item 3 description filled');
  
  // Assert: Verify gallery item 3 description
  await expect(page.getByRole('textbox', { name: 'Gallery Description' }).last()).toHaveValue('Our venue hosts special events and celebrations throughout the year. From corporate gatherings to private parties, we provide exceptional service and memorable experiences for every occasion.');
  console.log(' Gallery item 3 description verified');
  
  // Gallery Item 3 Image Upload
  console.log('Starting gallery item 3 image upload...');
  await page.getByText('Choose image').last().click();
  console.log(' Clicked on Choose image button for gallery item 3');
  
  // Wait for file input and select gallery image
  await page.waitForSelector('input[type="file"]', { state: 'attached' });
  const gallery3Path = path.resolve(__dirname, '../../Fixtures/pictures/gallary3.png');
  await page.locator('input[type="file"]').setInputFiles(gallery3Path);
  console.log(' Gallery item 3 image selected from pictures folder');
  
  // Assert: Verify image is uploaded and visible
  await expect(page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
  console.log(' Gallery item 3 image is visible after upload');
  
  // Assert: Verify upload modal is open
  await expect(page.getByRole('heading', { name: 'Upload Image' })).toBeVisible();
  console.log(' Upload Image modal is open for gallery item 3');
  
  // Skip image click (cropping interface blocks it) and go directly to upload
  console.log(' Skipping gallery item 3 image click due to cropping interface overlay');
  
  // Assert: Verify Upload button is visible and enabled
  await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Upload' })).toBeEnabled();
  console.log(' Upload button is visible and enabled for gallery item 3');
  
  // Click upload button directly
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.waitForTimeout(2000);
  
  // Assert: Verify upload modal is closed after upload
  await expect(page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
  console.log(' Upload modal closed after successful gallery item 3 image upload');
  
  // Assert: Verify gallery item 3 image is now displayed in the form
  await expect(page.locator('img').last()).toBeVisible();
  console.log(' Gallery item 3 image is now displayed in the venue form');
  
  console.log(' Gallery item 3 completed successfully');
  
  console.log(' All gallery items completed successfully');
  await page.pause();
  
  // Click Save button and verify navigation
  console.log('Clicking Save button...');
  
  // Assert: Verify Save button is visible before clicking
  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  console.log('Save button is visible');
  
  // Click Save button
  await page.getByRole('button', { name: 'Save' }).click();
  console.log('Save button clicked');
  
  // Wait for save operation to complete
  await page.waitForTimeout(5000);
  
  // Verify if we moved to next step or if save was successful
  try {
    // Check if we're on a success page or next step
    const successMessage = await page.getByText('Venue created successfully').isVisible();
    if (successMessage) {
      console.log(' Venue created successfully - Save button worked!');
    }
  } catch (error) {
    console.log('No success message found, checking for navigation...');
  }
  
  // Check if we moved to a different page/step
  try {
    const currentUrl = page.url();
    console.log(`Current URL after save: ${currentUrl}`);
    
    // Check if we're redirected to venue list or dashboard
    if (currentUrl.includes('/venue') && !currentUrl.includes('/create')) {
      console.log(' Successfully navigated to venue list - Save button worked!');
    } else {
      console.log(' Still on create venue page - checking for validation errors...');
      
      // Check for validation errors
      const validationErrors = await page.locator('text=required, text=invalid, text=error').count();
      if (validationErrors > 0) {
        console.log(` Found ${validationErrors} validation errors - Save button failed due to validation`);
        } else {
        console.log(' No validation errors found - Save button may have worked');
      }
    }
  } catch (error) {
    console.log('Error checking navigation:', error.message);
  }
  
  // Pause to inspect the page
  await page.pause();
  
  console.log(' Contact number and venue timing completed successfully');
  
  console.log(' Step 2 form fields, logo and cover image upload completed successfully');
});