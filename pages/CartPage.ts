import {type Locator, type Page} from '@playwright/test'

export class CartPage{
    readonly page:Page;
    readonly cartTitle:Locator;
    readonly checkoutButton:Locator;
    readonly removeButton:Locator;
    readonly cartItem:Locator;

    constructor(page:Page){
        this.page = page;
        this.cartTitle = this.page.getByText('Your Cart');
        this.checkoutButton = this.page.getByRole('button', {name: 'Checkout'});
        this.removeButton = this.page.getByRole('button', {name: 'Remove'});
        this.cartItem = this.page.getByTestId('inventory-item-name');
    }

    //This method makes sure that we get the correct Cart Item to interact.
    public async getCartItem(productName:string){
        return this.cartItem.and(this.page.getByText(`Sauce Labs ${productName}`));//Use the actual name in this method, e.g 'Backpack', 'Bike Light'
    }
}