import {expect, test} from '../pages/Base.ts'

test.afterEach(async ({page}) => {
    await page.close();
})

test('Add a Product to Cart', async ({loginPage, inventoryPage}) => {
    //Setting the product that will be tested
    const product = 'onesie'

    await loginPage.goto();
    //Since in this dummy website I wasn't able to keep the logged status inside .auth, so I have to login in every test.
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

    expect(await inventoryPage.getAddButton(product)).toBeVisible();
    await inventoryPage.addProductToCart(product);
    expect(await inventoryPage.getRemoveButton(product)).toBeVisible(); //Assert that the button changed to 'Remove'
})

test('Remove Product from Cart', async ({loginPage, inventoryPage}) => {
    //Setting up the product that will be tested
    const product = 'backpack'

    await loginPage.goto();
    //Since in this dummy website I wasn't able to keep the logged status inside .auth, so I have to login in every test.
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    
    await inventoryPage.addProductToCart(product);
    await inventoryPage.removeProductFromCart(product);
    expect(await inventoryPage.getAddButton(product)).toBeVisible(); //Assert that the button changed to 'Add to cart'
})

test('Logout from application', async({page, loginPage, inventoryPage}) =>{
    await loginPage.goto()
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    await inventoryPage.hamburguerMenuButton.click();
    await inventoryPage.logout();
    await expect(page).toHaveURL(loginPage.url); //Assert the page has the login URL
})

test('Sort products Price Low to High', async({loginPage, inventoryPage}) => {
    await loginPage.goto();
    //Since in this dummy website I wasn't able to keep the logged status inside .auth, so I have to login in every test.
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

    await inventoryPage.sortPage('lohi');
    await expect(inventoryPage.selectedFilterOption).toHaveText('Price (low to high)'); //Assert the label of the filter option
})
