import { test, expect } from "@playwright/test";

test("webapp deve estar online", async ({ page }) => {
  let titulo = "Gerencie suas tarefas com Mark L";

  await page.goto("http://127.0.0.1:3000/");
  await expect(page).toHaveTitle(titulo);
  //await page.waitForTimeout(3000);
});
