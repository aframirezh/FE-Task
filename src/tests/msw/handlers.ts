/**
 * MSW request handlers
 * Define mocked API responses for integration tests.
 * These handlers intercept real network requests made by the app. i.e. to API_URL
 */

import { http, HttpResponse } from "msw";
import { API_URL } from "../../data/api/users";

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json({
      result: [],
    });
  }),
];
