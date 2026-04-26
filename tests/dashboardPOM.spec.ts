import {Page, test, expect} from '@playwright/test';
import { EXPECTED_TEXT, testUsers, URLS } from '../src/data/testData';
import { Loginpage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { SortHelper } from '../src/utils/sortHelper';
// import {ELEMENT_WAIT} from '../src/utils/timeout';


//**validate dashboard elements
//  using Page Object Model*/

test.describe('Dashboard flow', () =>{
    let loginPage: Loginpage;
    let dashboardPage: DashboardPage;
    let sorthelper: SortHelper; 
    // let sorthelper: typeof sortHelper;

    //before each test - setup
    test.beforeEach(async ({page}: {page: Page}) => {
        loginPage = new Loginpage(page);
        dashboardPage = new DashboardPage(page);
        sorthelper = new SortHelper();
        // sorthelper = sortHelper;
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
            await dashboardPage.addProduct(0);
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
  test('Sort Products by Name (A-Z)', async() => {
        await test.step('Verify alphabetical ascending sort.', async() =>{
            await dashboardPage.sortInventory('az');
           await sorthelper.verifySort(dashboardPage.inventoryItems, 'string', 'asc');
        });

    });

//test case TC-011 Sort Products by Name (Z-A)
    test('Sort Products by Name (Z-A)', async() => {
        await test.step('Verify alphabetical descending sort.', async() =>{
            await dashboardPage.sortInventory('za');
           await sorthelper.verifySort(dashboardPage.inventoryItems, 'string', 'desc');
        });

    });

//test case TC-012 - Sort Products by Price (Low to High)
    test('Sort Products by Price (Low to High)', async() => {
        await test.step('Verify price ascending sort.', async() =>{
            await dashboardPage.sortInventory('lohi');
           await sorthelper.verifySort(dashboardPage.inventoryItems, 'number', 'asc');
        });

    });

//test case TC-013 - Sort Products by Price (High to Low)
     test('Sort Products by Price (High to Low)', async() => {
        await test.step('Verify price descending sort.', async() =>{
            await dashboardPage.sortInventory('hilo');
           await sorthelper.verifySort(dashboardPage.inventoryItems, 'number', 'desc');
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