import {expect, test} from '../pages/Base.ts'

test.afterEach(async ({page}) => {
    await page.close();
})

test('Add a Product to Cart', async ({loginPage, inventoryPage, cartPage}) => {
    const product = 'bike light' //Defining the product to be tested
    await loginPage.goto(); 
    await loginPage.login(process.env.UNAME, process.env.PWORD); //Since this website doesn't store a session I need to login in every test
    await inventoryPage.addProductToCart(product);
    await inventoryPage.cartButton.click();
    expect(await cartPage.getCartItem(product)).toContainText('Sauce Labs Bike Light '); //Asserting that the correct product has been added to the cart
})

test('Remove Product from Cart', async ({loginPage, inventoryPage}) => {
    const product = 'backpack'
    await loginPage.goto();
    await loginPage.login(process.env.UNAME, process.env.PWORD);
    await inventoryPage.addProductToCart(product);
    await inventoryPage.removeProductFromCart(product);
    expect(await inventoryPage.getAddButton(product)).toBeVisible(); //Assert that the button changed to 'Add to cart'
})

test('Logout from application', async({page, loginPage, inventoryPage}) =>{
    await loginPage.goto()
    await loginPage.login(process.env.UNAME, process.env.PWORD);
    await inventoryPage.hamburguerMenuButton.click();
    await inventoryPage.logout();
    await expect(page).toHaveURL(loginPage.url); //Assert the page has the login URL
})

test('Sort products Price Low to High', async({loginPage, inventoryPage}) => {
    await loginPage.goto();
    await loginPage.login(process.env.UNAME, process.env.PWORD);
    await inventoryPage.sortPage('lohi');
    await expect(inventoryPage.selectedFilterOption).toHaveText('Price (low to high)'); //Assert the label of the filter option
})
