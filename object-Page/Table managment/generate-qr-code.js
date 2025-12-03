import { expect } from '@playwright/test';
import locators from '../../Fixtures/locators.json' assert { type: 'json' };
import urlVerification from '../../Fixtures/url_verification.json' assert { type: 'json' };

/**
 * Page Object Model for Table Management > Generate QR Code flow
 */
export default class TableManagementPOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to the table management tab from the sidebar
   */
  async openTableManagementTab() {
    await this.page.waitForSelector(locators['table-management-button'], { timeout: 15000 });
    await this.page.locator(locators['table-management-button']).click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }
}