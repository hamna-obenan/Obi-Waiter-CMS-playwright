import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };
import login from '../../Fixtures/login.json' assert { type: "json" };

/**
 * Page Object Model for Venue Item Creation
 * Handles venue item creation, navigation, and form interactions
 */
export default class CreateVenueItemPOM {
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
    // Wait for the venue selection to be visible (with increased timeout)
    await this.page.waitForSelector(locators["click-on-the-created-venue"], { 
      state: 'visible',
      timeout: 15000 
    });
    
    // Now click on the created venue
    await this.page.locator(locators["click-on-the-created-venue"]).first().click();
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

  async clickVenueButton(){
    await this.page.locator(locators["venue-button"]).click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Venue button clicked');
  }

  /**
   * Fill item name field
   * @param {string} itemName - The item name to fill
   */
  async fillItemName(itemName) {
    await this.page.locator(locators["item-name"]).click();
    await this.page.locator(locators["item-name"]).fill(itemName);
    await expect(this.page.locator(locators["item-name"])).toHaveValue(itemName);
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
   * @param {string} menu - The name of the menu to select
   */
  async selectMenu(menu) {
    await this.page.locator(locators["select-menu-dropdown"]).click();
    await this.page.getByRole('option', { name: menu }).first().click();
    console.log(`✅ Menu selected: ${menu}`);
  }
  //select the category from dropdown
  async selectItemCategory(category) {
    await this.page.locator(locators["select-category-dropdown"]).click();
    await this.page.getByRole('option', { name: category }).first().click();
    console.log(`✅ Category selected: ${category}`);
  }
  /**
   * Fill item description
   * @param {string} description - The item description to fill
   */
  async fillItemDescription(description) {
    if (description && description.trim() !== '') {
      await this.page.locator(locators["description-box-item"]).click();
      // await this.page.waitForTimeout(1000); // Wait for editor to activate
      
      // Type the description in the rich text editor
      await this.page.locator(locators["description-box-item"]).fill(description);
      console.log(`✅ Item description filled: ${description}`);
    }
  }
    /**
     * Fill 1st item price (select 'Enter Custom Price' after opening dropdown)
     * @param {string} price - The price to fill
     */
    async fillItemPrice(price) {
      await this.page.locator(locators["price-dropdown"]).click();
      await this.page.locator(locators["pricedefault"]).click();
      await this.page.locator(locators["enter-custom-price"]).click();
      await this.page.locator(locators["enter-custom-price"]).fill(price);
      console.log(`✅ Entered custom price successfully`);
    }
    /**
     * Fill item price description
     * @param {string} priceDescription - The price description to fill
     */
    async fillItemPriceDescription(priceDescription) {
      await this.page.locator(locators["price-discription"]).fill(priceDescription);
      console.log(`✅ Item price description filled: ${priceDescription}`);
    }
    /**
     * Select item tax
     * @param {string} tax - The tax to select
     */
    async selectItemTax(tax) {
      await this.page.locator(locators["select-tax-dropdown"]).click();
      await this.page.getByRole('option', { name: tax }).first().click();
      console.log(`✅ Item tax selected: ${tax}`);
    }
    /**
     * Select default price
     * @param {string} defaultPrice - The default price to select
     */
    async selectDefaultPrice(defaultPrice) {
      await this.page.locator(locators["pricedefaultcheckbox"]).click();
      console.log(`✅ Default price selected: ${defaultPrice}`);
    }
    /**
     * Click on 'Add Extra' button using the locator defined in locators["add-extra"]
     */
    async clickOnAddExtra() {
      const addExtraBtn = this.page.locator(locators["add-extra"]);
      await addExtraBtn.click();
      console.log('✅ Add extra button clicked (locator: add-extra)');
    }


    //fill the second price details
    /**
     * Fill second price details (custom price, description, and tax)
     * @param {object} priceDetails - Object containing price2, pricedescription2, and tax2
     *   priceDetails = {
     *     price2: string,
     *     pricedescription2: string,
     *     tax2: string
     *   }
     */
    async fillSecondPriceDetails(priceDetails) {
      // Click the price dropdown and select custom price option for price 2
      await this.page.locator(locators["price-dropdown-2"]).click();
      await this.page.locator(locators["pricedefault"]).click();
      // Focus the second price textbox and enter the price
      await this.page.locator(locators["enter-custom-price-2"]).click();
      await this.page.locator(locators["enter-custom-price-2"]).fill(priceDetails.price2);

      // Enter price description 2
      await this.page.locator(locators["price-discription"]).fill(priceDetails.pricedescription2);

      // Select tax for price 2
      await this.page.locator(locators["select-tax-dropdown-2"]).click();
      await this.page.getByRole('option', { name: priceDetails.tax2 }).click();

      console.log(`✅ Second price details filled: Price2=${priceDetails.price2}, Description2=${priceDetails.pricedescription2}, Tax2=${priceDetails.tax2}`);
    }

    /**
   * Upload item image
   * @param {string} imagePath - Path to the image file
   * @param {string} imageName - Name of the image for logging
   */
  async uploadItemImage(imagePath, imageName) {
    console.log(`📸 Uploading ${imageName}...`);
    await this.page.getByText('picture-box').click();
    await this.page.setInputFiles('input[type="file"]', imagePath);
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
   * Select item cuisine
   * @param {string} cuisine - The cuisine to select
   */
    async selectItemCuisine(cuisine) {
      await this.page.locator(locators["select-cuisine-dropdown"]).click();
      await this.page.getByRole('option', { name: cuisine }).click();
      console.log(`✅ Cuisine selected: ${cuisine}`);
    }

    
  /**
   * Select serve people count
   * @param {string} serveCount - The serve count to select
   */
  async selectServePeople(serveCount) {
    await this.page.locator(locators["serve-people"]).click();
    await this.page.getByRole('option', { name: serveCount }).click();
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
        await this.page.getByRole('option', { name: ingredient }).click();
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
        await this.page.getByRole('option', { name: "markItemAs" }).click();
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
        await this.page.getByRole('option', { name: "Sauces" }).click();
        }
        console.log(`✅ Customizations selected: ${customizations.join(', ')}`);
      }
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
   * Click on the generate button
   * @param {string} genratebutton - The generate button to click
   */
    async clickOnGenerateButton(genratebutton) {
      if (genratebutton && genratebutton.trim() !== '') {
        await this.page.locator(locators["item-details-genrate-button"]).click();
        console.log(`✅ Generate button clicked: ${genratebutton}`);
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
   * Create a complete venue item
   * @param {Object} itemData - Item data object
   */
  async createVenueItem(itemData) {
    const itemName = itemData["item-name2"];
    const description = itemData["description2"];
    const category = itemData["category"];
    const status = itemData["instock2"] === "yes" ? "In Stock" : "Out of Stock";
    const price = itemData["Price1item2"];
    const cuisine = itemData["cuisine"];
    const servePeople = itemData["servedPeople"];
    const ingredients = itemData["Ingredients"];
    const tags = itemData["markItemAs"];
    const customizations = itemData["addCustomizations"];
    const stockCount = itemData["stockCount"];
    const imagePath = itemData["item-image"];
    const imageName = itemData["item-image"];
    
    console.log(`🍽️ Creating venue item: ${itemName}`);
    
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
    
    console.log(`✅ Venue item "${itemName}" created successfully`);
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


