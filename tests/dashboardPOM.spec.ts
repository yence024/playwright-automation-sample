import {Page, test, expect} from '@playwright/test';
import { EXPECTED_TEXT, testUsers, URLS } from '../src/data/testData';
import { Loginpage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import {ELEMENT_WAIT} from '../src/utils/timeout';

//valditae dashboard elements using Page Object Model
test.describe('Dashboard flow', () =>{
    let loginPage: Loginpage;
    let dashboardPage: DashboardPage;

    //before each test - setup
    test.beforeEach(async ({page}: {page: Page}) => {
        loginPage = new Loginpage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.goto(URLS.LOGIN_PAGE);

        //Pre-condition - Login to dasahboard using 'standard_user'
        const user = testUsers.allUsers[0];//standard_user
        await test.step('Act - perform Login', async () =>{
        //Act - perform login action
        await loginPage.login(user.username, user.password);    
        
        });
    });


//test case TC-006 - validate dashboard elements and Assert product count==6; iterate over product cards
    test('should load dashboard elements correctly', async () => {
        await test.step('Verify all product items and mandatory attributes are displayed.', async () =>{
            const count = await dashboardPage.inventoryItems.count();
             expect(count).toBe(6);
        
            //loop to count dashboard product
             for(let i=0; i < count; i++){
                await expect(dashboardPage.inventoryItems.nth(i)).toBeVisible();
            }
            console.log('Assert product count: ',count,'iterate over product cards:');
        });

    });

//test case TC-007 - validate add to cart functionality    
    test('Verify adding one product updates UI and cart.', async () => {

        await test.step('Confirm cart badge is not visible or is 0', async() => {
            //**checking cart number */
             expect(await dashboardPage.cartBadge.count()).toBe(0);    
        });

        await test.step('Click Add to cart for Sauce Labs Backpack', async() => {
            await dashboardPage.addProduct(1);
        });


        await test.step('Badge may hide when 0; check visibility before/after',async() => {
             await expect(dashboardPage.cartBadge).toHaveText('1');

          });  

    });

//tet case TC-008 - Add Multiple Products to Cart
    test('Verify adding multiple items accumulates correctly:', async() => {
        await test.step('add to cart 3 product: ',async() => {
            await dashboardPage.addMultiProduct(3);

            const cartCount = await dashboardPage.cartBadge.textContent();
            console.log('item Count:', cartCount);


        });
    
    });

//test case TC-009 - Remove Product from Cart
    test('Verify removing an item updates both product card and cart badge.', async() =>{
        await test.step('add Sauce Labs Backpack to cart : ',async() => {
            
            //add to cart
            await dashboardPage.addProduct(0);
            
        });
        await test.step('Remove Sauce Labs Backpack to cart : ',async() => {
            
            //remove add to cart
            await dashboardPage.removeProduct(0);
            
        });

    });

//test case TC-010 - Sort Products by Name (A-Z)
    test('Verify alphabetical ascending sort.', async() => {
        test.step('Open sort dropdown and  Select Name (A to Z)', async() => {
            await dashboardPage.sortInventory('az')
            await dashboardPage.verifySort(dashboardPage.inventoryItems, 'string', 'asc');
            console.log('names are sorted correctly A-Z')
        });

    });

//test case TC-011 Sort Products by Name (Z-A)
    test('verfiy alphabetical descending Sort', async() =>{
        
        test.step('Open sort dropdown and  Select Name (Z to A).', async() => {
            
            await dashboardPage.sortInventory('za');
            await dashboardPage.verifySort(dashboardPage.inventoryNames, 'string', 'desc');
            console.log('names are sorted correctly Z-A');
        });

    });    

//test case TC-012 - Sort Products by Price (Low to High)
    test('verify price low to high sort', async() =>{
        test.step('Open sort dropdown and  Select Price (Low to High).', async() => {
            await dashboardPage.sortInventory('lohi');
            await dashboardPage.verifySort(dashboardPage.inventoryItems, 'number', 'asc');
            console.log('price are sorted correctly low to high');
        });
    });

//test case TC-013 - Sort Products by Price (High to Low)
    test('Open sort dropdown and  Select Price (High to Low).', async() => {
        test.step('Open sort dropdown and  Select Price (High to Low).', async() => {
            await dashboardPage.sortInventory('hilo');
            await dashboardPage.verifySort(dashboardPage.inventoryItems, 'number', 'desc');
            console.log('price are sorted correctly high to low');  
        });
    });   

//test case TC-014 - View Product Details
    test('Verify product detail page shows full information and actions.', async() => {
        test.step('Click on a product image or name', async() => {
            await dashboardPage.verifyProductDetail(0);
            console.log('product detail page shows full information and actions');

        });

        await test.step('add Sauce Labs Backpack to cart : ',async() => {
            
            //add to cart
            await dashboardPage.addProduct(0);
            console.log('product added to cart');
            
        });
        await test.step('Remove Sauce Labs Backpack to cart : ',async() => {
            
            //remove add to cart
            await dashboardPage.removeProduct(0);
            console.log('product removed from cart');
            
        });

        

    });

});