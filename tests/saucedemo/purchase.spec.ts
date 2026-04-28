import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';
import { InventoryPage } from './pageobjects/InventoryPage';

test('purchase an item', async ({ page }, testInfo) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    // 1. Navegacion y login con captura de pantalla usando Page Object Model
    await page.goto('https://www.saucedemo.com/');
    await login.fillUsername('standard_user');
    //await page.screenshot({ path: 'screenshots/username_filled.png' });
    await login.fillPassword('secret_sauce');

    // Captura de pantalla despues de llenar el formulario de login
    //await page.screenshot({ path: 'screenshots/password_filled.png', fullPage: true });
    await testInfo.attach('intento de login', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
    });
    await login.clickLogin();

    // Captura de pantalla depues del login exitoso
    //await page.screenshot({ path: 'screenshots/login_successful.png', fullPage: true });
    await testInfo.attach('login exitoso - Dashboard', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
    });
    await login.checkLoginSuccess();    

    //2. Captura de todos los productos disponibles en una lista (Array)
    const itemsContainer = await page.locator('.inventory_container .inventory_item').all();
    
    //3. Generamos un inidice aleatorio para elegir un producto al azar
    // Math random devuelve un numero entre 0 y 1, lo multiplicamos por 
    // la cantidad de productos para obtener un numero dentro del rango de indices del array
    const randomIndex = Math.floor(Math.random() * itemsContainer.length);
    const randomItem = itemsContainer[randomIndex];

    //4. Captura de los datos del producto seleccionado (Expected Data)
    // Se usa randomitem.locator para buscar dentro del producto seleccionado
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectedName = await randomItem.locator('.inventory_item_name').innerText();
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

    // Imprimimos en consola los datos del producto seleccionado al azar
    console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`);
    //await page.screenshot({ path: 'screenshots/selected_product.png', fullPage: true });

    //5. Accion: Hacemos clic en el boton de "Add to cart" del producto seleccionado
    // Se usa randomitem.getByRole para buscar el boton dentro del producto seleccionado
    await randomItem.getByRole('button', { name: 'Add to cart' }).click();

    // Captura de confirmacion del producto agregado al carrito
    //await page.screenshot({ path: 'screenshots/selected_product_added.png', fullPage: true });

    //6. Navegamos al carrito de compras
    await page.locator('a.shopping_cart_link').click();

    // Esperamos que la pagina del carrito cargue correctamente
    await page.waitForURL('**/cart.html');

    // Esperamos que el titulo del carrito sea visible para asegurarnos que la pagina cargo correctamente
    await expect(page.locator('text=Your Cart')).toBeVisible();

    // Captura de pantalla con el producto agregado al carrito
    //await page.screenshot({ path: 'screenshots/cart_inventory_review.png', fullPage: true });

    //7. Validaciones visuales: Confirmamos que el boton de "Checkout" es visible 
    // en el carrito, lo que indica que el producto se agrego correctamente
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    //await page.screenshot({ path: 'screenshots/cart_with_product.png', fullPage: true });

    //8. Capturamos los datos reales del producto que se encuentra en el carrito (Actual Data)
        const actualName = await page.locator('.inventory_item_name').innerText();
        const actualDescription = await page.locator('.inventory_item_desc').innerText();
        const actualPrice = await page.locator('.inventory_item_price').innerText();

    //9. Validamos que los datos reales (Actual Data) coincidan con los datos esperados (Expected Data)
    expect(actualName).toEqual(expectedName);
    expect(actualDescription).toEqual(expectedDescription);
    expect(actualPrice).toEqual(expectedPrice);

    //10. Accion: Hacemos clic en el boton de "Checkout" para iniciar el proceso de compra
    await page.getByRole('button', { name: 'Checkout' }).click();

    //11. Completamos el formulario de informacion del comprador
    await page.getByRole('textbox', { name: 'First Name' }).fill('QA');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Tester');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');

    //12. Hacemos clic en el boton de "Continue" para avanzar al resumen de la orden
    await page.getByRole('button', { name: 'Continue' }).click();
    // Hacemos clic en el boton de "Finish" para completar la compra
    await page.getByRole('button', { name: 'Finish' }).click();

    // Validaciones finales
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();

    // Espera dinamica para validar que el boton de final este visible(reemplaza el page.pause())
        const backHomeBtn = page.getByRole('button', {name: 'Back Home'});
    // Esperamos que el boton sea visible  
        await backHomeBtn.waitFor({state: 'visible'});

    // Hacemos clic en el boton de "Back Home" para volver a la pagina de productos
    await backHomeBtn.click();

    // Verificamos que volvimos a la pagina de inventario
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Ahora si cerramos el navegador
    await page.close();
});