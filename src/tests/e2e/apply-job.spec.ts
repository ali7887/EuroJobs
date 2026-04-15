import { test, expect } from "@playwright/test";

test("user can apply to a job", async ({ page }) => {
  await page.goto("/login");

  await page.fill('input[name="email"]', "test@example.com");
  await page.fill('input[name="password"]', "password");
  await page.click("button[type=submit]");

  await expect(page).toHaveURL("/dashboard");

  await page.goto("/jobs/1");

  await page.click("text=Apply Now");

  await page.setInputFiles('input[type=file]', "tests/fixtures/resume.pdf");

  await page.fill('textarea[name=coverLetter]', "This is my cover letter");

  await page.click("button[type=submit]");

  await expect(page.getByText("Application submitted")).toBeVisible();
});
