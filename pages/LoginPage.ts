import {type Locator, type Page} from '@playwright/test'

export class LoginPage{
    public url  = 'https://www.saucedemo.com';
    readonly page:Page;
    readonly username:Locator;
    readonly password:Locator;
    readonly loginButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.username = this.page.getByPlaceholder('Username');
        this.password = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button',{name: 'Login'});
    }

    public async goto(){
        await this.page.goto(this.url);
    }

    public async login(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    
}