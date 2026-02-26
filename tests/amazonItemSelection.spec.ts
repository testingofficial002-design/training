import { test, expect, chromium } from '@playwright/test';
import type { Browser, Page } from 'playwright';

test('Amazon Website', async ({ }, testInfo) => {
  //  const browser: Browser = await chromium.launch({ headless: false });
    const browser: Browser = await chromium.launch();
    const page: Page = await browser.newPage();
    testInfo.setTimeout(60000);

    await page.goto("https://www.amazon.com/");
    await page.waitForLoadState('load');

    await page.waitForSelector('#nav-hamburger-menu');
    await page.click("//a[@id='nav-hamburger-menu']");


    await page.waitForLoadState('load');
    const item = page.locator("//div[contains(text(),'Smart')]/ancestor::a[@class='hmenu-item']");
    const firstItem = item.first();

    await firstItem.waitFor({ state: 'visible', timeout: 5000 });
    await firstItem.click();

    // Locate sub-items under "smart phones"
    await page.waitForLoadState('load')
    const subItems = page.locator("section[aria-labelledby*='Smart'] a.hmenu-item");

    // Count sub-items
    await subItems.first().waitFor({ state: 'visible', timeout: 5000 });
    const count = await subItems.count();

    console.log(`Total Computer sub-items: ${count}`);

    // Get all sub-item names
    const allNames = await subItems.allTextContents();
    console.log('Categories:', allNames);

    // Click the first sub-item
    await subItems.first().click();

    await browser.close();
});

