import { Page, Locator, expect } from '@playwright/test';

export class AmazonLoginPage {
    // Definimos las variables de los elementos (locators)
    readonly page: Page;
    readonly campoEmail: Locator;
    readonly botonContinuar: Locator;
    readonly botonCookies: Locator;

    constructor(page: Page) {
        this.page = page;
        // Inicializamos los selectores que ya probamos
        this.botonCookies = page.locator('#sp-cc-accept');
        this.campoEmail = page.locator('#ap_email_login');
        this.botonContinuar = page.locator('input#continue');
    }

    // Método para navegar a Amazon
    async irA() {
        await this.page.goto('https://www.amazon.es/');
    }

    // Método para aceptar cookies si aparecen
    async aceptarCookies() {
        if (await this.botonCookies.isVisible()) {
            await this.botonCookies.click();
        }
    }

    // Método para completar el primer paso del login
    async iniciarLogin(email: string) {
        await this.page.locator('#nav-link-accountList').click();
        await this.page.waitForURL(/.*signin.*/);
        await this.campoEmail.fill(email);
        await this.botonContinuar.click();
    }
}