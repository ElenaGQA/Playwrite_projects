import { test, expect } from "@playwright/test";

test.describe("Quality guild main page test", () => {

    test("Header should be visible", async ({ page }) => {
        await page.goto("http://167.99.178.249:4450/");
        expect(page).toHaveTitle("Legion QA Guild Signup");
    });

    test("Name field - populate", async ({ page }) => {
        await page.goto("http://167.99.178.249:4450/");
        await page.getByPlaceholder("Enter your tester alias");
        await page.getByTestId("name-input");
        await page.getByLabel("Tester Alias");
        await page.locator("#name"); 
        await page.locator('//input[@ id = "name"]');
        await page.getByRole('textbox', {name : "Tester Alias"}).fill("Elena")
    });

    test("Scroll field - populate",async ({page})=>{
        await page.goto("http://167.99.178.249:4450/");
        await page.getByTestId("email-input");
        await page.getByLabel("Email");
        await page.getByPlaceholder("Enter your scroll (email)");
        await page.locator('//input[@ id = "email"]');
        await page.locator('//*[@ id = "email"]'); // if we know that only one element with this id exists, use *
        await page.locator("#email");
        await page.getByRole('textbox', {name : "Enter your scroll (email)"});
        await page.getByRole('textbox', {name : "email-input"});
        await page.getByRole('textbox', {name : "Email"}).fill("abc@gmail.com");
    })

});

// <input type="text" id="name" name="name" class="form-control" placeholder="Enter your tester alias" 
// data-testid="name-input" aria-label="Tester Alias">d

// <input type="email" id="email" name="email" class="form-control" placeholder="Enter your scroll (email)"
//  data-testid="email-input" aria-label="Email">

