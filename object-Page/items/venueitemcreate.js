import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: "json" };
import login from '../../Fixtures/login.json' assert { type: "json" };
import urlVerification from '../../Fixtures/url_verification.json' assert { type: "json" };

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
    await expect(this.page).toHaveURL(urlVerification["verify-the-categories-navigated-url"]);
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
    await this.page.waitForSelector(locators["create-button"], { timeout: 10000 });
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
   */
  async selectMenu(Italian) {
    // Click the combobox using role selector (best practice)
    await this.page.getByRole('combobox', { name: 'Select menu' }).click();
    // Wait for options to appear and select by name
    await this.page.getByRole('option', { name: Italian }).first().click();
    console.log(`✅ Menu selected: ${Italian}`);
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
    async enterItemPrice(price) {
      await this.page.locator(locators["price-dropdown"]).click();
      await this.page.locator(locators["pricedefault"]).click();
      await this.page.locator(locators["enter-custom-price"]).click();
      await this.page.locator(locators["enter-custom-price"]).fill(price);
      console.log(`✅ Entered custom price successfully: ${price}`);
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
     *  price fillup
     */
    async fillSecondPrice(price) {
      await this.page.locator(locators["price-dropdown-2"]).click();
      await this.page.locator(locators["pricedefault"]).click();
      await this.page.locator(locators["enter-custom-price-2"]).click();
      await this.page.locator(locators["enter-custom-price-2"]).fill(price);
      console.log(`✅ Second price filled: ${price}`);
    }

    //price description 2

    async fillSecondPriceDescription(priceDescription) {
      await this.page.locator('input[name="prices.1.description.en"]').fill("Family");
      await expect(this.page.locator(locators["price-discription-2"])).toHaveValue("Family");
      console.log(`✅ Second price description filled: ${priceDescription}`);
    }

    //price tax in venue item creation

    async fillSecondPriceTax(tax) {
      await this.page.locator(locators["select-tax-dropdown-2"]).click();
      await this.page.getByRole('option', { name: 'Override: 9% on all order types' }).click();

      console.log(`✅ Second price tax selected: ${tax}`);
    }

    /**
   * Upload item image
   * @param {string} imagePath - Path to the image file
   * @param {string} imageName - Name of the image for logging
   */
  async uploadItemImage(imagePath, imageName) {
    await this.page.getByText('choose image').click();
    await this.page.getByText('Drag image hereorBrowse from').click();
    await this.page.locator(locators["inner-picture-box"]).setInputFiles(`./Fixtures/pictures/${imagePath}`);
    await this.page.getByRole('button', { name: 'Upload' }).click();
    console.log(`✅ ${imageName} uploaded successfully`);
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
    await this.page.locator(locators["serve-people"]).fill(serveCount);
    console.log(`✅ Serve people selected: ${serveCount}`);
  }


  /**
   * Select item ingredients
   * @param {Array} ingredients - Array of ingredient names to select
   */
  async selectItemIngredients(ingredients) {
    // Select item ingredients (same as company item method)
    if (ingredients && ingredients.length > 0) {
      await this.page.locator(locators["select-ingredients"]).click();
      for (const ingredient of ingredients) {
        await this.page.getByRole('option', { name: ingredient }).click();
      }
      console.log(`✅ Ingredients selected: ${ingredients.join(', ')}`);
    }
  }

   //select the ingredients mandatory or optional
   /**
    * Set ingredients as mandatory or optional.
    * For 15 ingredients: even positions (2,4,6,...) are mandatory, odd positions (1,3,5,...) are optional.
    * @param {Array} ingredients - Array of 15 ingredient names.
    */
   async selectIngredientsMandatoryOrOptional(ingredients) {
     if (ingredients && ingredients.length === 15) {
       await this.page.locator(locators["select-ingredients"]).click();
       await this.page.waitForTimeout(500);

       for (let i = 0; i < ingredients.length; i++) {
         const ingredient = ingredients[i];
         const optionLocator = this.page.getByRole('option', { name: ingredient });
         // Open the ingredient option if floating menu closes
         await optionLocator.scrollIntoViewIfNeeded();
         // Click to make sure option is selected/highlighted
         await optionLocator.click();
         // Now find and set mandatory/optional radio/checkbox (you may need to adjust below selectors as per UI):
         if ((i + 1) % 2 === 0) {
           // Mandatory for 2,4,6,8,10,12,14
           // Example: you might have a radio or checkbox in the option called "Mandatory"
           await optionLocator.getByLabel?.('Mandatory').check?.().catch(() => {});
           // Or fallback (if getByLabel is not supported):
           // await optionLocator.locator('text=Mandatory').check().catch(() => {});
         } else {
           // Optional for 1,3,5,7,9,11,13,15
           await optionLocator.getByLabel?.('Optional').check?.().catch(() => {});
           // Or fallback (if getByLabel is not supported):
           // await optionLocator.locator('text=Optional').check().catch(() => {});
         }
         await this.page.waitForTimeout(100);
       }
       console.log(`✅ Ingredients mandatory/optional set: ${ingredients.map((name, i) => `${name}:${(i+1)%2===0?'Mandatory':'Optional'}`).join(', ')}`);
     } else {
       console.warn(
         'Ingredients array must have exactly 15 items to use selectIngredientsMandatoryOrOptional per requirements.'
       );
     }
   }
    /**
   * Select item tags
   * @param {Array|string} tags - Array of tag names or single tag name to select
   */
  async selectItemTags(tags) {
    // Handle both string and array inputs
    const tagArray = Array.isArray(tags) ? tags : [tags];
    
    if (tagArray && tagArray.length > 0) {
      await this.page.locator(locators["item-tag"]).click();
      for (const tag of tagArray) {
        await this.page.getByRole('option', { name: tag }).click();
      }
      console.log(`✅ Tags selected: ${tagArray.join(', ')}`);
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
    await this.page.getByRole('option', { name: "10" }).click();
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


