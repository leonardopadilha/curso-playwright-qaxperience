import { Page, expect, Locator } from "@playwright/test";
import { TaskModel } from "../../../fixtures/task.model";

export class TasksPage {

    readonly page: Page;
    readonly inputTaskName: Locator
    
    constructor(page: Page) {
        this.page = page
        this.inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    }

    async create (task: TaskModel) {
        await this.page.fill('input[placeholder="Add a new Task"]', task.name)
        await this.page.click('button[class*="ButtonNewTask"]')
    }

    async toogle(taskName: string) {
        const localizador = `xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`;
        
        const target = this.page.locator(localizador)
        await target.click()
    }

    async remove(taskName: string) {
        const localizador = `xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`;
        
        const target = this.page.locator(localizador)
        await target.click()
    }

    async go() {
        await this.page.goto('/')
    }

    async shouldHaveText(taskName: string) {
        let textoEsperado = this.page.locator(`css=.task-item p >> text=${taskName}`);
        await expect(textoEsperado).toBeVisible();
    }

    async shouldNotExist(taskName: string) {
        let textoEsperado = this.page.locator(`css=.task-item p >> text=${taskName}`);
        await expect(textoEsperado).not.toBeVisible();
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async shouldBeDone(tasName: string) {
        const target = this.page.getByText(tasName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }
}