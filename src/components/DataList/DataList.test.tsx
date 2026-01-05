import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

import { server } from "../../tests/msw/server";
import { renderWithQueryClient } from "../../tests/render";
import { DataList } from "./DataList";
import { PAGINATION } from "../../../app.constants";
import { API_URL } from "../../data/api/users";

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

describe("DataList (integration)", () => {
  it("shows loading state then renders 20 cards on success", async () => {
    server.use(
      http.get(API_URL, () => HttpResponse.json(makeApiResult(60)))
    );

    renderWithQueryClient({ children: <DataList /> });

    // Loading
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();

    // Wait for success content
    const cards = await screen.findAllByTestId("user-card");
    expect(cards).toHaveLength(PAGINATION.PAGE_SIZE);

    // Spot check content from page 1 (First1 Last1 should exist)
    expect(screen.getByText("First1 Last1")).toBeInTheDocument();
    expect(screen.getByText("Job1")).toBeInTheDocument();
  });

  it("paginates to the next page when clicking Next", async () => {
    server.use(
      http.get(API_URL, () => HttpResponse.json(makeApiResult(60)))
    );

    const user = userEvent.setup();
    renderWithQueryClient({ children: <DataList /> });

    // Wait for page 1
    await screen.findAllByTestId("user-card");
    expect(screen.getByText("First1 Last1")).toBeInTheDocument();

    // Click next
    await user.click(screen.getByRole("button", { name: /next page/i }));

    // Page 2 should contain First21 Last21
    await waitFor(() => {
      expect(screen.getByText("First21 Last21")).toBeInTheDocument();
    });
  });

  it("shows error state when API fails", async () => {
    server.use(
      http.get(API_URL, () => HttpResponse.text("Boom", { status: 500 }))
    );

    renderWithQueryClient({ children: <DataList /> });

    expect(await screen.findByText(/failed to load users/i)).toBeInTheDocument();
  });
});
