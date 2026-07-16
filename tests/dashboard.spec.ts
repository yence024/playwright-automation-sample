import { test, expect } from '@fixtures/login.fixtures';
import { testUsers } from '../src/data/testData';
import { SortHelper } from '../src/utils/sortHelper';

//**validate dashboard elements
//  using Page Object Model*/

test.describe('Dashboard flow', () => {
    let sorthelper: SortHelper;

    //before each test - setup
    test.beforeEach(async ({ loginPage }) => {
        sorthelper = new SortHelper();

        //Pre-condition - Login to dashboard using the standard user
        const user = testUsers.allUsers[0];
        await loginPage.login(user.username, user.password);
    });

    //test case TC-006 - validate dashboard elements and Assert product count==6; iterate over product cards
    test('should load dashboard elements correctly', async ({ dashboardPage }) => {
        await test.step('Verify all product items and mandatory attributes are displayed.', async () => {
            const count = await dashboardPage.inventoryItems.count();
            expect(count).toBe(6);

            //loop to count dashboard product
            for (let i = 0; i < count; i++) {
                await expect(dashboardPage.inventoryItems.nth(i)).toBeVisible();
            }
        });
    });

    //test case TC-007 - validate add to cart functionality
    test('Verify adding one product updates UI and cart.', async ({ dashboardPage }) => {
        await test.step('Confirm cart badge is not visible or is 0', async () => {
            expect(await dashboardPage.cartBadge.count()).toBe(0);
        });

        await test.step('Click Add to cart for Sauce Labs Backpack', async () => {
            await dashboardPage.addProduct(0);
        });

        await test.step('Badge may hide when 0; check visibility before/after', async () => {
            await expect(dashboardPage.cartBadge).toHaveText('1');
        });
    });

    //tet case TC-008 - Add Multiple Products to Cart
    test('Verify adding multiple items accumulates correctly:', async ({ dashboardPage }) => {
        await test.step('add to cart 3 product: ', async () => {
            await dashboardPage.addMultiProduct(3);
            const cartCount = await dashboardPage.cartBadge.textContent();
            console.log('item Count:', cartCount);
        });
    });

    //test case TC-009 - Remove Product from Cart
    test('Verify removing an item updates both product card and cart badge.', async ({ dashboardPage }) => {
        await test.step('add Sauce Labs Backpack to cart : ', async () => {
            await dashboardPage.addProduct(0);
        });
        await test.step('Remove Sauce Labs Backpack to cart : ', async () => {
            await dashboardPage.removeProduct(0);
        });
    });

    //test case TC-010 - Sort Products by Name (A-Z)
    test('Sort Products by Name (A-Z)', async ({ dashboardPage }) => {
        await test.step('Verify alphabetical ascending sort.', async () => {
            await dashboardPage.sortInventory('az');
            await sorthelper.verifySort(dashboardPage.inventoryItems, 'string', 'asc');
        });
    });

    //test case TC-011 Sort Products by Name (Z-A)
    test('Sort Products by Name (Z-A)', async ({ dashboardPage }) => {
        await test.step('Verify alphabetical descending sort.', async () => {
            await dashboardPage.sortInventory('za');
            await sorthelper.verifySort(dashboardPage.inventoryItems, 'string', 'desc');
        });
    });

    //test case TC-012 - Sort Products by Price (Low to High)
    test('Sort Products by Price (Low to High)', async ({ dashboardPage }) => {
        await test.step('Verify price ascending sort.', async () => {
            await dashboardPage.sortInventory('lohi');
            await sorthelper.verifySort(dashboardPage.inventoryItems, 'number', 'asc');
        });
    });

    //test case TC-013 - Sort Products by Price (High to Low)
    test('Sort Products by Price (High to Low)', async ({ dashboardPage }) => {
        await test.step('Verify price descending sort.', async () => {
            await dashboardPage.sortInventory('hilo');
            await sorthelper.verifySort(dashboardPage.inventoryItems, 'number', 'desc');
        });
    });

    //test case TC-014 - View Product Details
    test('Verify product detail page shows full information and actions.', async ({ dashboardPage }) => {
        test.step('Click on a product image or name', async () => {
            await dashboardPage.verifyProductDetail(0);
        });

        await test.step('add Sauce Labs Backpack to cart : ', async () => {
            await dashboardPage.addProduct(0);
        });
        await test.step('Remove Sauce Labs Backpack to cart : ', async () => {
            await dashboardPage.removeProduct(0);
        });
    });
});