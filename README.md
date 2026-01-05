# FE Task — Paginated Data List

Frontend technical challenge implemented with a **production-ready architecture**, focusing on **clean code**, **performance**, **testing at all levels**, and **developer experience**.

---

## Tech Stack

- **React + TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (UI styling)
- **TanStack Query (React Query)** (data fetching & caching)
- **Vitest + Testing Library** (unit & integration tests)
- **MSW** (API mocking for integration tests)
- **Playwright** (end-to-end tests)
- **Docker & Docker Compose**
- **GitHub Actions** (CI)

---

## Features

- Paginated user list (20 items per page)
- Clean card-based UI
- Deterministic data handling
- Fully tested at:
  - Unit level
  - Integration level
  - End-to-End level
- Dockerized for production and testing
- CI pipeline ready for real-world workflows

---

## Project Structure

```txt
src/
├── components/
│   └── DataList/
│       ├── DataList.tsx
│       ├── UserCard.tsx
│       ├── Pagination.tsx
│       ├── DataList.test.tsx        # integration tests
│       ├── UserCard.test.tsx        # unit tests
│       └── pagination.test.tsx      # unit tests
├── data/
│   └── api/
│       ├── users.ts                 # API access + mapping
│       └── client.ts
├── tests/
│   ├── msw/
│   │   ├── handlers.ts
│   │   └── server.ts
│   ├── render.tsx                   # test utilities
│   └── setup.ts
├── utils/
│   └── pagination.ts
├── constants/
│   └── app.constants.ts
└── env.d.ts
e2e/
└── datalist.spec.ts                 # Playwright E2E test
```

## Environment Variables

The application relies on a single environment variable:

VITE_API_URL=https://dummyjson.com/...

### Usage

- Used by the application via import.meta.env
- Used by integration and E2E tests via process.env
- Injected at build time for Docker images

### Environment files

- .env → local development
- .env.test → integration tests
- .env.docker → Docker & Docker Compose workflows

## Testing

### Unit Tests

- Test isolated logic and presentational components
- Fast and deterministic
- No network or browser dependencies

```
npm run test
```

### Integration Tests

- React components combined with TanStack Query
- API mocked using MSW
- Validates real component behavior and data flow

```
npm run test
```

### End-to-End Tests (Playwright)

- Runs in a real Chromium browser
- Validates the full user flow:

  - initial page load
  - rendering of 20 items per page
  - pagination to the next page

- Network requests are intercepted to ensure deterministic results

```
npm run e2e
```

## Docker

Production build (served with Nginx)

```
npm run docker:up
```

The application will be available at:

```
http://localhost:8080
```

### Run unit and integration tests in Docker

```
npm run docker:test
```

### Stop containers

```
npm run docker:down
```

### Docker Compose Services

#### web

- Builds the application and serves it using Nginx

#### test

- Runs unit and integration tests inside a container and exits

## CI — GitHub Actions

A CI pipeline is configured using GitHub Actions and runs automatically on:

- Pushes to develop and main
- Pull requests targeting develop or main

### CI Pipeline Steps

- Install dependencies
- Run unit and integration tests (Vitest)
- Build the application
- Run end-to-end tests (Playwright)
- Upload Playwright report as an artifact

## Notes

- End-to-end tests intentionally mock network responses to avoid flaky builds
- Docker images are optimized for CI and production usage
- Playwright tests are executed separately from Vitest for performance and clarity
