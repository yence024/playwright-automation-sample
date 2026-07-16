import { test, expect } from '@fixtures/login.fixtures';
import { EXPECTED_TEXT, URLS, testUsers } from '../src/data/testData';
import { ELEMENT_WAIT } from '../src/utils/timeout';


test.describe('Login flow', () => {
    test('Successful Login with Standard User', async ({ loginPage, dashboardPage }) => {
        const user = testUsers.allUsers[0];

        await test.step('Act - perform login', async () => {
            await loginPage.login(user.username, user.password);
        });

        await test.step('Assert - dashboard is available', async () => {
            await expect(loginPage.page).toHaveURL(URLS.DASHBOARD_PAGE);
            await dashboardPage.expectDashboardLoaded();
            await expect(dashboardPage.title).toHaveText(EXPECTED_TEXT.DASHBOARD_TITLE);
            await expect(dashboardPage.applogo).toHaveText(EXPECTED_TEXT.APP_LOGO);
        });

        await test.step('Act - perform logout', async () => {
            await dashboardPage.clickLogout();
        });

        await test.step('Assert - login form is visible again', async () => {
            await loginPage.expectLoginFormVisible();
            await expect(loginPage.page).toHaveURL(URLS.LOGIN_PAGE, { timeout: ELEMENT_WAIT });
        });
    });

    test('Login with Locked Out User', async ({ loginPage }) => {
        const user = testUsers.allUsers[1];

        await test.step('Act - perform login', async () => {
            await loginPage.login(user.username, user.password);
        });

        await test.step('Assert - locked out message is shown', async () => {
            await loginPage.expectLockedOuterror();
        });
    });
});