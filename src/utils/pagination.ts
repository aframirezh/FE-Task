/**
 * Returns a slice of items for a given page and page size.
 * Ensures page boundaries are respected.
 */
export function getPageSlice<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  if (pageSize <= 0) return [];

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);

  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

/**
 * Calculates total pages ensuring a minimum of 1.
 */
export function getTotalPages(totalItems: number, pageSize: number): number {
  if (pageSize <= 0) return 1;
  return Math.max(1, Math.ceil(totalItems / pageSize));
}
