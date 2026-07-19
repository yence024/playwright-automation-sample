import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CHECKOUT_ERRORS } from '@data/testData';

export class CheckoutPage extends BasePage {
    readonly title: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    readonly cartItem: Locator;
    readonly summarySubtotal: Locator;
    readonly summaryTax: Locator;
    readonly summaryTotal: Locator;
    readonly finishButton: Locator;

    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
        this.errorMessage = page.locator('[data-test="error"]');

        this.cartItem = page.locator('.cart_item');
        this.summarySubtotal = page.locator('.summary_subtotal_label');
        this.summaryTax = page.locator('.summary_tax_label');
        this.summaryTotal = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');

        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('#back-to-products');
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout(): Promise<void> {
        await this.continueButton.click();
    }

    async cancelCheckout(): Promise<void> {
        await this.cancelButton.click();
    }

    async finishCheckout(): Promise<void> {
        await this.finishButton.click();
    }

    async expectInformationPageVisible(): Promise<void> {
        await expect(this.title).toHaveText('Checkout: Your Information');
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.postalCodeInput).toBeVisible();
    }

    async expectOverviewPageVisible(): Promise<void> {
        await expect(this.title).toHaveText('Checkout: Overview');
        await expect(this.cartItem.first()).toBeVisible();
        await expect(this.summarySubtotal).toBeVisible();
        await expect(this.summaryTax).toBeVisible();
        await expect(this.summaryTotal).toBeVisible();
    }

    async expectOrderCompleted(): Promise<void> {
        await expect(this.title).toHaveText('Checkout: Complete!');
        await expect(this.completeHeader).toHaveText(CHECKOUT_ERRORS.ORDER_SUCCESS);
    }

    async expectValidationError(message: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(message);
    }

    async assertOverviewTotals(tolerance = 0.01): Promise<void> {
        const subtotal = await this.readPrice(this.summarySubtotal);
        const tax = await this.readPrice(this.summaryTax);
        const total = await this.readPrice(this.summaryTotal);

        expect(Math.abs(total - (subtotal + tax))).toBeLessThanOrEqual(tolerance);
    }

    private async readPrice(locator: Locator): Promise<number> {
        const raw = await locator.textContent();
        const value = Number((raw ?? '').replace(/[^0-9.]/g, ''));

        if (Number.isNaN(value)) {
            throw new Error(`Unable to parse numeric value from: ${raw}`);
        }

        return value;
    }
}
