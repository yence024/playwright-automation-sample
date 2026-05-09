
import {Page, test, expect} from "@playwright/test";
import {testUsers, URLS } from "../src/data/testData";
import { Loginpage } from "../src/pages/LoginPage";
import { DashboardPage } from "../src/pages/DashboardPage";
import { CartPage } from "../src/pages/CartPage";
import { ELEMENT_WAIT } from "../src/utils/timeout";

//**Validate Cart Page
// using Page Object Model */   

test.describe('Cart flow', () =>{
    let loginPage: Loginpage;
    let dashboardPage: DashboardPage; 
    let cartPage: CartPage;

    //before each test - setup
    test.beforeEach(async ({page}: {page: Page}) => {
        loginPage = new Loginpage(page);
        dashboardPage = new DashboardPage(page);
        cartPage = new CartPage(page);
        await loginPage.goto(URLS.LOGIN_PAGE);

        //Pre-condition - Login to dasahboard using 'standard_user'
        const user = testUsers.allUsers[0];//standard_user
        await test.step('Act - perform Login', async () =>{
        //Act - perform login action
        await loginPage.login(user.username, user.password);
        
        });
    });

    //**TC-0015 View Cart with Items */
    test('View Cart with Items', async() =>{
        await test.step('add 2 products to cart and click cart icon', async() => {
            await dashboardPage.addMultiProduct(2);
            await expect(dashboardPage.cartBadge).toHaveText('2');
            await dashboardPage.clickCart();
        });

         await test.step(' Cart page displays with header Your Cart', async() => {
            await expect(cartPage.cartTitle).toBeVisible({timeout: ELEMENT_WAIT});
        });

        await test.step('All added items listed with quantity', async() => {
            await expect(cartPage.cartItem).toHaveCount(2);
            const quantity = await cartPage.cartQuantity.allTextContents();
            console.log('Quantities:', quantity);
        });

        await test.step('Continue Shopping button visible', async() => {
            await expect(cartPage.continueShoppingButton).toBeVisible();
        });

        await test.step('Checkout button visible', async() => {
            await expect(cartPage.checkoutButton).toBeVisible();
        });
    });

    //**TC-016 Continue Shopping from Cart */
    test('Continue Shopping from Cart', async() =>{
        await test.step('Verify navigation back to inventory from cart.', async() => {
            await dashboardPage.clickCart();
        });
        await test.step('Click Continue Shopping',async() => {
            await cartPage.clickContinueShopping();
            await expect(dashboardPage.title).toBeVisible({ timeout:ELEMENT_WAIT });
        });
    });
});
