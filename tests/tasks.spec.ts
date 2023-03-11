import { test, expect } from "@playwright/test";
import { TaskModel } from "./fixtures/task.model";
import { deleteTaskByHelper, postTask } from "./support/helpers";
import { TasksPage } from "./support/pages/tasks";

import data from "./fixtures/tasks.json";
//import { faker } from '@faker-js/faker';

test('Deve poder cadastrar uma nova tarefa utilizando CSS Selector', async ({ page, request }) => {
    const task = data.success as TaskModel;

    await deleteTaskByHelper(request, task.name);
    
    //const textoDigitado = faker.lorem.words();

    const tasksPage: TasksPage = new TasksPage(page);

    await tasksPage.go();
    await tasksPage.create(task);
    await tasksPage.shouldHaveText(task.name);
    
    //let textoEsperado = page.locator('div:nth-child(3) > p');
    
});

/* test.skip('Deve poder cadastrar uma nova tarefa utilizando Xpath', async ({ page, request }) => {

    const texto_digitado = 'Ler livro de JavaScript';

    await request.delete(`http://localhost:3333/helper/tasks/${texto_digitado}`)

    const tasksPage: TasksPage = new TasksPage(page);
    tasksPage.go();
    
    //const texto_digitado = faker.lorem.words();

    await inputTaskName.fill(texto_digitado);

    const buttonSubmit = page.locator('xpath=//button[contains(text(),"Create")]');
    await buttonSubmit.click();

    //let textoEsperado = page.locator('div:nth-child(3) > p');
    let textoEsperado = page.locator(`css=.task-item p >> text=${texto_digitado}`);
    await expect(textoEsperado).toContainText(texto_digitado);
}); */

/* test.skip('Deve poder cadastrar uma nova tarefa utilizando recurso exclusivo do playwright', async ({ page, request }) => {

    const textoDigitado = 'Finalizar curso de playwright - QAx';

    await request.delete(`http://localhost:3333/helper/tasks/${textoDigitado}`)


    const tasksPage: TasksPage = new TasksPage(page);
    tasksPage.go();
  
    //const textoDigitado = faker.lorem.words();

    const inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    await inputTaskName.fill(textoDigitado);

    await page.click('css=button >> text=Create')

    //let textoEsperado = page.locator('div:nth-child(3) > p');
    //Combinando css com estratégia de localização por texto
    let textoEsperado = page.locator(`css=.task-item p >> text=${textoDigitado}`);
    await expect(textoEsperado).toBeVisible();
}); */

test('não deve permitir tarefa duplicada', async ({ page, request }) => {
    const task = data.duplicate as TaskModel;

    await deleteTaskByHelper(request, task.name);
    await postTask(request, task)

    const tasksPage: TasksPage = new TasksPage(page);

    await tasksPage.go();
    await tasksPage.create(task);
    await tasksPage.alertHaveText('Task already exists!');
 
    //await page.click('css=button >> text=Create')
});

test('campo obrigatório', async ({ page }) => {

    const task = data.required as TaskModel;
    
    const taskPage: TasksPage = new TasksPage(page);

    await taskPage.go();
    await taskPage.create(task);

    //campo obrigatório sem a mensagem em HTML
    const validationMessage = await taskPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
})
