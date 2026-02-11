import {test, expect} from '@playwright/test';


test.describe('Login flow', () =>{
    test('Successful Login with Standard User', async ({page}) =>{
        
        //step 1: go to login page
        await page.goto('/');

        //step 2 -3: fill the username - hardcorded xpath selector
        await page.locator('xpath=//input[@id="user-name"]').fill('standard_user');

        //step 4 - 5: fill the password - hardcorded xpath selector
        await page.locator('xpath=//input[@id="password"]').fill('secret_sauce');

        //step 6: click login button - hardcorded xpath selector
        await page.locator('xpath=//input[@id="login-button"]').click();
        
        //step 7: wait for navigation
        await page.waitForLoadState('networkidle');

        //step 8: Verify login was successfully  - hardcoded URL
        await expect(page).toHaveURL(/inventory\.html/);

        //step 9: verify product title is visible - harcoded xpath selector and text
        await expect(page.locator('xpath=//span[@class="title"]')).toBeVisible({timeout:3000});
        await expect(page.locator('xpath=//span[@class="title"]')).toContainText('Products');

        //step 10: verify app logo - hardcoded  xpath selector and text
        await expect(page.locator('//div[@class="app_logo"]')).toBeVisible();
        await expect(page.locator('//div[@class="app_logo"]')).toContainText('Swag Labs');

        //step 11: verify menu button exist
        await expect(page.locator('xpath=//button[@id="react-burger-menu-btn"]')).toBeVisible();

        //step 11: perform logout
        await page.locator('xpath=//button[@id="react-burger-menu-btn"]').click();

        //step 12: wait for navigation
        await page.locator('xpath=//a[@id="logout_sidebar_link"]').waitFor({state: 'visible', timeout:3000});

        await page.locator('xpath=//a[@id="logout_sidebar_link"]').click();

        //step 13: wait for navigation to complete
        await page.waitForLoadState('networkidle');

        //step 14: Verify URL login page
        await expect(page).toHaveURL('/');


    })


    

     test('Login with Locked Out User', async ({page}) =>{
        



    })
})