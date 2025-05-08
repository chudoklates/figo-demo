import { expect } from "@playwright/test";
import { test } from "@/playwright/utils/test";
import {
  encryptedToken,
  invalidEncryptedToken,
} from "@/playwright/fixtures/auth";

test.describe("Verify page", () => {
  test.skip("should display verification form", async ({ page }) => {
    await page.goto(`/verifizieren?data=${encryptedToken}`);

    await expect(
      page.getByRole("heading", { name: "Passwort wählen" })
    ).toBeVisible();
    await expect(page.getByLabel("Passwort *")).toBeVisible();
    await expect(page.getByText("Passwortstärke: -")).toBeVisible();
    await expect(page.getByRole("progressbar")).toBeVisible();
    await expect(page.getByLabel("Passwort bestätigen *")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Bestätigen" })
    ).toBeVisible();
  });

  test.skip("should allow user to verify", async ({ page }) => {
    await page.goto(`/verifizieren?data=${encryptedToken}`);

    await page.getByLabel("Passwort *").fill("1234567890!Aa");
    await page.getByLabel("Passwort bestätigen *").fill("1234567890!Aa");

    await page.getByRole("button", { name: "Bestätigen" }).click();

    await page.waitForURL("/app/einfuehrung/interessen");
  });

  test.skip("should indicate password strength", async ({ page }) => {
    await page.goto(`/verifizieren?data=${encryptedToken}`);

    await page.getByLabel("Passwort *").focus();

    await expect(
      page.getByText("Ihr Passwort muss bestehen aus:")
    ).toBeVisible();
    await expect(page.getByText("Mindestens 8 Zeichen")).toBeVisible();
    await expect(page.getByText("Mindestens ein Symbol (#&*)")).toBeVisible();
    await expect(page.getByText("Mindestens eine Zahl")).toBeVisible();
    await expect(page.getByText("Groß- und Kleinbuchstaben")).toBeVisible();

    await page.getByLabel("Passwort *").fill("a");

    await expect(page.getByText("Sehr Schwach")).toBeVisible();

    await page.getByLabel("Passwort *").fill("abc1#");

    await expect(page.getByText("Schwach")).toBeVisible();

    await page.getByLabel("Passwort *").fill("abcdef1#");

    await expect(page.getByText("Mittel")).toBeVisible();

    await page.getByLabel("Passwort *").fill("abcdeF1#");

    await expect(page.getByText("Stark")).toBeVisible();

    await page.getByLabel("Passwort *").blur();

    await expect(page.getByText("Passwortstärke: Stark")).toBeVisible();
    await expect(page.getByText("Mindestens 8 Zeichen")).not.toBeVisible();
  });

  test.skip("should display validation errors", async ({ page }) => {
    await page.goto(`/verifizieren?data=${encryptedToken}`);

    await page.getByLabel("Passwort *").fill("123");
    await page.getByLabel("Passwort *").blur();

    await expect(page.locator("#password-helper-text")).toContainText(
      "Das Passwort darf mindestens 8 Zeichen lang sein."
    );

    await page.getByLabel("Passwort *").fill("12345678");
    await page.getByLabel("Passwort *").blur();

    await expect(page.locator("#password-helper-text")).toContainText(
      "Das Passwort muss mindestens eine Zahl, einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen enthalten."
    );

    await page.getByLabel("Passwort *").fill("1234567890!Aa");
    await page.getByLabel("Passwort *").blur();

    await expect(page.locator("#password-helper-text")).toContainText("");

    await page.getByLabel("Passwort bestätigen *").fill("123");
    await page.getByLabel("Passwort bestätigen *").blur();

    await expect(page.locator("#confirmPassword-helper-text")).toContainText(
      "Das erneut eingegebene Passwort stimmt nicht mit Ihrem Passwort überein."
    );

    await page.getByLabel("Passwort bestätigen *").fill("1234567890!Aa");

    await expect(page.locator("#confirmPassword-helper-text")).toContainText(
      ""
    );
  });

  test.skip("should display error page when data param is corrupted", async ({
    page,
  }) => {
    await page.goto(`/verifizieren?data=xyz`);

    await expect(
      page.getByRole("heading", { name: "Uuuuups...." })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Etwas ist schief gegangen!" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Lantern shining light" })
    ).toBeVisible();
    await expect(page.getByRole("main")).toContainText(
      "Bei dem Link, den Sie für die Bestätigung Ihres Kontos verwenden, ist ein Fehler aufgetreten. Bitte überprüfen Sie noch einmal, ob Sie den richtigen Link aus der E-Mail verwenden."
    );
  });

  test.skip("should display error page when token is invalid/expired", async ({
    page,
  }) => {
    await page.goto(`/verifizieren?data=${invalidEncryptedToken}`);

    await page.getByLabel("Passwort *").fill("1234567890!Aa");
    await page.getByLabel("Passwort bestätigen *").fill("1234567890!Aa");

    await page.getByRole("button", { name: "Bestätigen" }).click();

    await expect(
      page.getByRole("heading", { name: "Uuuuups...." })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Etwas ist schief gegangen!" })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Lantern shining light" })
    ).toBeVisible();
    await expect(
      page.getByText(
        "Der Link, den Sie verwenden wollten, ist nicht mehr gültig."
      )
    ).toBeVisible();
    await expect(
      page.getByText(`"Passwort vergessen" Formular`)
    ).toHaveAttribute("href", "/passwort-vergessen");
  });
});
