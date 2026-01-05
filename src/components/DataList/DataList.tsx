import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../data/api/users";
import { Pagination } from "./Pagination";
import { UserCard } from "./UserCard";
import { PAGINATION } from "../../../app.constants";
import { getPageSlice, getTotalPages } from "../../utils/pagination";

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

  // The pagination helper guarantees safe data slicing, 
  // while the component keeps UI state within valid bounds.
  const totalPages = getTotalPages(users.length, PAGE_SIZE);
  const pageItems = useMemo(
    () => getPageSlice(users, page, PAGE_SIZE),
    [users, page]
);


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
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />
    </section>
  );
}
