import { test, expect } from "@playwright/test";
//import { faker } from '@faker-js/faker';

test('Deve poder cadastrar uma nova tarefa utilizando CSS Selector', async ({ page, request }) => {
    

    const textoDigitado = 'Ler um livro de TypeScript';

    await request.delete(`http://localhost:3333/helper/tasks/${textoDigitado}`)
    
    await page.goto('http://127.0.0.1:3000')

    //const textoDigitado = faker.lorem.words();


    await page.fill('input[placeholder="Add a new Task"]', textoDigitado)
    await page.click('button[class*="ButtonNewTask"]')

    //let textoEsperado = page.locator('div:nth-child(3) > p');
    let textoEsperado = page.locator(`css=.task-item p >> text=${textoDigitado}`);
    await expect(textoEsperado).toContainText(textoDigitado);
});

test('Deve poder cadastrar uma nova tarefa utilizando Xpath', async ({ page, request }) => {

    const texto_digitado = 'Ler livro de JavaScript';

    await request.delete(`http://localhost:3333/helper/tasks/${texto_digitado}`)

    await page.goto('http://127.0.0.1:3000')

    //const texto_digitado = faker.lorem.words();

    const inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    await inputTaskName.fill(texto_digitado);

    const buttonSubmit = page.locator('xpath=//button[contains(text(),"Create")]');
    await buttonSubmit.click();

    //let textoEsperado = page.locator('div:nth-child(3) > p');
    let textoEsperado = page.locator(`css=.task-item p >> text=${texto_digitado}`);
    await expect(textoEsperado).toContainText(texto_digitado);
});

test('Deve poder cadastrar uma nova tarefa utilizando recurso exclusivo do playwright', async ({ page, request }) => {

    const textoDigitado = 'Finalizar curso de playwright - QAx';

    await request.delete(`http://localhost:3333/helper/tasks/${textoDigitado}`)
    
    await page.goto('http://127.0.0.1:3000')

    //const textoDigitado = faker.lorem.words();

    const inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    await inputTaskName.fill(textoDigitado);

    await page.click('css=button >> text=Create')

    //let textoEsperado = page.locator('div:nth-child(3) > p');
    //Combinando css com estratégia de localização por texto
    let textoEsperado = page.locator(`css=.task-item p >> text=${textoDigitado}`);
    await expect(textoEsperado).toBeVisible();
});

