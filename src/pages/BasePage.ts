//**contains all the common methods shared all page objects
// all pages object should extend this base class for consistency and reusability */
import {test, expect, Page, Locator,} from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

async goto(
    url: string,
    waituntil: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'
):Promise<void>{
    await this.page.goto(url);
    await this.page.waitForLoadState(waituntil);
    }

/**
   * Get a dynamic locator by selector
   * @param selector - CSS selector or data-test attribute
   */
getElement(selector: string): Locator {
    return this.page.locator(selector);
} 

/**
   * Wait for navigation to complete
   * @param waitUntil - Wait condition
   */
async waitForNavigation(
    waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'
):Promise<void>{
    await this.page.waitForLoadState(waitUntil);
}



}


