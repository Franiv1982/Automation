import { expect, Locator, Page } from '@playwright/test';

// La clase LoginPage representa la página de login de SauceDemo
// Utiliza el patrón de diseño Page Object Model para encapsular la lógica de interacción con la página
export class LoginPage {
    async loginWithCredentials(username: string, password: string) {
        await this.login(username, password);
    }
    // Definimos los elementos de la página como variables privadas
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    // El constructor recibe la instancia de Page y define los selectores especificos de SauceDemo
    // Esto permite que el Page Object Model sea reutilizable y específico para la aplicación que estamos probando
    constructor(page: Page) {
        this.page = page;
        // Selectores específicos de SauceDemo
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    // Método para escribir el usuario 
    // Cada método representa una acción específica que se puede realizar en la página de login
    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    // Método para escribir la contraseña
    // Al encapsular estas acciones en métodos, podemos reutilizarlos en diferentes pruebas sin tener que repetir el código de interacción con la página
    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    // Método para hacer clic en el botón de login
    // Este método se encarga de realizar la acción de login, y al ser parte del Page Object Model, permite que las pruebas sean más legibles y mantenibles
    async clickLogin() {
        await this.loginButton.click();
    }

    // Método opcional para hacer todo el proceso de una vez
    // Este método combina las acciones de llenar el usuario, la contraseña y hacer clic en login en un solo paso, lo que puede ser útil para simplificar las pruebas que solo necesitan realizar un login rápido
    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    // Método para verificar si el login fue exitoso
    // Este método puede ser utilizado para validar que el login 
    // se realizó correctamente, por ejemplo, verificando la URL o
    // la presencia de un elemento específico en la página después del login
    async checkLoginSuccess() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(this.page.locator('.inventory_container')).toBeVisible();
    }
}