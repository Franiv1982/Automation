import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test('login exitoso en saucedemo', async ({ page }) => {
    // Inicializamos el objeto de la página
    const login = new LoginPage(page);

    // 1. Navegamos a la URL
    await page.goto('https://www.saucedemo.com/');

    // 2. Usamos los métodos que definimos en nuestro Page Object
    await login.fillUsername('standard_user');
    await login.fillPassword('secret_sauce');
    await login.clickLogin();

    // 3. Verificamos que entramos correctamente
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});