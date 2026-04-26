import { BasePage } from "./BasePage";
import {ELEMENT_WAIT, SHORT_WAIT} from '../utils/timeout';
import {Page, Locator, expect} from "@playwright/test";


export class CartPage extends BasePage{
    
    
    //cart page elements
        readonly cartItemName: Locator;

    constructor(page: Page){
        super(page);
        this.cartItemName = page.locator('.cart_item_name');    

    };

};