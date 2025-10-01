# Obi-Waiter CMS - Test Automation Suite

## 🚀 Overview

This repository contains the automated testing suite for the Obi-Waiter CMS application. It uses Playwright for end-to-end testing across multiple browsers and environments.

## 📁 Project Structure

```
Obi-Waiter-Automation/
├── config/                 # Configuration files
│   ├── environments.js    # Environment settings
│   ├── global-setup.js    # Global test setup
│   └── global-teardown.js # Global test teardown
├── tests/                  # Test files
│   ├── smoke/             # Smoke tests
│   ├── regression/        # Regression tests
│   ├── mobile/           # Mobile tests
│   ├── api/              # API tests
│   └── visual/           # Visual regression tests
├── scripts/               # Test execution scripts
├── fixtures/             # Test data
├── reports/              # Test reports
└── env.*                 # Environment files
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/obi-waiter/automation.git
cd automation

# Install dependencies
npm run setup
```

## 🧪 Running Tests

### Environment-Specific Tests

```bash
# Development environment
npm run test:smoke          # Smoke tests
npm run test:regression     # Regression tests
npm run test:all           # All tests

# Staging environment
npm run test:staging:smoke     # Smoke tests on staging
npm run test:staging:regression # Regression tests on staging

# Production environment
npm run test:production:smoke     # Smoke tests on production
npm run test:production:regression # Regression tests on production
```

### Test Types

```bash
# Smoke tests (critical path)
npm run test:smoke

# Regression tests (full features)
npm run test:regression

# Mobile tests
npm run test:mobile

# API tests
npm run test:api

# Visual regression tests
npm run test:visual

# All tests
npm run test:all

# Cross-browser testing
npm run test:all-browsers
```

### Debug Mode

```bash
# Run tests in headed mode
npm run test:headed

# Debug mode
npm run test:debug

# UI mode
npm run test:ui
```

## 🌍 Environments

### Development
- **Base URL:** http://localhost:3000
- **API URL:** http://localhost:8000
- **Features:** Hot reload, debug mode, test data enabled

### Staging
- **Base URL:** https://staging.obi-waiter.com
- **API URL:** https://api-staging.obi-waiter.com
- **Features:** Production-like environment, test data enabled

### Production
- **Base URL:** https://app.obi-waiter.com
- **API URL:** https://api.obi-waiter.com
- **Features:** Live environment, no test data

## 📊 Test Reports

After running tests, reports are generated in the `reports/` directory:

- **HTML Report:** `reports/html/index.html`
- **JSON Report:** `reports/json/results.json`
- **JUnit Report:** `reports/junit/results.xml`

View reports:
```bash
npm run test:report
```

## 🔧 Configuration

### Environment Variables

Copy the appropriate environment file:
```bash
# Development
cp env.development .env

# Staging
cp env.staging .env

# Production
cp env.production .env
```

### Playwright Configuration

The `playwright.config.js` file contains:
- Test execution settings
- Browser configurations
- Reporter settings
- Global setup/teardown

## 📝 Writing Tests

### Test Structure

```javascript
import { test, expect } from '@playwright/test';
import { config } from '../config/environments.js';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto(config.urls.base);
    // Test implementation
  });
});
```

### Page Object Model

```javascript
// pages/LoginPage.js
export class LoginPage {
  constructor(page) {
    this.page = page;
  }
  
  async login(email, password) {
    await this.page.fill('[name="email"]', email);
    await this.page.fill('[name="password"]', password);
    await this.page.click('[type="submit"]');
  }
}
```

## 🚀 CI/CD Integration

### GitHub Actions

The project includes GitHub Actions workflows for:
- Smoke tests on pull requests
- Regression tests on merge
- Visual tests on UI changes

### Environment-Specific Pipelines

- **Development:** Runs on every commit
- **Staging:** Runs on merge to staging branch
- **Production:** Runs on merge to main branch

## 📈 Best Practices

1. **Use Page Object Model** for maintainable tests
2. **Write descriptive test names** that explain the scenario
3. **Use data-driven testing** for multiple scenarios
4. **Add proper assertions** for validation
5. **Handle async operations** correctly
6. **Use environment-specific configurations**

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing on CI:** Check environment variables
2. **Browser not found:** Run `npm run install:browsers`
3. **Timeout errors:** Increase timeout in config
4. **Flaky tests:** Add proper waits and retries

### Debug Commands

```bash
# Run specific test
npx playwright test tests/smoke/login.spec.js

# Run with debug logs
DEBUG=pw:api npx playwright test

# Generate trace
npx playwright test --trace on
```

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 📄 License

MIT License - see LICENSE file for details.
