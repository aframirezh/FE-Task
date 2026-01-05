/**
 * MSW server setup for Node.js testing environment.
 * This server intercepts network requests during tests
 * and applies the defined request handlers.
 */

import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
