import { test as baseTest } from "@playwright/test";
import stubAPIResponse from "./stubAPIResponse";

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    // Intercept all graphQL requests client-side and return stubbed responses
    await page.route("*/**/graphql", async (route) => {
      const req = route.request();
      const reqData = req.postDataJSON();

      if (stubAPIResponse[reqData.operationName]) {
        const { data, errors, status } = stubAPIResponse[reqData.operationName](
          reqData.variables,
          { token: await req.headerValue("authorization") }
        );

        await route.fulfill({
          status: status ?? 200,
          body: JSON.stringify({ data, errors }),
        });

        return;
      }

      // If no stubbed response is found, abort request
      route.abort("blockedbyclient");
    });

    await use(page);
  },
});
