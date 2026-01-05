import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserCard } from "./UserCard";

describe("UserCard", () => {
  it("renders full name, job and address", () => {
    render(
      <UserCard
        fullName="Felipe Ramirez"
        job="Senior Frontend Engineer"
        address="Bogotá, CO"
      />
    );

    expect(screen.getByText("Felipe Ramirez")).toBeInTheDocument();
    expect(screen.getByText("Senior Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Bogotá, CO")).toBeInTheDocument();
  });
});
