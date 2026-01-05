/**
 * MSW request handlers
 * Define mocked API responses for integration tests.
 * These handlers intercept real network requests made by the app. i.e. to API_URL
 */

import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.API_URL;

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json({
      result: [],
    });
  }),
];
