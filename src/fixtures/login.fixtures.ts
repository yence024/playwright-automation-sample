import {test as base, expect} from '@playwright/test';
import { Loginpage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { CartPage } from '@pages/CartPage';
import { URLS} from '@data/testData'; 


type LoginFixtures = {
  loginPage: Loginpage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
};

export const test = base.extend<LoginFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new Loginpage(page);
        await loginPage.goto(URLS.LOGIN_PAGE);
        await use(loginPage);
    },

    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    }

});

export { expect };