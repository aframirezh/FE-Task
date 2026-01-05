/**
 * Pagination component for navigating through pages of data.
 * Props:
 * - page: Current page number.
 * - totalPages: Total number of pages available.
 * - onNext: Function to call when the "Next" button is clicked.
 * - onPrev: Function to call when the "Previous" button is clicked.
 */

type PaginationProps = {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
};

export function Pagination({ page, totalPages, onNext, onPrev }: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="rounded-md border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Previous page"
      >
        Previous
      </button>

      <span className="text-sm text-gray-700">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded-md border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
