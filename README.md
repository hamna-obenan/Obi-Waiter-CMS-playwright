# Obi-Waiter CMS - Playwright Test Automation Suite

## 🚀 Overview

This repository contains the comprehensive automated testing suite for the **Obi-Waiter CMS** application. Built with Playwright, it provides end-to-end testing across multiple browsers and environments using the Page Object Model (POM) pattern.

### Key Features
- ✅ **Page Object Model (POM)** architecture for maintainability
- ✅ **Multi-environment support** (Development, Staging, Production)
- ✅ **Data-driven testing** with JSON fixtures
- ✅ **Comprehensive test coverage** across all CMS modules
- ✅ **Detailed reporting** (HTML, JSON, JUnit)
- ✅ **Parallel execution** for faster test runs
- ✅ **Video recording** and screenshots on failure

---

## 📁 Project Structure

```
Obi-Waiter-CMS-playwright-main/
├── config/                      # Configuration files
│   ├── environments.js          # Environment-specific settings
│   ├── global-setup.js          # Global test setup hooks
│   └── global-teardown.js       # Global test teardown hooks
│
├── Fixtures/                    # Test data and locators
│   ├── Categories.json          # Category test data
│   ├── customization.json       # Customization test data
│   ├── Ingredients.json         # Ingredient test data
│   ├── items.json               # Menu item test data
│   ├── locators.json            # UI element locators
│   ├── login.json               # Login credentials
│   ├── menu.json                # Menu test data
│   ├── sign up.json             # Signup form data
│   ├── tags.json                # Tag test data
│   ├── Venue.json               # Venue test data
│   └── pictures/                # Test images for upload
│       ├── category-comapany-image.png
│       ├── coverimage.png
│       ├── itemimagecompany.png
│       ├── venue-logo.png
│       └── ...
│
├── object-Page/                 # Page Object Model classes
│   ├── Categories/              # Category POM classes
│   │   ├── createcategorycomapnypom.js
│   │   ├── createcategoryvenue.js
│   │   └── duplicatecategoryvenue.js
│   ├── Customizations/          # Customization POM classes
│   │   ├── createcustomizationvenuepom.js
│   │   └── customizationpom.js
│   ├── Ingredients/             # Ingredient POM classes
│   │   ├── ingredientpom.js
│   │   └── ingredientsvenue.js
│   ├── items/                   # Item POM classes
│   │   └── createcomapnyitem.js
│   ├── menu/                    # Menu POM classes
│   │   ├── duplicatecompanymenu.js
│   │   ├── duplicatmenuwithvenue.js
│   │   ├── menupom.js
│   │   └── menuvenuecreate.js
│   ├── pomlogin/                # Login POM classes
│   │   ├── pomlogin1.js
│   │   ├── pomlogin2.js
│   │   ├── pomlogin3.js
│   │   └── pomlogin4.js
│   ├── pomsignup/               # Signup POM classes
│   │   ├── pomsign1.js
│   │   ├── pomsign2.js
│   │   └── signuppage-pom.js
│   ├── Tags/                    # Tag POM classes
│   │   ├── createtagcompany-pom.js
│   │   └── createvenuetag.js
│   └── venue/                   # Venue POM classes
│       ├── addvenue-pom.js
│       └── venue1-pom.js
│
├── tests/                       # Test specification files
│   ├── Categories/              # Category tests
│   │   ├── createcategorycompany.spec.js
│   │   ├── createcategoryvenue.spec.js
│   │   ├── duplicatecategorycompany.spec.js
│   │   └── duplicatecategoryvenue.spec.js
│   ├── Customizations/          # Customization tests
│   │   ├── createcustomizationcompany.spec.js
│   │   └── createcustomizationvenue.spec.js
│   ├── DealManagment/           # Deal / promotion rules
│   │   ├── amountoff.spec.js
│   │   ├── buyone.spec.js
│   │   ├── combo-deal.spec.js
│   │   └── flat-percentage-off.spec.js
│   ├── Ingredients/             # Ingredient tests
│   │   ├── createingredientscompany.spec.js
│   │   └── createingredientvenue.spec.js
│   ├── Items/                   # Item tests
│   │   ├── createcomapanyitem.spec.js
│   │   └── venueitem.spec.js
│   ├── login/                   # Login tests
│   │   ├── login1.spec.js
│   │   ├── login2.spec.js
│   │   ├── login3.spec.js
│   │   └── login4.spec.js
│   ├── Menu/                    # Menu tests
│   │   ├── AI-genrated-menu.spec.js
│   │   ├── ai-gerneated-menu-assertion.spec.js
│   │   ├── createmenu.spec.js
│   │   ├── createmenuwithvenue.spec.js
│   │   ├── duplicatecompanymenu.spec.js
│   │   └── duplicatemenuewithvenue.spec.js
│   ├── promo-setting/           # Promo creation
│   │   └── createpromo.spec.js
│   ├── signup-form/             # Signup tests
│   │   ├── sign1.spec.js
│   │   ├── signup-success.spec.js
│   │   ├── signup.spec.js
│   │   └── signup2.spec.js
│   ├── table-managment/         # Table / QR tests
│   │   ├── add-table.spec.js
│   │   └── generate-qr-code.spec.js
│   ├── Tags/                    # Tag tests
│   │   ├── createtagcompanytag.spec.js
│   │   └── createvenuetag.spec.js
│   └── Venue/                   # Venue tests
│       ├── createvenue.spec.js
│       ├── mandatorydataentry.spec.js
│       ├── update-the-venue-company.spec.js
│       └── venue1.spec.js
│
├── utils/                       # Utility functions
│   └── login-helper.js          # Reusable login helper
│
├── scripts/                     # Test execution scripts
│   ├── run-environment-tests.js # Environment-based test runner
│   └── run-tests.js             # General test runner
│
├── reports/                     # Generated test reports
│   ├── html/                    # HTML reports
│   ├── json/                    # JSON reports
│   └── junit/                   # JUnit XML reports
│
├── test-results/                # Test execution artifacts
│
├── env.example                  # Example environment file
├── env.development              # Development environment config
├── env.staging                  # Staging environment config
├── env.production               # Production environment config
├── playwright.config.js         # Playwright configuration
└── package.json                 # Project dependencies & scripts
```

---

## 🛠️ Setup

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** or **yarn**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/obi-waiter/automation.git
cd Obi-Waiter-CMS-playwright-main

# Install all dependencies and browsers
npm run setup

# Or install separately
npm run install:deps      # Install npm dependencies
npm run install:browsers  # Install Playwright browsers
```

---

## 🧪 Running Tests

### Quick Start

```bash
# Run all tests in development environment
npm test

# Run with UI mode for debugging
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug specific test
npm run test:debug
```

### Environment-Specific Tests

#### Development Environment
```bash
npm run test:smoke              # Smoke tests
npm run test:regression         # Regression tests
npm run test:all                # All tests
npm run test:venue              # Venue module tests
npm run test:login              # Login tests
npm run test:mobile             # Mobile tests
npm run test:api                # API tests
npm run test:visual             # Visual tests
npm run test:all-browsers       # Cross-browser testing
```

#### Staging Environment
```bash
npm run test:staging            # All staging tests
npm run test:staging:smoke      # Staging smoke tests
npm run test:staging:regression # Staging regression tests
npm run test:staging:venue      # Staging venue tests
```

#### Production Environment
```bash
npm run test:production                # All production tests
npm run test:production:smoke          # Production smoke tests
npm run test:production:regression     # Production regression tests
npm run test:production:venue          # Production venue tests
```

### Module-Specific Tests

```bash
# Run specific test modules
npx playwright test tests/Categories/
npx playwright test tests/Items/
npx playwright test tests/Menu/
npx playwright test tests/Venue/
npx playwright test tests/login/

# Run specific test file
npx playwright test tests/Items/createcomapanyitem.spec.js

# Run tests matching pattern
npx playwright test --grep "Create Company"
```

---

## 🌍 Environments

### Development
- **Base URL:** Configured in `env.development`
- **Purpose:** Local development and debugging
- **Features:** Full debug logging, test data enabled
- **Usage:** Default environment for test development

### Staging
- **Base URL:** Configured in `env.staging`
- **Purpose:** Pre-production testing
- **Features:** Production-like environment, test data available
- **Usage:** Final validation before production

### Production
- **Base URL:** Configured in `env.production`
- **Purpose:** Production monitoring
- **Features:** Live environment, minimal test data
- **Usage:** Smoke tests and critical path validation

### Setting Up Environments

```bash
# Copy environment file
npm run env:dev        # Development
npm run env:staging    # Staging
npm run env:prod       # Production

# Or manually copy
cp env.development .env
cp env.staging .env
cp env.production .env
```

### Environment File Structure

```env
# env.development example
BASE_URL=https://develop.d20aue3nu6xt33.amplifyapp.com
API_URL=https://api-dev.obi-waiter.com
TEST_USER_EMAIL=hamna123@gmail.com
TEST_USER_PASSWORD=123456
NODE_ENV=development
PLAYWRIGHT_HEADLESS=false
ENABLE_TEST_DATA=true
```

---

## 📊 Test Modules

Current suite: **38 spec files** across the modules below (as discovered by `npx playwright test --list`).

### 1. Authentication (8 tests)
- Login variants (4) in `tests/login/`
- Signup flows (4) in `tests/signup-form/`
- POM: `object-Page/pomlogin/`, `object-Page/pomsignup/`

### 2. Venue Management (4 tests)
- Create venue, mandatory data, update, end-to-end flow
- Location: `tests/Venue/`
- POM: `object-Page/venue/`
- Data: `Fixtures/Venue.json`

### 3. Menu Management (6 tests)
- Create menu (company/venue), duplicates, AI menu generation and assertions
- Location: `tests/Menu/`
- POM: `object-Page/menu/`
- Data & assets: `Fixtures/menu.json`, `Fixtures/url_verification.json`, `Fixtures/edit-locators.json`, `Fixtures/venue-edit-data.json`, `Fixtures/pictures/ai-genrated-menu-picture.jpeg`

### 4. Category Management (4 tests)
- Create and duplicate categories (company/venue)
- Location: `tests/Categories/`
- POM: `object-Page/Categories/`
- Data: `Fixtures/Categories.json`

### 5. Item Management (2 tests)
- Create company item, create venue item
- Location: `tests/Items/`
- POM: `object-Page/items/`
- Data: `Fixtures/items.json`

### 6. Ingredient Management (2 tests)
- Company and venue ingredient creation
- Location: `tests/Ingredients/`
- POM: `object-Page/Ingredients/`
- Data: `Fixtures/Ingredients.json`

### 7. Customization Management (2 tests)
- Company and venue customization creation
- Location: `tests/Customizations/`
- POM: `object-Page/Customizations/`
- Data: `Fixtures/customization.json`

### 8. Deal Management (4 tests)
- Amount off, buy one/combo, flat percentage off
- Location: `tests/DealManagment/`
- POM: Uses shared locators and flows in `object-Page/`
- Data: `Fixtures/deal-managment.json`

### 9. Promo Setting (1 test)
- Create promo with image upload and item targeting
- Location: `tests/promo-setting/createpromo.spec.js`
- Data: `Fixtures/promo.json`, `Fixtures/pictures/percentage-off.png`

### 10. Table Management (2 tests)
- Add table and generate QR code
- Location: `tests/table-managment/`
- POM: `object-Page/Table managment/`

### 11. Tag Management (2 tests)
- Company and venue tag creation
- Location: `tests/Tags/`
- POM: `object-Page/Tags/`
- Data: `Fixtures/tags.json`

### 12. AI-Generated Menu (covered in Menu module)
- Upload scanned menu, verify generated categories/items
- Execution: `npx playwright test tests/Menu/AI-genrated-menu.spec.js` and `tests/Menu/ai-gerneated-menu-assertion.spec.js`

---

## 📈 Test Reports

### Viewing Reports

```bash
# Open HTML report in browser
npm run test:report

# Reports are generated automatically after test runs
# Location: reports/html/index.html
```

### Report Types

1. **HTML Report** (`reports/html/`)
   - Interactive web interface
   - Test results with screenshots
   - Video recordings
   - Trace viewer integration

2. **JSON Report** (`reports/json/results.json`)
   - Machine-readable format
   - Integration with CI/CD tools
   - Custom reporting scripts

3. **JUnit Report** (`reports/junit/results.xml`)
   - Standard XML format
   - Jenkins integration
   - CI/CD pipeline compatibility

### Artifacts

- **Screenshots:** Captured on test failure
- **Videos:** Recorded for all tests
- **Traces:** Available for debugging failures
- **Error Context:** Detailed failure information

---

## 🎯 Page Object Model (POM)

### Architecture

This project follows the **Page Object Model** pattern for test maintainability:

```javascript
// Example: Item POM usage in tests
import CreateCompanyItemPOM from "../../object-Page/items/createcomapnyitem.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import items from "../../Fixtures/items.json" assert { type: "json" };

test("Create Company Item", async ({ page }) => {
  const createCompanyItemPOM = new CreateCompanyItemPOM(page);
  const itemData = items[0];
  
  // Use POM methods
  await createCompanyItemPOM.fillItemName(itemData["item-name1"]);
  await createCompanyItemPOM.selectMenu(itemData["menu"]);
  await createCompanyItemPOM.selectItemCategory(itemData["Category"]);
  
  // Or use high-level method
  await createCompanyItemPOM.createCompanyItem(itemData);
});
```

### POM Structure

Each module has dedicated POM classes:
- **Separation of Concerns:** UI logic separated from test logic
- **Reusability:** Methods used across multiple tests
- **Maintainability:** Easy to update when UI changes
- **Readability:** Tests are more descriptive

### Locators Management

All UI locators are centralized in `Fixtures/locators.json`:

```json
{
  "item-name": "[name='item-name']",
  "select-menu-dropdown": "[placeholder='Select menu']",
  "save-button": "button[name='Save']"
}
```

**Benefits:**
- Single source of truth
- Easy bulk updates
- No hardcoded selectors in tests

---

## 🔧 Configuration

### Playwright Configuration (`playwright.config.js`)

```javascript
{
  testDir: './tests',
  timeout: 60000,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/results.json' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }]
  ],
  use: {
    baseURL: config.urls.base,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on',
    actionTimeout: 10000,
    navigationTimeout: 30000
  }
}
```

### Environment Configuration (`config/environments.js`)

Comprehensive environment management including:
- Application settings
- URLs and endpoints
- Test data configuration
- Database settings
- Authentication config
- File upload settings
- Third-party service keys
- Logging and monitoring
- Playwright-specific settings

---

## 📝 Writing Tests

### Test Template

```javascript
import { test, expect } from "@playwright/test";
import { performLogin } from "../../utils/login-helper.js";
import YourPOM from "../../object-Page/your-module/your-pom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import testData from "../../Fixtures/your-data.json" assert { type: "json" };

test.describe("Feature Name", () => {
  
  test("Test Scenario Description", async ({ page }) => {
    test.setTimeout(120000); // Set timeout if needed
    
    // Initialize POM
    const yourPOM = new YourPOM(page);
    
    // Perform login
    await performLogin(page, "user@example.com", "password");
    
    // Navigate and interact
    await yourPOM.navigateToSection();
    
    // Assertions
    await expect(page.locator(locators["element"])).toBeVisible();
    
    // Use test data
    const data = testData[0];
    await yourPOM.fillForm(data);
    
    // Verify success
    console.log('✅ Test completed successfully');
  });
});
```

### Best Practices

1. **Use POM methods** instead of direct page interactions
2. **Import test data** from JSON fixtures
3. **Add descriptive console logs** for test flow visibility
4. **Use assertions** after critical actions
5. **Handle async operations** with proper waits
6. **Set appropriate timeouts** for long-running operations
7. **Use login helper** for authentication
8. **Keep tests independent** and isolated

---

## 🔍 Debugging

### Debug Mode

```bash
# Run tests with Playwright Inspector
npm run test:debug

# Run specific test in debug mode
npx playwright test tests/Items/createcomapanyitem.spec.js --debug

# Run with trace viewer
npx playwright test --trace on
```

### UI Mode (Recommended)

```bash
# Interactive test development
npm run test:ui
```

**Features:**
- Watch mode
- Time travel debugging
- Pick locators
- View test timeline
- Inspect DOM snapshots

### Console Logging

Tests include extensive logging:
```
✅ Login completed successfully
🏢 Step 1: Click on created venue
📋 Step 2: Navigate to menu page
✅ Item name filled: Chicken Sandwich
```

---

## 🚀 CI/CD Integration

### GitHub Actions

Create `.github/workflows/tests.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm run setup
      - name: Run tests
        run: npm run test:all
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: reports/
```

### Environment-Specific Pipelines

- **Development:** Every commit
- **Staging:** On merge to staging branch
- **Production:** On merge to main (smoke tests only)

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Test Timeouts
```bash
# Increase timeout in test
test.setTimeout(120000);

# Or globally in playwright.config.js
timeout: 60000
```

#### 2. Element Not Found
- Check `Fixtures/locators.json` for correct selector
- Use Playwright Inspector to pick selector
- Add proper wait conditions

#### 3. Authentication Failures
- Verify credentials in `Fixtures/login.json`
- Check BASE_URL in environment file
- Ensure login helper is imported correctly

#### 4. File Upload Issues
- Verify file path: `./Fixtures/pictures/filename.png`
- Ensure files exist in Fixtures/pictures/
- Use correct setInputFiles() method

#### 5. Flaky Tests
- Add `waitForLoadState('networkidle')`
- Remove `waitForTimeout()` calls
- Use proper Playwright locators with auto-waiting

### Debug Commands

```bash
# Clean test results
npm run clean

# Run specific test with full logs
DEBUG=pw:api npx playwright test tests/Items/createcomapanyitem.spec.js

# Generate trace for analysis
npx playwright test --trace on

# View existing trace
npx playwright show-trace trace.zip
```

---

## 📚 Resources

### Documentation
- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

### Useful Commands

```bash
# Generate new test
npx playwright codegen https://your-app-url.com

# Update snapshots
npx playwright test --update-snapshots

# List all tests
npx playwright test --list

# Run tests by tag
npx playwright test --grep @smoke
```

---

## 👥 Contributing

### Adding New Tests

1. Create test file in appropriate `tests/` subdirectory
2. Create corresponding POM class in `object-Page/`
3. Add test data to appropriate JSON file in `Fixtures/`
4. Update locators in `Fixtures/locators.json`
5. Follow naming conventions and coding standards

### Code Standards

- Use ES6 module syntax
- Follow async/await pattern
- Add descriptive comments
- Use consistent naming conventions
- Include console logs for test flow

---

## 📞 Support

For issues, questions, or contributions:
- **Repository:** https://github.com/obi-waiter/automation
- **Issues:** https://github.com/obi-waiter/automation/issues
- **Email:** support@obi-waiter.com

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 🎉 Quick Reference

```bash
# Setup
npm run setup

# Run all tests
npm test

# Run with UI
npm run test:ui

# View reports
npm run test:report

# Debug
npm run test:debug

# Clean
npm run clean
```

**Happy Testing! 🚀**
