import { test, expect } from "@playwright/test";
import { config } from "../../config/environments.js";
import AddVenuePage from "../../object-Page/venue/addvenue-pom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import venue from "../../Fixtures/Venue.json" assert { type: "json" };


test("Create venue", async ({ page }) => {
  // Go to login page
  await page.goto(config.urls.login);

  // Fill the email and password fields in login form then submit
  // fill up the email in the field
  await page.locator(locators["signin-email"]).fill(login.TC1001.Email);
  //assertion for the email field to be visible
  await expect(page.locator(locators["signin-email"])).toHaveValue(login.TC1001.Email);


  // fill up the password in the field
  await page.locator(locators["signin-password"]).fill(login.TC1001.Password);
  //assertion for the password field to be visible
  await expect(page.locator(locators["signin-password"])).toHaveValue(login.TC1001.Password);


  //assertion for the sign in button to be visible
  await expect(page.locator(locators["signin-button"])).toBeVisible();
  // click on the sign in button
  await page.locator(locators["signin-button"]).click();


  // Wait for successful login, then click on Add Venue
  await page.waitForLoadState('networkidle');
  //assertion for the add venue button to be visible
  await expect(page.locator(locators["click-add-venue-button"])).toBeVisible();
  //wait for the add venue button to be visible 
  await page.locator(locators["click-add-venue-button"]).waitFor({ state: 'visible' });


  //assertion for the add venue button to be visible
  await expect(page.locator(locators["click-add-venue-button"])).toBeVisible();
  // click on the add venue button
  await page.locator(locators["click-add-venue-button"]).click();
  // fill up the venue name in the field
  await page.locator(locators["venue-name"]).fill(venue["venue-name"]);
  //assertion for the venue name field to have the value
  await expect(page.locator(locators["venue-name"])).toHaveValue(venue["venue-name"]);

  

  // Wait for the venue name field to be visible
  await page.locator(locators["venuename"]).waitFor({ timeout: 60000 });
  //assertion for the venue name field to be visible
  await expect(page.locator(locators["venuename"])).toBeVisible();

 


  //click on the venue type dropdown
  await page.locator(locators["venue-type"]).click();
  //select the venue type
  await page.locator(`text=${venue["venuetype"]}`).click();
  // assertion to verify the selected value have visible
  await expect(page.locator(locators["venue-type"])).toHaveValue(venue["venuetype"]);

  //click on the email text box
  await page.locator(locators["venue-email"]).click();
  //fill the email
  await page.locator(locators["venue-email"]).fill(venue["venue-email"]);
  //assertion to verify the email feil have the given value
  await expect(page.locator(locators["venue-email"])).toHaveValue(venue["venue-email"]);
  

  //click on the language dropdown
  await page.locator(locators["venue-default-language"]).click();
  //select the language
  await page.locator(`text=${venue["venue-default-language"]}`).click();
  // assertion to verify the selected value have visible
  await expect(page.locator(locators["venue-default-language"])).toHaveValue(venue["venue-default-language"]);


  //click on the timezone dropdown
  await page.locator(locators["venue-Time zone"]).click();
  //select the time
  await page.locator(`text=${venue["venue-Time zone"]}`).click();
  // assertion to verify the selected value have visible
  await expect(page.locator(locators["venue-Time zone"])).toHaveValue(venue["venue-Time zone"]);

  //select the currency
  await page.locator(locators["venue-Currency"]).click();
  //select the currency
  await page.locator(`text=${venue["venue-Currency"]}`).click();
  // assertion to verify the selected value have visible
  await expect(page.locator(locators["venue-Currency"])).toHaveValue(venue["venue-Currency"]);

  // fillup the the Cuisine 
  await page.locator(locators["venue-Cuisine"]).click();
  //fill the Cuisine 
  await page.locator(locators["venue-Cuisine"]).fill(venue["venue-Cuisine"]);
  //assertion to verify the Cuisine  field have the given value
  await expect(page.locator(locators["venue-Cuisine"])).toHaveValue(venue["venue-Cuisine"]);

  // add the address
  await page.locator(locators["venue-Address"]).click();
  //fill the address 
  await page.locator(locators["venue-Address"]).fill(venue["venue-Address"]);
  //assertion to verify the address  field have the given value
  await expect(page.locator(locators["venue-Address"])).toHaveValue(venue["venue-Address"]);


  //assertion next button is visible 
  await expect(page.locator(locators["venue-next-button"])).toBeVisible();
  //click on the next button
  await page.locator(locators["venue-next-button"]).click();

  //2nd page
  //click on the venue discription
  await page.locator(locators["venue-description"]).click();
  //fill up the venue discription
  await page.locator(locators["venue-description"]).fill(venue["venue-description"]);

  //assertion to verify venue discription have text
  await expect(page.locator(locators["venue-description"])).toHaveText(venue["venue-description"])

  //facebook url
  await page.locator(locators["Facebookurl"]).click();
  //fill up the link tab
  await page.locator(locators["Facebookurl"]).fill(venue["facebookurl"]);
  //assertion to verify the tes facebook url have correct url
  await expect(page.locator(locators["Facebookurl"])).toHaveValue(venue["facebookurl"])

  //instagram url
  await page.locator(locators["Instagramurl"]).click();
  //fill up the link tab
  await page.locator(locators["Instagramurl"]).fill(venue["instagramurl"]);
  //assertion to verify the tes instagram url have correct url
  await expect(page.locator(locators["Instagramurl"])).toHaveValue(venue["instagramurl"]);

  //enter company slug url
  // click on the slug
  await page.locator(locators["Client app url"]).click();
  //fill up the link tab
  await page.locator(locators["Client app url"]).fill(venue["Client app url"]);
  //assertion to verify the tes instagram url have correct url
  await expect(page.locator(locators["Client app url"])).toHaveValue(venue["Client app url"]);
  
  //enable pay by later
  await page.locator(locators["EnablePayLater"]).nth(0).click();
  // // fill up the link tab
  // await page.locator(locators["Enable Pay Later"]).fill(venue["Enable Pay Later"]);
  // //assertion to verify the tes instagram url have correct url
  // await expect(page.locator(locators["Enable Pay Later)"])).toHaveText(venue["Enable Pay Later"]);

  //enable tip
  await page.locator(locators["enableTipping"]).nth(1).click();
  // //fill up the link tab
  // await page.locator(locators["Enable Tipping"]).fill(venue["Enable Tipping"]);
  // //assertion to verify the tes instagram url have correct url
  // await expect(page.locator(locators["Enable Tipping"])).toHaveText(venue["Enable Tipping"]);

  // tip percentage
  await page.locator(locators["Tip Percentage (%)"]).click();
  //fill up the link tab
  await page.locator(locators["Tip Percentage (%)"]).fill(venue["Tip Percentage (%)"]);
  //assertion to verify the tes instagram url have correct url
  await expect(page.locator(locators["Tip Percentage (%)"])).toHaveValue(venue["Tip Percentage (%)"]);

  //dine in tax 
  await page.locator(locators["Dine-In Tax (%)"]).click();
  //fill up the link tab
  await page.locator(locators["Dine-In Tax (%)"]).fill(venue["Dine-In Tax (%)"]);
  //assertion to verify the tes instagram url have correct url
  await expect(page.locator(locators["Dine-In Tax (%)"])).toHaveValue(venue["Dine-In Tax (%)"]);


  //take away tax
  await page.locator(locators["Take-Away Tax (%)"]).click();
  //fill up the link tab
  await page.locator(locators["Take-Away Tax (%)"]).fill(venue["Take-Away Tax (%)"]);
  //assertion to verify the tes instagram url have correct url
  await expect(page.locator(locators["Take-Away Tax (%)"])).toHaveValue(venue["Take-Away Tax (%)"]);



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
  const logoPath = `${process.cwd()}/tests/Fixtures/pictures/venue-logo.png`;

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

  

  // await page.pause();

  
});