import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };
import login from '../../Fixtures/login.json' assert { type: "json" };

/**
 * Page Object Model for Company Item Creation
 * Handles company item creation, navigation, and form interactions
 */
export default class CreateCompanyItemPOM {
  constructor(page) {
    this.page = page;
  }


  //login and navigate to venue page
  async loginAndNavigateToVenuePage() {
    await this.page.locator(locators["login-email"]).fill(login.TC1001.Email);
    await this.page.locator(locators["login-password"]).fill(login.TC1001.Password);
    await this.page.locator(locators["login-button"]).click();
    await this.page.waitForLoadState('networkidle');
  } 
  // After login, land at the venue page and then click on the created venue
  async navigateToVenuePage() {
    // Assumes that after login, user is already on the venue page
    // Now click on the created venue
    await this.page.locator(locators["click-on-the-created-venue"]).first().click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Landed on venue page and clicked on the created venue');
  }
  

  /**
   * Navigate to menu page (clicks on 2nd menu)
   */
  async navigateToMenuPage() {
    // Click on the 2nd menu using the provided locator
    await this.page.getByRole('link', { name: 'logo' }).nth(1).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to menu page (clicked 2nd menu)');
  }


  /**
   * Navigate to categories page (click on Categories link)
   */
  async navigateTocategoriesPage() {
    // Verify the categories page URL
    await expect(this.page).toHaveURL(locators["verify-the-categories-navigated-url"]);
    console.log('✅ Verified: Successfully navigated to categories page');
  }

  /**
   * Navigate to items tab
   */
  async navigateToItemsTab() {
    // Wait for the items tab to be available before clicking
    await this.page.waitForSelector(locators["Item-tab"], { timeout: 10000 });
    await this.page.locator(locators["Item-tab"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to items tab');
  }

  /**
   * Click Add Item button
   */
  async clickAddItemButton() {
    await this.page.locator(locators["add-item-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Add Item button clicked');
  }


  /**
   * Click Create button

   */
  async clickCreateButton() {
    await this.page.locator(locators["create-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Create button clicked');
  }

  async clickCompanyButton(){
    await this.page.locator(locators["company-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Company button clicked');
  }

  /**
   * Fill item name field
   * @param {string} itemName - The item name to fill
   */
  async fillItemName(itemName) {
    await this.page.locator(locators["item-name"]).click();
    await this.page.locator(locators["item-name"]).fill("item-name 1");
    await expect(this.page.locator(locators["item-name"])).toHaveValue("item-name 1");
    console.log(`✅ Item name filled: ${itemName}`);
  }
  /**
   * Select the item status (in stock/out of stock)
   * @param {string} status - The status to select (e.g., "In Stock" or "Out of Stock")
   */
  async selectTheStatus(status) {
    await this.page.locator(locators["instock-dropdown"]).click();
    await this.page.getByRole('option', { name: status }).click();
    console.log(`✅ Item status selected: ${status}`);
  }
  /**
   * Select a menu from the menu dropdown
   * @param {string} menuName - The name of the menu to select
   */
  async selectMenu(menuName) {
    await this.page.locator(locators["select-menu-dropdown"]).click();
    await this.page.getByRole('option', { name: Italian }).click();
    console.log(`✅ Menu selected: ${Italian}`);
  }

  /**
   * Fill item description
   * @param {string} description - The item description to fill
   */
  async fillItemDescription(description) {
    if (description && description.trim() !== '') {
      await this.page.locator(locators["description-box-item"]).click();
      await this.page.locator(locators["description-box-item"]).fill("Description 1");
      console.log(`✅ Item description filled: ${description}`);
    }
  }

  /**
   * Select item category
   * @param {string} categoryName - The category name to select
   */
  async selectItemCategory(categoryName) {
    await this.page.locator(locators["select-category-dropdown"]).click();
    await this.page.getByRole('option', { name: "Category 1" }).click();
    console.log(`✅ Category selected: ${categoryName}`);
  }

  /**
   * Select item status (in stock/out of stock)
   * @param {string} status - The status to select
   */
  async selectItemStatus(status) {
    await this.page.locator(locators["instock-dropdown"]).click();
    await this.page.getByRole('option', { name: "In Stock" }).click();
    console.log(`✅ Item status selected: ${status}`);
  }

  /**
   * Fill item price
   * @param {string} price - The price to fill
   */
  async fillItemPrice(price) {
    await this.page.locator(locators["price-dropdown"]).click();
    await this.page.locator(locators["enter-custom-price"]).fill("3.99");
    console.log(`✅ Item price filled: ${price}`);
  }

  /**
   * Select item cuisine
   * @param {string} cuisine - The cuisine to select
   */
  async selectItemCuisine(cuisine) {
    await this.page.locator(locators["select-cuisine-dropdown"]).click();
    await this.page.getByRole('option', { name: "Cuisine 1" }).click();
    console.log(`✅ Cuisine selected: ${cuisine}`);
  }

  /**
   * Select serve people count
   * @param {string} serveCount - The serve count to select
   */
  async selectServePeople(serveCount) {
    await this.page.locator(locators["serve-people"]).click();
    await this.page.getByRole('option', { name: "1" }).click();
    console.log(`✅ Serve people selected: ${serveCount}`);
  }

  /**
   * Select item ingredients
   * @param {Array} ingredients - Array of ingredient names to select
   */
  async selectItemIngredients(ingredients) {
    if (ingredients && ingredients.length > 0) {
      await this.page.locator(locators["select-ingredients"]).click();
      for (const ingredient of ingredients) {
        await this.page.getByRole('option', { name: "Ingredient 1" }).click();
      }
      console.log(`✅ Ingredients selected: ${ingredients.join(', ')}`);
    }
  }

  /**
   * Select item tags
   * @param {Array} tags - Array of tag names to select
   */
  async selectItemTags(tags) {
    if (tags && tags.length > 0) {
      await this.page.locator(locators["item-tag"]).click();
      for (const tag of tags) {
        await this.page.getByRole('option', { name: "Tag 1" }).click();
      }
      console.log(`✅ Tags selected: ${tags.join(', ')}`);
    }
  }

  /**
   * Select item customizations
   * @param {Array} customizations - Array of customization names to select
   */
  async selectItemCustomizations(customizations) {
    if (customizations && customizations.length > 0) {
      await this.page.locator(locators["select-customizations"]).click();
      for (const customization of customizations) {
        await this.page.getByRole('option', { name: "Customization 1" }).click();
      }
      console.log(`✅ Customizations selected: ${customizations.join(', ')}`);
    }
  }

  /**
   * Fill stock count
   * @param {string} stockCount - The stock count to fill
   */
  async fillStockCount(stockCount) {
    if (stockCount && stockCount.trim() !== '') {
      await this.page.locator(locators["stock-count"]).fill("10");
      console.log(`✅ Stock count filled: ${stockCount}`);
    }
  }

  /**
   * Upload item image
   * @param {string} imagePath - Path to the image file
   * @param {string} imageName - Name of the image for logging
   */
  async uploadItemImage(imagePath, imageName) {
    console.log(`📸 Uploading ${imageName}...`);
    await this.page.getByText('Choose image').click();
    await this.page.setInputFiles('input[type="file"]', "itemimagecompany.png");
    await this.page.waitForTimeout(2000);
    await expect(this.page.getByRole('img', { name: 'Upload image*' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Upload' }).click();
    
    // Wait for upload to complete
    try {
      await this.page.waitForFunction(() => {
        const uploadModal = document.querySelector('[role="dialog"], .MuiDialog-root, .MuiModal-root');
        return !uploadModal || uploadModal.style.display === 'none';
      }, { timeout: 30000 });
      console.log(`✅ ${imageName} uploaded successfully`);
    } catch (error) {
      console.log(`⚠️ Upload timeout for ${imageName}, continuing...`);
    }
  }

  /**
   * Save the item
   */
  async saveItem() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Item saved successfully');
  }

  /**
   * Create a complete company item
   * @param {Object} itemData - Item data object
   */
  async createCompanyItem(itemData) {
    const itemName = itemData["item-name 1"];
    const description = itemData["description 1"];
    const category = itemData["Category 1"];
    const status = itemData["in stock 1"];
    const price = itemData["Price 1"];
    const cuisine = itemData["Cuisine 1"];
    const servePeople = itemData["Served People 1"];
    const ingredients = itemData["Ingredients 1"];
    const tags = itemData["tags 1"];
    const customizations = itemData["Customizations 1"];
    const stockCount = itemData["stock-count"];
    const imagePath = itemData["itemimagecompany.png"];
    const imageName = itemData["itemimagecompany.png"];
    
    console.log(`🍽️ Creating company item: ${itemName}`);
    
    // Fill basic item information
    await this.fillItemName(itemName);
    
    if (description) {
      await this.fillItemDescription(description);
    }
    
    if (category) {
      await this.selectItemCategory(category);
    }
    
    if (status) {
      await this.selectItemStatus(status);
    }
    
    if (price) {
      await this.fillItemPrice(price);
    }
    
    if (cuisine) {
      await this.selectItemCuisine(cuisine);
    }
    
    if (servePeople) {
      await this.selectServePeople(servePeople);
    }
    
    if (ingredients) {
      await this.selectItemIngredients(ingredients);
    }
    
    if (tags) {
      await this.selectItemTags(tags);
    }
    
    if (customizations) {
      await this.selectItemCustomizations(customizations);
    }
    
    if (stockCount) {
      await this.fillStockCount(stockCount);
    }
    
    if (imagePath && imageName) {
      await this.uploadItemImage(imagePath, imageName);
    }
    
    // Save item
    await this.saveItem();
    
    console.log(`✅ Company item "${itemName}" created successfully`);
  }

  /**
   * Check if item creation was successful
   * @param {string} itemName - The item name to verify
   */
  async verifyItemCreated(itemName) {
    // Wait for success message or redirect
    await this.page.waitForLoadState('networkidle');
    
    // Check if we're back on the items list page
    const isOnItemsPage = this.page.url().includes('/items');
    if (isOnItemsPage) {
      console.log(`✅ Item "${itemName}" creation verified - on items page`);
      return true;
    }
    
    console.log(`⚠️ Item "${itemName}" creation status unclear`);
    return false;
  }
}

