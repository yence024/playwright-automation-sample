import { test, expect } from '@fixtures/cart.fixture';

//**Validate Cart Page
// using Page Object Model */

test.describe('Cart flow', () => {
    //**TC-0015 View Cart with Items */
    test('View Cart with Items', async ({ dashboardPage, cartPage }) => {
        await test.step('add 2 products to cart and click cart icon', async () => {
            await dashboardPage.addMultiProduct(2);
            await expect(dashboardPage.cartBadge).toHaveText('2');
            await dashboardPage.clickCart();
        });

        await test.step('Cart page displays with header Your Cart', async () => {
            await expect(cartPage.cartTitle).toBeVisible();
        });

        await test.step('All added items listed with quantity', async () => {
            await expect(cartPage.cartItem).toHaveCount(2);
            const quantity = await cartPage.cartQuantity.allTextContents();
            console.log('Quantities:', quantity);
        });

        await test.step('Continue Shopping button visible', async () => {
            await expect(cartPage.continueShoppingButton).toBeVisible();
        });

        await test.step('Checkout button visible', async () => {
            await expect(cartPage.checkoutButton).toBeVisible();
        });
    });

    //**TC-016 Continue Shopping from Cart */
    test('Continue Shopping from Cart', async ({ dashboardPage, cartPage }) => {
        await test.step('Verify navigation back to inventory from cart.', async () => {
            await dashboardPage.clickCart();
        });
        await test.step('Click Continue Shopping', async () => {
            await cartPage.clickContinueShopping();
            await expect(dashboardPage.title).toBeVisible();
        });
    });

    //**TC-017 Remove Item from Cart Page */
    test('Remove Item from Cart Page', async ({ dashboardPage, cartPage, page }) => {
        await test.step('Add Sauce Labs Backpack to cart', async () => {
            await dashboardPage.addProduct(0);
            await expect(dashboardPage.cartBadge).toHaveText('1');
        });

        await test.step('Open cart page', async () => {
            await dashboardPage.clickCart();
            await expect(cartPage.cartTitle).toBeVisible();
        });

        await test.step('Verify item is displayed in cart before removal', async () => {
            await expect(cartPage.cartItem).toHaveCount(1);
        });

        await test.step('Remove the item from cart', async () => {
            // Using inline locator as removeItem method is not accessible from fixture
            const removeBtn = page.locator('.btn_secondary').first();
            await expect(removeBtn).toBeVisible();
            await removeBtn.click();
        });

        await test.step('Verify cart is empty after removal', async () => {
            await expect(cartPage.cartItem).toHaveCount(0);
        });
    });

    //**TC-018 Proceed to Checkout from Cart */
    test('Proceed to Checkout from Cart', async ({ dashboardPage, cartPage, page }) => {
        await test.step('Login and add items to cart', async () => {
            await dashboardPage.addMultiProduct(2);
            await expect(dashboardPage.cartBadge).toHaveText('2');
        });

        await test.step('Navigate to cart page', async () => {
            await dashboardPage.clickCart();
            await expect(cartPage.cartTitle).toBeVisible();
        });

        await test.step('Verify cart has items before checkout', async () => {
            await expect(cartPage.cartItem).toHaveCount(2);
        });

        await test.step('Click Checkout button', async () => {
            const checkoutBtn = cartPage.checkoutButton;
            await expect(checkoutBtn).toBeVisible();
            await checkoutBtn.click();
        });

        await test.step('Verify user is redirected to checkout information page', async () => {
            await page.waitForURL(/checkout-step-one\.html/);
            await expect(page).toHaveURL(/checkout-step-one\.html/);
            await expect(page.locator('.checkout_info')).toBeVisible();
        });
    });
});
