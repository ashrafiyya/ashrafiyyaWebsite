import { expect, test } from "@playwright/test";

test("renders the hero tagline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Elevating Knowledge and Practice")).toBeVisible();
});
