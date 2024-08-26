import {type Locator, type Page} from '@playwright/test'

export class CartPage{
    readonly page:Page;
    readonly cartTitle:Locator;
    readonly checkoutButton:Locator;
    readonly removeButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.cartTitle = this.page.getByText('Your Cart');
        this.checkoutButton = this.page.getByRole('button', {name: 'Checkout'});
        this.removeButton = this.page.getByRole('button', {name: 'Remove'});
    }
}