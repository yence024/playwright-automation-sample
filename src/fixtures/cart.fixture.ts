import { test as base, expect } from '@playwright/test';

import { Loginpage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { CartPage } from '@pages/CartPage';

import { URLS, testUsers } from '@data/testData';

type Fixtures = {
  dashboardPage: DashboardPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  cartPage: async ({ page, dashboardPage }, use) => {
    const loginPage = new Loginpage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto(URLS.LOGIN_PAGE);

    const user = testUsers.allUsers[0];
    await loginPage.login(user.username, user.password);

    await use(cartPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect };