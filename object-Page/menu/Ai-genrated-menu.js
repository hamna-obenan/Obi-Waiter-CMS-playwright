// Import Playwright tools for testing
import { expect } from '@playwright/test';

// Import the login page class - we will use it to login
import LoginPage from "../pomlogin/pomlogin1.js";

// Import locators - these are like addresses to find buttons and fields on the page
import locators from "../../Fixtures/locators.json" assert { type: "json" };

// Import venue data - this has the venue name we need to check
import venue from "../../Fixtures/Venue.json" assert { type: "json" };

// Import path module to build file paths
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory - this helps us find the picture folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * This class helps us test the AI menu generation feature
 * It does these things:
 * 1. Login to the website
 * 2. Click on a venue
 * 3. Generate AI menu (coming soon)
 */
export default class AiGenratedMenu {
    
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
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByText(venue.venuetitlename, { exact: true })).toBeVisible();
        // Step 2: Find the venue button and click on the first one
        await this.page.locator(locators["click-on-the-created-venue"]).first().click();
        // Step 3: Wait for the page to finish loading
        // This makes sure everything is ready before we continue
        await this.page.waitForLoadState('networkidle');
    }
    //click on the ai genrated menu button
    async clickOnAiGenratedMenuButton() {
        //aseertion to verify we are at the menu page
        await expect(this.page.getByText("Select menu", { exact: true })).toBeVisible();
        await this.page.locator(locators["ai-genrated-menu-button"]).click();
        await this.page.waitForLoadState('networkidle');
    }
    //upload a menu picture
    async uploadMenuPicture() {
        //assertion to verify we are at the ai genrated menu page
        await expect(this.page.getByText("AI Menu Generate", { exact: true }).nth(1)).toBeVisible();
        await this.page.waitForLoadState('networkidle');
        
        // Step 1: Click on "Browse from your computer" text
        // This opens the file picker so we can upload the picture
        await this.page.getByText("Browse from your computer", { exact: false }).click();
        
        // Step 2: Build the path to the picture file
        // The picture is in Fixtures/pictures folder with name ai-genrated-menu-picture.jpeg
        const imagePath = path.join(__dirname, '../../Fixtures/pictures/ai-genrated-menu-picture.jpeg');
        
        // Step 3: Wait for the file input to appear (the file picker dialog)
        // This makes sure the file input is ready before we try to upload
        await this.page.waitForSelector('input[type="file"]', { state: 'attached' });
        
        // Step 4: Upload the picture file directly
        // setInputFiles needs the selector first, then the file path
        await this.page.setInputFiles('input[type="file"]', imagePath);
        
        // Step 5: Wait for the AI to process the image and show the menu preview
        // Give it time to generate the menu
        await this.page.waitForTimeout(5000);

        // Step 6: Check that "Replace File" button is there
        // If this button appears, it means the upload worked and we can replace the file if needed
        await expect(this.page.getByText('ai-genrated-menu-picture.jpeg', { exact: true })).toBeVisible({ timeout: 5000 });
        console.log('✅ Menu picture uploaded and preview is showing');

        // Step 7: Click on the upload button to generate the menu
        await this.page.locator(locators["upload-button"]).click();
        
        // Step 8: Verify the "Generating your menu..." box appears
        // This confirms that the AI menu generation has started
        await expect(this.page.getByText("Generating your menu...", { exact: false })).toBeVisible({ timeout: 5000 });
        console.log('✅ AI menu generation started');
        
        // Step 9: Wait for the AI to finish generating the menu
        // The modal will disappear when the menu is ready
        // Wait up to 5 minutes (300000 milliseconds = 5 minutes) for the generation to complete
        try {
            // Wait for the "Generating your menu..." text to disappear
            // This means the menu generation is complete
            await expect(this.page.getByText("Generating your menu...", { exact: false })).not.toBeVisible({ timeout: 300000 });
            console.log('✅ AI menu generation completed');
        } catch (error) {
            console.log('⚠️ Menu generation is taking longer than expected, continuing...');
        }
        
        // Step 10: Verify the success toast notification appears
        // After processing completes, a toast message appears to confirm the menu was generated successfully
        // Wait a moment for the toast to appear, then verify it's visible using getByText
        // Check for the onboarding toast text using getByText
        await expect(this.page.getByText("onboarding", { exact: false })).toBeVisible({ timeout: 10000 });
        console.log('✅ Success toast notification appeared');
        
        // Step 11: Wait for the page to finish loading after menu generation
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Menu generation process finished');
    
    }
}


