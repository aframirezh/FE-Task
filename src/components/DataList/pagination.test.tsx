import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("calls onNext/onPrev when buttons are clicked", async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    const onPrev = vi.fn();

    render(<Pagination page={2} totalPages={5} onNext={onNext} onPrev={onPrev} />);

    await user.click(screen.getByRole("button", { name: /next page/i }));
    await user.click(screen.getByRole("button", { name: /previous page/i }));

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it("disables Previous on first page and Next on last page", () => {
    const onNext = vi.fn();
    const onPrev = vi.fn();

    const { rerender } = render(
      <Pagination page={1} totalPages={5} onNext={onNext} onPrev={onPrev} />
    );

    expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next page/i })).not.toBeDisabled();

    rerender(<Pagination page={5} totalPages={5} onNext={onNext} onPrev={onPrev} />);

    expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /previous page/i })).not.toBeDisabled();
  });
});
