import { test, expect } from "@playwright/test";

test("User can apply to a job successfully", async ({ page }) => {
  await page.goto("/jobs/10");

  await page.click("text=Apply Now");
  await page.fill('[name="resume"]', "my resume test");

  await page.click("text=Submit");

  await expect(page.locator("text=Applied Successfully")).toBeVisible();
});
