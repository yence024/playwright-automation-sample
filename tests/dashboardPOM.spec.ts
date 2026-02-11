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

        //act - perform Logout
        await test.step('ACT - Perform Logout', async () => {
            await dashboardPage.clickLogout();
        });

        //verify login is visible after logout
        await expect(loginPage.usernameInput).toBeVisible({timeout:ELEMENT_WAIT});
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();


    });

//test case TC-007 - validate add to cart functionality    
    test('Verify adding one product updates UI and cart.', async () => {

        await test.step('Confirm cart badge is not visible or is 0', async() => {
            const count = await dashboardPage.cartBadge.count();
            if(count > 0){
                const badgeText = await dashboardPage.cartBadge.textContent();
                expect(badgeText).toBe('0');
            } else {
                expect(count).toBe(0);
            };
        });

        // await test.step('Click Add to cart for Sauce Labs Backpack', async() => {
        //     await dashboardPage.clickProductButton(0);
        //     const ButtonText = await dashboardPage.button.nth(0).textContent();
        //     await expect(dashboardPage.button.nth(0)).toHaveText('Remove');
        
        // });
    });




});

    


