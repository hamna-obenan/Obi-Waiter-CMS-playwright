import locators from "../../Fixtures/locators.json" assert { type: "json" };
import venue from "../../Fixtures/Venue.json" assert { type: "json" };
import { expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Page Object Model for Mandatory Data Entry Validation
 * Handles mandatory field validation for venue creation
 */
export default class MandatoryDataVenuePOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Add Venue page
   */
  async navigateToAddVenue() {
    await this.page.locator("//*[@data-testid='AddSharpIcon']/following-sibling::p[normalize-space()='Add']").click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to Add Venue page');
  }

  //fill up the venue name in the field
  async fillupvenueName() {
    await this.page.locator(locators["venue-name"]).click();
    await this.page.locator(locators["venue-name"]).fill(venue["mandatory-venue-name"]);
    await expect(this.page.locator(locators["venue-name"])).toHaveValue(venue["mandatory-venue-name"]);
    await this.page.waitForLoadState('networkidle');
    console.log('click on the venue name and add name')
  }

  //select the venue type
  async selectVenueType() {
    await this.page.locator(locators["venue-type"]).click();              // open dropdown
    await this.page.locator(`text=${venue["mandatory-venue-type"]}`).click();
    await expect(this.page.locator(locators["venue-type"])).toHaveValue(venue["mandatory-venue-type"]);
    console.log("Venue type selected successfully");
  }
  
  //Enter the fill up the email
  async fillupemail(){
    await this.page.locator(locators["venue-email"]).click();
    await this.page.locator(locators["venue-email"]).fill(venue["mandatory-venue-email"]);
    await expect(this.page.locator(locators["venue-email"])).toHaveValue(venue["mandatory-venue-email"]);
    console.log("Email filled")
  }
  
  //select language
  async selectlanguage() {
    await this.page.locator(locators["venue-default-language"]).click();              // open dropdown
    await this.page.locator(`text=${venue["mandatory-venue-default-language"]}`).click();
    await expect(this.page.locator(locators["venue-default-language"])).toHaveValue(venue["mandatory-venue-default-language"]);
    console.log("Language selected successfully");
  }

  //select the time zone 
  async timezoneselect(){
    await this.page.locator(locators["venue-Time zone"]).click();              // open dropdown
    await this.page.locator(`text=${venue["mandatory-venue-Time zone"]}`).click();
    await expect(this.page.locator(locators["venue-Time zone"])).toHaveValue(venue["mandatory-venue-Time zone"]);
    console.log("Timezone selected successfully");
  }

  //select the currency 
  async currencyselect(){
    await this.page.locator(locators["venue-Currency"]).click();              // open dropdown
    await this.page.locator(`text=${venue["mandatory-venue-Currency"]}`).click();
    await expect(this.page.locator(locators["venue-Currency"])).toHaveValue(venue["mandatory-venue-Currency"]);
    console.log("currency selected successfully");
  }

  // fill up the Cuisine 
  async fillupCuisine(){
    await this.page.locator(locators["venue-Cuisine"]).click();             
    await this.page.locator(locators["venue-Cuisine"]).fill(venue["mandatory-venue-Cuisine"]);
    await expect(this.page.locator(locators["venue-Cuisine"])).toHaveValue(venue["mandatory-venue-Cuisine"]);
    console.log("Cuisine fill successfully");
  }

  //fillup the address
  async fillupaddress(){
    await this.page.locator(locators["venue-Address"]).click();              
    await this.page.locator(locators["venue-Address"]).fill(venue["mandatory-venue-Address"]);
    await expect(this.page.locator(locators["venue-Address"])).toHaveValue(venue["mandatory-venue-Address"]);
    console.log("Address fill successfully");
  }

  //click on the next button
  async clicknextbutton(){
    await this.page.locator(locators["venue-next-button"]).click();              
    console.log("Next button clicked successfully");
  }

  //2nd page
  //fill up the venue discription
  async addvenuediscription(){
    await this.page.locator(locators["venue-description"]).click();
    await this.page.locator(locators["venue-description"]).fill(venue["mandatory-venue-description"]);
    await expect(this.page.locator(locators["venue-description"])).toHaveValue(venue["mandatory-venue-description"]);
    console.log("Venue description filled successfully");
  }
  
  //slug company url
  async addslugurl(){
    await this.page.locator(locators["Client app url"]).click();
    await this.page.locator(locators["Client app url"]).fill(venue["mandatory-client-app-url"]);
    await expect(this.page.locator(locators["Client app url"])).toHaveValue(venue["mandatory-client-app-url"]);
    console.log("Client app url filled successfully");
  }
  
  //dine in tax
  async adddineintax(){
    await this.page.locator(locators["Dine-In Tax (%)"]).click();
    await this.page.locator(locators["Dine-In Tax (%)"]).fill(venue["mandatory-dine-in-tax"]);
    await expect(this.page.locator(locators["Dine-In Tax (%)"])).toHaveValue(venue["mandatory-dine-in-tax"]);
    console.log("Dine-In Tax filled successfully");
  }
  
  //take away tax
  async addtakeawaytax(){
    await this.page.locator(locators["Take-Away Tax (%)"]).click();
    await this.page.locator(locators["Take-Away Tax (%)"]).fill(venue["mandatory-takeaway-tax"]);
    await expect(this.page.locator(locators["Take-Away Tax (%)"])).toHaveValue(venue["mandatory-takeaway-tax"]);
    console.log("Take-Away Tax filled successfully");
  }

  //logo upload - complete process
  async uploadVenueLogo(){
    console.log('Starting logo upload...');
      
    // Step 1: Click on "Choose image" for logo
    await this.page.getByText('Choose image').first().click();
    console.log('Clicked on Choose image button for logo');
      
    await this.page.locator('input[type="file"]').setInputFiles(`Fixtures/pictures/${venue["mandatory-venue-logo"]}`);
    await expect(this.page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Upload' }).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
    // // Assert: Verify logo image preview is shown after upload
    // await expect(this.page.locator('label[for="button-file"] img').first()).toBeVisible();
    // console.log('Logo image preview is displayed in the venue form');
    // console.log('Logo image upload completed successfully');
  }

  //upload cover image complete process
  async uploadcoverimage(){
    // Click on the cover image 'Choose image' button (using proper locator for cover image)
    await this.page.getByText('Choose image').first().click();
    // Click again to enter the file input for cover image
    await this.page.locator('input[type="file"]').setInputFiles(`Fixtures/pictures/${venue["mandatory-venue-cover-image"]}`);
    console.log('Cover image selected from pictures folder');
    // Click on the Upload button to complete upload
    await expect(this.page.getByRole('button', { name: 'Upload' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Upload' }).click();
    await this.page.waitForTimeout(2000);
    console.log('Cover image upload completed');
    // Assert: Verify cover image is now displayed in the form, just like logo
    await expect(this.page.locator('label[for="button-file"] img')).toBeVisible();
    console.log('Cover image is now displayed in the venue form');
    console.log('Cover image upload completed successfully');
  }

  //3rd page
  //contact number
  async fillupcontactnumber(){
    await this.page.locator(locators["venue-contact-number"]).click();
    await expect(this.page.locator(locators["venue-contact-number"])).toBeVisible();
    await this.page.locator(locators["venue-contact-number"]).fill(venue["mandatory-contact-number"]);
    // Sometimes input fields update their value asynchronously or due to controlled React state,
    // so the assertion may run before the value appears. To handle this, waitForFunction or retry logic can help.
    // Alternatively, you can retrieve the value directly and assert with expect.
    // Example direct attribute assertion:
    const inputValue = await this.page.locator(locators["venue-contact-number"]).inputValue();
    expect(inputValue).toBe(venue["mandatory-contact-number"]);
    await expect(this.page.locator(locators["venue-contact-number"])).toHaveValue(venue["mandatory-contact-number"]);
    console.log('Contact number filled successfully');
  }

//   //mandatory time slot
//   async fillupmandatorytimeslot(){
//     await this.page.locator(locators["select-venue-start-time-monday"]).click();
//     await this.page.locator(locators["venue-time-slot-monday"]).fill(venue["mandatory-venue-TIme-slot-venue-monday"]);
//     await expect(this.page.locator(locators["venue-time-slot-monday"])).toHaveValue(venue["mandatory-venue-TIme-slot-venue-monday"]);
//     await this.page.locator(locators["venue-time-slot-tuesday"]).click();
//     await this.page.locator(locators["venue-time-slot-tuesday"]).fill(venue["mandatory-venue-TIme-slot-venue-tuesday"]);
//     await expect(this.page.locator(locators["venue-time-slot-tuesday"])).toHaveValue(venue["mandatory-venue-TIme-slot-venue-tuesday"]);
//     await this.page.locator(locators["venue-time-slot-wednesday"]).click();
//     await this.page.locator(locators["venue-time-slot-wednesday"]).fill(venue["mandatory-venue-TIme-slot-venue-wednesday"]);
//     await expect(this.page.locator(locators["venue-time-slot-wednesday"])).toHaveValue(venue["mandatory-venue-TIme-slot-venue-wednesday"]);
//     await this.page.locator(locators["venue-time-slot-thursday"]).click();
//     await this.page.locator(locators["venue-time-slot-thursday"]).fill(venue["mandatory-venue-TIme-slot-venue-thursday"]);
//     await expect(this.page.locator(locators["venue-time-slot-thursday"])).toHaveValue(venue["mandatory-venue-TIme-slot-venue-thursday"]);
//     await this.page.locator(locators["venue-time-slot-friday"]).click();
//     await this.page.locator(locators["venue-time-slot-friday"]).fill(venue["mandatory-venue-TIme-slot-venue-friday"]);
//     await expect(this.page.locator(locators["venue-time-slot-friday"])).toHaveValue(venue["mandatory-venue-TIme-slot-venue-friday"]);
//     await this.page.locator(locators["venue-time-slot-saturday"]).click();
//     await this.page.locator(locators["venue-time-slot-saturday"]).fill(venue["mandatory-venue-TIme-slot-venue-saturday"]);
//     console.log('Mandatory time slot filled successfully');
//     await this.page.locator(locators["venue-time-slot-sunday"]).click();
//     await this.page.locator(locators["venue-time-slot-sunday"]).fill(venue["mandatory-venue-TIme-slot-venue-sunday"]);
//     await expect(this.page.locator(locators["venue-time-slot-sunday"])).toHaveValue(venue["mandatory-venue-TIme-slot-venue-sunday"]);
//     console.log('Mandatory time slot filled successfully');
//   }
  async fillupstorytitle(){
    await this.page.locator(locators["Story Title"]).click();
    await this.page.locator(locators["Story Title"]).fill(venue["mandatory-story-title"]);
    await expect(this.page.locator(locators["Story Title"])).toHaveValue(venue["mandatory-story-title"]);
    // Additional assertion: check the value directly for robustness
    const filledValue = await this.page.locator(locators["Story Title"]).inputValue();
    expect(filledValue).toBe(venue["mandatory-story-title"]);
    console.log('Story title filled successfully');
  }
  
  //add story description
  async fillupstorydescription(){
    await this.page.locator(locators["Story Description"]).click();
    await this.page.locator(locators["Story Description"]).fill(venue["mandatory-story-description"]);
    await expect(this.page.locator(locators["Story Description"])).toHaveText(venue["mandatory-story-description"]);
    console.log('Story description filled successfully');
  }

  //story image
  async uploadstoryimage(){
    await this.page.getByText('Choose image').last().click();
    await this.page.locator('input[type="file"]').setInputFiles(`Fixtures/pictures/${venue["mandatory-story-image"]}`);
    await expect(this.page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Upload' }).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
    console.log('Story image upload completed successfully');
  }

  //gallery item 1 - complete process (add title, description, and upload image)
  async fillupgalleryimage1(){
    await this.page.locator(locators["add-galary-items-button"]).click();
    await this.page.locator(locators["add-galary-items-1"]).click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(locators["add-galary-items-1"]).fill(venue["mandatory-gallary-titel-1"]);
    await expect(this.page.locator(locators["add-galary-items-1"])).toHaveValue(venue["mandatory-gallary-titel-1"]);
    await this.page.locator(locators["gallary-item-description-1"]).fill(venue["mandatory-gallary-description-1"]);
    await expect(this.page.locator(locators["gallary-item-description-1"])).toHaveValue(venue["mandatory-gallary-description-1"]);
    // Upload gallery item 1 image
    await this.page.getByText('Choose image').last().click();
    await this.page.locator('input[type="file"]').setInputFiles(`Fixtures/pictures/${venue["mandatory-gallary-image-1"]}`);
    await expect(this.page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Upload' }).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
    console.log('Gallery item 1 completed successfully');
  }

  //gallery item 2 - complete process (add title, description, and upload image)
  async fillupgalleryimage2(){
    await this.page.locator(locators["add-galary-items-button"]).click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(locators["add-galary-items-2"]).fill(venue["mandatory-gallary-titel-2"]);
    await expect(this.page.locator(locators["add-galary-items-2"])).toHaveValue(venue["mandatory-gallary-titel-2"]);
    await this.page.locator(locators["gallary-item-description-2"]).fill(venue["mandatory-gallary-description-2"]);
    await expect(this.page.locator(locators["gallary-item-description-2"])).toHaveValue(venue["mandatory-gallary-description-2"]);
    // Upload gallery item 2 image
    await this.page.getByText('Choose image').last().click();
    await this.page.locator('input[type="file"]').setInputFiles(`Fixtures/pictures/${venue["mandatory-gallary-image-2"]}`);
    await expect(this.page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Upload' }).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
    console.log('Gallery item 2 completed successfully');
  }

  //gallery item 3 - complete process (add title, description, and upload image)
  async fillupgalleryimage3(){
    await this.page.locator(locators["add-galary-items-button"]).click();
    await this.page.locator(locators["add-galary-items-3"]).click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(locators["add-galary-items-3"]).fill(venue["mandatory-gallary-titel-3"]);
    await expect(this.page.locator(locators["add-galary-items-3"])).toHaveValue(venue["mandatory-gallary-titel-3"]);
    await this.page.locator(locators["gallary-item-description-3"]).click();
    await this.page.locator(locators["gallary-item-description-3"]).fill(venue["mandatory-gallary-description-3"]);
    await expect(this.page.locator(locators["gallary-item-description-3"])).toHaveValue(venue["mandatory-gallary-description-3"]);
    // Upload gallery item 3 image
    await this.page.getByText('Choose image').last().click();
    await this.page.locator('input[type="file"]').setInputFiles(`Fixtures/pictures/${venue["mandatory-gallary-image-3"]}`);
    await expect(this.page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Upload' }).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.getByRole('heading', { name: 'Upload Image' })).not.toBeVisible();
    console.log('Gallery item 3 completed successfully');
  }

  //click on the save button
  async clicksavebutton(){
    await this.page.locator(locators["save-button"]).click();
    await this.page.waitForTimeout(2000);
    // await expect(this.page.getByText('DishUp')).toBeVisible();
    console.log('Venue saved successfully');
  }
}
