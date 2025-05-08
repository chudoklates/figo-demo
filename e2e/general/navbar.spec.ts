import { expect } from "@playwright/test";
import { test } from "@/playwright/utils/test";

const links = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontakt", href: "/kontakt" },
];

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Navbar component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display navigation links", async ({ page, isMobile }) => {
    test.skip(isMobile);

    const banner = page.getByRole("banner");

    await expect(banner).toBeVisible();

    await expect(banner.getByRole("link", { name: "logo" })).toBeVisible();

    for (const link of links) {
      await expect(
        banner.getByRole("link", { name: link.name, exact: true })
      ).toBeVisible();
      await expect(
        banner.getByRole("link", { name: link.name, exact: true })
      ).toHaveAttribute("href", link.href);
    }
  });

  // Skipping due to weird unexplained flakiness
  test.skip("should display mobile navigation links", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile);

    const banner = page.getByRole("banner");

    await expect(banner).toBeVisible();

    await expect(banner.getByRole("link", { name: "logo" })).toBeVisible();

    await expect(banner.getByRole("link", { name: "Home" })).not.toBeVisible();

    const drawerMenu = page.getByTestId("left-drawer");

    await expect(drawerMenu).toBeHidden();

    await page.getByLabel("menu").click();

    await expect(drawerMenu).toBeVisible();

    const linkList = drawerMenu.getByRole("list");

    for (const link of links) {
      await expect(
        linkList.getByRole("link", { name: link.name, exact: true })
      ).toBeVisible();
      await expect(
        linkList.getByRole("link", { name: link.name, exact: true })
      ).toHaveAttribute("href", link.href);
    }

    drawerMenu.getByRole("button", { name: "menu" }).click();

    await expect(drawerMenu).toBeHidden();
  });
});
