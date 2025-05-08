import { expect } from "@playwright/test";
import { test } from "@/playwright/utils/test";

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Logout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/app/dashboard");
  });

  test.skip("should logout user", async ({ page }) => {
    await expect(page.locator("#open-button")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Playwright Test" })
    ).toBeVisible();

    await page.locator("#open-button").click();

    await page.getByRole("menuitem", { name: "Ausloggen" }).click();

    await expect(
      page.getByRole("heading", { name: "Bis bald! ✨" })
    ).toBeVisible();

    await page.waitForURL("/");

    await expect(page.locator("#open-button")).not.toBeVisible();
  });
});
