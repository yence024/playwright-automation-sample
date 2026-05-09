import {test, expect} from '@playwright/test';


test.describe('dashobard flow', () =>{
    test('Dashboard loads correctly', async({page}) =>{

        //step 1: got login page
        await page.goto('https://www.saucedemo.com/');

        //steps 2-3: fill the usernamne - hardcoded  xpath selector
        await page.locator('xpath=//input[@id="user-name"]').fill('standard_user');

        //step 4-5: fill the password - hardcoded xpath selector
        await page.locator('xpath=//input[@id="password"]').fill('secret_sauce');

        //step 6 click login button - hardcoded xpath
        await page.locator('xpath=//input[@id="login-button"]').click();

        //step 7 wait for navigation
        await page.waitForLoadState('networkidle');

        //step 8 Verify URL contains inventory page - hardcorded URL
        await expect(page).toHaveURL(/inventory\.html/);

        //step 9-10: Verify product title is visible - hardcoded xpath
        await expect(page.locator('xpath=//span[@class="title"]')).toBeVisible({timeout:3000});
        await expect(page.locator('xpath=//span[@class="title"]')).toContainText('Products');
        
        //step 11 Verify product list is displayed
        await expect(page.locator('xpath=//div[@class="inventory_list"]')).toBeVisible({timeout:3000});
        const product = page.locator('xpath=//div[@class="inventory_list"]');
        const count = await product.count();
        expect(count).toBeGreaterThan(0);





    })

   
})