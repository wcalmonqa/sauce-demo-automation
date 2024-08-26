import { type Locator, type Page } from '@playwright/test'

export class InventoryPage{
    readonly page:Page;
    readonly hamburguerMenuButton:Locator;
    readonly cartButton:Locator;
    readonly selectedFilterOption:Locator;
    readonly filterSelect:Locator;
    readonly addToCartButton:Locator;
    readonly removeButton:Locator;
    readonly logoutButton:Locator;
    readonly numberOfProductsInCart:Locator;

    constructor(page:Page){
        this.page = page;
        this.hamburguerMenuButton = this.page.getByRole('button', {name: 'Open Menu'});
        this.cartButton = this.page.getByTestId('shopping-cart-link');
        this.selectedFilterOption = this.page.getByTestId('active-option');
        this.filterSelect = this.page.getByTestId('product-sort-container');
        this.addToCartButton = this.page.getByRole('button', {name: 'Add to cart'});
        this.removeButton = this.page.getByRole('button', {name: 'Remove'});
        this.logoutButton = this.page.getByRole('link', {name: 'Logout'})
        this.numberOfProductsInCart = this.page.getByTestId('shopping-cart-badge');
    }

    //The options available for the filter are: 'az','za','hilo' and 'lohi'
    public async sortPage(value:string){
        this.filterSelect.selectOption(value)
    }

    public async goToCart(){
        await this.cartButton.click();
    }

    //Return the Add to Cart Button that matches the desired product.
    //Use the end of the product as input to this method e.g. 'backpack' for Sauce Labs Backpack
    public async getAddButton(product){
        return this.addToCartButton.and(this.page.getByTestId(`add-to-cart-sauce-labs-${product}`));
    }

    //Use the end of the product as input to this method e.g. 'backpack' for Sauce Labs Backpack
    public async addProductToCart(product){
        const btn = await this.getAddButton(product)
        await btn.click();
    }

    //Return the Remove Button that matches the desired product.
    //Use the end of the product as input to this method e.g. 'backpack' for Sauce Labs Backpack
    public async getRemoveButton(product){
        return this.removeButton.and(this.page.getByTestId(`remove-sauce-labs-${product}`));
    }

    //Use the end of the product as input to this method e.g. 'backpack' for Sauce Labs Backpack
    public async removeProductFromCart(product){
        const btn = await this.getRemoveButton(product);
        await btn.click();
    }

    public async openHamburguerMenu(){
        await this.hamburguerMenuButton.click();
    }

    public async logout(){
        await this.logoutButton.click();
    }
}