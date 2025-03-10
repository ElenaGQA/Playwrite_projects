import { test, expect } from "@playwright/test";

test.describe("Quality guild main page test", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("http://167.99.178.249:4450/");
    });

    // test.afterEach(async ({ page }) => {
    //     console.log("You can place commands to clean up for the next test here");
    // });

    // test.beforeAll(async () => {
    //     console.log("Does something before all tests");
    // });

    // test.afterAll(async () => {
    //     console.log("Does something after all tests");
    // });

    test("Header should be visible", async ({ page }) => {
        await expect(page).toHaveTitle("Legion QA Guild Signup");
    });

    test("Name field - populate", async ({ page }) => {
        await page.getByPlaceholder("Enter your tester alias");
        await page.getByTestId("name-input");
        await page.getByLabel("Tester Alias");
        await page.locator("#name");
        await page.locator('//input[@id = "name"]');
        await page.getByRole('textbox', { name: "Tester Alias" }).fill("Elena");
    });

    test("Scroll field - populate", async ({ page }) => {
        await page.getByTestId("email-input");
        await page.getByLabel("Email");
        await page.getByPlaceholder("Enter your scroll (email)");
        await page.locator('//input[@id = "email"]');
        await page.locator('//*[@id = "email"]'); // if we know that only one element with this id exists, use *
        await page.locator("#email");
        await page.getByRole('textbox', { name: "Enter your scroll (email)" });
        await page.getByRole('textbox', { name: "email-input" });
        await page.getByRole('textbox', { name: "Email" }).fill("abc@gmail.com");
    })

    test("File upload label should be visible", async ({ page }) => {
        const uploadLabel = await page.getByText("Upload Your Tester Portrait:",{exact:true});
        await expect(uploadLabel).toBeVisible();
    })

    test("File upload label should be visible 2", async ({ page }) => {
        const uploadLabel = await page.getByText("Upload",{exact:false});
        await expect(uploadLabel).toBeVisible();
        const labelText = await uploadLabel.textContent();
        await expect(labelText).toBe("Upload Your Tester Portrait:");
        await expect(labelText).toContain("Upload Your Tester");
    })

    test("Scroll feild verification", async ({page})=>{
        const email = "abc@gmail.com";
        await page.getByTestId("email-input").fill(email);
        await expect(page.getByTestId("email-input")).toHaveValue(email);
        const inputValue = await page.getByTestId("email-input").inputValue();
        console.log(`The value is ${inputValue}`);
    })

    test("Select Your QA Trait should be functional", async ({page})=>{
        await page.getByTestId("superpower-select").selectOption("super_strength");
        const value = await page.getByTestId("superpower-select").inputValue();
        await expect(value).toContain("super_strength");
        const textValue = await page.locator('[data-testid="superpower-select"] option:checked').textContent();
        await expect(textValue).toBe("Stress Testing Strength");
    })

    test("Choose Your Skills:Automation Speed checkbox should be functional", async ({page})=>{
        await expect(page.getByTestId("speed-checkbox")).not.toBeChecked();
        await page.getByTestId("speed-checkbox").click();
        await expect(page.getByTestId("speed-checkbox")).toBeChecked();
        await page.getByTestId("speed-checkbox").click();
        await expect(page.getByTestId("speed-checkbox")).not.toBeChecked();
    })

    test("Pick Your Allegiance radio buttons should be functional", async ({page})=>{
        await expect(page.getByText("Pick Your Allegiance:")).toBeVisible();
        const heroRadio = await page.getByLabel("Hero of Quality");
        const tricksterRadio = await page.getByLabel("Trickster of Bugs");
        await expect (page.getByTestId("hero-radio")).not.toBeChecked();
        await expect (page.getByTestId("trickster-radio")).not.toBeChecked();
        await page.getByTestId("hero-radio").click();
        await expect (page.getByTestId("hero-radio")).toBeChecked();
        await expect (page.getByTestId("trickster-radio")).not.toBeChecked();
        await page.getByTestId("trickster-radio").click();
        await expect (page.getByTestId("hero-radio")).not.toBeChecked();
        await expect (page.getByTestId("trickster-radio")).toBeChecked();
    })

    test("Select Your QA Skill Level range should be functional", async ({ page }) => {
        const levelRange = await page.getByTestId("level-range");
        // await levelRange.fill("75"); // that will change the value but not show if you can move slider
        await levelRange.focus();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowLeft");
        await expect(page.locator("#skillLevelValue")).toHaveText("51");
    })

    test("Guild Members table data should be visible", async ({page})=>{
        const row1 = await page.getByRole("row", {name: "Tester Alias"});
        expect(row1).toBeVisible();
        await expect(row1.getByRole("cell",{name: "Scroll (Email)"})).toBeVisible();
        await expect(row1.getByRole("cell",{name: "Allegiance"})).toBeVisible();
        await expect(row1.getByRole("cell",{name: "QA Skill Level"})).toBeVisible();
        const row2 = await page.getByRole("row", {name: "Bugslayer Eldric"});
        expect(row2).toBeVisible();
        await expect(row2.getByRole("cell",{name: "eldric@realmwatchers.com"})).toBeVisible();
        await expect(row2.getByRole("cell",{name: "Hero of Quality"})).toBeVisible();
        await expect(row2.getByRole("cell",{name: "85"})).toBeVisible();
        const row3 = await page.getByRole("row", {name: "Nyx the Debugger"});
        expect(row3).toBeVisible();
        await expect(row3.getByRole("cell",{name: "nyx@chaosinc.com"})).toBeVisible();
        await expect(row3.getByRole("cell",{name: "Trickster of Bugs"})).toBeVisible();
        await expect(row3.getByRole("cell",{name: "72"})).toBeVisible();
    })


});
