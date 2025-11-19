// Import Playwright tools for testing
import { expect } from '@playwright/test';

// Import the login page class - we will use it to login
import LoginPage from "../pomlogin/pomlogin1.js";

// Import locators - these are like addresses to find buttons and fields on the page
import locators from "../../Fixtures/locators.json" assert { type: "json" };

// Import venue data - this has the venue name we need to check
import venue from "../../Fixtures/Venue.json" assert { type: "json" };

/**
 * This class helps us test the AI menu generation feature
 * It does these things:
 * 1. Login to the website
 * 2. Click on a venue
 * 3. Generate AI menu (coming soon)
 */
export default class AiGenratedMenuAssertions {
    
    // When we create this class, we need to give it a page
    // The page is like a browser window that Playwright controls
    constructor(page) {
        this.page = page;
        // Create a login helper - this will do the login for us
        this.loginPage = new LoginPage(page);
    }
    
    /**
     * This method logs the user into the website
     * It uses the LoginPage class we imported to do the actual login
     */
    async login() {
        // Tell the login helper to login with "primary" user account
        // The "primary" user is the main test account
        await this.loginPage.completeLogin("primary");
        
        // Print a message to show login worked
        console.log('✅ Login completed successfully');
    }
    
    /**
     * This method clicks on a venue (restaurant) to select it
     * After login, we need to pick which venue we want to work with
     */
    async clickOnVenue() {

        // Step 1: Check that we clicked the right venue
        // We check if the venue name matches what we expect
        // Find the venue element by its visible text (using the specific venue name)
        await this.page.waitForTimeout(2000);
        await expect(this.page.getByText(venue.venuetitlename, { exact: true })).toBeVisible();
        // Step 2: Find the venue button and click on the first one
        await this.page.locator(locators["click-on-the-created-venue"]).first().click();
        // Step 3: Wait for the page to finish loading
        // This makes sure everything is ready before we continue
        await this.page.waitForLoadState('networkidle');
    }
    //click on the created menu
    async clickOnCreatedMenu() {
        await this.page.locator(locators["created-menu"]).nth(7).click();
        await this.page.waitForLoadState('networkidle');
    }
    
    /**
     * Verify that all expected category names are available in the AI generated menu
     * Checks for: STARTERS, MAINS, SIDES, DESSERTS, DRINKS
     */
    async verifyCategoryNames() {
        // Wait for the page to fully load
        await this.page.waitForLoadState('networkidle');
        
        // Step 1: First verify "Categories" text is visible
        await expect(this.page.getByText("Categories", { exact: false }).first()).toBeVisible({ timeout: 5000 });
        console.log('✅ "Categories" text is visible');
        
        // Step 2: Verify "Starters" text is visible
        await expect(this.page.getByText('Starters', { exact: true }).first()).toBeVisible({ timeout: 5000 });
        console.log(`✅ Category "Starters" is visible`);
        
        // Step 3: Verify "Mains" text is visible
        await expect(this.page.getByText('Mains', { exact: true })).toBeVisible({ timeout: 5000 });
        console.log(`✅ Category "Mains" is visible`);
        
        // Step 4: Verify "Sides" text is visible
        await expect(this.page.getByText('Sides', { exact: true })).toBeVisible({ timeout: 5000 });
        console.log(`✅ Category "Sides" is visible`);
        
        // Step 5: Verify "Desserts" text is visible
        await expect(this.page.getByText('Desserts', { exact: true })).toBeVisible({ timeout: 5000 });
        console.log(`✅ Category "Desserts" is visible`);
        
        // Step 6: Verify "Drinks" text is visible
        await expect(this.page.getByText('Drinks', { exact: true })).toBeVisible({ timeout: 5000 });
        console.log(`✅ Category "Drinks" is visible`);
        
        console.log('✅ All expected categories are available');
    }
    async verifyStatersCategoryItems() {
        //click on the created category
        await this.page.locator(locators["created-category-select"]).nth(3).click();
        await this.page.waitForLoadState('networkidle');
    }

   
}