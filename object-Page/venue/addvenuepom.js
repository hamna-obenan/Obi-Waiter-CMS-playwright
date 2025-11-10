import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import venue from "../../Fixtures/Venue.json" assert { type: "json" };
import { config } from "../../config/environments.js";
import path from "node:path";
import { log } from "node:console";

/**
 * Page Object Model for Venue Duplication Testing
 * Handles venue creation, duplication validation, and error checking
 */
export default class VenueDuplicationPOM {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Add Venue page
   */
  async navigateToAddVenue() {
    await this.page.locator("//*[@data-testid='AddSharpIcon']/following-sibling::p[normalize-space()='Add']").click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to Add Venue page');
  }

  //fill up the venue name in the field
  async fillupvenueName() {
    await this.page.locator("venuename").click();
    await this.page.locator(locators["venuename"]).fill(venue["venuetitlename"]);
    await this.page.waitForLoadState('networkidle');
    console.log('click on the venue name and add name')
  }

  //select the venue type
  async selectVenueType() {
    await this.page.locator(locators["venue-type"]).click();              // open dropdown
    console.log("Venue type selected successfully");
  }
  //Enter the fill up the email
  async fillupemail(){
    await this.page.locator(locators["venue-email"]).click();
    console.log("Email filled")
  }
  //select language
  async selectlanguage() {
    await this.page.locator(locators["venue-default-language"]).click();              // open dropdown
    console.log("Language selected successfully");
  }

  //select the time zone 
  async timezoneselect(){
    await this.page.locator(locators["venue-Time zone"]).click();              // open dropdown
    console.log("Timezone selected successfully");
  }

  //select the currency 
  async currencyselect(){
    await this.page.locator(locators["venue-Currency"]).click();              // open dropdown
    console.log("currency selected successfully");
  }

  // fill up the Cuisine 
  async fillupCuisine(){
    await this.page.locator(locators["venue-Cuisine"]).click();             
    console.log("Cuisine fill successfully");
  }

  //fillup the address
  async fillupaddress(){
    await this.page.locator(locators["venue-Address"]).click();              
    console.log("Address fill successfully");
  }

  //click on the next button
  async clicknextbutton(){
    await this.page.locator(locators["venue-next-button"]).click();              
    console.log("Address fill successfully");
  }

  //2nd page
  //fill up the venue discription
  async addvenuediscription(){
    await this.page.locator(locators["venue-description"]).click();
    await this.page.locator(locators["venue-description"]).fill(Venuediscription["venue-description"]);
  }
  //facebook url
  async addfacebookurl(){
    await this.page.locator(locators["Facebookurl"]).click();
    await this.page.locator(locators["Facebookurl"]).fill(Venuediscription["facebookurl"]);
  }
  //instagram url
  async addinstagramurl(){
    await this.page.locator(locators["Instagramurl"]).click();
    await this.page.locator(locators["Instagramurl"]).fill(Venuediscription["instagramurl"]);
  }
  //slug company url
  async addslugurl(){
    await this.page.locator(locators["Client app url"]).click();
    await this.page.locator(locators["Client app url"]).fill(Venuediscription["Client app url"]);
  }
  //enable pay later buuton
  async enablepaybylater(){
    await this.page.locator(locators["EnablePayLater"]).click();
    // await this.page.locator(locators["EnablePayLater"]).fill(Venuediscription["Enable Pay Later"]);
  }
  //enable tipping
  async enabletipping(){
    await this.page.locator(locators["enableTipping"]).click();
    // await this.page.locator(locators["Tip Percentage (%)"]).fill(Venuediscription["Tip Percentage (%)"]);
  }
  //enter tip percentage
  async entertippercentage(){
    await this.page.locator(locators["Tip Percentage (%)"]).click();
    await this.page.locator(locators["Tip Percentage (%)"]).fill(Venuediscription["Tip Percentage (%)"]);
  }
  //dine in tax
  async adddineintax(){
    await this.page.locator(locators["Dine-In Tax (%)"]).click();
    await this.page.locator(locators["Dine-In Tax (%)"]).fill(Venuediscription["Dine-In Tax (%)"]);
  }
  //take away tax
  async addtakeawaytax(){
    await this.page.locator(locators["Take-Away Tax (%)"]).click();
    await this.page.locator(locators["Take-Away Tax (%)"]).fill(Venuediscription["Take-Away Tax (%)"]);
  }
  //upload venue logo
  async uploadvenuelogo(){
    await this.page.locator(locators["venuelogo"]).click();
    await this.page.locator(locators["venuelogoimageselector"]).click();
    await this.page.locator(locators["logouploadbutton"]).click();
    await this.page.locator(locators["clickonthelogopicture"]).click();
    await this.page.locator(locators["venueCoverimage"]).click();
    await this.page.locator(locators["venueCoverimageimageselector"]).fill(Venuediscription["venueCoverimage"]);
    await this.page.locator(locators["venueCoverimageuploadbutton"]).click();
  }
}