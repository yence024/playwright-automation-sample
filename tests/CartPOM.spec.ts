import {Page, test, expect} from "@playwright/test";
import { EXPECTED_TEXT, testUsers, URLS } from "../src/data/testData";
import { BasePage } from "../src/pages/BasePage";
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

});
