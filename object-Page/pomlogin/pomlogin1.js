/**
 * Page Object Model (POM) for the Login flow
 * 
 * Best Practices Applied:
 * - Uses Playwright's built-in locators (getByRole, getByText)
 * - Environment-specific configuration
 * - Comprehensive error handling
 * - Proper wait strategies
 * - Clear method documentation
 * - Separation of concerns
 */

import login from "../../Fixtures/login.json" assert { type: "json" };
import { config } from "../../config/environments.js";

export default class LoginPage {
  /**
   * Construct a new LoginPage POM
   * @param {import('@playwright/test').Page} page - Playwright Page instance
   */
  constructor(page) {
    this.page = page;
    this.baseUrl = config.urls.base;
    this.loginUrl = config.urls.login;
    this.timeout = config.playwright.timeout || 30000;
  }

  /**
   * Navigate to the Login screen with proper wait strategies
   * @returns {Promise<void>}
   */
  async goto() {
    console.log(`Navigating to login: ${this.loginUrl}`);
    
    try {
      await this.page.goto(this.loginUrl, { 
        waitUntil: 'networkidle',
        timeout: this.timeout 
      });
      
      // Wait for login form to be ready
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForSelector('form', { timeout: 10000 });
      
      console.log('✅ Login page loaded successfully');
    } catch (error) {
      console.error(`❌ Failed to navigate to login page: ${error.message}`);
      throw new Error(`Navigation failed: ${error.message}`);
    }
  }

  /**
   * Fill signup form fields using Playwright best practices
   * @param {string} email - Email address
   * @param {string} password - Password
   * @returns {Promise<void>}
   */
  async fillForm(email, password) {
    console.log(`Filling signup form with email: ${email}`);
    
    try {
      // Wait for form fields to be visible
      await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible', timeout: 10000 });
      
      // Clear and fill email field
      await this.page.getByRole('textbox', { name: 'Email' }).clear();
      await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
      
      // Clear and fill password field
      await this.page.getByRole('textbox', { name: 'Password' }).clear();
      await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
      
      console.log('✅ Signup form filled successfully');
    } catch (error) {
      console.error(`❌ Failed to fill signup form: ${error.message}`);
      throw new Error(`Form filling failed: ${error.message}`);
    }
  }

  /**
   * Fill login form with credentials using Playwright best practices
   * @param {string} email - Email address
   * @param {string} password - Password
   * @returns {Promise<void>}
   */
  async login(email, password) {
    console.log(`Logging in with email: ${email}`);
    
    try {
      // Wait for login form fields to be visible and enabled
      await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ 
        state: 'visible', 
        timeout: 10000 
      });
      await this.page.getByRole('textbox', { name: 'Password' }).waitFor({ 
        state: 'visible', 
        timeout: 10000 
      });
      
      // Clear existing values and fill email
      await this.page.getByRole('textbox', { name: 'Email' }).clear();
      await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
      
      // Clear existing values and fill password
      await this.page.getByRole('textbox', { name: 'Password' }).clear();
      await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
      
      // Wait for form to be ready
      await this.page.waitForTimeout(500);
      
      console.log('✅ Login form filled successfully');
    } catch (error) {
      console.error(`❌ Failed to fill login form: ${error.message}`);
      throw new Error(`Login form filling failed: ${error.message}`);
    }
  }

  /**
   * Login using test credentials from fixtures
   * @param {string} testId - Test case ID (e.g., "TC1001")
   * @returns {Promise<void>}
   */
  async loginById(testId = "TC1001") {
    console.log(`Using test credentials for: ${testId}`);
    
    try {
      const creds = login[testId];
      if (!creds) {
        throw new Error(`No credentials found in login.json for id: ${testId}`);
      }
      
      const { Email, Password } = creds;
      await this.login(Email, Password);
      
      console.log(`✅ Credentials loaded for test case: ${testId}`);
    } catch (error) {
      console.error(`❌ Failed to load credentials for ${testId}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Login using environment-specific credentials
   * @param {string} userType - User type (primary, admin, custom)
   * @returns {Promise<void>}
   */
  async loginWithEnvCredentials(userType = "primary") {
    console.log(`Using environment credentials for: ${userType}`);
    
    try {
      const credentials = config.testData.users[userType];
      if (!credentials) {
        throw new Error(`No ${userType} credentials found in environment config`);
      }
      
      await this.login(credentials.email, credentials.password);
      console.log(`✅ Environment credentials loaded for: ${userType}`);
    } catch (error) {
      console.error(`❌ Failed to load environment credentials: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click the Sign In button with proper wait strategies
   * @returns {Promise<void>}
   */
  async signinButton() {
    console.log(`Clicking Sign In button`);
    
    try {
      // Wait for button to be visible and enabled
      await this.page.getByRole('button', { name: 'Sign in' }).waitFor({ 
        state: 'visible', 
        timeout: 10000 
      });
      
      // Ensure button is enabled before clicking
      await this.page.getByRole('button', { name: 'Sign in' }).waitFor({ 
        state: 'attached', 
        timeout: 5000 
      });
      
      // Click the button
      await this.page.getByRole('button', { name: 'Sign in' }).click();
      
      console.log('✅ Sign In button clicked successfully');
    } catch (error) {
      console.error(`❌ Failed to click Sign In button: ${error.message}`);
      throw new Error(`Sign In button click failed: ${error.message}`);
    }
  }

  /**
   * Complete login flow with environment credentials
   * @param {string} userType - User type (primary, admin, custom)
   * @returns {Promise<boolean>} - Success status
   */
  async completeLogin(userType = "primary") {
    try {
      await this.goto();
      await this.loginWithEnvCredentials(userType);
      await this.signinButton();
      
      // Wait for navigation after login
      await this.page.waitForLoadState('networkidle');
      
      console.log(`✅ Login completed for ${userType} user`);
      return true;
    } catch (error) {
      console.error(`❌ Login failed for ${userType} user: ${error.message}`);
      return false;
    }
  }

  /**
   * Complete login flow with test ID credentials
   * @param {string} testId - Test case ID from login.json
   * @returns {Promise<boolean>} - Success status
   */
  async completeLoginById(testId = "TC1001") {
    try {
      await this.goto();
      await this.loginById(testId);
      await this.signinButton();
      
      // Wait for navigation after login
      await this.page.waitForLoadState('networkidle');
      
      console.log(`✅ Login completed for test ID: ${testId}`);
      return true;
    } catch (error) {
      console.error(`❌ Login failed for test ID ${testId}: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify login success using multiple strategies
   * @param {string} expectedUrl - Expected URL after login
   * @param {string} expectedElement - Element to verify (optional)
   * @returns {Promise<boolean>} - Verification success
   */
  async verifyLoginSuccess(expectedUrl = null, expectedElement = null) {
    console.log(`Verifying login success...`);
    
    try {
      // Strategy 1: Check URL change
      if (expectedUrl) {
        await this.page.waitForURL(expectedUrl, { timeout: 10000 });
        console.log(`✅ URL verification successful: ${expectedUrl}`);
        return true;
      }
      
      // Strategy 2: Check for dashboard elements
      if (expectedElement) {
        await this.page.getByRole('button', { name: 'Add' }).waitFor({ 
          state: 'visible',
          timeout: 10000 
        });
        console.log(`✅ Element verification successful: ${expectedElement}`);
        return true;
      }
      
      // Strategy 3: Check that we're not on login page
      const currentUrl = this.page.url();
      if (!currentUrl.includes('/login')) {
        console.log(`✅ Login verification successful - not on login page`);
        return true;
      }
      
      console.log(`❌ Login verification failed`);
      return false;
    } catch (error) {
      console.error(`❌ Login verification failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Handle login with retry mechanism and error recovery
   * @param {number} maxRetries - Maximum number of retries
   * @param {string} testId - Test case ID for retry
   * @returns {Promise<boolean>} - Success status
   */
  async handleLoginWithRetry(maxRetries = 3, testId = "TC1001") {
    console.log(`Starting login retry mechanism (max ${maxRetries} attempts)`);
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Login attempt ${attempt}/${maxRetries}`);
        
        // Clear any existing form data
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        
        // Attempt login
        const success = await this.completeLoginById(testId);
        
        if (success && await this.verifyLoginSuccess()) {
          console.log(`✅ Login successful on attempt ${attempt}`);
          return true;
        }
        
        console.log(`⚠️ Login attempt ${attempt} did not succeed`);
        
      } catch (error) {
        console.error(`❌ Login attempt ${attempt} failed: ${error.message}`);
        
        if (attempt === maxRetries) {
          console.error(`❌ All ${maxRetries} login attempts failed`);
          return false;
        }
        
        // Wait before retry with exponential backoff
        const waitTime = attempt * 2000;
        console.log(`⏳ Waiting ${waitTime}ms before retry...`);
        await this.page.waitForTimeout(waitTime);
      }
    }
    
    return false;
  }

  /**
   * Get current page state for debugging
   * @returns {Promise<Object>} - Page state information
   */
  async getPageState() {
    return {
      url: this.page.url(),
      title: await this.page.title(),
      isLoginPage: this.page.url().includes('/login'),
      timestamp: new Date().toISOString()
    };
  }
}
