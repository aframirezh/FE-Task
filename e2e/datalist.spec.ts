/**
 * End-to-end test that validates the full pagination flow.
 *
 * This test runs the real application in a real browser and:
 * - Intercepts the API request to provide deterministic data
 * - Verifies that the first page renders 20 items
 * - Simulates user navigation to the next page
 * - Confirms that the displayed data updates accordingly
 *
 * The goal is to validate the complete user flow without relying
 * on external backend availability.
 */

import { test, expect } from "@playwright/test";

/**
 * Generates deterministic mock API responses for E2E tests.
 * Used to intercept network requests and avoid real backend dependencies
 * while preserving the real application flow.
 */
function makeApiResult(count: number) {
  return {
    result: Array.from({ length: count }, (_, i) => ({
      id: `id-${i + 1}`,
      name: { first: `First${i + 1}`, middle: "", last: `Last${i + 1}` },
      job: { title: `Job${i + 1}` },
      location: {
        street: `Street ${i + 1}`,
        city: `City ${i + 1}`,
        state: `State ${i + 1}`,
        country: `Country ${i + 1}`,
        zip: `ZIP${i + 1}`,
      },
    })),
  };
}

test("loads DataList, shows first 20 items, then paginates to next 20", async ({ page }) => {
  const apiUrl = process.env.VITE_API_URL;

  if (!apiUrl) throw new Error("Missing env var VITE_API_URL for E2E");

  // Here Playwright intercepts API request and returns deterministic data for E2E testing.
  // This avoids relying on the real backend while keeping a real browser flow.
  await page.route(apiUrl, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(makeApiResult(60)),
    });
  });

  await page.goto("/");

  // First page should render First1 Last1
  await expect(page.getByText("First1 Last1")).toBeVisible();

  // Should show 20 cards
  await expect(page.getByTestId("user-card")).toHaveCount(20);

  // Click Next
  await page.getByRole("button", { name: /next page/i }).click();

  // Second page should include First21 Last21
  await expect(page.getByText("First21 Last21")).toBeVisible();
});
