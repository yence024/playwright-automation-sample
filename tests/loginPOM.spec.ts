import {Page, test, expect} from "@playwright/test";
import { EXPECTED_TEXT, testUsers, URLS } from "../src/data/testData";
import { BasePage } from "../src/pages/BasePage";
import { Loginpage } from "../src/pages/LoginPage";
import { DashboardPage } from "../src/pages/DashboardPage";
import { ELEMENT_WAIT } from "../src/utils/timeout";
// validate login functionality using Page Object Model

test.describe('Login flow', () =>{
    let loginPage: Loginpage;
    let dashboardPage: DashboardPage;

    //before each test - setup
    test.beforeEach(async ({page}: {page: Page}) => {
        loginPage = new Loginpage(page);
        dashboardPage = new DashboardPage(page);    
        await loginPage.goto(URLS.LOGIN_PAGE);
    })

// test(`should login succesfully, verify dashboard, and logout with `, async () => {
//     console.log(testUsers.allUsers, 'testUsers.allUsers');
// })


//test login , dashboard verification and logout


// for (const user of testUser.allUsers) - this loop through all user without verifying the locked out user

// Arrange - login page object and dashboard page object
// const validUsers = testUsers.allUsers.filter(user =>user.username !== 'locked_out_user' );
for (const user of testUsers.allUsers) {
    test(`should login succesfully, verify dashboard, and logout with ${user.username} `, async () => {
        await test.step('Arrange - get credentials', async () =>{
        });
        //Act - perform login action
        await test.step('Act - perform Login', async () =>{
        await loginPage.login(user.username, user.password);    
        });

        if(user.username === 'locked_out_user'){
            await loginPage.expectLockedOuterror();
            return; //exit the test if user is locked out
        }

        //assert - verfiy successful login and access to dashboard
        await test.step('Assert- Verify login and dashboard', async () =>{
            //verify URL
            await expect(loginPage.page).toHaveURL(URLS.DASHBOARD_PAGE)
        });

    

        //verfiy Dashboard Elements
        await expect(dashboardPage.title).toBeVisible({ timeout:ELEMENT_WAIT });
        await expect(dashboardPage.title).toHaveText(EXPECTED_TEXT.DASHBOARD_TITLE);
        await expect(dashboardPage.applogo).toBeVisible();
        await expect(dashboardPage.applogo).toHaveText(EXPECTED_TEXT.APP_LOGO);
        await expect(dashboardPage.hamburgerMenu).toBeVisible();


        //act - perform Logout
        await test.step('ACT - Perform Logout', async () => {
            await dashboardPage.clickLogout();
        });

        //verify login is visible after logout
        await expect(loginPage.usernameInput).toBeVisible({timeout:ELEMENT_WAIT});
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        
    
    
    });
}

});


