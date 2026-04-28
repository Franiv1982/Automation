import { test, expect } from '@playwright/test';

// 1. Abrimos el test (la llave queda abierta)
test('ejemplo de modificación de respuesta', async ({ page }) => 
{

// 2. Abrimos el interceptor
    await page.route('https://demoqa.com/BookStore/v1/Books', 
        (route) => {
            route.fulfill({
                status: 200,
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body:`
                {
    "books": [
        {
            "isbn": "9781449325862",
            "title": "El libro de Francisco",
            "subTitle": "A Working Introduction",
            "author": "Francisco Rodriguez",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "Francisco R. Editorial",
            "pages": 500,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
        }
            ]
                
        }
            
        `
}) });

// 3. Navegamos a la pagina que hace la peticion a la API
    await page.goto('https://demoqa.com/books');
    await page.pause();
    await page.screenshot({ path: 'Books.png', fullPage: true });

// 4. Validamos que la respuesta modificada se muestre en la pagina
    const bookTitle = await page.locator('.rt-tbody .rt-tr-group .rt-td').first().innerText();
    expect(bookTitle).toBe('El libro de Francisco');
});

        