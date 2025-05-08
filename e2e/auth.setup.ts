import { expect } from "@playwright/test";
import { test as setup } from "@/playwright/utils/test";

const authFile = "playwright/.auth/user.json";

const EMAIL = "playwright@test.com";
const PASSWORD = "1234567890!Aa";

setup("authenticate", async ({ page }) => {
  await page.goto("/einloggen");
  await page.getByLabel("Email").fill(EMAIL);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("/app/dashboard");
  await expect(
    page.getByRole("heading", { name: "Playwright Test" })
  ).toBeVisible();
  await page.context().storageState({ path: authFile });
});
