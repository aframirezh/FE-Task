import { useState } from "react";
import { Pagination } from "./Pagination";
import { UserCard } from "./UserCard";

const PAGE_SIZE = 20;
const TOTAL_PAGES = 5;

const dummyUser = {
  fullName: "Felipe Ramirez",
  job: "Senior Frontend Engineer",
  address: "Bogotá, Colombia",
};

export function DataList() {
  const [page, setPage] = useState(1);

  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: PAGE_SIZE }).map((_, index) => (
          <UserCard
            key={index}
            fullName={dummyUser.fullName}
            job={dummyUser.job}
            address={dummyUser.address}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={TOTAL_PAGES}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
      />
    </section>
  );
}
