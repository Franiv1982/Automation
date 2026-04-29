import { test, expect } from '@playwright/test';
import { PracticetestLoginPage } from '../../pageobjects/practiceTestLogin';

test('login with valid credentials', async ({ page }) => {
    const loginPage = new PracticetestLoginPage(page);

    // 1. Ir a la página usando el método de tu clase
    await loginPage.irA();

    // 2. Hacer el login usando el método que ya tiene los selectores (#username, #password, #submit)
    // El método ya sabe que debe esperar a que los campos aparezcan
    await loginPage.iniciarLogin('student', 'Password123');

    // 3. Validar el éxito
    await expect(page).toHaveURL(/.*logged-in-successfully.*/);
});





