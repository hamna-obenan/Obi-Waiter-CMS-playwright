// Environment Configuration Manager
// Obi-Waiter CMS - Environment Settings with POM Integration

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables based on NODE_ENV
const loadEnvironment = () => {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      dotenv.config({ path: path.resolve(process.cwd(), 'env.production') });
      break;
    case 'staging':
      dotenv.config({ path: path.resolve(process.cwd(), 'env.staging') });
      break;
    case 'development':
    default:
      dotenv.config({ path: path.resolve(process.cwd(), 'env.development') });
      break;
  }
};

loadEnvironment();

// Environment Configuration
export const config = {
  // Application Settings
  app: {
    name: 'Obi-Waiter CMS',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT) || 3000,
  },

  // URLs - Linked with POM classes
  urls: {
    base: process.env.BASE_URL || 'http://localhost:3000',
    api: process.env.API_URL || 'http://localhost:8000',
    admin: process.env.ADMIN_URL || 'http://localhost:3001',
    login: process.env.LOGIN_URL || 'http://localhost:3000/login',
    venue: process.env.VENUE_URL || 'http://localhost:3000/venue',
  },

  // Test Data - Linked with fixtures
  testData: {
    users: {
      primary: {
        email: process.env.TEST_USER_EMAIL || 'hamna123@gmail.com',
        password: process.env.TEST_USER_PASSWORD || '123456',
      },
      admin: {
        email: process.env.TEST_ADMIN_EMAIL || 'admin@obi-waiter.com',
        password: process.env.TEST_ADMIN_PASSWORD || 'admin123',
      },
    },
    venue: {
      name: process.env.TEST_VENUE_NAME || 'Skyline',
      email: process.env.TEST_VENUE_EMAIL || 'hamna123@gmail.com',
      type: process.env.TEST_VENUE_TYPE || 'Restaurant',
      cuisine: process.env.TEST_VENUE_CUISINE || 'Pakistani',
      description: process.env.TEST_VENUE_DESCRIPTION || 'Our venue offers a perfect blend of elegance and functionality...',
      address: process.env.TEST_VENUE_ADDRESS || '123 Main Street, Lahore',
      language: process.env.TEST_VENUE_LANGUAGE || 'English',
      timezone: process.env.TEST_VENUE_TIMEZONE || '(UTC+02:00) Eastern European Time',
      currency: process.env.TEST_VENUE_CURRENCY || 'Euro',
      tipPercentage: process.env.TEST_TIP_PERCENTAGE || '5',
      dineInTax: process.env.TEST_DINE_IN_TAX || '9',
      takeawayTax: process.env.TEST_TAKEAWAY_TAX || '7',
      instagram: process.env.TEST_INSTAGRAM || 'https://www.silkline.com',
      facebook: process.env.TEST_FACEBOOK || 'https://www.silkline.com',
      clientUrl: process.env.TEST_CLIENT_URL || 'skyline',
    },
  },

  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'obi_waiter_dev',
    user: process.env.DB_USER || 'dev_user',
    password: process.env.DB_PASSWORD || 'dev_password',
    ssl: process.env.DB_SSL === 'true',
  },

  // Authentication - Linked with LoginPage POM
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'dev_jwt_secret',
    sessionTimeout: parseInt(process.env.SESSION_TIMEOUT) || 1800,
    loginRetryLimit: parseInt(process.env.LOGIN_RETRY_LIMIT) || 5,
  },

  // File Upload - Linked with venue creation
  upload: {
    maxFileSize: process.env.MAX_FILE_SIZE || '5MB',
    allowedTypes: process.env.ALLOWED_IMAGE_TYPES?.split(',') || ['jpg', 'jpeg', 'png'],
    uploadPath: process.env.UPLOAD_PATH || '/uploads/',
    logoPath: process.env.LOGO_UPLOAD_PATH || '/uploads/logos/',
    coverPath: process.env.COVER_UPLOAD_PATH || '/uploads/covers/',
    galleryPath: process.env.GALLERY_UPLOAD_PATH || '/uploads/gallery/',
  },

  // Email Configuration
  email: {
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT) || 1025,
    user: process.env.SMTP_USER || 'dev@obi-waiter.com',
    password: process.env.SMTP_PASSWORD || 'dev_password',
    from: process.env.SMTP_FROM || 'noreply@obi-waiter.com',
  },

  // Payment Gateway
  payment: {
    gatewayUrl: process.env.PAYMENT_GATEWAY_URL || 'http://localhost:8080',
    apiKey: process.env.PAYMENT_API_KEY || 'dev_payment_key',
    webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET || 'dev_webhook_secret',
    stripe: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_dev',
      secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_dev',
    },
  },

  // Third-party Services
  services: {
    googleMaps: process.env.GOOGLE_MAPS_API_KEY || 'dev_google_maps_key',
    analytics: process.env.GOOGLE_ANALYTICS_ID || 'GA-dev-123',
    facebook: process.env.FACEBOOK_APP_ID || 'dev_facebook_app_id',
    instagram: process.env.INSTAGRAM_CLIENT_ID || 'dev_instagram_client_id',
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
    filePath: process.env.LOG_FILE_PATH || '/logs/',
    consoleEnabled: process.env.ENABLE_CONSOLE_LOGGING === 'true',
  },

  // Security
  security: {
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    rateLimit: {
      requests: parseInt(process.env.RATE_LIMIT_REQUESTS) || 100,
      window: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000,
    },
    ssl: {
      enabled: process.env.SSL_ENABLED === 'true',
      certPath: process.env.SSL_CERT_PATH,
      keyPath: process.env.SSL_KEY_PATH,
    },
  },

  // Test Configuration - Linked with Playwright
  testing: {
    mode: process.env.TEST_MODE === 'true',
    enableTestData: process.env.ENABLE_TEST_DATA === 'true',
    mockPayments: process.env.MOCK_PAYMENTS === 'true',
    mockEmail: process.env.MOCK_EMAIL_SENDING === 'true',
    debugPause: process.env.ENABLE_DEBUG_PAUSE === 'true',
    screenshot: process.env.SCREENSHOT_ON_FAILURE === 'true',
    video: process.env.VIDEO_RECORDING === 'true',
  },

  // Performance
  performance: {
    cacheTtl: parseInt(process.env.CACHE_TTL) || 300,
    redisEnabled: process.env.ENABLE_REDIS_CACHE === 'true',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    cdnUrl: process.env.CDN_URL || 'http://localhost:3000',
  },

  // Monitoring
  monitoring: {
    enabled: process.env.ENABLE_METRICS === 'true',
    healthCheckInterval: parseInt(process.env.HEALTH_CHECK_INTERVAL) || 30000,
    alertEmail: process.env.ALERT_EMAIL || 'alerts@obi-waiter.com',
  },

  // Playwright Configuration
  playwright: {
    baseUrl: process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || 'http://localhost:3000',
    timeout: parseInt(process.env.PLAYWRIGHT_TIMEOUT) || 30000,
    retries: parseInt(process.env.PLAYWRIGHT_RETRIES) || 2,
    workers: parseInt(process.env.PLAYWRIGHT_WORKERS) || undefined,
    headless: process.env.PLAYWRIGHT_HEADLESS === 'true',
    video: process.env.PLAYWRIGHT_VIDEO === 'true',
    screenshot: process.env.PLAYWRIGHT_SCREENSHOT === 'true',
    trace: process.env.PLAYWRIGHT_TRACE === 'true',
  },
};

// Environment-specific configurations
export const isDevelopment = config.app.environment === 'development';
export const isStaging = config.app.environment === 'staging';
export const isProduction = config.app.environment === 'production';

// Test-specific configurations
export const testConfig = {
  baseUrl: config.playwright.baseUrl,
  apiUrl: config.urls.api,
  timeout: config.playwright.timeout,
  retries: config.playwright.retries,
  workers: config.playwright.workers,
  headless: config.playwright.headless,
  video: config.playwright.video,
  screenshot: config.playwright.screenshot ? 'only-on-failure' : 'off',
  trace: config.playwright.trace ? 'on-first-retry' : 'off',
};

// POM Integration helpers
export const pomConfig = {
  // LoginPage integration
  login: {
    url: config.urls.login,
    credentials: config.testData.users,
  },
  
  // VenuePage integration
  venue: {
    url: config.urls.venue,
    testData: config.testData.venue,
    uploadPaths: config.upload,
  },
  
  // Common POM settings
  common: {
    baseUrl: config.urls.base,
    timeout: config.playwright.timeout,
    retries: config.playwright.retries,
  },
};

export default config;