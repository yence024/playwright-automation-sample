import { test, expect } from '@fixtures/cart.fixture';
import { CheckoutPage } from '@pages/CheckoutPage';
import { CHECKOUT_DATA, CHECKOUT_ERRORS, URLS } from '@data/testData';

test.describe('Checkout flow', () => {
    test.beforeEach(async ({ dashboardPage, cartPage, page }) => {
        await dashboardPage.addMultiProduct(2);
        await expect(dashboardPage.cartBadge).toHaveText('2');

        await dashboardPage.clickCart();
        await expect(cartPage.cartItem).toHaveCount(2);

        await expect(cartPage.checkoutButton).toBeVisible();
        await cartPage.checkoutButton.click();
        await page.waitForURL(new RegExp(`${URLS.CHECKOUT_INFO}$`));
    });

    test('Checkout -> Valid Information -> Order is completed', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await test.step('Arrange - user is on checkout information page', async () => {
            await checkoutPage.expectInformationPageVisible();
        });

        await test.step('Act - submit valid checkout information', async () => {
            await checkoutPage.fillCheckoutInfo(
                CHECKOUT_DATA.VALID_INFO.firstName,
                CHECKOUT_DATA.VALID_INFO.lastName,
                CHECKOUT_DATA.VALID_INFO.postalCode
            );
            await checkoutPage.continueCheckout();
            await page.waitForURL(new RegExp(`${URLS.CHECKOUT_OVERVIEW}$`));
        });

        await test.step('Assert - overview and completion are displayed', async () => {
            await checkoutPage.expectOverviewPageVisible();
            await checkoutPage.assertOverviewTotals();

            await checkoutPage.finishCheckout();
            await page.waitForURL(new RegExp(`${URLS.CHECKOUT_COMPLETE}$`));
            await checkoutPage.expectOrderCompleted();
        });
    });

    test('Checkout -> Empty First Name -> Validation error is shown', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await test.step('Act - continue with missing first name', async () => {
            await checkoutPage.fillCheckoutInfo(
                CHECKOUT_DATA.MISSING_FIRST_NAME.firstName,
                CHECKOUT_DATA.MISSING_FIRST_NAME.lastName,
                CHECKOUT_DATA.MISSING_FIRST_NAME.postalCode
            );
            await checkoutPage.continueCheckout();
        });

        await test.step('Assert - first name required error is shown', async () => {
            await checkoutPage.expectValidationError(CHECKOUT_ERRORS.FIRST_NAME_REQUIRED);
            await expect(page).toHaveURL(new RegExp(`${URLS.CHECKOUT_INFO}$`));
        });
    });

    test('Checkout -> Empty Last Name -> Validation error is shown', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await test.step('Act - continue with missing last name', async () => {
            await checkoutPage.fillCheckoutInfo(
                CHECKOUT_DATA.MISSING_LAST_NAME.firstName,
                CHECKOUT_DATA.MISSING_LAST_NAME.lastName,
                CHECKOUT_DATA.MISSING_LAST_NAME.postalCode
            );
            await checkoutPage.continueCheckout();
        });

        await test.step('Assert - last name required error is shown', async () => {
            await checkoutPage.expectValidationError(CHECKOUT_ERRORS.LAST_NAME_REQUIRED);
            await expect(page).toHaveURL(new RegExp(`${URLS.CHECKOUT_INFO}$`));
        });
    });

    test('Checkout -> Empty Postal Code -> Validation error is shown', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await test.step('Act - continue with missing postal code', async () => {
            await checkoutPage.fillCheckoutInfo(
                CHECKOUT_DATA.MISSING_POSTAL_CODE.firstName,
                CHECKOUT_DATA.MISSING_POSTAL_CODE.lastName,
                CHECKOUT_DATA.MISSING_POSTAL_CODE.postalCode
            );
            await checkoutPage.continueCheckout();
        });

        await test.step('Assert - postal code required error is shown', async () => {
            await checkoutPage.expectValidationError(CHECKOUT_ERRORS.POSTAL_CODE_REQUIRED);
            await expect(page).toHaveURL(new RegExp(`${URLS.CHECKOUT_INFO}$`));
        });
    });

    test('Checkout -> Cancel from Information -> User returns to cart', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await test.step('Act - cancel checkout from information page', async () => {
            await checkoutPage.cancelCheckout();
            await page.waitForURL(new RegExp(`${URLS.CART}$`));
        });

        await test.step('Assert - cart page is displayed', async () => {
            await expect(page).toHaveURL(new RegExp(`${URLS.CART}$`));
            await expect(page.locator('.title')).toHaveText('Your Cart');
        });
    });

    test('Checkout -> Overview -> Pricing summary is consistent', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await test.step('Act - submit valid information to reach overview', async () => {
            await checkoutPage.fillCheckoutInfo(
                CHECKOUT_DATA.VALID_INFO.firstName,
                CHECKOUT_DATA.VALID_INFO.lastName,
                CHECKOUT_DATA.VALID_INFO.postalCode
            );
            await checkoutPage.continueCheckout();
            await page.waitForURL(new RegExp(`${URLS.CHECKOUT_OVERVIEW}$`));
        });

        await test.step('Assert - item list and total calculation are correct', async () => {
            await checkoutPage.expectOverviewPageVisible();
            await expect(checkoutPage.cartItem).toHaveCount(2);
            await checkoutPage.assertOverviewTotals();
        });
    });
});
