import {test, expect} from '@playwright/test';

test('login with valid credentials', async ({page}) => {
    
    // Aumentamos el timeout a 60 segundos para permitir resolver posibles captchas o verificaciones adicionales de Amazon
    test.setTimeout(60000); 
    // Navegacion a la pàgina de login de Amazon
    await page.goto('https://www.amazon.es/');

    // Hacemos clic en el boton de "Sign in" para ir a la pagina de login
    await page.locator('#nav-link-accountList').click();

    // Esperamos que la pagina de login cargue correctamente
    await expect(page).toHaveURL(/.*signin.*/);

    // Rellenamos el campo de email con un correo valido
    await page.locator('#ap_email_login').fill('franiv1110@gmail.com');

    // Hacemos clic en el boton de "Continuar" para ir al siguiente paso del login
    await page.locator('.a-button-input').click();

    // Esperamos que el campo de password sea visible para asegurarnos que la pagina cargo correctamente
    await expect(page.locator('#ap_password')).toBeVisible();

    // Rellenamos el campo de password con una contraseña valida
    await page.locator('#ap_password').fill('5V4/j-fRs2CPVr*');

    // Hacemos clic en el boton de "Iniciar sesión" para completar el proceso de login
    await page.locator('.a-button-input').click();

    // Esperamos que la pagina de inicio cargue correctamente despues del login exitoso
    await expect(page).toHaveURL('https://www.amazon.es/?ref_=nav_ya_signin');

    // 5 segundos para resolver cualquier posible captcha o verificacion adicional 
    // que Amazon pueda solicitar despues del login
    await page.waitForTimeout(5000); 

    // Validamos que el nombre del usuario logueado sea visible en la pagina de inicio, lo que indica que el login fue exitoso
    await expect(page.locator('#nav-link-accountList-nav-line-1')).toHaveText('Hello, Francisco');

    await page.pause();
})  





