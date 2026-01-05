import "@testing-library/jest-dom/vitest";
import { server } from "./msw/server";
import { beforeAll, afterAll, afterEach } from "vitest";

/**
 * Global test setup.
 * Starts MSW before tests and ensures handlers are reset
 */


// Start MSW before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers after each test (so tests don't leak state)
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
