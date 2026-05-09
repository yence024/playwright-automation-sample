import { BasePage } from "./BasePage";
import {ELEMENT_WAIT, SHORT_WAIT} from '../utils/timeout';
import {Page, Locator, expect} from "@playwright/test";


export class CartPage extends BasePage{
    
    
    //cart page elements
        readonly cartItem: Locator;
        readonly cartTitle: Locator;
        readonly cartQuantity: Locator;
        readonly continueShoppingButton: Locator;
        readonly checkoutButton: Locator;

    constructor(page: Page){
        super(page);
        this.cartItem = page.locator('.cart_item');    
        this.cartTitle = page.locator('.title');
        this.cartQuantity = page.locator('.cart_quantity');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
    };

    
    async clickContinueShopping (): Promise<void>{
        await this.continueShoppingButton.click();
    };


};