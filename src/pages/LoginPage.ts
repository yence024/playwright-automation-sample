import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ELEMENT_WAIT } from "../utils/timeout";

//LoginPage - POM

export class Loginpage extends BasePage {
    
    //login from elements
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;  
    readonly errorMessage: Locator;
    
//contrcutor to initialize the locators
    constructor(page: Page){
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
       // this.errorMessage = page.locator('.error-message-container > h3');
        this.errorMessage = page.locator('form > div:nth-child(3) > h3 ');
    };

//fill username field
async fillUsername(username: string): Promise<void>{
    await this.usernameInput.fill(username);
};

//fill password filed
async fillPassword(password: string): Promise<void>{
    await this.passwordInput.fill(password);
};


//click login button
async clickLogin(): Promise<void>{
    await this.loginButton.click();
};

//perform complete login action
async login(username: string, password: string): Promise<void>{
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
    await this.waitForNavigation('networkidle');
};

//lockout user error message
async expectLockedOuterror(): Promise<void>{
    await expect(this.errorMessage).toBeVisible({timeout: ELEMENT_WAIT})
    await expect(this.errorMessage).toContainText('Sorry, this user has been locked out.');
};
}