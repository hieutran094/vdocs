import { Page } from '@playwright/test';

export async function visitSite(page: Page) {
  await page.goto('');
  await doLogin(page);
}

export async function doLogin(page: Page) {
  await page.locator('input.username').fill('admin@example.com');
  await page.locator('input.password').fill('123456');
  await page.locator('button[type=submit]').click();
}
