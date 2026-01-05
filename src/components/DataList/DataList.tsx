import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../data/api/users";
import { Pagination } from "./Pagination";
import { UserCard } from "./UserCard";
import { PAGINATION } from "../../../app.constants";

const PAGE_SIZE = PAGINATION.PAGE_SIZE;

/**
 * DataList only handles pagination and rendering. Data is already normalized.
 * @returns A paginated list of user cards.
 */
export function DataList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Memoize users to avoid unnecessary recalculations
  const users = useMemo(() => data ?? [], [data]);
  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  
  /**
   * Ensure pagination values stay within valid bounds
   * - safeTotalPages: At least 1 page, 0 is not allowed and pagination always shows at least one page
   * - safePage: Current page cannot exceed total pages
   */
  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(page, safeTotalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return users.slice(start, start + PAGE_SIZE);
  }, [safePage, users]);

  // Safe messages for loading, error and empty states
  if (isLoading) {
    return <p className="text-sm text-gray-600">Loading users…</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-600">Failed to load users.</p>;
  }

  if (users.length === 0) {
    return <p className="text-sm text-gray-600">No users found.</p>;
  }

  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pageItems.map((u) => (
          <UserCard key={u.id} fullName={u.fullName} job={u.jobTitle} address={u.address} />
        ))}
      </div>

      <Pagination
        page={safePage}
        totalPages={safeTotalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(safeTotalPages, p + 1))}
      />
    </section>
  );
}
