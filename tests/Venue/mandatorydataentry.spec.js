import { test, expect } from "@playwright/test";
import { config } from "../../config/environments.js";
import MandatoryDataVenuePOM from "../../object-Page/venue/mandatorydatavenue.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import venue from "../../Fixtures/Venue.json" assert { type: "json" };

test("create venue with Mandatory data entry", async ({ page }) => {
  const venuePage = new MandatoryDataVenuePOM(page);
 // Go to login page
 await page.goto(config.urls.login);

 // Fill the email and password fields in login form then submit
 // fill up the email in the field
 await page.locator(locators["signin-email"]).fill(login.TC1001.Email);
 //assertion for the email field to be visible
 await expect(page.locator(locators["signin-email"])).toHaveValue(login.TC1001.Email);


 // fill up the password in the field
 await page.locator(locators["signin-password"]).fill(login.TC1001.Password);
 //assertion for the password field to be visible
 await expect(page.locator(locators["signin-password"])).toHaveValue(login.TC1001.Password);


 //assertion for the sign in button to be visible
 await expect(page.locator(locators["signin-button"])).toBeVisible();
 // click on the sign in button
 await page.locator(locators["signin-button"]).click();
 //wait for the network idle
 await page.waitForLoadState('networkidle');
 //assertion for the add venue button to be visible
 await expect(page.locator(locators["click-add-venue-button"])).toBeVisible();
 //click on the add venue button
 await page.locator(locators["click-add-venue-button"]).click();
 //wait for the network idle
 await page.waitForLoadState('networkidle');
 //add venue name
 await venuePage.fillupvenueName();
 //select venue type
 await venuePage.selectVenueType();
 //fill up email
 await venuePage.fillupemail();
 //select language
 await venuePage.selectlanguage();
 //select time zone
 await venuePage.timezoneselect();
 //select currency
 await venuePage.currencyselect();
 //fill up cuisine
 await venuePage.fillupCuisine();
 //fill up address
 await venuePage.fillupaddress();
 //click next button
 await venuePage.clicknextbutton();
 //fill up venue description
 await venuePage.addvenuediscription();
 //client app url
 await venuePage.addslugurl();
 //dine in tax
 await venuePage.adddineintax();
 //take away tax
 await venuePage.addtakeawaytax();
 //upload venue logo
 await venuePage.uploadVenueLogo();
 //upload venue cover image
 await venuePage.uploadcoverimage();
 //click next button
 await venuePage.clicknextbutton();
 //fill up contact number
 await venuePage.fillupcontactnumber();
 //fill up story title
 await venuePage.fillupstorytitle();
 //fill up story description
 await venuePage.fillupstorydescription();
 //upload story image
 await venuePage.uploadstoryimage();
 //fill up gallery image 1
 await venuePage.fillupgalleryimage1();
 //fill up gallery image 2
 await venuePage.fillupgalleryimage2();
 //fill up gallery image 3
 await venuePage.fillupgalleryimage3();
 //click save button
 await venuePage.clicksavebutton();
});