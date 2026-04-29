import { Page, Locator} from '@playwright/test';

// Clase que representa la página de login de Practicetest
export class PracticetestLoginPage {
    // Definimos las variables de los elementos (locators)
    readonly page: Page;
    readonly campoUsername: Locator;
    readonly campoPassword: Locator;
    readonly botonSubmit: Locator;    

    // Constructor de la clase, donde inicializamos los locators
    constructor(page: Page) {
        this.page = page;
        // Inicializamos los selectores que ya probamos
        this.campoUsername = page.locator('#username');
        this.campoPassword = page.locator('#password');
        this.botonSubmit = page.locator('#submit');
    }

    // Método para navegar a Practicetest
    async irA() {
        await this.page.goto('https://practicetestautomation.com/practice-test-login/');
    }

    // Método para completar el primer paso del login
    async iniciarLogin(username: string, password: string) {
        await this.campoUsername.fill(username);
        await this.campoPassword.fill(password);
        await this.botonSubmit.click();
    }
}