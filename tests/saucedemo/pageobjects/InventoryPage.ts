import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    // Definimos las variables para la pagina y los elementos que vamos a interactuar
    private readonly page: Page;
    private readonly itemsCards: Locator;

    // Creamos el contructor para inicializar las variables y definir los selectores de los elementos de la pagina
    constructor(page: Page) {
        this.page = page;
        // Selector para los productos en la pagina de inventario
        this.itemsCards = page.locator('.inventory_item');
    }
    // Metodo para seleccionar un producto aleatorio y devuelve un objeto con sus datos
    async addRandomProductToCart() {
        //1. Captura de los productos disponibles en la pagina en una lista (Array)
        const itemsContainer = await this.itemsCards.all();
        
        //2. Generamos un indice aleatorio para elegir un producto al azar
        const randomIndex = Math.floor(Math.random() * itemsContainer.length);
        const randomItem = itemsContainer[randomIndex];

        //3. Captura de los datos del producto seleccionado (Expected Data)
        const name = await randomItem.locator('.inventory_item_name').innerText();
        const desc = await randomItem.locator('.inventory_item_desc').innerText();
        const price = await randomItem.locator('.inventory_item_price').innerText();

        //4. Hacemos clic en el boton de "Add to cart" del producto seleccionado
        await randomItem.getByRole('button', { name: 'Add to cart' }).click();
        
        //5. Devolvemos un objeto con los datos del producto seleccionado
        return { name, desc, price };
    }
    //6. Metodo para navegar al carrito de compras
    async goToCart() {
        await this.page.locator('a.shopping_cart_link').click();
    }
}