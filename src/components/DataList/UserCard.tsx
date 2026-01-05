/**
 * UserCard component to display user information.
 * Props:
 * - fullName: Full name of the user.
 * - job: Job title of the user.
 * - address: Address of the user.
 */

type UserCardProps = {
  fullName: string;
  job: string;
  address: string;
};

export function UserCard({ fullName, job, address }: UserCardProps) {
  return (
    <div
      data-testid="user-card"
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <h3 data-testid="user-name" className="text-sm font-semibold text-gray-900">
        {fullName}
      </h3>
      <p className="mt-1 text-sm text-gray-600">{job}</p>
      <p className="mt-2 text-xs text-gray-500">{address}</p>
    </div>
  );
}
