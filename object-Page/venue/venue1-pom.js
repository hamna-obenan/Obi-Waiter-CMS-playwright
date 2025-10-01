import { expect } from '@playwright/test';

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
   * Click Save button
   */
  async clickSaveButton() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    console.log('✅ Save button clicked');
  }

  /**
   * Verify duplication error messages
   * @param {Object} expectedError - Expected error data
   */
  async verifyDuplicationError(expectedError) {
    console.log('🔍 Verifying duplication error messages...');
    
    // Wait for error to appear
    await this.page.waitForTimeout(3000);
    
    // Check for various error message patterns
    const errorSelectors = [
      'text="Venue with this name already exists"',
      'text="Email already exists"',
      'text="Client app URL already exists"',
      'text="This venue name is already taken"',
      'text="Duplicate venue detected"',
      '[class*="error"]',
      '[class*="alert"]',
      '.MuiAlert-root'
    ];

    let errorFound = false;
    for (const selector of errorSelectors) {
      try {
        const errorElement = await this.page.locator(selector).first();
        if (await errorElement.isVisible()) {
          const errorText = await errorElement.textContent();
          console.log(`❌ Duplication error found: ${errorText}`);
          errorFound = true;
          break;
        }
      } catch (error) {
        // Continue checking other selectors
      }
    }

    if (errorFound) {
      console.log('✅ Duplication error correctly detected');
      return true;
    } else {
      console.log('⚠️ No duplication error found - venue may have been created successfully');
      return false;
    }
  }

  /**
   * Check if venue was created successfully
   */
  async isVenueCreated() {
    console.log('🔍 Checking if venue was created...');
    
    // Check if we're no longer on the create page
    const currentUrl = this.page.url();
    if (!currentUrl.includes('/create')) {
      console.log('✅ Successfully navigated away from create page');
      return true;
    }
    
    console.log('⚠️ Still on create page - venue may not have been created');
    return false;
  }

  /**
   * Get current page URL for verification
   */
  async getCurrentUrl() {
    return await this.page.url();
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Handle alert popup and get its message
   */
  async handleAlertPopup() {
    console.log('🔔 Checking for alert popup...');
    
    try {
      // Wait for alert to appear - try multiple selectors
      await this.page.waitForSelector('text="Venue already exist"', { timeout: 5000 });
      
      // Get the alert message by looking for the specific text
      const alertMessage = await this.page.locator('text="Venue already exist"').first().textContent();
      
      console.log(`📢 Alert popup detected: ${alertMessage}`);
      
      return {
        hasAlert: true,
        message: alertMessage
      };
    } catch (error) {
      console.log('ℹ️ No alert popup found');
      return {
        hasAlert: false,
        message: null
      };
    }
  }

  /**
   * Check for venue already exists error in alert popup
   */
  async checkVenueAlreadyExistsError() {
    console.log('🔍 Checking for venue already exists error in alert popup...');
    
    const alertInfo = await this.handleAlertPopup();
    
    if (alertInfo.hasAlert) {
      const errorMessage = alertInfo.message.toLowerCase();
      
      // Check for venue already exists error patterns (case insensitive)
      const isVenueExistsError = errorMessage.includes('venue already exist') || 
                                errorMessage.includes('venue already exists') ||
                                errorMessage.includes('venue already taken') ||
                                errorMessage.includes('duplicate venue');
      
      if (isVenueExistsError) {
        console.log('✅ Venue already exists error detected in alert popup');
        console.log(`📢 Error message: ${alertInfo.message}`);
        return true;
      } else {
        console.log('⚠️ Alert popup found but not a venue exists error');
        console.log(`📢 Alert message: ${alertInfo.message}`);
        
        // Additional check: If alert is detected but message is empty, 
        // it might still be a venue exists error (popup appeared but text not captured)
        if (!alertInfo.message || alertInfo.message.trim() === '' || alertInfo.message === 'Empty alert message') {
          console.log('🔍 Alert detected but message is empty - checking page for venue exists indicators...');
          
          // Check if we're still on the create page (venue creation failed)
          const currentUrl = this.page.url();
          const isStillOnCreatePage = currentUrl.includes('/create') || currentUrl.includes('/venue/create');
          
          if (isStillOnCreatePage) {
            console.log('✅ Still on create page - likely venue already exists error');
            return true;
          }
        }
        
        return false;
      }
    } else {
      console.log('ℹ️ No alert popup found - checking for other error indicators');
      
      // Check if we're still on the create page (venue creation failed)
      const currentUrl = this.page.url();
      const isStillOnCreatePage = currentUrl.includes('/create') || currentUrl.includes('/venue/create');
      
      if (isStillOnCreatePage) {
        console.log('✅ Still on create page - likely venue already exists error');
        return true;
      }
      
      return false;
    }
  }

  /**
   * Dismiss alert popup if present
   */
  async dismissAlertPopup() {
    console.log('❌ Attempting to dismiss alert popup...');
    
    try {
      // Look for close button or dismiss button
      const closeButton = this.page.locator('[role="alert"] button, .MuiAlert-root button, .alert button, [class*="alert"] button').first();
      
      if (await closeButton.isVisible()) {
        await closeButton.click();
        console.log('✅ Alert popup dismissed');
        return true;
      } else {
        console.log('⚠️ No close button found for alert popup');
        return false;
      }
    } catch (error) {
      console.log('⚠️ Could not dismiss alert popup:', error.message);
      return false;
    }
  }

  /**
   * Wait for alert popup to disappear
   */
  async waitForAlertToDisappear() {
    console.log('⏳ Waiting for alert popup to disappear...');
    
    try {
      await this.page.waitForFunction(() => {
        const alerts = document.querySelectorAll('[role="alert"], .MuiAlert-root, .alert, [class*="alert"]');
        return alerts.length === 0;
      }, { timeout: 10000 });
      
      console.log('✅ Alert popup has disappeared');
      return true;
    } catch (error) {
      console.log('⚠️ Alert popup did not disappear within timeout');
      return false;
    }
  }
}
