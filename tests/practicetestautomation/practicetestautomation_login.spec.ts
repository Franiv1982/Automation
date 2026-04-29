import {test, expect} from '@playwright/test';
import { PracticetestLoginPage } from './pageobjects/practicetest_login';

test('login with valid credentials', async ({page}) => {
    const loginPage = new PracticetestLoginPage(page);

    // Aumentamos el timeout a 60 segundos para permitir resolver posibles captchas o verificaciones adicionales de Amazon
    test.setTimeout(60000); 
    // Navegacion a la pàgina de login
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // Hacemos clic en el boton de "Sign in" para ir a la pagina de login
    //await page.locator('#nav-link-accountList').click();

    // Esperamos que la pagina de login cargue correctamente
    await expect(page).toHaveURL(/.*practice-test-login.*/);

    // Rellenamos el campo de username con un nombre de usuario valido
    await page.locator('#username').fill('student');

    // Hacemos clic en el boton de "Continuar" para ir al siguiente paso del login
    //await page.locator('.a-button-input').click();

    // Esperamos que el campo de password sea visible para asegurarnos que la pagina cargo correctamente
    //await expect(page.locator('#password')).toBeVisible();

    // Rellenamos el campo de password con una contraseña valida
    await page.locator('#password').fill('Password123');

    // Hacemos clic en el boton "submit" para completar el proceso de login
    await page.locator('#submit').click();

    // Esperamos que la pagina de inicio cargue correctamente despues del login exitoso
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');

    // 5 segundos para resolver cualquier posible captcha o verificacion adicional 
    // que se pueda solicitar despues del login
    await page.waitForTimeout(3000); 

    // Validamos que el nombre del usuario logueado sea visible en la pagina de inicio, lo que indica que el login fue exitoso
    await expect(page.locator('.has-text-align-center')).toHaveText('Congratulations student. You successfully logged in!');

    await page.close();
    
})  





