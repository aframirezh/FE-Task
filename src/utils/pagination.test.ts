import { describe, it, expect } from "vitest";
import { getPageSlice, getTotalPages } from "./pagination";

describe("pagination helpers", () => {
  const items = Array.from({ length: 50 }, (_, i) => i + 1);

  it("returns first page items", () => {
    const result = getPageSlice(items, 1, 10);
    expect(result).toEqual([1,2,3,4,5,6,7,8,9,10]);
  });

  it("returns second page items", () => {
    const result = getPageSlice(items, 2, 10);
    expect(result).toEqual([11,12,13,14,15,16,17,18,19,20]);
  });

  it("clamps page lower bound", () => {
    const result = getPageSlice(items, 0, 10);
    expect(result).toEqual([1,2,3,4,5,6,7,8,9,10]);
  });

  it("clamps page upper bound", () => {
    const result = getPageSlice(items, 999, 10);
    expect(result).toEqual([41,42,43,44,45,46,47,48,49,50]);
  });

  it("handles empty items", () => {
    const result = getPageSlice([], 1, 10);
    expect(result).toEqual([]);
  });

  it("calculates total pages correctly", () => {
    expect(getTotalPages(50, 10)).toBe(5);
    expect(getTotalPages(1, 10)).toBe(1);
    expect(getTotalPages(0, 10)).toBe(1);
  });
});
