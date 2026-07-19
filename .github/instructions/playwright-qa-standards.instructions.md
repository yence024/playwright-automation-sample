---
description: "Use when creating or updating Playwright tests, fixtures, or page objects in this repository. Enforces fixture-driven POM patterns, stable locators, and deterministic assertions."
name: "Playwright QA Standards"
applyTo:
  - "tests/**/*.ts"
  - "src/pages/**/*.ts"
  - "src/fixtures/**/*.ts"
  - "src/utils/**/*.ts"
---
# Playwright QA Standards

- Use fixture-based tests from src/fixtures for authenticated and shared setup flows.
- Keep test logic in test files and UI actions in page objects under src/pages.
- Prefer Playwright Locator API with stable CSS or role-based selectors.
- Avoid XPath selectors unless there is no stable alternative, and add a short justification comment when XPath is required.
- Use web-first assertions with expect and avoid sleep-based waits.
- Do not use waitForTimeout in tests, fixtures, or page objects.
- Avoid hardcoded credentials, URLs, and test data in spec files; use src/data and config values.
- Structure scenarios with clear test.step blocks following Arrange, Act, Assert intent.
- Keep tests independent and parallel-safe.
- Use readable test names that describe behavior and expected outcome.

## Quick Example

```ts
import { test, expect } from '@fixtures/login.fixtures';
import { URLS, testUsers } from '@data/testData';

test('Login -> Standard User -> Dashboard is visible', async ({ loginPage, dashboardPage }) => {
  const user = testUsers.allUsers[0];

  await test.step('Act - login with valid user', async () => {
    await loginPage.login(user.username, user.password);
  });

  await test.step('Assert - user lands on dashboard', async () => {
    await expect(loginPage.page).toHaveURL(URLS.DASHBOARD_PAGE);
    await dashboardPage.expectDashboardLoaded();
  });
});
```
