import { test, expect } from "@playwright/test";
import AddVenuePage from "../../object-Page/venue/addvenue-pom.js";
import locators from "../../Fixtures/locators.json" assert { type: "json" };
import login from "../../Fixtures/login.json" assert { type: "json" };
import { performLogin } from "../../utils/login-helper.js";
import venue from "../../Fixtures/Venue.json" assert { type: "json" };


test("Create venue", async ({ page }) => {
  const addVenuePage = new AddVenuePage(page);
  // Login using credentials from login fixture
  await addVenuePage.login(login.TC1001.Email, login.TC1001.Password);
  // Navigate to Add Venue page using the method from addvenue-pom.js
  await addVenuePage.navigateToAddVenue();
  
});
