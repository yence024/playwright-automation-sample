import { BasePage } from "./BasePage";
import {ELEMENT_WAIT, SHORT_WAIT} from '../utils/timeout';
import {Page, Locator, expect} from "@playwright/test";
import { listenerCount } from "node:cluster";

//DashboardPage - POM

export class DashboardPage extends BasePage{

    //dashboard page elements
    readonly title: Locator;
    readonly applogo: Locator;
    readonly hamburgerMenu: Locator;
    readonly logoutLink: Locator;
    readonly inventoryItems: Locator;
    readonly cart: Locator
    readonly button: Locator;
    readonly cartBadge: Locator;  
    readonly sortDropdown: Locator;
    readonly itemPrice: Locator;
    readonly inventoryNames: Locator;

//constructor to initialize the locators
    constructor(page: Page){
        super(page);
        this.title = page.locator('.title');
        this.applogo = page.locator('.app_logo');
        this.hamburgerMenu = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.cart = page.locator('#shopping_cart_link > a');
        this.button = page.locator('.btn_inventory');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('.product_sort_container');
        this.itemPrice = page.locator('.inventory_item_price');
        this.inventoryNames = page.locator('.inventory_item_name ');
        this.inventoryItems = page.locator('.inventory_item');
    };

//open hamburger menu
async openHamburgerMenu(): Promise<void>{
    await this.hamburgerMenu.click();
    await this.logoutLink.waitFor({ state: 'visible', timeout: ELEMENT_WAIT });
};


//cartbutton
async clickCart(): Promise<void>{
    await this.cart.click();
    await this.waitForNavigation('networkidle');
};

async shoppingCartBridge(): Promise<void> {

}

//add product button
async addProduct(index: number){
    const button = this.button.nth(index);

    //verify initial text add to cart
    await expect(button).toHaveText('Add to cart');

    await button.click();

    //verify initial text remove
    await expect(button).toHaveText('Remove');
};


//remove prodcut button
async removeProduct(index:number){
   const button = this.button.nth(index) 
    
   //verify initial text Remove to cart
    await expect(button).toHaveText('Remove');

    await button.click();

    //verify initital text Add to cart 
    await expect(button).toHaveText('Add to cart');
};

//add to cart 
async addMultiProduct(count:number){
    for (let i = 0; i < count; i++){
        await this.addProduct(i);
        await this.waitForNavigation('networkidle');
    }

};



//SORT INVENTORY
async sortInventory(option: 'az' | 'za' | 'hilo' | 'lohi' ) {
    const firstItemBefore = await this.inventoryItems.first().allTextContents() 
    await this.sortDropdown.selectOption(option);
    await expect(this.inventoryItems.first()).not.toHaveText(firstItemBefore);
}

//veify sort inventory
 
async verifySort(locator:Locator, type: 'string' | 'number', order: 'asc' |'desc'){
    const values = await locator.allInnerTexts();
    
    const proceed = values.map(v => {
        const lines = v.split('\n').map(l => l.trim()).filter(Boolean);
        if (type === 'number') {
            const priceline = lines.find(l => l.includes('$'))!;
                return parseFloat(priceline.replace('$', ''));
        } else {
            return lines[0];
        }
    })
    console.log('UI values:', proceed);

    const sort = [...proceed].sort((a,b) => {
        if (type === 'number'){
            return order === 'asc' ? (a as number) - (b as number) : (b as number) - (a as number);
        } else {
            // return order === 'asc'? 
            // (a as string).localeCompare(b as string, undefined, {sensitivity: 'base'}) 
            // : (b as string).localeCompare(a as string, undefined, {sensitivity: 'base'});
            const compare = (a as string).localeCompare(b as string, undefined, {sensitivity: 'base'}  )
            return order === 'asc' ? compare : -compare;
            
        }
    }); console.log('Expected values:', sort);
        
    //assert that the sorted values match the expected order
    expect(sort).toEqual(proceed);
      
}


//** Verify product detail 
// age shows full information and actions. */
async verifyProductDetail(index: number): Promise<void> {
    await this.inventoryNames.nth(index).click();
    await expect(this.page.locator('.inventory_details_name')).toBeVisible();
    await expect(this.page.locator('.inventory_details_desc')).toBeVisible();
    await expect(this.page.locator('.inventory_details_price')).toBeVisible();
    await expect(this.page.locator('.inventory_details_back_button')).toBeVisible();
    await expect(this.page.locator('.inventory_details_back_button')).toHaveText('Back to products');

}



//click logout link
async clickLogout(): Promise<void>{
    await this.openHamburgerMenu();
    await this.logoutLink.click();
    await this.waitForNavigation('networkidle');
}






};