import { expect } from "@playwright/test";
import { test } from "@/playwright/utils/test";

test.use({ storageState: { cookies: [], origins: [] } });

const EMAIL = "playwright@test.com";
const PASSWORD = "1234567890!Aa";

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/einloggen");
  });

  test.skip("should display login form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Einloggen" })
    ).toBeVisible();
    await expect(page.getByText("Noch kein Konto? Registrieren")).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: "Registrieren" })
    ).toHaveAttribute("href", "/registrieren");
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    await expect(page.getByText("Passwort vergessen? Klicken")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Klicken Sie hier!" })
    ).toHaveAttribute("href", "/passwort-vergessen");
  });

  test.skip("should login user", async ({ page }) => {
    await page.getByLabel("Email").fill(EMAIL);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL("/app/dashboard");
    await expect(
      page.getByRole("heading", { name: "Playwright Test" })
    ).toBeVisible();
  });

  test.skip("should trigger validation on wrong input", async ({ page }) => {
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").blur();
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").blur();

    await expect(page.locator("#email-helper-text")).toContainText(
      "Bitte geben Sie Ihre E-mail."
    );
    await expect(page.locator("#password-helper-text")).toContainText(
      "Bitte geben Sie Ihr Passwort ein."
    );

    await page.getByLabel("Email").fill("xyz");
    await page.getByLabel("Email").blur();

    await expect(page.locator("#email-helper-text")).toContainText(
      "Muss eine gültige E-mail sein."
    );

    await page.getByLabel("Email").fill("xy@xy.zx");
    await page.getByLabel("Password").fill("xyz");

    await expect(page.locator("#email-helper-text")).toContainText("");
    await expect(page.locator("#password-helper-text")).toContainText("");
  });

  test.skip("should give wrong credentials error", async ({ page }) => {
    await page.getByLabel("Email").fill(EMAIL);
    await page.getByLabel("Password").fill("xyz");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#email-helper-text")).toContainText(
      "Ungültige Zugangsdaten"
    );

    await expect(page.locator("#password-helper-text")).toContainText(
      "Ungültige Zugangsdaten"
    );
  });

  test.skip("should show error when login is not possible", async ({
    page,
  }) => {
    // Simulate API failure
    await page.route("*/**/graphql", async (route) => {
      const postData = route.request().postDataJSON();

      if (!postData || postData?.operationName !== "loginParticipant") {
        return route.continue();
      }

      await route.abort("failed");
    });

    await page.getByLabel("Email").fill(EMAIL);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#email-helper-text")).toContainText(
      "Ein Fehler ist aufgetreten"
    );
  });
});
