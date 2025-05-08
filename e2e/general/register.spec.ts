import { expect } from "@playwright/test";
import { test } from "@/playwright/utils/test";
import dayjs from "dayjs";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Register page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/registrieren");
  });

  test.skip("should display registration form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Konto Erstellen" })
    ).toBeVisible();
    await expect(page.getByLabel("Vorname *")).toBeVisible();
    await expect(page.getByLabel("Nachname *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByLabel("Telefonnummer (optional)")).toBeVisible();

    await expect(page.getByLabel("Ich möchte zurückgerufen")).toBeVisible();
    await expect(page.getByLabel("Ich möchte zurückgerufen")).not.toBeChecked();
    await expect(page.getByLabel("Ich möchte zurückgerufen")).toBeDisabled();

    await expect(page.getByLabel("Ich stimme zu allen")).toBeVisible();
    await expect(page.getByLabel("Ich stimme zu allen")).not.toBeChecked();

    await expect(
      page.getByRole("button", { name: "Konto erstellen" })
    ).toBeVisible();
    await expect(
      page.getByText("Sie haben bereits ein Konto?").locator("visible=true")
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Einloggen" })).toHaveAttribute(
      "href",
      "/einloggen"
    );
  });

  test.skip("should allow user to register", async ({ page }) => {
    await page.getByLabel("Vorname *").fill("Xyz");
    await page.getByLabel("Nachname *").fill("Xyz");
    await page.getByLabel("Email *").fill("xyz@xyz.com");
    await page.getByLabel("Telefonnummer (optional)").fill("151 1234567");

    await expect(
      page.getByLabel("Ich möchte zurückgerufen")
    ).not.toBeDisabled();

    await page.getByLabel("Ich stimme zu allen").check();
    await page.getByRole("button", { name: "Konto erstellen" }).click();

    await expect(
      page.getByRole("heading", { name: "Bitte bestätigen Sie Ihre E-" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Circled checkmark" })
    ).toBeVisible();
    await expect(page.getByRole("main")).toContainText(
      "Ihr Konto wurde erstellt und eine E-Mail Bestätigung wurde an xyz@xyz.com gesendet.Bitte klicken Sie auf den in der E-Mail enthaltenen Verifizierungslink, um Ihre Registrierung abzuschließen."
    );
    await expect(
      page.getByRole("heading", { name: "Keine E-mail bekommen?" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Klicken Sie hier" })
    ).toBeVisible();
  });

  test.skip("should trigger validation on wrong input", async ({ page }) => {
    await page.getByLabel("Vorname *").focus();
    await page.getByLabel("Vorname *").blur();

    await expect(page.locator("#first_name-helper-text")).toContainText(
      "Bitte geben Sie Ihre Vorname."
    );

    await page.getByLabel("Nachname *").focus();
    await page.getByLabel("Nachname *").blur();

    await expect(page.locator("#last_name-helper-text")).toContainText(
      "Bitte geben Sie Ihre Nachname."
    );

    await page.getByLabel("Email *").focus();
    await page.getByLabel("Email *").blur();

    await expect(page.locator("#email-helper-text")).toContainText(
      "Bitte geben Sie Ihre E-mail."
    );

    await page.getByLabel("Email *").fill("xyz");

    await expect(page.locator("#email-helper-text")).toContainText(
      "Muss eine gültige E-mail sein."
    );

    await page.getByLabel("Telefonnummer (optional)").fill("151");
    await page.getByLabel("Telefonnummer (optional)").blur();

    await expect(page.locator("#phone_number-helper-text")).toContainText(
      "Ungültige Telefonnummer."
    );

    await page.getByRole("button", { name: "Konto erstellen" }).click();

    await expect(page.locator("#consent-helper-text")).toContainText(
      "Sie müssen die Nutzungsbedingungen und Datenschutzrichtlinien zustimmen."
    );
  });

  test.skip("should trigger validation error on duplicate email", async ({
    page,
  }) => {
    await page.getByLabel("Vorname *").fill("Xyz");
    await page.getByLabel("Nachname *").fill("Xyz");
    await page.getByLabel("Email *").fill("email@taken.com");

    await page.getByLabel("Ich stimme zu allen").check();
    await page.getByRole("button", { name: "Konto erstellen" }).click();

    await expect(page.locator("#email-helper-text")).toContainText(
      "Diese E-mail Adresse wurde schon benutzt. Bitte prüfen Sie Ihren Posteingang auf eine Bestätigungsnachricht."
    );
  });
});
