// Page Object Model (POM) for Venue Creation
// - Locators are sourced from Fixtures/locators.json
// - Test data is sourced from Fixtures/Venue.json
// - Environment URLs are sourced from config/environments.js
// - Methods are organized by venue creation steps

import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import venue from "../../Fixtures/Venue.json" assert { type: "json" };
import { config } from "../../config/environments.js";
import path from "node:path";

export default class AddVenuePage {
  constructor(page) {
    this.page = page;
    // Environment-specific configuration
    this.baseUrl = config.urls.base;
    this.venueUrl = config.urls.venue;
    this.timeout = config.playwright.timeout;
    this.uploadPaths = config.upload;
  }

  // Interpret locator strings stored in JSON (supports getByRole, getByPlaceholder, XPath/CSS)
  loc(key) {
    const sel = locators[key];
    if (!sel) throw new Error(`Missing locator for key: ${key}`);

    // getByRole('role', { name: 'Name' })
    const byRoleMatch = sel.match(/getByRole\('\s*([^']+)\s*'\s*,\s*\{\s*name:\s*'([^']+)'\s*\}\s*\)/);
    if (byRoleMatch) {
      const role = byRoleMatch[1];
      const name = byRoleMatch[2];
      return this.page.getByRole(role, { name });
    }
    // getByPlaceholder('Placeholder')
    const byPlaceholderMatch = sel.match(/getByPlaceholder\('\s*([^']+)\s*'\)/);
    if (byPlaceholderMatch) {
      const placeholder = byPlaceholderMatch[1];
      return this.page.getByPlaceholder(placeholder);
    }
    // Fallback to raw selector (XPath/CSS)
    return this.page.locator(sel);
  }

  async goToLogin() {
    console.log(`Navigating to login: ${config.urls.login}`);
    await this.page.goto(config.urls.login, { 
      waitUntil: 'networkidle',
      timeout: this.timeout 
    });
  }

  async loginWithFixture(testId = "TC1001") {
    const creds = login[testId];
    if (!creds) throw new Error(`No credentials for ${testId} in login.json`);
    
    console.log(`Logging in with test ID: ${testId}`);
    await this.loc("signin-email").fill(creds.Email);
    await this.loc("signin-password").fill(creds.Password);
    await this.loc("signin-button").click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickAddVenue() {
    console.log(`Clicking Add Venue button`);
    await this.loc("click-add-venue-button").click();
    await this.page.waitForLoadState("networkidle");
  }

  // Step 1: Basic info using environment data
  async fillBasicInfo(data = null) {
    console.log(`Filling basic venue information`);
    
    // Use environment data if no data provided
    const venueData = data || config.testData.venue;
    
    // Venue name
    await this.loc("venue-name").fill(venueData.name);
    console.log(`Venue name: ${venueData.name}`);
    
    // Email
    await this.loc("venue-email").fill(venueData.email);
    console.log(`Venue email: ${venueData.email}`);
    
    // Venue type
    await this.loc("venue-type").click();
    await this.page.getByRole('option', { name: venueData.type, exact: true }).click();
    console.log(`Venue type: ${venueData.type}`);
    
    // Default language
    await this.loc("venue-default-language").click();
    await this.page.getByRole('option', { name: venueData.language, exact: true }).click();
    console.log(`Default language: ${venueData.language}`);
    
    // Time zone
    await this.loc("venue-Time zone").click();
    await this.page.getByRole('option', { name: venueData.timezone, exact: true }).click();
    console.log(`Time zone: ${venueData.timezone}`);
    
    // Currency
    await this.loc("venue-Currency").click();
    await this.page.getByRole('option', { name: venueData.currency, exact: true }).click();
    console.log(`Currency: ${venueData.currency}`);
    
    // Cuisine
    await this.loc("venue-Cuisine").fill(venueData.cuisine);
    console.log(`Cuisine: ${venueData.cuisine}`);
    
    // Address
    await this.loc("venue-Address").fill(venueData.address);
    console.log(`Address: ${venueData.address}`);
    
    // Contact number (if available)
    if (locators["venue-contact-number"]) {
      await this.loc("venue-contact-number").fill(venueData.contactNumber || "");
      console.log(`Contact number: ${venueData.contactNumber}`);
    }
    
    // Taxes and tips
    if (locators["Tip Percentage (%)"]) {
      await this.loc("Tip Percentage (%)").fill(String(venueData.tipPercentage || ""));
      console.log(`Tip percentage: ${venueData.tipPercentage}`);
    }
    
    if (locators["Dine-In Tax (%)"]) {
      await this.loc("Dine-In Tax (%)").fill(String(venueData.dineInTax || ""));
      console.log(`Dine-in tax: ${venueData.dineInTax}`);
    }
    
    if (locators["Take-Away Tax (%) *"]) {
      await this.loc("Take-Away Tax (%) *").fill(String(venueData.takeawayTax || ""));
      console.log(`Take-away tax: ${venueData.takeawayTax}`);
    }

    // Next button
    await this.loc("venue-next-button-1").click();
    await this.page.waitForLoadState("networkidle");
    console.log(`Basic info completed, moved to next step`);
  }

  // Step 2: Details & Branding using environment data
  async fillDetailsAndBranding(data = null) {
    console.log(`Filling details and branding information`);
    
    // Use environment data if no data provided
    const venueData = data || config.testData.venue;
    
    // Venue description
    await this.loc("venue-description").fill(venueData.description);
    console.log(`Venue description filled`);
    
    // Social media links
    if (locators["Instagram address (optional)"]) {
      await this.loc("Instagram address (optional)").fill(venueData.instagram || "");
      console.log(`Instagram: ${venueData.instagram}`);
    }
    
    if (locators["Facebook (optional)"]) {
      await this.loc("Facebook (optional)").fill(venueData.facebook || "");
      console.log(`Facebook: ${venueData.facebook}`);
    }
    
    // Client app URL
    if (locators["Client app url *"]) {
      await this.loc("Client app url *").fill(venueData.clientUrl || "");
      console.log(`Client app URL: ${venueData.clientUrl}`);
    }
    
    // Enable Pay Later and Tipping
    await this.page.locator("[type='checkbox']").first().check();
    console.log(`Pay Later enabled`);
    
    await this.page.getByRole('checkbox').nth(1).check();
    console.log(`Tipping enabled`);
    
    // Upload logo
    if (venueData.logoImage) {
      await this.uploadImage("venuelogo", venueData.logoImage);
      console.log(`Logo uploaded: ${venueData.logoImage}`);
    }
    
    // Upload cover image
    if (venueData.coverImage) {
      await this.uploadImage("venueCoverimage *", venueData.coverImage);
      console.log(`Cover image uploaded: ${venueData.coverImage}`);
    }
    
    // Next button
    if (locators["venue-next-button-2"]) {
      await this.loc("venue-next-button-2").click();
      await this.page.waitForLoadState("networkidle");
      console.log(`Details & branding completed, moved to next step`);
    }
  }

  // Step 3: Story & Gallery
  async fillStoryAndGallery(data = venue) {
    console.log(`Filling story and gallery information`);
    
    // Story section
    if (locators["Story Title"]) {
      await this.loc("Story Title").fill(data["Story Title"] || "");
      console.log(`Story title: ${data["Story Title"]}`);
    }
    
    if (locators["Story Description"]) {
      await this.loc("Story Description").fill(data["Story Description"] || "");
      console.log(`Story description filled`);
    }
    
    if (data["Story Image"]) {
      await this.uploadImage("Story Image", data["Story Image"]);
      console.log(`Story image uploaded: ${data["Story Image"]}`);
    }
    
    // Gallery items
    for (let i = 1; i <= 3; i++) {
      const titleKey = `gallary-titel-${i}`;
      const descKey = `gallary-description-${i}`;
      const imageKey = `gallary-image-${i}`;
      const locatorKey = `add-galary-items-${i}`;
      
      if (data[titleKey] && locators[locatorKey]) {
        await this.loc(locatorKey).fill(data[titleKey]);
        console.log(`Gallery ${i} title: ${data[titleKey]}`);
      }
      
      if (data[descKey] && locators[`gallary-item-description-${i}`]) {
        await this.loc(`gallary-item-description-${i}`).fill(data[descKey]);
        console.log(`Gallery ${i} description filled`);
      }
      
      if (data[imageKey] && locators[`gallary-item-image-${i}`]) {
        await this.uploadImage(`gallary-item-image-${i}`, data[imageKey]);
        console.log(`Gallery ${i} image uploaded: ${data[imageKey]}`);
      }
    }
    
    console.log(`Story and gallery completed`);
  }

  // Venue timing setup
  async setupVenueTiming(data = venue) {
    console.log(`Setting up venue timing`);
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const timeSlot = data[`TIme-slot-venue-${day}`];
      
      if (timeSlot && locators[`select-venue-start-time-${day}`]) {
        const [openTime, closeTime] = timeSlot.split('-');
        
        // Set opening time
        await this.loc(`select-venue-start-time-${day}`).fill(openTime);
        console.log(`${day} opening: ${openTime}`);
        
        // Set closing time
        await this.loc(`select-venue-close-time-${day}`).fill(closeTime);
        console.log(`${day} closing: ${closeTime}`);
      }
    }
    
    console.log(`Venue timing setup completed`);
  }

  async save() {
    console.log(`Saving venue`);
    if (locators["venue-save-button"]) {
      await this.loc("venue-save-button").click();
      await this.page.waitForLoadState("networkidle");
      console.log(`Venue saved successfully`);
    }
  }

  assetPath(fileName) {
    // Use environment-specific upload paths
    const basePath = this.uploadPaths.uploadPath || "Fixtures/pictures";
    return path.resolve(process.cwd(), basePath, fileName);
  }

  async uploadImage(containerKey, fileName) {
    console.log(`Uploading image: ${fileName} for container: ${containerKey}`);
    
    try {
      // Click the container to reveal the file input
      await this.loc(containerKey).first().click();
      
      // Set the file input
      const filePath = this.assetPath(fileName);
      await this.page.setInputFiles('input[type="file"]', filePath);
      
      // Handle image cropping if needed
      await this.handleImageCropping();
      
      // Click upload button
      await this.page.locator('button:has-text("Upload")').click();
      
      console.log(`Image uploaded successfully: ${fileName}`);
    } catch (error) {
      console.error(`Image upload failed: ${error.message}`);
      throw error;
    }
  }

  async handleImageCropping() {
    try {
      // Wait for cropping interface
      await this.page.waitForSelector('[class*="crop"]', { timeout: 5000 });
      
      // Click and drag to select cropping area
      await this.page.locator('[class*="crop"]').first().click();
      await this.page.mouse.move(100, 100);
      await this.page.mouse.down();
      await this.page.mouse.move(300, 200);
      await this.page.mouse.up();
      
      console.log(`Image cropping completed`);
    } catch (error) {
      console.log(`Image cropping skipped: ${error.message}`);
    }
  }

  async pause() {
    // if (config.testing.debugPause) {
    //   await this.page.pause(); // Commented out for automated testing
    // }
  }

  // Complete venue creation flow using environment data
  async createVenue(data = null) {
    console.log(`Starting complete venue creation flow`);
    
    try {
      // Step 1: Basic info
      await this.fillBasicInfo(data);
      
      // Step 2: Details & Branding
      await this.fillDetailsAndBranding(data);
      
      // Step 3: Story & Gallery
      await this.fillStoryAndGallery(data);
      
      // Step 4: Venue timing
      await this.setupVenueTiming(data);
      
      // Step 5: Save
      await this.save();
      
      console.log(`Venue creation completed successfully`);
      return true;
    } catch (error) {
      console.error(`Venue creation failed: ${error.message}`);
      throw error;
    }
  }
}