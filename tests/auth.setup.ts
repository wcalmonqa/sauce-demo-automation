import {expect, test as setup} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";

const authFile = '.auth/user.json';

setup.skip('Authenticating', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    await page.waitForURL('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('.app_logo')).toBeVisible();
    await page.context().storageState({path: authFile});
})