import { BasePage } from "./BasePage";
import {ELEMENT_WAIT} from '../utils/timeout';
import {Page, Locator} from "@playwright/test";

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
    

    


//constructor to initialize the locators
    constructor(page: Page){
        super(page);
        this.title = page.locator('.title');
        this.applogo = page.locator('.app_logo');
        this.hamburgerMenu = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.cart = page.locator('#shopping_cart_link > a');
        this.inventoryItems = page.locator('.inventory_item');
        this.button = page.locator('.btn_inventory');
        this.cartBadge = page.locator('.shopping_cart_badge');
    };

//open hamburger menu
async openHamburgerMenu(): Promise<void>{
    await this.hamburgerMenu.click();
    await this.logoutLink.waitFor({ state: 'visible', timeout: ELEMENT_WAIT });
};

//click logout link
async clickLogout(): Promise<void>{
    await this.openHamburgerMenu();
    await this.logoutLink.click();
    await this.waitForNavigation('networkidle');
}




};