import {test,expect,Browser,chromium,BrowserContext,Page,} from "@playwright/test";

test("browser-context-page-example", async () => {
  const browser: Browser = await chromium.launch({ headless: false });
  const context1: BrowserContext = await browser.newContext();
  const context2: BrowserContext = await browser.newContext();

  const page1: Page = await context1.newPage();
  const page2: Page = await context2.newPage();

  await page1.goto("http://www.google.com/");
  await page1.goto("https://playwright.dev/");

  await page1.waitForTimeout(20000);
  // await browser.close();
});




// {headless:false} browser will open with a visible UI

//   test('browser - context - page - example', async ({ page }) => {
//     await page.goto('https://playwright.dev/');

//     // Expect a title "to contain" a substring.
//     await expect(page).toHaveTitle(/Playwright/);
//   });
