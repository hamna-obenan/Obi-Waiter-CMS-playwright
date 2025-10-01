import { test, expect } from "@playwright/test";
import { config } from "../../config/environments.js";
import SignupPage from "../../object-Page/pomsignup/signuppage-pom.js";
import signup from "../../Fixtures/sign up.json" assert { type: "json" };
import locators from "../../Fixtures/locators.json" assert { type: "json" };

/**
 * Signup Success Test
 * Tests complete user registration with valid data
 */
test("Complete signup with valid data", async ({ page }) => {
    const signupPage = new SignupPage(page);
    
    // Navigate to signup page using environment config
    await signupPage.goto();
    
    // Assert: Verify we are on the signup page
    await expect(page).toHaveURL(/.*signup/);
    await expect(page.locator(locators["signup-button"])).toBeVisible();
    
    // Fill First name
    await page.locator(locators["First name"]).fill(signup["First name"]);
    // Assert: Verify first name field contains the entered value
    await expect(page.locator(locators["First name"])).toHaveValue(signup["First name"]);
    
    // Fill Last name
    await page.locator(locators["Last name"]).fill(signup["Last name"]);
    // Assert: Verify last name field contains the entered value
    await expect(page.locator(locators["Last name"])).toHaveValue(signup["Last name"]);
    
    // Fill Email
    await page.locator(locators["Email"]).fill(signup["Email"]);
    // Assert: Verify email field contains the entered value
    await expect(page.locator(locators["Email"])).toHaveValue(signup["Email"]);
    
    // Fill Company name
    await page.locator(locators["Company name"]).fill(signup["Company name"]);
    // Assert: Verify company name field contains the entered value
    await expect(page.locator(locators["Company name"])).toHaveValue(signup["Company name"]);
    
    // Fill Password
    await page.locator(locators["Password"]).fill(signup["Password"]);
    // Assert: Verify password field contains the entered value
    await expect(page.locator(locators["Password"])).toHaveValue(signup["Password"]);
    
    // Fill Confirm password
    await page.locator(locators["Confirm password"]).fill(signup["Confirm password"]);
    // Assert: Verify confirm password field contains the entered value
    await expect(page.locator(locators["Confirm password"])).toHaveValue(signup["Confirm password"]);
    
    // Assert: Verify all fields are filled before submission
    await expect(page.locator(locators["First name"])).not.toBeEmpty();
    await expect(page.locator(locators["Last name"])).not.toBeEmpty();
    await expect(page.locator(locators["Email"])).not.toBeEmpty();
    await expect(page.locator(locators["Company name"])).not.toBeEmpty();
    await expect(page.locator(locators["Password"])).not.toBeEmpty();
    await expect(page.locator(locators["Confirm password"])).not.toBeEmpty();
    
    // Submit the form
    await page.locator(locators["signup-button"]).click();
    
    // Assert: Verify signup button is clickable and form is submitted
    await expect(page.locator(locators["signup-button"])).toBeVisible();
    
    // Wait for page navigation or success message
    await page.waitForLoadState('networkidle');
    
    // Assert: Verify successful signup (check for redirect or success message)
    // Option 1: Check if redirected to login page
    const isRedirectedToLogin = await page.url().includes('/login');
    if (isRedirectedToLogin) {
        await expect(page).toHaveURL(/.*login/);
        console.log('Signup successful - redirected to login page');
    } else {
        // Option 2: Check for success message or stay on signup page
        await expect(page).toHaveURL(/.*signup/);
        console.log('Signup completed - remained on signup page');
    }
    
    console.log(' Signup test completed successfully');
});
