import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config(
  {
    path:`env.qa`
  }
);
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,

    // Tiempo máximo para page.goto() en milisegundos (ej: 45 segundos)
    navigationTimeout: 70000,

    // Velocidad para que tú puedas observar
    launchOptions: {
      slowMo: 1000,
      // Añadimos los argumentos para desactivar las llaves de acceso (Passkeys)
      args: ['--disable-webauthn'],
    },

    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // Configuramos para que en cada prueba se genere un trace,
    // una captura de pantalla y un video, para tener evidencia de lo que pasó en cada ejemplo 
    // y poder analizarlo posteriormente.
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Configurar proyectos para ejecutar en diferentes navegadores, dispositivos o configuraciones especificas.
  // En este caso, se ejecutará en Chrome Desktop, pero tambien se pueden agregar Firefox, Safari, Edge, dispositivos moviles, etc.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

   /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
