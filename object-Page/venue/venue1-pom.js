import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };

/**
 * Page Object Model for Venue Duplication Testing
 * Handles venue creation, duplication validation, and error checking
 */
export default class VenueDuplicationPOM {
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

  /**
   * Fill venue basic information
   * @param {Object} venueData - Venue data from fixture
   */
  async fillVenueBasicInfo(venueData) {
    console.log('📝 Filling venue basic information...');
    
    // Venue name
    await this.page.getByRole('textbox', { name: 'Venue name' }).fill(venueData['venue-name']);
    await expect(this.page.getByRole('textbox', { name: 'Venue name' })).toHaveValue(venueData['venue-name']);
    console.log('✅ Venue name filled');

    // Email
    await this.page.getByRole('textbox', { name: 'Email' }).fill(venueData['venue-email']);
    await expect(this.page.getByRole('textbox', { name: 'Email' })).toHaveValue(venueData['venue-email']);
    console.log('✅ Email filled');

    // Venue type
    await this.page.getByRole('combobox', { name: 'Venue type' }).click();
    await this.page.getByRole('option', { name: venueData['venue-type'], exact: true }).click();
    await expect(this.page.getByRole('combobox', { name: 'Venue type' })).toHaveValue(venueData['venue-type']);
    console.log('✅ Venue type selected');

    // Default language
    await this.page.getByRole('combobox', { name: 'Venue default language' }).click();
    await this.page.getByRole('option', { name: venueData['venue-default-language'], exact: true }).click();
    await expect(this.page.getByRole('combobox', { name: 'Venue default language' })).toHaveValue(venueData['venue-default-language']);
    console.log('✅ Default language selected');

    // Time zone
    await this.page.getByRole('combobox', { name: 'Time zone' }).click();
    await this.page.getByRole('option', { name: venueData['venue-Time zone'], exact: true }).click();
    await expect(this.page.getByRole('combobox', { name: 'Time zone' })).toHaveValue(venueData['venue-Time zone']);
    console.log('✅ Time zone selected');

    // Currency
    await this.page.getByRole('combobox', { name: 'Currency' }).click();
    await this.page.getByRole('option', { name: venueData['venue-Currency'], exact: true }).click();
    await expect(this.page.getByRole('combobox', { name: 'Currency' })).toHaveValue(venueData['venue-Currency']);
    console.log('✅ Currency selected');

    // Cuisine
    await this.page.getByRole('textbox', { name: 'Cuisine' }).fill(venueData['venue-Cuisine']);
    await expect(this.page.getByRole('textbox', { name: 'Cuisine' })).toHaveValue(venueData['venue-Cuisine']);
    console.log('✅ Cuisine filled');

    // Address
    await this.page.getByRole('textbox', { name: 'Address' }).fill(venueData['venue-Address']);
    await expect(this.page.getByRole('textbox', { name: 'Address' })).toHaveValue(venueData['venue-Address']);
    console.log('✅ Address filled');
  }

  /**
   * Navigate to next step
   */
  async navigateToNextStep() {
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to next step');
  }

  /**
   * Fill venue details and branding
   * @param {Object} venueData - Venue data from fixture
   */
  async fillVenueDetails(venueData) {
    console.log('📝 Filling venue details and branding...');
    
    // Venue description
    await this.page.getByRole('textbox', { name: 'Venue description' }).fill(venueData['venue-description']);
    await expect(this.page.getByRole('textbox', { name: 'Venue description' })).toHaveValue(venueData['venue-description']);
    console.log('✅ Venue description filled');

    // Social media links
    await this.page.locator("[name='instagram']").fill(venueData['Instagram address (optional)']);
    await this.page.locator("[name='facebook']").fill(venueData['Facebook (optional)']);
    console.log('✅ Social media links filled');

    // Client app URL
    await this.page.locator("[name='slug']").fill(venueData['Client app url *']);
    await expect(this.page.locator("[name='slug']")).toHaveValue(venueData['Client app url *']);
    console.log('✅ Client app URL filled');

    // Enable checkboxes
    await this.page.locator("[type='checkbox']").first().check();
    await this.page.getByRole('checkbox').nth(1).check();
    console.log('✅ Checkboxes enabled');

    // Tax and tip percentages
    await this.page.locator("[name='defaultTipPercentage']").fill(venueData['Tip Percentage (%)']);
    await this.page.locator("[name='dineInTax']").fill(venueData['Dine-In Tax (%) *']);
    await this.page.locator("[name='takeawayTax']").fill(venueData['Take-Away Tax (%) *']);
    console.log('✅ Tax and tip percentages filled');
  }

  /**
   * Fill story and experience section
   * @param {Object} venueData - Venue data from fixture
   */
  async fillStoryAndExperience(venueData) {
    console.log('📝 Filling story and experience section...');
    
    // Contact number
    await this.page.getByRole('textbox', { name: 'Enter contact number' }).fill(venueData['contact-number']);
    await expect(this.page.getByRole('textbox', { name: 'Enter contact number' })).toHaveValue(venueData['contact-number']);
    console.log('✅ Contact number filled');

    // Story title
    await this.page.getByRole('textbox', { name: 'Story Title' }).fill(venueData['story-title']);
    await expect(this.page.getByRole('textbox', { name: 'Story Title' })).toHaveValue(venueData['story-title']);
    console.log('✅ Story title filled');

    // Story description
    await this.page.locator("[data-slate-node='element']").fill(venueData['story-description']);
    console.log('✅ Story description filled');
  }

  /**
   * Add gallery items
   * @param {Object} venueData - Venue data from fixture
   */
  async addGalleryItems(venueData) {
    console.log('📝 Adding gallery items...');
    
    // Gallery Item 1
    await this.page.getByRole('button', { name: 'Add Gallery Item' }).click();
    await this.page.waitForTimeout(1000);
    
    await this.page.locator("//input[@name='gallery.0.title.en' and @placeholder='Gallery Title']").fill(venueData['gallery-item-1'].title);
    await this.page.locator("//textarea[@name='gallery.0.description.en' and @placeholder='Gallery Description']").fill(venueData['gallery-item-1'].description);
    console.log('✅ Gallery item 1 added');

    // Gallery Item 2
    await this.page.getByRole('button', { name: 'Add Gallery Item' }).click();
    await this.page.waitForTimeout(1000);
    
    await this.page.locator("//input[@name='gallery.1.title.en' and @placeholder='Gallery Title']").fill(venueData['gallery-item-2'].title);
    await this.page.locator("//textarea[@name='gallery.1.description.en' and @placeholder='Gallery Description']").fill(venueData['gallery-item-2'].description);
    console.log('✅ Gallery item 2 added');

    // Gallery Item 3
    await this.page.getByRole('button', { name: 'Add Gallery Item' }).click();
    await this.page.waitForTimeout(1000);
    
    await this.page.locator("//input[@name='gallery.2.title.en' and @placeholder='Gallery Title']").fill(venueData['gallery-item-3'].title);
    await this.page.locator("//textarea[@name='gallery.2.description.en' and @placeholder='Gallery Description']").fill(venueData['gallery-item-3'].description);
    console.log('✅ Gallery item 3 added');
  }

  /**
   * Click Save button and wait for response
   */
  async clickSaveButton() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    console.log('✅ Save button clicked');
    
    // Wait for save operation to complete
    await this.page.waitForLoadState('networkidle');
    console.log('⏳ Waiting for save operation to complete...');
  }

  /**
   * Check for venue duplicate error
   */
  async checkVenueDuplicateError() {
    console.log('🔍 Checking for venue duplicate error...');
    const duplicateAlert = await this.page.locator(locators["venue-duplicate-alert"]).isVisible();
    return duplicateAlert;
  }
  
}
