import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test('purchase an item 2', async ({ page, context }) => {
    // 1. ELIMINAR SERVICE WORKERS (Esto es lo que falta)
    // En interceptor.spec.ts
await context.addInitScript(() => {
    // En lugar de delete, definimos la propiedad como undefined
    Object.defineProperty(window.navigator, 'serviceWorker', {
        writable: true,
        value: undefined
    });
});

    // 2. LOGS PARA DEBUGEAR
    page.on("request", req => {
        if (req.resourceType() === 'image') console.log("➡️ Solicitando imagen:", req.url());
    });

    await page.route("**/*.{png,jpg,jpeg,gif,svg}", (route) => {
        console.log("🚫 Imagen bloqueada por extensión");
        route.abort()
});

    // 3. INTERCEPTORES (Con Regex pura, sin comillas)
    //await page.route(/.*bike-light.*/, route => {
    //    console.log('✅ ¡BLOQUEADO!: Luz de bicicleta');
    //    return route.abort();});

    //await page.route(/.*bolt-shirt.*/, route => {
    //    console.log('✅ ¡BLOQUEADO!: Camiseta de bolt');
    //    return route.abort();});

    // 4. FLUJO DE TEST
    await page.goto('https://www.saucedemo.com/');
    const login = new LoginPage(page);
    await login.loginWithCredentials('standard_user', 'secret_sauce');
    
    // Verificamos éxito y esperamos a que la red descanse
    await login.checkLoginSuccess();
    await page.waitForLoadState('networkidle');

    // 5. CAPTURA
    await page.screenshot({ path: 'resultado_final.png', fullPage: true });
});